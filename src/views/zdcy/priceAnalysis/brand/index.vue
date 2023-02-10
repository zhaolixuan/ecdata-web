
<template>
<!-- 价格区间品牌分析 -->
<div class="brand-container">
  <j-tabs :tabs="tabs">
      <!-- <template #main>
        <div class="tabs-content">
          <span class="tabs-area" :class="{'active':activeArea===item.name}" @click="activeArea = item.name" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
        </div>
      </template> -->
    </j-tabs>
    <!-- <component :is="componentName"></component> -->
    <mahogany></mahogany>
</div>
</template>
<script>
import JTabs from '@/components/function/tabs/tabs'
import mahogany from './mahogany/mahogany'
// import industry from './industryAnalysis/industryAnalysis'
// import channel from './channelAnalysis/channelAnalysis'
export default {
  components: {
    JTabs,
    mahogany
    // industry,
    // channel
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
          label: '家具',
          name: 'market'
        }, {
          label: '服饰',
          name: 'industry'
        }, {
          label: '家电',
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
