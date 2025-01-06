import type { useI18n } from 'vue-i18n'

type ErrorHandlingProviderContext = {
  t: ReturnType<typeof useI18n>['t']
}

let context: ErrorHandlingProviderContext

export function useErrorHandlingContextProvider() {
  function provideContext(providedContext: ErrorHandlingProviderContext) {
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
