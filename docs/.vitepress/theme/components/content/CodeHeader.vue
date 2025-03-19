<template>
	<div
		ref="codeHeader"
		class="tile flex items-center mt-8 p-2 pb-1.5 overflow-auto break-all"
	>
		<span class="flex">
			<span class="opacity-50"><slot /></span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const codeHeader = ref<HTMLDivElement | null>(null)

</script>
<style scoped>
.icon {
	fill: white;
}
</style>
