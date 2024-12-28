import { client } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'

export default {
  install: () => {
    client.setConfig({
      baseURL: import.meta.env.VITE_API_URL,
    })

    client.instance.interceptors.request.use(function (config) {
      const { token } = useAuthStore()

      config.headers.Authorization = `Bearer ${token}`

      return config
    })
  },
}
