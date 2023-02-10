<!-- 原材料监测 -->
<template>
  <div>
    <el-select v-model="value" filterable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <j-card style="margin-top: 15px;">
      <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getHQSYYCLMCHENG, getYCLJGSCLBIAO } from './api'
export default {
  data () {
    return {
      options: [],
      value: '',
      columnData: [
        { name: '商品名称', key: 'redwood_name' },
        { name: '市场报价', key: 'quote_market' },
        { name: '单位', key: 'unit' },
        { name: '众价', key: 'public_price' },
        { name: '时间', key: 'date_time' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },
  components: {
    JCard,
    JTable
  },

  computed: {},

  watch: {
    value (n) {
      this.pageParams.page = 1
      this.getYCLJGSCLBIAOData()
    }
  },

  mounted () {
    this.getHQSYYCLMCHENGData()
  },

  methods: {
    currentChange (val) {
      this.pageParams.page = val
      this.getYCLJGSCLBIAOData()
    },
    getHQSYYCLMCHENGData () {
      getHQSYYCLMCHENG().then(res => {
        if (res.data.success) {
          this.options = []
          res.data.data.forEach((item, i) => {
            this.options.push({
              value: item.redwood_name,
              label: item.redwood_name
            })
          })
          this.value = this.options[0].label
        }
      })
    },
    getYCLJGSCLBIAOData () {
      const data = { current: this.pageParams.page, size: this.pageParams.size, condition: { name: this.value } }
      getYCLJGSCLBIAO(data).then(res => {
        if (res.data.success) {
          this.pageParams.total = Number(res.data.data.pages)
          this.tableData = res.data.data.records
        }
      })
    }
  }

}
</script>

<style>
</style>
