<template>
  <div class="market-size-container">
    <j-module title="全国整体跨境进口网络零售额分析" class="mt14">
      <check-form :boxData="boxData" @clickConfirm="init"></check-form>
    </j-module>
    <j-module>
      <el-row :gutter="20" type="flex" class="mix-height mt14">
        <el-col :span="16" class="height">
          <j-card>
            <p class="j-chart-title">跨境进口{{boxData.sourceData[0].model}}变化趋势</p><!-- 柱状+折现图 -->
            <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
          </j-card>
        </el-col>
        <el-col :span="8" class="height">
          <j-card>
            <p class="j-chart-title mb20">跨境进口{{boxData.sourceData[0].model}}变化趋势</p>
            <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
          </j-card>
        </el-col>
      </el-row>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import checkForm from '@/components/function/checkForm/check-form'
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getWorldSaleData, getWorldSaleTableData } from '../api/api'
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
          model: '近12个月',
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '',
            endMonthTime: '',
            startTime: '',
            endTime: '',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          },
          list: [{
            value: '近12个月'
          }, {
            value: '月度'
          }]
        }
      },
      lineBarOptions: {
        chartData: {
          columns: ['date', 'value', 'yoy'],
          rows: []
        },
        chartSettings: {
          labelMap: {
            date: '日期',
            value: '网络零售额(万元)',
            yoy: '同比(%)'
          },
          showLine: ['yoy'],
          axisSite: { right: ['yoy'] },
          yAxisName: ['万元', '%']
        },
        extend: {
          'yAxis.1.splitNumber': 5,
          'yAxis.0.splitNumber': 5,
          dataZoom: [
            {
              show: true,
              start: 1,
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
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      columnData: [
        { name: '时间', key: 'date' },
        { name: '零售额（万元）', key: 'value' },
        { name: '同比（%）', key: 'yoy' }
      ],
      tableStyle: {
        isShowSort: false
      },
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 6
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
      const data = {
        params: {
          type: this.boxData.sourceData[0].model,
          start: this.boxData.timeData.time.startTime,
          end: this.boxData.timeData.time.endTime,
          code: 300000
        }
      }
      getWorldSaleData(data).then(res => {
        const resData = res.data.data
        // 零售额Y设置
        const max = Math.max.apply(Math, resData.map(o => { return o.value }))
        const min = Math.min.apply(Math, resData.map(o => { return o.value }))
        this.lineBarOptions.extend['yAxis.0.min'] = min
        this.lineBarOptions.extend['yAxis.0.max'] = max
        this.lineBarOptions.extend['yAxis.0.interval'] = (max - min) / 5

        // 同比Y设置
        const max1 = Math.max.apply(Math, resData.map(o => { return o.yoy }))
        const min1 = Math.min.apply(Math, resData.map(o => { return o.yoy }))
        this.lineBarOptions.extend['yAxis.1.min'] = min1
        this.lineBarOptions.extend['yAxis.1.max'] = max1
        this.lineBarOptions.extend['yAxis.1.interval'] = (max1 - min1) / 5

        //
        this.lineBarOptions.chartData.rows = resData
      })
    },
    getTableData () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.boxData.sourceData[0].model,
          start: this.boxData.timeData.time.startTime,
          end: this.boxData.timeData.time.endTime,
          code: 300000
        }
      }
      getWorldSaleTableData(data).then(res => {
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
    checkForm,
    JCard,
    JTable
  }
}
</script>
<style lang="less" scoped>
.mt14 {
  margin-top: 14px;
}
.bg {
  background: #f6f7fb;
}
</style>
