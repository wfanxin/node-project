module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true // 为了在router中能拿到params
    })
    const inflection = require('inflection') // 复数单词转驼峰

    router.post('/', async (req, res) => { // 新增
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/', async (req, res) => { // 获取列表
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { // 获取模型名称并判断
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id', async (req, res) => { // 获取指定id
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/:id', async (req, res) => { // 更新指定id
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => { // 删除指定id
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        // 中间件处理逻辑
        const modelName = inflection.classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`) // 加载对应的模型
        next()
    }, router)

    // 单文件上传
    const muler = require('multer')
    const upload = muler({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}