#!/usr/bin/env node
/** 将原文与独立标注合并为搜索记录；校验暂存索引后原子替换线上索引。 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import matter from 'gray-matter';
import dotenv from 'dotenv';
import { createMarkdownRenderer } from 'vitepress';
import { algoliasearch } from 'algoliasearch';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
const SITE = 'https://mcwiki.easecation.net';
const INDEX = 'netease-modsdk';
const MAX_BYTES = 8000;
const args = process.argv.slice(2);
if (args.some(arg => !['--dry-run', '--help'].includes(arg))) throw new Error('仅支持 --dry-run 或 --help');
if (args.includes('--help')) {
    console.log('npm run docs:algolia -- --dry-run：生成并校验，不访问 Algolia\nnpm run docs:algolia：生成、上传暂存索引、核对后替换线上索引');
    process.exit(0);
}
dotenv.config({ path: join(ROOT, '.env'), quiet: true });
const gitDir = execFileSync('git', ['rev-parse', '--absolute-git-dir'], { cwd: ROOT, encoding: 'utf8' }).trim();
const reportPath = join(gitDir, 'algolia-upload-report.json');
const bytes = value => Buffer.byteLength(JSON.stringify(value), 'utf8');
const unique = values => [...new Set(values.filter(Boolean))];

// 使用 VitePress 本身的标题锚点规则，包括重复标题的后缀。
const md = await createMarkdownRenderer(DOCS);
function textOf(tokens) {
    return tokens.map(t => {
        if (['fence', 'code_block', 'html_block', 'html_inline'].includes(t.type)) return '';
        if (t.type === 'image') return t.content;
        if (t.children) return textOf(t.children);
        if (['text', 'code_inline'].includes(t.type)) return t.content;
        if (['softbreak', 'hardbreak'].includes(t.type) || t.block && t.nesting === -1) return '\n';
        return '';
    }).join('');
}
const clean = text => text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

async function markdownFiles(dir) {
    const result = [];
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
        if (entry.name.startsWith('.') || ['node_modules', 'public'].includes(entry.name)) continue;
        const file = join(dir, entry.name);
        if (entry.isDirectory()) result.push(...await markdownFiles(file));
        else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) result.push(file);
    }
    return result;
}

function sections(content, docPath) {
    const tokens = md.parse(content, { path: join(DOCS, docPath), relativePath: docPath });
    const result = [];
    let h1 = '', current = { title: '', h1: '', level: 0, anchor: '', tokens: [] };
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.type === 'heading_open' && ['h1', 'h2'].includes(t.tag)) {
            if (current.tokens.length) result.push(current);
            const title = clean(textOf(tokens[i + 1].children || []));
            if (t.tag === 'h1') h1 = title;
            current = { title, h1, level: Number(t.tag[1]), anchor: t.attrGet('id') || '', tokens: [] };
            i += 2;
        } else current.tokens.push(t);
    }
    if (current.tokens.length || current.title) result.push(current);
    return result;
}

// 以完整 JSON 的 UTF-8 字节数切块；长段落和转义字符都不截断。
function chunks(record) {
    if (bytes(record) <= MAX_BYTES) return [record];
    const chars = Array.from(record.content);
    const output = [];
    let offset = 0;
    do {
        const base = { ...record, objectID: `${record.objectID}:chunk:${output.length}`, content: '' };
        if (bytes(base) >= MAX_BYTES) throw new Error(`标注等元数据超过记录限制：${record.url}`);
        let low = 0, high = chars.length - offset;
        while (low < high) {
            const count = Math.ceil((low + high) / 2);
            if (bytes({ ...base, content: chars.slice(offset, offset + count).join('') }) <= MAX_BYTES) low = count;
            else high = count - 1;
        }
        if (!low) throw new Error(`无法完整切分记录：${record.url}`);
        output.push({ ...base, content: chars.slice(offset, offset + low).join('') });
        offset += low;
    } while (offset < chars.length);
    if (output.map(r => r.content).join('') !== record.content) throw new Error('切块内容不完整');
    return output;
}

async function generate() {
    // 复用唯一标注构建入口，先核验原文章节哈希，避免上传过期标注。
    execFileSync(process.env.PYTHON || 'python3', ['scripts/api_knowledge.py', 'build'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'] });
    const index = JSON.parse(await readFile(join(ROOT, '.api-index/index.json'), 'utf8'));
    const notes = Object.values(JSON.parse(await readFile(join(ROOT, '.api-index/notes.json'), 'utf8')));
    const bySection = new Map();
    for (const entry of index.records) {
        const key = `${entry.doc_path}#${entry.anchor}`;
        bySection.set(key, [...(bySection.get(key) || []), entry]);
    }
    const records = [], joined = new Set();
    let sectionCount = 0;
    for (const file of await markdownFiles(DOCS)) {
        const docPath = relative(DOCS, file).split('\\').join('/');
        const { content, data } = matter(await readFile(file, 'utf8'));
        const rootType = docPath.split('/')[0];
        const pageTitle = docPath.replace(/\.md$/, '').split('/').map(p => p.replace(/^\d+-/, '')).join(' / ');
        for (const section of sections(content, docPath)) {
            const entries = bySection.get(`${docPath}#${section.anchor}`) || [];
            const annotations = entries.flatMap(e => e.annotation ? [e.annotation] : []);
            for (const note of annotations) joined.add(note.id);
            const body = clean(textOf(section.tokens));
            if (!body && !section.title) continue;
            const url = `${SITE}/${docPath.replace(/\.md$/, '.html').split('/').map(encodeURIComponent).join('/')}${section.anchor ? '#' + encodeURIComponent(section.anchor) : ''}`;
            const hierarchy = { lvl0: pageTitle, lvl1: section.h1 || data.title || pageTitle };
            if (section.level === 2) hierarchy.lvl2 = section.title;
            const record = {
                objectID: createHash('sha256').update(`${docPath}#${section.anchor}`).digest('hex').slice(0, 24),
                url, type: section.level ? `lvl${section.level}` : 'content', hierarchy,
                apiName: unique(entries.filter(e => e.kind !== 'document').map(e => e.name)),
                description: unique(entries.map(e => e.description)).join('；'),
                content: body,
                tags: unique(annotations.flatMap(a => a.tags || [])),
                aliases: unique(annotations.flatMap(a => a.aliases || [])),
                questions: unique(annotations.flatMap(a => a.questions || [])),
                usage: unique(annotations.map(a => a.usage)).join('\n'),
                cautions: unique(annotations.flatMap(a => a.cautions || [])),
                annotationIds: annotations.map(a => a.id),
                side: unique(entries.map(e => e.side)),
                scope: entries.some(e => e.scope === 'preset') || /预设|preset/i.test(docPath) ? 'preset' : 'modsdk',
                lang: 'zh-CN', _tags: ['zh-CN'], rootType,
                priority: { mcdocs: 3, mcguide: 2, mconline: 1 }[rootType] || 0,
                contentLength: body.length,
            };
            records.push(...chunks(record));
            sectionCount++;
        }
    }
    const missing = notes.filter(n => !joined.has(n.id)).map(n => n.id);
    if (missing.length) throw new Error(`有标注未关联到网页章节：${missing.join(', ')}`);
    if (!records.length || new Set(records.map(r => r.objectID)).size !== records.length) throw new Error('索引为空或 objectID 重复');
    if (records.some(r => bytes(r) > MAX_BYTES)) throw new Error('存在超大记录');
    const report = { index: INDEX, corpus_sha256: index.corpus_sha256, records: records.length,
        sections: sectionCount, annotations: joined.size, max_record_bytes: Math.max(...records.map(bytes)),
        records_sha256: createHash('sha256').update(JSON.stringify(records)).digest('hex'),
        generated_at: new Date().toISOString(), status: 'validated' };
    await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
    return { records, report };
}

const SETTINGS = {
    searchableAttributes: ['unordered(apiName)', 'unordered(tags)', 'unordered(aliases)', 'unordered(description)',
        'unordered(hierarchy.lvl2)', 'unordered(hierarchy.lvl1)', 'unordered(questions)', 'unordered(usage)',
        'unordered(cautions)', 'unordered(content)', 'unordered(hierarchy.lvl0)'],
    attributesForFaceting: ['lang', 'type', 'rootType', 'scope', 'side', 'tags'],
    attributesToHighlight: ['hierarchy.lvl0', 'hierarchy.lvl1', 'hierarchy.lvl2', 'content', 'tags', 'description'],
    attributesToSnippet: ['content:50', 'description:40'],
    attributesToRetrieve: ['hierarchy', 'content', 'description', 'type', 'url', 'lang', 'priority', 'rootType', 'scope', 'side', 'tags', 'apiName'],
    customRanking: ['desc(priority)', 'asc(contentLength)'],
    attributeForDistinct: 'url', distinct: 1,
    indexLanguages: ['zh'], queryLanguages: ['zh'],
};

async function upload(records, report) {
    if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY) throw new Error('缺少 ALGOLIA_APP_ID 或 ALGOLIA_ADMIN_KEY');
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const staging = `${INDEX}_staging_${Date.now()}`;
    const wait = (indexName, result) => client.waitForTask({ indexName, taskID: result.taskID });
    let published = false;
    try {
        Object.assign(report, { status: 'uploading', staging_index: staging });
        await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
        // 保留现有人工同义词和规则。上传失败时不改动线上记录或设置。
        const copy = await client.operationIndex({ indexName: INDEX, operationIndexParams: {
            operation: 'copy', destination: staging, scope: ['settings', 'rules', 'synonyms'] } });
        await wait(staging, copy);
        await wait(staging, await client.setSettings({ indexName: staging, indexSettings: SETTINGS }));
        for (let offset = 0; offset < records.length; offset += 500) {
            await client.saveObjects({ indexName: staging, objects: records.slice(offset, offset + 500), waitForTasks: true });
            console.log(`暂存上传 ${Math.min(offset + 500, records.length)}/${records.length}`);
        }
        const count = await client.searchSingleIndex({ indexName: staging, searchParams: { query: '', hitsPerPage: 0, distinct: false } });
        if (count.nbHits !== records.length) throw new Error(`暂存记录数不符：${count.nbHits}/${records.length}`);
        // 真实搜索检查：基础能力、近义表达和应用正文，均使用站点相同的课程过滤。
        const cases = [
            ['治疗玩家', 'SetAttrValue'], ['属性赋值', 'SetAttrValue'],
            ['精英怪属性强化', 'SetAttrValue'], ['GetPlayerAllItems', 'GetPlayerAllItems'],
        ];
        report.queries = [];
        for (const [query, expected] of cases) {
            const result = await client.searchSingleIndex({ indexName: staging, searchParams: {
                query, hitsPerPage: 5, facetFilters: ['rootType:-mconline', 'scope:modsdk'], attributesToRetrieve: ['apiName', 'url', 'tags'] } });
            const names = result.hits.flatMap(h => h.apiName || []);
            report.queries.push({ query, expected, names, passed: names.includes(expected) });
            if (!names.includes(expected)) throw new Error(`暂存搜索不符合预期：${query} -> ${names.join(', ')}`);
        }
        // 发出 move 后若网络中断，保留现场，由操作者核对状态。
        published = true;
        const move = await client.operationIndex({ indexName: staging, operationIndexParams: { operation: 'move', destination: INDEX } });
        await wait(INDEX, move);
        const live = await client.searchSingleIndex({ indexName: INDEX, searchParams: { query: '', hitsPerPage: 0, distinct: false } });
        if (live.nbHits !== records.length) throw new Error(`线上记录数不符：${live.nbHits}/${records.length}`);
        Object.assign(report, { status: 'published', published_at: new Date().toISOString(), task_id: move.taskID });
        delete report.staging_index;
        await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
        console.log(`线上索引已原子替换：${records.length} 条记录，${report.annotations} 条独立标注；旧记录已移除。`);
    } catch (error) {
        Object.assign(report, { status: published ? 'verify_required' : 'failed_before_publish', staging_index: staging, error: error.message });
        await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
        if (!published) {
            try { await wait(staging, await client.deleteIndex({ indexName: staging })); }
            catch { console.error(`暂存索引清理未完成：${staging}`); }
        }
        throw error;
    }
}

try {
    const { records, report } = await generate();
    if (!args.includes('--dry-run')) await upload(records, report);
} catch (error) {
    console.error(`搜索索引更新失败：${error.message}`);
    process.exitCode = 1;
}
