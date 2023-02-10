<template>
<!-- 品牌区域分析 -->
<div class="region-container">
  <j-tabs :tabs="tabs"></j-tabs>
  <mahogany :productType="componentName"></mahogany>
</div>
</template>
<script>
import JTabs from '@/components/function/tabs/tabs'
import mahogany from './mahogany/mahogany'
export default {
  components: {
    JTabs,
    mahogany
  },
  data () {
    return {
      tabs: {
        active: 'HMJJ',
        tabList: [{
          label: '家具',
          name: 'HMJJ'
        }, {
          label: '服饰',
          name: 'GYP'
        }, {
          label: '家电',
          name: 'YH'
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
