<template>
  <div class="proportion-container">
    <div class="tabs-content">
      <span class="tabs-area" @click="handleChange(item.label)" :class="{'active':areaActive===item.label}" v-for="(item,index) in areaData" :key="index">{{item.value}}</span>
    </div>
    <el-row :gutter="20" type="flex">
      <el-col :span="14">
        <j-card>
          <p class="j-chart-title">{{title}}{{areaType}}占比（%）</p>
          <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="colors"></ve-ring>
        </j-card>
      </el-col>
      <el-col :span="10">
        <j-card>
          <p class="j-chart-title">{{title}}{{areaType}}排行榜（{{unit}}）</p>
          <ve-histogram v-on-echart :series="extend.series" :grid="extend.grid" :tooltip="extend.tooltip" :xAxis="extend.xAxis" :dataZoom="extend.dataZoom" :yAxis="extend.yAxis" height="100%" :legend="extend.legend" :colors="['#4B66FE']"></ve-histogram>
        </j-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { colors, tooltip, tooltipItem } from '@/assets/js/echartsConfig'
import { getXFPLJYGMFXIData } from '../../api/api'
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
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      titleData: '',
      areaType: '零售额',
      areaActive: 'sum',
      unit: '元',
      areaData: [
        {
          id: 1,
          label: 'sum',
          value: '零售额',
          unit: '元'
        }, {
          id: 2,
          label: 'num',
          value: '零售量',
          unit: '件'
        }],
      colors: colors,
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
          right: '3%'
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
          left: '-60',
          bottom: '10%',
          right: '13%'
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: {
          type: 'bar',
          data: [1, 2, 3, 4, 2, 5],
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
      pieConfig: {
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
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getData()
    },
    handleChange (item) {
      this.areaActive = item
      this.areaData.forEach(ele => {
        if (item === ele.label) {
          this.areaType = ele.value
          this.unit = ele.unit
        }
      })
      this.getData()
    },
    getData () {
      let data = {
        params: {
          dataType: this.active,
          start: this.newData.timeData.time.startTime,
          sortName: this.areaActive
        }
      }
      getXFPLJYGMFXIData(data).then(res => {
        let data = res.data.data
        let pieData = []
        let legendData = []
        let yname = []
        let value = []
        let max = ''
        if (data) {
          if (this.areaActive === 'sum') {
            data.forEach(ele => {
              pieData.push({ value: ele.sum, name: ele.name })
              legendData.push(ele.name)
              yname.unshift(ele.name)
              value.unshift(ele.sum)
            })
          } else if (this.areaActive === 'num') {
            data.forEach(ele => {
              pieData.push({ value: ele.num, name: ele.name })
              legendData.push(ele.name)
              yname.unshift(ele.name)
              value.unshift(ele.num)
            })
          }
          if (data.length > 5) {
            this.extend.dataZoom[0].start = 100 - Math.floor(100 / data.length) * 5
            this.extend.dataZoom[0].end = 100
          }
          max = Math.max.apply(Math, value.map(o => { return o }))
          this.extend.series.data = value
          this.extend.yAxis.data = yname
          this.extend.xAxis.max = max
          this.pieConfig.legend.data = legendData
          this.pieConfig.series.data = pieData
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.proportion-container {
  position: relative;
  .tabs-content {
    position: absolute;
    right: 0;
    top: -48px;
    .tabs-area {
      display: inline-block;
      margin-left: 10px;
      padding: 0 10px;
      min-width: 68px;
      height: 32px;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      color: #bbbfd0;
      border: 1px solid #d1d4e5;
      border-radius: 16px;
      &.active {
        background: rgba(75, 102, 254, 0.1);
        border-radius: 16px;
        color: #4b66fe;
        border-width: 0px;
      }
    }
  }
}
</style>
