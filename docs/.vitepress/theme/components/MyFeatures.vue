<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="features">
    <a 
      v-for="(item, index) in items" 
      :key="index" 
      class="feature"
      :href="item.link"
    >
      <h3>{{ item.title }}</h3>
      <p>{{ item.desc }}</p>
    </a>
  </div>
</template>

<style scoped>
/* 保持与默认主题一致的网格布局 */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

/* 特性卡片样式（兼容超链接） */
.feature {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.25s, transform 0.25s;
  text-decoration: none !important;
  color: inherit;
}

.feature:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
}

.feature h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-brand);
}

.feature p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}
</style>