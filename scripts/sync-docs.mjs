#!/usr/bin/env node
/** 合并官方 Git 文档与 MCP 原始快照；附件完整后才写入工作区。 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const GROUPS = ['mcdocs', 'mcguide', 'mconline'];
const SITE = 'https://mc.163.com/dev/mcmanual/mc-dev/';
const SOURCES = [
  { name: 'mc-netease-sdk', option: 'sdk-source', repo: 'MCNeteaseDevs/mc-netease-sdk', maps: [['', 'mcdocs']] },
  { name: 'netease-bedrock-wiki', option: 'wiki-source', repo: 'MCNeteaseDevs/netease-bedrock-wiki', maps: [['mcguide', 'mcguide'], ['mconline', 'mconline']] },
  { name: 'modsdk_mcp_server', option: 'mcp-source', repo: 'MCNeteaseDevs/modsdk_mcp_server', maps: [] },
];
const EXCLUDED = new Set(['.git', '.github', '.gitignore', '.gitattributes', '.all-contributorsrc', 'README.md', 'readme.md', 'CHANGELOG.md', 'LICENSE', 'package.json', 'package-lock.json', 'node_modules', 'context7.json']);
const ASSET = /\.(?:png|jpe?g|gif|webp|svg|ico|bmp|tga|avif|mp4|webm|mp3|wav|ogg|pdf|zip|rar|7z|mcaddon|mcpack|mctemplate)(?:[?#]|$)/i;
const execAsync = promisify(execFile);
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to, fs.constants.COPYFILE_FICLONE); };
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const exists = file => fs.existsSync(file) && fs.statSync(file).isFile();
const inside = (root, file) => file === root || file.startsWith(root + path.sep);
const slash = value => value.split(path.sep).join('/');

function run(command, args, options = {}) {
  const r = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, ...options });
  if (r.error || r.status !== 0) throw new Error(`${command} ${args[0]} 失败：${r.error?.message || r.stderr || r.stdout}`);
  return r.stdout.trim();
}
function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.name === '.git' || e.name === 'node_modules') return [];
    const p = path.join(dir, e.name);
    if (e.isSymbolicLink()) throw new Error(`同步源包含软链接，拒绝越界读取：${p}`);
    return e.isDirectory() ? files(p) : e.isFile() ? [p] : [];
  });
}
function args() {
  const out = { 'cache-dir': path.join(os.tmpdir(), 'netease-sync-cache') };
  for (let i = 2; i < process.argv.length; i++) {
    const key = process.argv[i].replace(/^--/, '');
    if (key === 'help') {
      console.log('node scripts/sync-docs.mjs [--sdk-source PATH] [--wiki-source PATH] [--mcp-source PATH] [--cache-dir PATH]\n默认更新三个上游 Git 缓存；显式 source 路径只读使用，不执行 pull。所有附件验证完成后才应用文档变更。');
      process.exit(0);
    }
    if (!['sdk-source', 'wiki-source', 'mcp-source', 'cache-dir'].includes(key) || !process.argv[i + 1] || process.argv[i + 1].startsWith('--')) throw new Error(`无效参数：${process.argv[i]}`);
    out[key] = path.resolve(process.argv[++i]);
  }
  return out;
}
function source(spec, options) {
  const explicit = options[spec.option];
  const dir = explicit || path.join(options['cache-dir'], spec.name);
  const url = `https://github.com/${spec.repo}.git`;
  const env = { ...process.env, GIT_LFS_SKIP_SMUDGE: '1' };
  if (!explicit) {
    if (!fs.existsSync(dir)) {
      const sibling = path.resolve(ROOT, '..', spec.name);
      // 本机浅克隆也可以作为种子，随后从官方 origin 增量更新。
      const local = fs.existsSync(path.join(sibling, '.git'));
      run('git', ['clone', ...(local ? ['--no-hardlinks'] : ['--depth=1']), local ? sibling : url, dir], { env });
      run('git', ['-C', dir, 'remote', 'set-url', 'origin', url]);
    }
    if (run('git', ['-C', dir, 'remote', 'get-url', 'origin']) !== url) throw new Error(`缓存 origin 与配置不符：${dir}`);
    if (run('git', ['-C', dir, 'status', '--porcelain'])) throw new Error(`同步缓存有本地修改，已保留：${dir}`);
    run('git', ['-C', dir, 'fetch', 'origin', 'main'], { env });
    run('git', ['-C', dir, 'merge', '--ff-only', 'FETCH_HEAD'], { env });
  }
  const commit = run('git', ['-C', dir, 'rev-parse', 'HEAD']);
  console.log(`来源 ${spec.name}: ${commit.slice(0, 12)}${explicit ? '（显式本地快照）' : ''}`);
  return { ...spec, dir, commit };
}
function metadata(file) {
  if (!exists(file) || !file.endsWith('.md')) return {};
  return matter.read(file).data;
}
function timestamp(value) { const t = Date.parse(String(value || '')); return Number.isFinite(t) ? t : 0; }
function gitDate(src, rel) { return timestamp(run('git', ['-C', src.dir, 'log', '-1', '--format=%cI', src.commit, '--', rel])); }
function officialPath(url) {
  try {
    const u = new URL(url);
    if (u.origin !== 'https://mc.163.com' || !u.pathname.startsWith('/dev/mcmanual/mc-dev/')) return null;
    const rel = decodeURIComponent(u.pathname.slice('/dev/mcmanual/mc-dev/'.length)).replace(/\.html$/, '.md');
    if (!GROUPS.includes(rel.split('/')[0]) || !inside(DOCS, path.resolve(DOCS, rel))) return null;
    return rel;
  } catch { return null; }
}
function pointer(file) {
  if (!exists(file) || fs.statSync(file).size > 1024) return null;
  const s = fs.readFileSync(file, 'utf8');
  if (!s.startsWith('version https://git-lfs.github.com/spec/v1')) return null;
  const oid = s.match(/^oid sha256:([a-f0-9]{64})$/m)?.[1];
  const size = s.match(/^size (\d+)$/m)?.[1];
  if (!oid || !size) throw new Error(`无效 LFS 指针：${file}`);
  return { oid, size: Number(size) };
}
function validAsset(file, expected) {
  if (!exists(file) || pointer(file)) return false;
  const size = fs.statSync(file).size;
  if (!size) return false;
  if (expected) return size === expected.size && sha(file) === expected.oid;
  const fd = fs.openSync(file, 'r'); const head = Buffer.alloc(512);
  try { fs.readSync(fd, head, 0, head.length, 0); } finally { fs.closeSync(fd); }
  if (/^\s*(?:<!doctype\s+html|<html\b|<Error\b)/i.test(head.toString('utf8'))) return false;
  const ext = path.extname(file.replace(/\.download$/, '')).toLowerCase();
  // 上游有扩展名为 PNG、实际为 JPEG/WebP 的可用图片，按文件内容识别图片族。
  if (['.gif', '.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return /^GIF8[79]a/.test(head.toString('ascii', 0, 6))
    || head.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
    || (head[0] === 255 && head[1] === 216 && head[2] === 255)
    || (head.toString('ascii', 0, 4) === 'RIFF' && head.toString('ascii', 8, 12) === 'WEBP');
  if (ext === '.mp4') return head.toString('ascii', 4, 8) === 'ftyp';
  if (ext === '.pdf') return head.toString('ascii', 0, 5) === '%PDF-';
  if (['.zip', '.mcpack', '.mcaddon', '.mctemplate'].includes(ext)) return head.toString('ascii', 0, 2) === 'PK';
  return true;
}
async function download(url, dest, expected) {
  const temp = dest + '.download';
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    await execAsync('curl', ['--fail', '--location', '--silent', '--show-error', '--connect-timeout', '15', '--max-time', '120', '--retry', '1', '--proto', '=https', '--proto-redir', '=https', '--output', temp, url], { maxBuffer: 1024 * 1024 });
    if (!validAsset(temp, expected)) throw new Error('附件为空、HTML 错误页、LFS 指针或哈希/大小不符');
    fs.renameSync(temp, dest);
  } finally { fs.rmSync(temp, { force: true }); }
}
function assetLinks(file) {
  const text = fs.readFileSync(file, 'utf8'); const urls = [];
  marked.walkTokens(marked.lexer(text), token => {
    if (token.type === 'image' || token.type === 'link') urls.push(token.href);
    if (token.type === 'html') for (const m of token.text.matchAll(/(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)) urls.push(m[1]);
  });
  return [...new Set(urls)].filter(u => ASSET.test(u) && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u));
}

async function resolveAssets(stage, sources, origins) {
  const needs = new Map();
  const allowedRoots = [DOCS, ...sources.flatMap(s => [s.dir, path.resolve(ROOT, '..', s.name)])];
  const pageCache = new Map();
  async function publishedAssets(page, filename) {
    // 官网构建会将 video/tracy.mp4 重命名为 assets/media/tracy.<hash>.mp4。
    // 只从对应原文网页读取真实引用，不能猜哈希，也不在其他页面按同名文件盲配。
    if (!pageCache.has(page)) pageCache.set(page, execAsync('curl', ['--fail', '--location', '--silent', '--show-error', '--connect-timeout', '15', '--max-time', '45', '--proto', '=https', '--proto-redir', '=https', page], { maxBuffer: 8 * 1024 * 1024 }).then(r => r.stdout));
    const html = await pageCache.get(page); const found = new Set();
    for (const m of html.matchAll(/(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)) {
      const u = new URL(m[1].replace(/&amp;/g, '&'), page);
      const name = decodeURIComponent(path.posix.basename(u.pathname)).replace(/\.[a-f0-9]{8,64}(?=\.[^.]+$)/i, '');
      if (u.protocol === 'https:' && name === filename) found.add(u.href);
    }
    if (found.size > 1) throw new Error(`官网同页附件映射不唯一：${filename}`);
    return [...found];
  }
  for (const file of GROUPS.flatMap(g => files(path.join(stage, g)))) {
    const rel = slash(path.relative(stage, file)); const p = pointer(file);
    if (p) needs.set(rel, { expected: p, refs: needs.get(rel)?.refs || [] });
    if (!file.endsWith('.md')) continue;
    for (const url of assetLinks(file)) {
      const decoded = decodeURIComponent(url.split(/[?#]/)[0]);
      // VitePress 的绝对资源路径对应 public，不属于同步目录。
      if (decoded.startsWith('/')) {
        const publicFile = path.resolve(DOCS, 'public', '.' + decoded);
        if (!inside(path.join(DOCS, 'public'), publicFile) || !validAsset(publicFile)) throw new Error(`缺失 public 附件：${rel} -> ${url}`);
        continue;
      }
      const dest = path.resolve(path.dirname(file), decoded);
      if (!inside(stage, dest) || !GROUPS.includes(path.relative(stage, dest).split(path.sep)[0])) throw new Error(`附件路径越界：${rel} -> ${url}`);
      if (validAsset(dest)) continue;
      const key = slash(path.relative(stage, dest));
      const item = needs.get(key) || { expected: pointer(dest), refs: [] };
      item.refs.push({ document: rel, url }); needs.set(key, item);
    }
  }
  let reused = 0; let downloaded = 0; const failures = [];
  // 同名附件必须按路径定位；LFS 还必须匹配原指针的 SHA-256 和大小。
  async function resolve(rel, item) {
    const dest = path.join(stage, rel); const candidates = [path.join(DOCS, rel)]; const urls = [];
    for (const src of sources) {
      for (const [from, to] of src.maps) {
        if (!rel.startsWith(to + '/')) continue;
        const sourceRel = slash(path.join(from, rel.slice(to.length + 1)));
        candidates.push(path.join(src.dir, sourceRel), path.resolve(ROOT, '..', src.name, sourceRel));
        urls.push(`https://media.githubusercontent.com/media/${src.repo}/${src.commit}/${sourceRel.split('/').map(encodeURIComponent).join('/')}`);
      }
      if (item.expected) {
        const oid = item.expected.oid;
        for (const repo of [src.dir, path.resolve(ROOT, '..', src.name), ROOT]) {
          candidates.push(path.join(repo, '.git/lfs/objects', oid.slice(0, 2), oid.slice(2, 4), oid));
        }
      }
    }
    for (const ref of item.refs) {
      const origin = origins.get(ref.document);
      if (origin?.file) candidates.push(path.resolve(path.dirname(origin.file), decodeURIComponent(ref.url.split(/[?#]/)[0])));
      const page = origin?.source_url || new URL(ref.document.replace(/\.md$/, '.html'), SITE).href;
      urls.push(new URL(ref.url, page).href);
    }
    urls.push(new URL(rel, SITE).href);
    for (const candidate of [...new Set(candidates)]) {
      if (!allowedRoots.some(root => inside(root, path.resolve(candidate)))) continue;
      if (validAsset(candidate, item.expected)) { copy(candidate, dest); reused++; return; }
    }
    let lastError;
    for (const url of [...new Set(urls)]) {
      if (!url.startsWith('https://')) continue;
      try { await download(url, dest, item.expected); downloaded++; return; }
      catch (e) { lastError = e.message.split('\n')[0]; }
    }
    for (const ref of item.refs) {
      const origin = origins.get(ref.document);
      const page = origin?.source_url || new URL(ref.document.replace(/\.md$/, '.html'), SITE).href;
      try {
        for (const url of await publishedAssets(page, path.posix.basename(rel))) {
          await download(url, dest, item.expected); downloaded++; return;
        }
      } catch (e) { lastError = e.message.split('\n')[0]; }
    }
    failures.push({ path: rel, references: item.refs, error: lastError || '无可用来源' });
  }
  const queue = [...needs];
  console.log(`附件：发现 ${queue.length} 个待恢复或校验的文件`);
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const [rel, item] = queue.shift();
      try { await resolve(rel, item); }
      catch (e) { failures.push({ path: rel, references: item.refs, error: e.message }); }
    }
  }));
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    throw new Error(`${failures.length} 个附件未能恢复；没有应用本次同步`);
  }
  console.log(`附件恢复：本地校验复用 ${reused}，下载 ${downloaded}，未解决 0`);
  return { reused, downloaded, unresolved: 0 };
}

function apply(stage, state, gitDir) {
  const changes = []; const counts = { added: 0, modified: 0, deleted: 0 };
  for (const group of GROUPS) {
    const desired = new Map(files(path.join(stage, group)).map(f => [slash(path.relative(stage, f)), f]));
    const current = new Map(files(path.join(DOCS, group)).map(f => [slash(path.relative(DOCS, f)), f]));
    for (const rel of new Set([...desired.keys(), ...current.keys()])) {
      const before = current.get(rel); const after = desired.get(rel);
      if (before && after && fs.statSync(before).size === fs.statSync(after).size && sha(before) === sha(after)) continue;
      const kind = !before ? 'added' : !after ? 'deleted' : 'modified'; counts[kind]++;
      changes.push({ path: rel, kind, before, after });
    }
  }
  console.log(`实际内容变更：+${counts.added} ~${counts.modified} -${counts.deleted}`);
  if (changes.length) {
    const backup = path.join(gitDir, 'sync-docs-backup');
    // 保留一份当前回滚现场；上次未完成的现场不覆盖。
    if (exists(path.join(backup, 'changes.json'))) {
      const old = JSON.parse(fs.readFileSync(path.join(backup, 'changes.json'), 'utf8'));
      if (!old.complete) throw new Error(`发现未完成的恢复现场：${backup}`);
    }
    fs.rmSync(backup, { recursive: true, force: true }); fs.mkdirSync(backup, { recursive: true });
    for (const c of changes) if (c.before) copy(c.before, path.join(backup, c.path));
    const receipt = { complete: false, changes: changes.map(({ path, kind }) => ({ path, kind })) };
    const save = () => fs.writeFileSync(path.join(backup, 'changes.json'), JSON.stringify(receipt, null, 2)); save();
    const touched = [];
    try {
      for (const c of changes) {
        touched.push(c);
        const target = path.join(DOCS, c.path);
        if (c.after) copy(c.after, target); else fs.unlinkSync(target);
      }
    } catch (e) {
      for (const c of touched.reverse()) {
        const target = path.join(DOCS, c.path);
        if (c.before) copy(path.join(backup, c.path), target); else fs.rmSync(target, { force: true });
      }
      receipt.complete = true; receipt.rolled_back = true; save(); throw e;
    }
    receipt.complete = true; save();
  }
  const report = path.join(gitDir, 'sync-docs-state.json');
  fs.writeFileSync(report, JSON.stringify({ ...state, changes: counts }, null, 2));
  console.log(`来源与附件回执：${report}`);
}

async function main() {
  const options = args(); fs.mkdirSync(options['cache-dir'], { recursive: true });
  const gitDir = run('git', ['-C', ROOT, 'rev-parse', '--absolute-git-dir']);
  const sources = SOURCES.map(s => source(s, options));
  for (const src of sources) for (const [from] of src.maps) {
    if (!fs.statSync(path.join(src.dir, from)).isDirectory()) throw new Error(`来源目录缺失：${src.name}/${from}`);
  }
  const mcp = sources[2]; const mcpDocs = path.join(mcp.dir, 'docs');
  if (!exists(path.join(mcpDocs, 'interface.json'))) throw new Error('MCP 文档目录不完整');
  const stage = fs.mkdtempSync(path.join(options['cache-dir'], 'stage-'));
  const origins = new Map(); const overlays = [];
  try {
    for (const src of sources) for (const [from, to] of src.maps) {
      const base = path.join(src.dir, from);
      for (const file of files(base)) {
        const rel = slash(path.relative(base, file));
        if (rel.split('/').some(p => EXCLUDED.has(p))) continue;
        const dest = `${to}/${rel}`; copy(file, path.join(stage, dest));
        origins.set(dest, { file, source: src.name, sourceRel: slash(path.relative(src.dir, file)), src });
      }
    }
    // 自维护导航和历史保留的 README 不交给上游删除。
    for (const group of GROUPS) for (const file of files(path.join(DOCS, group))) {
      if (['0-欢迎.md', 'README.md', 'readme.md'].includes(path.basename(file))) copy(file, path.join(stage, path.relative(DOCS, file)));
    }
    // 当前工作区中有证据日期的较新快照也参与合并，防止更换 MCP 来源后回退。
    const candidates = [
      ...GROUPS.flatMap(g => files(path.join(DOCS, g))).filter(f => f.endsWith('.md')).map(file => ({ file, retained: true })),
      ...files(mcpDocs).filter(f => f.endsWith('.md')).map(file => ({ file, retained: false })),
    ];
    for (const candidate of candidates) {
      const meta = metadata(candidate.file);
      if (candidate.retained && !meta.source_url) continue;
      const rel = meta.source_url ? officialPath(meta.source_url) : `mcdocs/1-ModAPI/${slash(path.relative(mcpDocs, candidate.file))}`;
      if (!rel) continue;
      const dest = path.join(stage, rel); const base = origins.get(rel);
      const date = timestamp(meta.last_modified);
      const baseDate = base?.date ?? (base?.src ? gitDate(base.src, base.sourceRel) : timestamp(metadata(dest).last_modified));
      // 无日期的旧 MCP 副本只能补缺；存在来源日期时才覆盖较旧页面。
      if (exists(dest) && (!date || date <= baseDate)) continue;
      copy(candidate.file, dest);
      origins.set(rel, { file: candidate.file, source: candidate.retained ? 'retained' : mcp.name, date, source_url: meta.source_url });
    }
    for (const [rel, origin] of origins) if (!origin.src) overlays.push({ path: rel, source: origin.source, source_url: origin.source_url || null, last_modified: origin.date ? new Date(origin.date).toISOString() : null, sha256: sha(path.join(stage, rel)) });
    console.log(`MCP/已保留的较新原文：${overlays.length} 篇；input/ 教程不覆盖官方教程仓库`);
    const assets = await resolveAssets(stage, sources, origins);
    const orderConfig = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/sync-order.json'), 'utf8'));
    for (const group of GROUPS) for (const [rel, order] of Object.entries(orderConfig[group] || {})) {
      const file = path.resolve(stage, group, rel);
      if (!inside(path.join(stage, group), file)) throw new Error('order 配置路径越界');
      if (exists(file)) {
        const parsed = matter.read(file);
        fs.writeFileSync(file, matter.stringify(parsed.content, { ...parsed.data, order }), 'utf8');
      }
    }
    apply(stage, { sources: sources.map(({ name, commit, dir }) => ({ name, commit, directory: dir })), overlays, assets }, gitDir);
    console.log('同步完成：文档和附件已应用。');
  } finally { fs.rmSync(stage, { recursive: true, force: true }); }
}
main().catch(e => { console.error(`同步失败：${e.message}`); process.exitCode = 1; });
