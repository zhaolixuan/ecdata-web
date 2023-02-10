<!-- 网络零售月度走势情况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">月度网络零售额走势</p>
        <ve-histogram v-on-echart :extend="barOptions" :colors="['#4B66FE']"></ve-histogram>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">月度网络零售额增速走势</p>
        <ve-line v-on-echart :series="regionLineOption.series" :tooltip="regionLineOption.tooltip" :xAxis="regionLineOption.xAxis" :yAxis="regionLineOption.yAxis" :dataZoom="regionLineOption.dataZoom" :legend="regionLineOption.legend" :colors="['#4B66FE', '#43E5F4']"></ve-line>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getWLLSYDZSQKUANG } from '../../api/api'
export default {
  data () {
    /* eslint-disable */
    this.chartSettings = {
      stack: { '用户': ['访问用户', '下单用户'] },
      area: true
    }
    return {
      barOptions: {
        xAxis,
        yAxis: [{
          ...yAxis,
          name: '万元'
        }, {
          ...yAxis
        }],
        dataZoom,
        tooltip,
        legend: {
          data: ['当月网络零售额(万元)'],
          icon: 'circle',
          left: 0,
          pageIconSize: 20
        },
        series: [{
          type: 'bar',
          name: '当月网络零售额(万元)',
          barWidth: 16,
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
      },
      regionLineOption: {
        xAxis,
        yAxis: {
          ...yAxis,
          name: '%'
        },
        dataZoom,
        tooltip,
        legend: {
          icon: 'circle',
          left: 'left',
          data: ['当月网络零售额同比增长(%)', '累计网络零售额同比增长(%)']
        },
        series: [
          {
            name: '当月网络零售额同比增长(%)',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: [0, 50, 120, 0],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(223, 227, 255, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(223, 227, 255, .3)', // 0% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: '累计网络零售额同比增长(%)',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: [0, 120, 50, 0],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(216, 237, 245, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(216, 237, 245, .3)' // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      }
    }
  },
  props: {
    startTime: {
      type: String
    }
  },
  components: {
    JCard
  },
  watch: {
    startTime (n) {
      this.getWLLSYDZSQKUANGData()
    }
  },
  mounted () {
    this.getWLLSYDZSQKUANGData()
  },
  methods: {
    getWLLSYDZSQKUANGData () {
      const data = { params: { start: this.startTime } }
      getWLLSYDZSQKUANG(data).then(res => {
        if (res.data.success) {
          let xAxisData = []
          let seriesData0 = []
          let seriesData1 = []
          this.barOptions.series[0].data = []
          res.data.data.forEach((item, i) => {
            xAxisData.push(item.date)
            seriesData0.push(item.nowYoy)
            seriesData1.push(item.sumYoy)
            this.barOptions.series[0].data.push(item.nowValue)
          })
          this.regionLineOption.series[0].data = seriesData0
          this.regionLineOption.series[1].data = seriesData1
          this.regionLineOption.xAxis.data = xAxisData
          this.barOptions.xAxis = {
            ...xAxis,
            data: xAxisData
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
