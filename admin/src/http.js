import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截器
http.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }

    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        ElMessage({
            message: err.response.data.message,
            type: 'error'
        })
    }

    if (err.response.status == 401) { // 未登录
        router.push('/login')
    }
    
    return Promise.reject(err)
})

export default http