import { inject, type Ref } from 'vue'

export type MessageProps = {
  theme?: 'neutral' | 'danger' | 'success' | 'warning' | 'info'
  title?: string
  content: string
}

export type MessageOptionProps = {
  timeout?: number
}

export type MessageType = MessageProps & MessageOptionProps

export const messageKey = Symbol()
export const optionKey = Symbol()

export function injectMessageOptions() {
  const options = inject<MessageOptionProps>(optionKey)

  if (!options) {
    throw new Error('Use MessageProvider!')
  }

  return options
}

export function injectMessages() {
  const messages = inject<Ref<MessageProps[]>>(messageKey)

  if (!messages) {
    throw new Error('Use MessageProvider!')
  }

  return messages
}
