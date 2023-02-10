<template>
  <div>
    <ve-wordcloud v-on-echart height="370px" :data="chartCloud"></ve-wordcloud>
  </div>
</template>

<script>
import { getCYRCFXI } from '../../api'
import { getLastMonth } from '@/utils/utils'
export default {
  data () {
    return {
      chartCloud: {
        columns: ['word', 'count'],
        rows: []
      }
    }
  },
  mounted () {
    this.getCYRCFXIData('热搜词')
  },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  watch: {
    active (n) {
      this.getCYRCFXIData('热搜词')
    }
  },
  methods: {
    getCYRCFXIData (val) {
      // 负面评价热词
      const data = { params: { dataType: this.active, type: val, start: getLastMonth() } }
      getCYRCFXI(data).then(res => {
        if (res.data.success) {
          this.chartCloud.rows = res.data.data.map(item => {
            return {
              word: item.name,
              count: item.value
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
