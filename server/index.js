const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors()) // 解决CORS跨域
app.use(express.json()) // 调用 express.json() 解析带有 JSON 的传入请求
app.use('/uploads', express.static(__dirname + '/uploads')) // uploads里面的图片可以用/uploads来访问

require('./plugins/mongodb')(app) // 连接mongodb数据库
require('./routes/admin')(app) // admin接口服务
require('./routes/web')(app) // web接口服务

// 启动服务
app.listen(3000, () => {
    console.log('http://localhost:3000')
})