import { AdminRoutes } from './admin.route';
import { createRouter, createWebHistory } from 'vue-router'
import { OpenRoutes } from './open.route';
import { UserRoutes } from './user.route';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AdminRoutes,
    OpenRoutes,
    UserRoutes,
  ]
})

export default router
