import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './http' // axios请求

import './assets/iconfont/iconfont.css'

import './assets/scss/style.scss'

const app = createApp(App)
app.config.globalProperties.$http = http // 设为全局
app.use(router)
app.mount('#app')
