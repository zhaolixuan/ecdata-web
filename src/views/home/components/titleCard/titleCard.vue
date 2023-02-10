<template>
  <div class="j-title-card-warp">
    <div class="j-title-card-warp-item" v-for="(item, i) in titleCardList" :key="i">
      <div class="j-title-card-warp-left">
        <div class="j-title-card-warp-name">{{item.name}}</div>
        <div class="j-title-card-warp-money">{{item.money | handlerMoney}}<span>{{item.units ? item.units : "万元"}}</span></div>
        <div class="j-title-card-warp-value" :style="{'color': item.group ? '#FF4444' : '#5AE5B3'}">
          <span>{{item.precentName}}</span>
          <img v-if="item.group" src="@/assets/img/Group.png" alt="" style="padding-right: 5px;">
          <img v-else src="@/assets/img/Path.png" alt="" style="padding-right: 5px;">
          {{item.moneys || 0}}<span>{{item.secondIndex || `每月`}}</span>
        </div>
      </div>
      <div class="j-title-card-warp-icon"><img :src="item.icon" alt=""></div>
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
      var money = +val * 1
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
  padding-bottom: 0;
  justify-content: space-between;
  .j-title-card-warp-item {
    flex: 1;
    margin-right: 20px;
    background: #fff;
    height: 128px;
    border-radius: 15px;
    display: flex;
    padding: 15px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 1px 5px 8px 1px #f5f5f5;
    &:last-child{
      margin-right: 0;
    }
  }
  .j-title-card-warp-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .j-title-card-warp-icon img {
    display: block;
    width: 30px;
    height: auto;
  }
  .j-title-card-warp-name {
    font-size: 14px;
    color: #6E728D;
    padding-left: 8px;
  }
  .j-title-card-warp-value {
    color: #5AE5B3;
    font-size: 14px;
    padding-left: 8px;
    span {
      font-size: 12px;
      padding-left: 5px;
      padding-top: 6px;
      color: #BBBFD0;
    }
  }
  .j-title-card-warp-money {
    font-size: 24px;
    padding-left: 8px;
    color: #141D54;
    span {
      font-size: 14px;
      padding-left: 5px;
      padding-top: 6px;
    }
  }
}
</style>
