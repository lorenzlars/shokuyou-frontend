<script lang="ts" setup>
import type { MessageProps } from '@/components/message/messageHelper.ts'

defineProps<{
  message: MessageProps
}>()
</script>

<template>
  <div class="bg-blue-400 p-4 w-fit">
    {{ message.text }}
  </div>
</template>
