import type { RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/domains/auth/layout/AuthLayout.vue'

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('./pages/LoginPage.vue'),
      },
    ],
  },
]
