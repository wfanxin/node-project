const mongoose = require('mongoose')

// 分类模型
const schema = new mongoose.Schema({
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} // ref 指定关联的模型
})

module.exports = mongoose.model('Category', schema)