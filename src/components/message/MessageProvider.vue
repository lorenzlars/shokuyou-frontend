<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import {
  messageKey,
  type MessageOptionProps,
  type MessageProps,
  optionKey,
} from '@/components/message/messageHelper.ts'
import Message from '@/components/message/Message.vue'

const props = defineProps<MessageOptionProps>()
const messages = ref<MessageProps[]>([])

onMounted(() => {
  const context = getCurrentInstance()

  if (context) {
    context.appContext.app.provide(optionKey, props)
    context.appContext.app.provide(messageKey, messages)
  }
})
</script>

<template>
  <slot />
  <teleport to="body">
    <div class="flex pb-1 pl-1 flex-col gap-2 fixed bottom-0 left-0 z-1000 max-w-50">
      <transition-group name="fade-slide">
        <Message v-bind="message" v-for="(message, key) in messages" :key />
      </transition-group>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.fade-slide-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
