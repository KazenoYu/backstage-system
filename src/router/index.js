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
      path: '/index1',
      name: 'index1',
      component: ()=>{ import('../views/testIndex1/index.vue') }
    },
    {
      path: '/index2',
      name: 'index2',
      component: ()=>{ import('../views/testIndex2/index.vue') }
    }
  ]
})

export default router
