import { client } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { Plugin } from 'vue'

export const AuthPlugin: Plugin = {
  install: () => {
    client.instance.interceptors.request.use(function (config) {
      const { token } = useAuthStore()

      config.headers.Authorization = `Bearer ${token}`

      return config
    })
  },
}
