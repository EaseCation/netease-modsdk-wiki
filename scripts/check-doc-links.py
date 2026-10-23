#!/usr/bin/env python3
"""检查实际构建产物的页面、附件、HTML 链接与锚点，不执行网页自动化。"""
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'docs/.vitepress/dist'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = set()
        self.unavailable = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        if attrs.get('data-unavailable-link'):
            self.unavailable.add(attrs['data-unavailable-link'])
        keys = ['href'] if tag in ('a', 'link') else ['src', 'poster'] if tag in (
            'img', 'script', 'video', 'audio', 'source', 'iframe') else []
        for key in keys:
            if attrs.get(key):
                self.refs.add((tag, attrs[key]))


def main():
    if not (DIST / 'index.html').is_file():
        raise SystemExit('缺少完整构建产物，请先运行 npm run docs:build')
    pages = {}
    for file in sorted(DIST.rglob('*.html')):
        parser = Page()
        parser.feed(file.read_text(encoding='utf-8'))
        pages[file.relative_to(DIST).as_posix()] = parser
    missing, anchors, external, unavailable = (defaultdict(list) for _ in range(4))
    for name, page in pages.items():
        for link in sorted(page.unavailable):
            unavailable[link].append(name)
        for tag, ref in sorted(page.refs):
            url = urlsplit(ref)
            if url.scheme or url.netloc:
                if url.scheme in ('http', 'https') or url.netloc:
                    external[ref.split('#')[0]].append(name)
                continue
            # 与浏览器相同，以站点根为边界解析 ../，避免将它误判为磁盘越界。
            resolved = urlsplit(urljoin('https://mirror.invalid/' + name, ref))
            target = unquote(resolved.path).lstrip('/')
            if target.endswith('/') or not target:
                target += 'index.html'
            options = [target]
            if not Path(target).suffix:
                options += [target + '.html', target + '/index.html']
            found = next((p for p in options if (DIST / p).is_file()), None)
            item = {'page': name, 'href': ref, 'tag': tag}
            if found is None:
                missing[target].append(item)
            elif resolved.fragment and found in pages:
                fragment = unquote(resolved.fragment).split(':~:text=')[0]
                if fragment and fragment not in pages[found].ids:
                    anchors[found + '#' + fragment].append(item)
    git_dir = Path(subprocess.check_output(
        ['git', '-C', str(ROOT), 'rev-parse', '--absolute-git-dir'], text=True).strip())
    report = {
        'pages': len(pages), 'missing_paths': dict(missing),
        'missing_anchors': dict(anchors), 'unavailable_original_links': dict(unavailable),
        'external_urls': sorted(external),
        'external_availability_checked': False,
    }
    (git_dir / 'docs-link-report.json').write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    lines = ['# 当前站点链接检查', '',
             f'检查 {len(pages)} 个生成页面；缺失路径 {len(missing)} 个；缺失锚点 {len(anchors)} 个。',
             f'已明确标为不可用的历史链接 {len(unavailable)} 个。',
             '本报告检查站内文件和锚点；未逐一请求全部外链，不能据此判断外部网站可用性。', '']
    for title, issues in [('缺失页面或附件', missing), ('缺失页内锚点', anchors)]:
        lines += [f'## {title}', '']
        if not issues:
            lines += ['无。', '']
        for target, refs in sorted(issues.items()):
            source = ROOT / 'docs' / refs[0]['page'].removesuffix('.html')
            source = Path(str(source) + '.md')
            lines += [f'- `{target}`：{len(refs)} 个页面/引用；'
                      f'[示例来源](<{source}>)。']
        lines.append('')
    lines += ['## 原文已失效的链接', '']
    lines += [f'- `{href}`：{", ".join(refs)}' for href, refs in sorted(unavailable.items())]
    (git_dir / 'docs-link-report.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'页面 {len(pages)}；缺失路径 {len(missing)}；缺失锚点 {len(anchors)}；'
          f'原文已失效链接 {len(unavailable)}。')
    print(f'详细清单：{git_dir / "docs-link-report.md"}')
    return 1 if missing or anchors else 0


if __name__ == '__main__':
    sys.exit(main())
