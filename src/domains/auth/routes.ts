import AuthLayout from '@/domains/auth/layout/AuthLayout.vue'
import { createRoute, } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import { useAuthMiddleware } from './middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'auth-layout',
  path: '/',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: AuthLayout,
})

export const authRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'login',
    path: 'login',
    component: defineAsyncComponent(() => import('./pages/LoginPage.vue')),
  })
]
