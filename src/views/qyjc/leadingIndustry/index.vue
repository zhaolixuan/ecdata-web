<template>
  <div class="leading-industry-container">
    <!-- <j-titlecard  :titleCardList="titleCardList"></j-titlecard>
    <div class="tabs-content">
      <span class="tabs-area" :class="{'active':activeArea===item.id}" @click="activeArea = item.id" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
    </div>
    <div class="map-container">
      <j-map></j-map>
      <j-card class="table-container">
        <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
      </j-card>
    </div> -->

    <j-titlecard :titleCardList="titleCardList"></j-titlecard>
    <div class="tabs-content">
      <span class="tabs-area" :class="{'active':activeArea===item.id}" @click="tabChage(item)" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
    </div>
    <el-row :gutter="20" type="flex">
      <el-col :span="9">
        <j-card>
          <j-table :columnData="columnData" :tableData="tableData" :tableStyle="tableStyle" :pageParams="pageParams" @currentChange="currentChange"></j-table>
        </j-card>
      </el-col>
      <el-col :span="15">
        <j-card>
          <j-map ref="map" :callBack="mapLoadCallBack"></j-map>
        </j-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import JCard from '@c/layout/jCard/j-card'
import JTitlecard from '@/views/home/components/titleCard/index.vue'
import JMap from '../components/map'
import JTable from '@c/function/table'
import { getIndustryTotalData, getIndustryEnterpriseTableData, getMapPoint } from '../api/api'
export default {
  components: {
    JTitlecard,
    JMap,
    JCard,
    JTable
  },
  data () {
    return {
      titleCardList: [{
        id: 'hmjj',
        name: '家具企业数',
        icon: require('@/assets/img/cart_1.png'),
        money: '0',
        unit: '家',
        colorBg: '#FF6F00',
        shadow: 'rgba(251, 170, 109, .7)'
      }, {
        id: 'gyp',
        name: '饰品企业数',
        icon: require('@/assets/img/cart_1.png'),
        money: '0',
        unit: '家',
        colorBg: '#FFB100',
        shadow: 'rgba(251, 202, 92, .7)'
      }, {
        id: 'yh',
        name: '陶瓷企业数',
        icon: require('@/assets/img/cart_1.png'),
        money: '0',
        unit: '家',
        colorBg: '#34D3AA',
        shadow: 'rgba(154, 233, 205, .7)'
      }],
      activeArea: '家具',
      areaData: [{ id: '家具', name: '家居企业' }, { id: '服饰', name: '饰品企业' }, { id: '家电', name: '陶瓷企业' }],
      columnData: [
        { name: '企业名称', key: 'name', isShowInfo: true },
        { name: '年累计销售额(万元)', key: 'sum' }
      ],
      tableStyle: {
        isShowSort: true,
        label: '排名'
      },
      tableData: [],
      pageParams: {
        total: 0,
        page: 1,
        size: 10
      }
    }
  },
  watch: {
    activeArea () {
      this.pageParams.total = 0
      this.pageParams.page = 1
      this.getTableData()
    }
  },
  created () {
    this.getIndustryTotalData()
    this.getTableData()
  },
  methods: {
    getIndustryTotalData () {
      getIndustryTotalData().then(res => {
        const data = res.data.data && res.data.data[0]
        if (data) {
          this.titleCardList.forEach(item => {
            item.money = data[item.id] || '0'
          })
        }
      })
    },
    getTableData () {
      const data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.activeArea
        }
      }
      getIndustryEnterpriseTableData(data).then(res => {
        this.tableData = res.data.data.records
        this.pageParams.total = Number(res.data.data.total)
      })
    },
    currentChange (val) {
      this.pageParams.page = val
      this.getTableData()
    },
    tabChage (tab) {
      this.activeArea = tab.id
      this.getMapPointData()
    },
    mapLoadCallBack () {
      this.getMapPointData()
    },
    async getMapPointData () {
      const res = await getMapPoint({ params: { type: this.activeArea } })
      this.$refs.map.setPointData(res.data.data)
    }
  }
}
</script>
<style lang="less" scoped>
.tabs-content {
  padding: 30px 0 20px;
  box-sizing: border-box;
}
.tabs-area {
  display: inline-block;
  margin-left: 20px;
  padding: 0 10px;
  min-width: 68px;
  font-size: 14px;
  text-align: center;
  color: #201e2c;
  background: rgba(110, 114, 141, 0.1);
  border-radius: 4px;
  &.active {
    background: #4b66fe;
    border-radius: 4px;
    color: #ffffff;
    border-width: 0px;
  }
}
// .map-container {
//   position: relative;
//   height: 80vh;

//   .table-container {
//     width: 444px;
//     position: absolute;
//     top: 0;
//     left: 0;
//     /deep/ .el-table td,
//     .el-table th {
//       padding: 0;
//       height: 56px;
//     }
//   }
// }
</style>
