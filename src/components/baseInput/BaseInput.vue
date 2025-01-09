<script lang="ts" setup>
defineProps<{
  placeholder?: string
  disabled?: boolean
}>()
const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    :placeholder
    :disabled
    bg="light disabled:neutral-1"
    border="2 solid neutral-3 hover:neutral-3/90"
    class="text-dark p-3 h-12 rounded-xl box-border disabled:cursor-not-allowed"
  />
</template>
