<!-- 导航 -->
<template>
  <el-menu class="el-menu-vertical un-menu-vertical" v-bind="$attrs" v-on="$listeners" unique-opened>
    <slot></slot>
  </el-menu>
</template>

<script>
export default {
  name: 'MenuTree',
  inheritAttrs: false,
  data () {
    return {}
  },
  components: {},

  computed: {},

  mounted () { },

  methods: {}
}
</script>
<style scoped lang='less'>
.un-menu-vertical:not(.el-menu--collapse) {
  width: 271px;
  padding-right: 15px;
  box-sizing: border-box;
}
// // 菜单导航的宽度
// .el-menu--collapse {
//   width: 0;
// }
.un-menu-vertical {
  width: 0px;
  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    font-size: 16px;
  }
}
</style>
