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
    class="bg-neutral-3 text-dark p-3 h-10 border-none rounded-xl border-neutral-1 border-solid hover:bg-neutral-2 box-border disabled:bg-neutral-3/60 disabled:cursor-not-allowed disabled:border-neutral-1/60"
  />
</template>
