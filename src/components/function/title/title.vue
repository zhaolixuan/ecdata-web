<template>
    <div class="title-container">
        <p class="big-title" v-if="!icon">{{title}}</p>
        <div class="blue-title" v-else>
            <img :src="iconImg" alt="">
            <span>{{title}}</span>
        </div>
    </div>
</template>
<script>
export default {
  props: ['icon', 'title'],
  computed: {
    iconImg () {
      return require(`./img/${this.icon}.png`)
    }
  }
}
</script>
<style lang="less" scoped>
.title-container {
  .big-title {
    margin: 38px 0 20px 0;
    font-size: 24px;
    color: #575C72;
    font-weight: 500;
  }
  .blue-title {
    margin: 30px 0 20px 0;
    font-size: 18px;
    color:#4B66FE;
    font-weight: 500;
    span {
      padding-left: 10px;
    }
  }
}
</style>
