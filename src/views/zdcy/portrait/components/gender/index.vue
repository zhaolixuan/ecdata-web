<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <el-row :gutter="20" type="flex">
        <el-col :span="12">
          <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="['#4B66FE']"></ve-ring>
        </el-col>
        <el-col :span="12">
          <ve-ring v-on-echart :extend="gridConfig" height="250px" :colors="['#EE6C65']"></ve-ring>
        </el-col>
      </el-row>
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
// import { colors, tooltipItem } from '@/assets/js/echartsConfig'
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
        { name: '性别', key: 'name' },
        { name: '用户占比（%）', key: 'pro' }
      ],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 10,
        flag: false
      },
      pieConfig: {
        tooltip: {
          show: false
        },
        series: {
          radius: ['59%', '75%'],
          center: ['50%', '40%'],
          type: 'pie',
          data: [
            {value: 0, name: '男性'}
          ],
          label: {
            normal: {
              show: true,
              formatter: '{b}\n{c}%',
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22'
                // fontWeight: 'bold'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: 'rgba(20,29,84,0.12)'
            }
          }
        },
        legend: {
          data: ["男性"],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 'center',
          bottom: '20'
        }
      },
      gridConfig: {
        tooltip: {
          show: false
        },
        series: {
          radius: ['59%', '75%'],
          center: ['50%', '40%'],
          type: 'pie',
          data: [
            {value: 0, name: '女性'}
          ],
          label: {
            normal: {
              show: true,
              formatter: '{b}\n{c}%',
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22'
                // fontWeight: 'bold'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: 'rgba(20,29,84,0.12)'
            }
          }
        },
        legend: {
          data: ["女性"],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 'center',
          bottom: '20'
        }
      }
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
          type: '性别分布',
          start: this.newData.timeData.time.startTime
        }
      }
      getGLXFXSJU(data).then(res => {
        let data = res.data.data
        if (data.length) {
          this.tableData = data
          this.pieConfig.series.data[0].value = data[0].pro
          this.pieConfig.series.data[0].name = data[0].name
          this.pieConfig.legend.data[0] = data[0].name
          this.gridConfig.series.data[0].value = data[1].pro
          this.gridConfig.series.data[0].name = data[1].name
          this.gridConfig.legend.data[0] = data[1].name
          
        }
      })
    },
    currentChange (val) {}
  }
}
</script>

<style lang="less" scoped>
</style>