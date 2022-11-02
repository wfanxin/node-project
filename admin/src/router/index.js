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
            },
            {
                path: '/items/create',
                component: () => import('../views/ItemEdit.vue')
            },
            {
                path: '/items/list',
                component: () => import('../views/ItemList.vue')
            },
            {
                path: '/items/edit/:id',
                component: () => import('../views/ItemEdit.vue'),
                props: true // 参数注入到页面
            },
            {
                path: '/heros/create',
                component: () => import('../views/HeroEdit.vue')
            },
            {
                path: '/heros/list',
                component: () => import('../views/HeroList.vue')
            },
            {
                path: '/heros/edit/:id',
                component: () => import('../views/HeroEdit.vue'),
                props: true // 参数注入到页面
            },
            {
                path: '/articles/create',
                component: () => import('../views/ArticleEdit.vue')
            },
            {
                path: '/articles/list',
                component: () => import('../views/ArticleList.vue')
            },
            {
                path: '/articles/edit/:id',
                component: () => import('../views/ArticleEdit.vue'),
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
