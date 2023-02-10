<!-- 渠道分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
      </template>
    </j-tabs>
    <j-module :title="`${activeArea}各电商渠道网络零售额占比分析`">
      <j-proportion :active="tabs.active" :boxData="boxData" ref="proportionMethod"></j-proportion>
    </j-module>
    <j-topTen v-for="(item, i) in topShop" :key="i"  :title="item" :boxData="boxData" :activeArea="tabs.active" ref="topTenMethod"></j-topTen>
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JProportion from './components/proportion'
import JTopTen from './components/topTen'
import JTabs from '@/components/function/tabs/tabs'
import checkForm from '@/components/function/checkForm/check-form'
import { getCYGDSQDWLLSEZBFXI } from './api'
export default {
  components: {
    JModule,
    JProportion,
    JTopTen,
    JTabs,
    checkForm
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
      topShop: []
    }
  },
  // watch: {
  //   'tabs.active' (n) {
  //     this.getCYGDSQDWLLSEZBFXIData()
  //   }
  // },
  mounted () {
    this.clickConfirm(this.boxData)
  },
  methods: {
    handleActive (val) {
      this.tabs.active = val
      this.tabs.tabList.forEach(ele => {
        if(val === ele.name) {
          this.activeArea = ele.label
        }
      })
      this.getCYGDSQDWLLSEZBFXIData()
    },
    clickConfirm (val) {
      this.getCYGDSQDWLLSEZBFXIData()
      this.$refs.proportionMethod.onConfirm(val)
      this.$refs.topTenMethod.forEach(item => {
        item.onConfirm(val)
      })
    },
    getCYGDSQDWLLSEZBFXIData () {
      const data = {
        params: {
          dataType: this.tabs.active,
          start: this.boxData.timeData.time.startTime
        }
      }
      getCYGDSQDWLLSEZBFXI(data).then(res => {
        if (res.data.success) {
          this.topShop = []
          res.data.data.forEach((item, i) => {
            this.topShop.push(item.name)
          })
        }
      })
    }
  }
}
</script>

<style></style>
