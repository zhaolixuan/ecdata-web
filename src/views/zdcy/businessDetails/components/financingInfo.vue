<!-- 融资信息 -->
<template>
  <div class="financing-info">
    <j-card>
      <div class="wrap">
        <p class="title">融资信息</p>
      </div>
      <ul class="steps">
        <li class="step">
          <div class="top"></div>
          <div class="middle">
            <div class="spot">
              <div class="within"></div>
            </div>
            <div class="line"></div>
          </div>
          <div class="bottom">
            <p class="title">A轮</p>
            <p class="time">2010-06-01</p>
          </div>
        </li>
        <li class="step">
          <div class="top"></div>
          <div class="middle">
            <div class="spot">
              <div class="within"></div>
            </div>
            <div class="line"></div>
          </div>
          <div class="bottom">
            <p class="title">A轮</p>
            <p class="time">2010-06-01</p>
          </div>
        </li>
      </ul>
    </j-card>
  </div>
</template>

<script>
import JCard from '@/components/layout/jCard/j-card'
export default {
  data () {
    return {
    }
  },
  components: {
    JCard
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped>
.financing-info {
  margin-top: 30px;
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  .wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    color: #141d54;
    font-weight: bolder;
  }
  .steps {
    margin: 10px 120px;
    display: flex;
    .step {
      display: flex;
      flex-direction: column;
      // margin-left: 50%;
      // align-items: center;
      &:last-of-type {
        .middle {
          .line {
            display: none;
          }
        }
      }
    }
    .middle {
      display: flex;
      align-items: center;
      margin-top: 5px;
    }
    .spot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background: rgba(70, 109, 255, 0.15);
      border-radius: 50%;
      .within {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #466dff;
      }
    }
    .line {
      margin: 0 10px;
      width: 220px;
      height: 3px;
      background: #466dff;
    }
    .top {
      transform: translateX(-46%);
      width: 214px;
      height: 92px;
      background: rgba(70, 109, 255, 0.08);
    }
    .bottom {
      transform: translateX(-46%);
      text-align: center;
      .title {
        font-size: 12px;
        color: #141d54;
      }
      .time {
        font-size: 14px;
        color: #7685a6;
      }
    }
  }
}
</style>
