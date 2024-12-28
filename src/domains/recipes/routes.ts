import { createRoute } from '@kitbag/router'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useAuthMiddleware } from '../auth/middlewares/authMiddleware'

const baseRoute = createRoute({
  name: 'recipes-layout',
  onBeforeRouteEnter: useAuthMiddleware(),
  component: BaseLayout,
})


export const recipesRoute = [
  baseRoute,
  createRoute({
    parent: baseRoute,
    name: 'recipes',
    path: '/',
    component: defineAsyncComponent(() => import('./pages/RecipesPage.vue')),
  })
]
