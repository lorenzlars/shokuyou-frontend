import { useAuthMiddleware } from '@/domains/auth/middlewares/authMiddleware.ts'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { createRoute } from '@kitbag/router'
import { useAuthStore } from '../auth/stores/authStore'

// export const RecipesRoutes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: BaseLayout,
//     beforeEnter: useAuthMiddleware(),
//     children: [
//       {
//         path: '',
//         name: 'recipes',
//         component: () => import('./pages/RecipesPage.vue'),
//       },
//     ],
//   },
// ]

const baseRoute = createRoute({
  onBeforeRouteEnter: (to, { replace }) => {
    const { isAuthenticated } = useAuthStore()

    if (to.name !== 'login' && !isAuthenticated) {
      return replace('login')
    }
  },
  path: '',
  component: BaseLayout,
})


export const recipesRoute = createRoute({
  parent: baseRoute,
  name: 'recipes',
  path: '/',
  component: () => import('./pages/RecipesPage.vue'),
})
