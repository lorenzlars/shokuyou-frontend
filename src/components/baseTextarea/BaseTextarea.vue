<script lang="ts" setup>
defineProps<{
  placeholder?: string
  disabled?: boolean
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <textarea
    v-model="modelValue"
    :placeholder
    :disabled
    bg="light disabled:neutral-1"
    border="2 solid neutral-3 hover:neutral-3/90"
    class="text-dark p-3 h-32 rounded-xl box-border disabled:cursor-not-allowed font-sans"
  />
</template>
