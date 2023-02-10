<template>
  <div class="business-details-container">
    <p @click="$router.back()">&lt;<span>返回</span> 优秀企业名单</p>
    <j-module>
      <company-info :info="baseInfo"></company-info>
    </j-module>
    <j-module>
      <base-info :info="baseInfo"></base-info>
    </j-module>
    <j-module>
      <financing-info></financing-info>
    </j-module>
    <j-module>
      <mark-info></mark-info>
    </j-module>
    <j-module>
        <relation-info :info="baseInfo"></relation-info>
    </j-module>
    <j-module>
      <company-table :info="baseInfo"></company-table>
    </j-module>
  </div>
</template>
<script>
import JModule from '@/components/layout/jModule/j-module'
import companyInfo from './components/companyInfo'
import baseInfo from './components/baseInfo'
import markInfo from './components/markInfo'
import relationInfo from './components/relationInfo'
import companyTable from './components/companyTable'
import financingInfo from './components/financingInfo'
import RelationInfo from './components/relationInfo.vue'
import { getBaseData } from './api/api'
export default {
  data () {
    return {
      baseInfo: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let data = {
        params: {
          companyName: this.$route.query.name
        }
      }
      getBaseData(data).then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.baseInfo = {...res.data.data,
            createDate: `${new Date(parseInt(data.createDate)).getFullYear()}-${new Date(parseInt(data.createDate)).getMonth()+1}-${new Date(parseInt(data.createDate)).getDate()}` 
          }
        }
      })
    }
  },
  components: {
    JModule,
    baseInfo,
    companyInfo,
    markInfo,
    companyTable,
    financingInfo,
    relationInfo
  }
}
</script>
