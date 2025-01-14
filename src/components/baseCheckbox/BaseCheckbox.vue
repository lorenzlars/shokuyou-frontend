<script lang="ts" setup>
import { IconCheck } from '@iconify-prerendered/vue-fa-solid'

defineProps<{
  label: string
}>()
const modelValue = defineModel()
</script>

<template>
  <label class="flex items-center cursor-pointer text-dark">
    <input type="checkbox" v-model="modelValue" class="appearance-none m-0 display-none" />
    <span
      border="solid 2 neutral-3"
      class="flex items-center justify-center mr-2 w-8 h-8 rounded-xl bg-light"
    >
      <IconCheck v-if="modelValue" />
    </span>
    <slot>
      <strong>
        {{ label }}
      </strong>
    </slot>
  </label>
</template>
