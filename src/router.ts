import { createRoute, createRouter, path } from '@kitbag/router'

import { authRoute } from '@/domains/auth/routes.ts'
import { recipesRoute } from '@/domains/recipes/routes.ts'
import { ingredientsRoute } from '@/domains/ingredients/routes.ts'
import { plansRoute } from '@/domains/plans/routes.ts'
import { cartRoute } from '@/domains/cart/routes.ts'

const router = createRouter([
  ...authRoute,
  ...recipesRoute,
  ...ingredientsRoute,
  ...plansRoute,
  ...cartRoute,

  createRoute({
    name: 'catch-all',
    path: path('[pattern]', { pattern: /.*/g }),
    onBeforeRouteEnter: (_, { replace }) => {
      replace('recipes')
    },
  }),
])

// TODO: Is also broken, like the push function of useRouter. I should switch back to vue-router.
router.onBeforeRouteLeave(() => {
  window.scrollTo(0, 0)
})

export default router
