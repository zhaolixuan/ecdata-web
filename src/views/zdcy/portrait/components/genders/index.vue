<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <ve-histogram v-on-echart :extend="barOptions" height="360px" :colors="['#4B66FE']"></ve-histogram>
    </el-col>
    <el-col :span="12">
      <div calss="j-table-warp">
        <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import JTable from '@c/function/table'
import { xAxis, yAxis, tooltip } from '@/assets/js/echartsConfig'
import { getGLXFXSJU } from '../../api/api'
export default {
  components: {
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
        { name: '年龄', key: 'name' },
        { name: '用户占比（%）', key: 'pro' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10,
        flag: false
      },
      barOptions: {
        xAxis,
        yAxis: {
          ...yAxis,
          name: '%'
        },
        tooltip,
        legend: {
          show: false,
          icon: 'circle',
          left: 0,
        },
        grid: {
          top: '5%',
          bottom: '5%'
        },
        series: {
          barWidth : 16,
          showBackground: true,
          name: '用户占比（%）',
          type: 'bar',
          data: [],
          backgroundStyle: {
            color: '#EDF0FD',
            barBorderRadius: [10, 10, 0, 0]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        },
      },
    }
  },

  watch: {
    active (n) {
      this.getData()
    }
  },

  computed: {},

  mounted () {
    this.getData()
  },

  methods: {
    onConfirm(val){
      if (val) {
        this.newData = val
      }
      this.getData()
    },
    getData () {
      let data = {
        params: {
          dataType: this.active,
          type: '年龄分布',
          start: this.newData.timeData.time.startTime
        }
      }
      getGLXFXSJU(data).then(res => {
        let data = res.data.data
        if (data.length) {
          this.tableData = data
          let xname = []
          let ageData = []
          data.forEach(ele => {
            xname.push(ele.name)
            ageData.push(ele.pro)
          })
          this.barOptions.xAxis.data = xname
          this.barOptions.series.data = ageData
        }
      })
    },
    currentChange (val) {}
  }
}
</script>

<style lang="less" scoped>
</style>