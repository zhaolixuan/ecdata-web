<!--
 * @Author: diaolili
 * @Date: 2020-12-02 19:55:41
 * @Description: 登录页
-->
<template>
  <div class="login-container">
    <div class="header">
      <div class="jc_hd_logo"></div>
    </div>
    <div class="sys-pannel">
      <h1>电商大数据监测平台</h1>
      <h2>助力产业数字化转型</h2>
    </div>
    <div class="login-pannel">
      <div class="title">账号登录</div>
      <div class="input">
        <el-input v-model="usr" placeholder="请输入账户"></el-input>
      </div>
      <div class="input">
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      </div>
      <div class="tool">
        <div class="button" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from './api/api'
export default {
  components: {},
  data () {
    return {
      usr: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      login({ account: this.usr, password: this.pwd }).then(res => {
        if (res.data.code === 200) {
          console.log(res)
          this.$route.push({ path: '/' })
        } else {
          this.$message(res.data.message)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('./imgs/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // display: flex;
  position: relative;

  .header {
    padding: 3vh;
    .jc_hd_logo {
      position: relative;
      overflow: hidden;
      display: block;
      width: 150px;
      height: 28px;
      background: url(https://img1.jcloudcs.com/portal/header/jdcloud-logo-2.svg)
        center no-repeat;
      background-size: 100%;
    }
  }
  .sys-pannel {
    margin-top: 7vh;
    margin-left: 9vw;
    h1 {
      font-family: FZLTCHJW;
      font-size: 46px;
      color: #141d54;
    }
    h2 {
      margin-top: 2vh;
      font-family: FZLTZHUNHK;
      font-size: 30px;
      color: #6e728d;
    }
  }
  .login-pannel {
    position: absolute;
    top: 22vh;
    right: 12vw;
    width: 25vw;
    height: 50vh;
    background-color: #fff;
    padding: 5vh 10vh;
    box-shadow: 0 13px 20px 0;

    .title {
      padding: 0 0 1.5vh;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #141d54;
    }
    .input {
      height: 6vh;
      margin: 5vh 0;

      div /deep/ .el-input__inner {
        height: 6vh;
      }
    }
    .tool {
      text-align: center;

      .button {
        padding: 18px;
        background: #4b66fe;
        box-shadow: 0 13px 20px 0 rgba(75, 102, 254, 0.2);
        border-radius: 30px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>
