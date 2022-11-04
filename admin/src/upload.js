import http from './http'

// upload地址
export const uploadUrl = http.defaults.baseURL + '/upload'

// upload用户登录验证
export const getAuthHeaders = {
    Authorization: `Bearer ${localStorage.token || ''}`
}