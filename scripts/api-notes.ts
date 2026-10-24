// 只在 Markdown 渲染 token 中附加开发补充，绝不写回同步原文。
import fs from 'node:fs';
import path from 'node:path';

export function apiNotes(root: string) {
  const notes: any[] = Object.values(JSON.parse(fs.readFileSync(path.join(root, '.api-index/notes.json'), 'utf8')));
  const escape = (s: string) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
  const byFile = new Map<string, any[]>();
  for (const note of notes) byFile.set(note.doc_path, [...(byFile.get(note.doc_path) || []), note]);
  return (md: any) => {
    md.core.ruler.after('inline', 'api-developer-notes', (state: any) => {
      const entries = byFile.get(state.env.relativePath);
      if (!entries) return;
      for (let i = state.tokens.length - 3; i >= 0; i--) {
        if (state.tokens[i].type !== 'heading_open' || state.tokens[i].tag !== 'h2') continue;
        const matches = entries.filter(n => n.name === state.tokens[i + 1].content);
        if (!matches.length) continue;
        const token = new state.Token('html_block', '', 0);
        token.content = matches.map(n => `<details class="api-developer-note" v-pre>
<summary><span class="api-note-tags">${n.tags.map((t: string) => `<span>${escape(t)}</span>`).join(' ')}</span><span class="api-note-toggle">开发补充</span></summary>
<div class="api-note-body">
<p><small>${escape(n.side === 'server' ? '服务端' : n.side === 'client' ? '客户端' : '通用')}</small></p>
<p>${escape(n.usage)}</p>
${n.cautions.length ? `<ul>${n.cautions.map((t: string) => `<li>${escape(t)}</li>`).join('')}</ul>` : ''}
${n.questions.length ? `<p><strong>常见问法</strong></p><ul>${n.questions.map((t: string) => `<li>${escape(t)}</li>`).join('')}</ul>` : ''}
${n.related_entries.length ? `<p><strong>关联接口：</strong>${n.related_entries.map((r: any) => `<a href="${escape(r.url)}">${escape(r.name)} (${escape(r.side)})</a>`).join(' · ')}</p>` : ''}
</div></details>\n`).join('');
        state.tokens.splice(i + 3, 0, token);
      }
    });
  };
}
