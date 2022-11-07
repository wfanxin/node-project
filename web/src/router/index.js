import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
