import type { App, Plugin } from 'vue'
import { AxiosError, type AxiosResponse } from 'axios'
import { useErrorHandlingContextProvider } from '@/domains/errorHandling/provider/useErrorHandlingContextProvider.ts'

type NestJsError = {
  errors: string
  message: string[]
  statusCode: number
}

export const ErrorHandlingPlugin: Plugin = {
  install: (app: App) => {
    const { injectContext } = useErrorHandlingContextProvider()

    function handleError(error: unknown) {
      const { t, message } = injectContext()

      if (error instanceof AxiosError) {
        const axiosResponse = error.response as AxiosResponse<NestJsError>

        if (axiosResponse.status === 400) {
          return message.error(axiosResponse.data.message.join('\n'))
        }

        return message.error(error.message)
      }

      message.error(t('errors.generic'))
      console.error(error)
    }

    window.addEventListener('error', function (event) {
      handleError(event.error)
    })

    window.addEventListener('unhandledrejection', function (event) {
      handleError(event)
    })

    app.config.errorHandler = (error) => {
      handleError(error)
    }
  },
}
