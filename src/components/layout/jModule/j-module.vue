<!-- 页面模块组件 -->
<template>
  <div class="module-container">
    <p v-if="title" class="title">{{title}}</p>
    <template v-else>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'module',
  props: {
    title: String
  },
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
.module-container {
  .title {
    padding: 16px 0;
    font-size: 24px;
    color: #575c72;
  }
}
</style>
