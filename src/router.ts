import { createRoute, createRouter, path } from '@kitbag/router'

import { authRoute } from '@/domains/auth/routes.ts'
import { recipesRoute } from '@/domains/recipes/routes.ts'

const router = createRouter([
  ...authRoute,
  ...recipesRoute,

  createRoute({
    name: 'catch-all',
    path: path('/[pattern]', { pattern: /.*/g }),
    onBeforeRouteEnter: (to, { replace }) => {
      replace('recipes')
    }
  }),
])

export default router
