<script lang="ts" setup>
import { ref } from 'vue'
import Message from '@/components/message/Message.vue'
import { useMessageContextProvider } from '@/components/message/useMessageContextProvider.ts'

export type MessageProps = {
  id: string
  theme?: 'neutral' | 'danger' | 'success' | 'warning' | 'info'
  title?: string
  content: string
}

export type MessageOptionProps = {
  timeout?: number
}

const { provideContext } = useMessageContextProvider()

const props = defineProps<MessageOptionProps>()
const messages = ref<MessageProps[]>([])

provideContext({ props, messages })

function removeMessage(id: string) {
  messages.value = messages.value.filter((msg) => msg.id !== id)
}
</script>

<template>
  <slot />
  <teleport to="body">
    <div
      class="flex mb-4 ml-4 flex-col gap-2 fixed bottom-0 left-0 z-1000 w-full md:w-128 items-stretch"
    >
      <transition-group name="fade-slide">
        <Message
          class="hover:shadow-md transition-all duration-300 w-full"
          v-bind="message"
          v-for="message in messages"
          :key="message.id"
          @close="removeMessage(message.id)"
        />
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
