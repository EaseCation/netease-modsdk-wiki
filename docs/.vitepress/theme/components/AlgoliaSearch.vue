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

/**
 * 从正文中提取"描述"的内容
 * @param {string} content Markdown内容
 * @return {string} 提取的描述文本
 */
function extractAPIDescription(content: string): string | undefined {
    // 匹配"- 描述"部分，直到下一个部分标题(如"- 参数"、"- 返回值"等)或文档结束
    const descriptionRegex = /-\s*描述\s*\n([\s\S]*?)(?=\n\s*-\s*(?:参数|返回值|备注|示例)|$)/;
    const match = content.match(descriptionRegex);

    if (match && match[1]) {
        // 提取第一行并进行清理：
        // 1. 移除缩进
        // 2. 移除 Markdown 符号如 "-", "*", ">", 数字列表前缀 "1." 等
        const firstLine = match[1].split('\n')[0].trim();
        return firstLine
            .replace(/^[\s>*-]*\s*/, '')         // 移除开头的 >, *, - 等符号
            .replace(/^\d+\.\s*/, '')            // 移除数字列表前缀，如 "1. "
            .replace(/^\[.*?\]\s*/, '')          // 移除可能的 [xxx] 标记
            .trim();
    }

    return undefined;
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
        if (item.content && snippetResult.hierarchy.lvl2 && !snippetResult.hierarchy.lvl1.value.includes("<br>")) {
            const description = extractAPIDescription(item.content);
            if (description) {
                snippetResult.hierarchy.lvl1.value = description + "<br>" + snippetResult.hierarchy.lvl1.value;
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