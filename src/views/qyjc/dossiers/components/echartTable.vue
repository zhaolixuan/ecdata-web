<template>
  <el-row :gutter="20" class="mt20" type="flex">
    <el-col :span="12">
      <div class="grid-content bg-purple boxshadow">
        <j-card>
          <p class="j-chart-title mb20">企业近12个月SKU上架数走势</p><!-- 柱状+折现图 -->
          <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
        </j-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div id="productList" class="grid-content bg-purple boxshadow">
        <j-card>
          <p class="j-chart-title mb20">企业近12个月热销单品清单</p><!-- 柱状+折现图 -->
          <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </j-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import JTable from '@c/function/table'
import JCard from '@c/layout/jCard/j-card'
import { getEnterpriseSKU12Month, getEnterpriseProductSale12Month } from '../../api/api'
export default {
  props: ['companyName'],
  components: {
    JCard,
    JTable
  },
  data () {
    return {
      lineBarOptions: {
        chartData: {
          columns: ['DATA_MONTH', 'num', 'yoy'],
          rows: []
        },
        chartSettings: {
          labelMap: {
            DATA_MONTH: '日期',
            num: 'SKU上架数(个)',
            mom: '同比增长(%)'
          },
          showLine: ['yoy'],
          axisSite: { right: ['yoy'] },
          yAxisName: ['个', '%']
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
      colors: ['#43E5F4', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      columnData: [
        { name: '商品名称', key: 'NAME' },
        { name: '商品品类', key: 'BRAND_NAME' },
        { name: '销售数量(万件)', key: 'ITEM_VOLUME' },
        { name: '销售金额(万元)', key: 'ITEM_AMOUNT' }
      ],
      tableStyle: {
        // maxHeight: 350,
        // height: 350,
        isShowSort: false
      },
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 5
      }
    }
  },
  mounted () {
    this.getEnterpriseSKU12Month()
    this.getEnterpriseProductSale12Month()
  },

  methods: {
    // 企业近12月SKU
    getEnterpriseSKU12Month () {
      const data = {
        params: {
          name: this.companyName
        }
      }
      getEnterpriseSKU12Month(data).then(res => {
        const value = res.data.data
        const max = Math.max.apply(Math, value.map(o => { return o.num }))
        const min = Math.min.apply(Math, value.map(o => { return o.num }))
        this.lineBarOptions.extend['yAxis.0.min'] = min
        this.lineBarOptions.extend['yAxis.0.max'] = max
        this.lineBarOptions.extend['yAxis.0.interval'] = (max - min) / 5

        const max2 = Math.max.apply(Math, value.map(o => { return o.mom }))
        const min2 = Math.min.apply(Math, value.map(o => { return o.mom }))
        this.lineBarOptions.extend['yAxis.1.min'] = min2
        this.lineBarOptions.extend['yAxis.1.max'] = max2
        this.lineBarOptions.extend['yAxis.1.interval'] = (max2 - min2) / 5
        this.lineBarOptions.chartData.rows = value
      })
    },
    // 企业近12月单品统计
    getEnterpriseProductSale12Month () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          name: this.companyName
        }
      }
      getEnterpriseProductSale12Month(data).then(res => {
        this.pageParams.total = Number(res.data.data.total)
        this.tableData = res.data.data.records
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getEnterpriseProductSale12Month()
    }
  }
}
</script>

<style lang="less" scoped>
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
  height: 100%;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 10px;
}
</style>
<style>
.productList /deep/ ::-webkit-scrollbar {
  display: inline;
}
#app #productList .el-table__body-wrapper {
  height: 350px !important;
}
</style>
