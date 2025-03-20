import dotenv from 'dotenv';
import tencentcloud from 'tencentcloud-sdk-nodejs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 加载环境变量
dotenv.config();

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从环境变量中获取腾讯云 API 密钥
const SECRET_ID = process.env.TENCENT_CLOUD_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_CLOUD_SECRET_KEY;
const ZONE_ID = process.env.TENCENT_CLOUD_ZONE_ID;

const ONLINE_WIKI_URL = "https://mcwiki.easecation.net";  // 最后不能带/

// 检查密钥是否存在
if (!SECRET_ID || !SECRET_KEY || !ZONE_ID) {
  console.error('错误: 请确保环境变量中设置了 TENCENT_CLOUD_SECRET_ID, TENCENT_CLOUD_SECRET_KEY 和 TENCENT_CLOUD_ZONE_ID');
  process.exit(1);
}

// 获取腾讯云 API 客户端
const TeoClient = tencentcloud.teo.v20220901.Client;

// 实例化客户端
const clientConfig = {
  credential: {
    secretId: SECRET_ID,
    secretKey: SECRET_KEY,
  },
  region: "", // EdgeOne 服务不需要指定地域
  profile: {
    httpProfile: {
      endpoint: "teo.tencentcloudapi.com",
    },
  },
};

const client = new TeoClient(clientConfig);

console.log('开始刷新 CDN 缓存...');

try {
    const response = await client.CreatePurgeTask({
        ZoneId: ZONE_ID,
        Type: "purge_prefix",
        Method: "invalidate",
        Targets: [
            ONLINE_WIKI_URL
        ]
    });
    console.log('刷新 CDN 缓存完成:', response);
} catch (error) {
    console.error('刷新目录缓存失败:', error);
    throw error;
}

console.log('开始预热部分页面...');

// 提取docs/.vitepress/dist/assets中匹配xxx.md.xxx.js形式的文件
const assetsDir = path.resolve(__dirname, '../docs/.vitepress/dist/assets');
const files = fs.readdirSync(assetsDir).filter(file => file.match(/\.md\.[a-zA-Z0-9]+\.js$/));

const prefetchPages = [
    "mcdocs/0-欢迎",
    "mcdocs/1-ModAPI/事件/事件索引表",
    "mcdocs/1-ModAPI/事件/UI",
    "mcdocs/1-ModAPI/事件/世界",
    "mcdocs/1-ModAPI/事件/实体",
    "mcdocs/1-ModAPI/事件/控制",
    "mcdocs/1-ModAPI/事件/方块",
    "mcdocs/1-ModAPI/事件/模型",
    "mcdocs/1-ModAPI/事件/物品",
    "mcdocs/1-ModAPI/事件/玩家",
    "mcdocs/1-ModAPI/事件/联机大厅",
    "mcdocs/1-ModAPI/事件/音效",
    "mcdocs/1-ModAPI/接口/Api索引表",
    "mcdocs/1-ModAPI/枚举值/索引",
    "mcguide/0-欢迎",
    "mcguide/20-玩法开发/13-模组SDK编程/2-Python脚本开发/0-脚本开发入门",
    "mcguide/18-界面与交互/2-从零开始创建UI",
    "mcguide/16-美术/6-模型和动作/00-模型制作方案",
    "mcguide/20-玩法开发/15-自定义游戏内容/1-自定义物品/1-自定义基础物品",
    "mcguide/20-玩法开发/15-自定义游戏内容/2-自定义方块/0-自定义方块概述",
    "mcguide/20-玩法开发/15-自定义游戏内容/3-自定义生物/01-自定义基础生物",
    "mcguide/20-玩法开发/15-自定义游戏内容/4-自定义维度/1-自定义维度",
    "mconline/0-欢迎",
    "wiki/guide/introduction",
    "wiki/modsdk/modsdk-intro",
    "wiki/blocks/blocks-intro",
    "wiki/items/items-intro",
    "wiki/entities/entity-intro-bp",
    "wiki/json-ui/json-ui-intro"
];

const prefetchPagesTag = prefetchPages.map(page => page.replaceAll("/", "_") + ".md");

const targetsJs = files
    .filter(file => prefetchPagesTag.filter(tag => file.indexOf(tag) >= 0).length > 0)
    .map(file => `${ONLINE_WIKI_URL}/assets/${file}`);

const targetsHtml = prefetchPages.map(file => `${ONLINE_WIKI_URL}/${file}.html`);

try {
    const response = await client.CreatePrefetchTask({
        ZoneId: ZONE_ID,
        Targets: [
            ONLINE_WIKI_URL,
            ONLINE_WIKI_URL + "/wiki",
            ...targetsHtml,
            ...targetsJs
        ]
    });
    console.log('预热 CDN 完成:', response);
} catch (error) {
    console.error('CDN 预热失败:', error);
    throw error;
}