<!-- 红木家具京东渠道网络零售额TOP10店铺 -->
<template>
  <j-card>
    <el-row :gutter="20" type="flex">
      <el-col :span="24">
        <div calss="j-table-warp">
          <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </div>
      </el-col>
    </el-row>
  </j-card>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getTOPDANPIN } from '../../api'

export default {
  components: {
    JCard,
    JTable
  },

  props: {
    // activeArea: {
    //   type: String
    // },
    active: {
      type: String
    }
  },

  data () {
    return {
      /* eslint-disable */
      tableStyle: {
        // height: "350px",
        isShowSort: true
      },
      columnData: [
        // { name: '序号', type: 'index', width: 80 },
        { name: '商品名称', key: 'NAME', width: 500 },
        { name: '零售额（元）', key: 'ITEM_AMOUNT' },
        { name: '零售量（件）', key: 'ITEM_VOLUME' },
        { name: '成交均价（元）', key: 'pjjg' },
        // { name: '品牌', key: 'BRAND_NAME' },
        { name: '渠道（平台）', key: 'PLATFORM' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },

  watch: {
    active (n) {
      this.pageParams.page = 1
      this.getTOPDANPINData( this.active)
    }
  },

  computed: {},

  mounted () {
    this.getTOPDANPINData( this.active)
  },

  methods: {
    currentChange (val) {
      this.pageParams.page = val
      this.getTOPDANPINData( this.active)
    },
    getTOPDANPINData (active) {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          orderBy: 'ITEM_VOLUME'
        }
      }
      getTOPDANPIN(data, active).then(res => {
        if (res.data.success) {
          this.pageParams.total = Number(res.data.data.total)
          this.tableData = res.data.data.records
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
//
</style>
