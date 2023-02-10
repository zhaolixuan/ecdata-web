<template>
  <el-row :gutter="20" type="flex">
    <!-- <el-col :span="12">
      <j-card>
        <p class="j-chart-title">学历分布</p>
        <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="colors"></ve-ring>
      </j-card>
    </el-col> -->
    <!-- <el-col :span="12">
      <j-card>
        <p class="j-chart-title">促销敏感度</p>
        <ve-radar v-on-echart :tooltip="radarCongig.tooltip" :splitArea="radarCongig.splitArea" :colors="['#00dcf0']" :series="radarCongig.series" :legend="radarCongig.legend" :radar="radarCongig.radar" height="300px"></ve-radar>
      </j-card>
    </el-col> -->
  </el-row>
</template>

<script>

import JCard from '@c/layout/jCard/j-card'
import { colors, tooltipItem } from '@/assets/js/echartsConfig'
import { getGLXFXSJU } from '../../api/api'
export default {
  components: {
    JCard
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      radarCongig: {
        tooltip: tooltipItem,
        legend: {
          show: false,
          left: 0,
          data: ['促销敏感度（%）']
        },
        radar: {
          shape: 'circle',
          name: {
            textStyle: {
              color: '#666666'
            }
          },
          splitArea: {
            show: false
          },
          indicator: [],
          splitLine: {
            lineStyle: {
              color: '#e5e8f7'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e5e8f7'
            }
          }
        },
        series: [{
          type: 'radar',
          areaStyle: { normal: { color: 'rgba(224, 250, 253, 1)' } },
          lineStyle: {
            width: 5
          },
          data: [{
            value: [],
            name: '促销敏感度（%）'
          }]
        }]
      },
      colors: colors,
      pieConfig: {
        tooltip: tooltipItem,
        series: {
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: [],
          // data: [
          //   {value: 335, name: '直接访问'},
          //   {value: 310, name: '邮件营销'},
          //   {value: 234, name: '联盟广告'},
          //   {value: 135, name: '视频广告'},
          //   {value: 1548, name: '搜索引擎'}
          // ],
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
          data: [],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 20,
          top: 'center'
        },
      }
    }
  },
  watch: {
    active (n) {
      this.getData('学历分布')
      this.getData('促销敏感度分布')
    }
  },

  computed: {},

  mounted () {
    this.getData('学历分布')
    this.getData('促销敏感度分布')
  },
  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      // this.getData('学历分布')
      this.getData('促销敏感度分布')
    },
    getData (type) {
      let data = {
        params: {
          dataType: this.active,
          type: type,
          start: this.newData.timeData.time.startTime
        }
      }
      getGLXFXSJU(data).then(res => {
        let data = res.data.data
        let buyData = []
        let indicatorData = []
        let max = ''
        let legendData = []
        let pieData = []
        if (data.length) {
          if (type === '促销敏感度分布') {
            max = Math.max.apply(Math, data.map(o => { return o.pro })) || 0
            data.forEach(ele => {
              indicatorData.push({ name: ele.name, max: max })
              buyData.push(ele.pro)
            })
            this.radarCongig.series[0].data[0].value = buyData
            this.radarCongig.radar.indicator = indicatorData
          } else if (type === '学历分布') {
            data.forEach(ele => {
              pieData.push({ value: ele.pro, name: ele.name })
              legendData.push(ele.name)
            })
            this.pieConfig.legend.data = legendData
            this.pieConfig.series.data = pieData
          }
        }
      })
    }
  }
}
</script>

<style>
</style>