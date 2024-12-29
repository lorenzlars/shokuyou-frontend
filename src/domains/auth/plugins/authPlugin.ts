import { client } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { useRouter } from '@kitbag/router'

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
      return response
    }, function (error) {
      const { logout } = useAuthStore()
      const { replace } = useRouter()

      if (error.response.status === 401) {
        logout()
        replace('login')
      }

      return Promise.reject(error)
    })
  },
}
