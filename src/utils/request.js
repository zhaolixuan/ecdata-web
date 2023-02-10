/**
 * 请求模块
 */
import axios from 'axios'
// import router from '@/router/'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_PERFIX,
  timeout: 15000,
  withCredentials: true
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const reg = RegExp(/\/user\//)
  if (config.url.match(reg)) {
    config.baseURL = process.env.VUE_APP_API_USER
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // removePending(response.config)
  return response
}, error => {
  return Promise.resolve(error)
})

// 如果登录失效，就跳转到登录页
// function redirectLogin () {
//   router.replace({
//     name: 'login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
// }

// 导出
export default request
