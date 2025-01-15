import type { App, Plugin } from 'vue'
import { AxiosError, type AxiosResponse } from 'axios'
import { useErrorHandlingContextProvider } from '@/domains/errorHandling/provider/useErrorHandlingContextProvider.ts'
import { useMessage } from '@/components/message/useMessage.ts'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'

type NestJsError = {
  errors: string
  message: string[]
  statusCode: number
}

export const ErrorHandlingPlugin: Plugin = {
  install: (app: App) => {
    const { injectContext } = useErrorHandlingContextProvider()

    function handleError(error: unknown) {
      const { showMessage } = useMessage()
      const { t } = injectContext()

      if (error instanceof AxiosError) {
        const axiosResponse = error.response as AxiosResponse<NestJsError>

        if (axiosResponse?.status === 401) {
          const { logout } = useAuthStore()

          logout()
          window.location.reload()
        }

        if (axiosResponse?.status === 400) {
          return showMessage({ content: axiosResponse.data.message.join('\n'), theme: 'warning' })
        }

        return showMessage({ content: error.message, theme: 'danger' })
      }

      showMessage({ content: t('errors.generic'), theme: 'danger' })
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
