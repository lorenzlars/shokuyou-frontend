import type { RouteRecordRaw } from 'vue-router'
import { useAuthMiddleware } from '@/domains/auth/middlewares/authMiddleware.ts'

export const RecipesRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'recipes',
    component: () => import('./pages/RecipesPage.vue'),
    beforeEnter: useAuthMiddleware(),
  },
]
