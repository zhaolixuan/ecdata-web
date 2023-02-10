<template>
  <div class="markInfo-container">
    <j-card>
    <p class="table-title">企业评分</p>
    <el-row :gutter="20" type="flex">
      <el-col :span="14">
        <div class="j-charts-wrap">
        <div class="mark-total"><span>{{entScore.score}}</span>分</div>
        <div class="charts-box">
        <portrait
          :data="entScore"
          :id="portrait.id"
          :clazz="portrait.class"
          :option="portrait.option"
        ></portrait>
        </div>
        </div>
      </el-col>
      <el-col :span="10">
        <j-table :columnData="columnData" :tableStyle="tableStyle" :tableData="tableData" :pageParams="pageParams"></j-table>
      </el-col>
    </el-row>
    </j-card>
  </div>
</template>
<script>
import JCard from '@/components/layout/jCard/j-card'
import JTable from '@c/function/table'
import portrait from './charts/Portrait'
import { getScoreData } from '../api/api'
export default {
  data () {
    return {
      entScore: {
        base: '910',
        qualification: '822',
        judicature: '334',
        manage: '222',
        modification: '220'
      },
      portrait: {
        id: 'portrait',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      columnData: [
        { name: '序号', key: 'num' },
        { name: '类别', key: 'name'},
        { name: '得分', key: 'value' }
      ],
      tableData: [{
          num: '1',
          name:'基础评分',
          value: '0'

      }, {
          num: '2',
          name:'资质评分',
          value: '0'
      }, {
          num: '3',
          name:'司法评分',
          value: '0'
      }, {
          num: '4',
          name:'经营评分',
          value: '0'
      }, {
          num: '5',
          name:'历史沿革评分',
          value: '0'
      }],
      tableStyle: {
        height: '290px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 5,
        flag: false
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let data = {
        params: {
          entName: this.$route.query.name
        }
      }
      getScoreData(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.entScore = data
          this.tableData[0].value = data.base
          this.tableData[1].value = data.qualification
          this.tableData[2].value = data.judicature
          this.tableData[3].value = data.manage
          this.tableData[4].value = data.modification
        }
      })
    }
  },
  components: {
    JCard,
    JTable,
    portrait
  }
}
</script>
<style lang="less" scoped>
.markInfo-container {
  margin-top: 30px;
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  .table-title {
    font-size: 14px;
    color: #141D54;
    font-weight: bolder;
    line-height: 20px;
    // margin-bottom: 30px;
  }
  .j-charts-wrap {
    height: 100%;
    position: relative;
    .mark-total {
      position: absolute;
      right: 40px;
      width: 94px;
      height: 94px;
      line-height: 94px;
      text-align: center;
      border-radius: 50%;
      background: rgba(75,102,254,0.1);
      font-size: 14px;
      color: #280000;
      span {
        font-size: 36px;
        color: #4B66FE;
      }
    }
    .charts-box {
      height: 260px;
    }
  }
 
}
</style>