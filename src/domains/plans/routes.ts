import { createRoute, path } from '@kitbag/router'
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
  createRoute({
    parent: baseRoute,
    name: 'plan-create',
    path: '/plans/create',
    component: defineAsyncComponent(() => import('./pages/PlanPage.vue')),
  }),
  createRoute({
    parent: baseRoute,
    name: 'plan',
    path: path('/plans/[id]', {
      id: /* Is UUID */ /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    }),
    component: defineAsyncComponent(() => import('./pages/PlanPage.vue')),
  }),
]
