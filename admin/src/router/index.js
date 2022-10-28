import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/categories/create',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: '/categories/list',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import('../views/CategoryEdit.vue'),
        props: true // 参数注入到页面
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
