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
    bg="light hover:light/98 disabled:light/95"
    border="2 solid neutral-1 disabled:neutral-1/95"
    class="text-dark p-3 h-12 rounded-xl box-border disabled:cursor-not-allowed placeholder:text-neutral-1 placeholder:opacity-100"
  />
</template>
