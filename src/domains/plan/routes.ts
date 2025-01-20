import { createRoute } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useAuthMiddleware } from '../auth/middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'plan-layout',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: BaseLayout,
})

export const planRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'plan',
    path: '/plan',
    component: defineAsyncComponent(() => import('./pages/PlanPage.vue')),
  }),
]
