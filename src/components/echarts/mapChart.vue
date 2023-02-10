<template>
  <div :id="id" class="map-chart"></div>
</template>

<script>
import chinaJson from '../../assets/json/china.json'
import defaultData from '../../assets/json/mapdata.json'
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
      chart: null,
      colors: ['#4B66FE', '#EE6C65', '#00DCF0', '#997EFF', '#FF6BB1', '#3BC0FF', '#FFC932', '#34D3AA', '#FF8A46', '#49517F', '#7F93FF', '#3BBD93', '#72A03F', '#1884D1', '#596EC2', '#9C50C2', '#BA8950', '#C5529A', '#C16161', '#667BF7']
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
      echarts.registerMap('china', chinaJson);
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.defaultOption())
      window.addEventListener('resize', this.resizeHandle)
    },
    resizeHandle () {
      this.chart.resize()
    },
    defaultOption () {
      let max = this.dataSource.length > 0 ? Math.ceil(this.dataSource.map(item => item.value).sort((x, y) => y - x)[0]) : 100
      return {
        tooltip: {
          backgroundColor: '#FFFFFF',
          extraCssText: 'box-shadow: 0 0 14px rgba(52, 48, 97, 0.17)',
          textStyle: {
            fontSize: 16,
            color: '#353F75'
          },
          formatter: function (v) {
            let html = `${v.marker}
              <span style="font-size:12px; color:#646B95">${v.name}</span>
              <span style="font-size:16px; color:#353F75"> ${v.value || 0}${(v.data && v.data.unit) || ''}</span>`;
            return v.name ? html : ''
          },
        },
        visualMap: {
          min: 0,
          max: max,
          left: '3%',
          bottom: '3%',
          calculable: true,
          orient: 'horizontal',
          itemWidth: 8,
          itemHeight: 86,
          inRange: {
            // color: ['#D6DCFD', '#D6DCFD', '#A6B2FA', '#6E83F6', '#4F67F4'],
            color: ['#D6DCFD', '#304DF2'],
          },
          textStyle: {
            color: '#6E728D'
          }
        },
        // visualMap: {
        //   type: 'piecewise',
        //   left: '15',
        //   bottom: '15',
        //   itemWidth: 27,
        //   itemHeight: 15,
        //   textStyle: {
        //     color: '#6E728D',
        //     fontSize: 14,
        //   },
        //   pieces: [{
        //     min: 500,
        //     label: '>500',
        //   }, {
        //     max: 500,
        //     min: 200,
        //     label: '200-500',
        //   }, {
        //     max: 200,
        //     min: 0,
        //     label: '<200',
        //   }, {
        //     value: 0,
        //     label: '0',
        //   }],
        //   inRange: {
        //     color: ['#D6DCFD', '#D6DCFD', '#A6B2FA', '#6E83F6', '#4F67F4', '#304DF2']
        //   },
        //   outOfRange: {
        //     color: ['#999999']
        //   }
        // },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          layoutCenter: ['50%', '60%'],
          layoutSize: '100%',
          itemStyle: {
            normal: {
              borderColor: 'rgba(0,63,140,0.2)',
              shadowColor: 'rgba(0,63,140,0.2)',
              shadowOffsetY: 20,
              shadowBlur: 30
            }
          }
        },
        series: [{
          type: 'map',
          map: 'china',
          layoutCenter: ['50%', '60%'],
          layoutSize: '100%',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#B2CAE0',
              borderColor: '#fff',
              borderWidth: 1,
            },
            emphasis: {
              areaColor: '#904CD4',
            }
          },
          data: this.dataSource.length > 0 ? this.dataSource : defaultData
        }]
      }
    }
  }
}
</script>

<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>