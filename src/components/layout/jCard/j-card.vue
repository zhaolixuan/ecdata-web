<!-- 模块的卡片 -->
<template>
  <div class="un-card-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () { },

  methods: {}
}

</script>
<style scoped lang='less'>
.un-card-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px;
}
</style>
