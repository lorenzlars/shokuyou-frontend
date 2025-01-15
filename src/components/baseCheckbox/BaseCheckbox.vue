<script lang="ts" setup>
import { IconCheck } from '@iconify-prerendered/vue-fa-solid'

const props = defineProps<{
  label: string
  disabled?: boolean
}>()
const modelValue = defineModel()

function handleKeydown() {
  if (!props.disabled) {
    modelValue.value = !modelValue.value
  }
}
</script>

<template>
  <label class="flex items-center cursor-pointer text-dark">
    <input
      tabindex="-1"
      type="checkbox"
      v-model="modelValue"
      class="appearance-none m-0 display-none"
      :disabled
    />
    <span
      tabindex="0"
      @keydown.space.prevent="handleKeydown"
      bg="light disabled:neutral-1"
      border="2 solid neutral-3 hover:neutral-3/90"
      class="flex items-center justify-center mr-2 w-8 h-8 rounded-xl bg-light focus:border-primary"
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
