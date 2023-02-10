<template>
  <div class="j-title-card-warp">
    <div class="j-title-card-warp-item" v-for="(item, i) in titleCardList" :key="i" :style="{ 'background': item.colorBg, 'box-shadow': '0 9px 10px ' + item.shadow }">
      <div class="j-title-card-warp-icon"><img :src="item.icon" alt=""></div>
      <div>
        <div class="j-title-card-warp-name">{{item.name}}</div>
        <div class="j-title-card-warp-money">{{item.money | handlerMoney}}<span>{{ item.unit }}</span></div>
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
      default: () => []
    }
  },
  computed: {},

  mounted () { },

  methods: {
  },

  filters: {
    handlerMoney (val) {
      const money = +val * 1
      return money.toLocaleString()
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
  justify-content: space-between;
  .j-title-card-warp-item {
    flex: 1;
    margin-right: 20px;
    height: 100px;
    border-radius: 10px;
    display: flex;
    padding-top: 15px;
    box-sizing: border-box;
    color: #fff;
    padding-left: 15px;
    &:last-child{
      margin-right: 0;
    }
  }
  .j-title-card-warp-icon img {
    display: block;
    width: 36px;
    height: auto;
  }
  .j-title-card-warp-name {
    font-size: 16px;
    padding-left: 10px;
  }
  .j-title-card-warp-money {
    font-size: 24px;
    padding-left: 10px;
    padding-top: 8px;
    span {
      font-size: 14px;
      padding-left: 5px;
      padding-top: 6px;
    }
  }
}
</style>
