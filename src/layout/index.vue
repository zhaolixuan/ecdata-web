<template>
  <div class="app-wrp">
    <el-container class="layout-container">
      <el-header class="un-header-wrp">
        <page-header @onCollapse="isCollapse = $event"></page-header>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-scrollbar style="height:100%" class="menu-scrollbar">
            <nav-menu :default-active="defaultActiveIndex" :collapse="isCollapse" active-text-color="#2C46FF" background-color="#fff" text-color="#201E2C" @select="selectHanld">
              <nav-sumenu :navs="menu"></nav-sumenu>
            </nav-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import pageHeader from './components/header.vue'
import navMenu from './components/nav-menu.vue'
import NavSumenu from './components/nav-sumenu'
import { navs } from '@/utils/routeNav'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      navs: navs
    }
  },
  components: {
    pageHeader,
    navMenu,
    NavSumenu
  },
  computed: {
    defaultActiveIndex () {
      const { menuIndex } = this.$route.meta
      return menuIndex
    },
    ...mapGetters(['menu'])
  },
  methods: {
    selectHanld (index) {
      const path = this.getIndexByPath(navs, index) || '/'
      this.$router.push({ path: path })
    },
    getIndexByPath (chils, index) {
      for (let i = 0; i < chils.length; ++i) {
        const item = chils[i]
        if (item.children) {
          const path = this.getIndexByPath(item.children, index)
          if (path) return path
        } else {
          if (index === item.index) {
            return item.path
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.app-wrp {
  width: 100%;
  height: 100%;
  color: #2c3e50;
  overflow: hidden;
}
.layout-container {
  height: 100%;
  .un-header-wrp {
    height: 68px !important;
  }
  // .el-aside {
  //   height: 100%;
  //   .menu-scrollbar {
  //     -webkit-overflow-scrolling: touch;
  //   }
  // }
}
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: rgba(75, 102, 253, 0.1) !important;
}
.el-container {
  overflow: hidden;
  .main {
    padding: 30px;
    background: #f6f7fb;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
    min-height: 20px;
  }
}
</style>
