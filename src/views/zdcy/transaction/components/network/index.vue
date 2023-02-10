<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="24">
      <j-card>
        <!-- <p class="j-chart-title">红木家具各电商渠道网络零售额占比分析</p> -->
        <!-- <ve-line v-on-echart :series="regionLineOption.series" :tooltip="regionLineOption.tooltip" :xAxis="regionLineOption.xAxis" :yAxis="regionLineOption.yAxis" :dataZoom="regionLineOption.dataZoom" :legend="regionLineOption.legend" :colors="regionLineOption.color"></ve-line> -->
        <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getPLJYFXHYJGFXIData } from '../../api/api'
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
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      columnData: [
        { name: '日期', key: 'date' },
        { name: '细分品类', key: 'name' },
        { name: '客单价（元）', key: 'price' }
      ],
      tableData: [],
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
    currentChange (val) {
      this.pageParams.page = val
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
      getPLJYFXHYJGFXIData(data).then(res => {
        let data = res.data.data
        if (data) {
          this.tableData = data.records
          this.pageParams.total = Number(data.total)
        }
      })
    }
  }
}
</script>

<style>

</style>