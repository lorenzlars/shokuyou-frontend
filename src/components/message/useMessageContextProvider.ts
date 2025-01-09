import type { MessageOptionProps, MessageProps } from '@/components/message/messageHelper.ts'
import type { Ref } from 'vue'

type MessageProviderContext = {
  props: MessageOptionProps
  messages: Ref<MessageProps[]>
}

let context: MessageProviderContext

export function useMessageContextProvider() {
  function provideContext(providedContext: MessageProviderContext) {
    context = providedContext
  }

  function injectContext() {
    if (!context) {
      throw new Error('Context not provided')
    }

    return context
  }

  return {
    provideContext,
    injectContext,
  }
}
