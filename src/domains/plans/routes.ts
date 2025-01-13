import { createRoute } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useAuthMiddleware } from '../auth/middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'plans-layout',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: BaseLayout,
})

export const plansRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'plans',
    path: '/plans',
    component: defineAsyncComponent(() => import('./pages/PlansPage.vue')),
  }),
]
