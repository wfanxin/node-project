// 登录校验中间件
module.exports = option => {
    return async (req, res, next) => {
        const AdminUser = require('../models/AdminUser')
        const jwt = require('jsonwebtoken')
        const assert = require('http-assert')
        const { secret } = require('../.env.local') // 配置信息

        // 获取token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')

        // 用户用户id
        const { id } = jwt.verify(token, secret)
        assert(id, 401, '请先登录')

        // 获取用户信息
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        
        next()
    }
}