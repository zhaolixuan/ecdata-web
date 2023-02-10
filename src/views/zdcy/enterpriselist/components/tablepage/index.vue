<!-- 红木家具京东渠道网络零售额TOP10店铺 -->
<template>
  <j-card>
    <el-row :gutter="20" type="flex">
      <el-col :span="24">
        <div calss="j-table-warp">
        <j-table class="mt20" :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </div>
      </el-col>
    </el-row>
  </j-card>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getYXQYMDLBIAO } from '../../api'
export default {
  components: {
    JCard,
    JTable
  },
  data () {
    return {
      /* eslint-disable */
      tableStyle: {
        // height: "350px",
        isShowSort: true
      },
      columnData: [
        { name: '企业名称', key: 'company_name' },
        { name: '资本市场', key: 'capital_market' },
        { name: '企业亮点', key: 'bright_spot' },
        { name: '联系方式', key: 'contact_way' },
        { name: '操作', key: '', isDetail: true },
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

  mounted () {
    this.getYXQYMDLBIAOData()
  },
  methods: {
    currentChange (val) {
      this.pageParams.page = val
      this.getYXQYMDLBIAOData()
    },
    getYXQYMDLBIAOData () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size
      }
      getYXQYMDLBIAO(data).then(res => {
        if (res.data.success) {
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
