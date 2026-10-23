import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import generateSidebar from '../../scripts/sidebar.js';
import { withMermaid } from "vitepress-plugin-mermaid";
import { docLinks } from '../../scripts/doc-links';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'zh-CN',
  title: "我的世界中国版 Wiki",
  description: "ModSDK 开发者文档 镜像，但提供更优质的搜索",
  ignoreDeadLinks: false,
  markdown: { config: docLinks(fileURLToPath(new URL('..', import.meta.url))) },
  // 替换原生搜索组件，自定义展示的搜索结果内容
  vite: {
    plugins: [
      // 处理上游文档引用的 LFS 图片文件：当图片文件不存在时（Git LFS 超限导致未下载），
      // 返回空字符串避免 Rollup 构建失败，页面中该图片会显示为空白而非中断构建。
      {
        name: 'handle-missing-lfs-assets',
        enforce: 'pre' as const,
        resolveId(id: string, importer?: string) {
          if (!importer) return null;
          if (!/\.(gif|png|jpg|jpeg|webp|svg|mp4|webm)$/i.test(id)) return null;
          if (!id.startsWith('./') && !id.startsWith('../')) return null;
          const resolved = resolve(dirname(importer), id);
          if (!existsSync(resolved)) return '\0missing-lfs-asset';
          return null;
        },
        load(id: string) {
          if (id === '\0missing-lfs-asset') return 'export default ""';
          return null;
        }
      },
      // 上游文档（Kotlin/Java 等）含有与 Vue 模板解析冲突的字符：
      // 1. 行内文本中的 <PascalCase> 泛型标注（如 Class<T>）—— VitePress 开启 html:true，
      //    markdown-it 会将其原样传给 Vue 模板编译器，导致 "Element is missing end tag"
      // 2. 代码块内的 ${...} 在某些路径下被 Vue 当作模板表达式
      // 解决方案：预处理 .md 文件，在代码块外将 <PascalCase> 转为 HTML 实体；
      //          在代码块内将 ${ 转为 \${ (VitePress 的官方转义方式)
      {
        name: 'escape-vue-syntax-in-markdown',
        enforce: 'pre' as const,
        transform(src: string, id: string) {
          if (!id.endsWith('.md')) return null;
          // 仅对上游同步目录生效，避免影响 wiki 等本地 Vue 组件
          if (!id.includes('/mcdocs/') && !id.includes('/mcguide/') && !id.includes('/mconline/')) return null;

          // 将源文件按 "代码块内" / "代码块外" 分割处理
          // 匹配围栏代码块（```...``` 或 ~~~...~~~）及行内代码（`...`）
          const FENCE_RE = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm;
          const INLINE_CODE_RE = /`[^`\n]+`/g;

          // 合法 HTML 元素名（lowercase），大写版本需要规范化而非转义
          const HTML_VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
          const HTML_ELEMENTS = new Set(['a','abbr','address','article','aside','audio','b','bdi','bdo','blockquote','br','button','canvas','caption','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','header','hr','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','menu','meta','meter','nav','noscript','object','ol','optgroup','option','output','p','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','slot','small','source','span','strong','style','sub','summary','sup','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','u','ul','var','video','wbr',
            // 已废弃但仍广泛使用的 HTML 元素
            'center','font','b','big','small','strike','tt','u']);

          let result = src;
          // 0. 将 Docusaurus JSX <Image img={require('...')} /> 转为标准 markdown 图片
          result = result.replace(
            /<Image\s+img=\{require\(['"]([^'"]+)['"]\)\}\s*(?:alt=["']([^"']*)["']\s*)?\/>/g,
            (_, imgPath, alt) => {
              // @site/static/images/... → ./images/...（去掉 @site/static 前缀）
              const cleanPath = imgPath.replace(/^@site\/static\//, './');
              return `![${alt || ''}](${cleanPath})`;
            }
          );
          result = result
            // 临时替换代码块，防止被下面的替换误伤
            .replace(FENCE_RE, (m) => '\x00FENCE' + Buffer.from(m).toString('base64') + '\x00')
            .replace(INLINE_CODE_RE, (m) => '\x00INLINE' + Buffer.from(m).toString('base64') + '\x00')
            // 1. 移除大写 void 元素的非法闭合标签（如 </BR>）
            .replace(/<\/([A-Z]{2,})>/g, (match, tag) => {
              const lower = tag.toLowerCase();
              return HTML_VOID.has(lower) ? '' : match;
            })
            // 2. 将大写 HTML 元素名规范化为小写（如 <BR> → <br>），
            //    但不处理泛型类型标注（PascalCase，如 <ItemStack>）
            .replace(/<(\/?)([A-Z]{2,})(\s[^>]*)?>|<(\/?)([A-Z]{2,})>/g, (match, s1, tag1, attrs, s2, tag2) => {
              const tag = (tag1 || tag2 || '').toLowerCase();
              const slash = s1 || s2 || '';
              if (HTML_ELEMENTS.has(tag)) {
                return attrs ? `<${slash}${tag}${attrs}>` : `<${slash}${tag}>`;
              }
              return match; // 不是 HTML 元素，交给后面的泛型转义处理
            })
            // 3. 转义行内 PascalCase / 单大写字母 泛型标注（如 <T>, <ItemStack>）
            //    只匹配大写字母开头、不是合法 HTML 元素的标签
            .replace(/<([A-Z][A-Za-z0-9]*)>/g, (match, tag) => {
              if (HTML_ELEMENTS.has(tag.toLowerCase())) return match;
              return `&lt;${tag}&gt;`;
            })
            // 4. 恢复代码块，并在其中转义 ${ 为 \${ (防止 Vue 模板表达式解析)
            .replace(/\x00FENCE([A-Za-z0-9+/=]+)\x00/g, (_, b64) => {
              const block = Buffer.from(b64, 'base64').toString();
              return block.replace(/\$\{/g, '\\${');
            })
            .replace(/\x00INLINE([A-Za-z0-9+/=]+)\x00/g, (_, b64) =>
              Buffer.from(b64, 'base64').toString()
            );

          return result === src ? null : result;
        }
      }
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPAlgoliaSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/AlgoliaSearch.vue', import.meta.url)
          )
        }
      ]
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        // 右侧导航栏的本地化文本
        outlineTitle: '本页目录',
        // 文档底部的本地化文本
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        // 最后更新时间的本地化文本
        lastUpdatedText: '最后更新于',
        // 返回顶部按钮的本地化文本
        returnToTopLabel: '返回顶部',
        // 移动端菜单的本地化文本
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-HPBDPVLP03' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HPBDPVLP03');
    `]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Wiki', link: '/wiki/', activeMatch: '^/wiki/' },
      { text: 'API速查', link: '/api-tools/interface', activeMatch: '^/api-tools/' },
      { text: 'API文档', link: '/mcdocs/0-欢迎', activeMatch: '^/mcdocs/' },
      { text: '开发指南', link: '/mcguide/0-欢迎', activeMatch: '^/mcguide/' },
      { text: '教学课程', link: '/mconline/0-欢迎', activeMatch: '^/mconline/' },
    ],

    sidebar: await generateSidebar(),

    socialLinks: [
      { icon: 'qq', link: 'https://qm.qq.com/q/NGIRFwEoMw' },
      { icon: 'github', link: 'https://github.com/EaseCation/netease-modsdk-wiki' }
    ],

    editLink: {
      pattern: 'https://github.com/EaseCation/netease-modsdk-wiki/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: 'ICP备案/许可证号 <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2022033471号-1</a>',
      copyright: 'Made with ❤️ by EaseCation' 
    },

    sitemap: {
      hostname: 'https://mcwiki.easecation.net'
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'F8HD84CUON',
        apiKey: 'ccaf9255472c593d8a8b0724a940bb29',
        indexName: 'netease-modsdk',
        searchParameters: {
          // 筛选掉 rootType 为 mconline 的项目
          facetFilters: ['rootType:-mconline']
        },
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供商'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    }
  }
})
