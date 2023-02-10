<!-- 网络零售市场交易规模变化趋势 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{title}}用户正向评价热词</p>
        <ve-wordcloud v-on-echart height="200px" :data="chartCloud"></ve-wordcloud>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{title}}用户负向评价热词</p>
        <ve-wordcloud v-on-echart height="200px" :data="chartClouds"></ve-wordcloud>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { getCYRCFXI } from '../../api'
import { getLastMonth } from '@/utils/utils'
export default {
  components: {
    JCard
  },
  data () {
    /* eslint-disable */
    return {
      chartCloud: {
        columns: ['word', 'count'],
        rows: []
      },
      chartClouds: {
        columns: ['word', 'count'],
        rows: []
      }

    }
  },

  computed: {},
  mounted () {
    this.getCYRCFXIData('正面评价热词')
    this.getCYRCFXIData('负面评价热词')
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    active (n) {
      this.getCYRCFXIData('正面评价热词')
      this.getCYRCFXIData('负面评价热词')
    }
  },
  methods: {
    getCYRCFXIData (val) {
      // 负面评价热词
      const data = { params: { dataType: this.active, type: val, start: getLastMonth() } }
      getCYRCFXI(data).then(res => {
        if (res.data.success) {
          if (val === '正面评价热词') {
            this.chartCloud.rows = res.data.data.map(item => {
              return {
                word: item.name,
                count: item.value
              }
            })
          } else {
            this.chartClouds.rows = res.data.data.map(item => {
              return {
                word: item.name,
                count: item.value
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
 