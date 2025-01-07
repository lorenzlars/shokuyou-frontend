<script lang="ts" setup>
defineProps<{
  label: string
}>()
const modelValue = defineModel()
</script>

<template>
  <label class="flex gap-2 cursor-pointer">
    <input type="checkbox" v-model="modelValue" class="w-5 h-5 border-gray-300 rounded-xl" />
    <small class="font-semibold text-dark">
      <slot>
        {{ label }}
      </slot>
    </small>
  </label>
</template>
