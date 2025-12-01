import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import matter from 'gray-matter';
import { algoliasearch } from 'algoliasearch';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = resolve(__dirname, '../docs');

// 加载环境变量
await import('dotenv').then(r => r.config());

// 配置参数
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = 'netease-modsdk';
const MAX_RECORD_SIZE = 8000; // 字节，保守一点小于10000的限制

/**
 * 递归获取所有 Markdown 文件
 */
async function getAllMarkdownFiles(dir, base = '') {
    const files = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            const subPath = join(base, entry.name);
            const subFiles = await getAllMarkdownFiles(fullPath, subPath);
            files.push(...subFiles);
        } else if (entry.name.endsWith('.md')) {
            // 忽略以 _ 开头的特殊文件
            if (entry.name.startsWith('_') || entry.name.includes('索引')) {
                // console.log(entry.name);
                continue;
            }
            // 构建路由路径
            let routePath = join(base, entry.name.replace(/\.md$/, ''));
            // 特殊处理 index.md 文件，转换为目录路径
            if (entry.name === 'index.md') {
                routePath = base;
            }
            // 确保路径以 / 开头
            routePath = '/' + routePath;
            // 规范化路径分隔符
            routePath = routePath.replace(/\\/g, '/');

            files.push({
                filePath: fullPath,
                path: routePath
            });
        }
    }

    return files;
}

import { marked } from 'marked';

/**
 * 使用marked解析器按照标题(H1和H2)分割Markdown内容
 * 跳过标题为"索引"的H1部分
 */
function splitByHeadings(content) {
    const tokens = marked.lexer(content);
    const sections = [];
    let currentH1 = null;
    let currentH2 = null;
    let currentSection = {
        h1Title: null,
        h2Title: null,
        content: '',
        anchor: '',
        level: 0
    };
    let sectionStartIndex = 0;
    let skipSection = false; // 标记是否跳过当前区块

    // 初始处理：如果内容不是以标题开始，创建初始区块
    if (tokens.length > 0 && tokens[0].type !== 'heading') {
        let initialContent = '';
        let i = 0;

        // 收集直到第一个标题之前的所有内容
        while (i < tokens.length && tokens[i].type !== 'heading') {
            if (tokens[i].type === 'paragraph') {
                initialContent += tokens[i].text + '\n\n';
            } else if (tokens[i].type === 'code') {
                initialContent += '```' + tokens[i].lang + '\n' + tokens[i].text + '\n```\n\n';
            } else {
                initialContent += tokens[i].raw + '\n';
            }
            i++;
        }

        if (initialContent.trim()) {
            sections.push({
                h1Title: null,
                h2Title: null,
                content: initialContent.trim(),
                anchor: '',
                level: 0
            });
        }
    }

    // 主循环：处理所有标题并分割内容
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type === 'heading') {
            // 遇到新标题，处理之前的内容
            if (i > sectionStartIndex && !skipSection) {
                // 如果当前内容不为空且不在跳过模式，保存当前区块
                if (currentSection.content.trim()) {
                    sections.push({ ...currentSection });
                }
            }

            // 检查是否需要跳过此部分（标题为"索引"）
            skipSection = token.text === "索引" || token.text.includes("索引");

            // 根据标题级别更新当前上下文
            if (!skipSection && token.depth === 1) {
                currentH1 = token.text;
                currentH2 = null;

                if (!skipSection) {
                    currentSection = {
                        h1Title: token.text,
                        h2Title: null,
                        content: token.raw + '\n',
                        anchor: generateAnchor(token.text),
                        level: 1
                    };
                } else {
                    console.log(`跳过索引部分: ${token.text}`);
                    currentSection = {
                        h1Title: null,
                        h2Title: null,
                        content: '',
                        anchor: '',
                        level: 0
                    };
                }
            } else if (!skipSection && token.depth === 2) {
                currentH2 = token.text;
                currentSection = {
                    h1Title: currentH1,
                    h2Title: token.text,
                    content: token.raw + '\n',
                    anchor: generateAnchor(token.text),
                    level: 2
                };
            }

            sectionStartIndex = i;
        } else if (!skipSection) { // 只处理非跳过模式下的内容
            // 非标题内容，添加到当前区块
            if (token.type === 'paragraph') {
                currentSection.content += token.text + '\n\n';
            } else if (token.type === 'code') {
                currentSection.content += '```' + token.lang + '\n' + token.text + '\n```\n\n';
            } else {
                currentSection.content += token.raw + '\n';
            }
        }
    }

    // 添加最后一个区块（如果不在跳过模式）
    if (currentSection.content.trim() && !skipSection) {
        sections.push(currentSection);
    }

    return sections;
}

/**
 * 生成VitePress兼容的锚点链接
 */
function generateAnchor(text) {
    return `#${text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5-]/g, '')}`;
}

/**
 * 清理内容，移除代码块等
 */
function cleanContent(content) {
    // 移除代码块
    return content.replace(/```[\s\S]*?```/g, '');
}

/**
 * 获取目录的优先级
 * mcdocs - 最高优先级
 * mcguide - 中等优先级
 * mconline - 最低优先级
 */
function getDirectoryPriority(path) {
    const firstDir = path.split('/').filter(Boolean)[0];
    
    switch (firstDir) {
        case 'mcdocs':
            return 3; // 最高优先级
        case 'mcguide':
            return 2; // 中等优先级
        case 'mconline':
            return 1; // 较低优先级
        default:
            return 0; // 默认优先级
    }
}

/**
 * 获取目录的优先级
 * mcdocs - 最高优先级
 * mcguide - 中等优先级
 * mconline - 最低优先级
 */
function getDirectoryRootType(path) {
    const firstDir = path.split('/').filter(Boolean)[0];
    return firstDir;
}

/**
 * 从正文中提取"描述"的内容
 * @param {string} content Markdown内容
 * @return {string} 提取的描述文本
 */
function extractAPIDescription(content) {
    // 匹配"- 描述"部分，直到下一个部分标题(如"- 参数"、"- 返回值"等)或文档结束
    const descriptionRegex = /-\s*描述\s*\n([\s\S]*?)(?=\n\s*-\s*(?:参数|返回值|备注|示例)|$)/;
    const match = content.match(descriptionRegex);

    if (match && match[1]) {
        // 提取第一行并进行清理：
        // 1. 移除缩进
        // 2. 移除 Markdown 符号如 "-", "*", ">", 数字列表前缀 "1." 等
        const firstLine = match[1].split('\n')[0].trim();
        return firstLine
            .replace(/^[\s>*-]*\s*/, '')         // 移除开头的 >, *, - 等符号
            .replace(/^\d+\.\s*/, '')            // 移除数字列表前缀，如 "1. "
            .replace(/^\[.*?\]\s*/, '')          // 移除可能的 [xxx] 标记
            .trim();
    }

    return ''; // 如果没有找到描述，返回空字符串
}

/**
 * 生成符合VitePress的Algolia索引记录
 */
async function generateAlgoliaRecords() {
    // 获取所有 Markdown 文件
    const pages = await getAllMarkdownFiles(docsDir);
    const records = [];

    for (const page of pages) {
        try {
            const rawContent = await readFile(page.filePath, 'utf8');
            const { data: frontmatter, content } = matter(rawContent);
            const pageTitle = page.path
                .replaceAll("/mcdocs", "API文档")
                .replaceAll("/mcguide", "开发指南")
                .replaceAll("/mconline", "教学课程")
                .split('/')
                .map(s => s.split("-").pop())
                .join("/");

            // 确定这个页面的优先级
            const priority = getDirectoryPriority(page.path);
            const rootType = getDirectoryRootType(page.path);

            // 按标题分割内容
            const sections = splitByHeadings(content);

            for (const section of sections) {
                const { h1Title, h2Title, content: sectionContent, anchor, level } = section;
                const cleanedContent = cleanContent(sectionContent);

                // 构建这个部分的层次结构
                const hierarchy = {
                    lvl0: pageTitle,
                    lvl1: h1Title || pageTitle,
                };

                // 如果有H2标题，添加到层次结构
                if (h2Title) {
                    hierarchy.lvl2 = h2Title;
                }

                // 构建唯一ID和URL
                const objectID = `${page.path}${anchor}`;
                const url = `https://mcwiki.easecation.net${page.path}.html${anchor}`;

                const description = extractAPIDescription(cleanedContent);
                
                // 创建记录
                const record = {
                    objectID,
                    url,
                    type: level ? `lvl${level}` : 'content', // 标识这是什么级别的标题
                    hierarchy,
                    content: cleanedContent,
                    description,
                    _tags: ['zh-CN'],
                    lang: "zh-CN",
                    priority: priority, // 添加优先级字段
                    rootType: rootType
                };

                // 如果记录太大，则需要分割
                const recordSize = Buffer.byteLength(JSON.stringify(record), 'utf8');
                if (recordSize <= MAX_RECORD_SIZE) {
                    records.push(record);
                } else {
                    // console.log(`部分内容过大，需要进一步分割: ${objectID}`);

                    // 按段落分割大内容
                    const paragraphs = cleanedContent.split(/\n\s*\n/);
                    let currentChunk = '';
                    let chunkIndex = 0;

                    for (const paragraph of paragraphs) {
                        if (Buffer.byteLength(currentChunk + paragraph, 'utf8') > MAX_RECORD_SIZE / 2) {
                            // 当前块足够大，保存并开始新块
                            if (currentChunk) {
                                records.push({
                                    ...record,
                                    objectID: `${objectID}-chunk-${chunkIndex}`,
                                    content: currentChunk,
                                    _tags: [...(record._tags || []), 'chunked'],
                                    priority: record.priority // 确保保留优先级
                                });
                                chunkIndex++;
                                currentChunk = paragraph;
                            } else {
                                // 单个段落过大，需要硬分割
                                currentChunk = paragraph.substring(0, 1000) + '...';
                                records.push({
                                    ...record,
                                    objectID: `${objectID}-chunk-${chunkIndex}`,
                                    content: currentChunk,
                                    _tags: [...(record._tags || []), 'chunked'],
                                    priority: record.priority // 确保保留优先级
                                });
                                chunkIndex++;
                                currentChunk = '';
                            }
                        } else {
                            currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
                        }
                    }

                    // 添加最后一个块
                    if (currentChunk) {
                        records.push({
                            ...record,
                            objectID: `${objectID}-chunk-${chunkIndex}`,
                            content: currentChunk,
                            _tags: [...(record._tags || []), 'chunked'],
                        });
                    }
                }
            }
        } catch (error) {
            console.warn(`无法处理文件 ${page.filePath}: ${error.message}`);
        }
    }

    return records;
}

/**
 * 上传数据到 Algolia
 */
async function uploadToAlgolia(records) {
    if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
        console.error('❌ 缺少 Algolia 凭据。请检查环境变量 ALGOLIA_APP_ID 和 ALGOLIA_ADMIN_KEY');
        return;
    }

    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    try {
        console.log(`开始上传 ${records.length} 条记录到 Algolia...`);

        // 分批上传记录以避免请求过大
        const batchSize = 50; // 每批次处理的记录数
        let successCount = 0;
        let failureCount = 0;

        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            try {
                const operations = batch.map(record => ({
                    action: 'updateObject',
                    indexName: INDEX_NAME,
                    body: record
                }));

                await client.multipleBatch({ requests: operations });
                successCount += batch.length;
                console.log(`✅ 批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(records.length / batchSize)} 已上传 (${successCount}/${records.length})`);
            } catch (batchError) {
                console.error(`❌ 批次 ${Math.floor(i / batchSize) + 1} 上传失败:`, batchError.message);
                failureCount += batch.length;

                // 尝试逐条上传这个批次，以识别有问题的记录
                for (const record of batch) {
                    try {
                        await client.addOrUpdateObject({
                            indexName: INDEX_NAME,
                            objectID: record.objectID,
                            body: record
                        });
                        successCount += 1;
                        failureCount -= 1;
                    } catch (recordError) {
                        console.error(`❌ 记录上传失败 (objectID: ${record.objectID}):`, recordError.message);
                        console.error(`记录大小: ${Buffer.byteLength(JSON.stringify(record), 'utf8')} 字节`);
                    }
                }
            }
        }

        console.log(`✅ 完成上传 - 成功: ${successCount}, 失败: ${failureCount}`);
    } catch (error) {
        console.error('❌ 上传失败:', error);
        if (error.message) console.error('错误信息:', error.message);
        if (error.status) console.error('状态码:', error.status);
    }
}

async function settingAlgolia() {
    if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
        console.error('❌ 缺少 Algolia 凭据。请检查环境变量 ALGOLIA_APP_ID 和 ALGOLIA_ADMIN_KEY');
        return;
    }

    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    try {
        const response = await client.setSettings({
            indexName: INDEX_NAME,
            indexSettings: {
                attributesForFaceting: ['lang', 'type', 'rootType'],
                attributesToHighlight: ['hierarchy.lvl0', 'hierarchy.lvl1', 'hierarchy.lvl2', 'content'],
                attributesToSnippet: ['content:50'],
                attributesToRetrieve: ['hierarchy', 'content', 'description', 'type', 'url', 'lang', 'priority', 'rootType'],
                searchableAttributes: [
                    'hierarchy.lvl0',
                    'hierarchy.lvl1',
                    'hierarchy.lvl2',
                    'content'
                ],
                // 已经在网页上设置了，这边设置会重复
                customRanking: [
                    'desc(priority)', // 首先按优先级降序排列（值越高排越前）
                    'asc(content.length)' // 其次按内容长度升序（简短内容优先）
                ]
            },
            forwardToReplicas: true,
        });
        console.log('✅ 索引设置已更新');
    } catch (error) {
        console.error('❌ 设置失败:', error);
    }
}

// 执行流程
try {
    console.log('设置全局配置...');
    await settingAlgolia();

    console.log('开始生成 Algolia 索引数据...');
    const records = await generateAlgoliaRecords();
    console.log(`生成了 ${records.length} 条记录`);

    if (records.length > 0) {
        await uploadToAlgolia(records);
    } else {
        console.warn('⚠️ 没有找到文档，跳过上传');
    }
} catch (error) {
    console.error('❌ 处理失败:', error);
}