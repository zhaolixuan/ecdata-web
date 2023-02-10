<!-- TOP单品分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <!-- <template #main>
        <div class="tabs-content">
          <span class="tabs-area" :class="{'active':activeArea===item.id}" @click="activeArea = item.id" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
        </div>
      </template> -->
    </j-tabs>
    <j-tablepage style="margin-bottom:20px;"  :active="tabs.active"></j-tablepage>
    <!-- <j-tablepage style="margin-bottom:20px;"></j-tablepage>
    <j-tablepage style="margin-bottom:20px;"></j-tablepage> -->
  </div>
</template>

<script>
import JTabs from '@/components/function/tabs/tabs'
import JTablepage from './components/tablepage'
export default {
  components: {
    JTabs,
    JTablepage
  },
  data () {
    return {
      // activeArea: '京东商城',
      areaData: [{
        id: '京东商城',
        name: '京东平台热销品分析'
      }, {
        id: '天猫商城',
        name: '天猫平台热销品分析'
      }, {
        id: '苏宁易购',
        name: '苏宁平台热销品分析'
      }],
      tabs: {
        active: 'TOP_DANPIN_HMJJ',
        tabList: [{
          label: '家具',
          name: 'TOP_DANPIN_HMJJ'
        }, {
          label: '服饰',
          name: 'TOP_DANPIN_GYP'
        }, {
          label: '家电',
          name: 'TOP_DANPIN_YH'
        }]
      }
    }
  },
  computed: {
    componentName () {
      return this.tabs.active
    }
  },
  methods: {
    handleActive (val) {
      this.tabs.active = val
    }
  }

}
</script>

<style lang="less" scoped>
.tabs-content {
  padding: 30px 0;
  box-sizing: border-box;
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
}
</style>
