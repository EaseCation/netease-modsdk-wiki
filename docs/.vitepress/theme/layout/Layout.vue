<script setup>
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'

const route = useRoute()

// 需要全宽的路由匹配规则（支持 glob 模式）
const fullWidthRoutes = [
  '/api-tools/(.*)'         // 正则匹配
]

// 动态计算 class
const layoutClass = computed(() => {
  return fullWidthRoutes.some(pattern => 
    new RegExp(
      pattern
        .replace(/\*/g, '.*')
        .replace(/\//g, '\\/')
    ).test(route.path)
  ) ? 'vp-full-width' : ''
})
</script>

<template>
  <div 
    class="vp-theme-container"
    :class="layoutClass"
  >
    <DefaultTheme.Layout />
    <!-- 全局 AI 助手（右侧抽屉） -->
    <AssistantDock />
  </div>
</template>
