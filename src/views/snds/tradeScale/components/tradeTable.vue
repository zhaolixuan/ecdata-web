<template>
  <div class="trade-table-container">
    <j-card>
      <p class="j-chart-title">{{timeTitle}} 农产品网络零售二级行业零售额发布（二级行业TOP30）</p>
      <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getTradeTable } from '../api/api'
export default {
  props: ['boxData'],
  data () {
    return {
      newData: this.boxData,
      timeTitle: '',
      columnData: [
        { name: '行业', key: 'name' },
        { name: '零售额（万元）', key: 'pro' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 6
      }
    }
  },
  mounted () {
    this.getTradeTable()
  },
  methods: {
    onConfirm (val) {
      this.newData = val
      this.getTradeTable()
    },
    getTradeTable () {
      this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          dataMonth: this.newData.timeData.time.startTime
        }
      }
      getTradeTable(data).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getTradeTable()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
