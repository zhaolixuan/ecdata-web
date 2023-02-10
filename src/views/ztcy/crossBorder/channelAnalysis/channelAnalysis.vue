<!-- 市场规模 -->
<template>
  <div class="market-size-container">
    <j-module title="全国整体进口商品交易平台分析" class="mt14">
      <check-form :boxData="boxData" @clickConfirm="init"></check-form>
    </j-module>
    <j-module class="mt14">
      <j-card>
        <p class="j-chart-title">跨境进口交易平台当月（累计）网络零售额</p><!-- 柱状+折现图 {{boxData.sourceData.model}} -->
        <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
// import titleName from '@/components/function/title/title'
import checkForm from '@/components/function/checkForm/check-form'
import { getNationProductChannelChartData, getNationProductChannelDataByPage } from '../api/api'
export default {
  data () {
    return {
      boxData: {
        sourceData: [{
          title: '指标',
          model: '当月网络零售额',
          list: [{
            value: '当月网络零售额',
            label: '当月网络零售额'
          }, {
            value: '累计网络零售额',
            label: '累计网络零售额'
          }]
        }],
        timeData: {
          title: '时间',
          model: '近1个月',
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '',
            startTime: '',
            endTime: '',
            startPlaceholder: '请选择日期'
          },
          list: [{
            value: '近1个月'
          }, {
            value: '月度'
          }]
        }
      },
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      lineBarOptions: {
        chartData: {
          columns: ['name', 'value', 'pro'],
          rows: []
        },
        chartSettings: {
          labelMap: {
            name: '渠道',
            value: '零售额(万元)',
            pro: '占比(%)'
          },
          showLine: ['pro'],
          axisSite: { right: ['pro'] },
          yAxisName: ['万元', '%']
        },
        extend: {
          'xAxis.0.axisLabel.rotate': 45,
          'yAxis.1.interval': 20,
          'yAxis.1.min': 0,
          'yAxis.1.max': 100,
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 100,
              height: 11
            }
          ],
          legend: {
            icon: 'circle',
            left: 0
          },
          series: {
            barWidth: 16,
            showBackground: true,
            backgroundStyle: {
              color: '#EDF0FD',
              barBorderRadius: [10, 10, 0, 0]
            },
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        }
      },
      columnData: [
        { name: '渠道', key: 'name' },
        { name: '零售额（万元）', key: 'value' },
        { name: '占比（%）', key: 'pro' }
      ],
      tableStyle: {
        isShowSort: false
      },
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 10
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getData()
      this.getTableData()
    },
    getData () {
      let time = ''
      if (this.boxData.timeData.model === '近1个月') {
        time = this.boxData.timeData.time.endTime
      } else {
        time = this.boxData.timeData.time.startTime
      }
      const data = {
        params: {
          type: this.boxData.sourceData[0].model,
          start: time,
          end: '',
          code: 300000
        }
      }
      getNationProductChannelChartData(data).then(res => {
        const resData = res.data.data
        const max = Math.max.apply(Math, resData.map(o => { return o.value }))
        const min = Math.min.apply(Math, resData.map(o => { return o.value }))
        this.lineBarOptions.extend['yAxis.0.min'] = min
        this.lineBarOptions.extend['yAxis.0.max'] = max
        this.lineBarOptions.extend['yAxis.0.interval'] = (max - min) / 5
        this.lineBarOptions.chartData.rows = resData
      })
    },
    getTableData () {
      let time = ''
      if (this.boxData.timeData.model === '近1个月') {
        time = this.boxData.timeData.time.endTime
      } else {
        time = this.boxData.timeData.time.startTime
      }
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.boxData.sourceData[0].model,
          start: time,
          end: '',
          code: 300000
        }
      }
      getNationProductChannelDataByPage(data).then(res => {
        const resData = res.data.data
        this.tableData = resData.records || []
        this.pageParams.total = Number(resData.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getTableData()
    }
  },
  components: {
    JModule,
    JCard,
    // titleName,
    checkForm,
    JTable
  }
}
</script>
<style lang="less" scoped>
.mt14 {
  margin-top: 14px;
}
</style>
