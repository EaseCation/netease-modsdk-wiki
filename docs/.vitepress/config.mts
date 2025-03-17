import { defineConfig } from 'vitepress';
import generateSidebar from '../../scripts/sidebar.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "我的世界中国版 ModSDK",
  description: "我的世界中国版 ModSDK Wiki 镜像",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'API文档', link: '/mcdocs/0-概述/0-概述' },
      { text: '开发指南', link: '/mcguide/readme' },
      { text: '教学课程', link: '/mconline/readme' },
    ],

    sidebar: await generateSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/EaseCation/netease-modsdk-wiki' }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'F8HD84CUON',
        apiKey: 'ccaf9255472c593d8a8b0724a940bb29',
        indexName: 'netease-modsdk',
        searchParameters: {
          // 筛选掉 rootType 为 mconline 的项目
          facetFilters: ['rootType:-mconline']
        }
      }
    }
  }
})
