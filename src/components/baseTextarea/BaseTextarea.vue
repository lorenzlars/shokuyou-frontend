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
    class="bg-neutral-3 h-20 resize-y text-dark p-3 h-10 border-neutral-1 border-solid rounded-xl box-border font-sans"
  />
</template>
