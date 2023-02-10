<template>
  <div class="mahogany-container">
    <j-card class="mt30 boxshadow">
      <check-form :boxData="boxData"></check-form>
    </j-card>
    <j-module title="价格区间品牌分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">价格区间TOP20品牌交易规模分析</p><!-- 柱状+折现图 -->
        <!-- <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram> -->
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
      <j-card class="mt30 boxshadow">
        <p class="j-chart-title">价格区间TOP20品牌交易规模分析</p><!-- 柱状+折现图 -->
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
      <j-card class="mt30 boxshadow">
        <p class="j-chart-title">价格区间畅销单品分析</p><!-- 柱状+折现图 -->
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
export default {
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
          model: '近12个月',
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startTime: '',
            endTime: ''
          },
          list: [{
            value: '近12个月'
          }, {
            value: '月度'
          }]
        }
      },
      lineBarOptions: {
        extend: {
          xAxis,
          // yAxis,
          yAxis: {
            ...yAxis,
            name: '家'
          },
          dataZoom,
          tooltip,
          legend: {
            data: ['零售额占比', '零售量占比'],
            icon: 'circle',
            left: 0
          },
          series: [{
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
            name: '零售额占比（%）',
            data: [50, 50, 50, 50, 50, 50],
            type: 'bar'
          }, {
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
            name: '零售量占比（%）',
            data: [20, 10, 0, 10, 20, 30],
            type: 'bar'
          }]
        }
      },
      colors: ['#4B66FE', '#00DCF0'],
      columnData: [
        { name: '价格区间', key: 'date' },
        { name: '零售额（万元）', key: 'value' },
        { name: '零售额占比 (%)', key: 'value' },
        { name: '零售额环比(%)', key: 'value' },
        { name: '零售额同比（%）', key: 'value' },
        { name: '零售量 (万件) ', key: 'value' },
        { name: '零售量占比（%）', key: 'value' },
        { name: '零售量环比（%）', key: 'value' },
        { name: '零售量同比（%）', key: 'value' }
      ],
      tableStyle: {
        // height: "350px",
        isShowSort: true
      },
      tableData: [{
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        value: 2400021,
        rate: 12
      }],
      pageParams: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    currentChange (val) {
      console.log(111112, val)
    }
  }
}
</script>
<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  border-radius: 10px;
  box-sizing: border-box;
}
.bg {
  background: #f6f7fb;
}
</style>
