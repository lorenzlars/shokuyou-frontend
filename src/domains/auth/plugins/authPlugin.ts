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

    client.instance.interceptors.response.use(function (response) {
      const { logout } = useAuthStore()

      if (response.status === 401) {
        logout()
        window.location.href = '/login'
      }

      return response
    }, function (error) {
      const { logout } = useAuthStore()

      if (error.response.status === 401) {
        logout()
        window.location.href = '/login'
      }

      return Promise.reject(error)
    })
  },
}
