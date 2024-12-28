import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { BeforeRouteHook } from '@kitbag/router'

export function useAuthMiddleware(): BeforeRouteHook {
  return (to, { replace }) => {
    const { isAuthenticated } = useAuthStore()

    if (to.name !== 'login' && !isAuthenticated) {
      replace('login')
    }

    if (to.name === 'login' && isAuthenticated) {
      replace('recipes')
    }
  }
}
