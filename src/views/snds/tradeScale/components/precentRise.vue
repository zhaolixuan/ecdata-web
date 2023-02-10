<!-- 网络零售月度走势情况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{timeTitle}} 农产品网络零售二级行业零售额发布（二级行业TOP10）</p>
        <ve-ring v-on-echart :extend="chartExtend" height="245px" :colors="colors"></ve-ring>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">行业零售额排行榜（万元）</p>
        <ve-histogram v-on-echart :series="extend.series" :dataZoom="extend.dataZoom" :grid="extend.grid" :xAxis="extend.xAxis" :tooltip="extend.tooltip" :yAxis="extend.yAxis" height="100%" :legend="extend.legend" :colors="['#4B66FE']"></ve-histogram>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { tooltip } from '@/assets/js/echartsConfig'
import { getTradeData } from '../api/api'
export default {
  props: ['boxData'],
  data () {
    /* eslint-disable */
    return {
      newData: this.boxData,
      timeTitle: '',
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      chartExtend: {
        series: {
          type: 'pie',
          data: [],
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
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
          }
        },
        tooltip: {},
        grid: {},
        // yAxis: {},
        legend: {
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itamGap: 50,
          right: 50,
          top: 'center'
        },
        // title: {
        //   text: '同名数量统计',
        //   subtext: '纯属虚构',
        //   left: '10'
        // }
      },
      extend: {
        tooltip,
        dataZoom: [{
          show: true,
          backgroundColor: 'rgb(236, 239, 253, .5)',
          fillerColor: 'rgb(216, 221, 253, .5)',
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 11,
          height: '80%',
          showDataShadow: false,
          start: 100,
          end: 100,
          top: 'center',
        }],
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false,
          data: [],
          boundaryGap: false,
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
          top: '15%',
          left: '-70',
          bottom: '10%',
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: {
          type: 'bar',
          name: '',
          data: [1, 2, 3, 4, 5],
          barWidth: 16,
          label: {
            show: true,
            position: ['0', '-20'],
            formatter: '{b}      {c}',
            color: '#141D54'
          },
          showBackground: true,
          backgroundStyle: {
            color: '#EDF0FD',
            barBorderRadius: [0, 10, 10, 0]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        }
      },
    }
  },
  mounted () {
    this.getTradeData()
  },
  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getTradeData()
    },
    getTradeData () {
      this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      const data = {
        params: {
          dataMonth: this.newData.timeData.time.startTime
        }
      }
      getTradeData(data).then(res => {
        const data = res.data.data
        if (data) {
          let pieData = []
          let yname = []
          let value = []
          let max = ''
          data.map(ele => {
            pieData.push({ name: ele.name, value: ele.pro })
            yname.unshift(ele.name)
            value.unshift(ele.pro)
          })
          max = Math.max.apply(Math, value.map(o => { return o }))
          this.chartExtend.series.data = pieData
          if (data.length > 5) {
            this.extend.dataZoom[0].start = 100 - Math.floor(100 / data.length) * 5
            this.extend.dataZoom[0].end = 100
          }
          this.extend.series.data = value
          this.extend.yAxis.data = yname
          this.extend.xAxis.max = max
        }
      })
    }
  },
  components: {
    JCard
  }
}
</script>

<style>
</style>
