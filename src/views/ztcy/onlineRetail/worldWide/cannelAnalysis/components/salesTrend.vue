<template>
  <div>
    <j-card>
      <p class="j-chart-title">各交易模式{{titleData}}变化趋势</p><!-- 柱状+折现图 -->
      <ve-histogram v-on-echart :series="StackingOptions.series" :dataZoom="StackingOptions.dataZoom" :legend="StackingOptions.legend" :colors="colors" :yAxis="StackingOptions.yAxis" :xAxis="StackingOptions.xAxis"></ve-histogram>
      <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>
<script>
import JTable from '@c/function/table'
import JCard from '@c/layout/jCard/j-card'
import { getModelData, getModelTable } from '../api/api'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
export default {
  props: ['boxData'],
  data () {
    return {
      newData: this.boxData,
      colors: ['#4B66FE', '#65EAF6', '#EE6C65', '#FFC932', '#997EFF', '#CED3EB'],
      titleData: '',
      StackingOptions: {
        xAxis,
        dataZoom,
        yAxis: [{
          ...yAxis,
          name: '占比（%）'
        }, {
          ...yAxis,
          name: '同比（%）'
        }],
        legend: {
          icon: 'circle',
          left: 'left',
          data: ['B2C占比', 'C2C占比', 'B2C同比增长', 'C2C同比增长']
        },

        series: [
          {
            name: 'B2C占比',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [],
            showBackground: true,
            backgroundStyle: {
              opacity: 0,
              barBorderRadius: [10, 10, 0, 0]
            }
          },
          {
            name: 'C2C占比',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: []
          },
          {
            name: 'B2C同比增长',
            type: 'line',
            yAxisIndex: 1,
            barWidth: 16,
            data: []
          },
          {
            name: 'C2C同比增长',
            type: 'line',
            yAxisIndex: 1,
            barWidth: 16,
            data: []
          }
        ]
      },
      columnData: [
        { name: '时间', key: 'date' },
        { name: 'B2C网络零售额（万元）', key: 'bvalue' },
        { name: 'C2C网络零售额（万元）', key: 'cvalue' },
        { name: 'B2C同比增长（%）', key: 'byoy' },
        { name: 'C2C同比增长（%）', key: 'cyoy' },
        { name: 'B2C占比（%）', key: 'bpro' },
        { name: 'C2C占比（%）', key: 'cpro' }
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
    this.getModelData()
    this.getModelTable()
  },
  methods: {
    onConfirm (val) {
      this.newData = val
      this.getModelData()
      this.getModelTable()
    },
    getModelData () {
      // this.titleData = this.newData.sourceData[0].model
      this.titleData = this.newData.timeData.model
      const data = {
        params: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime
        }
      }
      getModelData(data).then(res => {
        const data = res.data.data
        const xname = []
        const bpro = []
        const cpro = []
        const byoy = []
        const cyoy = []
        data.forEach(ele => {
          bpro.push(ele.bpro)
          cpro.push(ele.cpro)
          byoy.push(ele.byoy)
          cyoy.push(ele.cyoy)
          xname.push(ele.date)
        })
        if (xname.length > 12) {
          this.StackingOptions.dataZoom[0].end = 80
        }
        this.StackingOptions.series[0].data = bpro
        this.StackingOptions.series[1].data = cpro
        this.StackingOptions.series[2].data = byoy
        this.StackingOptions.series[3].data = cyoy
        this.StackingOptions.xAxis.data = xname
      })
    },
    getModelTable () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime
        }
      }
      getModelTable(data).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getModelTable()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
