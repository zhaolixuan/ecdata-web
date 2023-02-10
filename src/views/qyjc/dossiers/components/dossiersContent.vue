<template>
  <div>
    <div class="content-top">
      <p><span class="key">统一社会信用代码：</span><span class="value">{{data.creditcode}}</span></p>
      <p><span class="key">登记机关：</span><span class="value">{{data.belongorg}}</span></p>
      <p><span class="key">工商注册号：</span><span class="value">{{data.regno}}</span></p>
      <p><span class="key">所属行业：</span><span class="value">{{data.category_industry}}</span></p>
      <p><span class="key">法定代表人：</span><span class="value">{{data.opername}}</span></p>
      <p><span class="key">企业类型：</span><span class="value">{{data.orgtype_std}}</span></p>
      <p><span class="key">成立日期：</span><span class="value">{{data.startdate}}</span></p>
      <p><span class="key">企业住所：</span><span class="value">{{data.address}}</span></p>
    </div>
    <p><span class="key">注册资本：</span><span class="value">{{data.registcapi}}</span></p>
    <p><span class="key">经营范围：</span><span class="value">{{data.comscope}}</span></p>
  </div>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style lang="less" scoped>
.content-top {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  p {
    width: 50%;
  }
}
p{
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  letter-spacing: 0;
  margin-bottom: 20px;
  line-height: 22px;
  display: flex;
  flex-wrap: wrap;
}
.key {
  width: 126px;
  color: #7E85AA;
  display: inline-block;
  text-align: right;
  margin-right: 16px;
}
.value {
  text-align: left;
  max-width: 85%;
  color: #566770;
}

</style>
