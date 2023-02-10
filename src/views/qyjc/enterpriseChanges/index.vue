<template>
  <div class="enterprise-change-container">
    <j-card class="boxshadow">
      <check-form :boxData="boxData" @clickConfirm="clickConfirm"></check-form>
    </j-card>
    <j-module>
      <template #title>
        <title-name title="季度统计" icon="wllse"></title-name>
      </template>
      <j-titlecard :titleCardList="titleCardList"></j-titlecard>
    </j-module>
    <j-echart></j-echart>
    <j-module>
      <template #title>
        <title-name title="电商企业迁入迁出分地区统计" icon="wllse"></title-name>
      </template>
      <j-map-table></j-map-table>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="本地区电商企业迁入迁出列表" icon="wllse"></title-name>
      </template>
      <j-card>
        <el-select v-model="table1Type" filterable placeholder="请选择" @change="inOutSelectChange">
          <el-option key="in" label="迁入企业数" :value="0"></el-option>
          <el-option key="out" label="迁出企业数" :value="1"></el-option>
        </el-select>
        <j-table class="mt20" :columnData="columnData1" :tableData="tableData1" :tableStyle="tableStyle1" :pageParams="pageParams1" @currentChange="currentChange1"></j-table>
      </j-card>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="本地区电商企业新增注册和吊销注销列表" icon="wllse"></title-name>
      </template>
      <j-card>
        <el-select v-model="table2Type" filterable placeholder="请选择" @change="regRevSelectChange">
          <el-option key="reg" label="新增注册企业数" value="0"></el-option>
          <el-option key="rev" label="注册吊销企业数" value="1"></el-option>
        </el-select>
        <j-table class="mt20" :columnData="columnData2" :tableData="tableData2" :tableStyle="tableStyle2" :pageParams="pageParams2" @currentChange="currentChange2"></j-table>
      </j-card>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@c/layout/jCard/j-card'
import checkForm from '@/components/function/checkForm/check-form'
import titleName from '@/components/function/title/title'
import JTitlecard from '@/views/home/components/titleCard/index.vue'
import JEchart from './components/echart'
import JMapTable from './components/mapTable'
import JTable from '@c/function/table'
import { getQuarterlyData, getInOutData, getRegRevData } from '../api/api'
export default {
  components: {
    JModule,
    JCard,
    titleName,
    JTitlecard,
    checkForm,
    JEchart,
    JMapTable,
    JTable
  },
  data () {
    return {
      titleCardList: [{
        name: '迁入企业数（家）',
        icon: require('@/assets/img/cart_1.png'),
        moneyCode: 'in',
        money: '0',
        colorBg: '#FF6F00',
        units: ' ',
        shadow: 'rgba(251, 170, 109, .7)'
      }, {
        name: '迁出企业数（家）',
        icon: require('@/assets/img/cart_1.png'),
        moneyCode: 'out',
        money: '0',
        units: ' ',
        colorBg: '#FFB100',
        shadow: 'rgba(251, 202, 92, .7)'
      }, {
        name: '新增注册企业数（家）',
        icon: require('@/assets/img/cart_1.png'),
        moneyCode: 'reg',
        money: '0',
        units: ' ',
        colorBg: '#34D3AA',
        shadow: 'rgba(154, 233, 205, .7)'
      }, {
        name: '注册吊销企业数（家）',
        icon: require('@/assets/img/cart_1.png'),
        moneyCode: 'rev',
        money: '0',
        units: ' ',
        colorBg: '#8573FF',
        shadow: 'rgba(169, 157, 254, .7)'
      }],
      boxData: {
        timeData: {
          title: '时间',
          model: '季度',
          time: {
            type: 'quarter', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月，'quarter'选择季度
            startTime: '202001',
            endTime: '202003'
          },
          list: []
        }
      },
      industryNum: '0',
      options: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      table1Type: 0,
      columnData1: [
        { name: '企业名称', key: 'company_name' },
        { name: '原省份', key: 'company_province_old' },
        { name: '原城市', key: 'company_city_old' },
        { name: '原区县', key: 'company_county_old' },
        { name: '迁入省份', key: 'company_province' },
        { name: '迁入城市', key: 'company_city' },
        { name: '迁入区县', key: 'company_county' },
        { name: '累计网零额（万元）', key: 'company_sales_amount_sum' }
      ],
      tableStyle1: {
        // height: "350px",
        isShowSort: true
      },
      tableData1: [{
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }],
      pageParams1: {
        total: 0,
        page: 1,
        size: 5
      },
      table2Type: '0',
      columnData2: [
        { name: '企业名称', key: 'company_name' },
        { name: '注册时间', key: 'startdate' },
        { name: '注册资本', key: 'registcapi' },
        { name: '省份', key: 'company_province' },
        { name: '城市', key: 'company_city' },
        { name: '区县', key: 'company_county' },
        { name: '累计网零额（万元）', key: 'company_sales_amount_sum' }
      ],
      tableStyle2: {
        // height: "350px",
        isShowSort: true
      },
      tableData2: [{
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }, {
        date: '2016-05-02',
        industry: '文化办公用品',
        value: 2400021,
        rate: 12
      }],
      pageParams2: {
        total: 500,
        page: 1,
        size: 10
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getQuarterlyData()
      this.getTableData(1)
      this.getTableData(2)
    },
    // 迁入迁出选择变化
    inOutSelectChange () {
      this.getTableData(1)
    },
    regRevSelectChange () {
      this.getTableData(2)
    },
    clickConfirm () {
      this.getQuarterlyData()
    },
    // 季度数据
    getQuarterlyData () {
      // const quarter = this.getQuarter()
      // const startMonth = (quarter - 1) * 3
      // const endMonth = quarter * 3 - 1
      // const data = {
      //   params: {
      //     start: startMonth,
      //     end: endMonth
      //   }
      // }
      const data = {
        params: {
          start: this.boxData.timeData.time.startTime,
          end: this.boxData.timeData.time.endTime
        }
      }
      getQuarterlyData(data).then(res => {
        // this.tableData = res.data.data
        const resData = res.data.data && res.data.data[0]
        if (resData) {
          this.titleCardList.forEach(item => {
            item.money = resData[item.moneyCode]
          })
          // this.$forceUpdate()
        }
      })
    },
    // 当前季度数
    getQuarter (d) {
      d = d || new Date()
      var m = Math.floor(d.getMonth() / 3) + 2
      return m > 4 ? m - 4 : m
    },
    getTableData (tableType) {
      const data = {
        current: this[`pageParams${tableType}`].page,
        size: this[`pageParams${tableType}`].size,
        condition: {
          type: this[`table${tableType}Type`]
        }
      }
      if (tableType === 1) {
        getInOutData(data).then(res => {
          this.tableData1 = res.data.data.records
          this.pageParams1.total = Number(res.data.data.total)
        })
      } else {
        getRegRevData(data).then(res => {
          this.tableData2 = res.data.data.records
          this.pageParams2.total = Number(res.data.data.total)
        })
      }
    },
    currentChange1 (val) {
      this.pageParams1.page = val
      this.getTableData(1)
    },
    currentChange2 (val) {
      this.pageParams2.page = val
      this.getTableData(2)
    }
  }
}
</script>
<style lang="less" scoped>
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
  margin-top: 20px;
}
.mt20 {
  margin-top: 20px;
}
</style>
