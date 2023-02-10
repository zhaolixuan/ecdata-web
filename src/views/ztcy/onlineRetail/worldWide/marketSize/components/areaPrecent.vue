<!-- 红木家具各电商渠道网络零售额占比分析 -->
<template>
  <j-card>
    <el-row :gutter="20" type="flex">
      <el-col :span="10">
        <p class="j-chart-title">{{timeTitle}}各经济区域占比</p>
        <ve-ring v-on-echart :extend="chartExtend" height="245px" :colors="colors"></ve-ring>
      </el-col>
      <el-col :span="14">
        <div calss="j-table-warp">
          <p class="j-chart-title">各经济区域占比变化趋势</p>
          <ve-histogram v-on-echart :series="StackingOptions.series" :dataZoom="StackingOptions.dataZoom" :legend="StackingOptions.legend" :colors="colors" :yAxis="StackingOptions.yAxis" :xAxis="StackingOptions.xAxis"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <j-table :columnData="columnData" :tableStyle="tableStyle" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
  </j-card>
</template>

<script>
import { getAreaData, getAreaTable } from '../api/api.js'
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { xAxis, yAxis, tooltipItem } from '@/assets/js/echartsConfig'
export default {
  props: ['boxData'],
  components: {
    JCard,
    JTable
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      timeTitle: '',
      columnData: [
        { name: '时间', key: 'date' },
        { name: '经济区域', key: 'name' },
        { name: '网络零售额（万元）', key: 'value' },
        { name: '同比增长（%）', key: 'yoy' },
        { name: '占比（%）', key: 'pro' }
      ],
      tableData: [],
      tableStyle: {
        height: '290px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 5
      },
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      chartExtend: {
        tooltip: tooltipItem,
        series: {
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: [],
          label: {
            normal: {
              show: false,
              formatter: '{b}\n{d}%',
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22'
                // fontWeight: 'bold'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: 'rgba(20,29,84,0.12)'
            }
          }
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 20,
          top: 'center'
        }
      },
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
          data: []
        },
        xAxis,
        yAxis: [{
          ...yAxis,
          name: '%'
        }],
        series: []
        // series: [
        //   {
        //     name: '',
        //     type: 'bar',
        //     stack: '总量',
        //     barWidth: 16,
        //     data: [],
        //     showBackground: true,
        //     backgroundStyle: {
        //       opacity: 0,
        //       barBorderRadius: [10, 10, 0, 0]
        //     },
        //   },
        //   {
        //     name: '',
        //     type: 'bar',
        //     stack: '总量',
        //     barWidth: 16,
        //     data: []
        //   },
        //   {
        //     name: '',
        //     type: 'bar',
        //     stack: '总量',
        //     barWidth: 16,
        //     data: []
        //   },
        //   {
        //     name: '',
        //     type: 'bar',
        //     stack: '总量',
        //     barWidth: 16,
        //     data: [],
        //     itemStyle: {
        //       normal: {
        //         barBorderRadius: [10, 10, 0, 0]
        //       }
        //     }
        //   }
        // ]
      },
    }
  },
  mounted () {
    this.getAreaData()
    this.getAreaTable()
    this.getStackData()
  },
  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getAreaData()
      this.getAreaTable()
      this.getStackData()
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
      this.columnData[2].name = `${data}(${unit})`
    },
    // 表格联调
    getAreaTable () {
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.newData.sourceData[1].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime,
          dataType: this.newData.sourceData[0].model
        }
      }
      getAreaTable(data).then(res => {
        let data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    // 占比图联调
    getAreaData () {
      this.getLegendData(this.newData.sourceData[1].model)
      this.timeTitle = this.newData.timeData.model
      // this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      let data = {
        params: {
          type: this.newData.sourceData[1].model,
          start: this.newData.timeData.time.startTime,
          end: '',
          dataType: this.newData.sourceData[0].model
        }
      }
      getAreaData(data).then(res => {
        let data = res.data.data
        let pieData = []
        if (data) {
          data.forEach(val => {
            pieData.push(val)
          })
          this.chartExtend.series.data = pieData
        }
      })
    },
    //堆叠图
    getStackData (val) {
      let data = {
        params: {
          type: this.newData.sourceData[1].model,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime,
          dataType: this.newData.sourceData[0].model
        }
      }
      getAreaData(data).then(res => {
        let data = res.data.data
        let legendData = []
        let xname = []
        let stackSourceData = []
        let ydata = []
        this.StackingOptions.series = []
        data.forEach(ele => {
          xname.push(ele.date)
          legendData.push(ele.name)
        })
        if (data.length > 12) {
          this.StackingOptions.dataZoom[0].end = 80
        }
        xname = Array.from(new Set(xname))
        legendData = Array.from(new Set(legendData))
        for (var i = 0; i < legendData.length; i++) {
          ydata = []
          for (var j = 0; j < data.length; j++) {
            if (legendData[i] === data[j].name) {
              ydata.push(data[j].pro)
            }
          }
          stackSourceData.push({ name: legendData[i], data: ydata })
        }
        stackSourceData.map((ele, index, val) => {
          if (index === 0) {
            this.StackingOptions.series[index] = {
              name: ele.name,
              type: 'bar',
              stack: '总量',
              barWidth: 16,
              data: ele.data,
              showBackground: true,
              backgroundStyle: {
                opacity: 0,
                barBorderRadius: [10, 10, 0, 0]
              },
            }
          } else if (index === val.length - 1) {
            this.StackingOptions.series[index] = {
              name: ele.name,
              type: 'bar',
              stack: '总量',
              barWidth: 16,
              data: ele.data,
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0]
                }
              }
            }
          } else {
            this.StackingOptions.series[index] = {
              name: ele.name,
              type: 'bar',
              stack: '总量',
              barWidth: 16,
              data: ele.data
            }
          }
          this.StackingOptions.series
        })
        this.StackingOptions.legend.data = legendData
        this.StackingOptions.xAxis = {
          ...xAxis,
          data: xname
        }
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getAreaTable()
    }
  }
}
</script>

<style>
</style>
