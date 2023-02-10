<!-- 消费者偏好分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
      </template>
    </j-tabs>
    <j-styleanalysis :active="tabs.active" :boxData="boxData" ref="styleanalysisMethod"></j-styleanalysis>
  </div>
</template>

<script>
// import JModule from '@/components/layout/jModule/j-module'
import JTabs from '@/components/function/tabs/tabs'
import checkForm from '@/components/function/checkForm/check-form'
import JStyleanalysis from './components/styleanalysis'
export default {
  components: {
    // JModule,
    JTabs,
    checkForm,
    JStyleanalysis
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
            endPlaceholder: ''
          }
        }
      }
    }
  },
  methods: {
    handleActive (val) {
      this.tabs.active = val
    },
    clickConfirm (val) {
      this.$refs.styleanalysisMethod.onConfirm(val)
    }
  }
}
</script>

<style>
</style>
