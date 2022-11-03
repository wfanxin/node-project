import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截器
http.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    ElMessage({
        message: err.response.data.message,
        type: 'error'
    })
    return Promise.reject(err)
})

export default http