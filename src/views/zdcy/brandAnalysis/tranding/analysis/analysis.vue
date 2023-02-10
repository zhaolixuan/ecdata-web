<template>
  <div class="market-size-container">
    <j-module title="品牌交易规模分析" class="mt14">
      <check-form :boxData="boxData" @clickConfirm="getCommonData"></check-form>
    </j-module>
    <j-module title="" class="mt14">
      <j-card>
        <p class="j-chart-title">TOP20品牌交易规模占比分析</p><!-- 柱状+折现图 -->
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :settings="lineBarOptions.chartSettings" :yAxis="lineBarOptions.yAxis" :colors="colors"></ve-histogram>
      </j-card>
    </j-module>
    <j-module title="" class="mt14">
      <j-card>
        <p class="j-chart-title">TOP20品牌交易规模分析</p><!-- 柱状+折现图 -->
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </j-module>
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import checkForm from '@/components/function/checkForm/check-form'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getCommonData } from '../../api/api'

export default {
  components: {
    JModule,
    JTable,
    JCard,
    checkForm
  },
  props: ['activeName'],
  data () {
    return {
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
      lineBarOptions: {
        yAxis: {
          ...yAxis,
          name: '占比（%）'
        },
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45
            }
          },
          dataZoom,
          tooltip,
          legend: {
            data: ['零售额占比（%）', '零售量占比（%）'],
            icon: 'circle',
            left: 0
          },
          series: [{
            barWidth: 8,
            backgroundStyle: {
              color: '#EDF0FD',
              barBorderRadius: [10, 10, 0, 0]
            },
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            name: '零售额占比（%）',
            data: [50, 50, 50, 50, 50, 50],
            type: 'bar'
          }, {
            barWidth: 8,
            backgroundStyle: {
              color: '#EDF0FD',
              barBorderRadius: [10, 10, 0, 0]
            },
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            // name: '零售量占比（%）',
            data: [20, 10, 0, 10, 20, 30],
            type: 'bar'
          }]
        }
      },
      colors: ['#4B66FE', '#EE6C65'],
      columnData: [
        { name: '品牌', key: 'BRAND_NAME' },
        { name: '零售额（元）', key: 'lse' },
        { name: '零售额占比（%）', key: 'lsezb' },
        // { name: '零售额同比（%）', key: 'lsehb' },
        // { name: '零售量（件）', key: 'lsl' },
        // { name: '零售量占比（%）', key: 'lslzb' },
        // { name: '零售量同比（%）', key: 'lslhb' }
      ],
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
    this.getCommonData()
  },

  methods: {
    getCommonData () {
      const data = {
        params: {
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      /**
       * 红木家具：TOP20_PINPAIJIAOYI_ZZT_HMJJ
          工艺品：TOP20_PINPAIJIAOYI_ZZT_GYP
          油画：TOP20_PINPAIJIAOYI_ZZT_YH
       */
      getCommonData(`TOP20_PINPAIJIAOYI_ZZT_${this.activeName}`, data).then(res => {
        const data = res.data.data || []
        this.lineBarOptions.extend.xAxis.data = data.map(item => {
          return item.BRAND_NAME
        })
        this.lineBarOptions.extend.series[0].data = data.map(item => {
          return item.lse
        })
        this.lineBarOptions.extend.series[1].data = data.map(item => {
          return item.lsl
        })
      })
      /**
         * 红木家具：TOP20_PINPAIJIAOYI_LIST_HMJJ
            工艺品：TOP20_PINPAIJIAOYI_LIST_GYP
            油画：TOP20_PINPAIJIAOYI_LIST_YH
         */
      getCommonData(`TOP20_PINPAIJIAOYI_LIST_${this.activeName}`, data).then(res => {
        this.tableData = res.data.data || []
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getCommonData()
    }
  },

  watch: {
    activeName (newval) {
      this.getCommonData()
    }
  }
}
</script>

<style lang="less" scoped>
.mt14 {
  margin-top: 14px;
}
.bg {
  background: #f6f7fb;
}
</style>
