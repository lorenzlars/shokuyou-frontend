import { client } from '@/api'
import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import { storeToRefs } from 'pinia'

export default {
  install: () => {
    const { token } = storeToRefs(useAuthStore())

    client.setConfig({
      baseURL: import.meta.env.VITE_API_URL,
    })

    client.instance.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token.value}`

      return config
    })
  },
}
