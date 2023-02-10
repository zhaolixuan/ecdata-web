<template>
<div class="baseInfo_wrap">
    <j-card>
    <div class="wrap">
        <p class="title">基本信息</p>
    </div>
    <div class="tables-con">
        <div class="rows">
            <p>
                <span class="label_name">官方代表</span>
                <span class="content">{{info.legalPerson}}</span>
            </p>
            <p>
                <span class="label_name">成立日期</span>
                <span class="content">{{info.createDate}}</span>
            </p>
            <p>
                <span class="label_name">注册资本</span>
                <span class="content">{{info.regCapital}}万元</span>
            </p>
        </div>
         <div class="rows">
            <p>
                <span class="label_name">统一信用代码</span>
                <span class="content">{{info.uscc}}</span>
            </p>
           <p>
                <span class="label_name">类型</span>
                <span class="content">{{info.entType}}</span>
            </p>
            <p>
                <span class="label_name"></span>
                <span class="content"></span>
            </p>
        </div>
        <div class="rows">
             <p>
                <span class="label_name">注册地址</span>
                <span class="content">{{info.registerArea}}</span>
            </p>
        </div>
        <div class="rows">
             <p>
                <span class="label_name">经营期限</span>
                <span class="content">{{info.businessScope}}</span>
            </p>
        </div>
    </div>
    </j-card>
</div>
</template>
<script>
import JCard from '@/components/layout/jCard/j-card'
export default {
  name: 'PortraitDetail',
  props: ['info'],
  data () {
    return {
      infoData: {}
    }
  },
  components: {
    JCard
  }
}
</script>
<style lang="less" scoped>
.baseInfo_wrap{
    margin-top: 30px;
    box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  .wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    color: #141D54;
    font-weight: bolder;
  }
  .tables-con {
      width: 100%;
      margin-top: 20px;
      .rows {
          display: flex;
          line-height: 70px;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #CBD3ED;
          border-bottom:none;
          p {
             flex: 1;
             display: flex;
             align-items: center;
             justify-content: center;
             height: 100%;
             .label_name {
                display: inline-block;
                width: 153px;
                vertical-align: middle;
                text-align: center;
                font-size: 14px;
                color: #141D54;
                background:rgba(70,109,255,0.08);
                border-right:1px solid #CBD3ED;
            }
            .content{
                flex: 1;
                padding: 0 20px;
                box-sizing: border-box;
                line-height: normal;
                font-size: 12px;
                color: #666666;
            }
          }
      }
      .rows:last-child{
        border-bottom: 1px solid #CBD3ED;
      }
  }
}
</style>
