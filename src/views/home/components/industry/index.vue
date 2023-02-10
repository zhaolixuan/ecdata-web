<!-- 网络零售分地区概况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">实物一级行业累计网零额占比</p>
        <ve-ring v-on-echart :extend="pieConfig" height="270px" :colors="colors"></ve-ring>
      </j-card>
    </el-col>
    <el-col :span="6">
      <j-card>
        <p class="j-chart-title">累计网零额TOP4品类</p>
        <div v-for="(item, i) in moneyTopF" :key="i" class="j-money-top-four">
          <div class="j-money-top-four-img"><img :src="item.icon" alt=""></div>
          <div>
            <div class="j-money-top-four-title">{{item.title}}</div>
            <div class="j-money-top-four-cont">{{item.cont}}</div>
          </div>
        </div>
      </j-card>
    </el-col>
    <el-col :span="6">
      <j-card>
        <p class="j-chart-title">重点非实物一级行业累计网零额</p>
        <ve-histogram v-on-echart :series="barConfig.series" :grid="barConfig.grid" :xAxis="barConfig.xAxis" :tooltip="barConfig.tooltip" :yAxis="barConfig.yAxis" height="100%" :legend="barConfig.legend" :colors="['#4B66FE']"></ve-histogram>
      </j-card>
    </el-col>
  </el-row>
</template>

<script>
import JCard from '@c/layout/jCard/j-card'
import { colors, tooltipItem, tooltip } from '@/assets/js/echartsConfig'
import { getWLLSFHYQKUANG } from '../../api/api'

export default {
  props: {
    startTime: {  
      type: String
    }
  },
  data () {
    return {
      /* eslint-disable */
      colors: colors,
      moneyTopF: [{
        icon: require('./img/TOP1.png'),
        title: '文化办公用品',
        cont: '计算机及其配套产品'
      }, {
        icon: require('./img/TOP2.png'),
        title: '日用品',
        cont: '日用百货'
      }, {
        icon: require('./img/top4.png'),
        title: '粮油、食品',
        cont: '休闲食品'
      }, {
        icon: require('./img/top3.png'),
        title: '五金、电料',
        cont: '机械五金'
      }],
      pieConfig: {
        tooltip: tooltipItem,
        series: {
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: [],
          label: {
            normal: {
              show: false,
              formatter: '{b}\n{d}%',
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '22'
                // fontWeight: 'bold'
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: 'rgba(20,29,84,0.12)'
            }
          }
        },
        legend: {
          data: [],
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 8,
          itemGap: 20,
          right: 20,
          top: 'center'
        },
        // title: {
        //   text: '同名数量统计',
        //   subtext: '纯属虚构',
        //   left: '10'
        // }
      },
      barConfig: {
        tooltip,
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false,
          data: [],
          boundaryGap: false,
          axisLabel: {
            padding: [0, 0, 0, 20]
          },
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
          top: '15%',
          left: '-70',
          bottom: '10%',
        },
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: [{
          type: 'bar',
          name: '网络零售额(万元)',
          data: [],
          barWidth: 16,
          label: {
            show: true,
            position: ['0', '-20'],
            formatter: '{b}      {c}',
            color: '#141D54'
          },
          showBackground: true,
          backgroundStyle: {
            color: '#EDF0FD',
            barBorderRadius: [0, 10, 10, 0]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        }]
      }
    }
  },
  components: {
    JCard
  },
  watch: {
    startTime (n) {
      this.getWLLSFHYQKUANGData('SERVICE')
      this.getWLLSFHYQKUANGData('SINDUSTRY')
      this.getWLLSFHYQKUANGData('INDUSTRY_FS')
    }
  },
  mounted () {
    this.getWLLSFHYQKUANGData('SERVICE')
    this.getWLLSFHYQKUANGData('SINDUSTRY')
    this.getWLLSFHYQKUANGData('INDUSTRY_FS')
  },
  methods: {
    getWLLSFHYQKUANGData (queryType) {
      // INDUSTRY_FS:实物一级行业累计零售额
      // SINDUSTRY:实物二级行业累计零售额
      // SERVICE:非实物一级行业累计零售额
      const data = { params: { start: this.startTime, queryType: queryType } }
      getWLLSFHYQKUANG(data).then(res => {
        if (res.data.success) {
          if (queryType === 'SERVICE') {
            this.barConfig.yAxis.data = []
            this.barConfig.series[0].data = []
            res.data.data.forEach((item, i) => {
              if (i < 5) {
                this.barConfig.yAxis.data.push(item.name)
                this.barConfig.series[0].data.push(item.value)
              }
            })
          }
          if (queryType === 'SINDUSTRY') {
            res.data.data.forEach((item, i) => {
              if (i < 4) {
                this.moneyTopF[i].title = item.name
                this.moneyTopF[i].cont = item.value
              }
            })
          }
          if (queryType === 'INDUSTRY_FS') {
            this.pieConfig.legend.data = []
            this.pieConfig.series.data = []
            if (res.data.data && res.data.data.length > 16) {
              this.pieConfig.series.center = ['15%', '50%']
            } else {
              this.pieConfig.series.center = ['30%', '50%']
            }
            res.data.data && res.data.data.forEach((item, i) => {
              this.pieConfig.legend.data.push(item.name)
              this.pieConfig.series.data.push({
                name: item.name,
                value: item.value
              })
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.j-money-top-four {
  display: flex;
  padding-bottom: 18px;
  .j-money-top-four-img {
    display: flex;
    align-items: center;
  }
  .j-money-top-four-img img {
    display: block;
    width: 34px;
    height: auto;
  }
  .j-money-top-four-title {
    font-size: 14px;
    color: #141d54;
    padding-left: 12px;
  }
  .j-money-top-four-cont {
    font-size: 12px;
    color: #bbbfd0;
    padding-left: 12px;
    padding-top: 3px;
  }
}
</style>
