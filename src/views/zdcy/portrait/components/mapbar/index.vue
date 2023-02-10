<!-- 网络零售分地区概况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <map-chart :id="`${active}_map`" :dataSource="buyMapData"></map-chart>
    </el-col>
    <el-col :span="12">
      <p class="j-chart-title">城市排名TOP10</p>
      <!-- <ve-histogram v-on-echart :extend="barOptions" :yAxis="barOptions.yAxis" height="430px" :colors="['#4B66FE']"></ve-histogram> -->
         <j-table :columnData="columnData" :tableData="tableData" :pageParams="pageParams" ></j-table>
    </el-col>
  </el-row>
</template>

<script>
import mapChart from '@/components/echarts/mapChart'
import mapconfigs from '@/assets/js/mapboxConfig'
import { tooltip } from '@/assets/js/echartsConfig'
import { getGLXFXSJUCS,getGLXFXSJUCSMAP } from '../../api/api'
import JTable from '@c/function/table'

export default {

  mounted () {
    // this.initMap()
    this.getData()
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    boxData: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    mapChart,
    JTable
  },
  data () {
    return {
      /* eslint-disable */
      newData: this.boxData,
      barOptions: {
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          },
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        tooltip,
        yAxis: {
          type: 'category',
          data: [],
          boundaryGap: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          }
        },
        grid: {
          right: '12%',
          top: '5%',
          bottom: '5%',
        },
        dataZoom: [{
          show: true,
          backgroundColor: 'rgb(236, 239, 253, .5)',
          fillerColor: 'rgb(216, 221, 253, .5)',
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 11,
          height: '80%',
          showDataShadow: false,
          start: 1,
          end: 100,
          top: 'center',
          right: '3%'
        }],
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: {
          name: '城市占比（%）',
          // name: '省份占比（%）',
          barWidth: 16,
          showBackground: true,
          type: 'bar',
          data: [],
          backgroundStyle: {
            color: '#EDF0FD',
            barBorderRadius: [0, 10, 10, 0]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        }
      },
      buyMapData: [],
         columnData: [
        { name: '排名', key: 'pro' },
        { name: '城市', key: 'name' }
      ],
      tableData: [],
        pageParams: {
        total: 500,
        page: 1,
        size: 10,
        flag: false
      },
      
    }
  },
  watch: {
    active (n) {
      this.getData()
    }
  },

  computed: {},

  methods: {
    onConfirm (val) {
      if (val) {
        this.newData = val
      }
      this.getData()
    },
    getData () {
      let data = {
        params: {
          dataType: this.active,
          type: '省份占比',
          start: this.newData.timeData.time.startTime
        }
      }
      getGLXFXSJUCS(data).then(res => {
        this.tableData = res.data.data
        // let data = res.data.data
        // if (data.length) {
        //   let yname = []
        //   let areaData = []
        //   data.forEach(ele => {
        //     yname.unshift(ele.name)
        //     areaData.unshift(ele.pro)
        //   })
        //   // this.buyMapData = data.map(item => {
        //   //   return {
        //   //     name: this.setProvinceCity(item.name),
        //   //     value: item.pro,
        //   //     unit: '%'
        //   //   }
        //   // })
        //   this.barOptions.yAxis.data = yname
        //   this.barOptions.series.data = areaData
        // }
         getGLXFXSJUCSMAP(data).then(res => {
        this.buyMapData = res.data.data
      });
      });
     
    },
    setProvinceCity (name) {
      const city = ['北京', '上海', '天津', '重庆']
      if (city.includes(name)) {
        return `${name}市`
      }
      return `${name}省`
    }
  }
}
</script>
<style lang="less" scoped>
a.mapboxgl-ctrl-logo {
  display: none;
}
.mapboxgl-ctrl-attrib-inner a {
  display: none;
}
.map-wrapper {
  height: 360px;
}
</style>
