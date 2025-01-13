<script lang="ts" setup>
import { IconSpinner } from '@iconify-prerendered/vue-fa-solid'

withDefaults(
  defineProps<{
    label?: string
    type?: HTMLButtonElement['type']
    theme?: 'neutral' | 'accent' | 'info' | 'warning' | 'success' | 'danger' | 'passive'
    loading?: boolean
    circle?: boolean
    small?: boolean // TODO: Not implemented
    disabled?: boolean
  }>(),
  {
    type: 'button',
    theme: 'neutral',
  },
)

const themeToClass = {
  neutral: 'bg-neutral-3 text-dark hover:bg-neutral-3/90 border-none',
  accent:
    'bg-gradient-to-r from-primary to-secondary text-dark hover:from-primary/90 hover:to-secondary/90 border-none',
  info: 'bg-info text-dark hover:bg-info/90 border-none',
  success: 'bg-success text-dark hover:bg-success/90 border-none',
  warning: 'bg-warning text-dark hover:bg-warning/90 border-none',
  danger: 'bg-danger text-dark hover:bg-danger/90 border-none',
  passive:
    'bg-transparent text-neutral-3 hover:bg-neutral-1/90 border-dashed border-neutral-3 border-1',
}
</script>

<template>
  <button
    :type
    :disabled
    class="font-semibold cursor-pointer transition-bg duration-300"
    :class="[
      themeToClass[theme],
      `${circle ? 'rounded-full p-0 h-10 w-10' : 'rounded-xl px-4 h-12'}`,
      `${disabled ? 'cursor-not-allowed' : ''}`,
    ]"
  >
    <span class="flex justify-center items-center">
      <transition name="fade">
        <IconSpinner v-if="loading" class="animate-spin w-4" />
      </transition>
      <span v-if="!circle" class="mx-3">
        <slot>
          {{ label }}
        </slot>
      </span>
      <slot name="icon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  width: 0;
}
</style>
