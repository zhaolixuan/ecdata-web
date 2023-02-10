<!-- 首页 -->
<template>
  <div class="home-container">
    <j-time @dateHandle="dateHandle" :dateData="dateData" />
    <j-module title="网络零售分市场概况">
      <j-titlecard :titleCardList="titleCardList"></j-titlecard>
      <j-titlescard :titleCardList="titleCardLists"></j-titlescard>
    </j-module>
    <j-module title="网络零售分地区概况">
      <j-card>
        <j-mapbar :startTime="startTime"></j-mapbar>
      </j-card>
    </j-module>
    <j-module title="网络零售分行业情况">
      <j-industry :startTime="startTime"></j-industry>
    </j-module>
    <j-module title="网络零售月度走势情况">
      <j-trend :startTime="startTime"></j-trend>
    </j-module>
    <j-module title="主题榜单">
      <j-theme :startTime="startTime"></j-theme>
    </j-module>
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import JTime from '@c/function/time'
import JTitlecard from './components/titleCard/index.vue'
import JTitlescard from './components/titleCard/titleCard.vue'
import JMapbar from './components/mapbar'
import JIndustry from './components/industry'
import JTrend from './components/trend'
import JTheme from './components/theme'
import { getWLLSSCGKUANG } from './api/api'
export default {
  components: {
    JTime,
    JModule,
    JTitlecard,
    JTitlescard,
    JCard,
    JMapbar,
    JTrend,
    JIndustry,
    JTheme
  },
  data () {
    return {
      dateData: [],
      titleCardList: [{
        name: '累计网络零售额',
        id: 'amount',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '万元',
        colorBg: '#FF6F00',
        shadow: 'rgba(251, 170, 109, .7)'
      }, {
        name: '网络零售额排名',
        id: 'amountRank',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '位',
        colorBg: '#FFB100',
        shadow: 'rgba(251, 202, 92, .7)'
      }, {
        name: '电商店铺数',
        id: 'shop',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '家',
        colorBg: '#34D3AA',
        shadow: 'rgba(154, 233, 205, .7)'
      }, {
        name: '电商企业数',
        id: 'enterprise',
        icon: require('@/assets/img/cart_1.png'),
        money: '',
        unit: '家',
        colorBg: '#8573FF',
        shadow: 'rgba(169, 157, 254, .7)'
      }],
      titleCardLists: [{
        name: '实物商品累计网络零售额',
        id: 'matter',
        icon: require('@/assets/img/cart_5.png'),
        money: '',
        moneys: '',
        precentName: '同比增长',
        group: false
      }, {
        name: '非实物商品累计网络零售额',
        id: 'nominal',
        icon: require('@/assets/img/cart_7.png'),
        money: '',
        moneys: '',
        precentName: '同比增长',
        group: true
      }, {
        name: 'B2C累计网络零售额',
        id: 'B2C',
        icon: require('@/assets/img/cart_6.png'),
        money: '',
        moneys: '',
        precentName: '同比增长',
        group: true
      }, {
        name: 'C2C累计网络零售额',
        id: 'C2C',
        icon: require('@/assets/img/cart_8.png'),
        money: '',
        moneys: '',
        precentName: '同比增长',
        group: false
      }],
      startTime: ''
    }
  },

  computed: {},

  created () {
    this.handleTime()
  },
  mounted () {
    this.getWLLSSCGKUANGData()
  },
  methods: {
    handleTime () { // 统计近12月数据
      let dataArr = []
      let date = new Date()
      let m = date.getMonth()
      let year = date.getFullYear()
      let day = date.getDate()
      if (day <= 15) {
        m = m - 1
      }
      for (let i = 0; i < 12; i++) {
        let currM = m - i
        let currY = year
        if (currM <= 0) {
          currM = currM + 12
          currY -= 1
          if (currM === 0) {
            currY -= 1
            currM = 12
          }
        }
        currM = currM < 10 ? '0' + currM : currM
        dataArr.unshift({ date: currY + '年' + (currM) + '月' })
      }
      this.dateData = dataArr
      let lastindex = this.dateData.length - 1
      this.startTime = this.dateData[lastindex].date.slice(0, 4) + '' + this.dateData[lastindex].date.slice(5, 7)
      console.log(this.startTime)
    },
    dateHandle (date) {
      this.startTime = date.slice(0, 4) + '' + date.slice(5, 7)
      this.getWLLSSCGKUANGData()
    },
    getWLLSSCGKUANGData () {
      const data = {
        params: {
          start: this.startTime,
          code: '440605'
        }
      }
      getWLLSSCGKUANG(data).then(res => {
        if (res.data.success) {
          const titleCardListlist = []
          res.data.data.forEach((item, i) => {
            this.titleCardList.forEach(val => {
              if (val.id === item.name) {
                val.money = item.title
              }
            })
            this.titleCardLists.forEach(val => {
              if (val.id === item.name) {
                val.money = item.title
                val.moneys = item.value + '%'
                val.group = item.value > 0 ? 0 : 1
              }
            })
          })
        }
      })
    }
  }
}

</script>
<style lang='less'>
.j-chart-title {
  color: #141d54;
  font-size: 14px;
  padding-bottom: 10px;
  font-weight: 800;
}
</style>
