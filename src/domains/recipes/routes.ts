import type { RouteRecordRaw } from 'vue-router'
import { useAuthMiddleware } from '@/domains/auth/middlewares/authMiddleware.ts'
import BaseLayout from '@/layouts/BaseLayout.vue'

export const RecipesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BaseLayout,
    beforeEnter: useAuthMiddleware(),
    children: [
      {
        path: '',
        name: 'recipes',
        component: () => import('./pages/RecipesPage.vue'),
      },
    ],
  },
]
