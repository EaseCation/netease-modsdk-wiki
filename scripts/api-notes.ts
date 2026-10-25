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
      if (state.env.relativePath?.startsWith('mcdocs/1-ModAPI/')) {
        const labels = new Set(['描述', '参数', '返回值', '备注', '示例']);
        // 上游的独立 '-' 被渲染成空列表；只清理紧邻合同字段名的空标记。
        for (let i = state.tokens.length - 7; i >= 0; i--) {
          const types = state.tokens.slice(i, i + 4).map((t: any) => t.type).join(',');
          if (types === 'bullet_list_open,list_item_open,list_item_close,bullet_list_close'
              && state.tokens[i + 4]?.type === 'paragraph_open' && labels.has(state.tokens[i + 5]?.content)) {
            state.tokens.splice(i, 4);
          }
        }
        for (let i = 0; i < state.tokens.length - 1; i++) {
          const token = state.tokens[i], text = state.tokens[i + 1]?.content?.trim();
          if (token.type === 'paragraph_open' && labels.has(text)) token.attrJoin('class', 'api-contract-label');
          if (token.type === 'heading_open' && token.tag === 'h2' && /^[A-Za-z_]\w*$/.test(text || '')) token.attrJoin('class', 'api-reference-heading');
          if (token.type === 'heading_open' && token.tag === 'h3' && /^(服务端|客户端)(接口|事件)$/.test(text || '')) token.attrJoin('class', 'api-side-heading');
        }
      }
      const entries = byFile.get(state.env.relativePath);
      if (!entries) return;
      for (let i = state.tokens.length - 3; i >= 0; i--) {
        if (state.tokens[i].type !== 'heading_open' || state.tokens[i].tag !== 'h2') continue;
        const matches = entries.filter(n => n.name === state.tokens[i + 1].content);
        if (!matches.length) continue;
        const token = new state.Token('html_block', '', 0);
        token.content = matches.map(n => `<details class="api-developer-note" data-corpus="${escape(n.corpus_sha256)}" v-pre>
<summary><span class="api-note-side">${escape(n.side === 'server' ? '服务端' : n.side === 'client' ? '客户端' : '通用')}</span><span class="api-note-tags">${n.tags.map((t: string) => `<span>${escape(t)}</span>`).join(' ')}</span><span class="api-note-toggle">开发补充</span></summary>
<div class="api-note-body">
${matches.filter(m => m.side === n.side).length > 1 ? `<p><strong>组件：</strong>${escape(n.id.split('@')[0].split('.').slice(-2, -1)[0] || n.name)}</p>` : ''}
${n.capability_labels?.some((label: string) => !n.tags.includes(label)) ? `<p><strong>能力：</strong>${n.capability_labels.map(escape).join(' · ')}</p>` : ''}
${n.facts?.phase ? `<p><strong>触发阶段：</strong>${escape(({before:'发生之前',after:'发生之后',change:'发生变化'} as any)[n.facts.phase] || n.facts.phase)}</p>` : ''}
${n.facts?.mutable_fields?.length ? `<p><strong>允许修改的字段：</strong>${n.facts.mutable_fields.map(escape).join('、')}</p>` : ''}
${n.capability_roles?.target?.length ? `<p><strong>作用对象：</strong>${n.capability_roles.target.map(escape).join('、')}</p>` : ''}
${n.capability_roles?.qualifiers?.length ? `<p><strong>适用限定：</strong>${n.capability_roles.qualifiers.map(escape).join('、')}</p>` : ''}
${n.usage ? `<p>${escape(n.usage)}</p>` : ''}
${n.cautions.length ? `<ul>${n.cautions.map((t: string) => `<li>${escape(t)}</li>`).join('')}</ul>` : ''}
${n.questions.length ? `<p><strong>常见问法</strong></p><ul>${n.questions.map((t: string) => `<li>${escape(t)}</li>`).join('')}</ul>` : ''}
${n.related_entries.length ? `<p><strong>关联接口：</strong>${n.related_entries.map((r: any) => `<a href="${escape(r.url)}">${escape(r.name)} (${escape(r.side)})</a>`).join(' · ')}</p>` : ''}
${(n.workflows || []).map((w: any) => `<details><summary>关联流程：${escape(w.label)}</summary><ol>${w.steps.map((step: any) => `<li>${escape(step.label)}：${step.entries.map((r: any) => `<a href="${escape(r.url)}">${escape(r.name)}</a>`).join('、')}</li>`).join('')}</ol>${w.cautions.map((c: string) => `<p>${escape(c)}</p>`).join('')}<p>${w.guides.map((g: any) => `<a href="${escape(g.url)}">${escape(g.title)}</a>`).join(' · ')}</p></details>`).join('')}
</div></details>\n`).join('');
        state.tokens.splice(i + 3, 0, token);
      }
    });
  };
}
