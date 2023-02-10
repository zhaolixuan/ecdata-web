<!-- 红木家具京东渠道网络零售额TOP10店铺 -->
<template>
  <div>
    <j-module :title="`${titleType}${title}渠道网络零售额TOP10店铺`">
      <j-card>
        <el-row :gutter="20" type="flex">
          <el-col :span="24">
            <div class="j-table-warp">
              <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
            </div>
          </el-col>
        </el-row>
      </j-card>
    </j-module>
  </div>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JModule from '@/components/layout/jModule/j-module'
import JTable from '@c/function/table'
import { getCYQDWLLSETOP10DPU } from '../../api'
export default {
  components: {
    JModule,
    JCard,
    JTable
  },
  props: {
    title: {
      type: String
    },
    activeArea: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      titleType: '家具',
      columnData: [
        { name: '店铺名称', key: 'name' },
        { name: '零售额（元）', key: 'amount' },
        { name: '零售量（件）', key: 'volume' },
        { name: '公司名称', key: 'company' },
        { name: '排名', key: 'rank' },
        { name: '渠道', key: 'PLATFORM' },
        { name: '占比（%）', key: 'pro' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10,
        flag: false
      }
    }
  },

  computed: {},

  mounted () {
    this.getCYQDWLLSETOP10DPUData()
  },
  watch: {
    activeArea (n) {
      if (n === 'HMJJ') {
        this.titleType = '家具'
      } else if (n === 'GYP') {
        this.titleType = '服饰'
      } else if (n === 'YH') {
        this.titleType = '家电'
      }
      this.getCYQDWLLSETOP10DPUData()
    }
  },

  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getCYQDWLLSETOP10DPUData()
    },
    currentChange (val) {
      console.log(111112, val)
    },
    getCYQDWLLSETOP10DPUData () {
      const data = {
        params: {
          dataType: this.activeArea,
          name: this.title,
          start: this.newData.timeData.time.startTime
        }
      }
      getCYQDWLLSETOP10DPU(data).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style>
</style>
