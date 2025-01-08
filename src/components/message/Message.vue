<script lang="ts" setup>
import {
  IconExclamationTriangle,
  IconTimes,
  IconInfoCircle,
} from '@iconify-prerendered/vue-fa-solid'
import { IconCheckmarkFilled } from '@iconify-prerendered/vue-pepicons-pencil'

withDefaults(
  defineProps<{
    theme?: 'neutral' | 'danger' | 'success' | 'warning' | 'info'
    title?: string
    content: string
  }>(),
  {
    theme: 'info',
  },
)
const emit = defineEmits<{
  close: []
}>()

const messageThemes = {
  neutral: { style: 'border-neutral-3 bg-neutral-3', icon: IconInfoCircle, iconStyle: 'text-2xl' },
  success: {
    style: 'border-success bg-success',
    icon: IconCheckmarkFilled,
    iconStyle: 'text-3xl',
  },
  danger: {
    style: 'border-danger bg-danger',
    icon: IconExclamationTriangle,
    iconStyle: 'text-xl',
  },
  warning: {
    style: 'border-warning bg-warning',
    icon: IconExclamationTriangle,
    iconStyle: 'text-xl',
  },
  info: { style: 'border-info bg-info', icon: IconInfoCircle, iconStyle: 'text-2xl' },
}
</script>

<template>
  <div
    class="rounded-xl text-dark w-fit flex items-stretch overflow-hidden min-w-80 max-w-150 border-solid border-3"
    :class="messageThemes[theme].style"
  >
    <div class="flex items-center justify-center w-15" :class="messageThemes[theme].iconStyle">
      <component :is="messageThemes[theme].icon" />
    </div>
    <div class="grow p-3 rounded-l-xl bg-neutral-1">
      <strong class="mb-1" v-if="title">{{ title }}</strong>
      <p class="m-0">{{ content }}</p>
    </div>
    <button
      class="flex items-center justify-center border-none text-inherit cursor-pointer w-15 p-0 bg-neutral-1"
      @click="emit('close')"
    >
      <IconTimes />
    </button>
  </div>
</template>
