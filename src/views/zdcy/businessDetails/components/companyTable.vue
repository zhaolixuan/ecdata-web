<template>
  <div class="companyTable-container">
    <j-card>
      <p class="table-title">同类企业推荐</p> 
      <j-table :columnData="columnData" :tableStyle="tableStyle" :tableData="tableData" :pageParams="pageParams" @currentChange="currentChange"></j-table>
    </j-card>
  </div>
</template>
<script>
import JCard from '@/components/layout/jCard/j-card'
import JTable from '@c/function/table'
import { getSimilarData } from '../api/api'
export default {
  props: ['info'],
  data() {
    return {
      columnData: [
        { name: '企业名称', key: 'entName' },
        { name: '综合评分', key: 'overall'},
        { name: '所属地区', key: 'province' },
        { name: '企业亮点', key: 'highlights', isArray: true }
      ],
      tableData: [],
      tableStyle: {
        // height: '290px'
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 5,
        flag: false
      },
    }
  },
  watch: {
    'info': function() {
      this.getData()
    },
    deep:true
  },
  // mounted () {
  //   this.getData()
  // },
  methods: {
    currentChange (val) {},
    getData () {
      console.log(this.info)
      let data = {
        queryName: "getSimilarEntByIndustry",
        params: {
          industryLargeName: this.info.industryLargeName,
          industryMiddleName: this.info.industryMiddleName,
          industrySmallName: this.info.industrySmallName.split(" ")
        }
      }
      getSimilarData(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.tableData = data.map(item=>{
            return {
              ...item,
              overall: item.score.overall
            }
          })
        }
      })
    }
  },
  components: {
    JCard,
    JTable
  }
}
</script>
<style lang="less" scoped>
.companyTable-container {
  margin-top: 30px;
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  .table-title {
    font-size: 14px;
    color: #141D54;
    font-weight: bolder;
    line-height: 20px;
    margin-bottom: 30px;
  }
}
</style>