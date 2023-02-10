<template>
  <j-card class="total-container">
    <el-select v-model="mapTableType" filterable placeholder="请选择">
      <el-option key="in" label="迁入企业数" value="0"></el-option>
      <el-option key="out" label="迁出企业数" value="1"></el-option>
    </el-select>
    <el-row :gutter="20" class="mix-height mt20">
      <el-col :span="16" class="height">
        <!-- <j-map></j-map> -->
        <map-chart :id="`map`" :dataSource="buyMapData"></map-chart>
      </el-col>
      <el-col :span="8" class="height">
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </el-col>
    </el-row>
  </j-card>

</template>

<script>
import JTable from '@c/function/table'
// import JMap from './map'
import mapChart from '@/components/echarts/mapChart';
import JCard from '@c/layout/jCard/j-card'
import { getOriginalProvinceData } from '../../api/api'
export default {
  components: {
    JCard,
    JTable,
    // JMap,
    mapChart
  },
  data () {
    return {
      mapTableType: '0',
      columnData: [],
      tableStyle: {
        // height: "350px",
        isShowSort: true
      },
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 10
      },
      buyMapData: []
    }
  },
  mounted () {
    this.changeTableColumn()
    this.getTableData()
  },
  watch: {
    mapTableType () {
      this.pageParams.page = 0
      this.pageParams.total = 0
      this.changeTableColumn()
      this.getTableData()
    }
  },
  methods: {
    changeTableColumn () {
      if (this.mapTableType === '1') {
        this.columnData = [
          { name: '迁出上档省份', key: 'name' },
          { name: '迁出企业数（家）', key: 'value' },
          { name: '占比（%）', key: 'pro' }
        ]
      } else {
        this.columnData = [
          { name: '迁入来源省份', key: 'name' },
          { name: '迁入企业数（家）', key: 'value' },
          { name: '占比（%）', key: 'pro' }
        ]
      }
    },
    getTableData () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.mapTableType
        }
      }
      getOriginalProvinceData(data).then(res => {
        const data = res.data
        if (data.code === 200) {
          this.tableData = data.data.records
          this.pageParams.total = Number(data.data.total)
          this.buyMapData = data.data.records.map(item => {
            return {
              name: item.name,
              value: item.value,
              unit: '家'
            }
          })
        }
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getTableData()
    }
  }
}
</script>

<style lang="less" scoped>
.mix-height {
  height: 500px;
  overflow: hidden;
}
.height {
  height: 100%;
}
.total-container {
  background: #ffffff;
}
.mt20 {
  margin-top: 20px;
}
</style>
