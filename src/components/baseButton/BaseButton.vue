<script lang="ts" setup>
import { IconSpinner } from '@iconify-prerendered/vue-fa-solid'

withDefaults(
  defineProps<{
    label?: string
    type?: HTMLButtonElement['type']
    theme?: 'neutral' | 'accent' | 'info' | 'warning' | 'success' | 'danger'
    loading?: boolean
    circle?: boolean
  }>(),
  {
    type: 'button',
    theme: 'neutral',
  },
)

const themeToClass = {
  neutral: 'bg-neutral-1 text-dark hover:bg-neutral-1/80',
  accent:
    'bg-gradient-to-r from-primary to-secondary text-light hover:from-primary/90 hover:to-secondary/90 border-primary border-solid',
  info: 'bg-info text-light hover:bg-info/80',
  success: 'bg-success text-light hover:bg-success/80',
  warning: 'bg-warning text-light hover:bg-warning/80',
  danger: 'bg-danger text-light hover:bg-danger/80',
}
</script>

<template>
  <button
    :type
    class="text-md border-none cursor-pointer transition-all duration-300"
    :class="[
      themeToClass[theme],
      `${circle ? 'rounded-full p-0 h-10 w-10' : 'rounded-xl px-3 h-10'}`,
    ]"
  >
    <span class="flex justify-between items-center gap-1">
      <span>
        <IconSpinner v-if="loading" class="animate-spin" />
      </span>
      <span>
        <slot v-if="!circle">
          {{ label }}
        </slot>
      </span>
      <span>
        <slot v-if="!circle || (circle && !loading)" name="icon" />
      </span>
    </span>
  </button>
</template>
