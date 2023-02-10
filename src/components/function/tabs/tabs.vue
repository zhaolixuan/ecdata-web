<template>
  <div class="tabs-container">
    <el-tabs v-model="tabs.active" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabs.tabList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <slot name="main"></slot>
  </div>
</template>

<script>
export default {
  props: ["tabs"],
  data() {
    return {};
  },

  methods: {
    handleClick(tab, event) {
      this.$emit("handleActive", this.tabs.active);
    },
  },
};
</script>

<style lang="less" scoped>
.tabs-container {
  // background: #fff;
  // box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  // border-radius: 10px;
  /deep/ .el-tabs {
    .el-tabs__header {
      margin: 0;
      .el-tabs__active-bar {
        height: 4px;
        background: #4b66fe;
      }
      .el-tabs__item {
        height: initial;
        line-height: initial;
        font-size: 16px;
        color: #6e728d;
        margin: 16px 0;
        padding: 0 19px;
      }
      .el-tabs__item.is-active {
        color: #4b66fe;
      }
      .el-tabs__nav-wrap::after {
        background: #d1d4e5;
        height: 1px;
      }
    }
  }
}
</style>
