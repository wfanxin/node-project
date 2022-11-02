const mongoose = require('mongoose')

// 文章模型
const schema = new mongoose.Schema({
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}] // 一篇文章可以对应多个分类
})

module.exports = mongoose.model('Article', schema)