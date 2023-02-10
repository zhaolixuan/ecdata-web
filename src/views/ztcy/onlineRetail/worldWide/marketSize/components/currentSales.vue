<!-- 网络零售月度走势情况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{titleData}}变化趋势</p>
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :yAxis="lineBarOptions.extend.yAxis" :colors="colors"></ve-histogram>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">跨境进口{{titleData}}变化趋势</p>
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentData, getCurrentTable } from '../api/api.js'
import JTable from '@c/function/table'
import JCard from '@c/layout/jCard/j-card'
import { xAxis, yAxis, dataZoom } from '@/assets/js/echartsConfig'
export default {
  props: ['boxData'],
  data () {
    return {
      newData: this.boxData,
      titleData: '',
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      /* eslint-disable */
      lineBarOptions: {
        extend: {
          xAxis,
          yAxis: [{
            ...yAxis,
            name: ''
          }, {
            ...yAxis,
            name: '%'
          }],
          dataZoom: {
            show: true,
            start: 0,
            end: 100,
            height: 11,
          },
          legend: {
            data: [],
            icon: 'circle',
            left: 0
          },
          series: [{
            barWidth: 16,
            name: '网络零售额',
            type: 'bar',
            data: [],
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
          }, {
            barWidth: 16,
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            data: [],
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
          }]
        }
      },
      columnData: [
        { name: '时间', key: 'date' },
        { name: '网络零售额（万元）', key: 'value' },
        { name: '同比增长（%）', key: 'contrast' }
      ],
      tableData: [],
      tableStyle: {
        height: '330px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 6
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getData()
    },
    getData () {
      this.getCurrentData()
      this.getCurrentTable()
    },
    getCurrentTable () {
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime
        }
      }
      getCurrentTable(data).then(res => {
        let data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    getLegendData (val) {
      let data = ''
      let unit = ''
      if (val === '当月网络零售额' || val === '累计网络零售额') {
        data = '网络零售额'
        unit = '万元'
      } else if (val === '当月网络零售量' || val === '累计网络零售量') {
        data = '网络零售量'
        unit = '万件'
      } else if (val === '当月店铺数') {
        data = '店铺数'
        unit = '家'
      } else if (val === '从业人数') {
        data = '从业人数'
        unit = '人'
      }
      this.lineBarOptions.extend.legend.data[0] = `${data}(${unit})`
      this.lineBarOptions.extend.legend.data[1] = '同比增长(%)'
      this.lineBarOptions.extend.series[0].name = `${data}(${unit})`
      this.lineBarOptions.extend.series[1].name = '同比增长(%)'
      this.lineBarOptions.extend.yAxis[0].name = unit
      this.columnData[1].name = `${data}(${unit})`
    },
    // 柱状图联调
    getCurrentData () {
      this.getLegendData(this.newData.sourceData[0].model)
      // this.titleData = this.newData.sourceData[0].model
      this.titleData = this.newData.timeData.model
      let data = {
        params: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime
        }
      }
      getCurrentData(data).then(res => {
        let data = res.data.data
        this.lineBarOptions.extend.xAxis.data = data.xnames
        data.series.forEach((ele, ind) => {
          this.lineBarOptions.extend.series[ind].data = ele.data
        })

        if (data.xnames.length > 12) {
          this.lineBarOptions.extend.dataZoom[0].end = 80
        }

        // 零售额Y设置
        const max = Math.ceil(Math.max.apply(Math, data.series[0].data.map(o => { return o })))
        const min = Math.ceil(Math.min.apply(Math, data.series[0].data.map(o => { return o })))
        this.lineBarOptions.extend['yAxis.0.min'] = min
        this.lineBarOptions.extend['yAxis.0.max'] = max
        this.lineBarOptions.extend['yAxis.0.interval'] = Math.ceil((max - min) / 5)
        // 同比Y设置
        const max1 = Math.ceil(Math.max.apply(Math, data.series[1].data.map(o => { return o })))
        const min1 = Math.ceil(Math.min.apply(Math, data.series[1].data.map(o => { return o })))
        this.lineBarOptions.extend['yAxis.1.min'] = min1
        this.lineBarOptions.extend['yAxis.1.max'] = max1
        this.lineBarOptions.extend['yAxis.1.interval'] = Math.ceil((max1 - min1) / 5)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getCurrentTable()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>

<style>
</style>
