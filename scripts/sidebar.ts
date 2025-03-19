import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';

// 定义侧边栏项目接口
interface SidebarItem {
    text: string;
    link?: string;
    items?: SidebarItem[];
    order?: number; // 添加排序字段
    collapsed?: boolean; // 添加折叠状态控制
    activeMatch?: string; // 添加活动匹配模式
}

// 配置参数
const DOCS_DIR = 'docs';          // 文档根目录
const IGNORE_PATHS = ['README.md', 'readme.md', 'index.md']; // 忽略的文件名
const DEFAULT_COLLAPSED = true;   // 默认折叠状态

// 一级目录名称映射表
const CATEGORY_MAP: Record<string, string> = {
    "wiki": "Wiki",
    'mcdocs': 'API文档',
    'mcguide': '开发指南',
    'mconline': '教学课程'
};

/**
 * 从名称中提取排序数字
 * 例如：'0-概述' 返回 0，'1-基础' 返回 1
 */
function extractOrderNumber(name: string): number {
    const match = name.match(/^(\d+)-/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER; // 没有数字前缀的排在最后
}

/**
 * 生成侧边栏配置项
 */
async function generateSidebar(): Promise<Record<string, SidebarItem[]>> {
    const sidebar: Record<string, SidebarItem[]> = {};
    const files = await fg([`${DOCS_DIR}/**/*.md`]);

    // 处理所有非 index.md 文件
    for (const filePath of files) {
        const relativePath = path.relative(DOCS_DIR, filePath);
        if (IGNORE_PATHS.some(ignore => relativePath.toLowerCase().includes(ignore.toLowerCase()))) continue;

        const segments = relativePath.split(path.sep);
        const categoryKey = segments[0];

        // 使用映射表获取显示名称
        const categoryName = CATEGORY_MAP[categoryKey] || categoryKey;

        let currentLevel: SidebarItem[] = sidebar[categoryKey] || [];

        if (!sidebar[categoryKey]) {
            sidebar[categoryKey] = currentLevel;
        }

        // 递归构建层级结构
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i].replace('.md', '');
            const isLast = i === segments.length - 1;

            // 修改链接生成逻辑
            let link;
            if (isLast) {
                // 为文件生成链接
                link = `/${segments.slice(0, i + 1).join('/')}`.replace(/\.md$/, '');
            } else if (i === 0) {
                link = `/${segment}`;
            }

            const order = extractOrderNumber(segment); // 提取排序号

            if (isLast) {
                // 添加最终文件项
                const title = await getTitleFromFile(filePath);
                // 添加 activeMatch 以支持更精确的高亮匹配
                const activeMatch = `^${link}(?:/|$)`;
                currentLevel.push({ text: title, link, order, activeMatch });
            } else {
                // 查找或创建目录分组
                let displayText = i === 0 ? categoryName : segment;

                // 移除数字前缀
                displayText = displayText.replace(/^\d+-\s*/, '');

                let group = currentLevel.find(item =>
                    (i === 0 && item.text === categoryName) ||
                    (i !== 0 && item.text === displayText)
                );

                if (!group) {
                    const groupLink = i === 0 ? `/${segment}` : undefined;

                    group = {
                        text: displayText,
                        items: [],
                        order,
                        collapsed: i < 1 ? false : DEFAULT_COLLAPSED,
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

    // 对每个层级进行排序
    for (const key in sidebar) {
        sortSidebarItems(sidebar[key]);
    }

    // 移除第一级，将每一个第一级中的items平铺到一级
    const sidebarFlat: Record<string, SidebarItem[]> = {};
    for (const key in sidebar) {
        sidebarFlat[key] = [];
        sidebar[key].forEach(item => {
            if (item.items) {
                sidebarFlat[key].push(...item.items);
            } else {
                sidebarFlat[key].push(item);
            }
        });
    }

    return sidebarFlat;
}

/**
 * 递归排序侧边栏项目
 */
function sortSidebarItems(items: SidebarItem[]): void {
    // 根据 order 字段排序
    items.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    // 递归排序子项
    items.forEach(item => {
        if (item.items && item.items.length > 0) {
            sortSidebarItems(item.items);
        }
    });
}

/**
 * 从文件 Frontmatter 或文件名提取标题
 */
async function getTitleFromFile(filePath: string): Promise<string> {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        // 寻找 title 在 frontmatter 中的位置
        const frontmatterMatch = content.match(/^---\s*[\s\S]*?title:\s*(.*?)[\r\n][\s\S]*?---/);

        if (frontmatterMatch && frontmatterMatch[1]) {
            // 清理标题（移除引号等）
            return frontmatterMatch[1].trim().replace(/['"]/g, '');
        }

        // 如果没有 frontmatter title，从文件名获取
        const basename = path.basename(filePath, '.md');
        // 普通文件，移除数字前缀和连字符
        return basename.replace(/^\d+-\s*/, '').replace(/-/g, ' ');
    } catch (error) {
        console.error(`读取文件失败: ${filePath}`, error);
        return path.basename(filePath, '.md');
    }
}

export default generateSidebar;
