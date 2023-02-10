<template>
  <div class="un-header-page">
    <span class="header-logo"></span>
    <span class="un-header-title">产业大数据</span>
    <div class="header-content">
      <div class="menu-btn" @click="onCollapse()"></div>
      <div class="un-point"><span class="point-icon"></span><span>XX市</span></div>
      <span class="un-root">{{userName}}</span>
      <!-- <div class="tips"><span class="tips-new"></span><span class="tips-icon"></span></div> -->
      <div class="user-msg" @click="showMsg = !showMsg"><img src="./img/Bitmap.png" alt=""><span :class="['arrow', showMsg?'up':'']"></span></div>
      <ul class="un-user-list" v-if="showMsg">
        <li @click="logOut">退出登录</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { logOut } from '@/utils/domain.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      showMsg: false
    }
  },
  computed: {
    userName () {
      return this.user ? this.user.name : ''
    },
    ...mapGetters(['user'])
  },
  methods: {
    onCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('onCollapse', this.isCollapse)
    },
    logOut () {
      this.$alert('您确定要退出嘛', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action == 'confirm') {
            logOut()
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.un-header-page {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  .header-logo {
    width: 39px;
    height: 42px;
    background: url('./img/logo.png') no-repeat;
    background-size: 100% 100%;
  }
  .un-header-title {
    display: inline-block;
    font-family: JDLANGZHENGTI--GB1-0;
    font-size: 28px;
    color: #000000;
    padding-left: 12px;
  }
  .header-content {
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 1px;
    padding: 0 41px 0 32px;
    box-sizing: border-box;
    .menu-btn {
      height: 16px;
      width: 26px;
      background: url('./img/menuControl.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 30px;
      cursor: pointer;
    }
    .un-point {
      font-size: 16px;
      color: #8392a7;
      display: flex;
      .point-icon {
        width: 20px;
        height: 24px;
        background: url('./img/point.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 8px;
      }
    }
    .un-root {
      margin-left: auto;
      font-size: 16px;
      color: #8392a7;
      margin-right: 20px;
    }
    .tips {
      margin-right: 54px;
      .tips-icon {
        width: 22px;
        height: 27px;
        background: url('./img/news.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
      }
    }
    .user-msg {
      img {
        width: 38px;
        height: 38px;
      }
      .arrow {
        cursor: pointer;
        width: 12px;
        height: 6px;
        background: url('./img/down.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        margin-left: 20px;
        transition: all 0.2s;
      }
      .arrow.up {
        transform: rotate(180deg);
      }
    }
    .un-user-list {
      position: absolute;
      bottom: -40px;
      right: 42px;
      width: 100px;
      background: #fff;
      li {
        cursor: pointer;
        font-size: 16px;
        color: #8392a7;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        box-shadow: 0 0 2px 1px rgba(44, 29, 29, 0.1);
      }
    }
  }
}
</style>
