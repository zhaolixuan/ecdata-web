<template>
  <div :id="id" class="bar-chart"></div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    dataSource: {
      handler (val) {
        if (this.chart) {
          this.chart.setOption(this.defaultOption())
        } else {
          this.init()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.defaultOption())
      window.addEventListener('resize', this.resizeHandle)
    },
    resizeHandle () {
      this.chart.resize()
    },
    defaultOption () {
      let yAxisList = this.dataSource.map(item => item.name).reverse();
      let dataList = this.dataSource.map(item => item.value).reverse();
      let unit = (this.dataSource[0] && this.dataSource[0].unit) || ''
      return {
        grid: {
          left: '0',
          top: '3%',
          containLabel: true
        },
        tooltip: {
          backgroundColor: '#FFFFFF',
          extraCssText: 'box-shadow: 0 0 14px rgba(52, 48, 97, 0.17)',
          textStyle: {
            fontSize: 16,
            color: '#353F75'
          },
          border: {
            show: false
          },
          formatter: function (v) {
            let html = `${v.marker}
              <span style="font-size:12px; color:#646B95">${v.name}</span>
              <span style="font-size:16px; color:#353F75"> ${v.value}${unit || ''}</span>`;
            return html
          },
        },
        // dataZoom:{
        //   type: 'slider',
        //   width: 15,
        //   show: this.dataSource.length>10,
        //   backgroundColor: '#DCE2FE',
        //   start: 0,
        //   end: 50,
        //   orient: 'vertical'
        // },
        xAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9CA2C6'
          },
          splitLine: {
            lineStyle: {
              color: '#EDF0FD'
            }
          },
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#EDF0FD'
            }
          },
          axisLabel: {
            color: '#9CA2C6'
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            show: true,
            label: {
              show: false
            },
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(75,102,254,0.04)',
              shadowColor: 'rgba(75,102,254,0.04)'
            },
            triggerTooltip: false
          },
          data: yAxisList
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: '#4B66FE',
              barBorderRadius: [0, 10, 10, 0],
            },
            barWidth: 12,
            data: dataList
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>