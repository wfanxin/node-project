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
      },
      {
        path: '/articles/:id',
        name: 'article',
        component: () => import('../views/ArticleView.vue'),
        props: true
      }
    ]
  },
  {
    path: '/heros/:id',
    name: 'hero',
    component: () => import('../views/HeroView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
