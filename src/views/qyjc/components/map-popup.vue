<!--  -->
<template>
  <div class='map-popup-container'>
    <p class="title">{{option.COMPANY_NAME}}</p>
    <!-- <div class="content-wrap">
      <span class="modular">同比：{{option.yoy}}%</span><span class="modular">占比：{{option.pro}}%</span>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          COMPANY_NAME: ''
        }
      }
    }
  },
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped>
.map-popup-container {
  position: absolute;
  padding: 10px 15px;
  min-width: 160px;
  background: #fff;
  border-radius: 4px;
  .title {
    text-align: center;
  }
  .content-wrap {
    .modular + .modular {
      margin-left: 10px;
    }
  }
}
</style>
