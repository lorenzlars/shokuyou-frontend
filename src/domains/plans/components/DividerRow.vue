<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex gap-3 align-items-center">
    <span>{{ title }}</span>
  </div>
</template>
