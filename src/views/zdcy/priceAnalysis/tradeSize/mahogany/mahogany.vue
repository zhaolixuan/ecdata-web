<template>
  <div class="mahogany-container">
    <j-card class="mt30 boxshadow">
      <check-form :boxData="boxData" @clickConfirm="init"></check-form>
    </j-card>
    <j-module title="价格区间交易规模分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">价格区间交易规模零售额占比分析</p><!-- 柱状+折现图 -->
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
      <j-card class="mt30 boxshadow">
        <p class="j-chart-title">价格区间交易规模零售额分析</p><!-- 柱状+折现图 -->
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
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getPriceScopeBar, getPriceScopeTable } from '../../api/api'
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
      colors: ['#4B66FE', '#00DCF0'],
      columnData: [
        { name: '价格区间', key: 'DIMENSION_ATTRIBUTE' },
        { name: '零售额（元）', key: 'AMOUNT' },
        { name: '零售额占比 (%)', key: 'lsezb' },
        { name: '零售额环比(%)', key: 'lsehb' },
        { name: '零售额同比（%）', key: 'lsetb' }
      ],
      tableStyle: {
        isShowSort: true
      },
      tableData: [],
      pageParams: { flag: false }
    }
  },
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
      this.getBarData()
      this.getTableData()
    },
    getBarData () {
      const data = {
        params: {
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      getPriceScopeBar(`${this.productType}`, data).then(res => {
        // this.tableData = res.data.data
        const resData = res.data.data
        if (resData) {
          this.lineBarOptions.extend.legend.data = resData.xnames
          this.lineBarOptions.extend.xAxis.data = resData.xnames
          this.lineBarOptions.extend.series = [{ ...this.seriesConfig, data: resData.series[0].data }]
        } else {
          this.lineBarOptions.extend.legend.data = []
          this.lineBarOptions.extend.xAxis.data = []
          this.lineBarOptions.extend.series = []
        }
      }).catch(e => {
        this.lineBarOptions.extend.legend.data = []
        this.lineBarOptions.extend.xAxis.data = []
        this.lineBarOptions.extend.series = []
      })
    },
    getTableData () {
      const data = {
        params: {
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      getPriceScopeTable(`${this.productType}`, data).then(res => {
        // this.tableData = res.data.data
        const resData = res.data.data
        if (resData) {
          this.tableData = resData
        } else {
          this.tableData = []
        }
      })
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
