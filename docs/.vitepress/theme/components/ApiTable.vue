<template>
    <div class="api-table-container">
        <!-- 顶部功能区 -->
        <div class="search-header">
            <div class="search-input-wrapper">
                <input type="text" v-model="searchQuery" placeholder="搜索API名称/功能，支持模糊匹配（本地搜索，因此请尽量简短）"
                    @input="debouncedSearch" @keydown.down.prevent="navigateResults('down')"
                    @keydown.up.prevent="navigateResults('up')" ref="searchInput" />
                <div class="search-shortcuts">键盘 ↑↓ 快速切换</div>
            </div>
            <div class="filter-buttons">
                <button :class="{ active: filters.client }" @click="toggleFilter('client')"
                    @contextmenu.prevent="showAdvancedFilters">
                    📱 客户端
                </button>
                <button :class="{ active: filters.server }" @click="toggleFilter('server')"
                    @contextmenu.prevent="showAdvancedFilters">
                    🛠️ 服务端
                </button>
            </div>
        </div>

        <!-- 主内容区 -->
        <div class="content-container">
            <!-- 左侧结果列表 -->
            <div class="results-list" ref="resultsList">
                <div v-if="loading" class="loading-state">
                    <div class="spinner"></div>
                    <span>搜索中...</span>
                </div>

                <template v-else-if="filteredApis.length">
                    <div v-for="(api, index) in filteredApis" :key="`${api.path}.${api.name}`" class="api-result-item"
                        :class="{ active: selectedIndex === index, 'is-hot': isHotApi(api) }"
                        @click="selectApi(api, index)">
                        <div class="api-item-header">
                            <span class="api-type-icon">{{ api.side === '客户端' ? '📱' : '🛠️' }}</span>
                            <span class="api-name" v-html="highlightMatch(api.name)"></span>
                            <span v-if="isHotApi(api)" class="hot-api">🔥</span>
                        </div>
                        <div class="api-path" v-html="highlightMatch(api.path)"></div>
                        <div class="api-desc" v-html="highlightMatch(api.desc)"></div>
                    </div>
                </template>

                <div v-else-if="searchQuery && !loading" class="no-results">
                    <p>没有找到 "{{ searchQuery }}" 相关的 API</p>
                    <div v-if="searchSuggestions.length" class="search-suggestions">
                        <p>您是否想找：</p>
                        <button v-for="suggestion in searchSuggestions" :key="suggestion"
                            @click="searchQuery = suggestion; search()">
                            {{ suggestion }}
                        </button>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <p>请输入关键词开始搜索</p>
                    <p class="tip">支持API名称、路径和描述的模糊匹配</p>
                </div>
            </div>

            <!-- 右侧详情区 -->
            <div class="detail-panel" ref="detailPanel">
                <div v-if="selectedApi" class="api-detail">
                    <div class="api-detail-header">
                        <h2>
                            {{ selectedApi.name }}
                            <div class="copy-tooltip" @click="copyApiName">{{ isMacOS ? '⌘C' : 'Ctrl+C' }} 复制</div>
                        </h2>
                        <div class="api-meta">
                            <span class="api-side" :class="selectedApi.side === '客户端' ? 'client' : 'server'">
                                {{ selectedApi.side }}
                            </span>
                            <span class="api-path">{{ selectedApi.path }}</span>
                        </div>
                        <div class="api-desc" v-html="selectedApi.desc"></div>
                    </div>

                    <div id=" params" class="api-section">
                            <h3>参数</h3>
                            <table v-if="selectedApi.param?.length">
                                <thead>
                                    <tr>
                                        <th>参数名</th>
                                        <th>类型</th>
                                        <th>描述</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="param in selectedApi.param" :key="param.param_name">
                                        <td><code>{{ param.param_name }}</code></td>
                                        <td><code>{{ param.param_type }}</code></td>
                                        <td v-html="formatMarkdown(param.param_comment)"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p v-else class="api-args-empty">此API不需要参数</p>
                        </div>

                        <div v-if="!autoHideReturn || selectedApi.return?.length == 0" id="returns" class="api-section">
                            <h3>返回值</h3>
                            <table v-if="selectedApi.return?.return_type">
                                <thead>
                                    <tr>
                                        <th>类型</th>
                                        <th>描述</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>{{ selectedApi.return.return_type }}</code></td>
                                        <td v-html="formatMarkdown(selectedApi.return.return_comment)"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p v-else class="api-args-empty">此API没有返回值</p>
                        </div>

                        <!-- <div id="examples" class="api-section">
                        <h3>示例</h3>
                        <div class="code-example">
                            <pre><code>{{ generateExample(selectedApi) }}</code></pre>
                        </div>
                    </div> -->

                        <!-- <div class="feedback">
                        <span>这篇文档有帮助吗？</span>
                        <button @click="sendFeedback(true)">👍</button>
                        <button @click="sendFeedback(false)">👎</button>
                    </div> -->

                        <div id="history" class="api-section" v-if="selectedApi.state?.length">
                            <h3>更新记录</h3>
                            <ul class="history-list">
                                <li v-for="(state, index) in selectedApi.state" :key="index">
                                    <strong>v{{ state.version }}</strong>
                                    {{ state.operation }}: {{ state.comment }}
                                    <span class="author">by {{ state.author }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-else class="no-selection">
                        <p>请从左侧选择一个API查看详情</p>
                    </div>
                </div>
            </div>
            <div class="copy-toast" :class="{ visible: copyToastVisible }">
                📋 已复制: {{ copiedText }}
            </div>
        </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import debounce from 'lodash-es/debounce'
import { useRoute, useData } from 'vitepress'

// 监听路由变化 - 修改这部分代码
const { page } = useData()

// 定义组件接收的属性
const props = defineProps({
    apiData: {
        type: Object,
        required: true,
        default: () => ({})
    },
    autoHideReturn: {
        type: Boolean,
        default: false
    }
})

// 获取当前路由
const route = useRoute()
const STORAGE_KEY = 'api-table-state'

// 模拟API热度数据（实际项目中可能来自后端或配置）
const HOT_APIS = ['SetPerspective', 'GetEntityTags', 'AddEntityTag']

// API数据
const loading = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(-1)
const selectedApi = ref(null)
const searchInput = ref(null)
const resultsList = ref(null)
const detailPanel = ref(null)

// 筛选器状态
const filters = reactive({
    client: false,
    server: false
})

// 搜索建议（当无结果时提供）
const searchSuggestions = ref([])
const apiIndex = ref([])

// 初始化数据和恢复状态
onMounted(async () => {
    loading.value = true

    try {
        // 预处理数据，建立搜索索引
        buildSearchIndex()
        
        // 尝试从 sessionStorage 恢复状态
        restoreState()
    } catch (error) {
        console.error('Failed to load API data:', error)
    } finally {
        loading.value = false
    }

    // 监听快捷键
    window.addEventListener('keydown', handleKeyboardShortcuts)
    
    // 监听浏览器前进/后退事件
    window.addEventListener('popstate', restoreState)
})

// 组件卸载时保存状态
onUnmounted(() => {
    // 移除事件监听器
    window.removeEventListener('keydown', handleKeyboardShortcuts)
    window.removeEventListener('popstate', restoreState)
    
    // 保存当前状态
    saveState()
})

// 使用watch监听page.relativePath而不是route.path
watch(() => page.value.relativePath, (newPath, oldPath) => {
    if (newPath !== oldPath) {
        // 当路由变化时保存状态
        saveState()
    }
})

// 监听关键状态变化，自动保存
watch([searchQuery, selectedApi, filters], () => {
    saveState()
}, { deep: true })

// 保存状态到 sessionStorage
const saveState = () => {
    try {
        const state = {
            searchQuery: searchQuery.value,
            selectedApiPath: selectedApi.value ? `${selectedApi.value.path}.${selectedApi.value.name}` : null,
            filters: { ...filters },
            scrollPositions: {
                resultsList: resultsList.value?.scrollTop,
                detailPanel: detailPanel.value?.scrollTop
            }
        }
        
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
        console.error('保存状态失败:', err)
    }
}

// 从 sessionStorage 恢复状态
const restoreState = () => {
    try {
        const savedState = sessionStorage.getItem(STORAGE_KEY)
        if (!savedState) return
        
        const state = JSON.parse(savedState)
        
        // 恢复搜索查询
        searchQuery.value = state.searchQuery || ''
        
        // 恢复筛选器状态
        if (state.filters) {
            Object.assign(filters, state.filters)
        }
        
        // 如果有搜索内容，执行搜索
        if (searchQuery.value) {
            search()
        }
        
        // 恢复选中的 API
        if (state.selectedApiPath && apiIndex.value.length) {
            const [path, name] = state.selectedApiPath.split('.')
            const api = apiIndex.value.find(a => a.path === path && a.name === name)
            if (api) {
                nextTick(() => {
                    // 找到 API 在过滤后列表中的索引
                    const index = filteredApis.value.findIndex(a => 
                        a.path === api.path && a.name === api.name
                    )
                    
                    if (index !== -1) {
                        selectedIndex.value = index
                        selectApi(api, index)
                        
                        // 恢复滚动位置
                        nextTick(() => {
                            if (state.scrollPositions) {
                                if (resultsList.value && state.scrollPositions.resultsList) {
                                    resultsList.value.scrollTop = state.scrollPositions.resultsList
                                }
                                if (detailPanel.value && state.scrollPositions.detailPanel) {
                                    detailPanel.value.scrollTop = state.scrollPositions.detailPanel
                                }
                            }
                        })
                    }
                })
            }
        }
    } catch (err) {
        console.error('恢复状态失败:', err)
    }
}

// 检测是否为macOS
const isMacOS = computed(() => {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0
})
// 构建搜索索引（优化搜索性能）
const buildSearchIndex = () => {
    const index = []

    // 将嵌套的API数据展平为一个搜索索引
    for (const [path, methods] of Object.entries(props.apiData)) {
        for (const method of methods) {
            index.push({
                ...method,
                pathLower: path.toLowerCase(),
                nameLower: method.name.toLowerCase(),
                descLower: method.desc.toLowerCase(),
                searchableText: `${path} ${method.name} ${method.desc}`.toLowerCase()
            })
        }
    }

    apiIndex.value = index
}

// 定义近义词组，便于后期扩展
const synonymGroups = [
    ['丢弃', '丢出', '丢', 'Drop'],
    ['区域', '区域内', '范围', '范围内'],
    ['实体', 'entity'],
    ['旋转', '(多面向)'],
    ['获取某一位置的block', '获取方块', '坐标方块', '指定方块', '某处方块', '位置方块'],
    ['坐标', '位置', 'pos', 'position'],
    ['方块', 'block'],
    ['指令', '命令', 'command'],
    ['相机', '摄像机', 'Camera'],
    ['纬度', '(维度)'],
    ['点击新版自定义方块', '点击自定义方块', '点击方块'],
    ['加载', '初始化', '加载完毕', '加载完成'],
    ['方块信息字典', '方块字典', 'BlockDict'],
    ['物品信息字典', '物品字典', 'ItemDict'],
    ['Actor', 'Entity', '实体'],
    ['PaperDoll', '纸娃娃', '3dx小人', '小人'],
    ['伤害', '受伤', '扣血', '受击', '掉血'],
    ['血量', '血', 'Attr', 'SetAttr', 'GetAttr'],
    ['人称', '视角'],
    ['玩家', 'Player'],
    ['饥饿值', '饱食度', '饥饿']
]

// 计算筛选后的API列表
const filteredApis = computed(() => {
    if (!apiIndex.value.length) return []

    // 首先应用筛选器
    let results = apiIndex.value.filter(api => {
        // 如果两个筛选器都关闭，表示显示所有API
        if (!filters.client && !filters.server) return true;
        if (api.side === '客户端' && !filters.client) return false;
        if (api.side === '服务端' && !filters.server) return false;
        return true;
    })

    // 如果有搜索查询，应用搜索过滤
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()

        // 找出查询词的所有近义词
        const queryTerms = [query]

        // 为查询词查找所有可能的近义词
        for (const group of synonymGroups) {
            for (const term of group) {
                if (query.includes(term)) {
                    // 将这个词组的其他词也添加到查询词中
                    queryTerms.push(...group.filter(t => t !== term))
                    break // 一旦在这个组中找到匹配，就跳到下一个组
                }
            }
        }

        // 去重
        const uniqueQueryTerms = [...new Set(queryTerms)]

        // 使用扩展后的查询词进行搜索
        results = results.filter(api => {
            // 检查原始查询词是否匹配
            if (api.searchableText.includes(query)) {
                return true
            }

            // 检查近义词是否匹配
            for (const term of uniqueQueryTerms) {
                if (term !== query && api.searchableText.includes(term)) {
                    return true
                }
            }

            return false
        })

        // 按相关性排序
        results.sort((a, b) => {
            // 首先按照原始查询词的匹配程度排序
            const aNameMatch = a.nameLower.includes(query)
            const bNameMatch = b.nameLower.includes(query)

            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1

            // 然后是近义词在名称中的匹配
            const aSynonymNameMatch = uniqueQueryTerms.some(term => term !== query && a.nameLower.includes(term))
            const bSynonymNameMatch = uniqueQueryTerms.some(term => term !== query && b.nameLower.includes(term))

            if (aSynonymNameMatch && !bSynonymNameMatch) return -1
            if (!aSynonymNameMatch && bSynonymNameMatch) return 1

            // 其次是路径匹配
            const aPathMatch = a.pathLower.includes(query)
            const bPathMatch = b.pathLower.includes(query)

            if (aPathMatch && !bPathMatch) return -1
            if (aPathMatch && !bPathMatch) return 1

            // 再次是近义词在路径中的匹配
            const aSynonymPathMatch = uniqueQueryTerms.some(term => term !== query && a.pathLower.includes(term))
            const bSynonymPathMatch = uniqueQueryTerms.some(term => term !== query && b.pathLower.includes(term))

            if (aSynonymPathMatch && !bSynonymPathMatch) return -1
            if (!aSynonymPathMatch && bSynonymPathMatch) return 1

            // 最后是描述匹配
            const aDescMatch = a.descLower.includes(query)
            const bDescMatch = b.descLower.includes(query)

            if (aDescMatch && !bDescMatch) return -1
            if (!aDescMatch && bDescMatch) return 1

            // 最后考虑近义词在描述中的匹配
            const aSynonymDescMatch = uniqueQueryTerms.some(term => term !== query && a.descLower.includes(term))
            const bSynonymDescMatch = uniqueQueryTerms.some(term => term !== query && b.descLower.includes(term))

            if (aSynonymDescMatch && !bSynonymDescMatch) return -1
            if (!aSynonymDescMatch && bSynonymDescMatch) return 1

            // 热门API排序在前
            if (isHotApi(a) && !isHotApi(b)) return -1
            if (!isHotApi(a) && isHotApi(b)) return 1

            return 0
        })

        // 如果没有结果，准备搜索建议
        if (results.length === 0) {
            generateSearchSuggestions(query)
        } else {
            searchSuggestions.value = []
        }
    }

    return results
})

// 生成搜索建议
const generateSearchSuggestions = (query) => {
    // 简单实现：根据常见相关词和分类提供建议
    const suggestions = []

    // 分类相关
    if (query.includes('play') || query.includes('玩家')) {
        suggestions.push('视角')
        suggestions.push('摄像机')
    }

    if (query.includes('tag') || query.includes('标签')) {
        suggestions.push('实体标签')
    }

    if (query.includes('set') || query.includes('设置')) {
        suggestions.push('游戏设置')
    }

    // 功能相关
    if (query.includes('view') || query.includes('视角')) {
        suggestions.push('Perspective')
    }

    // 限制建议数量
    searchSuggestions.value = suggestions.slice(0, 3)
}

// 防抖处理的搜索函数
const search = () => {
    loading.value = true

    // 模拟搜索延迟
    setTimeout(() => {
        loading.value = false

        // 如果有搜索结果，自动选中第一个
        if (filteredApis.value.length > 0) {
            selectedIndex.value = 0
            // 自动选中并展示第一个结果的详情
            selectApi(filteredApis.value[0], 0)
        } else {
            selectedIndex.value = -1
            selectedApi.value = null
        }
    }, 100)
}

// 结果导航
const navigateResults = (direction) => {
    if (!filteredApis.value.length) return

    if (direction === 'down') {
        selectedIndex.value = Math.min(selectedIndex.value + 1, filteredApis.value.length - 1)
    } else {
        selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    }

    // 确保选中项可见
    nextTick(() => {
        const items = resultsList.value.querySelectorAll('.api-result-item')
        const activeItem = items[selectedIndex.value]
        if (activeItem) {
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }

        // 自动显示当前选中项的详情
        if (selectedIndex.value >= 0 && selectedIndex.value < filteredApis.value.length) {
            selectApi(filteredApis.value[selectedIndex.value], selectedIndex.value)
        }
    })
}

const debouncedSearch = debounce(search, 300)

// 格式化高亮显示匹配的文本
const highlightMatch = (text) => {
    if (!searchQuery.value.trim() || !text) return text

    const query = searchQuery.value.trim()
    const regex = new RegExp(`(${query})`, 'gi')

    return text.replace(regex, '<span class="highlight">$1</span>')
}

// 格式化Markdown内容
const formatMarkdown = (text) => {
    if (!text) return ''

    // 处理相对路径链接，转换为网站绝对路径
    // 例如：../枚举值/OptionId.md → /docs/1-ModAPI/枚举值/OptionId
    return text.replace(/\[([^\]]+)\]\((?:\.\.\/)?([^)]+)\.md\)/g, (match, linkText, path) => {
        // 提取路径中的最后一部分
        const pathParts = path.split('/')
        const lastPart = pathParts[pathParts.length - 1]

        // 如果路径包含 "枚举值"，则保留这个目录名
        const enumDir = pathParts.includes('枚举值') ? '枚举值/' : ''

        // 构建新的链接
        return `<a href="/mcdocs/1-ModAPI/${enumDir}${lastPart}">${linkText}</a>`
    })
}

// 切换筛选器
const toggleFilter = (type) => {
    filters[type] = !filters[type]

    // 重新搜索
    search()
}

// 显示高级筛选选项（这里只是一个示例）
const showAdvancedFilters = () => {
    alert('高级筛选功能正在开发中...')
}

// 选择API
const selectApi = (api, index) => {
    selectedIndex.value = index
    selectedApi.value = api

    // 在移动设备上，可能需要滚动到详情区
    if (window.innerWidth < 768) {
        nextTick(() => {
            detailPanel.value?.scrollIntoView({ behavior: 'smooth' })
        })
    }
}

// 滚动到详情页的特定部分
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

// 判断是否是热门API
const isHotApi = (api) => {
    return HOT_APIS.includes(api.name)
}

// 生成示例代码
const generateExample = (api) => {
    if (!api) return ''

    let code = ''
    const isClient = api.side === '客户端'

    // 示例代码头部
    if (isClient) {
        code += `# 客户端脚本示例\n`
        code += `def OnScriptTickClient():\n  # 获取客户端API\n  clientApi = clientmodule.get_client_api()\n\n`
        code += `  # 获取组件\n  comp = clientApi.GetComponent('${api.path.split('.').slice(-2, -1)[0]}')\n\n`
    } else {
        code += `# 服务端脚本示例\n`
        code += `def OnScriptTickServer():\n  # 获取服务端API\n  serverApi = servermodule.get_server_api()\n\n`
        code += `  # 获取组件\n  comp = serverApi.GetComponent('${api.path.split('.').slice(-2, -1)[0]}')\n\n`
    }

    // 生成函数调用
    code += `  # 调用API\n`

    // 参数处理
    if (api.param && api.param.length) {
        const params = api.param.map(p => {
            switch (p.param_type) {
                case 'int': return '0'
                case 'float': return '0.0'
                case 'bool': return 'True'
                case 'str': return '"example"'
                default: return 'None'
            }
        }).join(', ')

        code += `  result = comp.${api.name}(${params})\n`
    } else {
        code += `  result = comp.${api.name}()\n`
    }

    // 返回值处理
    if (api.return && api.return.return_type && api.return.return_type !== '') {
        code += `  \n  # 处理返回值\n  print("返回结果:", result)\n`
    }

    return code
}

// 处理键盘快捷键
const handleKeyboardShortcuts = (event) => {
    // ⌘C 或 Ctrl+C 复制当前选中的API名称
    if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
        // 检查是否有选中的文本，如果有就不干预浏览器默认行为
        const selectedText = window.getSelection().toString()
        if (selectedText) return
        
        // 如果没有文本选择且有选中的API，则复制API名称
        if (selectedApi.value) {
            event.preventDefault()
            copyApiName()
        }
    }
}

// 复制API名称到剪贴板
const copyApiName = () => {
    if (!selectedApi.value) return
    
    const textToCopy = selectedApi.value.name
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // 显示一个复制成功的提示
            showCopyToast(textToCopy)
        })
        .catch(err => {
            console.error('复制失败:', err)
        })
}

// 显示复制成功的提示
const copyToastVisible = ref(false)
const copiedText = ref('')

const showCopyToast = (text) => {
    copiedText.value = text
    copyToastVisible.value = true
    
    // 3秒后隐藏提示
    setTimeout(() => {
        copyToastVisible.value = false
    }, 3000)
}

// 聚焦搜索框
const focusSearchInput = () => {
    searchInput.value?.focus()
}

// 发送反馈
const sendFeedback = (isPositive) => {
    // 在实际项目中实现反馈收集逻辑
    console.log(`用户对API ${selectedApi.value?.name} 的文档提供了${isPositive ? '正面' : '负面'}反馈`)

    // 显示感谢提示
    alert(`感谢您的反馈！${isPositive ? '👍' : '👎'}`)
}
</script>

<style>
/* 设置全局CSS变量 */
:root {
    --client-color: #2183df;
    --server-color: #e14242;
    --client-bg: rgba(66, 153, 225, 0.1);
    --server-bg: rgba(184, 65, 65, 0.1);
    --highlight-color: #ff6b00;
}

.dark {
    --client-color: #6fb9ff;
    --server-color: #ff8181;
    --client-bg: rgba(100, 185, 255, 0.25);
    --server-bg: rgba(255, 113, 113, 0.25);
    --highlight-color: #ffa53e;
}
</style>

<style scoped>

.api-table-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    width: 100%;
    font-family: var(--vp-font-family-base);
    color: var(--vp-c-text-1);
}

.search-header {
    padding-bottom: 24px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid var(--vp-c-divider-light);
    backdrop-filter: blur(8px);
}

.search-input-wrapper {
    position: relative;
    width: 100%;
}

.search-input-wrapper input {
    width: 100%;
    padding: 12px 45px 12px 16px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 16px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    transition: all 0.2s ease;
}

.search-input-wrapper input:focus {
    outline: none;
    border-color: var(--vp-c-brand);
}

.search-shortcuts {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--vp-c-bg-alt);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    color: var(--vp-c-text-2);
    cursor: default;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
}

/* 当输入框聚焦时显示快捷键提示 */
.search-input-wrapper input:focus~.search-shortcuts {
    opacity: 1;
    visibility: visible;
}

/* .search-shortcuts:hover {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
} */

.filter-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-buttons button {
    padding: 8px 14px;
    border-radius: 8px;
    background: var(--vp-c-bg);
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    transition: all 0.2s ease;
}

.filter-buttons button:hover {
    border-color: color-mix(in srgb, var(--vp-c-brand) 80%, transparent);
    color: var(--vp-c-text-1);
}

.filter-buttons button.active {
    background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
    color: var(--vp-c-brand);
}

.content-container {
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 16px;
}

h2 {
    margin-top: 0;
    padding-top: 4px;
    border: none;
}

.results-list {
    width: 30%;
    overflow-y: auto;
    border-right: 1px solid var(--vp-c-divider-light);
    padding: 0;
    height: 100%;
    background: var(--vp-c-bg);
    border-radius: 8px;
}

.api-result-item {
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: none;
    position: relative;
}

.api-result-item:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    background: var(--vp-c-divider-light);
    opacity: 0.6;
}

.api-result-item:last-child:after {
    display: none;
}

.api-result-item:hover {
    background: color-mix(in srgb, var(--vp-button-alt-hover-bg) 50%, transparent);
}

.api-result-item.active {
    background: color-mix(in srgb, var(--vp-button-alt-active-bg) 50%, transparent);
    position: relative;
}

.api-result-item.active:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--vp-c-brand);
    border-radius: 0 2px 2px 0;
}

.api-item-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
}

.api-name {
    font-weight: 600;
    font-size: 16px;
    color: var(--vp-c-text-1);
}

.api-path {
    font-family: var(--vp-font-family-mono);
    font-size: 12px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.api-desc {
    font-size: 16px;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.api-args-empty {
    font-size: 16px;
    color: var(--vp-c-text-2);
}

.hot-api {
    font-size: 12px;
    margin-left: auto;
}

.detail-panel {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    height: 100%;
    background: var(--vp-c-bg);
    border-radius: 8px;
}

.api-detail-header {
    margin-bottom: 28px;
}

.api-detail-header h2 {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 28px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.api-meta {
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

.api-side {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.api-side.client {
    background-color: var(--client-bg);
    color: var(--client-color);
}

.api-side.server {
    background-color: var(--server-bg);
    color: var(--server-color);
}

.api-section {
    margin-bottom: 36px;
}

.api-section h3 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

table {
    width: 100%;
    border-collapse: collapse;
    /* 改为 collapse 模式 */
    margin-bottom: 28px;
    border: 1px solid var(--vp-c-divider-light);
    box-sizing: border-box;
}

/* 统一单元格边框 */
th,
td {
    border: 1px solid var(--vp-c-divider-light);
    padding: 12px 16px;
    /* 移除所有圆角相关设置 */
}

/* 智能边框控制 */
tr:not(:last-child) td,
tr:not(:last-child) th {
    border-bottom-width: 0;
    /* 非最后行取消下边框 */
}

td:not(:last-child),
th:not(:last-child) {
    border-right-width: 0;
    /* 非最后列取消右边框 */
}

code {
    font-family: var(--vp-font-family-mono);
    background: var(--vp-c-bg-mute);
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--vp-c-text-code);
}

.code-example {
    background: var(--vp-code-block-bg);
    border-radius: 8px;
    overflow: hidden;
}

.code-example pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
}

.code-example code {
    background: transparent;
    color: var(--vp-c-text-code);
    white-space: pre;
    padding: 0;
}

.highlight {
    background: rgba(255, 160, 0, 0.15);
    color: var(--highlight-color);
    border-radius: 2px;
    padding: 0 2px;
}

.loading-state,
.empty-state,
.no-results,
.no-selection {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--vp-c-text-2);
    text-align: center;
    padding: 0 20px;
}

.spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(var(--vp-c-brand-rgb), 0.1);
    border-top-color: var(--vp-c-brand);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
}

.tip {
    font-size: 14px;
    opacity: 0.7;
    margin-top: 10px;
}

.search-suggestions {
    margin-top: 20px;
}

.search-suggestions button {
    margin: 4px;
    padding: 8px 16px;
    background: var(--vp-c-bg-soft);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--vp-c-text-1);
    transition: all 0.2s ease;
}

.search-suggestions button:hover {
    background: var(--vp-c-bg-alt);
}

.feedback {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px 20px;
    gap: 10px;
    border-top: 1px solid var(--vp-c-divider-light);
}

.feedback button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    opacity: 0.7;
    transition: all 0.2s ease;
}

.feedback button:hover {
    opacity: 1;
    transform: scale(1.1);
}

.history-list {
    list-style: none;
    padding: 4px 0;
    background: var(--vp-c-bg-soft);
    border-radius: 8px;
    overflow: hidden;
}

.history-list li {
    margin: 12px 24px;
    position: relative;
}

.history-list li:last-child:after {
    display: none;
}

.author {
    font-size: 12px;
    color: var(--vp-c-text-2);
    margin-left: 10px;
}

/* 复制成功提示样式 */
.copy-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 100;
    font-size: 14px;
    border: 1px solid var(--vp-c-divider-light);
}

.copy-toast.visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.api-detail-header h2 {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 28px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.copy-tooltip {
    background: color-mix(in srgb, var(--vp-c-bg-alt) 80%, transparent);
    border-radius: 6px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 400;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.copy-tooltip:hover {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .results-list {
        width: 100%;
        height: auto;
        max-height: 50vh;
    }

    .api-table-container {
        height: auto !important;
    }

}
</style>