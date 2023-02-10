import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import 'amfe-flexible'
import '../styles/index.less'
import './utils/chart.resize.js'

import ElTableBar from 'el-table-bar-base';
import 'el-table-bar-base/lib/ElTableBar.css';
Vue.use(ElTableBar)

import Plugin  from 'v-fit-columns';
Vue.use(Plugin );

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// let modules = process.env.MODULES.split(',')
// console.log(modules)
// modules.map(item => {
//   try {
//     let config = require('@/views/' + item + '/config.js')
//     if (config.default.routers) {
//       router.addRoutes(config.default.routers)
//     }
//     if (config.default.store) {
//       store.registerModule(config.default.name || item, config.default.store)
//     }
//   } catch (e) {
//     console.error('upload modules routers error in main.js : ' + e)
//   }
// })
// router.addRoutes([{
//   path: '*',
//   component: NotFoundPage
// }])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
