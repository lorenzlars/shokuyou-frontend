<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    type?: HTMLButtonElement['type']
    theme?: 'neutral' | 'accent' | 'info' | 'warning' | 'success' | 'danger'
  }>(),
  {
    type: 'button',
    theme: 'neutral',
  },
)

const backgroundClass = computed(() =>
  props.theme === 'neutral' ? 'bg-contrast-1' : `bg-${props.theme}`,
)
</script>

<template>
  <button
    :type
    class="p-3 text-md rounded-lg border-none cursor-pointer hover:bg-contrast-1"
    :class="[backgroundClass]"
  >
    <slot>
      {{ label }}
    </slot>
    <slot name="icon" />
  </button>
</template>

<style lang="scss" scoped></style>
