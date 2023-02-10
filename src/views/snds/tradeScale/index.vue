<!-- 行业交易规模分析 -->
<template>
  <div>
    <j-module>
      <check-form :boxData="boxData" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module title="行业交易规模分析">
      <j-precent :boxData="boxData" ref="tradeMethod"></j-precent>
    </j-module>
    <j-module title=" ">
      <trade-table :boxData="boxData" ref="tradeTableMethod"></trade-table>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import checkForm from '@/components/function/checkForm/check-form'
import JPrecent from './components/precentRise'
import tradeTable from './components/tradeTable'
export default {
  data () {
    return {
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startTime: '',
            startMonthTime: '',
            endMonthTime: '',
            endTime: '',
            startPlaceholder: '请选择日期'
          }
        }
      }
    }
  },
  methods: {
    clickConfirm (val) {
      this.$refs.tradeMethod.onConfirm(val)
      this.$refs.tradeTableMethod.onConfirm(val)
    }
  },
  components: {
    JModule,
    checkForm,
    JPrecent,
    tradeTable
  }
}
</script>
<style lang="less" scoped>

</style>
