<script lang="ts" setup>
defineProps<{
  label: string
}>()
const modelValue = defineModel()
</script>

<template>
  <label class="flex gap-2 cursor-pointer">
    <input type="checkbox" v-model="modelValue" />
    <small class="font-semibold">
      <slot>
        {{ label }}
      </slot>
    </small>
  </label>
</template>
