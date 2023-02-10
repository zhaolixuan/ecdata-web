<template>
  <div class="mahogany-container">
    <j-card class="mt30 boxshadow">
      <check-form :boxData="boxData" @clickConfirm="init"></check-form>
    </j-card>
    <j-module title="价格区间渠道分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">价格区间渠道零售额占比分析</p><!-- 柱状+折现图 -->
        <!-- <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram> -->
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
      <j-card class="mt30 boxshadow">
        <p class="j-chart-title">价格区间渠道零售额分析（单位：元）</p>
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams"></j-table>
      </j-card>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import checkForm from '@/components/function/checkForm/check-form'
import { xAxis, yAxis, dataZoom, tooltip, colors } from '@/assets/js/echartsConfig'
import { getPriceChannelList, getPriceChannelData } from '../../api/api'
export default {
  props: ['productType'],
  components: {
    JModule,
    JTable,
    JCard,
    checkForm
  },
  data () {
    return {
      platformList: [], // 平台列表
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            startMonthTime: '', // 月度起始时间
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startTime: '',
            endTime: ''
          }
        }
      },
      seriesConfig: {
        barWidth: 16,
        showBackground: true,
        backgroundStyle: {
          color: '#EDF0FD',
          barBorderRadius: [10, 10, 0, 0]
        },
        name: '零售额占比(%)',
        type: 'bar'
      },
      lineBarOptions: {
        extend: {
          xAxis,
          yAxis,
          dataZoom,
          tooltip,
          legend: {
            icon: 'circle',
            left: 0
          },
          series: []
        }
      },
      colors: colors,
      columnData: [],
      tableStyle: {
        isShowSort: false
      },
      tableData: [],
      pageParams: {
        flag: false
      }
    }
  },
  created () { },
  mounted () {
    this.init()
  },
  watch: {
    productType () {
      this.init()
    }
  },
  methods: {
    init () {
      this.getPriceChannelList()
      this.getData()
    },
    getPriceChannelList () {
      const data = {
        params: {
          table: `${this.productType}`,
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      getPriceChannelList(data).then(res => {
        const resData = res.data.data
        const platformList = []
        const legendList = []
        const columnData = [{ name: '价格区间', key: 'DIMENSION_ATTRIBUTE' }]
        if (resData) {
          resData.forEach(item => {
            if (item) {
              platformList.push(item.PLATFORM)
              legendList.push(`${item.PLATFORM}零售额占比(%)`)
              columnData.push({ name: item.PLATFORM, key: `${item.PLATFORM}零售额` })
            }
          })
        }
        this.platformList = platformList
        this.columnData = columnData
        this.lineBarOptions.extend.legend.data = legendList
      })
    },
    getData () {
      const data = {
        params: {
          table: `${this.productType}`,
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      getPriceChannelData(data).then(res => {
        const resData = res.data.data
        this.tableData = resData
        const xnames = []
        if (resData) {
          resData.forEach(item => {
            xnames.push(item.DIMENSION_ATTRIBUTE)
          })
          this.lineBarOptions.extend.xAxis.data = xnames
          const yAxisDATA = this.handleData(this.platformList, resData, '零售额占比')
          this.lineBarOptions.extend.series = this.lineBarOptions.extend.legend.data.map((item, index) => {
            return { ...this.seriesConfig, name: item, data: yAxisDATA[index] }
          })
        }
      }).catch(e => {
        this.lineBarOptions.extend.xAxis.data = []
        this.lineBarOptions.extend.series = []
        this.tableData = []
      })
    },
    // 处理数据，转换成echart需要的格式
    handleData (arr, arrobj, indexSuffix) {
      const result = []
      for (let i = 0; i < arr.length; i++) {
        result[i] = []
        for (let j = 0; j < arrobj.length; j++) {
          result[i].push(arrobj[j][`${arr[i]}${indexSuffix}`])
        }
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
}
.bg {
  background: #f6f7fb;
}
</style>
