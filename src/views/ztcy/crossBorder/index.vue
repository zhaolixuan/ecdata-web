<template>
  <div class="cross-border-container">
    <j-tabs :tabs="tabs"></j-tabs>
    <component :is="componentName"></component>
  </div>
</template>
<script>
import JTabs from '@/components/function/tabs/tabs'
import market from './marketSize/marketSize'
import industry from './industryAnalysis/industryAnalysis'
import channel from './channelAnalysis/channelAnalysis'
export default {
  components: {
    JTabs,
    market,
    industry,
    channel
  },
  data () {
    return {
      activeArea: '全国地区',
      areaData: [{
        id: 1,
        name: '全国地区'
      }],
      tabs: {
        active: 'market',
        tabList: [{
          label: '市场规模',
          name: 'market'
        }, {
          label: '行业分析',
          name: 'industry'
        }, {
          label: '渠道分析',
          name: 'channel'
        }]
      }
    }
  },
  computed: {
    componentName () {
      return this.tabs.active
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
  margin-left: 10px;
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
