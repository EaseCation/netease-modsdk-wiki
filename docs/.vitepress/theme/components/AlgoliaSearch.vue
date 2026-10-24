<script setup lang="ts">
import docsearch from '@docsearch/js'
import { useRouter, useData } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'

const props = defineProps<{
  algolia: DefaultTheme.AlgoliaSearchOptions
}>()

const router = useRouter()
const { site, localeIndex, lang } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)
watch(localeIndex, update)

async function update() {
  await nextTick()
  const options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value]
  }
  const rawFacetFilters = options.searchParameters?.facetFilters ?? []
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters)
      ? rawFacetFilters
      : [rawFacetFilters]
    ).filter((f) => !f.startsWith('lang:')),
    `lang:${lang.value}`
  ]
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters
    }
  })
}

// Algolia 返回的描述来自官方正文；作为高亮 HTML 展示前先转义。
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
  const options = Object.assign<
    {},
    DefaultTheme.AlgoliaSearchOptions,
    Partial<DocSearchProps>
  >({}, userOptions, {
    container: '#docsearch',

    navigator: {
      navigate({ itemUrl }) {
        router.go(itemUrl)
      }
    },

    // 通过魔法，在结果中展示API描述
    transformItems(items) {
      return items.map((item) => {
        const snippetResult = item._snippetResult;
        const description = (item as typeof item & { description?: string }).description;
        if (description && snippetResult?.hierarchy?.lvl2 && snippetResult.hierarchy.lvl1) {
            const original = snippetResult.hierarchy.lvl1.value;
            if (!original.includes("<br>")) {
                snippetResult.hierarchy.lvl1.value = escapeHtml(description) + "<br>" + original;
            }
        }
        const result = Object.assign({}, item, {
          url: getRelativePath(item.url),
          _snippetResult: snippetResult,
        });
        // console.log('transformItems', result);
        return result;
      })
    }
  }) as DocSearchProps

  docsearch(options)
}

function getRelativePath(url: string) {
  const { pathname, hash } = new URL(url, location.origin)
  return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash
}
</script>

<template>
  <div id="docsearch" />
</template>

<style>
.DocSearch-Hit-Container {
    height: auto !important;
}

.DocSearch-Hit-content-wrapper {
    padding-top: 8px;
    padding-bottom: 8px;
}

.DocSearch-Hit-path {
    white-space: normal;
}
</style>