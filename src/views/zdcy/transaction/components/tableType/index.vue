<template>
  <div class="table-type-container">
    <j-card>
      <p class="j-chart-title">{{title}}细分品类交易规模分析</p>
      <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
    </div>
</template>
<script>
import JTable from '@c/function/table'
import JCard from '@c/layout/jCard/j-card'
import { getXFPLJYGMFXITable } from '../../api/api'
export default {
  props: {
    active: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newData: this.boxData,
      columnData: [
        { name: '细分品类', key: 'name' },
        { name: '零售额（元）', key: 'sum' },
        { name: '占比（%）', key: 'pro' },
        { name: '同比增长（%）', key: 'yoy' },
        { name: '环比（%）', key: 'mom' }
      ],
      tableData: [],
      tableStyle: {
        height: '330px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 6
      }
    }
  },
  watch: {
    active (n) {
      this.pageParams.page = 1
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
   methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.pageParams.page = 1
      this.getData()
    },
    getData () {
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          dataType: this.active,
          start: this.newData.timeData.time.startTime
        }
      }
      getXFPLJYGMFXITable(data).then(res => {
        if (res.data.code === 200) {
          this.pageParams.total = Number(res.data.data.total)
          this.tableData = res.data.data.records
        }
      })
    },  
    currentChange (val) {
      this.pageParams.page = val
      this.getData()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
<style lang="less" scoped>
.table-type-container {
  margin-top: 30px
}
</style>