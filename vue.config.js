/*
 * @Author: your name
 * @Date: 2020-11-27 14:41:27
 * @LastEditTime: 2020-12-03 12:10:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ecdata-web\vue.config.js
 */
const path = require('path')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL + '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      const optimization = {
        runtimeChunk: 'single'
      }
      Object.assign(config, {
        optimization
      })
    } else {
      config.mode = 'development'
    }
    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages')
        }
      },
      externals: {
        'echarts': 'echarts',
        'echarts-wordcloud': 'echartsWordcloud',
        'v-charts': 'VeIndex'
      }
    })
  },
  chainWebpack: config => {
    config.optimization.minimize(true)
    config.resolve.symlinks(true)
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },
  css: {
    extract: true,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    requireModuleExtension: true
  },
  // 环境配置
  devServer: {
    host: 'dev.jdcloud.com',
    port: 8080,
    https: false,
    hotOnly: false,
    open: false,
    proxy: {
      '/xianyou-super-api': {
        target: 'http://cywx.jdcloud.com/foshan/',
        // target: 'http://xianyou.jdcloud.com:8081/',
        changeOrigin: true,
        headers: {
          // Origin: 'http://cywx.jdcloud.com/'
          // Origin: 'http://xianyou.jdcloud.com:8081/'
        },
        pathRewrite: { '^/xianyou-super-api': 'api' }
      },
      '/xianyou-user-api': {
        target: 'http://cywx.jdcloud.com/foshan/',
        // target: 'http://xianyou.jdcloud.com:8090/',
        changeOrigin: true,
        headers: {
          // Origin: 'http://cywx.jdcloud.com/'
          // Origin: 'http://xianyou.jdcloud.com:8090/'
        },
        pathRewrite: { '^/xianyou-user-api': 'userapi' }
      }
    }
  },
  pluginOptions: {// 第三方插件配置
  }
}
