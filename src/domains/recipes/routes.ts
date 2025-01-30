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
    path: '/recipes',
    component: defineAsyncComponent(() => import('./pages/RecipesPage.vue')),
  }),
  createRoute({
    parent: baseRoute,
    name: 'recipe-create',
    path: '/recipes/create',
    component: defineAsyncComponent(() => import('./pages/RecipePage.vue')),
  }),
  createRoute({
    parent: baseRoute,
    name: 'recipe',
    path: '/recipes/[id]',
    component: defineAsyncComponent(() => import('./pages/RecipePage.vue')),
  }),
]
