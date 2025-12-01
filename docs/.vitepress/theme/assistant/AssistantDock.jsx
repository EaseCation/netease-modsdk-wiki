import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bubble, Sender, XProvider } from '@ant-design/x';
import { Drawer, FloatButton, ConfigProvider, theme } from 'antd';

const API_URL = 'https://f8hd84cuon.algolia.net/agent-studio/1/agents/c1616f78-43a5-4d8a-99c9-9a43b24d0916/completions?compatibilityMode=ai-sdk-5';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-algolia-application-id': 'F8HD84CUON',
  'x-algolia-api-key': 'ccaf9255472c593d8a8b0724a940bb29',
};

function ChatApp() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { key: 'hello', placement: 'start', content: '你好，我是 AI 助手。请问有什么可以帮你？' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const keySeed = useRef(0);

  const roles = useMemo(() => ({
    assistant: { placement: 'start' },
    user: { placement: 'end' },
  }), []);

  async function requestAI(history, userText) {
    const payload = { messages: history, stream: false };
    const res = await fetch(API_URL, { method: 'POST', headers: API_HEADERS, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`接口错误 ${res.status}`);
    const data = await res.json().catch(() => ({}));
    const content =
      data?.message?.content
      ?? data?.choices?.[0]?.message?.content
      ?? data?.choices?.[0]?.delta?.content
      ?? data?.content
      ?? data?.text
      ?? '（未能解析回复内容）';
    return String(content || '');
  }

  const onSubmit = async (value) => {
    const text = String(value ?? inputValue).trim();
    if (!text) return;

    // 先清空输入框
    setInputValue('');

    // 追加用户气泡
    const userKey = `u-${keySeed.current++}`;
    setItems((prev) => [...prev, { key: userKey, role: 'user', placement: 'end', content: text }]);

    // 占位的助手气泡（打字态）
    const aiKey = `a-${keySeed.current++}`;
    setItems((prev) => [...prev, { key: aiKey, role: 'assistant', placement: 'start', typing: true, content: '' }]);

    try {
      const history = [];
      for (const it of items.concat({ role: 'user', content: text })) {
        const role = it.role || (it.placement === 'end' ? 'user' : 'assistant');
        if (!it.content) continue;
        history.push({ role, content: String(it.content) });
      }

      const reply = await requestAI(history, text);
      setItems((prev) => prev.map((it) => it.key === aiKey ? { ...it, typing: false, content: reply } : it));
    } catch (e) {
      setItems((prev) => prev.map((it) => it.key === aiKey ? { ...it, typing: false, content: `请求失败：${e?.message || e}` } : it));
    }
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {!open && (
        <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24, zIndex: 2147483647 }}>
          <FloatButton type="primary" onClick={() => setOpen(true)} tooltip="AI 助手" />
        </FloatButton.Group>
      )}

      <Drawer
        placement="right"
        width={420}
        title="AI 助手"
        open={open}
        onClose={() => setOpen(false)}
        zIndex={2147483600}
        styles={{ body: { display: 'flex', flexDirection: 'column', gap: 8 } }}
      >
        <XProvider bubble={{ variant: 'outlined', shape: 'round' }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Bubble.List
              items={items}
              roles={(bubble) => ({
                ...(bubble.role ? roles[bubble.role] : {}),
              })}
              style={{ height: '100%', overflow: 'auto' }}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <Sender
              value={inputValue}
              onChange={(v) => setInputValue(v)}
              onSubmit={onSubmit}
              placeholder="请输入问题，Enter 发送，Shift+Enter 换行"
            />
          </div>
        </XProvider>
      </Drawer>
    </ConfigProvider>
  );
}

export function mountAssistant(container) {
  const root = createRoot(container);
  root.render(React.createElement(ChatApp));
  return () => root.unmount();
}
