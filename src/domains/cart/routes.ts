import { createRoute } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useAuthMiddleware } from '../auth/middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'cart-layout',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: BaseLayout,
})

export const cartRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'cart',
    path: '/cart',
    component: defineAsyncComponent(() => import('./pages/CartPage.vue')),
  }),
]
