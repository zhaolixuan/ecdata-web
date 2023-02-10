<template>
  <div>
    <el-table-bar>
      <!-- :height="tableStyle.height ? tableStyle.height : 'auto'" :max-height="tableStyle.maxHeight ? tableStyle.maxHeight : 'auto'" -->
    <el-table :data="tableData" border stripe style="width: 100%;"  :row-class-name="tableRowClassName">
      <el-table-column align="center" type="index" :index="indexMeth" width="80px" :label="tableStyle.label ? tableStyle.label : '序号'" v-if="tableStyle.isShowSort"></el-table-column>
      <el-table-column align="center" v-for="(item, i) in columnData" :key="i" style="color: red" :prop="item.key" :label="item.name" :width="item.width ? item.width : 'auto'">
        <template slot-scope="scope">
          <div v-if="item.isShowInfo" class="industry-name" @click="toDossiers(scope.row)">{{scope.row[item.key]}}</div>
          <div class="point-list" v-else-if="item.isArray">
            <span v-for="(val, ind) in scope.row[item.key]" :key="ind">{{val}}</span>
          </div>
          <div class="industry-name" v-else-if="item.isDetail" @click="handleDetail(scope.row)">查看详情</div>
          <div v-else>{{scope.row[item.key]}}</div>
        </template>
      </el-table-column>
    </el-table>
    </el-table-bar>
    <div class="j-page-warp" v-if="tableShow">
      <el-pagination background layout="prev, pager, next" :current-page="pageParams.page" :pager-count="5" :total="pageParams.total" :page-size="pageParams.size" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import jCard from '../../layout/jCard/j-card.vue'
import './css/elementTable.less'

export default {
  props: {
    columnData: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    pageParams: {
      type: Object,
      default: () => { }
    },
    tableStyle: {
      type: Object,
      default: () => {
        return {
          height: '',
          maxHeight: ''
        }
      }
    }
  },

  components: {
    jCard
  },

  computed: {
    tableShow () {
      if (this.tableData.length <= 0) {
        return false
      }
      if (this.pageParams.flag || this.pageParams.flag === undefined) {
        return true
      }
      return false
    }
  },

  methods: {
    // 通过Table组件的row-class-name属性来为Table中的某一行添加class 表明该行处于某种状态
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'table-deep'
      } else if (rowIndex % 2 === 1) {
        return 'table-easy'
      }
      return ''
    },
    currentChange (val) {
      this.$emit('currentChange', val)
    },
    toDossiers (val) {
      this.$router.push({ path: '/qyjc/dossiers', query: { name: val.name, index: this.$route.meta.menuIndex } })
    },
    handleDetail (val) {
      this.$router.push({ path: '/zdcy/businessDetails', query: { name: val.company_name } })
    },
    indexMeth(index){
      return (index + 1) + (this.pageParams.page - 1) * 10;
    }
  }
}
</script>

<style scoped lang='less'>
.j-page-warp {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.industry-name {
  color: #4b66fe;
  cursor: pointer;
}
.point-list {
  span {
    display: inline-block;
    font-size: 14px;
    color: #2159f4;
    height: 24px;
    line-height: 24px;
    background: rgba(0, 97, 255, 0.1);
    padding: 0 5px;
    margin-right: 8px;
    margin-bottom: 5px;
  }
}
</style>
