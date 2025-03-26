import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url'
import generateSidebar from '../../scripts/sidebar.js';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'zh-CN',
  title: "我的世界中国版 Wiki",
  description: "ModSDK 开发者文档 镜像，但提供更优质的搜索",
  ignoreDeadLinks: true,
  // 替换原生搜索组件，自定义展示的搜索结果内容
  vite: {
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
      { text: 'Wiki', link: '/wiki', activeMatch: '^/wiki/' },
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
