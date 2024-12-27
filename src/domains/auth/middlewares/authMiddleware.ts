import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { NavigationGuard } from 'vue-router'

export function useAuthMiddleware(): NavigationGuard {
  return (to, _from, next) => {
    const { isAuthenticated } = useAuthStore()

    if (to.name !== 'login' && !isAuthenticated) {
      return next({ name: 'login' })
    }

    return next()
  }
}
