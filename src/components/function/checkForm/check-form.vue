<template>
  <j-card>
    <div class="sales-market-container">
      <div class="sales-form">
        <div class="sales-target" v-for="(item, index) in boxData.sourceData" :key="index">
          <span class="target-title">{{ item.title }}</span>
          <el-radio-group v-model="item.model">
            <el-radio :label="ele.label" v-for="(ele, index) in item.list" :key="index" @change="handleChange">{{ele.value}}</el-radio>
          </el-radio-group>
          <template v-if="item.selectList">
            <el-select v-model="item.selectValue" :disabled="item.model == '0'" placeholder="请选择">
              <el-option v-for="ele in item.selectList" :key="ele.value" :label="ele.label" :value="ele.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="sales-time">
          <span class="time-title">{{boxData.timeData.title}}</span>
          <el-radio-group v-model="boxData.timeData.model">
            <el-radio :label="ele.value" v-for="(ele, index) in boxData.timeData.list" :key="index">{{ele.value}}</el-radio>
          </el-radio-group>
          <template v-if="timeType == 'sectionMonth'">
            <el-date-picker v-model="boxData.timeData.time.startMonthTime" type="month" :placeholder="boxData.timeData.time.startPlaceholder" :disabled="disabled" format="yyyy-MM" value-format="yyyy-MM">
            </el-date-picker>
            <span class="time-from">至</span>
            <el-date-picker v-model="boxData.timeData.time.endMonthTime" type="month" :placeholder="boxData.timeData.time.endPlaceholder" :disabled="disabled" format="yyyy-MM" value-format="yyyy-MM">
            </el-date-picker>
          </template>
          <template v-if="timeType == 'singleMonth'">
            <el-date-picker v-model="boxData.timeData.time.startMonthTime" type="month" :placeholder="boxData.timeData.time.startPlaceholder" :disabled="disabled" format="yyyy-MM" value-format="yyyy-MM">
            </el-date-picker>
          </template>
          <template v-if="timeType == 'quarter'">
            <j-quarter @timeValue="timeValue" :defaultValue="defaultValue"></j-quarter>
          </template>
        </div>
      </div>
      <div class="confirm-btn" @click="handleConfirm">确定</div>
    </div>
  </j-card>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import JQuarter from '@/components/function/checkForm/quarter'
export default {
  /* eslint-disable */
  props: ['boxData'],
  data () {
    return {
      disabled: false,
      timeType: this.boxData.timeData.time.type,
      defaultValue: ''
    }
  },
  watch: {
    boxData: {
      handler (newValue, oldValue) {
        this.dataShow(newValue)
      },
      deep: true
    }
  },
  created () {
    this.dataShow(this.boxData)
  },
  methods: {
    handleChange (val) {
      this.$emit('handleData', val)
    },
    handleTime () {// 统计近12月数据
      var dataArr = []
      var data = new Date()
      var year = data.getFullYear()
      data.setMonth(data.getMonth(), 1) // 获取到当前月份,设置月份
      for (var i = 0; i < 12; i++) {
        data.setMonth(data.getMonth() - 1) // 每次循环一次 月份值减1
        var m = data.getMonth() + 1
        m = m < 10 ? "0" + m : m
        dataArr.push(data.getFullYear() + "-" + (m))
      }
      return dataArr
    },
    timeValue (start, end) {
      console.log(start, end)
      if (this.boxData.timeData.model === '季度') {
        this.boxData.timeData.time.startTime = start
        this.boxData.timeData.time.endTime = end
      } else {
        this.boxData.timeData.time.startTime = start.slice(0, 4) + start.slice(5, 7)
        this.boxData.timeData.time.endTime = end.slice(0, 4) + end.slice(5, 7)
      }
    },
    dataShow (val) {
      let data = this.boxData.timeData.time
      if (val.timeData.model === '近12个月' || val.timeData.model === '近1个月') {
        this.disabled = true
        this.timeType = data.type
        data.startMonthTime = ''
        data.endMonthTime = ''
        data.startTime = this.handleTime()[this.handleTime().length - 1].slice(0, 4) + this.handleTime()[this.handleTime().length - 1].slice(5, 7)
        data.endTime = this.handleTime()[0].slice(0, 4) + this.handleTime()[0].slice(5, 7)
      } else if (val.timeData.model === '季度') {
        this.disabled = false
        this.timeType = 'quarter'
        const m = new Date().getMonth() + 1
        const y = new Date().getFullYear()
        if (m <= 3) {
          this.defaultValue = `${y}01-${y}03`
        } else if (m <= 6) {
          this.defaultValue = `${y}04-${y}06`
        } else if (m <= 9) {
          this.defaultValue = `${y}07-${y}09`
        } else if (m <= 12) {
          this.defaultValue = `${y}10-${y}12`
        }
      } else if (val.timeData.model === '月度') {
        this.disabled = false
        this.timeType = data.type;
        if (val.timeData.time.type === 'singleMonth') {
          if (!data.startMonthTime) {
            data.startMonthTime = this.handleTime()[0]
          }
          data.endTime = data.startMonthTime.slice(0, 4) + data.startMonthTime.slice(5, 7)
        }
        data.startTime = data.startMonthTime.slice(0, 4) + data.startMonthTime.slice(5, 7)
        if (data.endMonthTime) data.endTime = data.endMonthTime.slice(0, 4) + data.endMonthTime.slice(5, 7)
      }
    },
    handleConfirm () {
      this.$emit('clickConfirm', this.boxData)
    }
  },
  components: {
    JCard,
    JQuarter
  }
}
</script>
<style lang="less" scoped>
.sales-market-container {
  // padding: 36px 30px 26px 44px;
  // box-sizing: border-box;
  // background: #fff;
  // box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  // border-radius: 10px;
  display: flex;
  .sales-form {
    .sales-target {
      margin-bottom: 35px;
      .target-title {
        font-size: 16px;
        color: #6e728d;
        padding-right: 46px;
        line-height: 22px;
      }
    }
    .sales-time {
      .time-title {
        font-size: 16px;
        color: #6e728d;
        padding-right: 46px;
        line-height: 22px;
      }
      .time-from {
        font-size: 16px;
        color: #141d54;
        padding: 0 10px;
      }
      /deep/ .el-radio-group {
        .el-radio {
          .el-radio__input {
            display: none;
          }
        }
      }
    }
    /deep/ .el-input--suffix {
      width: 210px;
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        border: 1px solid #d1d4e5;
        border-radius: 4px;
        font-size: 16px;
        color: #6e728d;
        padding-left: 20px;
        &::placeholder {
          font-size: 16px;
          color: #6e728d;
        }
      }
      .el-input__prefix {
        left: auto;
        right: 10px;
        font-size: 20px;
      }
    }
    /deep/ .el-form {
      display: inline-block;
    }
  }
  .confirm-btn {
    width: 68px;
    height: 32px;
    background: #4b66fe;
    border-radius: 16px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    align-self: center;
    margin-left: auto;
    cursor: pointer;
  }
  /deep/.el-radio-group {
    vertical-align: initial;
    .el-radio {
      margin-right: 41px;
      font-size: 16px;
      .el-radio__input {
        .el-radio__inner {
          width: 14px;
          height: 14px;
          &::after {
            width: 6px;
            height: 6px;
          }
        }
      }
      .el-radio__input.is-checked .el-radio__inner {
        background: #3d6aff;
        border-color: #3d6aff;
      }
      .el-radio__label {
        font-size: 16px;
        color: #201e2c;
      }
    }
    .el-radio.is-checked .el-radio__label {
      color: #3d6aff;
    }
  }
}
</style>
