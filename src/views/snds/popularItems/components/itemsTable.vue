<template>
  <div class="seller-table-container">
    <j-card>
      <p class="table-title">{{timeTitle}} 农产品网络零售 <span>{{active}}</span> 人气单品</p>
      <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getBestData } from '../api/api'
export default {
  props: ['boxData', 'activeArea'],
  data () {
    return {
      newData: this.boxData,
      active: this.activeArea,
      timeTitle: '',
      columnData: [
        { name: '商品名称', key: 'NAME' },
        { name: '零售额（元）', key: 'ABSOLUTE_VALUE' },
        { name: '店铺', key: 'SHOP_NAME' },
        { name: '渠道', key: 'PLATFORM' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },
  mounted () {
    this.getBestData()
  },
  methods: {
    onConfirm (val, area) {
      this.newData = val
      this.pageParams.page = 1
      this.getBestData()
    },
    onActive (val) {
      this.active = val
      this.pageParams.page = 1
      this.getBestData()
    },
    getBestData () {
      this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          dataMonth: this.newData.timeData.time.startTime,
          platForm: this.active
        }
      }
      getBestData(data).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.pageParams.total = Number(data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getBestData()
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
<style lang="less" scoped>
.table-title {
  font-size: 14px;
  color: #141D54;
  margin-bottom: 20px;
  span {
    color: #FF6F00;
  }
}
</style>
