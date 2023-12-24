const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: __dirname + '/../server/admin', // build 生成后的输出目录
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/', // build的时候环境变量值会变成production
})
