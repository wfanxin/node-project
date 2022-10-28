module.exports = app => {
    const mongoose = require('mongoose')
    const {user, pwd, port} = require('../.env.local')

    mongoose.connect(`mongodb://${user}:${pwd}@47.97.220.112:${port}/node-vue-moba?authSource=admin`, {
        useNewUrlParser: true, // 避免 当前URL字符串解析器已弃用 警告
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log('数据库连接失败')
        console.log(err)
    })
}