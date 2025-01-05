<script lang="ts" setup>
const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400"
  />
</template>

<style lang="scss" scoped></style>
