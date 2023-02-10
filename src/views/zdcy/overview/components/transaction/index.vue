<!-- 网络零售市场交易规模变化趋势 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">月度网络零售额增速走势</p>
        <ve-line v-on-echart :series="regionLineOption.series" :xAxis="regionLineOption.xAxis" :tooltip="regionLineOption.tooltip" :yAxis="regionLineOption.yAxis" :dataZoom="regionLineOption.dataZoom" :legend="regionLineOption.legend" :colors="['#4B66FE','#EE6C65']"></ve-line>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { xAxis, yAxis, dataZoom, tooltip } from '@/assets/js/echartsConfig'
import { getpagesCYWLLSSCLJJYGMBHQSHI, getCYWLLSSCLJJYGMBHQSHI } from '../../api'
export default {
  components: {
    JCard,
    JTable
  },
  data () {
    /* eslint-disable */
    return {
      newData: this.boxData,
      regionLineOption: {
        xAxis,
        yAxis:[{
          ...yAxis,
          name: '元'
        }, {
          ...yAxis,
          name: '件'
        }],
        tooltip,
        dataZoom,
        legend: {
          icon: 'circle',
          left: 'left',
          data: ['累计零售额（元）']
        },
        series: [
          {
            name:'累计零售额（元）',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: [0,50,150,0],
            areaStyle:{
              color:{
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[
                {
                  offset: 0,
                  color: 'rgba(232, 235, 255, 1)', // 0% 处的颜色
                }, 
                {
                  offset: 1, 
                  color: 'rgba(232, 235, 255, 1)' // 100% 处的颜色
                }
              ]
              }
            },
            lineStyle: {
              color: '#4B66FE'
            }
          },
          // {
          //   name:'累计零售量（件）',
          //   type: 'line',
          //   yAxisIndex: 1,
          //   symbol: 'circle',
          //   smooth: true,
          //   data: [0,150,50,0],
          //   areaStyle:{
          //     color:{
          //       type:'linear',
          //       x:0,
          //       y:0,
          //       x2:0,
          //       y2:1,
          //       colorStops:[
          //         {
          //           offset: 0,
          //           color: 'rgba(225, 37, 27, 0.25)', // 0% 处的颜色
          //         }, 
          //         {
          //           offset: 1, 
          //           color: 'rgba(225, 37, 27, 0)' // 100% 处的颜色
          //         }
          //       ]
          //     }
          //   },
          //   lineStyle: {
          //     color: '#EE6C65'
          //   }
          // }
        ]
      },
      columnData: [
        { name: '时间', key: 'date' },
        { name: '零售额（元）', key: 'amount' },
        // { name: '零售量（件）', key: 'quantity' },
        { name: '同比增长（%）', key: 'onYear' },
        { name: '环比（%）', key: 'onMonth' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },

  computed: {},

  props: {
    activeArea: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: ()=>{}
    }
  },
  watch: {
    activeArea (n) {
      this.pageParams.page = 1
      this.CYWLLSSCLJJYGMBHQSHI()
      this.YWLLSSCLJJYGMBHQSHI()
    }
  },

  mounted () {
    this.CYWLLSSCLJJYGMBHQSHI()
    this.YWLLSSCLJJYGMBHQSHI()
  },

  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.pageParams.page = 1
      this.CYWLLSSCLJJYGMBHQSHI()
      this.YWLLSSCLJJYGMBHQSHI()
    },
    currentChange (val) {
      this.pageParams.page = val
      this.CYWLLSSCLJJYGMBHQSHI()
    },
    YWLLSSCLJJYGMBHQSHI () {
      const data = { 
        params: { 
          dataType: this.activeArea,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime  
        } 
      }
      getCYWLLSSCLJJYGMBHQSHI(data).then(res => {
        if (res.data.code === 200) {
          let amount = []
          // let quantity = []
          let xAxisData = []
          res.data.data.forEach((item, i) => {
            amount.push(item.amount)
            // quantity.push(item.quantity)
            xAxisData.push(item.date)
          })
          this.regionLineOption.xAxis = {
            ...xAxis,
            data: xAxisData
          }
          this.regionLineOption.series[0].data = amount
          // this.regionLineOption.series[1].data = quantity
        }
      })
    },
    CYWLLSSCLJJYGMBHQSHI () {
      const data = { 
        current: this.pageParams.page, 
        size: 10, 
        condition: { 
          dataType: this.activeArea,
          start: this.newData.timeData.time.startTime,
          end: this.newData.timeData.time.endTime
        } 
      }
      getpagesCYWLLSSCLJJYGMBHQSHI(data).then(res => {
        if (res.data.code === 200) {
          this.pageParams.total = Number(res.data.data.total)
          this.tableData = res.data.data.records
        }
      })
    }
  }
}
</script>

<style>

</style>
