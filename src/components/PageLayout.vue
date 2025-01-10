<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-5 py-5">
    <h1 v-if="title" class="text-12 font-black">{{ title }}</h1>

    <slot />
  </div>
</template>
