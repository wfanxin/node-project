// 资源模型中间件
module.exports = option => {
    return async (req, res, next) => {
        const inflection = require('inflection') // 复数单词转驼峰
        const modelName = inflection.classify(req.params.resource) // 复数单词转驼峰
        req.Model = require(`../models/${modelName}`) // 加载对应的模型

        next()
    }
}