<template>
  <div>
    <j-card>
      <p class="j-chart-title">各商品类型{{titleData}}变化趋势</p><!-- 柱状+折现图 -->
      <ve-histogram v-on-echart :series="StackingOptions.series" :dataZoom="StackingOptions.dataZoom" :legend="StackingOptions.legend" :colors="colors" :yAxis="StackingOptions.yAxis" :xAxis="StackingOptions.xAxis"></ve-histogram>
      <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>
<script>
import JTable from '@c/function/table'
import JCard from '@c/layout/jCard/j-card'
import { getWholeData, getWholeTable } from '../api/api'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
export default {
  props: ['boxData'],
  data () {
    return {
      areaCode: '440605',
      newData: this.boxData,
      titleData: '',
      colors: ['#4B66FE', '#65EAF6', '#EE6C65', '#FFC932', '#997EFF', '#CED3EB'],
      StackingOptions: {
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
          left: 'left',
          data: ['实物占比', '非实物占比', '实物同比增长', '非实物同比增长']
        },
        xAxis,
        yAxis: [{
          ...yAxis,
          name: '占比（%）'
        }, {
          ...yAxis,
          name: '同比（%）'
        }],
        series: [
          {
            name: '实物占比',
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
            name: '非实物占比',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: []
          },
          {
            name: '实物同比增长',
            type: 'line',
            yAxisIndex: 1,
            barWidth: 16,
            data: []
          },
          {
            name: '非实物同比增长',
            type: 'line',
            yAxisIndex: 1,
            barWidth: 16,
            data: []
          }
        ]
      },
      columnData: [
        { name: '时间', key: 'date' },
        { name: '实物网络零售额（万元）', key: 'svalue' },
        { name: '非实物网络零售额（万元）', key: 'fvalue' },
        { name: '实物同比增长（%）', key: 'syoy' },
        { name: '非实物同比增长（%）', key: 'fyoy' },
        { name: '实物占比（%）', key: 'spro' },
        { name: '非实物占比（%）', key: 'fpro' }
      ],
      tableData: [],
      tableStyle: {
        height: '330px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 5
      }
    }
  },
  mounted () {
    this.getWholeData()
    this.getWholeTable()
  },
  methods: {
    onConfirm (val) {
      this.newData = val
      this.getWholeData()
      this.getWholeTable()
    },
    getWholeData () {
      // this.titleData = this.newData.sourceData[0].model
      this.titleData = this.newData.timeData.model
      const data = {
        params: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          endTime: this.newData.timeData.time.endTime,
          code: this.areaCode
        }
      }
      getWholeData(data).then(res => {
        const data = res.data.data
        const xname = []
        const swzb = []
        const fswzb = []
        const swtb = []
        const fswtb = []
        data.forEach(ele => {
          swzb.push(ele.spro)
          fswzb.push(ele.fpro)
          swtb.push(ele.syoy)
          fswtb.push(ele.fyoy)
          xname.push(ele.date)
        })
        if (xname.length > 12) {
          this.StackingOptions.dataZoom[0].end = 80
        }
        this.StackingOptions.series[0].data = swzb
        this.StackingOptions.series[1].data = fswzb
        this.StackingOptions.series[2].data = swtb
        this.StackingOptions.series[3].data = fswtb
        this.StackingOptions.xAxis.data = xname
      })
    },
    getWholeTable () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.newData.sourceData[0].model,
          start: this.newData.timeData.time.startTime,
          endTime: this.newData.timeData.time.endTime,
          code: this.areaCode
        }
      }
      getWholeTable(data).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getWholeTable()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
