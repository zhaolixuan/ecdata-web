<template>
  <div class="mahogany-container mt30">
    <check-form :boxData="boxData"></check-form>
    <j-module title="品牌热度分析">
      <j-card>
        <p class="j-chart-title">TOP20品牌热度分析</p>
        <ve-histogram v-on-echart :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
    </j-module>
    <j-card>
        <p class="j-chart-title">TOP20品牌热度分析</p><!-- 柱状+折现图 -->
         <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import checkForm from '@/components/function/checkForm/check-form'
import JTable from '@c/function/table'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
export default {
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
            value: '季度'
          }, {
            value: '月度'
          }]
        }
      },
      colors: ['#4B66FE'],
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
            data: ['收藏人数（万人）'],
            icon: 'circle',
            left: 0
          },
          series: [{
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
            },
            name: '收藏人数（万人）',
            data: [50, 50, 50, 20, 50, 50],
            type: 'bar'
          }]
        }
      },
      columnData: [
        { name: '时间', key: 'date' },
        { name: '行业', key: 'industry' },
        { name: '网络零售额（元）', key: 'value' },
        { name: '占比（%）', key: 'value' },
        { name: '同比（%）', key: 'rate' }
      ],
      tableStyle: {
        // height: "350px",
        isShowSort: false
      },
      tableData: [{
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
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
  components: {
    JModule,
    checkForm,
    JCard,
    JTable
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
.bg {
  background: #f6f7fb;
}
</style>
