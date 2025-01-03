import { createRoute, path } from '@kitbag/router'
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
    path: path('/recipes/[id]', {
      id: /* Is UUID */ /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    }),
    component: defineAsyncComponent(() => import('./pages/RecipePage.vue')),
  }),
]
