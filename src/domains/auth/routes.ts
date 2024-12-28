import type { RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/domains/auth/layout/AuthLayout.vue'
import { createRoute, } from '@kitbag/router'

// export const AuthRoutes: RouteRecordRaw[] = [
//   {
//     path: '/login',
//     component: AuthLayout,
//     children: [
//       {
//         path: '',
//         name: 'login',
//         component: () => import('./pages/LoginPage.vue'),
//       },
//     ],
//   },
// ]

const baseRoute = createRoute({
  path: '',
  component: AuthLayout,
})

export const authRoute = createRoute({
  parent: baseRoute,
  name: 'auth',
  path: '/login',
  component: () => import('./pages/LoginPage.vue'),
})
