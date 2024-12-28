import { createRoute, createRouter, path } from '@kitbag/router'
import App from '@/App.vue'

import { authRoute } from '@/domains/auth/routes.ts'
import { recipesRoute } from '@/domains/recipes/routes.ts'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     ...AuthRoutes,
//     ...RecipesRoutes,
//     {
//       path: '/:catchAll(.*)',
//       redirect: '/',
//     },
//   ],
// })

const router = createRouter([
  authRoute,
  recipesRoute,
  createRoute({
    path: path('/[pattern]', { pattern: /.*/g }),
    onBeforeRouteEnter: (to, { replace }) => {
      replace('recipes')
    }
  }),
])

export default router
