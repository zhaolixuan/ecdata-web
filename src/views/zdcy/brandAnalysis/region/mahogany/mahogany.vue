<template>
  <div class="mahogany-container mt30">
    <j-card>
      <div class="tabs-content">
        <span class="tabs-area" :class="{'active':areaActive===item.label}" @click="areaActive = item.label" v-for="(item,index) in areaData" :key="index">{{item.value}}</span>
      </div>
      <check-form :boxData="boxData" @clickConfirm="getTop20QuYuLingShouE"></check-form>
    </j-card>
    <j-module title="品牌区域分析">
      <j-card>
        <p class="j-chart-title">TOP20品牌区域零售额占比分析</p>
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
    </j-module>
    <j-card>
      <p class="j-chart-title">TOP20品牌区域零售额分析(单位：元）</p>
      <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" :tableStyle="tableStyle"></j-table>
    </j-card>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import checkForm from '@/components/function/checkForm/check-form'
import JTable from '@c/function/table'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getTop20Sale4CityLevel } from '../../api/api'
export default {
  props: ['productType'],
  data () {
    return {
      cityDim: ['新一线城市', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
      areaDim: ['东北地区', '中南地区', '华东地区', '华北地区', '西北地区', '西南地区'],
      areaActive: 'TOP_CITY_LEVEL_',
      areaData: [
        {
          id: 1,
          label: 'TOP_CITY_LEVEL_',
          value: '城市级别分析'
        }, {
          id: 2,
          label: 'TOP_AREA_ECONOMIC_',
          value: '六大地理区分析'
        }],
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
      seriesConfig: {
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
        type: 'bar',
        stack: '占比'
      },
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
  components: {
    JModule,
    checkForm,
    JCard,
    JTable
  },
  mounted () {
    this.changeTabs()
  },
  watch: {
    areaActive () {
      this.changeTabs()
    },
    productType () {
      this.changeTabs()
    }
  },
  methods: {
    changeTabs () {
      const columnDataArry = [{ name: '品牌名称', key: 'BRAND_NAME' }]
      if (this.areaActive === 'TOP_AREA_ECONOMIC_') {
        this.lineBarOptions.extend.legend.data = this.areaDim
      } else {
        this.lineBarOptions.extend.legend.data = this.cityDim
      }
      this.lineBarOptions.extend.legend.data.forEach(item => {
        columnDataArry.push({ name: item, key: `${item}销售额` })
      })
      this.columnData = columnDataArry
      this.getTop20QuYuLingShouE()
    },
    getTop20QuYuLingShouE () {
      const url = `${this.areaActive}${this.productType}`
      const data = {
        params: {
          start: this.boxData.timeData.time.startTime,
          end: this.boxData.timeData.time.endTime,
          dataType: this.boxData.timeData.model
        }
      }
      getTop20Sale4CityLevel(url, data).then(res => {
        this.tableData = res.data.data
        const resData = res.data.data
        const xnames = []
        if (resData) {
          resData.forEach(item => {
            xnames.push(item.BRAND_NAME)
          })
          const yAxisDATA = this.handleData(this.lineBarOptions.extend.legend.data, resData, '销售额占比')
          this.lineBarOptions.extend.xAxis.data = xnames
          this.lineBarOptions.extend.series = this.lineBarOptions.extend.legend.data.map((item, index) => {
            return { ...this.seriesConfig, name: item, data: yAxisDATA[index] }
          })
        }
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
.bg {
  background: #f6f7fb;
}
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
</style>
