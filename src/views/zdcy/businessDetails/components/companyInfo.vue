<template>
  <div class="companyInfo-container">
    <j-card>
      <p class="company-name">{{info.entName}}</p>
      <div class="company-point">
        <span v-for="(item, index) in info.highlights" :key="index">{{item}}</span>
      </div>
      <div class="company-form">
        <p>
            <span class="form-label">所属行业：</span>
            <span class="form-name">
              <span v-for="(item, index) in info.industryInfo" :key="index">{{item.industryLargeName}}-{{item.industryMiddleName}}-{{item.industrySmallName}} | </span>
            </span>
            
        </p>
        <p>
            <span class="form-label">联系电话：</span>
            <span class="form-name">{{info.phone}}</span>
            <span class="form-label labels">联系邮箱：</span>
            <span class="form-name names">{{info.email}}</span>
        </p>
        <p>
            <span class="form-label">联系地址：</span>
            <span class="form-name">{{info.businessAddress}}</span>
        </p>
        <p>
            <span class="form-label">企业简介：</span>
            <template v-if="info.entDesc && info.entDesc.length < 200">
              <span class="form-name">
                {{info.entDesc}}
              </span>
            </template>
            <template v-else>
              <span v-if="isOpen" class="form-name">
                {{info.entDesc}}
                <span v-if="this.describe && this.describe.length<=180" @click="isOpen=false" style="color:#128BED">收起</span>
              </span>
              <span class="form-name" v-else>{{describe}}...
                <span @click="isOpen=true" style="color:#128BED;">展开</span>
              </span>
           </template>
        </p>
      </div>
    </j-card>
  </div>
</template>
<script>
import JCard from '@/components/layout/jCard/j-card'
export default {
  props: ['info'],
  data () {
    return {
      describe: '',
      isOpen: false
    }
  },
  created () {
    let str = this.info.entDesc
    if (this.info.entDesc && this.info.entDesc.length > 180) {
      this.isOpen = false
      this.describe = str.slice(0, 180)
    } else {
      this.isOpen = true
      this.describe = this.info.entDesc
    }
  },
  components: {
    JCard
  }
}
</script>
<style lang="less" scoped>
.companyInfo-container {
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  .company-name {
    font-size: 22px;
    color: #111111;
    line-height: 33px;
    font-weight: bolder;
    margin-bottom: 17px;
  }
  .company-point {
    span {
      display: inline-block;
      font-size: 14px;
      color: #2159F4;
      height: 24px;
      line-height: 24px;
      background: rgba(0,97,255,0.10);
      padding: 0 5px;
      margin-right: 8px;
    }
  }
  .company-form {
    background: #F6F7FB;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    p {
      font-size: 14px;
      color: #141D54;
      line-height: 20px;
      margin-bottom: 20px;
      display: flex;
    //   .labels {
    //      margin-left: 68px;
    //   }
      .form-name {
          display: inline-block;
          flex: 1;
      }
      .names {
        color: #2159F4; 
      }
    }
  }
}
</style>