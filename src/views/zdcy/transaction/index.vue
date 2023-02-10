<!-- 品类交易分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
      </template>
    </j-tabs>
    <j-module :title="`${titleType}细分品类交易规模分析`">
      <j-proportion :title="titleType" :active="tabs.active" :boxData="boxData" ref="proportionMethod"></j-proportion>
    </j-module>
    <j-module>
      <j-topTen :title="titleType" :active="tabs.active" :boxData="boxData" ref="topTenMethod"></j-topTen>
    </j-module>
    <!-- <j-module :title="`${titleType}行业不同工艺的价格分析`">
      <j-network :active="tabs.active" :boxData="boxData" ref="networkMethod"></j-network>
    </j-module> -->
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JTabs from '@/components/function/tabs/tabs'
import checkForm from '@/components/function/checkForm/check-form'
import JProportion from './components/proportion'
import JNetwork from './components/network'
import JTopTen from './components/tableType'
export default {
  components: {
    JModule,
    JTabs,
    checkForm,
    JProportion,
    JTopTen,
    JNetwork
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
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '', // 月度结束时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '请选择日期',
            endPlaceholder: '结束日期'
          }
        }
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
  methods: {
    handleActive (val) {
      this.tabs.active = val
    },
    clickConfirm (val) {
      this.$refs.proportionMethod.onConfirm(val)
      this.$refs.topTenMethod.onConfirm(val)
      this.$refs.networkMethod.onConfirm(val)
    }
  }
}
</script>

<style>
</style>
