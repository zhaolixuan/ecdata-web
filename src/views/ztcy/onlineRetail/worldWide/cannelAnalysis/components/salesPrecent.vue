<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{titleData}}</p>
        <ve-histogram v-on-echart :extend="barOptions.extend" :yAxis="barOptions.extend.yAxis" height="430px" :colors="['#4B66FE']"></ve-histogram>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{titleData}}</p>
        <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </el-col>
  </el-row>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { tooltip } from '@/assets/js/echartsConfig'
import { getPlatformData, getPlatformTable } from '../api/api'
export default {
  props: ['boxData'],
  data () {
    return {
      areaCode: '300000',
      newData: this.boxData,
      titleData: '',
      /* eslint-disable */
      barOptions: {
        extend: {
          xAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#999FC0"
              }
            },
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: '#EDF0FD'
              }
            }
          },
          tooltip,
          yAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#999FC0"
              }
            }
          },
          grid: {
            right: '12%',
            top: '5%',
            bottom: '5%',
          },
          dataZoom: [{
            show: true,
            backgroundColor: 'rgb(236, 239, 253, .5)',
            fillerColor: 'rgb(216, 221, 253, .5)',
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 11,
            height: '100%',
            showDataShadow: false,
            start: 0,
            end: 100,
            top: 'center',
            right: '3%'
          }],
          legend: {
            show: false,
            icon: 'circle',
            left: 0
          },
          series: [{
            name: '??????(%)',
            type: 'bar',
            barWidth: 16,
            showBackground: true,
            data: [20, 30, 40, 50, 70, 80],
            backgroundStyle: {
              color: '#EDF0FD',
              barBorderRadius: [0, 10, 10, 0]
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 10, 10, 0]
              }
            }
          }]
        }
      },
      columnData: [
        { name: '??????', key: 'rank' },
        { name: '????????????', key: 'name' },
        { name: '???????????????????????????', key: 'value' },
        { name: '?????????%???', key: 'pro' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 6
      },
      activeType: ''
    }
  },
  mounted () {
    this.getPlatformData()
    this.getPlatformTable()
  },
  methods: {
    onConfirm (val) {
      this.newData = val
      this.getPlatformData()
      this.getPlatformTable()
    },
    getPlatformData () {
      let time = ''
      let endTime = ''
      if (this.newData.sourceData[0].model === '0') {
        this.titleData = `???????????????${this.newData.timeData.model}??????`
        if (this.newData.timeData.model === '???1??????' || this.newData.timeData.model === '??????') {
          time = this.newData.timeData.time.endTime
        } else {
          time = this.newData.timeData.time.startTime
        }
        endTime = ''
        if (this.newData.timeData.model === '??????') {
          this.activeType = '?????????????????????'
        } else {
          this.activeType = this.newData.sourceData[1].model
        }
      } else {
        this.titleData = `${this.newData.sourceData[0].selectValue}????????????${this.newData.timeData.model}??????`
        time = this.newData.timeData.time.startTime
        endTime = this.newData.timeData.time.endTime
        this.activeType = this.newData.sourceData[1].model
      }
      // this.titleData = this.newData.sourceData[1].model
      // this.titleData = this.newData.timeData.model
      const data = {
        params: {
          type: this.activeType,
          start: time,
          end: endTime,
          queryType: this.newData.sourceData[0].model,
          name: this.newData.sourceData[0].selectValue,
          code: this.areaCode
        }
      }
      getPlatformData(data).then(res => {
        let data = res.data.data
        let yname = []
        let xData = []
        if (data) {
          if (this.newData.sourceData[0].model == '0') {
            data.forEach(ele => {
              yname.unshift(ele.name)
              xData.unshift(ele.pro)
            })
          } else {
            data.forEach(ele => {
              yname.unshift(ele.date)
              xData.unshift(ele.pro)
            })
          }
          if (data.length > 8) {
            this.barOptions.extend.dataZoom[0].start = 100
            this.barOptions.extend.dataZoom[0].end = 80
          }
          this.barOptions.extend.yAxis.data = yname
          this.barOptions.extend.series[0].data = xData
        }
      })
    },
    getPlatformTable () {
      let time = ''
      let endTime = ''
      if (this.newData.sourceData[0].model === '0') {
        if (this.newData.timeData.model === '???1??????' || this.newData.timeData.model === '??????') {
          time = this.newData.timeData.time.endTime
        } else {
          time = this.newData.timeData.time.startTime
        }
        endTime = ''
        if (this.newData.timeData.model === '??????') {
          this.activeType = '?????????????????????'
        } else {
          this.activeType = this.newData.sourceData[1].model
        }
      } else {
        time = this.newData.timeData.time.startTime
        endTime = this.newData.timeData.time.endTime
        this.activeType = this.newData.sourceData[1].model
      }
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.activeType,
          start: time,
          end: endTime,
          queryType: this.newData.sourceData[0].model,
          name: this.newData.sourceData[0].selectValue,
          code: this.areaCode
        }
      }
      getPlatformTable(data).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getPlatformTable()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>