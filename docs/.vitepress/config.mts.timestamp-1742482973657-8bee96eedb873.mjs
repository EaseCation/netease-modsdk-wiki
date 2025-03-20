// docs/.vitepress/config.mts
import { fileURLToPath, URL } from "node:url";

// scripts/sidebar.ts
import fs2 from "fs/promises";
import path2 from "path";
import fg from "file:///Users/fangyizhou/Documents/coding/netease-modsdk-wiki/node_modules/fast-glob/out/index.js";
import matter2 from "file:///Users/fangyizhou/Documents/coding/netease-modsdk-wiki/node_modules/gray-matter/index.js";

// scripts/sidebar-wiki.ts
import fs from "fs";
import path from "path";
import matter from "file:///Users/fangyizhou/Documents/coding/netease-modsdk-wiki/node_modules/gray-matter/index.js";
var excludeFiles = [
  "entities/vanilla-usage-components.md",
  "entities/vanilla-usage-spawn-rules.md",
  "entities/vuc-full.md",
  "entities/vusr-full.md"
];
var fastBuild = process.env.fastBuild === "true ";
if (fastBuild && process.env.NODE_ENV == "production") {
  console.log(
    `
INFO: fastBuild selected. the files:
${JSON.stringify(
      excludeFiles,
      null,
      4
    )}
will not be compiled!
`
  );
}
function formatLink(path3) {
  return path3.split(/\\|\//g).join("/").replace(".md", "");
}
function getCategoryOrder(frontMatter) {
  const data = {};
  if (!frontMatter.data.categories) {
    return data;
  }
  frontMatter.data.categories.forEach(function(category, index) {
    data[category.title] = index + 1;
  });
  return data;
}
function getCategories(frontMatter) {
  const data = [];
  if (!frontMatter.data.categories) {
    return data;
  }
  frontMatter.data.categories.forEach(function(category, index) {
    category.nav_order = -1;
    category.category = category.title;
    data.push({
      text: category.title,
      data: category,
      tags: category.tags,
      prefix: category.prefix,
      section: true,
      color: category.color,
      link: "",
      activeMatch: " "
    });
  });
  return data;
}
var order;
function generateWikiSidebar(base, dir) {
  const data = [];
  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    let joinedPath = path.join(dir, file);
    const stats = fs.statSync(joinedPath);
    if (stats.isDirectory() && fs.existsSync(path.join(joinedPath, "index.md"))) {
      const str = fs.readFileSync(
        path.join(joinedPath, "index.md"),
        "utf8"
      );
      let frontMatter;
      try {
        frontMatter = matter(str);
      } catch (e) {
        joinedPath = path.relative(
          process.cwd(),
          path.join(joinedPath, "index.md")
        );
        console.log(
          // @ts-ignore
          `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter! ${e.message}`
        );
        throw new Error(
          // @ts-ignore
          `File ${joinedPath} has invalid frontmatter! ${e.message}`
        );
      }
      order = getCategoryOrder(frontMatter);
      const children = generateWikiSidebar(base, joinedPath).concat(
        getCategories(frontMatter)
      );
      children.sort(
        ({ data: dataA, text: textA }, { data: dataB, text: textB }) => {
          const navA = (dataA.nav_order || 50) + (order[dataA.category] || 0) * 100 || Number.MAX_SAFE_INTEGER;
          const navB = (dataB.nav_order || 50) + (order[dataB.category] || 0) * 100 || Number.MAX_SAFE_INTEGER;
          if (navA == navB) {
            return textA.localeCompare(textB);
          }
          return navA - navB;
        }
      );
      data.push({
        text: frontMatter.data.title,
        data: frontMatter.data,
        children
      });
      if (frontMatter.data.title === void 0) {
        throw new Error(
          "File " + path.join(joinedPath, "index.md") + " has invalid frontmatter!"
        );
      }
    } else if (stats.isFile()) {
      if (!file.endsWith(".md") || file.endsWith("index.md")) return;
      const str = fs.readFileSync(joinedPath, "utf8");
      let frontMatter;
      try {
        frontMatter = matter(str);
      } catch (e) {
        joinedPath = path.relative(process.cwd(), joinedPath);
        console.log(
          // @ts-ignore
          `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter! ${e.message}`
        );
        throw new Error(
          // @ts-ignore
          `File ${joinedPath} has invalid frontmatter! ${e.message}`
        );
      }
      const link = formatLink(joinedPath.toString().replace(base, ""));
      if (frontMatter.data.hidden === true) return;
      let prefix = null;
      if (frontMatter.data.prefix != null) {
        prefix = frontMatter.data.prefix;
      }
      let tags = null;
      if (frontMatter.data.tags != null) {
        tags = frontMatter.data.tags;
      }
      data.push({
        text: frontMatter.data.title,
        data: frontMatter.data,
        tags,
        prefix,
        section: frontMatter.data.section || false,
        color: frontMatter.data.color || "none",
        link,
        activeMatch: `^${link}`
      });
      if (frontMatter.data.title === void 0) {
        joinedPath = path.relative(process.cwd(), joinedPath);
        console.log(
          `::error file=${joinedPath},line=1,col=1::File ${joinedPath} has invalid frontmatter!`
        );
        throw new Error(`File ${joinedPath} has invalid frontmatter!`);
      }
    }
  });
  return data.sort(
    ({ data: dataA, text: textA }, { data: dataB, text: textB }) => {
      const navA = (dataA.nav_order || 50) + (order[dataA.category] || 0) * 100 || Number.MAX_SAFE_INTEGER;
      const navB = (dataB.nav_order || 50) + (order[dataB.category] || 0) * 100 || Number.MAX_SAFE_INTEGER;
      if (navA == navB) {
        return textA.localeCompare(textB);
      }
      return navA - navB;
    }
  );
}

// scripts/sidebar.ts
var DOCS_DIR = "docs";
var IGNORE_PATHS = ["README.md", "readme.md", "index.md"];
var DEFAULT_COLLAPSED_INDEX_MAP = {
  "wiki": 1,
  "mcdocs": 1,
  "mcguide": 0,
  "mconline": 0
};
var CATEGORY_MAP = {
  "wiki": "Wiki",
  "mcdocs": "API\u6587\u6863",
  "mcguide": "\u5F00\u53D1\u6307\u5357",
  "mconline": "\u6559\u5B66\u8BFE\u7A0B"
};
function extractOrderNumber(name, matterData) {
  const match = name.match(/^(\d+)-/);
  if (match) {
    return parseInt(match[1], 10);
  } else if (matterData.order) {
    return parseInt(matterData.order);
  } else if (matterData.nav_order) {
    return parseInt(matterData.nav_order);
  }
  return Number.MAX_SAFE_INTEGER;
}
async function generateSidebar() {
  const sidebar = {};
  const files = await fg([`${DOCS_DIR}/**/*.md`]);
  for (const filePath of files) {
    if (filePath.includes("wiki")) continue;
    const relativePath = path2.relative(DOCS_DIR, filePath);
    if (IGNORE_PATHS.some((ignore) => relativePath.toLowerCase().includes(ignore.toLowerCase()))) continue;
    const segments = relativePath.split(path2.sep);
    const categoryKey = segments[0];
    const fileContent = await fs2.readFile(filePath, "utf-8");
    const { data: matterData } = matter2(fileContent);
    if (matterData.hidden) {
      continue;
    }
    const categoryName = CATEGORY_MAP[categoryKey] || categoryKey;
    let currentLevel = sidebar[categoryKey] || [];
    if (!sidebar[categoryKey]) {
      sidebar[categoryKey] = currentLevel;
    }
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].replace(".md", "");
      const isLast = i === segments.length - 1;
      let link;
      if (isLast) {
        link = `/${segments.slice(0, i + 1).join("/")}`.replace(/\.md$/, "");
      } else if (i === 0) {
        link = `/${segment}`;
      }
      const order2 = extractOrderNumber(segment, matterData);
      if (isLast) {
        const title = await getTitleFromFile(filePath, matterData);
        const activeMatch = `^${link}(?:/|$)`;
        currentLevel.push({ text: title, link, order: order2, activeMatch });
      } else {
        let displayText = i === 0 ? categoryName : segment;
        displayText = displayText.replace(/^\d+-\s*/, "");
        let group = currentLevel.find(
          (item) => i === 0 && item.text === categoryName || i !== 0 && item.text === displayText
        );
        if (!group) {
          const groupLink = i === 0 ? `/${segment}` : void 0;
          group = {
            text: displayText,
            items: [],
            order: order2,
            collapsed: i > DEFAULT_COLLAPSED_INDEX_MAP[segments[0]],
            // 为目录添加活动匹配模式
            activeMatch: `^/${segment}(?:/|$)`,
            link: groupLink
          };
          currentLevel.push(group);
        }
        currentLevel = group.items || [];
      }
    }
  }
  for (const key in sidebar) {
    sortSidebarItems(sidebar[key]);
  }
  const sidebarFlat = {};
  for (const key in sidebar) {
    sidebarFlat[key] = [];
    sidebar[key].forEach((item) => {
      if (item.items) {
        sidebarFlat[key].push(...item.items);
      } else {
        sidebarFlat[key].push(item);
      }
    });
  }
  const wiki = generateWikiSidebar(path2.join(process.cwd(), "docs"), path2.join(process.cwd(), "docs/wiki"));
  const wikiSidebar = [];
  wiki.forEach((item) => {
    if (item.data.categories) {
      const secondUrls = [];
      const second = item.data.categories.map((category) => {
        ;
        return {
          text: category.title,
          collapsed: false,
          items: item.children.filter((child) => child.data.category === category.title).filter((child) => child.link).map((child) => {
            secondUrls.push(child.link);
            return {
              text: child.text,
              link: child.link,
              activeMatch: child.activeMatch
            };
          })
        };
      });
      const notMatched = item.children.filter((child) => !secondUrls.includes(child.link)).filter((child) => child.link).map((child) => {
        return {
          text: child.text,
          link: child.link,
          activeMatch: child.activeMatch
        };
      });
      wikiSidebar.push({
        text: item.data.title,
        collapsed: true,
        items: [...second, ...notMatched]
      });
    } else {
      wikiSidebar.push({
        text: item.text,
        collapsed: true,
        items: item.children.filter((child) => child.link).map((child) => {
          return {
            text: child.text,
            link: child.link,
            activeMatch: child.activeMatch
          };
        })
      });
    }
  });
  sidebarFlat["wiki"] = wikiSidebar;
  return sidebarFlat;
}
function sortSidebarItems(items) {
  items.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
  items.forEach((item) => {
    if (item.items && item.items.length > 0) {
      sortSidebarItems(item.items);
    }
  });
}
async function getTitleFromFile(filePath, matterData) {
  if (matterData.title) {
    return matterData.title.trim().replace(/['"]/g, "");
  }
  const basename = path2.basename(filePath, ".md");
  return basename.replace(/^\d+-\s*/, "").replace(/-/g, " ");
}
var sidebar_default = generateSidebar;

// docs/.vitepress/config.mts
import { withMermaid } from "file:///Users/fangyizhou/Documents/coding/netease-modsdk-wiki/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/fangyizhou/Documents/coding/netease-modsdk-wiki/docs/.vitepress/config.mts";
var config_default = withMermaid({
  lang: "zh-CN",
  title: "\u6211\u7684\u4E16\u754C\u4E2D\u56FD\u7248 Wiki",
  description: "ModSDK \u5F00\u53D1\u8005\u6587\u6863 \u955C\u50CF\uFF0C\u4F46\u63D0\u4F9B\u66F4\u4F18\u8D28\u7684\u641C\u7D22",
  ignoreDeadLinks: true,
  // 替换原生搜索组件，自定义展示的搜索结果内容
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPAlgoliaSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/AlgoliaSearch.vue", __vite_injected_original_import_meta_url)
          )
        }
      ]
    }
  },
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      lang: "zh-CN",
      themeConfig: {
        // 右侧导航栏的本地化文本
        outlineTitle: "\u672C\u9875\u76EE\u5F55",
        // 文档底部的本地化文本
        docFooter: {
          prev: "\u4E0A\u4E00\u9875",
          next: "\u4E0B\u4E00\u9875"
        },
        // 最后更新时间的本地化文本
        lastUpdatedText: "\u6700\u540E\u66F4\u65B0\u4E8E",
        // 返回顶部按钮的本地化文本
        returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
        // 移动端菜单的本地化文本
        sidebarMenuLabel: "\u83DC\u5355",
        darkModeSwitchLabel: "\u4E3B\u9898",
        lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",
        darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F"
      }
    }
  },
  head: [
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-HPBDPVLP03" }],
    ["script", {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HPBDPVLP03');
    `]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "Wiki", link: "/wiki" },
      { text: "API\u6587\u6863", link: "/mcdocs/0-\u6B22\u8FCE" },
      { text: "\u5F00\u53D1\u6307\u5357", link: "/mcguide/0-\u6B22\u8FCE" },
      { text: "\u6559\u5B66\u8BFE\u7A0B", link: "/mconline/0-\u6B22\u8FCE" }
    ],
    sidebar: await sidebar_default(),
    socialLinks: [
      { icon: "github", link: "https://github.com/EaseCation/netease-modsdk-wiki" }
    ],
    editLink: {
      pattern: "https://github.com/EaseCation/netease-modsdk-wiki/edit/main/docs/:path",
      text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
    },
    search: {
      provider: "algolia",
      options: {
        appId: "F8HD84CUON",
        apiKey: "ccaf9255472c593d8a8b0724a940bb29",
        indexName: "netease-modsdk",
        searchParameters: {
          // 筛选掉 rootType 为 mconline 的项目
          facetFilters: ["rootType:-mconline"]
        },
        locales: {
          root: {
            placeholder: "\u641C\u7D22\u6587\u6863",
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  cancelButtonText: "\u53D6\u6D88",
                  cancelButtonAriaLabel: "\u53D6\u6D88"
                },
                startScreen: {
                  recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                  noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                  saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2",
                  removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                  favoriteSearchesTitle: "\u6536\u85CF",
                  removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664"
                },
                errorScreen: {
                  titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C",
                  helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5"
                },
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362",
                  closeText: "\u5173\u95ED",
                  searchByText: "\u641C\u7D22\u63D0\u4F9B\u5546"
                },
                noResultsScreen: {
                  noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                  suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2",
                  reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                  reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988"
                }
              }
            }
          }
        }
      }
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAic2NyaXB0cy9zaWRlYmFyLnRzIiwgInNjcmlwdHMvc2lkZWJhci13aWtpLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Zhbmd5aXpob3UvRG9jdW1lbnRzL2NvZGluZy9uZXRlYXNlLW1vZHNkay13aWtpL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Zhbmd5aXpob3UvRG9jdW1lbnRzL2NvZGluZy9uZXRlYXNlLW1vZHNkay13aWtpL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9mYW5neWl6aG91L0RvY3VtZW50cy9jb2RpbmcvbmV0ZWFzZS1tb2RzZGstd2lraS9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCBnZW5lcmF0ZVNpZGViYXIgZnJvbSAnLi4vLi4vc2NyaXB0cy9zaWRlYmFyLmpzJztcbmltcG9ydCB7IHdpdGhNZXJtYWlkIH0gZnJvbSBcInZpdGVwcmVzcy1wbHVnaW4tbWVybWFpZFwiO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCB3aXRoTWVybWFpZCh7XG4gIGxhbmc6ICd6aC1DTicsXG4gIHRpdGxlOiBcIlx1NjIxMVx1NzY4NFx1NEUxNlx1NzU0Q1x1NEUyRFx1NTZGRFx1NzI0OCBXaWtpXCIsXG4gIGRlc2NyaXB0aW9uOiBcIk1vZFNESyBcdTVGMDBcdTUzRDFcdTgwMDVcdTY1ODdcdTY4NjMgXHU5NTVDXHU1MENGXHVGRjBDXHU0RjQ2XHU2M0QwXHU0RjlCXHU2NkY0XHU0RjE4XHU4RDI4XHU3Njg0XHU2NDFDXHU3RDIyXCIsXG4gIGlnbm9yZURlYWRMaW5rczogdHJ1ZSxcbiAgLy8gXHU2NkZGXHU2MzYyXHU1MzlGXHU3NTFGXHU2NDFDXHU3RDIyXHU3RUM0XHU0RUY2XHVGRjBDXHU4MUVBXHU1QjlBXHU0RTQ5XHU1QzU1XHU3OTNBXHU3Njg0XHU2NDFDXHU3RDIyXHU3RUQzXHU2NzlDXHU1MTg1XHU1QkI5XG4gIHZpdGU6IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL14uKlxcL1ZQQWxnb2xpYVNlYXJjaEJveFxcLnZ1ZSQvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICAgICAgbmV3IFVSTCgnLi90aGVtZS9jb21wb25lbnRzL0FsZ29saWFTZWFyY2gudnVlJywgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgbG9jYWxlczoge1xuICAgIHJvb3Q6IHtcbiAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgIGxhbmc6ICd6aC1DTicsXG4gICAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICAvLyBcdTUzRjNcdTRGQTdcdTVCRkNcdTgyMkFcdTY4MEZcdTc2ODRcdTY3MkNcdTU3MzBcdTUzMTZcdTY1ODdcdTY3MkNcbiAgICAgICAgb3V0bGluZVRpdGxlOiAnXHU2NzJDXHU5ODc1XHU3NkVFXHU1RjU1JyxcbiAgICAgICAgLy8gXHU2NTg3XHU2ODYzXHU1RTk1XHU5MEU4XHU3Njg0XHU2NzJDXHU1NzMwXHU1MzE2XHU2NTg3XHU2NzJDXG4gICAgICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgICAgIHByZXY6ICdcdTRFMEFcdTRFMDBcdTk4NzUnLFxuICAgICAgICAgIG5leHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIFx1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFx1NzY4NFx1NjcyQ1x1NTczMFx1NTMxNlx1NjU4N1x1NjcyQ1xuICAgICAgICBsYXN0VXBkYXRlZFRleHQ6ICdcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcdTRFOEUnLFxuICAgICAgICAvLyBcdThGRDRcdTU2REVcdTk4NzZcdTkwRThcdTYzMDlcdTk0QUVcdTc2ODRcdTY3MkNcdTU3MzBcdTUzMTZcdTY1ODdcdTY3MkNcbiAgICAgICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1x1OEZENFx1NTZERVx1OTg3Nlx1OTBFOCcsXG4gICAgICAgIC8vIFx1NzlGQlx1NTJBOFx1N0FFRlx1ODNEQ1x1NTM1NVx1NzY4NFx1NjcyQ1x1NTczMFx1NTMxNlx1NjU4N1x1NjcyQ1xuICAgICAgICBzaWRlYmFyTWVudUxhYmVsOiAnXHU4M0RDXHU1MzU1JyxcbiAgICAgICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1NEUzQlx1OTg5OCcsXG4gICAgICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnXHU1MjA3XHU2MzYyXHU1MjMwXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGJyxcbiAgICAgICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1x1NTIwN1x1NjM2Mlx1NTIzMFx1NkRGMVx1ODI3Mlx1NkEyMVx1NUYwRidcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhlYWQ6IFtcbiAgICBbJ3NjcmlwdCcsIHsgYXN5bmM6ICcnLCBzcmM6ICdodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPUctSFBCRFBWTFAwMycgfV0sXG4gICAgWydzY3JpcHQnLCB7fSwgYFxuICAgICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gICAgICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XG4gICAgICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xuICAgICAgZ3RhZygnY29uZmlnJywgJ0ctSFBCRFBWTFAwMycpO1xuICAgIGBdXG4gIF0sXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXG4gICAgICB7IHRleHQ6ICdXaWtpJywgbGluazogJy93aWtpJyB9LFxuICAgICAgeyB0ZXh0OiAnQVBJXHU2NTg3XHU2ODYzJywgbGluazogJy9tY2RvY3MvMC1cdTZCMjJcdThGQ0UnIH0sXG4gICAgICB7IHRleHQ6ICdcdTVGMDBcdTUzRDFcdTYzMDdcdTUzNTcnLCBsaW5rOiAnL21jZ3VpZGUvMC1cdTZCMjJcdThGQ0UnIH0sXG4gICAgICB7IHRleHQ6ICdcdTY1NTlcdTVCNjZcdThCRkVcdTdBMEInLCBsaW5rOiAnL21jb25saW5lLzAtXHU2QjIyXHU4RkNFJyB9LFxuICAgIF0sXG5cbiAgICBzaWRlYmFyOiBhd2FpdCBnZW5lcmF0ZVNpZGViYXIoKSxcblxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL0Vhc2VDYXRpb24vbmV0ZWFzZS1tb2RzZGstd2lraScgfVxuICAgIF0sXG5cbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9FYXNlQ2F0aW9uL25ldGVhc2UtbW9kc2RrLXdpa2kvZWRpdC9tYWluL2RvY3MvOnBhdGgnLFxuICAgICAgdGV4dDogJ1x1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1J1xuICAgIH0sXG5cbiAgICBzZWFyY2g6IHtcbiAgICAgIHByb3ZpZGVyOiAnYWxnb2xpYScsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGFwcElkOiAnRjhIRDg0Q1VPTicsXG4gICAgICAgIGFwaUtleTogJ2NjYWY5MjU1NDcyYzU5M2Q4YThiMDcyNGE5NDBiYjI5JyxcbiAgICAgICAgaW5kZXhOYW1lOiAnbmV0ZWFzZS1tb2RzZGsnLFxuICAgICAgICBzZWFyY2hQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgLy8gXHU3QjVCXHU5MDA5XHU2Mzg5IHJvb3RUeXBlIFx1NEUzQSBtY29ubGluZSBcdTc2ODRcdTk4NzlcdTc2RUVcbiAgICAgICAgICBmYWNldEZpbHRlcnM6IFsncm9vdFR5cGU6LW1jb25saW5lJ11cbiAgICAgICAgfSxcbiAgICAgICAgbG9jYWxlczoge1xuICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB7XG4gICAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcbiAgICAgICAgICAgICAgICAgIHJlc2V0QnV0dG9uQXJpYUxhYmVsOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcbiAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdcdTUzRDZcdTZEODgnLFxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RhcnRTY3JlZW46IHtcbiAgICAgICAgICAgICAgICAgIHJlY2VudFNlYXJjaGVzVGl0bGU6ICdcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgICAgICAgICAgc2F2ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RkREXHU1QjU4XHU4MUYzXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyJyxcbiAgICAgICAgICAgICAgICAgIHJlbW92ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyXHU0RTJEXHU3OUZCXHU5NjY0JyxcbiAgICAgICAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXG4gICAgICAgICAgICAgICAgICByZW1vdmVGYXZvcml0ZVNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NTM2XHU4NUNGXHU0RTJEXHU3OUZCXHU5NjY0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JTY3JlZW46IHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXG4gICAgICAgICAgICAgICAgICBoZWxwVGV4dDogJ1x1NEY2MFx1NTNFRlx1ODBGRFx1OTcwMFx1ODk4MVx1NjhDMFx1NjdFNVx1NEY2MFx1NzY4NFx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnXHU1MTczXHU5NUVEJyxcbiAgICAgICAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1NTU0NidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1NjcmVlbjoge1xuICAgICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ1x1NjVFMFx1NkNENVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5QycsXG4gICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdcdTRGNjBcdTUzRUZcdTRFRTVcdTVDMURcdThCRDVcdTY3RTVcdThCRTInLFxuICAgICAgICAgICAgICAgICAgcmVwb3J0TWlzc2luZ1Jlc3VsdHNUZXh0OiAnXHU0RjYwXHU4QkE0XHU0RTNBXHU4QkU1XHU2N0U1XHU4QkUyXHU1RTk0XHU4QkU1XHU2NzA5XHU3RUQzXHU2NzlDXHVGRjFGJyxcbiAgICAgICAgICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzTGlua1RleHQ6ICdcdTcwQjlcdTUxRkJcdTUzQ0RcdTk5ODgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmFuZ3lpemhvdS9Eb2N1bWVudHMvY29kaW5nL25ldGVhc2UtbW9kc2RrLXdpa2kvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Zhbmd5aXpob3UvRG9jdW1lbnRzL2NvZGluZy9uZXRlYXNlLW1vZHNkay13aWtpL3NjcmlwdHMvc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZmFuZ3lpemhvdS9Eb2N1bWVudHMvY29kaW5nL25ldGVhc2UtbW9kc2RrLXdpa2kvc2NyaXB0cy9zaWRlYmFyLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZnIGZyb20gJ2Zhc3QtZ2xvYic7XG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcbmltcG9ydCB7IGdlbmVyYXRlV2lraVNpZGViYXIgfSBmcm9tICcuL3NpZGViYXItd2lraSc7XG5cbi8vIFx1NUI5QVx1NEU0OVx1NEZBN1x1OEZCOVx1NjgwRlx1OTg3OVx1NzZFRVx1NjNBNVx1NTNFM1xuaW50ZXJmYWNlIFNpZGViYXJJdGVtIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgbGluaz86IHN0cmluZztcbiAgICBpdGVtcz86IFNpZGViYXJJdGVtW107XG4gICAgb3JkZXI/OiBudW1iZXI7IC8vIFx1NkRGQlx1NTJBMFx1NjM5Mlx1NUU4Rlx1NUI1N1x1NkJCNVxuICAgIGNvbGxhcHNlZD86IGJvb2xlYW47IC8vIFx1NkRGQlx1NTJBMFx1NjI5OFx1NTNFMFx1NzJCNlx1NjAwMVx1NjNBN1x1NTIzNlxuICAgIGFjdGl2ZU1hdGNoPzogc3RyaW5nOyAvLyBcdTZERkJcdTUyQTBcdTZEM0JcdTUyQThcdTUzMzlcdTkxNERcdTZBMjFcdTVGMEZcbn1cblxuLy8gXHU5MTREXHU3RjZFXHU1M0MyXHU2NTcwXG5jb25zdCBET0NTX0RJUiA9ICdkb2NzJzsgICAgICAgICAgLy8gXHU2NTg3XHU2ODYzXHU2ODM5XHU3NkVFXHU1RjU1XG5jb25zdCBJR05PUkVfUEFUSFMgPSBbJ1JFQURNRS5tZCcsICdyZWFkbWUubWQnLCAnaW5kZXgubWQnXTsgLy8gXHU1RkZEXHU3NTY1XHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXG5jb25zdCBERUZBVUxUX0NPTExBUFNFRF9JTkRFWF9NQVAgPSB7XG4gICAgJ3dpa2knOiAxLFxuICAgICdtY2RvY3MnOiAxLFxuICAgICdtY2d1aWRlJzogMCxcbiAgICAnbWNvbmxpbmUnOiAwXG59O1xuXG4vLyBcdTRFMDBcdTdFQTdcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcdTY2MjBcdTVDMDRcdTg4NjhcbmNvbnN0IENBVEVHT1JZX01BUDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICBcIndpa2lcIjogXCJXaWtpXCIsXG4gICAgJ21jZG9jcyc6ICdBUElcdTY1ODdcdTY4NjMnLFxuICAgICdtY2d1aWRlJzogJ1x1NUYwMFx1NTNEMVx1NjMwN1x1NTM1NycsXG4gICAgJ21jb25saW5lJzogJ1x1NjU1OVx1NUI2Nlx1OEJGRVx1N0EwQidcbn07XG5cbi8qKlxuICogXHU0RUNFXHU1NDBEXHU3OUYwXHU0RTJEXHU2M0QwXHU1M0Q2XHU2MzkyXHU1RThGXHU2NTcwXHU1QjU3XG4gKiBcdTRGOEJcdTU5ODJcdUZGMUEnMC1cdTY5ODJcdThGRjAnIFx1OEZENFx1NTZERSAwXHVGRjBDJzEtXHU1N0ZBXHU3ODQwJyBcdThGRDRcdTU2REUgMVxuICovXG5mdW5jdGlvbiBleHRyYWN0T3JkZXJOdW1iZXIobmFtZTogc3RyaW5nLCBtYXR0ZXJEYXRhOiBhbnkpOiBudW1iZXIge1xuICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaCgvXihcXGQrKS0vKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgfSBlbHNlIGlmIChtYXR0ZXJEYXRhLm9yZGVyKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChtYXR0ZXJEYXRhLm9yZGVyKTtcbiAgICB9IGVsc2UgaWYgKG1hdHRlckRhdGEubmF2X29yZGVyKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChtYXR0ZXJEYXRhLm5hdl9vcmRlcik7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBcdTc1MUZcdTYyMTBcdTRGQTdcdThGQjlcdTY4MEZcdTkxNERcdTdGNkVcdTk4NzlcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTaWRlYmFyKCk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgU2lkZWJhckl0ZW1bXT4+IHtcbiAgICBjb25zdCBzaWRlYmFyOiBSZWNvcmQ8c3RyaW5nLCBTaWRlYmFySXRlbVtdPiA9IHt9O1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgZmcoW2Ake0RPQ1NfRElSfS8qKi8qLm1kYF0pO1xuXG4gICAgLy8gXHU1OTA0XHU3NDA2XHU2MjQwXHU2NzA5XHU5NzVFIHdpa2kgXHU2NTg3XHU0RUY2XG4gICAgZm9yIChjb25zdCBmaWxlUGF0aCBvZiBmaWxlcykge1xuICAgICAgICAvLyBcdThERjNcdThGQzd3aWtpXG4gICAgICAgIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnd2lraScpKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5yZWxhdGl2ZShET0NTX0RJUiwgZmlsZVBhdGgpO1xuICAgICAgICBpZiAoSUdOT1JFX1BBVEhTLnNvbWUoaWdub3JlID0+IHJlbGF0aXZlUGF0aC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGlnbm9yZS50b0xvd2VyQ2FzZSgpKSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gcmVsYXRpdmVQYXRoLnNwbGl0KHBhdGguc2VwKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlLZXkgPSBzZWdtZW50c1swXTtcblxuICAgICAgICAvLyBcdThCRkJcdTUzRDZcdTY1ODdcdTRFRjZcdTUxODVcdTVCQjlcdUZGMENcdTcxMzZcdTU0MEVcdTkwMUFcdThGQzdtYXR0ZXJcdThCRkJcdTUzRDZcdTU5MzRcdTkwRThcdTRGRTFcdTYwNkZcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogbWF0dGVyRGF0YSB9ID0gbWF0dGVyKGZpbGVDb250ZW50KTtcblxuICAgICAgICBpZiAobWF0dGVyRGF0YS5oaWRkZW4pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU0RjdGXHU3NTI4XHU2NjIwXHU1QzA0XHU4ODY4XHU4M0I3XHU1M0Q2XHU2NjNFXHU3OTNBXHU1NDBEXHU3OUYwXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZSA9IENBVEVHT1JZX01BUFtjYXRlZ29yeUtleV0gfHwgY2F0ZWdvcnlLZXk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRMZXZlbDogU2lkZWJhckl0ZW1bXSA9IHNpZGViYXJbY2F0ZWdvcnlLZXldIHx8IFtdO1xuXG4gICAgICAgIGlmICghc2lkZWJhcltjYXRlZ29yeUtleV0pIHtcbiAgICAgICAgICAgIHNpZGViYXJbY2F0ZWdvcnlLZXldID0gY3VycmVudExldmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU5MDEyXHU1RjUyXHU2Nzg0XHU1RUZBXHU1QzQyXHU3RUE3XHU3RUQzXHU2Nzg0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpXS5yZXBsYWNlKCcubWQnLCAnJyk7XG4gICAgICAgICAgICBjb25zdCBpc0xhc3QgPSBpID09PSBzZWdtZW50cy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAvLyBcdTRGRUVcdTY1MzlcdTk0RkVcdTYzQTVcdTc1MUZcdTYyMTBcdTkwM0JcdThGOTFcbiAgICAgICAgICAgIGxldCBsaW5rO1xuICAgICAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgICAgIC8vIFx1NEUzQVx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1OTRGRVx1NjNBNVxuICAgICAgICAgICAgICAgIGxpbmsgPSBgLyR7c2VnbWVudHMuc2xpY2UoMCwgaSArIDEpLmpvaW4oJy8nKX1gLnJlcGxhY2UoL1xcLm1kJC8sICcnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmsgPSBgLyR7c2VnbWVudH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IGV4dHJhY3RPcmRlck51bWJlcihzZWdtZW50LCBtYXR0ZXJEYXRhKTsgLy8gXHU2M0QwXHU1M0Q2XHU2MzkyXHU1RThGXHU1M0Y3XG5cbiAgICAgICAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTY3MDBcdTdFQzhcdTY1ODdcdTRFRjZcdTk4NzlcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGF3YWl0IGdldFRpdGxlRnJvbUZpbGUoZmlsZVBhdGgsIG1hdHRlckRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIFx1NkRGQlx1NTJBMCBhY3RpdmVNYXRjaCBcdTRFRTVcdTY1MkZcdTYzMDFcdTY2RjRcdTdDQkVcdTc4NkVcdTc2ODRcdTlBRDhcdTRFQUVcdTUzMzlcdTkxNERcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVNYXRjaCA9IGBeJHtsaW5rfSg/Oi98JClgO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbC5wdXNoKHsgdGV4dDogdGl0bGUsIGxpbmssIG9yZGVyLCBhY3RpdmVNYXRjaCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gXHU2N0U1XHU2MjdFXHU2MjE2XHU1MjFCXHU1RUZBXHU3NkVFXHU1RjU1XHU1MjA2XHU3RUM0XG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlUZXh0ID0gaSA9PT0gMCA/IGNhdGVnb3J5TmFtZSA6IHNlZ21lbnQ7XG5cbiAgICAgICAgICAgICAgICAvLyBcdTc5RkJcdTk2NjRcdTY1NzBcdTVCNTdcdTUyNERcdTdGMDBcbiAgICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0LnJlcGxhY2UoL15cXGQrLVxccyovLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSBjdXJyZW50TGV2ZWwuZmluZChpdGVtID0+XG4gICAgICAgICAgICAgICAgICAgIChpID09PSAwICYmIGl0ZW0udGV4dCA9PT0gY2F0ZWdvcnlOYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAoaSAhPT0gMCAmJiBpdGVtLnRleHQgPT09IGRpc3BsYXlUZXh0KVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTGluayA9IGkgPT09IDAgPyBgLyR7c2VnbWVudH1gIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGRpc3BsYXlUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGkgPiBERUZBVUxUX0NPTExBUFNFRF9JTkRFWF9NQVBbc2VnbWVudHNbMF1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU0RTNBXHU3NkVFXHU1RjU1XHU2REZCXHU1MkEwXHU2RDNCXHU1MkE4XHU1MzM5XHU5MTREXHU2QTIxXHU1RjBGXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXRjaDogYF4vJHtzZWdtZW50fSg/Oi98JClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogZ3JvdXBMaW5rXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbC5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudExldmVsID0gZ3JvdXAuaXRlbXMgfHwgW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdTVCRjlcdTZCQ0ZcdTRFMkFcdTVDNDJcdTdFQTdcdThGREJcdTg4NENcdTYzOTJcdTVFOEZcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzaWRlYmFyKSB7XG4gICAgICAgIHNvcnRTaWRlYmFySXRlbXMoc2lkZWJhcltrZXldKTtcbiAgICB9XG5cbiAgICAvLyBcdTc5RkJcdTk2NjRcdTdCMkNcdTRFMDBcdTdFQTdcdUZGMENcdTVDMDZcdTZCQ0ZcdTRFMDBcdTRFMkFcdTdCMkNcdTRFMDBcdTdFQTdcdTRFMkRcdTc2ODRpdGVtc1x1NUU3M1x1OTRGQVx1NTIzMFx1NEUwMFx1N0VBN1xuICAgIGNvbnN0IHNpZGViYXJGbGF0OiBSZWNvcmQ8c3RyaW5nLCBTaWRlYmFySXRlbVtdPiA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNpZGViYXIpIHtcbiAgICAgICAgc2lkZWJhckZsYXRba2V5XSA9IFtdO1xuICAgICAgICBzaWRlYmFyW2tleV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhckZsYXRba2V5XS5wdXNoKC4uLml0ZW0uaXRlbXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyRmxhdFtrZXldLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFx1NTkwNFx1NzQwNndpa2lcbiAgICBjb25zdCB3aWtpID0gZ2VuZXJhdGVXaWtpU2lkZWJhcihwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MnKSwgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3dpa2knKSk7XG4gICAgY29uc3Qgd2lraVNpZGViYXI6IFNpZGViYXJJdGVtW10gPSBbXTtcbiAgICB3aWtpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmRhdGEuY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgLy8gXHU0RTAwXHU3RUE3XHU1OTI3XHU1MjA2XHU3QzdCXG5cbiAgICAgICAgICAgIC8vIFx1NEU4Q1x1N0VBN1x1NTIwNlx1N0M3QlxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kVXJsczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZCA9IGl0ZW0uZGF0YS5jYXRlZ29yaWVzLm1hcCgoY2F0ZWdvcnk6IGFueSkgPT4geztcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjYXRlZ29yeS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW0uY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuZGF0YS5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLmxpbmspXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRVcmxzLnB1c2goY2hpbGQubGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogY2hpbGQudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogY2hpbGQubGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWF0Y2g6IGNoaWxkLmFjdGl2ZU1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFx1NTMzOVx1OTE0RFx1NTIzMFx1NEUwMFx1N0VBN1x1NEY0Nlx1NjYyRlx1NjcyQVx1NTMzOVx1OTE0RFx1NTIzMFx1NEU4Q1x1N0VBN1xuICAgICAgICAgICAgY29uc3Qgbm90TWF0Y2hlZCA9IGl0ZW0uY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAuZmlsdGVyKGNoaWxkID0+ICFzZWNvbmRVcmxzLmluY2x1ZGVzKGNoaWxkLmxpbmspKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQubGluaylcbiAgICAgICAgICAgICAgICAubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNoaWxkLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBjaGlsZC5saW5rLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWF0Y2g6IGNoaWxkLmFjdGl2ZU1hdGNoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2lraVNpZGViYXIucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbS5kYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogWy4uLnNlY29uZCwgLi4ubm90TWF0Y2hlZF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gXHU0RTAwXHU3RUE3XHU1OTI3XHU1MjA2XHU3QzdCXG4gICAgICAgICAgICB3aWtpU2lkZWJhci5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLnRleHQsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQubGluaylcbiAgICAgICAgICAgICAgICAgICAgLm1hcChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNoaWxkLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogY2hpbGQubGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXRjaDogY2hpbGQuYWN0aXZlTWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gXHU2REZCXHU1MkEwIHdpa2lcbiAgICBzaWRlYmFyRmxhdFsnd2lraSddID0gd2lraVNpZGViYXI7XG5cbiAgICByZXR1cm4gc2lkZWJhckZsYXQ7XG59XG5cbi8qKlxuICogXHU5MDEyXHU1RjUyXHU2MzkyXHU1RThGXHU0RkE3XHU4RkI5XHU2ODBGXHU5ODc5XHU3NkVFXG4gKi9cbmZ1bmN0aW9uIHNvcnRTaWRlYmFySXRlbXMoaXRlbXM6IFNpZGViYXJJdGVtW10pOiB2b2lkIHtcbiAgICAvLyBcdTY4MzlcdTYzNkUgb3JkZXIgXHU1QjU3XHU2QkI1XHU2MzkyXHU1RThGXG4gICAgaXRlbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBvcmRlckEgPSBhLm9yZGVyID8/IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICBjb25zdCBvcmRlckIgPSBiLm9yZGVyID8/IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICByZXR1cm4gb3JkZXJBIC0gb3JkZXJCO1xuICAgIH0pO1xuXG4gICAgLy8gXHU5MDEyXHU1RjUyXHU2MzkyXHU1RThGXHU1QjUwXHU5ODc5XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzb3J0U2lkZWJhckl0ZW1zKGl0ZW0uaXRlbXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogXHU0RUNFXHU2NTg3XHU0RUY2IEZyb250bWF0dGVyIFx1NjIxNlx1NjU4N1x1NEVGNlx1NTQwRFx1NjNEMFx1NTNENlx1NjgwN1x1OTg5OFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRUaXRsZUZyb21GaWxlKGZpbGVQYXRoOiBzdHJpbmcsIG1hdHRlckRhdGE6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKG1hdHRlckRhdGEudGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIG1hdHRlckRhdGEudGl0bGUudHJpbSgpLnJlcGxhY2UoL1snXCJdL2csICcnKTtcbiAgICB9XG4gICAgLy8gXHU1OTgyXHU2NzlDXHU2Q0ExXHU2NzA5IGZyb250bWF0dGVyIHRpdGxlXHVGRjBDXHU0RUNFXHU2NTg3XHU0RUY2XHU1NDBEXHU4M0I3XHU1M0Q2XG4gICAgY29uc3QgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoLCAnLm1kJyk7XG4gICAgLy8gXHU2NjZFXHU5MDFBXHU2NTg3XHU0RUY2XHVGRjBDXHU3OUZCXHU5NjY0XHU2NTcwXHU1QjU3XHU1MjREXHU3RjAwXHU1NDhDXHU4RkRFXHU1QjU3XHU3QjI2XG4gICAgcmV0dXJuIGJhc2VuYW1lLnJlcGxhY2UoL15cXGQrLVxccyovLCAnJykucmVwbGFjZSgvLS9nLCAnICcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVNpZGViYXI7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9mYW5neWl6aG91L0RvY3VtZW50cy9jb2RpbmcvbmV0ZWFzZS1tb2RzZGstd2lraS9zY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZmFuZ3lpemhvdS9Eb2N1bWVudHMvY29kaW5nL25ldGVhc2UtbW9kc2RrLXdpa2kvc2NyaXB0cy9zaWRlYmFyLXdpa2kudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Zhbmd5aXpob3UvRG9jdW1lbnRzL2NvZGluZy9uZXRlYXNlLW1vZHNkay13aWtpL3NjcmlwdHMvc2lkZWJhci13aWtpLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcblxuY29uc3QgYmFzZVVybCA9ICcvJ1xuXG4vLyBkZWZpbmUgd2hldGhlciBiaWcgcGFnZXMgc2hvdWxkIGJlIGJ1aWx0LlxuLy8gZmFzdEJ1aWxkIHNob3VsZCBvbmx5IGJlIHVzZWQgd2hlbiB0ZXN0aW5nLCBzaW5jZSBpdCB3aWxsIG5vdCBjb21waWxlIHNvbWUgb2YgdGhlIHdpa2lzIGNvbnRlbnQuXG5jb25zdCBleGNsdWRlRmlsZXMgPSBbXG4gICAgJ2VudGl0aWVzL3ZhbmlsbGEtdXNhZ2UtY29tcG9uZW50cy5tZCcsXG4gICAgJ2VudGl0aWVzL3ZhbmlsbGEtdXNhZ2Utc3Bhd24tcnVsZXMubWQnLFxuICAgICdlbnRpdGllcy92dWMtZnVsbC5tZCcsXG4gICAgJ2VudGl0aWVzL3Z1c3ItZnVsbC5tZCcsXG5dXG5cbmNvbnN0IGZhc3RCdWlsZCA9IHByb2Nlc3MuZW52LmZhc3RCdWlsZCA9PT0gJ3RydWUgJyAvLyBTUEFDRSBoYXMgdG8gYmUgdGhlcmUsIHNpbmNlIHRoZSBTRVQgdmFyPXZhbCBjb21tYW5kIGFkZHMgYSBzcGFjZSBhdCB0aGUgZW5kIVxuXG5pZiAoZmFzdEJ1aWxkICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgXFxuSU5GTzogZmFzdEJ1aWxkIHNlbGVjdGVkLiB0aGUgZmlsZXM6XFxuJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWxlcyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICA0XG4gICAgICAgICl9XFxud2lsbCBub3QgYmUgY29tcGlsZWQhXFxuYFxuICAgIClcbn1cblxuZnVuY3Rpb24gZm9ybWF0TGluayhwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aC5zcGxpdCgvXFxcXHxcXC8vZykuam9pbignLycpLnJlcGxhY2UoJy5tZCcsICcnKVxufVxuXG4vKlxuR2V0cyB0aGUgY2F0ZWdvcmllcyBmcm9tIHdpdGhpbiB0aGUgZnJvbnRtYXR0ZXIgb2YgYW4gaW5kZXgubWQgZmlsZSwgYW5kIHJldHVybnMgdGhlbSBhcyBsaXN0LlxuICovXG5mdW5jdGlvbiBnZXRDYXRlZ29yeU9yZGVyKGZyb250TWF0dGVyOiBtYXR0ZXIuR3JheU1hdHRlckZpbGU8c3RyaW5nPikge1xuICAgIGNvbnN0IGRhdGE6IHsgW0tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fVxuICAgIGlmICghZnJvbnRNYXR0ZXIuZGF0YS5jYXRlZ29yaWVzKSB7XG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnJvbnRNYXR0ZXIuZGF0YS5jYXRlZ29yaWVzLmZvckVhY2goZnVuY3Rpb24gKFxuICAgICAgICBjYXRlZ29yeTogeyB0aXRsZTogc3RyaW5nIHwgbnVtYmVyIH0sXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgZGF0YVtjYXRlZ29yeS50aXRsZV0gPSBpbmRleCArIDFcbiAgICB9KVxuXG4gICAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcmllcyhmcm9udE1hdHRlcjogbWF0dGVyLkdyYXlNYXR0ZXJGaWxlPHN0cmluZz4pIHtcbiAgICBjb25zdCBkYXRhOiB7XG4gICAgICAgIHRleHQ6IGFueVxuICAgICAgICBkYXRhOiBhbnlcbiAgICAgICAgdGFnczogYW55XG4gICAgICAgIHByZWZpeDogYW55XG4gICAgICAgIHNlY3Rpb246IGJvb2xlYW5cbiAgICAgICAgY29sb3I6IGFueVxuICAgICAgICBsaW5rOiBzdHJpbmdcbiAgICAgICAgYWN0aXZlTWF0Y2g6IHN0cmluZ1xuICAgIH1bXSA9IFtdXG4gICAgaWYgKCFmcm9udE1hdHRlci5kYXRhLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmcm9udE1hdHRlci5kYXRhLmNhdGVnb3JpZXMuZm9yRWFjaChmdW5jdGlvbiAoXG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICBuYXZfb3JkZXI6IG51bWJlclxuICAgICAgICAgICAgY2F0ZWdvcnk6IGFueVxuICAgICAgICAgICAgdGl0bGU6IGFueVxuICAgICAgICAgICAgdGFnczogYW55XG4gICAgICAgICAgICBwcmVmaXg6IGFueVxuICAgICAgICAgICAgY29sb3I6IGFueVxuICAgICAgICB9LFxuICAgICAgICBpbmRleDogYW55XG4gICAgKSB7XG4gICAgICAgIGNhdGVnb3J5Lm5hdl9vcmRlciA9IC0xXG4gICAgICAgIGNhdGVnb3J5LmNhdGVnb3J5ID0gY2F0ZWdvcnkudGl0bGVcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IGNhdGVnb3J5LnRpdGxlLFxuICAgICAgICAgICAgZGF0YTogY2F0ZWdvcnksXG4gICAgICAgICAgICB0YWdzOiBjYXRlZ29yeS50YWdzLFxuICAgICAgICAgICAgcHJlZml4OiBjYXRlZ29yeS5wcmVmaXgsXG4gICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6IGNhdGVnb3J5LmNvbG9yLFxuICAgICAgICAgICAgbGluazogJycsXG4gICAgICAgICAgICBhY3RpdmVNYXRjaDogJyAnLFxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gZGF0YVxufVxuXG5sZXQgb3JkZXI6IHsgW0tleTogc3RyaW5nXTogbnVtYmVyIH1cblxuLypcblJlY3Vyc2l2ZWx5IGdlbmVyYXRlIHRoZSBuYXZpZ2F0aW9uIGxpbmtzIGZvciB0aGUgc2lkZWJhci5cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXaWtpU2lkZWJhcihiYXNlOiBzdHJpbmcsIGRpcjogc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0YToge1xuICAgICAgICB0ZXh0OiBhbnlcbiAgICAgICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxuICAgICAgICBjaGlsZHJlbj86IGFueVxuICAgICAgICB0YWdzPzogYW55XG4gICAgICAgIHByZWZpeD86IGFueVxuICAgICAgICBzZWN0aW9uPzogYW55XG4gICAgICAgIGNvbG9yPzogYW55XG4gICAgICAgIGxpbms/OiBzdHJpbmdcbiAgICAgICAgYWN0aXZlTWF0Y2g/OiBzdHJpbmdcbiAgICB9W10gPSBbXVxuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGlyKVxuXG4gICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICBsZXQgam9pbmVkUGF0aCA9IHBhdGguam9pbihkaXIsIGZpbGUpXG4gICAgICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMoam9pbmVkUGF0aClcbiAgICAgICAgLy8gSGFuZGxlIHRvcCBsZXZlbCBkaXJlY3Rvcmllc1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBzdGF0cy5pc0RpcmVjdG9yeSgpICYmXG4gICAgICAgICAgICBmcy5leGlzdHNTeW5jKHBhdGguam9pbihqb2luZWRQYXRoLCAnaW5kZXgubWQnKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBzdHIgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGpvaW5lZFBhdGgsICdpbmRleC5tZCcpLFxuICAgICAgICAgICAgICAgICd1dGY4J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbGV0IGZyb250TWF0dGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZyb250TWF0dGVyID0gbWF0dGVyKHN0cilcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBqb2luZWRQYXRoID0gcGF0aC5yZWxhdGl2ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5jd2QoKSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGpvaW5lZFBhdGgsICdpbmRleC5tZCcpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGA6OmVycm9yIGZpbGU9JHtqb2luZWRQYXRofSxsaW5lPTEsY29sPTE6OkZpbGUgJHtqb2luZWRQYXRofSBoYXMgaW52YWxpZCBmcm9udG1hdHRlciEgJHtlLm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgYEZpbGUgJHtqb2luZWRQYXRofSBoYXMgaW52YWxpZCBmcm9udG1hdHRlciEgJHtlLm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3JkZXIgPSBnZXRDYXRlZ29yeU9yZGVyKGZyb250TWF0dGVyKVxuXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGdlbmVyYXRlV2lraVNpZGViYXIoYmFzZSwgam9pbmVkUGF0aCkuY29uY2F0KFxuICAgICAgICAgICAgICAgIGdldENhdGVnb3JpZXMoZnJvbnRNYXR0ZXIpXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IGRhdGFBLCB0ZXh0OiB0ZXh0QSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IGRhdGFCLCB0ZXh0OiB0ZXh0QiB9XG4gICAgICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gbWF4IGludCwgc28gd2l0aG91dCBuYXYgb3JkZXIgeW91IHdpbGwgc2hvdyBzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbHkgYnkgY2F0ZWdvcnkgdmFsdWUgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdkEgPVxuICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGFBLm5hdl9vcmRlciB8fCA1MCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKG9yZGVyW2RhdGFBLmNhdGVnb3J5XSB8fCAwKSAqIDEwMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmF2QiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YUIubmF2X29yZGVyIHx8IDUwKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAob3JkZXJbZGF0YUIuY2F0ZWdvcnldIHx8IDApICogMTAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRpZSBnb2VzIHRvIHRoZSB0ZXh0IGNvbXBhcmUhIChXaWxsIGFsc28gYXBwbHkgZm9yIGVsZW1lbnRzIHdpdGhvdXQgbmF2IG9yZGVyKVxuICAgICAgICAgICAgICAgICAgICBpZiAobmF2QSA9PSBuYXZCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGV4dEEubG9jYWxlQ29tcGFyZSh0ZXh0QilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBuYXYgb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hdkEgLSBuYXZCXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmcm9udE1hdHRlci5kYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGRhdGE6IGZyb250TWF0dGVyLmRhdGEsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGZyb250TWF0dGVyLmRhdGEudGl0bGUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0ZpbGUgJyArXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihqb2luZWRQYXRoLCAnaW5kZXgubWQnKSArXG4gICAgICAgICAgICAgICAgICAgICcgaGFzIGludmFsaWQgZnJvbnRtYXR0ZXIhJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgbm9ybWFsIGZpbGVzXG4gICAgICAgIGVsc2UgaWYgKHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAvLyBEb24ndCBpbmNsdWRlIG5vbi1tYXJrZG93biBmaWxlcywgb3IgdGhlIGluZGV4IHBhZ2UgaXRzZWxmXG4gICAgICAgICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5tZCcpIHx8IGZpbGUuZW5kc1dpdGgoJ2luZGV4Lm1kJykpIHJldHVyblxuXG4gICAgICAgICAgICBjb25zdCBzdHIgPSBmcy5yZWFkRmlsZVN5bmMoam9pbmVkUGF0aCwgJ3V0ZjgnKVxuICAgICAgICAgICAgbGV0IGZyb250TWF0dGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZyb250TWF0dGVyID0gbWF0dGVyKHN0cilcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBqb2luZWRQYXRoID0gcGF0aC5yZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBqb2luZWRQYXRoKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGA6OmVycm9yIGZpbGU9JHtqb2luZWRQYXRofSxsaW5lPTEsY29sPTE6OkZpbGUgJHtqb2luZWRQYXRofSBoYXMgaW52YWxpZCBmcm9udG1hdHRlciEgJHtlLm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgYEZpbGUgJHtqb2luZWRQYXRofSBoYXMgaW52YWxpZCBmcm9udG1hdHRlciEgJHtlLm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBmb3JtYXRMaW5rKGpvaW5lZFBhdGgudG9TdHJpbmcoKS5yZXBsYWNlKGJhc2UsICcnKSlcblxuICAgICAgICAgICAgLy8gRG9uJ3QgaW5jbHVkZSBoaWRkZW4gcGFnZXMgKGlnbm9yZXMgY2hpbGRyZW4pXG4gICAgICAgICAgICBpZiAoZnJvbnRNYXR0ZXIuZGF0YS5oaWRkZW4gPT09IHRydWUpIHJldHVyblxuXG4gICAgICAgICAgICBsZXQgcHJlZml4ID0gbnVsbFxuXG4gICAgICAgICAgICBpZiAoZnJvbnRNYXR0ZXIuZGF0YS5wcmVmaXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IGZyb250TWF0dGVyLmRhdGEucHJlZml4XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0YWdzID0gbnVsbFxuXG4gICAgICAgICAgICBpZiAoZnJvbnRNYXR0ZXIuZGF0YS50YWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0YWdzID0gZnJvbnRNYXR0ZXIuZGF0YS50YWdzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIHRleHQ6IGZyb250TWF0dGVyLmRhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZnJvbnRNYXR0ZXIuZGF0YSxcbiAgICAgICAgICAgICAgICB0YWdzOiB0YWdzLFxuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IGZyb250TWF0dGVyLmRhdGEuc2VjdGlvbiB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogZnJvbnRNYXR0ZXIuZGF0YS5jb2xvciB8fCAnbm9uZScsXG4gICAgICAgICAgICAgICAgbGluayxcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXRjaDogYF4ke2xpbmt9YCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAoZnJvbnRNYXR0ZXIuZGF0YS50aXRsZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgam9pbmVkUGF0aCA9IHBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgam9pbmVkUGF0aClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYDo6ZXJyb3IgZmlsZT0ke2pvaW5lZFBhdGh9LGxpbmU9MSxjb2w9MTo6RmlsZSAke2pvaW5lZFBhdGh9IGhhcyBpbnZhbGlkIGZyb250bWF0dGVyIWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlICR7am9pbmVkUGF0aH0gaGFzIGludmFsaWQgZnJvbnRtYXR0ZXIhYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZGF0YS5zb3J0KFxuICAgICAgICAoeyBkYXRhOiBkYXRhQSwgdGV4dDogdGV4dEEgfSwgeyBkYXRhOiBkYXRhQiwgdGV4dDogdGV4dEIgfSkgPT4ge1xuICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBtYXggaW50LCBzbyB3aXRob3V0IG5hdiBvcmRlciB5b3Ugd2lsbCBzaG93IHNlY29uZFxuICAgICAgICAgICAgLy8gTXVsdGlwbHkgYnkgY2F0ZWdvcnkgdmFsdWUgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICBjb25zdCBuYXZBID1cbiAgICAgICAgICAgICAgICAoZGF0YUEubmF2X29yZGVyIHx8IDUwKSArIChvcmRlcltkYXRhQS5jYXRlZ29yeV0gfHwgMCkgKiAxMDAgfHxcbiAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICAgICAgICAgICAgY29uc3QgbmF2QiA9XG4gICAgICAgICAgICAgICAgKGRhdGFCLm5hdl9vcmRlciB8fCA1MCkgKyAob3JkZXJbZGF0YUIuY2F0ZWdvcnldIHx8IDApICogMTAwIHx8XG4gICAgICAgICAgICAgICAgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcblxuICAgICAgICAgICAgLy8gVGllIGdvZXMgdG8gdGhlIHRleHQgY29tcGFyZSEgKFdpbGwgYWxzbyBhcHBseSBmb3IgZWxlbWVudHMgd2l0aG91dCBuYXYgb3JkZXIpXG4gICAgICAgICAgICBpZiAobmF2QSA9PSBuYXZCKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHRBLmxvY2FsZUNvbXBhcmUodGV4dEIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJldHVybiBuYXYgb3JkZXJcbiAgICAgICAgICAgIHJldHVybiBuYXZBIC0gbmF2QlxuICAgICAgICB9XG4gICAgKVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGVBQWUsV0FBVzs7O0FDRGlVLE9BQU9BLFNB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LGtCQUNYLHFCQUFxQjtBQUFBLGtCQUNyQixzQkFBc0I7QUFBQSxrQkFDdEIsNkJBQTZCO0FBQUEsa0JBQzdCLCtCQUErQjtBQUFBLGtCQUMvQix1QkFBdUI7QUFBQSxrQkFDdkIsaUNBQWlDO0FBQUEsZ0JBQ25DO0FBQUEsZ0JBQ0EsYUFBYTtBQUFBLGtCQUNYLFdBQVc7QUFBQSxrQkFDWCxVQUFVO0FBQUEsZ0JBQ1o7QUFBQSxnQkFDQSxRQUFRO0FBQUEsa0JBQ04sWUFBWTtBQUFBLGtCQUNaLGNBQWM7QUFBQSxrQkFDZCxXQUFXO0FBQUEsa0JBQ1gsY0FBYztBQUFBLGdCQUNoQjtBQUFBLGdCQUNBLGlCQUFpQjtBQUFBLGtCQUNmLGVBQWU7QUFBQSxrQkFDZixvQkFBb0I7QUFBQSxrQkFDcEIsMEJBQTBCO0FBQUEsa0JBQzFCLDhCQUE4QjtBQUFBLGdCQUNoQztBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJmcyIsICJwYXRoIiwgIm1hdHRlciIsICJwYXRoIiwgInBhdGgiLCAiZnMiLCAibWF0dGVyIiwgIm9yZGVyIl0KfQo=
