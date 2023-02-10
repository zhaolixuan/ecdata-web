<!-- 农资和农产品概况 -->
<template>
  <div>
    <j-module>
      <check-form :boxData="boxData" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module title="农资和农产品概况">
        <card-list :boxData="boxData" ref="cardMethod"></card-list>
    </j-module>
    <j-module>
      <j-precent :boxData="boxData" ref="farmMethod"></j-precent>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import checkForm from '@/components/function/checkForm/check-form'
import cardList from './components/card'
import JPrecent from './components/precentRise'
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
      console.log(val)
      this.$refs.cardMethod.onConfirm(val)
      this.$refs.farmMethod.onConfirm(val)
    }
  },
  components: {
    JModule,
    checkForm,
    cardList,
    JPrecent
  }
}
</script>
<style lang="less" scoped>

</style>
