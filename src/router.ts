import { createRoute, createRouter, path } from '@kitbag/router'

import { authRoute } from '@/domains/auth/routes.ts'
import { recipesRoute } from '@/domains/recipes/routes.ts'
import { ingredientsRoute } from '@/domains/ingredients/routes.ts'
import { plansRoute } from '@/domains/plans/routes.ts'

const router = createRouter([
  ...authRoute,
  ...recipesRoute,
  ...ingredientsRoute,
  ...plansRoute,

  createRoute({
    name: 'catch-all',
    path: path('[pattern]', { pattern: /.*/g }),
    onBeforeRouteEnter: (_, { replace }) => {
      replace('recipes')
    },
  }),
])

export default router
