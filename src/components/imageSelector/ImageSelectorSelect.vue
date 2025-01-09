<script lang="ts" setup>
import { IconBox } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  label?: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3 text-neutral-1 bg-neutral-3"
    :aria-label="label"
  >
    <IconBox class="text-4xl" />
    <p class="m-0 text-center">{{ label }}</p>
  </div>
</template>
