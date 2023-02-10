<!-- 产品流通分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
        <!-- 产品流通分析 -->
        <div class="circulate-wrapper">
          <p class="title">{{componentName}}销售分布TOP城市</p>
          <div class="circulate-card">
            <!-- <div class="map">
              <map-chart :id="`sale_${tabs.active}_map`" :dataSource="saleMapData"></map-chart>
            </div> -->
            <div class="bar">
              <div class="bar-title">城市TOP10</div>
              <bar-chart :id="`sale_${tabs.active}_bar`" :dataSource="saleBarData"></bar-chart>
            </div>
          </div>
          <p class="title">{{componentName}}购买分布TOP城市</p>
          <div class="circulate-card">
            <div class="map">
              <map-chart :id="`buy_${tabs.active}_map`" :dataSource="buyMapData"></map-chart>
            </div>
            <div class="bar">
              <div class="bar-title">城市TOP10</div>
              <bar-chart :id="`buy_${tabs.active}_bar`" :dataSource="buyBarData"></bar-chart>
            </div>
          </div>
        </div>
      </template>
    </j-tabs>
  </div>
</template>

<script>
import JTabs from '@/components/function/tabs/tabs';
import checkForm from '@/components/function/checkForm/check-form'
import mapChart from '@/components/echarts/mapChart';
import barChart from '@/components/echarts/barChart';
import { getMapData, getTopData } from './api';
import mapData from '@/assets/json/mapdata.json';
export default {
  components: {
    JTabs,
    checkForm,
    mapChart,
    barChart
  },
  data () {
    return {
      tabs: {
        active: 'TOP_DPFX_HMJJ',
        tabList: [{
          label: '家具',
          name: 'TOP_DPFX_HMJJ',
          value: '红木家具'
        }, {
          label: '服饰',
          name: 'TOP_DPFX_GYP',
          value: '工艺品'
        }, {
          label: '家电',
          name: 'TOP_DPFX_YH',
          value: '油画'
        }]
      },
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            type: 'singleMonth',
            startMonthTime: '',
            startTime: '',
            endTime: ''
          }
        }
      },
      timeStr: '2020-10',
      saleMapData: [],
      saleBarData: [],
      buyMapData: [],
      buyBarData: [],
    }
  },
  computed: {
    componentName () {
      return this.tabs.tabList.filter(item => item.name == this.tabs.active)[0].label
    },
    componentValue () {
      return this.tabs.tabList.filter(item => item.name == this.tabs.active)[0].value
    }
  },
  mounted () {
    this.init();
  },
  watch: {
    componentName () {
      this.init();
    },
    timeStr () {
      this.init();
    }
  },
  methods: {
    init () {
      let buyParams = {
        dateTime: this.timeStr,
        type: '省份占比',
        attrType: '主站-' + this.componentValue
      }
      let saleParams = {
        dateTime: this.timeStr,
        type: '城市占比_销量',
        attrType: '主站-' + this.componentValue
      }
      // getMapData({params:saleParams}).then(res=>{
      //   if(res.data.code == 200){
      //     let data = res.data.data;
      //     this.saleMapData = data.map(item=>{
      //       return {
      //         name: item.attr_value,
      //         value: item.index_value
      //       }
      //     });
      //   }
      // });
      getTopData({ params: saleParams }).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.saleBarData = data.map(item => {
            return {
              name: item.attr_value,
              value: item.index_value,
              unit: item.value_unit
            }
          });
        }
      });
      getMapData({ params: buyParams }).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.buyMapData = data.map(item => {
            return {
              name: this.getProvinceName(item.attr_value),
              value: item.index_value,
              unit: item.value_unit
            }
          });
        }
      });
      getTopData({ params: buyParams }).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.buyBarData = data.map(item => {
            return {
              name: item.attr_value,
              value: item.index_value,
              unit: item.value_unit
            }
          });
        }
      });
    },
    getProvinceName (name) {
      let res = mapData.filter(item => {
        return item.name.indexOf(name) !== -1
      });
      return res && res.length > 0 ? res[0].name : name
    },
    handleActive (val) {
      this.tabs.active = val;
    },
    clickConfirm (val) {
      this.timeStr = val.timeData.time.startMonthTime;
    },
  }

}
</script>

<style lang="less" scoped>
.circulate-wrapper {
  padding-top: 22px;
  .title {
    margin-top: 26px;
    margin-bottom: 20px;
    color: #575c72;
    font-size: 24px;
    line-height: 33px;
  }
  .circulate-card {
    width: 100%;
    height: 500px;
    padding: 20px 40px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
    border-radius: 10px;
    display: flex;
    .map {
      width: 460px;
    }
    .bar {
      flex: 1;
      margin-left: 116px;
      .bar-title {
        font-size: 14px;
        color: #141d54;
      }
    }
  }
}
</style>
