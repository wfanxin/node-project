import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import http from './http' // axios请求

const app = createApp(App)

app.config.globalProperties.$http = http // 设为全局

app.use(router)
app.use(ElementPlus)
app.mount('#app')
