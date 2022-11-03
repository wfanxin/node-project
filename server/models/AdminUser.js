const mongoose = require('mongoose')

// 用户模型
const schema = new mongoose.Schema({
    username: {type: String},
    password: {
        type: String,
        select: false,
        set(val) { // 原值处理一下
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)