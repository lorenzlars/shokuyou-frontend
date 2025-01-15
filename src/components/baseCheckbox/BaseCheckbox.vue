<script lang="ts" setup>
import { IconCheck } from '@iconify-prerendered/vue-fa-solid'
import { useInheritState } from '@/composables/useInheritState.ts'

defineProps<{
  label: string
  disabled?: boolean
}>()
const modelValue = defineModel()
const { fieldProps, hasFocus } = useInheritState()
</script>

<template>
  <label class="flex items-center cursor-pointer text-dark">
    <input
      type="checkbox"
      v-model="modelValue"
      v-bind="fieldProps"
      :aria-label="label"
      :disabled
      class="appearance-none m-0 display-none"
    />
    <span
      bg="light disabled:neutral-1"
      border="2 solid neutral-3 hover:neutral-3/90"
      class="flex items-center justify-center mr-2 w-8 h-8 rounded-xl bg-light"
      :class="{ 'border-primary': hasFocus }"
    >
      <IconCheck v-if="modelValue" />
    </span>
    <span>
      <slot>
        <strong>
          {{ label }}
        </strong>
      </slot>
    </span>
  </label>
</template>
