<template>
  <div class="relationInfo-container">
    <j-card>
      <p class="table-title">图谱信息</p>
      <div class="tabs-content">
        <span class="tabs-area" @click="handleChange(item.label)" :class="{'active':areaActive===item.label}" v-for="(item,index) in areaData" :key="index">{{item.value}}</span>
      </div>
      <div class="relation-wrap">
        <relation-charts :id="relation.id" :clazz="relation.class" :option="relation.option" :relationData="relationData" @handleChartsClick="handleChartsClick"></relation-charts>
      </div>
    </j-card>
  </div>
</template>
<script>
import JCard from '@/components/layout/jCard/j-card'
import relationCharts from './charts/relationCharts.vue'
import { getKeyTech, getActualController, getCopyright, getWebsite, getTrademark, getSoftware, getAcHolder, getInvestors, getPatent, getFLSSInfo, getShareTrustee, getAssetsCusto, getAnnualReport, getCooperate, getDebit, getStackHolder, getRelatedParty } from '../api/api'
export default {
  props: ['info'],
  data () {
    return {
      areaActive: '主要人员',
      areaData: [
        {
          id: 1,
          label: '主要人员',
          value: '主要人员',
        }, {
          id: 2,
          label: '企业图谱',
          value: '企业图谱',
        }, {
          id: 3,
          label: '经营情况',
          value: '经营情况',
        }, {
          id: 4,
          label: '技术创新',
          value: '技术创新',
        }],
      relation: {
        id: 'relation',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      relationData: {
        title: '公司名称',
        childrenData: [{
          name: '二级',
          value: '二级',
          childrenData: [{
            name: '三级',
            value: '三级'
          }]
        }, {
          name: '二级',
          value: '二级',
          childrenData: [{
            name: '三级',
            value: '三级'
          }, {
            name: '三级',
            value: '三级'
          }]
        }]
      },
      atualController: [],
      acholderData: [],
      investorsData: [],
      CopyrightData: [],
      websiteData: [],
      trademarkData: [],
      softwareData: [],
      patentData: [],
      flssData: [],
      shareTrusteeData: [],
      assetsCustoData: [],
      reportData: [],
      cooperateData: [],
      debitData: [],
      stackData: [],
      relatedData: [],
      keyTechData: []
    }
  },
  created () {
    this.handleChartsClick()
  },
  methods: {
    handleChartsClick (val) {
      this.relationData.title = this.info.entName
      let typeArr = []
      if (this.areaActive === '主要人员') {
        typeArr = ['董事', '监事', '高管', '核心技术人员']
      } else if (this.areaActive === '企业图谱') {
        typeArr = ['公司实际控制人', '股东及其实际控制人', '对外下属投资方', '合资合作方', '借贷/担保关系方', '关联自然人', '供应链关系方', '资产租赁托管关系方', '股权委托关系方', '法律诉讼关系方']
      } else if (this.areaActive === '经营情况') {
        typeArr = ['销售总额', '利润总额', '主营业务收入', '净利润', '纳税总额', '负债总额']
      } else if (this.areaActive === '技术创新') {
        typeArr = ['专利信息', '软件著作权', '作品著作权', '商标', '网站备案']
      }
      this.relationData.childrenData = []
      typeArr.forEach((ele, index) => {
        this.relationData.childrenData.push({ name: ele, value: ele, childrenData: [] })
      })
      if (val) {
        this.relationData.childrenData.filter(item => {
          if (item.name == val) {
            if (val == '高管') {
              val = '董事长兼总经理'
            }
            item.childrenData = []
            this.info.keyPersonnel.forEach((ele, index) => {
              if (ele.position == val) {
                item.childrenData.push({ name: ele.position + '：' + ele.name, value: ele.position + '：' + ele.name })
              }
            })
            if (val == '核心技术人员') {
              this.getKeyTechData(val)
              item.childrenData = []
              this.keyTechData.forEach((ele, index) => {
                item.childrenData.push({ name: '实际控制人：' + ele.controllerName, value: '实际控制人：' + ele.controllerName })
              })
            }
            if (val == '公司实际控制人') {
              this.getActualControllerData(val)
              item.childrenData = []
              this.atualController.forEach((ele, index) => {
                item.childrenData.push({ name: '实际控制人：' + ele.controllerName, value: '实际控制人：' + ele.controllerName })
              })
            }
            if (val == '股东及其实际控制人') {
              this.getAcHolderData(val)
              item.childrenData = []
              this.acholderData.forEach((ele, index) => {
                item.childrenData.push({ name: '股东名称：' + ele.shareholderName + '；持股比例：' + (ele.radio ? ele.ratio * 100 : '-') + '%', value: '股东名称：' + ele.shareholderName + '；持股比例：' + (ele.radio ? ele.ratio * 100 : '-') + '%' })
              })
            }
            if (val == '对外下属投资方') {
              this.getInvestorsData(val)
              item.childrenData = []
              this.investorsData.forEach((ele, index) => {
                item.childrenData.push({ name: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType, value: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType })
              })
            }
            if (val == '合资合作方') {
              this.getCooperateData(val)
              item.childrenData = []
              this.cooperateData.forEach((ele, index) => {
                item.childrenData.push({ name: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType, value: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType })
              })
            }
            if (val == '借贷/担保关系方') {
              this.getDebitData(val)
              item.childrenData = []
              //   this.debitData.forEach((ele, index) => {
              //     item.childrenData.push({name: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType, value: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType})
              //   })
            }
            if (val == '关联自然人') {
              this.getStackHolderData(val)
              item.childrenData = []
              //   this.stackData.forEach((ele, index) => {
              //     item.childrenData.push({name: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType, value: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType})
              //   })
            }
            if (val == '供应链关系方') {
              this.getRelatedPartyData(val)
              item.childrenData = []
              //   this.relatedData.forEach((ele, index) => {
              //     item.childrenData.push({name: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType, value: '被投资公司名称：' + ele.companyName + '；关系类型：' + ele.investType})
              //   })
            }
            if (val == '资产租赁托管关系方') {
              this.getAssetsCustoData(val)
              item.childrenData = []
              //   this.assetsCustoData.forEach((ele, index) => {
              //     item.childrenData.push({name: '实际控制人：' + ele.controllerName, value: '实际控制人：' + ele.controllerName})
              //   })
            }
            if (val == '股权委托关系方') {
              this.getShareTrusteeData(val)
              item.childrenData = []
              this.shareTrusteeData.forEach((ele, index) => {
                item.childrenData.push({ name: '股权接收管理方：' + ele.authorizedReceiver + '；股权授权委托方：' + ele.authorizer + '；托管股数（万股）' + ele.involvedTrustSum, value: '股权接收管理方：' + ele.authorizedReceiver + '；股权授权委托方：' + ele.authorizer + '；托管股数（万股）' + ele.involvedTrustSum })
              })
            }
            if (val == '法律诉讼关系方') {
              this.getFLSSInfoData(val)
              item.childrenData = []
              this.flssData.forEach((ele, index) => {
                item.childrenData.push({ name: '被告/当事人：' + ele.plainTiff + ';原告/上诉方：' + ele.defendant, value: '被告/当事人：' + ele.plainTiff + ';原告/上诉方：' + ele.defendant })
              })
            }
            if (val == '专利信息') {
              this.getPatentData(val)
              item.childrenData = []
              this.patentData.forEach((ele, index) => {
                item.childrenData.push({ name: '专利类型：' + ele.patentType + '；专利名称：' + ele.patentName, value: '专利类型：' + ele.patentType + '；专利名称：' + ele.patentName })
              })
            }
            if (val == '软件著作权') {
              this.getSoftwareData(val)
              item.childrenData = []
              this.softwareData.forEach((ele, index) => {
                item.childrenData.push({ name: '软件名称：' + ele.softwareFull + '；批准时间：' + ele.regTime.slice(0, 11), value: '软件名称：' + ele.softwareFull + '；批准时间：' + ele.regTime.slice(0, 11) })
              })
            }
            if (val == '作品著作权') {
              this.getCopyrightData(val)
              item.childrenData = []
              this.CopyrightData.forEach((ele, index) => {
                item.childrenData.push({ name: '作品类别：' + ele.workType + '；作品名称：' + ele.workName + '；创作时间：' + ele.finishTime.slice(0, 11), value: '作品类别：' + ele.workType + '；作品名称：' + ele.workName + '；创作时间：' + ele.finishTime.slice(0, 11) })
              })
            }
            if (val == '商标') {
              this.getTrademarkData(val)
              item.childrenData = []
              this.trademarkData.forEach((ele, index) => {
                item.childrenData.push({ name: '商标名：' + ele.tmName + '；商标状态：' + ele.tmStatus, value: '商标名：' + ele.tmName + '；商标状态：' + ele.tmStatus })
              })
            }
            if (val == '网站备案') {
              this.getWebsiteData(val)
              item.childrenData = []
              this.websiteData.forEach((ele, index) => {
                item.childrenData.push({ name: '网站名称：' + ele.webSite + '网站域名：' + ele.webDomain + '网站首页：' + ele.webFrontPage, value: '网站名称：' + ele.webSite + '网站域名：' + ele.webDomain + '网站首页：' + ele.webFrontPage })
              })
            }
            if (this.areaActive == '经营情况') {
              this.getAnnualReportData(val)
              if (val == '销售总额') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；销售总额（万元）：' + ele.totalSales, value: '年份：' + ele.fiscalYear + '；销售总额（万元）：' + ele.totalSales })
                })
              }
              if (val == '利润总额') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；利润总额（万元）：' + ele.totalProfit, value: '年份：' + ele.fiscalYear + '；利润总额（万元）：' + ele.totalProfit })
                })
              }
              if (val == '主营业务收入') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；主营业务收入（万元）：' + ele.mainBizInco, value: '年份：' + ele.fiscalYear + '；主营业务收入（万元）：' + ele.mainBizInco })
                })
              }
              if (val == '净利润') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；净利润（万元）：' + ele.netProfit, value: '年份：' + ele.fiscalYear + '；净利润（万元）：' + ele.netProfit })
                })
              }
              if (val == '纳税总额') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；纳税总额（万元）：' + ele.totalTax, value: '年份：' + ele.fiscalYear + '；纳税总额（万元）：' + ele.totalTax })
                })
              }
              if (val == '负债总额') {
                item.childrenData = []
                this.reportData.forEach((ele, index) => {
                  item.childrenData.push({ name: '年份：' + ele.fiscalYear + '；负债总额（万元）：' + ele.totalLiability, value: '年份：' + ele.fiscalYear + '；负债总额（万元）：' + ele.totalLiability })
                })
              }
            }
          }
        })
      }
    },
    alertTips (val) {
      this.$message({
        message: `暂无资产${val}数据`,
        type: 'warning'
      })
    },
    handleChange (item) {
      this.areaActive = item
      this.handleChartsClick()
    },
    // 核心技术人员
    getKeyTechData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getKeyTech(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.keyTechData = data
        }
      })
    },
    // 公司实际控制人
    getActualControllerData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getActualController(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.atualController = data
        }
      })
    },
    // 股东及其实际控制人
    getAcHolderData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getAcHolder(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.acholderData = data
        }
      })
    },
    // 对外下属投资方
    getInvestorsData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getInvestors(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.investorsData = data
        }
      })
    },
    // 合资合作方
    getCooperateData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getCooperate(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.cooperateData = data
        }
      })
    },
    // 借贷担保关系方
    getDebitData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getDebit(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.debitData = data
        }
      })
    },
    // 关联自然人
    getStackHolderData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getStackHolder(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.stackData = data
        }
      })
    },
    // 供应链关系方
    getRelatedPartyData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getRelatedParty(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.relatedData = data
        }
      })
    },
    // 资产租赁托管关系方
    getAssetsCustoData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getAssetsCusto(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.assetsCustoData = data
        }
      })
    },
    // 股权委托关系方
    getShareTrusteeData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getShareTrustee(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.shareTrusteeData = data
        }
      })
    },
    // 法律诉讼关系方
    getFLSSInfoData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getFLSSInfo(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.flssData = data
        }
      })
    },
    // 经营状况
    getAnnualReportData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getAnnualReport(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.reportData = data
        }
      })
    },
    // 专利信息
    getPatentData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getPatent(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.patentData = data
        }
      })
    },
    // 软件著作权
    getSoftwareData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getSoftware(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.softwareData = data
        }
      })
    },
    // 作品著作权
    getCopyrightData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getCopyright(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.CopyrightData = data
        }
      })
    },
    //商标
    getTrademarkData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getTrademark(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.trademarkData = data
        }
      })
    },
    //网站备案
    getWebsiteData (val) {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getWebsite(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          if (!data.length) {
            this.alertTips(val)
          }
          this.websiteData = data
        }
      })
    }
  },
  components: {
    JCard,
    relationCharts
  }
}
</script>
<style lang="less" scoped>
.relationInfo-container {
  margin-top: 30px;
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  .table-title {
    font-size: 14px;
    color: #141d54;
    font-weight: bolder;
    line-height: 20px;
    margin-bottom: 30px;
  }
  .tabs-content {
    .tabs-area {
      display: inline-block;
      margin-left: 10px;
      padding: 0 10px;
      min-width: 68px;
      height: 32px;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      color: #bbbfd0;
      border: 1px solid #d1d4e5;
      border-radius: 16px;
      &.active {
        background: rgba(75, 102, 254, 0.1);
        border-radius: 16px;
        color: #4b66fe;
        border-width: 0px;
      }
    }
  }
  .relation-wrap {
    width: 100%;
    height: 320px;
  }
}
</style>