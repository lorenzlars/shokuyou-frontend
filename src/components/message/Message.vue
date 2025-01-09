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
    iconStyle: 'text-3xl text-light-static',
  },
  danger: {
    style: 'border-danger bg-danger',
    icon: IconExclamationTriangle,
    iconStyle: 'text-xl text-light-static',
  },
  warning: {
    style: 'border-warning bg-warning',
    icon: IconExclamationTriangle,
    iconStyle: 'text-xl text-light-static',
  },
  info: {
    style: 'border-info bg-info',
    icon: IconInfoCircle,
    iconStyle: 'text-2xl text-light-static',
  },
}
</script>

<template>
  <div
    class="rounded-xl w-fit flex items-stretch overflow-hidden border-solid border-3 box-border"
    :class="messageThemes[theme].style"
  >
    <div class="flex items-center justify-center w-24" :class="messageThemes[theme].iconStyle">
      <component :is="messageThemes[theme].icon" />
    </div>
    <div class="text-dark grow p-3 rounded-l-xl bg-neutral-1 w-full">
      <strong class="mb-1" v-if="title">{{ title }}</strong>
      <p class="m-0">{{ content }}</p>
    </div>
    <button
      class="text-dark flex items-center justify-center border-none cursor-pointer w-24 p-0 bg-neutral-1"
      @click="emit('close')"
    >
      <IconTimes />
    </button>
  </div>
</template>
