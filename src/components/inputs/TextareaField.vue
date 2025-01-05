<script lang="ts" setup>
const modelValue = defineModel<string>()
</script>

<template>
  <textarea
    v-model="modelValue"
    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400 resize-y"
  ></textarea>
</template>

<style lang="scss" scoped></style>
