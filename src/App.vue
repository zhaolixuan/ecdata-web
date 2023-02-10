<template>
  <div id="app" style="min-width: 1000px;">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  -moz-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  // user-select: none;
  user-select: text;
}
</style>
