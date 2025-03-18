import { defineConfig } from 'vitepress';
import generateSidebar from '../../scripts/sidebar.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "我的世界中国版 ModSDK",
  description: "ModSDK 开发者文档 镜像，但提供更优质的搜索",
  ignoreDeadLinks: true,
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
