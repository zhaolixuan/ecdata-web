<template>
  <div>
    <template v-for="(nav,index) in navs">
      <el-menu-item v-if="!nav.children" :index="nav.index" :key="index">
        <!-- <i class="el-icon-menu" v-if="nav.icon"></i> -->
        <img class="j-location" :src="require(`./img/${nav.icon}.svg`)" alt="" v-if="nav.icon">
        <span slot="title">{{nav.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="nav.index" :key="index">
        <template slot="title">
          <img class="j-location" :src="require(`./img/${nav.icon}.svg`)" alt="" v-if="nav.icon">
          <span slot="title">{{nav.title}}</span>
        </template>
        <nav-sumenu :navs="nav.children"></nav-sumenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavSumenu',
  props: {
    navs: {
      required: true
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () { },

  methods: {}
}

</script>
<style lang='less'>
.el-menu--collapse .el-submenu__title span {
  display: none;
}
.el-menu-item.is-active {
  border-left: 3px solid #2C46FF;
}
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.j-location {
  width: 18px;
  height: auto;
  margin-right: 10px;
}
</style>
