import { useMessageContextProvider } from '@/components/message/useMessageContextProvider.ts'
import type { MessageOptionProps, MessageProps } from '@/components/message/messageHelper.ts'

export type MessageType = MessageProps & MessageOptionProps

export function useMessage() {
  const { injectContext } = useMessageContextProvider()
  const { props, messages } = injectContext()

  function showMessage(message: MessageType | string) {
    let messageType: MessageType

    if (typeof message === 'string') {
      messageType = { ...props, content: message }
    } else {
      messageType = { ...props, ...message }
    }

    messages.value.push(messageType)

    setTimeout(() => {
      const index = messages.value.indexOf(messageType)
      messages.value.splice(index, 1)
    }, messageType?.timeout ?? 3000)
  }

  return {
    showMessage,
  }
}
