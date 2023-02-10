<template>
  <el-form>
    <el-form-item>
      <mark class="_mark" v-show="showSeason" @click.stop="showSeason=false"></mark>
      <el-input placeholder="请选择季度" v-model="showValue" style="width:210px;" suffix-icon="el-icon-date" @focus="showSeason=true">
      </el-input>
      <el-card class="box-card" v-show="showSeason">
        <div slot="header" class="clearfix yearBtn">
          <button type="button" aria-label="前一年" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev"></button>
          <span role="button" class="el-date-picker__header-label">{{year}}年</span>
          <button type="button" aria-label="后一年" @click="next" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
        </div>
        <div class="text item">
          <el-button type="text" size="medium" class="_left" @click="selectSeason(0)">第一季度</el-button>
          <el-button type="text" size="medium" class="_right" @click="selectSeason(1)">第二季度</el-button>
        </div>
        <div class="text item">
          <el-button type="text" size="medium" class="_left" @click="selectSeason(2)">第三季度</el-button>
          <el-button type="text" size="medium" class="_right" @click="selectSeason(3)">第四季度</el-button>
        </div>
      </el-card>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    valueArr: {
      default: () => {
        return ['01-03', '04-06', '07-09', '10-12']
      },
      type: Array
    },
    getValue: {
      default: () => { },
      type: Function
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      showSeason: false,
      season: '',
      year: new Date().getFullYear(),
      showValue: '',
      startTime: '',
      endTime: ''
    }
  },
  created () {
    if (this.defaultValue) {
      const value = this.defaultValue
      const arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      const str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      const arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
      this.startTime = arr[0].slice(0, 6)
      this.endTime = arr[1].slice(0, 6)
      this.$emit('timeValue', this.startTime, this.endTime)
    }
  },
  watch: {
    defaultValue: function (value, oldValue) {
      const arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      const str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      const arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
    }
  },
  methods: {
    one () {
      this.showSeason = false
    },
    prev () {
      if (this.year > new Date().getFullYear() - 2) { this.year = this.year * 1 - 1 }
    },
    next () {
      if (this.year < new Date().getFullYear()) { this.year = this.year * 1 + 1 }
    },
    selectSeason (i) {
      const that = this
      that.season = i + 1
      const arr = that.valueArr[i].split('-')
      that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
      that.showSeason = false
      this.showValue = `${this.year}年${this.season}季度`
      that.startTime = that.year + arr[0]
      that.endTime = that.year + arr[1]
      this.$emit('timeValue', that.startTime, that.endTime)
      console.log(this.showValue)
    },
    getLastDay (year, month) {
      let newYear = year // 取当前的年份
      let newMonth = month++ // 取下一个月的第一天，方便计算（最后一天不固定）
      if (month > 12) {
        newMonth -= 12 // 月份减
        newYear++ // 年份增
      }
      const newDate = new Date(newYear, newMonth, 1) // 取当年当月中的第一天
      return new Date(newDate.getTime() - 1000 * 60 * 60 * 24).getDate() // 获取当月最后一天日期
    }
  }
}
</script>
<style lang='less' scoped>
._mark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
}
.yearBtn {
  text-align: center;
  padding: 0;
}
.box-card {
  width: 322px;
  padding: 0 3px 20px;
  margin-top: 10px;
  position: absolute;
  z-index: 9999;
}
.text.item {
  text-align: center;
}
.text.item .el-button {
  width: 40%;
  color: #606266;
}
.text.item ._left {
  float: left;
}
.text.item ._right {
  float: right;
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
</style>
