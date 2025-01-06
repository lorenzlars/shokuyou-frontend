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
  neutral: 'bg-black text-black hover:black/80',
  accent: 'bg-accent text-white hover:bg-accent-focus',
  info: 'bg-info text-white hover:bg-info/80',
  success: 'bg-success text-white hover:bg-success/80',
  warning: 'bg-warning text-white hover:bg-warning/80',
  danger: 'bg-danger text-white hover:bg-danger/80',
}
</script>

<template>
  <button
    :type
    class="text-md text-white border-none cursor-pointer transition-all duration-500"
    :class="[themeToClass[theme], `${circle ? 'rounded-full h-10 w-10' : 'rounded-xl px-3 h-10'}`]"
  >
    <span class="inline-flex gap-1 justify-between items-center">
      <IconSpinner v-if="loading" class="animate-spin" />
      <slot v-if="!circle">
        {{ label }}
      </slot>
      <slot v-if="!circle || (circle && !loading)" name="icon" />
    </span>
  </button>
</template>

<style>
/* TODO: Gradient transition */

@property --color-primary {
  syntax: '<color>';
  initial-value: magenta;
  inherits: false;
}

@property --color-secondary {
  syntax: '<color>';
  initial-value: #00ff00;
  inherits: false;
}
</style>
