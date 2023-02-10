<!-- 首页横向时间轴 -->
<template>
  <div class="head-nav-warp">
    <div
      class="head-nav"
      v-for="(item, i) in dateData"
      :key="i"
      @click="dateHandle(item, i)"
      :class="{ active: dataIndex === i }"
    >
      <p>{{ item.date }}</p>
      <div class="line"></div>
      <div class="shadow" v-show="dataIndex === i"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "times",
  props: {
    dateData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dataIndex: 11,
    };
  },
  methods: {
    dateHandle(item, i) {
      this.$emit("dateHandle", item.date);
      this.dataIndex = i;
    },
  },
};
</script>

<style scoped lang="less">
.head-nav-warp {
  padding: 12px 30px 20px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 12px;
  display: flex;
}
.head-nav {
  cursor: pointer;
  width: 16.66%;
  float: left;
  position: relative;
}
.head-nav p {
  text-align: center;
  font-size: 12px;
  color: #2c46ff;
  margin-bottom: 20px;
}
.head-nav .line {
  width: 100%;
  height: 3px;
  position: relative;
  background: #e9f2fe;
}
.head-nav .line:before {
  content: "";
  display: block;
  position: absolute;
  height: 12px;
  width: 12px;
  border: 3px solid #e5e5e5;
  border-radius: 50%;
  background-color: #fff;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -6px;
  z-index: 2;
  transition: all 0.2s linear;
}
.head-nav.active .line:before {
  border-color: #2c46ff;
  background-color: #2c46ff;
  box-shadow: 0 2px 3px 0px rgba(50, 112, 237, 0.5);
}
.head-nav .shadow {
  width: 100%;
  height: 3px;
  background: url(./img/navBG.png) no-repeat center center;
  background-size: 100% 100%;
  bottom: 0px;
  left: 0;
  position: absolute;
  transition: all 0.2s linear;
}
.head-nav .line:after {
  content: "";
  display: block;
  position: absolute;
  height: 8px;
  width: 8px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  background-color: #fff;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -3px;
  z-index: 3;
  transition: all 0.2s linear;
}
</style>
