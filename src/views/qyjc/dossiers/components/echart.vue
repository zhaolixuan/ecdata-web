<template>
  <div class="enterprise-change-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple boxshadow">
          <j-card>
            <p class="j-chart-title mb20">企业近12个月销售额趋势</p><!-- 柱状+折现图 -->
            <ve-histogram v-on-echart :data="lineBarOptions1.chartData" :settings="lineBarOptions1.chartSettings" :extend="lineBarOptions1.extend" :colors="colors1"></ve-histogram>
          </j-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple boxshadow">
          <j-card>
            <p class="j-chart-title mb20">企业近12个月销售量趋势</p><!-- 柱状+折现图 -->
            <ve-histogram v-on-echart :data="lineBarOptions2.chartData" :settings="lineBarOptions2.chartSettings" :extend="lineBarOptions2.extend" :colors="colors2"></ve-histogram>
          </j-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
export default {
  props: ['salesAmount', 'salesVolume'],
  components: {
    JCard
  },
  data () {
    return {
      lineBarOptions1: {
        chartData: {
          columns: ['date', 'value', 'yoy'],
          rows: []
        },
        chartSettings: {
          labelMap: {
            date: '日期',
            value: '销售额(万元)',
            yoy: '同比增长(%)'
          },
          showLine: ['yoy'],
          axisSite: { right: ['yoy'] },
          yAxisName: ['万元', '%']
        },
        extend: {
          dataZoom: [
            {
              show: true,
              start: 1,
              end: 100,
              height: 11
            }
          ],
          legend: {
            icon: 'circle',
            left: 0
          },
          series: {
            barWidth: 16,
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
          }
        }
      },
      lineBarOptions2: {
        chartData: {
          columns: ['date', 'value', 'yoy'],
          rows: []
        },
        chartSettings: {
          labelMap: {
            date: '日期',
            value: '销售量(万件)',
            yoy: '同比增长(%)'
          },
          showLine: ['yoy'],
          axisSite: { right: ['yoy'] },
          yAxisName: ['万件', '%']
        },
        extend: {
          dataZoom: [
            {
              show: true,
              start: 1,
              end: 100,
              height: 11
            }
          ],
          legend: {
            icon: 'circle',
            left: 0
          },
          series: {
            barWidth: 16,
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
          }
        }
      },
      colors1: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      colors2: ['#43E5F4', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB']
    }
  },
  watch: {
    salesAmount (value) {
      const max = Math.max.apply(Math, value.map(o => { return o.value }))
      const min = Math.min.apply(Math, value.map(o => { return o.value }))
      this.lineBarOptions1.extend['yAxis.0.min'] = min
      this.lineBarOptions1.extend['yAxis.0.max'] = max
      this.lineBarOptions1.extend['yAxis.0.interval'] = (max - min) / 5

      const max2 = Math.max.apply(Math, value.map(o => { return o.yoy }))
      const min2 = Math.min.apply(Math, value.map(o => { return o.yoy }))
      this.lineBarOptions1.extend['yAxis.1.min'] = min2
      this.lineBarOptions1.extend['yAxis.1.max'] = max2
      this.lineBarOptions1.extend['yAxis.1.interval'] = (max2 - min2) / 5
      this.lineBarOptions1.chartData.rows = value
    },
    salesVolume (value) {
      const max = Math.max.apply(Math, value.map(o => { return o.value }))
      const min = Math.min.apply(Math, value.map(o => { return o.value }))
      this.lineBarOptions2.extend['yAxis.0.min'] = min
      this.lineBarOptions2.extend['yAxis.0.max'] = max
      this.lineBarOptions2.extend['yAxis.0.interval'] = (max - min) / 5

      const max2 = Math.max.apply(Math, value.map(o => { return o.yoy }))
      const min2 = Math.min.apply(Math, value.map(o => { return o.yoy }))
      this.lineBarOptions2.extend['yAxis.1.min'] = min2
      this.lineBarOptions2.extend['yAxis.1.max'] = max2
      this.lineBarOptions2.extend['yAxis.1.interval'] = (max2 - min2) / 5
      this.lineBarOptions2.chartData.rows = value
    }
  }
}
</script>
<style lang="less" scoped>
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  border-radius: 10px;
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 10px;
}
</style>
