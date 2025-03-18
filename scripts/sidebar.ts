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
const IGNORE_PATHS = ['README.md']; // 忽略的文件名
const DEFAULT_COLLAPSED = true;   // 默认折叠状态

// 一级目录名称映射表
const CATEGORY_MAP: Record<string, string> = {
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
                const linkSegments = segments.slice(0, i + 1);
                
                // 如果是 index.md，使用父目录
                if (segment === 'index') {
                    linkSegments.pop();
                }
                
                // 确保链接以斜杠开头但不以斜杠结尾
                link = `/${linkSegments.join('/')}`;
                if (link.length > 1 && link.endsWith('/')) {
                    link = link.slice(0, -1);
                }
            } else if (i === 0) {
                link = `/${segment}`;
            }

            const order = extractOrderNumber(segment); // 提取排序号

            if (isLast) {
                // 添加最终文件项
                const title = await getTitleFromFile(path.join(DOCS_DIR, ...segments.slice(0, i + 1)));
                // 添加 activeMatch 以支持更精确的高亮匹配
                const activeMatch = `^${link}(?:/|$)`;
                currentLevel.push({ text: title, link, order, activeMatch });
            } else {
                // 查找或创建目录分组
                let displayText = i === 0 ? categoryName : segment;
                let group = currentLevel.find(item => 
                    (i === 0 && item.text === categoryName) || 
                    (i !== 0 && item.text === segment)
                );
                
                if (!group) {
                    group = {
                        text: displayText,
                        items: [],
                        order,
                        collapsed: i < 1 ? false : DEFAULT_COLLAPSED,
                        // 为目录添加活动匹配模式
                        activeMatch: i === 0 ? `^/${segment}(?:/|$)` : undefined
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

    return sidebar;
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
    const content = await fs.readFile(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\s*[\s\S]*?title:\s*(.*?)\n\s*[\s\S]*?---/);

    // 处理标题，去掉数字前缀
    let title = frontmatterMatch
        ? frontmatterMatch[1]
        : path.basename(filePath, '.md').replace(/-/g, ' ').replace(/^\d+-\s*/, '');

    return title;
}

export default generateSidebar;
