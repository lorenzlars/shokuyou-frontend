<script lang="ts" setup>
const modelValue = defineModel<string>()
</script>

<template>
  <textarea
    v-model="modelValue"
    class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400 box-border"
  />
</template>

<style lang="scss" scoped></style>
