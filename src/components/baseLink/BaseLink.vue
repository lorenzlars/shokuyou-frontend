<script lang="ts" setup>
import type { ResolvedRoute, Url } from '@kitbag/router'

const props = defineProps<{
  to: Url | ResolvedRoute
}>()
</script>

<template>
  <RouterLink
    v-bind="props"
    class="text-primary hover:text-contrast-4 hover:underline cursor-pointer"
  >
    <slot />
  </RouterLink>
</template>
