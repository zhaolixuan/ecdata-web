<!-- 网络零售月度走势情况 -->
<template>
  <div>
    <el-row :gutter="20" type="flex">
      <el-col :span="12">
        <j-card>
          <p class="j-chart-title">重点网络零售企业排行（万元）</p>
          <ve-histogram v-on-echart :series="leftExtend.series" :grid="leftExtend.grid" :tooltip="leftExtend.tooltip" :xAxis="leftExtend.xAxis" :yAxis="leftExtend.yAxis" height="280px" :legend="leftExtend.legend" :colors="['#4B66FE']"></ve-histogram>
        </j-card>
      </el-col>
      <el-col :span="12">
        <j-card>
          <p class="j-chart-title">重点网络零售企业店铺排行（万元）</p>
          <ve-histogram v-on-echart :series="rightExtend.series" :grid="rightExtend.grid" :tooltip="rightExtend.tooltip" :xAxis="rightExtend.xAxis" :yAxis="rightExtend.yAxis" height="280px" :legend="rightExtend.legend" :colors="['#ea544c']"></ve-histogram>
        </j-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex">
      <el-col :span="12">
        <j-card>
          <p class="j-chart-title">重点网络零售品牌排行（万元）</p>
          <ve-histogram v-on-echart :series="leftExtend1.series" :grid="leftExtend1.grid" :tooltip="leftExtend1.tooltip" :xAxis="leftExtend1.xAxis" :yAxis="leftExtend1.yAxis" height="280px" :legend="leftExtend1.legend" :colors="['#4B66FE']"></ve-histogram>
        </j-card>
      </el-col>
      <el-col :span="12">
        <j-card>
          <p class="j-chart-title">重点网络零售餐饮店铺排行（万元）</p>
          <ve-histogram v-on-echart :series="rightExtend1.series" :grid="rightExtend1.grid" :tooltip="rightExtend1.tooltip" :xAxis="rightExtend1.xAxis" :yAxis="rightExtend1.yAxis" height="280px" :legend="rightExtend1.legend" :colors="['#ea544c']"></ve-histogram>
        </j-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { tooltipItem } from '@/assets/js/echartsConfig'
import {  getZTBDQYPH , getZTBDQYDPPH , getZTBDPPPHB , getZTBDCYDPPHB } from '../../api/api'
export default {
  components: {
    JCard
  },
  data () {
    return {
      /* eslint-disable */
      leftExtend: {
        tooltip: tooltipItem,
        grid: {
          bottom: 0,
          top: 20
        },
        xAxis: {
          type: 'value',
          show: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['No.1 图书', 'No.2 小说', 'No.3 书籍', 'No.4 电子书', 'No.3 书籍', 'No.4 电子书'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: [{
          type: 'pictorialBar',
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAelJREFUOBGVVL9LW1EYPd/tS0Db2gQsxcUt1EIhIKWToJtKojhEpELrFnUIdKng1r+goxhBEDdBkWKgFQTrWheF0qG4BVoKZnFIHJJ8npvk3T4R30svSd693/lxv3fuJYKQMfNeE/UaDqHwBBg/2JDL++jmPsDWG1XkVPW1QocheBPGDTUyHn4KpAGIiuJHmFEkls3rbiavpSiiZJfYuiJvHqB4sCanQcHsR43XfuMvX8tjR8+YUTWId7QFEWx6DHIbqs+1ISMkDQWJ138wyXwS5PDtZIq/O0Fcm9gC9IWqjIVm1ATmnVAD806RJ8lPexhO3zHQPS6TmSV96QPTK/qYLNuFPyYyy5r0F1N5HWKjT+h1JAZvTWldvif7sEBCP5o4mV7UV5asV5jh0ff4Qr5inDnl7Dq7qGkVnJA10PsQc/T45loj+IvCFLO4gkGWh75K8aRv1H7KsQes1gVfmGtSRMqlogxajHU3zjlLkdAnDfnKHeOtkB1s88YoL9UROY86ZatpDRc2SWd+kZ30khzcpAWxY8Ovb0IK7hqR6Yq+YRdPp3EdGfP/RvHYP41r//OalBn4Jx5prItO7AVqpp/iYr9Ddh211vy76MbEcrih1Tr9LSHBAhN0VyLKtFKRD+TULc85Romi8BsE/KN7XZAXCAAAAABJRU5ErkJggg==',
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 20,
          data: [1, 2, 3, 4, 3, 2],
          barWidth: 16,
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
        }]
      },
      rightExtend: {
        tooltip: tooltipItem,
        grid: {
          bottom: 0,
          top: 20
        },
        xAxis: {
          type: 'value',
          show: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['No.1 图书', 'No.2 小说', 'No.3 书籍', 'No.4 电子书', 'No.3 书籍', 'No.4 电子书'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: [{
          type: 'pictorialBar',
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAgdJREFUOBGFUs1rE0EU/73ZNVrRmtAE8eKtaEEoiPQk2JsWmpBCltiAH3jw1qOH/hPeFQTxYkuVViKoUNBe9aIgHsRbT7qJEa1SzMw83ySdIUW6O4edzO8r770ZQsbq3awX9W/9CqD4cIzL44/bnYPk6iDC4XrHNJgxw8zn//axmKXNDFKx+kREhgBmRR+zgnK5b0n1SZpUn+cJqZPUZxjmNincK6+2340aOEkKHd79yoS4UsJJut/+M8oPvGyWEEcPYgl5JDM4A0sXRXR2VNhVu3NsuAgG0h6qwq2O8gz9UKgp0no2c0Zs0PJGmVP47TEwCTxcihBdB9FTuZ3S9+bCOU+kt2rHpSVXxd6iKz9arZI/dRarrvoTErWJOL6mymsbbytHijcEKBvb30qv1i44Mf3iutzVmDdK+4W+3mm4c6+5MG372GLwqQLGmpWVjTehtLQx/1n6nZTAnxxF86TtsgjnfJDb5Sm8pkgtszEvXAdy3q6stU87LnYft6SNDzLUSRGMQ9uXghSGzL7vJWvspuiODVAWz94aGTa996CEHJXqwp94XNpT0u4wRECp/v8geUcB9Ma83TIFT6hIkQpgXoDnKYqCJ5Q/sfJsO01qd5n4kBdm7YrZTkxNfwHWB7JQkTsRcwjOCnGcJRkGEPz7jHLdS7AITyIvDN3uHdFopwuJuaYcwT+l8Lt1RTQYXgAAAABJRU5ErkJggg==',
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 20,
          data: [1, 2, 3, 4, 3, 2],
          barWidth: 16,
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
        }]
      },
      leftExtend1: {
        tooltip: tooltipItem,
        grid: {
          bottom: 0,
          top: 20
        },
        xAxis: {
          type: 'value',
          show: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['No.1 图书', 'No.2 小说', 'No.3 书籍', 'No.4 电子书', 'No.3 书籍', 'No.4 电子书'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: [{
          type: 'pictorialBar',
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAelJREFUOBGVVL9LW1EYPd/tS0Db2gQsxcUt1EIhIKWToJtKojhEpELrFnUIdKng1r+goxhBEDdBkWKgFQTrWheF0qG4BVoKZnFIHJJ8npvk3T4R30svSd693/lxv3fuJYKQMfNeE/UaDqHwBBg/2JDL++jmPsDWG1XkVPW1QocheBPGDTUyHn4KpAGIiuJHmFEkls3rbiavpSiiZJfYuiJvHqB4sCanQcHsR43XfuMvX8tjR8+YUTWId7QFEWx6DHIbqs+1ISMkDQWJ138wyXwS5PDtZIq/O0Fcm9gC9IWqjIVm1ATmnVAD806RJ8lPexhO3zHQPS6TmSV96QPTK/qYLNuFPyYyy5r0F1N5HWKjT+h1JAZvTWldvif7sEBCP5o4mV7UV5asV5jh0ff4Qr5inDnl7Dq7qGkVnJA10PsQc/T45loj+IvCFLO4gkGWh75K8aRv1H7KsQes1gVfmGtSRMqlogxajHU3zjlLkdAnDfnKHeOtkB1s88YoL9UROY86ZatpDRc2SWd+kZ30khzcpAWxY8Ovb0IK7hqR6Yq+YRdPp3EdGfP/RvHYP41r//OalBn4Jx5prItO7AVqpp/iYr9Ddh211vy76MbEcrih1Tr9LSHBAhN0VyLKtFKRD+TULc85Romi8BsE/KN7XZAXCAAAAABJRU5ErkJggg==',
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 20,
          data: [1, 2, 3, 4, 3, 2],
          barWidth: 16,
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
        }]
      },
      rightExtend1: {
        tooltip: tooltipItem,
        grid: {
          bottom: 0,
          top: 20
        },
        xAxis: {
          type: 'value',
          show: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['No.1 图书', 'No.2 小说', 'No.3 书籍', 'No.4 电子书', 'No.3 书籍', 'No.4 电子书'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: [{
          type: 'pictorialBar',
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAgdJREFUOBGFUs1rE0EU/73ZNVrRmtAE8eKtaEEoiPQk2JsWmpBCltiAH3jw1qOH/hPeFQTxYkuVViKoUNBe9aIgHsRbT7qJEa1SzMw83ySdIUW6O4edzO8r770ZQsbq3awX9W/9CqD4cIzL44/bnYPk6iDC4XrHNJgxw8zn//axmKXNDFKx+kREhgBmRR+zgnK5b0n1SZpUn+cJqZPUZxjmNincK6+2340aOEkKHd79yoS4UsJJut/+M8oPvGyWEEcPYgl5JDM4A0sXRXR2VNhVu3NsuAgG0h6qwq2O8gz9UKgp0no2c0Zs0PJGmVP47TEwCTxcihBdB9FTuZ3S9+bCOU+kt2rHpSVXxd6iKz9arZI/dRarrvoTErWJOL6mymsbbytHijcEKBvb30qv1i44Mf3iutzVmDdK+4W+3mm4c6+5MG372GLwqQLGmpWVjTehtLQx/1n6nZTAnxxF86TtsgjnfJDb5Sm8pkgtszEvXAdy3q6stU87LnYft6SNDzLUSRGMQ9uXghSGzL7vJWvspuiODVAWz94aGTa996CEHJXqwp94XNpT0u4wRECp/v8geUcB9Ma83TIFT6hIkQpgXoDnKYqCJ5Q/sfJsO01qd5n4kBdm7YrZTkxNfwHWB7JQkTsRcwjOCnGcJRkGEPz7jHLdS7AITyIvDN3uHdFopwuJuaYcwT+l8Lt1RTQYXgAAAABJRU5ErkJggg==',
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 20,
          data: [1, 2, 3, 4, 3, 2],
          barWidth: 16,
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
        }]
      }
    }
  },
  props: {
    startTime: {
      type: String
    }
  },
  watch: {
    startTime () {
      this.getZTBDData()
    }
  },
  mounted () {
    this.getZTBDData()
  },
  methods: {
    getZTBDData () {
      this.getZTBDQYPHData()
      this.getZTBDQYDPPHData()
      this.getZTBDPPPHBData()
      this.getZTBDCYDPPHBData()
    },
    getZTBDQYPHData(){
       const data = { params: { start: this.startTime } }
       getZTBDQYPH(data).then(res=>{
          this.handelData('QYPHB',res)
       })
    },
    getZTBDQYDPPHData(){
       const data = { params: { start: this.startTime } }
       getZTBDQYDPPH(data).then(res=>{
          this.handelData('QYDPPHB',res)
       })
    },
    getZTBDPPPHBData(){
       const data = { params: { start: this.startTime } }
       getZTBDPPPHB(data).then(res=>{
          this.handelData('PPPHB',res)
       })
    },
    getZTBDCYDPPHBData(){
       const data = { params: { start: this.startTime } }
       getZTBDCYDPPHB(data).then(res=>{
          this.handelData('CYDPPHB',res)
       })
    },
    handelData(queryType,res){
      if (res.data.success) {
          if (queryType === 'QYPHB') {
            this.leftExtend.yAxis.data = []
            this.leftExtend.series[0].data = []
            res.data.data.forEach((item, i) => {
              this.leftExtend.yAxis.data.unshift(item.name)
              this.leftExtend.series[0].data.unshift(item.value)
            })
          }
          if (queryType === 'QYDPPHB') {
            this.rightExtend.yAxis.data = []
            this.rightExtend.series[0].data = []
            res.data.data.forEach((item, i) => {
              this.rightExtend.yAxis.data.unshift(item.name)
              this.rightExtend.series[0].data.unshift(item.value)
            })
          }
          if (queryType === 'PPPHB') {
            this.leftExtend1.yAxis.data = []
            this.leftExtend1.series[0].data = []
            res.data.data.forEach((item, i) => {
              this.leftExtend1.yAxis.data.unshift(item.name)
              this.leftExtend1.series[0].data.unshift(item.value)
            })
          }
          if (queryType === 'CYDPPHB') {
            this.rightExtend1.yAxis.data = []
            this.rightExtend1.series[0].data = []
            res.data.data.forEach((item, i) => {
              this.rightExtend1.yAxis.data.unshift(item.name)
              this.rightExtend1.series[0].data.unshift(item.value)
            })
          }
        }
    }


  }
}
</script>

<style>
</style>
