// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { isPublic: true }
    },
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
            },
            {
                path: '/ads/create',
                component: () => import('../views/AdEdit.vue')
            },
            {
                path: '/ads/list',
                component: () => import('../views/AdList.vue')
            },
            {
                path: '/ads/edit/:id',
                component: () => import('../views/AdEdit.vue'),
                props: true // 参数注入到页面
            },
            {
                path: '/admin_users/create',
                component: () => import('../views/AdminUserEdit.vue')
            },
            {
                path: '/admin_users/list',
                component: () => import('../views/AdminUserList.vue')
            },
            {
                path: '/admin_users/edit/:id',
                component: () => import('../views/AdminUserEdit.vue'),
                props: true // 参数注入到页面
            }
        ]
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL), // 历史模式
    history: createWebHashHistory(process.env.BASE_URL), // Hash模式
    routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login')
    }

    next()
})

export default router
