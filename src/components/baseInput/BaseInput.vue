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
    class="bg-neutral-1 text-dark p-3 h-12 border-none border-2 rounded-xl border-dark border-solid hover:bg-neutral-1/90 box-border disabled:bg-neutral-1/60 disabled:cursor-not-allowed disabled:border-dark/60"
  />
</template>
