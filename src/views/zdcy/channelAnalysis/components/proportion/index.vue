<!-- 红木家具各电商渠道网络零售额占比分析 -->
<template>
  <j-card>
    <el-row :gutter="20" type="flex">
      <el-col :span="10">
        <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="colors"></ve-ring>
      </el-col>
      <el-col :span="14">
        <div calss="j-table-warp">
          <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </div>
      </el-col>
    </el-row>
  </j-card>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { colors, tooltipItem } from '@/assets/js/echartsConfig'
import { getCYGDSQDWLLSEZBFXI, getCYGDSQDWLLSEZBFXITable } from '../../api'
export default {
  components: {
    JCard,
    JTable
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    active (n) {
      this.getCYGDSQDWLLSEZBFXIData()
      this.getCYGDSQDWLLSEZBFXITable()
    }
  },

  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      columnData: [
        { name: '渠道', key: 'name' },
        { name: '时间', key: 'date' },
        { name: '零售额（元）', key: 'amount' },
        { name: '零售量（件）', key: 'quantity' },
        { name: '占比（%）', key: 'pro' },
        { name: '同比增长（%）', key: 'yoy' },
        { name: '环比（%）', key: 'mom' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 4,
        flag: true
      },
      colors: colors,
      pieConfig: {
        tooltip: tooltipItem,
        series: {
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ],
          label: {
            normal: {
              show: false,
              formatter: '{b}\n{d}%',
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22'
                // fontWeight: 'bold'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: 'rgba(20,29,84,0.12)'
            }
          }
        },
        legend: {
          data: [],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 20,
          top: 'center'
        },
      }
    }
  },

  computed: {},

  mounted () {
    this.getCYGDSQDWLLSEZBFXIData()
    this.getCYGDSQDWLLSEZBFXITable()
  },

  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.pageParams.page = 1
      this.getCYGDSQDWLLSEZBFXIData()
      this.getCYGDSQDWLLSEZBFXITable()
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getCYGDSQDWLLSEZBFXITable()
    },
    getCYGDSQDWLLSEZBFXIData () {
      let dataType = this.active
      const data = { 
        params: { 
          dataType: this.active,
          start: this.newData.timeData.time.startTime
        }
      }
      getCYGDSQDWLLSEZBFXI(data).then(res => {
        if (res.data.success) {
          this.pieConfig.series.data = []
          this.pieConfig.legend.data = []
          res.data.data.forEach((item, i) => {
            this.pieConfig.series.data.push({ value: item.amount, name: item.name })
            this.pieConfig.legend.data.push(item.name)
          })
        }
      })
    },
    getCYGDSQDWLLSEZBFXITable () {
      const data = { 
        current: this.pageParams.page,
        size: this.pageParams.size, 
        condition: { 
          dataType: this.active,
          start: this.newData.timeData.time.startTime
        }
      }
      getCYGDSQDWLLSEZBFXITable(data).then(res => {
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
