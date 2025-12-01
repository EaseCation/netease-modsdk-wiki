<template>
  <el-card class="ai-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>AI 助手</span>
        <el-tag size="small" type="success">已接入</el-tag>
      </div>
      <div class="sub">基于 Agent Studio 接口 · 客户端直连</div>
    </template>

    <el-scrollbar ref="listWrap" height="56vh">
      <div class="list">
        <div
          v-for="(m, idx) in messages"
          :key="idx"
          class="row"
          :class="m.role"
        >
          <el-avatar :size="28" class="avatar">{{ m.role === 'user' ? '我' : 'AI' }}</el-avatar>
          <el-card class="bubble" shadow="never">
            <div class="content" v-html="formatContent(m.content)"></div>
          </el-card>
        </div>

        <div v-if="loading" class="row assistant">
          <el-avatar :size="28" class="avatar">AI</el-avatar>
          <el-card class="bubble" shadow="never">
            <el-skeleton :rows="1" animated style="width: 160px" />
          </el-card>
        </div>
      </div>
    </el-scrollbar>

    <div class="input-bar">
      <el-input
        v-model="input"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 8 }"
        placeholder="请输入问题，Enter 发送，Shift+Enter 换行"
        @keydown.enter.exact.prevent="handleSend"
      />
      <el-button type="primary" :loading="loading" :disabled="!input.trim()" @click="handleSend">
        发送
      </el-button>
      <el-button @click="handleClear" :disabled="loading">清空</el-button>
    </div>
    <div class="hint">提示：对话仅保存在你的浏览器中。</div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'

type ChatMessage = { role: 'user' | 'assistant' | 'system', content: string }

const API_URL = 'https://f8hd84cuon.algolia.net/agent-studio/1/agents/c1616f78-43a5-4d8a-99c9-9a43b24d0916/completions?compatibilityMode=ai-sdk-5'
const API_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'x-algolia-application-id': 'F8HD84CUON',
  'x-algolia-api-key': 'ccaf9255472c593d8a8b0724a940bb29'
}

const STORAGE_KEY = 'vitepress-ai-chat'

const messages = reactive<ChatMessage[]>(loadInitial())
const input = ref('')
const loading = ref(false)
const listWrap = ref<any>(null)

function loadInitial(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return [{ role: 'assistant', content: '你好，我是 AI 助手。请告诉我你想了解的内容～' }]
}

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch {}
}

function scrollToBottom() {
  nextTick(() => {
    const wrap = listWrap.value?.wrapRef as HTMLElement | undefined
    if (wrap) wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' })
  })
}

function formatContent(text: string) {
  // 简单的换行与代码片段处理
  const esc = (s: string) => s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
  // 反引号包裹的代码
  const codeInlined = esc(text).replace(/`([^`]+)`/g, '<code>$1</code>')
  // 换行
  return codeInlined.replace(/\n/g, '<br/>')
}

async function handleSend() {
  const content = input.value.trim()
  if (!content || loading.value) return

  messages.push({ role: 'user', content })
  input.value = ''
  persist()
  scrollToBottom()

  loading.value = true
  try {
    const body = {
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: false
    }
    const res = await fetch(API_URL, { method: 'POST', headers: API_HEADERS, body: JSON.stringify(body) })
    if (!res.ok) throw new Error(`接口返回错误：${res.status}`)

    const data = await res.json().catch(() => ({}))
    // 兼容多种响应格式
    const content =
      data?.message?.content
      ?? data?.choices?.[0]?.message?.content
      ?? data?.choices?.[0]?.delta?.content
      ?? data?.content
      ?? data?.text
      ?? '（未能解析回复内容）'

    messages.push({ role: 'assistant', content: String(content || '') })
  } catch (err: any) {
    messages.push({ role: 'assistant', content: `请求失败：${err?.message || err}` })
  } finally {
    loading.value = false
    persist()
    scrollToBottom()
  }
}

onMounted(scrollToBottom)

function handleClear() {
  messages.splice(0, messages.length)
  persist()
}
</script>

<style scoped>
.ai-card { border-radius: 12px; }
.card-header { display: flex; gap: 8px; align-items: center; font-weight: 600; }
.sub { color: var(--vp-c-text-2); font-size: 12px; margin-top: 4px; }
.list { padding: 8px; }
.row { display: flex; gap: 8px; margin: 10px 0; align-items: flex-start; }
.row.user { flex-direction: row-reverse; }
.row .bubble { max-width: 80%; }
.content code { background: var(--vp-c-mute); padding: 1px 4px; border-radius: 4px; }
.input-bar { display: flex; gap: 8px; align-items: flex-end; margin-top: 8px; }
.hint { color: var(--vp-c-text-2); font-size: 12px; margin-top: 6px; }
</style>
