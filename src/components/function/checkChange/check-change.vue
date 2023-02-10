<template>
  <div class="tabs-content">
    <span class="tabs-area" :class="{'active':ActiveData===item.name}" @click="handleActive(item.name)" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
  </div>
</template>
<script>
export default {
  props: ['activeArea', 'areaData'],
  data () {
    return {
      ActiveData: this.activeArea
    }
  },
  methods: {
    handleActive (val) {
      this.ActiveData = val
      this.$emit('handleActive', this.ActiveData)
    }
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
