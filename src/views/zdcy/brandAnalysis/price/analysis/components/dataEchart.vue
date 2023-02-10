<template>
  <el-row :gutter="20" class="mix-height">
    <el-col :span="14" class="height">
      <div class="grid-content bg-purple boxshadow">
        <j-card>
          <p class="j-chart-title">TOP20品牌价格分析</p><!-- 柱状+折现图 -->
          <!-- <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram> -->
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
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'

import { getCommonData } from '../../../api/api'
export default {
  components: {
    JCard,
    JTable
  },
  props: ['activeName'],
  data () {
    /* eslint-disable */
    return {
      lineBarOptions: {
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: [
            {
            ...yAxis,
            name: '成交均价（元）'
          },
           {
            ...yAxis,
            name: '单品均价（元）'
          },
          ],
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
      colors: ['#4B66FE', '#00DCF0', '#EE6C65'],
      columnData: [
        { name: '品牌', key: 'BRAND_NAME' },
        { name: '单品均价', key: 'dpjj' },
        { name: '成交均价', key: 'cjjj' }
      ],
      tableStyle: {
        height: "350px",
        isShowSort: true
      },
      tableData: [],
      pageParams: {
        flag: true,
        total: 500,
        page: 1,
        size: 10
      },
      requestEchartUrl: 'TOP20_PINPAIJIAGE_ZZT_HMJJ',
      requestTableUrl: 'TOP20_PINPAIJIAGE_LIST_HMJJ'
    }
  },

  computed: {},

  mounted () {
    this.getCommonData()
  },
  methods: {
    /**
     * 红木家具：TOP20_PINPAIJIAGE_ZZT_HMJJ
        工艺品：TOP20_PINPAIJIAGE_ZZT_GYP
        油画：TOP20_PINPAIJIAGE_ZZT_YH
     */
    getCommonData () {
      // let requestUrl = 'TOP20_PINPAIJIAGE_ZZT_HMJJ'
      getCommonData(this.requestEchartUrl).then(res => {
        const data = res.data.data
        this.lineBarOptions.extend.xAxis.data = data.xnames
        data.series.forEach(ele => {
          this.lineBarOptions.extend.legend.data.push(ele.name)
        })
        this.lineBarOptions.extend.series.push(
          ...JSON.parse(JSON.stringify(data.series))
        )
      })
      /**
       * 红木家具：TOP20_PINPAIJIAGE_LIST_HMJJ
          工艺品：TOP20_PINPAIJIAGE_LIST_GYP
          油画：TOP20_PINPAIJIAGE_LIST_YH
       */
      getCommonData(this.requestTableUrl).then(res => {
        const data = res.data.data
        console.log('table', data)
        // this.tableData = data.slice(0, 10)
        this.tableData = data
        console.log('this.tableData111', this.tableData)
        // this.lineBarOptions.extend.xAxis.data = data.xnames
        // data.series.forEach(ele => {
        //   this.lineBarOptions.extend.legend.data.push(ele.name)
        // })
        // this.lineBarOptions.extend.series.push(
        //   ...JSON.parse(JSON.stringify(data.series))
        // )
      })
    },
    currentChange (val) {
      console.log(111112, val)
    }
  },
  watch: {
    activeName (newval) {
      console.log('222222', newval)
      if (newval === 'mahogany') {
        this.requestEchartUrl = 'TOP20_PINPAIJIAGE_ZZT_HMJJ'
        this.requestTableUrl = 'TOP20_PINPAIJIAGE_LIST_HMJJ'
        this.getCommonData()
      } else if (newval === 'handicraft') {
        this.requestEchartUrl = 'TOP20_PINPAIJIAGE_ZZT_GYP'
        this.requestTableUrl = 'TOP20_PINPAIJIAGE_LIST_GYP'
        this.getCommonData()
      } else if (newval === 'painting') {
        this.requestEchartUrl = 'TOP20_PINPAIJIAGE_ZZT_YH'
        this.requestTableUrl = 'TOP20_PINPAIJIAGE_LIST_YH'
        this.getCommonData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mix-height {
  height: 500px;
}
.height {
  height: 100%
}
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  border-radius: 10px;
  height: 100%;
}
.mb20 {
  margin-bottom: 10px;
}
</style>
