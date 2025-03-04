import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import RoleView from '../views/Authorization/RoleView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterPage.vue'),
    },
    {
      path: '/dashboard',
      name: '/dashboard',
      component: HomeView,
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleView,
    }

  ],
})

export default router
