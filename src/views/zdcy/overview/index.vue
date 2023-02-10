<!-- 产业概况 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
      </template>
    </j-tabs>
    <j-titlecard :titleCardList="titleCardList"></j-titlecard>
    <j-module title="网络零售市场交易规模变化趋势">
      <j-changingtrend :activeArea="tabs.active" :boxData="boxData" ref="trendMethod"></j-changingtrend>
    </j-module>
    <j-module title="行业累计交易规模变化趋势">
      <j-transaction :activeArea="tabs.active" :boxData="boxData" ref="transactionMethod"></j-transaction>
    </j-module>
  </div>
</template>

<script>
import JTitlecard from '@/views/home/components/titleCard/index.vue'
import JModule from '@/components/layout/jModule/j-module'
import JChangingtrend from './components/changingTrend'
import JTransaction from './components/transaction'
import JTabs from '@/components/function/tabs/tabs'
import checkForm from '@/components/function/checkForm/check-form'
import { getCYZLBQIN } from './api'
export default {
  components: {
    JModule,
    JTitlecard,
    JChangingtrend,
    JTransaction,
    JTabs,
    checkForm
  },
  data () {
    return {
      titleCardList: [{
        name: '佛山市零售额',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '元',
        colorBg: '#FF6F00',
        shadow: 'rgba(251, 170, 109, 1)'
      }, {
        name: '佛山市零售量',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '件',
        colorBg: '#FFB100',
        shadow: 'rgba(251, 202, 92, 1)'
      }, {
        name: '佛山市店铺数',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '家',
        colorBg: '#5DE2AF',
        shadow: 'rgba(154, 233, 205, 1)'
      }],
      activeArea: '家具',
      tabs: {
        active: 'HMJJ',
        tabList: [{
          label: '家具',
          name: 'HMJJ'
        }, {
          label: '服饰',
          name: 'GYP'
        }, {
          label: '家电',
          name: 'YH'
        }]
      },
      boxData: {
        timeData: {
          title: '时间',
          model: '近12个月',
          list: [{
            value: '近12个月'
          }, {
            value: '季度'
          }, {
            value: '月度'
          }],
          time: {
            type: 'sectionMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '', // 月度结束时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          }
        }
      }
    }
  },
  methods: {
    clickConfirm (val) {
      this.CYZLBQINDATA()
      this.$refs.trendMethod.onConfirm(val)
      this.$refs.transactionMethod.onConfirm(val)
    },
    handleActive (val) {
      console.log(val)
      this.tabs.active = val
      // this.boxData.timeData.model = '近12个月'
      this.CYZLBQINDATA()
    },
    CYZLBQINDATA () {
      const data = {
        params: {
          dataType: this.tabs.active,
          start: this.boxData.timeData.time.startTime,
          end: this.boxData.timeData.time.endTime
        }
      }
      getCYZLBQIN(data).then(res => {
        const data = res.data.data
        if (data) {
          this.titleCardList[0].money = data[0].amount
          this.titleCardList[1].money = data[0].volume
          this.titleCardList[2].money = data[0].count
        //   data.forEach((item, i) => {
        //     // this.titleCardList[i].name = data[i].contrast
        //     // this.titleCardList[i].money = data[i].value
        //     // this.titleCardList.filter(val => val.name===data[i].contrast)[0].money = data[i].value
        //   })
        }
      })
    }
  },
  mounted () {
    this.CYZLBQINDATA()
  }
}
</script>

<style></style>
