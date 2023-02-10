<!-- 市场规模 -->
<template>
  <div class="market-size-container">
    <j-module title="全国整体零售市场分析">
      <check-form :boxData="boxData1" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
     <j-current :boxData="boxData1" ref="currentMethod"></j-current>
    </j-module>
    <j-module title="经济区域零售市场分析">
      <check-form :boxData="boxData2" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售量" icon="wllsl"></title-name>
      </template>
     <j-area :boxData="boxData2" ref="areaMethod"></j-area>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import titleName from '@/components/function/title/title'
import checkForm from '@/components/function/checkForm/check-form'
import jCurrent from './components/currentSales'
import jArea from './components/areaPrecent'
export default {
  data () {
    return {
      boxData1: {
        id: 1,
        sourceData: [{
          title: '指标',
          model: '当月网络零售额',
          list: [{
            value: '当期网络零售额',
            label: '当月网络零售额'
          }, {
            value: '累计网络零售额',
            label: '累计网络零售额'
          }, {
            value: '当期网络零售量',
            label: '当月网络零售量'
          }, {
            value: '累计网络零售量',
            label: '累计网络零售量'
          }, {
            value: '店铺数',
            label: '当月店铺数'
          }, {
            value: '从业人数',
            label: '从业人数'
          }]
        }],
        timeData: {
          title: '时间',
          model: '近12个月',
          list: [{
            value: '近12个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }],
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '', // 月度结束时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          }
        }
      },
      boxData2: {
        id: 2,
        sourceData: [{
          title: '地区类型',
          model: 'WX_STANDARD_WLLS_FOURAREA',
          list: [{
            value: '四大经济区域',
            label: 'WX_STANDARD_WLLS_FOURAREA'
          }, {
            value: '六大经济区域',
            label: 'WX_STANDARD_WLLS_SIXAREA'
          }, {
            value: '城市级别',
            label: 'WX_STANDARD_WLLS_CITYLEVEL'
          }, {
            value: '经济带',
            label: 'WX_STANDARD_WLLS_ZONE'
          }]
        }, {
          title: '指标',
          model: '当月网络零售额',
          list: [{
            value: '当期网络零售额',
            label: '当月网络零售额'
          }, {
            value: '累计网络零售额',
            label: '累计网络零售额'
          }, {
            value: '当期网络零售量',
            label: '当月网络零售量'
          }, {
            value: '累计网络零售量',
            label: '累计网络零售量'
          }, {
            value: '店铺数',
            label: '当月店铺数'
          }, {
            value: '从业人数',
            label: '从业人数'
          }]
        }],
        timeData: {
          title: '时间',
          model: '近12个月',
          list: [{
            value: '近12个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }],
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '', // 月度结束时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          }
        }
      }
    }
  },
  methods: {
    clickConfirm (val) {
      if (val.id === 1) {
        this.$refs.currentMethod.onConfirm(val)
      } else if (val.id === 2) {
        this.$refs.areaMethod.onConfirm(val)
      }
    }
  },
  components: {
    JModule,
    titleName,
    checkForm,
    jCurrent,
    jArea
  }
}
</script>
<style lang="less" scoped>
</style>
