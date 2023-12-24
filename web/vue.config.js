const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: __dirname + '/../server/web', // build 生成后的输出目录
})
