<template>
  <div ref="root" class="assistant-dock" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const root = ref<HTMLDivElement | null>(null)
let unmount: null | (() => void) = null

onMounted(async () => {
  // 仅在客户端动态加载 React 岛
  const mod = await import('../assistant/AssistantDock.jsx')
  if (root.value && mod.mountAssistant) {
    unmount = mod.mountAssistant(root.value)
  }
})

onBeforeUnmount(() => {
  if (unmount) unmount()
})
</script>

<style scoped>
.assistant-dock {}
</style>
