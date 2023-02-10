import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { routes } from '@/utils/routeNav'
import { logOut } from '@/utils/domain.js'
import { getCookie } from '@/utils/storage.js'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.afterEach((to, from, next) => {
  if (document.getElementsByClassName('el-main')[0]) {
    document.getElementsByClassName('el-main')[0].scrollTop = 0
  }
})
// 登录模块的提取
router.beforeEach(async (to, from, next) => {
  const gunsToken = getCookie('gunsToken')
  if (gunsToken) {
    const roleid = await store.dispatch('getUserInfo')
    const flag = store.dispatch('getMenuData', roleid)
    if (!flag) {
      logOut()
      return
    }
    next()
  } else {
    logOut()
  }
  // next()
})
export default router
