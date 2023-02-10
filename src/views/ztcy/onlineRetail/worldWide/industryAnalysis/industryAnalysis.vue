<!-- 市场规模 -->
<template>
  <div class="market-size-container">
    <j-module title="全国整体商品类型分析">
        <check-form :boxData="boxData1" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
      <j-foreign :boxData="boxData1" ref="wholeMethod"></j-foreign>
    </j-module>
     <j-module title="全国实物类商品大类分析">
        <check-form :boxData="boxData2" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
      <j-matter :boxData="boxData2" ref="matterMethod"></j-matter>
    </j-module>
    <j-module title="全国非实物类商品大类分析">
        <check-form :boxData="boxData3" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
      <j-nonmatter :boxData="boxData3" ref="nonMatterMethod"></j-nonmatter>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import titleName from '@/components/function/title/title'
import checkForm from '@/components/function/checkForm/check-form'
import jMatter from './components/matterSales'
import jNonmatter from './components/nonmatterSales'
import jForeign from './components/foreignSales'
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
          }]
        }],
        timeData: {
          title: '时间',
          model: '近12个月',
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '',
            startTime: '',
            endTime: '',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          },
          list: [{
            value: '近12个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }]
        }
      },
      boxData2: {
        id: 2,
        sourceData: [{
          title: '指标',
          model: '当月网络零售额',
          list: [{
            value: '当期网络零售额',
            label: '当月网络零售额'
          }, {
            value: '累计网络零售额',
            label: '累计网络零售额'
          }]
        }, {
          title: '行业类别',
          model: 'INDUSTRY',
          list: [{
            value: '实物一级行业',
            label: 'INDUSTRY'
          }, {
            value: '实物二级行业',
            label: 'SINDUSTRY'
          }, {
            value: '实物三级行业',
            label: 'TINDUSTRY'
          }]
        }],
        timeData: {
          title: '时间',
          model: '近1个月',
          list: [{
            value: '近1个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }],
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '请选择日期'
          }
        }
      },
      boxData3: {
        id: 3,
        sourceData: [{
          title: '指标',
          model: '当月网络零售额',
          list: [{
            value: '当期网络零售额',
            label: '当月网络零售额'
          }, {
            value: '累计网络零售额',
            label: '累计网络零售额'
          }]
        }],
        timeData: {
          title: '时间',
          model: '近1个月',
          list: [{
            value: '近1个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }],
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '请选择日期'
          }
        }
      }
    }
  },
  methods: {
    clickConfirm (val) {
      console.log(val)
      if (val.id === 1) {
        this.$refs.wholeMethod.onConfirm(val)
      } else if (val.id === 2) {
        this.$refs.matterMethod.onConfirm(val)
      } else {
        this.$refs.nonMatterMethod.onConfirm(val)
      }
    }
  },
  components: {
    JModule,
    titleName,
    checkForm,
    jMatter,
    jNonmatter,
    jForeign
  }
}
</script>
<style lang="less" scoped>
</style>
