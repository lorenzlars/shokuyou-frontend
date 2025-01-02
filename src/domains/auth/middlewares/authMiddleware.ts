import { useAuthStore } from '@/domains/auth/stores/authStore.ts'
import type { BeforeRouteHook } from '@kitbag/router'

const permittedRoutes = ['login', 'register']

export function useAuthMiddleware(): BeforeRouteHook {
  return (to, { replace }) => {
    const { isAuthenticated } = useAuthStore()

    if (!permittedRoutes.includes(to.name) && !isAuthenticated) {
      return replace('login')
    }

    if (permittedRoutes.includes(to.name) && isAuthenticated) {
      return replace('recipes')
    }
  }
}
