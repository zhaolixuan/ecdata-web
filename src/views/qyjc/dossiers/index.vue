<template>
  <div>
    <p>&lt;<span @click="$router.back()">返回</span> {{navsTitle}}</p>
    <j-card class="boxshadow mt20">
      <div class="dossier-wrapper">
        <p class="mb30 fwb">
          <img src="" />
          <span>{{enterpriseInfo.company_name}}</span>
        </p>
        <dossier-content :data="enterpriseInfo"></dossier-content>
      </div>
    </j-card>
    <j-module>
      <template #title>
        <title-name title="销售看板" icon="wllse"></title-name>
      </template>
      <j-titlecard :titleCardList="titleCardList"></j-titlecard>
    </j-module>
    <j-echart :salesAmount="salesAmount" :salesVolume="salesVolume"></j-echart>
    <j-echart-table :companyName="entName"></j-echart-table>
    <j-module>
      <template #title>
        <title-name title="企业历史月份销售情况" icon="wllse"></title-name>
      </template>
      <j-card class="boxshadow">
        <j-table :columnData="columnData1" :tableData="tableData1" :tableStyle="tableStyle1" :pageParams="pageParams1" @currentChange="currentChange1"></j-table>
      </j-card>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="店铺看板" icon="wllse"></title-name>
      </template>
      <j-card class="boxshadow mb30">
        <div class="overview-wrapper">
          <div class="overview-count">
            <p class="mb30 fwb">
              <img src="" />
              <span>该企业拥有<span>{{shopTotalNum}}</span>家店铺：</span>
            </p>
            <div class="count-wrapper">
              <div v-for="(item, index) in shopList" :key="index">
                <p class="shop-name"><span class="shop-color" :style="`background: ${item.color}`"></span>{{item.shopName}}</p>
                <p class="shop-count"><span class="shop-num fwb">{{item.shopNum}}</span>家</p>
              </div>
            </div>
          </div>
          <img src="./img/shop-icon.png" />
        </div>
      </j-card>
      <j-card class="boxshadow">
        <el-date-picker v-model="dateValue" :default-value="dateValue" type="month" :placeholder="dateValue" format="yyyy-MM" value-format="yyyyMM"></el-date-picker>
        <j-table class="mt20" :columnData="columnData2" :tableData="tableData2" :tableStyle="tableStyle2" :pageParams="pageParams2" @currentChange="currentChange2"></j-table>
      </j-card>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import titleName from '@/components/function/title/title'
import JTitlecard from '@/views/home/components/titleCard/titleCard.vue'
import JTable from '@c/function/table'
import JEchart from './components/echart'
import JEchartTable from './components/echartTable'
import dossierContent from './components/dossiersContent'
import { navs } from '@/utils/routeNav'
import { getEnterpriseInfo, getEnterpriseSale12Month, getEnterpriseSaleMonth, getEnterprisePlatform, getEnterprisePlatformMonth } from '../api/api'
export default {
  components: {
    JModule,
    titleName,
    JTitlecard,
    JEchart,
    JEchartTable,
    JCard,
    JTable,
    dossierContent
  },
  data () {
    return {
      entName: '',
      navsTitle: '',
      enterpriseInfo: {},
      salesAmount: [],
      salesVolume: [],
      titleCardList: [{
        id: 'company_sales_amount_sum',
        name: '当年累计销售额',
        icon: require('@/assets/img/cart_5.png'),
        money: '366254.9',
        precentName: '同比增长',
        units: '万元',
        moneys: '',
        secondIndex: '',
        secondIndexId: 'company_sales_amount_sum_yoy'
      }, {
        id: 'company_sales_volume_sum',
        name: '当年累计销售量',
        icon: require('@/assets/img/cart_6.png'),
        money: '',
        precentName: '同比增长',
        units: '万件',
        moneys: '',
        secondIndex: '',
        secondIndexId: 'company_sales_volume_sum_yoy'
      }, {
        id: 'company_sales_amount',
        name: '当月销售额',
        icon: require('@/assets/img/cart_7.png'),
        money: '366254.9',
        units: '万元',
        moneys: '',
        precentName: '同比增长',
        secondIndex: '',
        secondIndexId: 'company_sales_amount_yoy'
      }, {
        id: 'company_sales_volume',
        name: '当月销售量',
        icon: require('@/assets/img/cart_8.png'),
        money: '366254.9',
        units: '万件',
        moneys: '',
        precentName: '同比增长',
        secondIndex: '',
        secondIndexId: 'company_sales_volume_yoy'
      }],
      columnData1: [
        { name: '时间', key: 'date' },
        { name: '月销量（万件）', key: 'company_sales_volume' },
        { name: '月销售额（万元）', key: 'company_sales_amount' },
        { name: '累计销量（万件）', key: 'company_sales_volume_sum' },
        { name: '累计销售额（万元）', key: 'company_sales_amount_sum' },
        { name: '月销量同比（%）', key: 'company_sales_volume_yoy' },
        { name: '月销量额同比（%）', key: 'company_sales_amount_yoy' },
        { name: '累计销量同比（%）', key: 'company_sales_volume_sum_yoy' },
        { name: '累计销量额同比（%）', key: 'company_sales_amount_sum_yoy' }
      ],
      tableStyle1: {
        // height: "350px",
        isShowSort: false
      },
      tableData1: [],
      pageParams1: {
        total: 0,
        page: 1,
        size: 10
      },
      dateValue: `${new Date().getFullYear()}${new Date().getMonth() + 1}`,
      shopTotalNum: 0,
      shopList: [],
      columnData2: [
        { name: '所在平台', key: 'platform' },
        { name: '店铺名称', key: 'name' },
        { name: '月销量（万件）', key: 'shop_sales_volume' },
        { name: '月销售额（万元）', key: 'shop_sales_amount' },
        { name: '累计销量（万件）', key: 'shop_sales_volume_sum' },
        { name: '累计销售额（万元）', key: 'shop_sales_amount_sum' },
        { name: '月销量同比（%）', key: 'shop_sales_volume_yoy' },
        { name: '月销量额同比（%）', key: 'shop_sales_amount_yoy' },
        { name: '累计销量同比（%）', key: 'shop_sales_volume_sum_yoy' },
        { name: '累计销量额同比（%）', key: 'shop_sales_amount_sum_yoy' }
      ],
      tableStyle2: {
        // height: "350px",
        isShowSort: true
      },
      tableData2: [],
      pageParams2: {
        total: 0,
        page: 1,
        size: 10
      }
    }
  },
  created () {
    this.entName = this.$route.query.name
    this.navsName()
    this.getEnterpriseSale12Month(0, 'salesAmount')
    this.getEnterpriseSale12Month(1, 'salesVolume')
    this.getEnterpriseInfo()
    this.getEnterpriseSaleMonth()
    this.getEnterprisePlatform()
    this.getEnterprisePlatformMonth()
  },
  watch: {
    dateValue () {
      this.getEnterprisePlatformMonth()
    }
  },
  computed: {
    dateSelector: {
      get () {
        if (this.dateValue) return this.dateValue
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        if (!month) {
          return `${year - 1}12`
        }
        return `${year}${month}`
      },
      set (val) {
        this.dateValue = val
      }
    }
  },
  methods: {
    navsName () {
      navs.map(item => {
        if (item.children) {
          item.children.map(ele => {
            if (ele.index === this.$route.query.index) {
              this.navsTitle = ele.title
            }
          })
        }
      })
    },
    // 企业基本信息及销售概况
    getEnterpriseInfo () {
      const data = {
        params: {
          name: this.$route.query.name
        }
      }
      getEnterpriseInfo(data).then(res => {
        const data = res.data.data && res.data.data[0]
        this.enterpriseInfo = data
        this.titleCardList.forEach(item => {
          item.money = this.enterpriseInfo[item.id]
          item.moneys = (this.enterpriseInfo[item.secondIndexId] || 0) + '%'
          item.group = this.enterpriseInfo[item.secondIndexId] > 0 ? 0 : 1
        })
      })
    },

    // 企业近12月销售情
    getEnterpriseSale12Month (type, obj) {
      const data = {
        params: {
          name: this.$route.query.name,
          type: type
        }
      }
      getEnterpriseSale12Month(data).then(res => {
        this[obj] = res.data.data
      })
    },
    // 企业月销售统计
    getEnterpriseSaleMonth () {
      const data = {
        current: this.pageParams1.page,
        size: this.pageParams1.size,
        condition: {
          name: this.$route.query.name
        }
      }
      getEnterpriseSaleMonth(data).then(res => {
        this.pageParams1.total = Number(res.data.data.total)
        this.tableData1 = res.data.data.records
      })
    },
    currentChange1 (val) {
      this.pageParams1.page = val
      this.getEnterpriseSaleMonth()
    },

    // 企业平台统计
    getEnterprisePlatform () {
      const data = {
        params: {
          name: this.$route.query.name
        }
      }
      let total = 0
      this.shopList = []
      getEnterprisePlatform(data).then(res => {
        res.data.data.forEach(item => {
          this.shopList.push({
            shopName: item.platform,
            shopNum: item.value,
            color: '#EE6C65'
          })
          total += Number(item.value)
        })
        this.shopTotalNum = total
      })
    },
    // 企业月销售统计
    getEnterprisePlatformMonth () {
      const data = {
        current: this.pageParams1.page,
        size: this.pageParams1.size,
        condition: {
          name: this.$route.query.name,
          start: this.dateValue
        }
      }
      getEnterprisePlatformMonth(data).then(res => {
        this.pageParams2.total = Number(res.data.data.total)
        this.tableData2 = res.data.data.records
      })
    },
    currentChange2 (val) {
      this.pageParams2.page = val
      this.getEnterprisePlatformMonth()
    }
  }
}
</script>
<style lang="less" scoped>
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
}
.mt20 {
  margin-top: 20px;
}
.mb30 {
  margin-bottom: 30px;
}
.fwb {
  font-weight: bold;
}
.total-container {
  background: #ffffff;
}
.overview-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .overview-count {
    width: 100%;
    .count-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      p {
        text-align: center;
      }
      .shop-name {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #6e728d;
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        .shop-color {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 6px;
        }
      }
      .shop-count {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #000024;
        line-height: 28px;
        .shop-num {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #141d54;
        }
      }
    }
  }
  img {
    width: 106px;
  }
}
</style>
