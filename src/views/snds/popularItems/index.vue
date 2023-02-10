<!-- 畅销单品分析 -->
<template>
  <div class="best-seller-container">
    <j-module>
      <check-change :areaData="areaData" :activeArea="activeArea" @handleActive="getActive"></check-change>
    </j-module>
    <j-module>
      <check-form :boxData="boxData" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module title="人气单品分析">
      <items-table :boxData="boxData" ref="bestMethod" :activeArea="activeArea"></items-table>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import itemsTable from './components/itemsTable'
import checkChange from '@/components/function/checkChange/check-change'
import checkForm from '@/components/function/checkForm/check-form'
import { getPlatformData } from './api/api'
export default {
  data () {
    return {
      activeArea: '京东商城',
      areaData: [],
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startTime: '',
            startMonthTime: '',
            endMonthTime: '',
            endTime: '',
            startPlaceholder: '请选择日期'
          }
        }
      }
    }
  },
  mounted () {
    this.getPlatformData()
  },
  methods: {
    getPlatformData () {
      getPlatformData().then(res => {
        const data = res.data.data
        if (data) {
          data.forEach(ele => {
            this.areaData.push({ name: ele.PLATFORM })
          })
        }
      })
    },
    getActive (val) {
      this.activeArea = val
      this.$refs.bestMethod.onActive(this.activeArea)
    },
    clickConfirm (val) {
      this.$refs.bestMethod.onConfirm(val)
    }
  },
  components: {
    JModule,
    checkChange,
    checkForm,
    itemsTable
  }
}
</script>
<style lang="less" scoped>
.tabs-content {
  padding-bottom: 30px;
  box-sizing: border-box;
}
.tabs-area {
  display: inline-block;
  margin-left: 10px;
  padding: 0 10px;
  min-width: 68px;
  height: 32px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  color: #bbbfd0;
  border: 1px solid #d1d4e5;
  border-radius: 16px;
  &.active {
    background: rgba(75, 102, 254, 0.1);
    border-radius: 16px;
    color: #4b66fe;
    border-width: 0px;
  }
}
</style>
