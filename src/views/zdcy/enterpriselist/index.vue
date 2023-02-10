<!-- TOP单品分析 -->
<template>
  <j-module title="木材行业优秀企业名单">
    <j-tablepage style="margin-bottom:20px;"></j-tablepage>
  </j-module>
</template>

<script>
// import JTabs from '@/components/function/tabs/tabs'
import JModule from '@/components/layout/jModule/j-module'
import JTablepage from './components/tablepage'
export default {
  components: {
    JTablepage,
    JModule
  },
  data () {
    return {
      //   activeArea: '京东商城',
      //   areaData: [{
      //     id: '京东商城',
      //     name: '京东平台热销品分析'
      //   }, {
      //     id: '天猫商城',
      //     name: '天猫平台热销品分析'
      //   }, {
      //     id: '苏宁易购',
      //     name: '苏宁平台热销品分析'
      //   }],
      //   tabs: {
      //     active: 'market',
      //     tabList: [{
      //       label: '市场规模',
      //       name: 'market'
      //     }, {
      //       label: '行业分析',
      //       name: 'industry'
      //     }, {
      //       label: '渠道分析',
      //       name: 'channel'
      //     }]
      //   }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs-content {
  padding: 30px 0;
  box-sizing: border-box;
}
.tabs-area {
  display: inline-block;
  margin-right: 10px;
  padding: 0 10px;
  min-width: 68px;
  height: 32px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  color: #bbbfd0;
  border: 1px solid #d1d4e5;
  border-radius: 16px;
  &.active {
    background: rgba(75, 102, 254, 0.1);
    border-radius: 16px;
    color: #4b66fe;
    border-width: 0px;
  }
}
</style>
