import { client } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { Plugin } from 'vue'

export const AuthPlugin: Plugin = {
  install: () => {
    client.instance.interceptors.request.use((config) => {
      const { token } = useAuthStore()

      config.headers.Authorization = `Bearer ${token}`

      return config
    })

    client.instance.interceptors.response.use(undefined, (error) => {
      const { logout } = useAuthStore()

      if (error.status === 401) {
        logout()
        return window.location.reload()
      }

      return Promise.reject(error)
    })
  },
}
