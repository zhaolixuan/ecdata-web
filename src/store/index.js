import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, getMenuData } from '@/views/util/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    menu: null
  },
  mutations: {
    'SET_USER' (state, val) {
      state.user = val
    },
    'SET_MENU' (state, val) {
      state.menu = val
    }
  },
  getters: {
    user: state => state.user,
    menu: state => state.menu
  },
  actions: {
    async getUserInfo ({ commit, state }) {
      if (!state.user) {
        const res = await getUserInfo()
        const data = res.data
        if (data.code === 200) {
          commit('SET_USER', data.data)
          return data.data.roleid
        }
      }
    },
    async getMenuData ({ commit, state }, id) {
      if (!state.menu) {
        const res = await getMenuData({ params: { roleId: id } })
        const data = res.data
        if (data.code === 200 && data.data) {
          const list = transformTree(data.data)
          commit('SET_MENU', list)
          return true
        } else {
          return false
        }
      }
    }
  },
  modules: {
  }
})

function transformTree (list) {
  const tree = []
  list.forEach((item) => {
    if (item.pId === '0') {
      const temp = queryChildren(item, list)
      tree.push(temp)
    }
  })
  return tree
}

function queryChildren (parent, list) {
  const children = []
  list.forEach((item) => {
    if (item.pId === parent.id) {
      const temp = queryChildren(item, list)
      children.push(temp)
    }
  })
  if (children.length) {
    parent.children = children
  }
  return parent
}

