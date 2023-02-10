<template>
  <div class="analysis-container mt30">
    <check-form class="boxshadow" :boxData="boxData" @clickConfirm="init"></check-form>
    <j-module title="品牌价格零售额分析">
      <el-row :gutter="20" class="mix-height" type="flex">
        <el-col :span="14" class="height">
          <div class="grid-content bg-purple boxshadow">
            <j-card>
              <p class="j-chart-title">TOP20品牌价格分析</p><!-- 柱状+折现图 -->
              <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
            </j-card>
          </div>
        </el-col>
        <el-col :span="10" class="height">
          <div class="grid-content bg-purple boxshadow">
            <j-card>
              <p class="j-chart-title mb20">TOP20品牌价格分析</p>
              <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
            </j-card>
          </div>
        </el-col>
      </el-row>
    </j-module>
    <j-module title="品牌价格零售量分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">TOP20品牌价格区间零售量占比分析</p><!-- 柱状+折现图 -->
        <ve-histogram v-on-echart :extend="lineBarOptions1.extend" :yAxis="lineBarOptions1.yAxis" :colors="colors"></ve-histogram>
      </j-card>
      <j-card class="mt30 boxshadow">
        <p class="j-chart-title">TOP20品牌价格区间零售量分析(单位：件)</p>
        <j-table :columnData="columnData1" :tableData="tableData1" :tableStyle="tableStyle" :pageParams="pageParams1" @currentChange="currentChange1"></j-table>
      </j-card>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import checkForm from '@/components/function/checkForm/check-form'
import JTable from '@c/function/table'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'

import { getCommonData } from '../../api/api'

export default {
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
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      lineBarOptions: {
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45
            }
          },
          yAxis,
          dataZoom,
          tooltip,
          legend: {
            data: [],
            icon: 'circle',
            left: 0
          },
          series: []
        }
      },
      columnData: [
        { name: '品牌', key: 'BRAND_NAME' },
        { name: '单品均价(元)', key: 'dpjj' },
        { name: '成交均价(元)', key: 'cjjj' }
      ],
      tableStyle: {
        isShowSort: false
      },
      priceTypetableData: [],
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 6,
        flag: true
      },
      lineBarOptions1: {
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
            data: [],
            icon: 'circle',
            left: 0
          },
          series: []
        }
      },
      columnData1: [],
      priceRangetableData: [],
      tableData1: [],
      pageParams1: {
        total: 0,
        page: 1,
        size: 6,
        flag: true
      }
    }
  },
  components: {
    JModule,
    checkForm,
    JCard,
    JTable
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.pageParams1.page = 1
      this.pageParams.page = 1
      this.getBrandPriceTypeData()
      this.getBrandPriceRangeData()
    },
    // 品牌价格类型分析
    getBrandPriceTypeData () {
      const data = {
        params: {
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      // 柱图
      getCommonData(`TOP20_PINPAIJIAGE_ZZT_${this.activeName}`, data).then(res => {
        const data = res.data.data
        this.lineBarOptions.extend.xAxis.data = []
        this.lineBarOptions.extend.legend.data = []
        this.lineBarOptions.extend.series = []
        this.lineBarOptions.extend.xAxis.data = data.xnames
        data.series.forEach(ele => {
          this.lineBarOptions.extend.legend.data.push(ele.name)
        })
        this.lineBarOptions.extend.series.push(
          ...JSON.parse(JSON.stringify(data.series))
        )
        this.lineBarOptions.extend.series = this.lineBarOptions.extend.series.map((item, index) => {
          if (index !== this.lineBarOptions.extend.series.length - 1) {
            item.itemStyle = null
          }
          if (index !== 0) {
            item.backgroundStyle = null
          }
          return item
        })
      })

      // 表格
      getCommonData(`TOP20_PINPAIJIAGE_LIST_${this.activeName}`, data).then(res => {
        const data = res.data.data
        this.priceTypetableData = data
        if (!data) {
          this.tableData = data
          return
        }
        this.getTablePageData('priceTypetableData', '')
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getTablePageData('priceTypetableData', '')
    },

    // 品牌价格区间分析
    getBrandPriceRangeData () {
      const data = {
        params: {
          dataMonth: this.boxData.timeData.time.startTime
        }
      }
      const columnData1 = [
        { name: '品牌', key: 'BRAND_NAME' }
      ]
      // 柱图
      getCommonData(`TOP20_PINPAIJIAGE_LSL_ZZT_${this.activeName}`, data).then(res => {
        const data = res.data.data
        this.lineBarOptions1.extend.xAxis.data = []
        this.lineBarOptions1.extend.legend.data = []
        this.lineBarOptions1.extend.series = []
        this.lineBarOptions1.extend.xAxis.data = data.xnames
        data.series.forEach(ele => {
          this.lineBarOptions1.extend.legend.data.push(ele.name)
          columnData1.push({ name: ele.name, key: ele.name + 'value' })
        })
        this.columnData1 = columnData1
        this.lineBarOptions1.extend.series.push(
          ...JSON.parse(JSON.stringify(data.series))
        )
        this.lineBarOptions1.extend.series.map((item, index) => {
          if (index !== this.lineBarOptions1.extend.series.length - 1) {
            item.itemStyle = null
          }
          if (index !== 0) {
            item.backgroundStyle = null
          }
          return item
        })
      })

      // 表格
      getCommonData(`TOP20_PINPAIJIAGE_LSL_LIST_${this.activeName}`, data).then(res => {
        const data = res.data.data
        this.priceRangetableData = data
        if (!data) {
          this.tableData1 = data
          return
        }
        this.getTablePageData('priceRangetableData', '1')
      })
    },
    currentChange1 (val) {
      this.pageParams1.page = val
      this.getTablePageData('priceRangetableData', '1')
    },
    // ---------------------    基础方法      ---------------------
    // 前端表格分页数据获取
    getTablePageData (oTableData, tableIndex) {
      const length = this[`${oTableData}`].length
      const pageParams = this[`pageParams${tableIndex}`]
      const startIndex = (pageParams.page - 1) * pageParams.size
      const endIndex = pageParams.page * pageParams.size
      this[`pageParams${tableIndex}`].total = length
      this[`tableData${tableIndex}`] = this[`${oTableData}`].slice(startIndex, endIndex >= length ? length : endIndex)
    }
  },
  watch: {
    activeName (newval) {
      this.pageParams1.page = 1
      this.pageParams.page = 1
      this.init()
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
  height: 100%;
}
.bg {
  background: #f6f7fb;
}
</style>
