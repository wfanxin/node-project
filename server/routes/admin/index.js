module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const { secret } = require('../../.env.local') // 配置信息

    const router = express.Router({
        mergeParams: true // 为了在router中能拿到params
    })

    // 新增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 获取列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { // 获取模型名称并判断
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 获取指定id
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 更新指定id
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除指定id
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 资源模型中间件
    const resourceMiddleware = require('../../middleware/resource')

    // 统一处理
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 单文件上传
    const muler = require('multer')
    const upload = muler({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.use('/admin/api/login', async (req, res) => {
        const {username, password} = req.body

        // 根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')

        // 验证密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 生成token
        const token = jwt.sign({id: user._id}, secret)
        res.send({token, username: user.username})
    })

    // 错误捕获处理
    app.use( async(err, req, res, next) => {
        res.status(err.status).send({
            message: err.message
        })
    })
}