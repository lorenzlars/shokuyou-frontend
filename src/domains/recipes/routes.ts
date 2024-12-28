import { createRoute } from '@kitbag/router'
import { useAuthStore } from '../auth/stores/authStore'
import { defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

const baseRoute = createRoute({
  name: 'recipes-layout',
  onBeforeRouteEnter: (to, { replace }) => {
    const { isAuthenticated } = useAuthStore()

    if (to.name !== 'login' && !isAuthenticated) {
      replace('login')
    }
  },
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
