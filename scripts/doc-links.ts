// 镜像的路径兼容层：在渲染时修复明确的链接，不改写上游 Markdown。
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const paths: Record<string, string | null> = {
  '/wiki': '/wiki/index',
  '/discord': 'https://wiki.bedrock.dev/discord',
  '/contribute': 'https://wiki.bedrock.dev/contribute',
  '/understanding-json': '/wiki/guide/understanding-json',
  '/troubleshooting': '/wiki/guide/troubleshooting',
  '/commands/tick_json-creations': '/wiki/commands/on-player-death',
  '/wiki/commands/tickingarea': 'https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tickingarea?view=minecraft-bedrock-stable',
  '/mcdocs/1-ModAPI/事件/玩家html': '/mcdocs/1-ModAPI/事件/玩家',
  '/mcguide/20-玩法开发/14-预设玩法编程/9-第一个预设Mod/index': '/mcguide/20-玩法开发/14-预设玩法编程/9-第一个预设Mod/0-创建新版作品',
  '/mcguide/50-常见问题答疑/index': '/mcguide/50-常见问题答疑/86-开发者常见问题汇总',
  // 官网也返回缺页；不能凭相似名字改指到另一个枚举。
  '/mcdocs/1-ModAPI/枚举值/AniCheatMoveUnSupportRewind': null,
};
const verifiedHistory = new Set([
  ...Array.from({ length: 5 }, (_, i) => `1.${21 + i}`),
  ...Array.from({ length: 13 }, (_, i) => `2.${i}`),
  ...Array.from({ length: 8 }, (_, i) => `3.${i}`),
]);
// 与 VitePress 1.x 默认标题规则保持一致，仅用于匹配确实存在的标题。
function slug(text: string) {
  return text.normalize('NFKD').replace(/[\u0300-\u036f\u0000-\u001f]/g, '')
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
    .replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '').replace(/^(\d)/, '_$1').toLowerCase();
}
function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.name.startsWith('.')) return [];
    const file = path.join(dir, e.name);
    return e.isDirectory() ? walk(file) : e.name.endsWith('.md') ? [file] : [];
  });
}
export function docLinks(root: string) {
  const ids = new Map<string, Set<string>>();
  for (const file of walk(root)) {
    const found = new Set<string>(); const duplicates = new Map<string, number>();
    const text = fs.readFileSync(file, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const inlineText = (tokens: any[]): string => tokens.map(t => t.tokens ? inlineText(t.tokens) : ['text', 'codespan', 'escape', 'image'].includes(t.type) ? t.text : '').join('');
    marked.walkTokens(marked.lexer(text), (token: any) => {
      if (token.type === 'heading') {
        const explicit = token.text.match(/\s*\{#([^}]+)\}\s*$/)?.[1];
        const base = explicit || slug(inlineText(token.tokens || []));
        const count = duplicates.get(base) || 0; duplicates.set(base, count + 1);
        found.add(count ? `${base}-${count}` : base);
      }
      if (token.type === 'html') for (const m of token.text.matchAll(/\bid=["']([^"']+)["']/g)) found.add(m[1]);
    });
    ids.set('/' + path.relative(root, file).split(path.sep).join('/').replace(/\.md$/, ''), found);
  }
  function resolve(href: string, current: string): string | null {
    if (!href) return null;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return href;
    const url = new URL(href.replace(/&amp;/g, '&'), 'https://mirror.invalid' + current);
    let target = decodeURIComponent(url.pathname).replace(/\.(html|md)$/, '').replace(/\/$/, '/index');
    if (target in paths) {
      const mapped = paths[target];
      if (mapped === null) return null;
      if (mapped.startsWith('https://')) return mapped;
      target = mapped;
    }
    if (!ids.has(target) && current.startsWith('/wiki/') && ids.has('/wiki' + target)) target = '/wiki' + target;
    // 已核验官网提供这些历史版本；镜像未收录时链接原文。
    const history = target.match(/^\/mcdocs\/1-ModAPI\/更新信息\/(\d+\.\d+)$/)?.[1];
    if (!ids.has(target) && history && verifiedHistory.has(history)) return 'https://mc.163.com/dev/mcmanual/mc-dev' + target + '.html' + url.hash;
    if (!ids.has(target)) return href;
    let fragment = decodeURIComponent(url.hash.slice(1));
    const headings = ids.get(target)!;
    if (fragment && !headings.has(fragment)) {
      const tail = fragment.split('#').filter(Boolean).at(-1) || fragment;
      const candidates = [tail, tail.toLowerCase(), slug(tail)];
      const exact = candidates.find(c => headings.has(c));
      if (exact) fragment = exact;
      else {
        const matches = [...headings].filter(h => slug(h) === slug(tail));
        if (matches.length === 1) fragment = matches[0];
      }
      // 预设概述的继承图明确指向对应对象类，继承方法的正文在对象页。
      // 只有对象页实际包含该方法时才迁移锚点，缺失构造器等仍留给检查报告。
      if (!headings.has(fragment)) {
        const parent = target.replace('实体预设EntityPreset', '实体对象EntityObject')
          .replace('玩家预设PlayerPreset', '玩家对象PlayerObject');
        const parentIds = ids.get(parent);
        if (parent !== target && parentIds) {
          const found = candidates.find(c => parentIds.has(c));
          if (found) { target = parent; fragment = found; }
        }
      }
    }
    if (fragment && !ids.get(target)?.has(fragment)) {
      // 翻译前后的编号章节：只在同一页面有唯一相同章节号时迁移。
      const number = fragment.match(/(?:^|[^0-9])(\d+(?:-\d+){2})(?=-)/)?.[1];
      if (number) {
        const numbered = [...ids.get(target)!].filter(h => h.match(/(?:^|[^0-9])(\d+(?:-\d+){2})(?=-)/)?.[1] === number);
        if (numbered.length === 1) fragment = numbered[0];
      }
    }
    if (fragment && !ids.get(target)?.has(fragment)) {
      // 仅在当前文档树中唯一定位到同名 API 时修复迁移链接。
      const key = slug(fragment);
      const locations = /^[a-z][a-z0-9_]*$/i.test(fragment)
        ? [...ids].filter(([name, anchors]) => name.startsWith('/mcdocs/1-ModAPI/') && anchors.has(key)) : [];
      if (locations.length === 1) { target = locations[0][0]; fragment = key; }
      else return null; // 明确标为原文不可用，不跳到无关章节或留下失效锚点。
    }
    return encodeURI(target + '.html') + url.search + (fragment ? '#' + encodeURIComponent(fragment) : url.hash === '#' ? '#' : '');
  }
  return (md: any) => {
    md.core.ruler.after('inline', 'mirror-link-compatibility', (state: any) => {
      const file = state.env.relativePath || '';
      const current = '/' + file.replace(/\.md$/, '.html');
      function visit(tokens: any[]) {
        const stack: boolean[] = [];
        const htmlStack: boolean[] = [];
        for (const token of tokens) {
          if (token.children) visit(token.children);
          if (token.type === 'link_open') {
            const href = token.attrGet('href') || ''; const result = resolve(href, current); stack.push(result === null);
            if (result === null) {
              token.tag = 'span'; token.attrs = [['title', '原文链接目标在镜像中无法定位'], ['data-unavailable-link', href]];
            } else token.attrSet('href', result);
          } else if (token.type === 'link_close' && stack.pop()) token.tag = 'span';
          if (['html_inline', 'html_block'].includes(token.type)) {
            token.content = token.content.replace(/<\/?(?:a|BButton)\b[^>]*>/gi, (tag: string) => {
              if (/^<\/(?:a|BButton)/i.test(tag)) return htmlStack.pop() ? '</span>' : tag;
              const button = /^<BButton\b/i.test(tag);
              const match = tag.match(button ? /(?<!:)\blink\s*=\s*(["'])(.*?)\1/i : /(?<!:)\bhref\s*=\s*(["'])(.*?)\1/i);
              if (!match) { htmlStack.push(false); return tag; }
              const result = resolve(match[2], current);
              htmlStack.push(result === null);
              const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
              if (result === null) return `<span title="原文链接目标在镜像中无法定位" data-unavailable-link="${escape(match[2])}">`;
              return tag.replace(match[0], `${button ? 'link' : 'href'}="${escape(result)}"`);
            });
          }
        }
      }
      visit(state.tokens);
    });
  };
}
