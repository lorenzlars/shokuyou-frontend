import { createRoute } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useAuthMiddleware } from '../auth/middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'ingredients-layout',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: BaseLayout,
})

export const ingredientsRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'ingredients',
    path: '/ingredients',
    component: defineAsyncComponent(() => import('./pages/IngredientsPage.vue')),
  }),
]
