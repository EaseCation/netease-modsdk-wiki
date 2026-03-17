#!/usr/bin/env node
/**
 * sync-docs.mjs - 从上游官方仓库同步文档到本项目
 *
 * 上游来源：
 *   1. mc-netease-sdk（仓库根） → docs/mcdocs/
 *   2. netease-bedrock-wiki/mcguide/ → docs/mcguide/
 *   3. netease-bedrock-wiki/mconline/ → docs/mconline/
 *
 * 顺序覆盖：通过 sync-order.json 配置，将 order 值注入目标文件的 frontmatter
 */

import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');
const ORDER_CONFIG_PATH = path.join(__dirname, 'sync-order.json');

// ── 上游仓库配置 ──────────────────────────────────────────────────────────────
const UPSTREAMS = [
  {
    name: 'mc-netease-sdk',
    repo: 'https://github.com/MCNeteaseDevs/mc-netease-sdk.git',
    mappings: [
      // src 为空字符串表示仓库根目录
      { src: '', dest: 'docs/mcdocs', orderKey: 'mcdocs' }
    ]
  },
  {
    name: 'netease-bedrock-wiki',
    repo: 'https://github.com/MCNeteaseDevs/netease-bedrock-wiki.git',
    mappings: [
      { src: 'mcguide', dest: 'docs/mcguide', orderKey: 'mcguide' },
      { src: 'mconline', dest: 'docs/mconline', orderKey: 'mconline' }
    ]
  }
];

// 同步时排除的文件/目录（相对于源目录，适用于所有映射）
const EXCLUDE_PATTERNS = [
  '.git',
  '.github',
  '.gitignore',
  '.gitattributes',
  '.all-contributorsrc',
  'README.md',
  'readme.md',
  'CHANGELOG.md',
  'LICENSE',
  'package.json',
  'package-lock.json',
  'node_modules'
];

// 本地自维护的文件（上游不存在，但本项目需要保留的文件）
// rsync --delete 会删除目标中上游没有的文件，这里列出需要保护的本地文件
// 键为 dest 目录名（如 'docs/mcguide'），值为相对路径数组
const LOCAL_FILES = {
  'docs/mcdocs': ['0-欢迎.md'],
  'docs/mcguide': ['0-欢迎.md'],
  'docs/mconline': ['0-欢迎.md'],
};

// ── 工具函数 ──────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(msg);
}

function logSection(title) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('─'.repeat(60));
}

/**
 * 克隆或更新仓库
 * 使用 GIT_LFS_SKIP_SMUDGE=1 跳过 LFS 文件下载（避免上游 LFS 超限导致失败）
 * @param {string} repo - 仓库 URL
 * @param {string} tmpDir - 本地目录路径
 */
function cloneOrUpdate(repo, tmpDir) {
  // GIT_LFS_SKIP_SMUDGE=1：跳过 LFS 文件实际下载，LFS 文件保留为指针文件
  // 这样即使上游 LFS 超限也不影响文字内容的同步
  const env = { ...process.env, GIT_LFS_SKIP_SMUDGE: '1' };

  if (fs.existsSync(path.join(tmpDir, '.git'))) {
    log(`  更新仓库: ${path.basename(tmpDir)}`);
    const result = spawnSync('git', ['-C', tmpDir, 'pull', '--ff-only'], { encoding: 'utf8', env });
    if (result.status !== 0) {
      // pull 失败时尝试 fetch + reset（处理 non-fast-forward 情况）
      log(`  pull 失败，尝试 fetch + reset...`);
      spawnSync('git', ['-C', tmpDir, 'fetch', '--depth=1'], { encoding: 'utf8', env });
      const reset = spawnSync('git', ['-C', tmpDir, 'reset', '--hard', 'FETCH_HEAD'], { encoding: 'utf8', env });
      if (reset.status !== 0) {
        throw new Error(`git 更新失败:\n${result.stderr}\n${reset.stderr}`);
      }
    }
    const ahead = spawnSync('git', ['-C', tmpDir, 'log', '--oneline', '-1'], { encoding: 'utf8', env });
    log(`  最新提交: ${ahead.stdout.trim()}`);
  } else {
    log(`  克隆仓库: ${repo}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    const result = spawnSync('git', ['clone', '--depth=1', repo, tmpDir], { encoding: 'utf8', env });
    // git clone 遇到 LFS 问题时退出码非 0，但文字文件已检出
    // 只有在目录为空（无 .git）时才视为真正失败
    if (result.status !== 0 && !fs.existsSync(path.join(tmpDir, '.git'))) {
      throw new Error(`git clone 失败:\n${result.stderr}`);
    }
    if (result.status !== 0) {
      log(`  ⚠️  LFS 文件跳过（上游 LFS 超限），仅同步文本文件`);
    } else {
      log(`  克隆完成`);
    }
  }
}

/**
 * 使用 rsync 同步目录，返回变更文件列表
 * @param {string} srcDir - 源目录（结尾不带 /）
 * @param {string} destDir - 目标目录
 * @param {string[]} excludes - 排除模式列表
 * @returns {{ added: string[], modified: string[], deleted: string[] }}
 */
function syncDirectory(srcDir, destDir, excludes) {
  // 确保目标目录存在
  fs.mkdirSync(destDir, { recursive: true });

  const excludeArgs = excludes.flatMap(p => ['--exclude', p]);

  // rsync -av --delete：同步所有文件并删除目标中多余的文件
  // --itemize-changes：输出每个文件的变更状态码
  // srcDir/ 结尾的 / 表示同步目录内容而非目录本身
  const result = spawnSync(
    'rsync',
    ['-a', '--delete', '--itemize-changes', ...excludeArgs, srcDir + '/', destDir + '/'],
    // 使用 buffer 避免中文路径在终端中显示乱码
    { encoding: 'buffer' }
  );

  if (result.status !== 0) {
    throw new Error(`rsync 失败:\n${result.stderr.toString('utf8')}`);
  }

  const stdout = result.stdout.toString('utf8');

  // 解析 rsync --itemize-changes 输出
  // 格式：YXcstpoguax filename
  // Y: > 表示文件从源传输，* 表示消息，. 表示不变
  // X: f 表示文件，d 表示目录，L 表示软链接
  const added = [];
  const modified = [];
  const deleted = [];

  const lines = stdout.split('\n').filter(Boolean);
  for (const line of lines) {
    if (line.length < 11) continue;
    const flags = line.substring(0, 11);
    const filePath = line.substring(12);
    if (!filePath || filePath.endsWith('/')) continue; // 跳过目录条目

    if (flags.startsWith('*deleting')) {
      deleted.push(filePath);
    } else if (flags[0] === '>' && flags[1] === 'f') {
      if (flags[2] === 'c' || flags[2] === '+') {
        // >f+++++++++ 表示新增，>fc 表示内容变化（修改）
        if (flags.includes('+++++++')) {
          added.push(filePath);
        } else {
          modified.push(filePath);
        }
      }
    }
  }

  return { added, modified, deleted };
}

/**
 * 读取文件的 frontmatter 和正文
 * @param {string} filePath
 * @returns {{ frontmatter: Record<string, any>, content: string, hasFrontmatter: boolean }}
 */
function parseFrontmatter(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) {
    return { frontmatterStr: null, body: content };
  }
  return { frontmatterStr: fmMatch[1], body: fmMatch[2] };
}

/**
 * 向指定 .md 文件注入或更新 frontmatter 中的 order 字段
 * @param {string} filePath - 绝对路径
 * @param {number} order - 要注入的 order 值
 */
function injectOrder(filePath, order) {
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatterStr, body } = parseFrontmatter(raw);

  let newContent;
  if (frontmatterStr === null) {
    // 无 frontmatter，直接添加
    newContent = `---\norder: ${order}\n---\n${body}`;
  } else {
    // 有 frontmatter，更新或添加 order 字段
    if (/^order\s*:/m.test(frontmatterStr)) {
      const updated = frontmatterStr.replace(/^order\s*:.*$/m, `order: ${order}`);
      newContent = `---\n${updated}\n---\n${body}`;
    } else {
      newContent = `---\n${frontmatterStr}\norder: ${order}\n---\n${body}`;
    }
  }

  fs.writeFileSync(filePath, newContent, 'utf-8');
}

/**
 * 根据 sync-order.json 配置向目标目录中的文件注入 order
 * @param {string} destDir - 目标目录绝对路径
 * @param {Record<string, number>} orderMap - 相对路径 → order 值的映射
 */
function applyOrderConfig(destDir, orderMap) {
  if (!orderMap || Object.keys(orderMap).length === 0) return;

  let injected = 0;
  for (const [relPath, order] of Object.entries(orderMap)) {
    const absPath = path.join(destDir, relPath);
    injectOrder(absPath, order);
    injected++;
  }

  if (injected > 0) {
    log(`  已注入 order 配置: ${injected} 个文件`);
  }
}

/**
 * 打印单次同步的变更报告
 */
function printChanges(label, changes) {
  const { added, modified, deleted } = changes;
  const total = added.length + modified.length + deleted.length;

  if (total === 0) {
    log(`  ${label}: 无变更`);
    return;
  }

  log(`  ${label}: +${added.length} ~${modified.length} -${deleted.length}`);

  if (added.length > 0) {
    log(`    新增 (${added.length}):`);
    added.slice(0, 20).forEach(f => log(`      + ${f}`));
    if (added.length > 20) log(`      ... 共 ${added.length} 个`);
  }
  if (modified.length > 0) {
    log(`    修改 (${modified.length}):`);
    modified.slice(0, 20).forEach(f => log(`      ~ ${f}`));
    if (modified.length > 20) log(`      ... 共 ${modified.length} 个`);
  }
  if (deleted.length > 0) {
    log(`    删除 (${deleted.length}):`);
    deleted.slice(0, 20).forEach(f => log(`      - ${f}`));
    if (deleted.length > 20) log(`      ... 共 ${deleted.length} 个`);
  }
}

// ── 主流程 ────────────────────────────────────────────────────────────────────

async function main() {
  log('\n🔄 开始同步上游文档...');

  // 读取顺序配置
  let orderConfig = { mcdocs: {}, mcguide: {}, mconline: {} };
  if (fs.existsSync(ORDER_CONFIG_PATH)) {
    try {
      const raw = fs.readFileSync(ORDER_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      // 过滤掉注释字段
      for (const key of Object.keys(parsed)) {
        if (!key.startsWith('_')) {
          orderConfig[key] = parsed[key];
        }
      }
    } catch (e) {
      log(`⚠️  读取 sync-order.json 失败，跳过顺序注入: ${e.message}`);
    }
  }

  // 使用固定的临时目录（避免每次都重新克隆）
  const tmpBase = path.join(os.tmpdir(), 'netease-sync-cache');
  fs.mkdirSync(tmpBase, { recursive: true });

  const allResults = [];

  try {
    for (const upstream of UPSTREAMS) {
      logSection(`同步 ${upstream.name}`);

      const repoDir = path.join(tmpBase, upstream.name);

      try {
        cloneOrUpdate(upstream.repo, repoDir);
      } catch (e) {
        log(`\n❌ ${upstream.name} 获取失败: ${e.message}`);
        continue;
      }

      for (const { src, dest, orderKey } of upstream.mappings) {
        const srcDir = src ? path.join(repoDir, src) : repoDir;
        const destDir = path.join(PROJECT_ROOT, dest);

        if (!fs.existsSync(srcDir)) {
          log(`\n⚠️  源目录不存在: ${src || '(仓库根)'}，跳过`);
          log(`  仓库顶级内容: ${fs.readdirSync(repoDir).join(', ')}`);
          continue;
        }

        log(`\n  同步: ${src || '(仓库根)'} → ${dest}/`);

        // 合并全局排除和本地文件保护列表
        const excludes = [...EXCLUDE_PATTERNS, ...(LOCAL_FILES[dest] || [])];

        let changes;
        try {
          changes = syncDirectory(srcDir, destDir, excludes);
        } catch (e) {
          log(`\n❌ rsync 失败: ${e.message}`);
          continue;
        }

        printChanges(`${dest}/`, changes);

        // 应用顺序配置
        if (orderConfig[orderKey]) {
          applyOrderConfig(destDir, orderConfig[orderKey]);
        }

        allResults.push({ dest, ...changes });
      }
    }
  } finally {
    // 不删除临时缓存目录，下次运行时直接 git pull 更新，加快速度
    // 如需强制清理：rm -rf /tmp/netease-sync-cache
  }

  // 总结
  logSection('同步完成');
  let totalAdded = 0, totalModified = 0, totalDeleted = 0;
  for (const r of allResults) {
    totalAdded += r.added.length;
    totalModified += r.modified.length;
    totalDeleted += r.deleted.length;
  }

  if (totalAdded + totalModified + totalDeleted === 0) {
    log('✅ 所有内容均已是最新，无需更新。');
  } else {
    log(`✅ 共变更: +${totalAdded} 新增  ~${totalModified} 修改  -${totalDeleted} 删除`);
    log('\n📝 提示: 请检查变更内容后手动执行 git add & commit。');
  }

  log('');
}

main().catch(err => {
  console.error('\n❌ 同步失败:', err.message);
  process.exit(1);
});
