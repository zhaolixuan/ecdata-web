<!-- 词云分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs"></j-tabs>
    <j-module :title="`${titleType}用户搜索价热词`">
      <j-card>
        <j-wordcloud :active="tabs.active"></j-wordcloud>
      </j-card>
    </j-module>
    <j-module style="margin-top:20px;">
      <j-hotwords :active="tabs.active" :title="titleType"></j-hotwords>
    </j-module>
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JTabs from '@/components/function/tabs/tabs'
import JCard from '@c/layout/jCard/j-card'
import JWordcloud from './components/wordcloud'
import JHotwords from './components/hotwords'
export default {
  components: {
    JModule,
    JTabs,
    JCard,
    JWordcloud,
    JHotwords
  },
  data () {
    return {
      activeArea: '家具',
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
      titleType: '家具'
    }
  },
  watch: {
    'tabs.active' (n) {
      if(n === 'HMJJ') {
        this.titleType = '家具'
      } else if(n === 'GYP'){
        this.titleType = '服饰'
      } else if(n === 'YH') {
        this.titleType = '家电'
      }
    }
  },
}
</script>
