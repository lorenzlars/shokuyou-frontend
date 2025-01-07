<script lang="ts" setup>
const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    class="bg-neutral-1 text-dark p-3 h-10 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400 box-border"
  />
</template>
