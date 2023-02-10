<template>
  <div class="j-title-card-warp">
    <div class="j-title-card-warp-item" v-for="(item, i) in titleCardList" :key="i" :style="{ 'background': item.colorBg}">
      <div class="j-title-card-warp-icon"><img :src="item.icon" alt=""></div>
      <div>
        <div class="j-title-card-warp-name">{{item.name}}</div>
        <div class="j-title-card-warp-money">{{item.money}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFarmSales, getFarmTop } from '../api/api'
export default {
  name: 'titleCard',
  props: {
    boxData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      newData: this.boxData,
      titleCardList: [{
        name: '零售额（万元）',
        icon: require('@/assets/img/cart_1.png'),
        money: '-',
        colorBg: '#FF6F00'
      }, {
        name: 'TOP.1- 零售额（万元',
        icon: require('@/assets/img/cart_1.png'),
        money: '-',
        colorBg: '#FFB100'
      }]
    }
  },
  computed: {},

  mounted () {
    this.getFarmSales()
    this.getFarmTop()
  },
  methods: {
    onConfirm (val) {
      this.newData = val
      this.getFarmSales()
      this.getFarmTop()
    },
    getFarmSales () {
      this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      const data = {
        params: {
          dataMonth: this.newData.timeData.time.startTime
        }
      }
      getFarmSales(data).then(res => {
        const data = res.data.data
        if (data) {
          this.titleCardList[0].money = data[0].ABSOLUTE_VALUE
        }
      })
    },
    getFarmTop () {
      this.timeTitle = this.newData.timeData.time.startTime.slice(0, 4) + '年' + this.newData.timeData.time.startTime.slice(4, 6) + '月'
      const data = {
        params: {
          dataMonth: this.newData.timeData.time.startTime
        }
      }
      getFarmTop(data).then(res => {
        const data = res.data.data
        if (data) {
          this.titleCardList[1].name = `TOP.1${data[0].STAT_CATE_NAME} 零售额（万元）`
          this.titleCardList[1].money = data[0].ABSOLUTE_VALUE
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.j-title-card-warp {
  display: flex;
  width: 100%;
  padding: 15px 0;
  padding-top: 0;
  justify-content: space-around;
  .j-title-card-warp-item {
    flex: 1;
    margin: 0 12px;
    height: 112px;
    border-radius: 10px;
    display: flex;
    padding: 25px 0 29px 40px;
    box-sizing: border-box;
    color: #fff;
  }
  .j-title-card-warp-icon img {
    display: block;
    width: 36px;
    height: auto;
  }
  .j-title-card-warp-name {
    font-size: 16px;
    padding-left: 20px;
    line-height: 36px;
  }
  .j-title-card-warp-money {
    font-size: 24px;
    padding-left: 20px;
  }
}
</style>
