import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/scss',
      name: 'scss',
      component: () => import('../views/ScssExample/Scss.vue')
    }
  ]
})

export default router
