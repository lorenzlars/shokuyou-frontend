<script lang="ts" setup>
import type { ResolvedRoute, Url } from '@kitbag/router'

const props = defineProps<{
  to: Url | ResolvedRoute
}>()
</script>

<template>
  <RouterLink v-bind="props" class="text-blue hover:text-contrast-4 hover:underline">
    <slot />
  </RouterLink>
</template>
