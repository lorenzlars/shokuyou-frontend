import {
  injectMessageOptions,
  injectMessages,
  type MessageType,
} from '@/components/message/messageHelper.ts'

export function useMessage() {
  const messages = injectMessages()
  const options = injectMessageOptions()

  function showMessage(message: MessageType | string) {
    let messageType: MessageType

    if (typeof message === 'string') {
      messageType = { ...options, content: message }
    } else {
      messageType = { ...options, ...message }
    }

    messages.value.push(messageType)

    setTimeout(() => {
      messages.value.pop()
    }, messageType?.timeout ?? 3000)
  }

  return {
    showMessage,
  }
}
