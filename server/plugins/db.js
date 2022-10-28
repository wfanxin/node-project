module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true // 避免 当前URL字符串解析器已弃用 警告
    })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))
}