import type { RouteRecordRaw } from 'vue-router'

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: () => import('./pages/LoginPage.vue'),
  },
]
