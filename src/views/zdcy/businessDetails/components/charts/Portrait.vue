<template>
  <div :id="id" :class="option.class" :style="option.style"></div>
</template>

<script>
export default {
  name: 'Portrait',
  props: {
    id: {
      type: String,
      default: ''
    },
    option: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandle)
  },
  watch: {
    data: {
      handler (newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(this.defaultOption())
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.defaultOption())
      window.addEventListener('resize', this.resizeHandle)
    },
    resizeHandle () {
      this.chart.resize()
    },
    defaultOption () {
      return {
        title: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        tooltip: {},
        legend: {
          show: false,
          data: ['预算分配']
        },
        radar: {
          name: {
            textStyle: {
              color: '#666666',
              padding: 20
            }

          },
          nameGap: 1,
          axisLine: {
            lineStyle: {
              type: 'dotted',
              color: 'rgba(55,159,235,0.31)'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#EDF0FD'
            }
          },
          splitArea: {
            areaStyle: {
              color: '#fff'
            }
          },
          indicator: [
            { name: '基础评分', max: 1500 },
            { name: '资质评分', max: 1500 },
            { name: '司法评分', max: 1500 },
            { name: '经营评分', max: 1500 },
            { name: '历史沿革评分', max: 1500 }
          ]
        },
        series: [{
          name: '企业评分',
          type: 'radar',
          symbol: 'none',
          itemStyle: {
            color: 'rgba(75,102,254,1)'
          },
          areaStyle: {
            normal: {
              color: ' rgba(75,102,254,0.23)'
            }
          },
          data: [
            {
              value: [this.data.base, this.data.qualification, this.data.judicature, this.data.manage, this.data.modification],
              name: ''
            }
          ]
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
