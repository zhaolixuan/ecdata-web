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

export default {
  name: 'titleCard',
  props: {
    titleCardList: {
      type: Array,
      default: () => [{
        name: '零售额（万元）',
        icon: require('@/assets/img/cart_1.png'),
        money: '366,254.9',
        colorBg: '#FF6F00'
      }, {
        name: '零售量（万件）',
        icon: require('@/assets/img/cart_1.png'),
        money: '366,254.9',
        colorBg: '#FFB100'
      }, {
        name: 'TOP.1粮油调味 零售额（万元）',
        icon: require('@/assets/img/cart_1.png'),
        money: '366,254.9',
        colorBg: '#5DE2AF'
      }]
    }
  },
  computed: {},

  mounted () { },

  methods: {
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
