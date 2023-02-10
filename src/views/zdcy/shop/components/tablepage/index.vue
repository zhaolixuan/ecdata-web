<!-- 红木家具京东渠道网络零售额TOP10店铺 -->
<template>
  <j-card>
    <el-row :gutter="20" type="flex">
      <el-col :span="24">
        <div calss="j-table-warp">
          <j-table :columnData="columnData" :tableStyle="tableStyle" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </div>
      </el-col>
    </el-row>
  </j-card>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getTOPDPFXHMJJ } from '../../api'
export default {
  components: {
    JCard,
    JTable
  },
  props: {
    activeArea: {
      type: String
    },
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
        { name: '店铺名称', key: 'NAME' },
        { name: '零售额（元）', key: 'SHOP_AMOUNT' },
        { name: '零售量（件）', key: 'SHOP_VOLUME' },
        { name: '公司名称', key: 'COMPANY_NAME' },
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
    activeArea (n) {
      this.pageParams.page = 1
      this.getTOPDPFXHMJJData(this.activeArea, this.active)
    },
    active (n) {
      this.pageParams.page = 1
      this.getTOPDPFXHMJJData(this.activeArea, this.active)
    }
  },

  computed: {},

  mounted () {
    this.getTOPDPFXHMJJData(this.activeArea, this.active)
  },
  methods: {
    currentChange (val) {
      this.pageParams.page = val
      this.getTOPDPFXHMJJData(this.activeArea, this.active)
    },
    getTOPDPFXHMJJData (activeArea, active) {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          platForm: activeArea,
          orderBy: 'SHOP_VOLUME'
        }
      }
      getTOPDPFXHMJJ(data, active).then(res => {
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
