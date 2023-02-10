<template>
  <div class="j-collapse-warp">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item :title="`${titleType}${item.title}`" :name="item.name" v-for="(item, index) in collapseData" :key="index">
        <j-card>
          <el-row :gutter="20" type="flex">
            <el-col :span="10">
              <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="colors"></ve-ring>
            </el-col>
            <el-col :span="14">
              <div class="j-table-warp">
                <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
              </div>
            </el-col>
          </el-row>
        </j-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import JTable from '@c/function/table'
import { colors, tooltipItem } from '@/assets/js/echartsConfig'
import { getXFZPHFXI, getXFZPHFXITable } from '../../api'
export default {
  components: {
    JCard,
    JTable
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      activeNames: '分风格类型',
      columnData: [
        { name: '细分品类', key: 'name' },
        { name: '零售额（元）', key: 'value' },
        { name: '占比（%）', key: 'pro' },
        { name: '同比增长（%）', key: 'yoy' },
        { name: '环比（%）', key: 'mom' }
      ],
      titleType: '家具',
      hmjjData: [{
        title: '风格分析',
        name: '分风格类型'
      }, {
        title: '材质分析',
        name: '分材质类型'
      }, {
        title: '特色产地分析',
        name: '分产地'
      }, {
        title: '饰面工艺分析',
        name: '分饰面工艺类型'
      }, {
        title: '独板分析',
        name: '分独板类型'
      }, {
        title: '榫卯分析',
        name: '分榫卯类型'
      }, {
        title: '定制分析',
        name: '分定制类型'
      }, {
        title: '形状分析',
        name: '分形状类型'
      }],
      gypData: [{
        title: '风格分析',
        name: '分风格类型'
      }, {
        title: '材质分析',
        name: '分材质类型'
      }, {
        title: '特色产地分析',
        name: '分产地'
      }],
      yhData: [{
        title: '风格分析',
        name: '分风格类型'
      }, {
        title: '特色产地分析',
        name: '分产地'
      }, {
        title: '材质分析',
        name: '分材质类型'
      }, {
        title: '题材分析',
        name: '分题材'
      }],
      tableData: [],
      pageParams: {
        total: 500,
        page: 1,
        size: 5
      },
      // collapseData: this.hmjjData,
      colors: colors,
      pieConfig: {
        tooltip: tooltipItem,
        series: {
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          label: {
            normal: {
              show: false,
              formatter: '{b}\n{d}%',
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
          data: [],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 10,
          right: 10,
          top: 'center',
          formatter (name) {
            if (name.length > 12) {
              return name.slice(0, 12) + '...'
            }
            return name
          }
        },
      }
    }
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => { }
    }
  },

  watch: {
    active (n) {
      if (n === 'HMJJ') {
        this.titleType = '家具'
      } else if (n === 'GYP') {
        this.titleType = '服饰'
      } else if (n === 'YH') {
        this.titleType = '家电'
      }
      this.pageParams.page = 1
      this.getXFZPHFXIData(this.activeNames)
      this.getXFZPHFXITable(this.activeNames)
    }
  },

  computed: {
    collapseData () {
      if (this.titleType === '家具') {
        return this.hmjjData
      } else if (this.titleType === '服饰') {
        return this.gypData
      } else if (this.titleType === '家电') {
        return this.yhData
      }
    }
  },

  mounted () {
    this.getXFZPHFXIData(this.activeNames)
    this.getXFZPHFXITable(this.activeNames)
  },

  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.pageParams.page = 1
      console.log(this.pageParams.page)
      this.getXFZPHFXIData(this.activeNames)
      this.getXFZPHFXITable(this.activeNames)
    },
    handleChange (val) {
      this.pageParams.page = 1
      this.getXFZPHFXIData(this.activeNames)
      this.getXFZPHFXITable(this.activeNames)
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getXFZPHFXITable(this.activeNames)
    },
    getXFZPHFXIData (type) {
      const data = {
        params: {
          dataType: this.active,
          type: type,
          start: this.newData.timeData.time.startTime,
          top: 10
        }
      }
      getXFZPHFXI(data).then(res => {
        if (res.data.success) {
          this.pieConfig.series.data = []
          this.pieConfig.legend.data = []
          this.tableData = res.data.data
          res.data.data.forEach((item, i) => {
            this.pieConfig.series.data.push({ value: item.value, name: item.name })
            this.pieConfig.legend.data.push(item.name)
          })
        }
      })
    },
    getXFZPHFXITable (type) {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          dataType: this.active,
          type: type,
          start: this.newData.timeData.time.startTime
        }
      }
      getXFZPHFXITable(data).then(res => {
        if (res.data.code === 200) {
          this.pageParams.total = Number(res.data.data.total)
          this.tableData = res.data.data.records
          if (this.activeNames === '分风格类型' || this.activeNames === '分材质类型' || this.activeNames === '分题材') {
            this.columnData[0].name = '细品分类'
          } else if (this.activeNames === '分产地') {
            this.columnData[0].name = '特色产地'
          } else if (this.activeNames === '分饰面工艺类型') {
            this.columnData[0].name = '饰面工艺'
          } else if (this.activeNames === '分独板类型' || this.activeNames === '分榫卯类型') {
            this.columnData[0].name = '是否独板'
          } else if (this.activeNames === '分定制类型') {
            this.columnData[0].name = '是否可定制'
          } else if (this.activeNames === '分形状类型') {
            this.columnData[0].name = '形状'
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.j-collapse-warp /deep/ .el-collapse-item__header {
  font-size: 24px;
  color: #575c72;
  padding-left: 15px;
  border-radius: 10px;
}
.j-collapse-warp /deep/ .is-active {
  background-color: transparent;
}
.j-collapse-warp /deep/ .el-collapse-item {
  margin-bottom: 20px;
}
.j-collapse-warp /deep/ .el-collapse {
  border: none;
}
.j-collapse-warp /deep/ .el-collapse-item__wrap {
  border: none;
  background: none;
}
.j-collapse-warp /deep/ .el-collapse-item__content {
  padding-bottom: 0;
}
</style>
