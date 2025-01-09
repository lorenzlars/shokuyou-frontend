import { useMessageContextProvider } from '@/components/message/useMessageContextProvider.ts'
import type { MessageOptionProps, MessageProps } from '@/components/message/MessageProvider.vue'

export type MessageType = Omit<MessageProps, 'id'> & MessageOptionProps

export function useMessage() {
  const { injectContext } = useMessageContextProvider()
  const { props, messages } = injectContext()

  function showMessage(message: MessageType | string) {
    let messageType: MessageProps & MessageOptionProps

    if (typeof message === 'string') {
      messageType = { ...props, content: message, id: crypto.randomUUID() }
    } else {
      messageType = { ...props, ...message, id: crypto.randomUUID() }
    }

    messages.value.push(messageType)

    setTimeout(() => {
      messages.value = messages.value.filter((m) => m.id !== messageType.id)
    }, messageType?.timeout ?? 3000)
  }

  return {
    showMessage,
  }
}
