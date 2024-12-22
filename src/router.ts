import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

import { AuthRoutes } from '@/domains/auth/routes.ts'
import { RecipesRoutes } from '@/domains/recipes/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App,
      children: [...AuthRoutes, ...RecipesRoutes],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
