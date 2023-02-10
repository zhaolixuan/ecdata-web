<template>
  <div class="enterprise-change-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple boxshadow">
          <j-card>
            <p class="j-chart-title mb20">近4季度电商企业迁入迁出趋势图</p><!-- 柱状+折现图 -->
            <!-- <ve-histogram v-on-echart :data="lineBarOptions1.chartData" :settings="lineBarOptions1.chartSettings" :extend="lineBarOptions1.extend" :colors="colors1"></ve-histogram> -->
            <ve-histogram v-on-echart :extend="lineBarOptions1.extend" :colors="colors1"></ve-histogram>
          </j-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple boxshadow">
          <j-card>
            <p class="j-chart-title mb20">近4季度电商企业新增注册和注销吊销趋势图</p><!-- 柱状+折现图 -->
            <!-- <ve-histogram v-on-echart :data="lineBarOptions2.chartData" :settings="lineBarOptions2.chartSettings" :extend="lineBarOptions2.extend" :colors="colors2"></ve-histogram> -->
            <ve-histogram v-on-echart :extend="lineBarOptions2.extend" :colors="colors2"></ve-histogram>
          </j-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getLast4QuarterData } from '../../api/api'
export default {
  components: {
    JCard
  },
  data () {
    return {
      seriesConfig: {
        barWidth: 8,
        showBackground: true,
        backgroundStyle: {
          color: '#EDF0FD',
          barBorderRadius: [10, 10, 0, 0]
        },
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0]
          }
        },
        name: '迁入(家)',
        data: [50, 50, 50, 50, 50, 50],
        type: 'bar'
      },
      lineBarOptions1: {
        extend: {
          xAxis,
          yAxis,
          dataZoom,
          tooltip,
          legend: {
            data: ['迁入(家)', '迁出(家)'],
            code: ['in', 'out'],
            icon: 'circle',
            left: 0
          },
          series: []
        }
      },
      lineBarOptions2: {
        extend: {
          xAxis,
          yAxis,
          dataZoom,
          tooltip,
          legend: {
            data: ['新增注册(家)', '注销吊销(家)'],
            code: ['reg', 'rev'],
            icon: 'circle',
            left: 0
          },
          series: []
        }
      },
      colors1: ['#4B66FE', '#EE6C65'],
      colors2: ['#43E5F4', '#EE6C65']
    }
  },

  created () {
    const xAxisData = []
    getLast4QuarterData().then(res => {
      const resData = res.data.data
      if (resData) {
        resData.forEach(item => {
          xAxisData.push(item.date)
        })

        const yAxisDATA1 = this.handleData(this.lineBarOptions1.extend.legend.code, resData)
        const yAxisDATA2 = this.handleData(this.lineBarOptions2.extend.legend.code, resData)

        this.lineBarOptions1.extend.series = this.lineBarOptions1.extend.legend.code.map((item, index) => {
          return { ...this.seriesConfig, name: this.lineBarOptions1.extend.legend.data[index], data: yAxisDATA1[index] }
        })

        this.lineBarOptions2.extend.series = this.lineBarOptions2.extend.legend.code.map((item, index) => {
          return { ...this.seriesConfig, name: this.lineBarOptions2.extend.legend.data[index], data: yAxisDATA2[index] }
        })
      }

      this.lineBarOptions1.extend.xAxis.data = xAxisData
      this.lineBarOptions2.extend.xAxis.data = xAxisData
    })
  },
  methods: {
    // 处理数据，转换成echart需要的格式
    handleData (arr, arrobj, indexSuffix) {
      const result = []
      for (let i = 0; i < arr.length; i++) {
        result[i] = []
        for (let j = 0; j < arrobj.length; j++) {
          result[i].push(arrobj[j][`${arr[i]}`])
        }
      }
      return result
    }
  }

}
</script>
<style lang="less" scoped>
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 10px;
}
</style>
