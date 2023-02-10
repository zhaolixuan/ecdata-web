<template>
<!-- 品牌交易规模分析 -->
<div class="tranding-container">
  <j-tabs :tabs="tabs" @active="active">
    </j-tabs>
    <analysis :activeName="componentName"></analysis>
</div>
</template>
<script>
import JTabs from '@/components/function/tabs/tabs'
import analysis from './analysis/analysis'
export default {
  components: {
    JTabs,
    analysis
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
      },
      activeName: 'HMJJ'
    }
  },
  mounted () {

  },
  methods: {
    active (val) {
      this.activeName = val
    }
  },
  computed: {
    componentName () {
      return this.tabs.active
    }
  }
}
</script>
