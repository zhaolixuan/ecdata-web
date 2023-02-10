<!-- 测试菜单页面 -->
<template>
  <div>
    测试页面
    <ve-line :data="chartData" v-on-echart></ve-line>
    <j-time @dateHandle="dateHandle" />
    <j-module title="网络零售市场概况">
      <!-- <template #title>
        title 插槽
      </template> -->
      <j-card>
        测试
      </j-card>
    </j-module>
    <ve-ring :data="chartDatarg" :settings="chartSettings" :extend="chartExtend"></ve-ring>
    <button @click="onClick">点击</button>
    <j-module title="测试数据 （专用于 copy 哈哈哈）">
      <!-- 堆叠图 -->
      <j-card>
        <p class="j-chart-title">月度网络零售额走势（万元）</p>
        <ve-histogram v-on-echart :series="StackingOptions.series" :dataZoom="StackingOptions.dataZoom" :legend="StackingOptions.legend" :colors="colors" :yAxis="StackingOptions.yAxis" :xAxis="StackingOptions.xAxis"></ve-histogram>
      </j-card>
      <j-card>
        <p class="j-chart-title">当期网络零售额变化趋势</p><!-- 柱状+折现图 -->
        <ve-histogram v-on-echart :data="lineBarOptions.chartData" :settings="lineBarOptions.chartSettings" :extend="lineBarOptions.extend" :colors="colors"></ve-histogram>
      </j-card>
    </j-module>
    <j-tabs :tabs="tabs">
      <template #main>
        <span class="tabs-area" :class="{'active':activeArea===item}" @click="activeArea = item" v-for="(item,index) in areaData" :key="index">{{item.name}}</span>
      </template>
    </j-tabs>
  </div>
</template>

<script>
import JTime from '@c/function/time'
import JModule from '@/components/layout/jModule/j-module'
import JCard from '@/components/layout/jCard/j-card'
import JTabs from '@/components/function/tabs/tabs'
export default {
  data () {
    this.chartExtend = {
      series: {
        radius: ['50%', '70%'],
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
        }
      },
      tooltip: {},
      grid: {},
      // yAxis: {},
      legend: {
        orient: 'vertical',
        icon: 'circle',
        right: 70,
        top: 'center'
      },
      title: {
        text: '同名数量统计',
        subtext: '纯属虚构',
        left: '10'
      }
    }
    this.chartSettings = {
      dataType: 'KMB',
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    }
    /* eslint-disable */
    return {
      chartData: {
        columns: ['日期', '销售额'],
        /* eslint-disable */
        rows: [
          { '日期': '1月1日', '销售额': { value: 133, itemStyle: {} } },
          { '日期': '1月2日', '销售额': 1223 },
          { '日期': '1月3日', '销售额': 2123 },
          { '日期': '1月4日', '销售额': 4123 },
          { '日期': '1月5日', '销售额': 3123 },
          { '日期': '1月6日', '销售额': 7123 }
        ]
      },
      chartDatarg: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1月1日', '访问用户': 1393 },
          { '日期': '1月2日', '访问用户': 3530 },
          { '日期': '1月3日', '访问用户': 2923 },
          { '日期': '1月4日', '访问用户': 1723 },
          { '日期': '1月5日', '访问用户': 3792 },
          { '日期': '1月6日', '访问用户': 4593 }
        ]
      },
      formData: {
        input: 'aaaa'
      },
      O1: {

      },
      colors: ['#4B66FE', '#EE6C65', '#FFC932', '#00DCF0', '#997EFF', '#CED3EB'],
      StackingOptions: {
        dataZoom: [
          {
            show: true,
            start: 1,
            end: 100,
            height: 11
          }
        ],
        legend: {
          icon: 'circle',
          left: 'left',
          data: ['访问用户', '下单用户', '测试1', '测试2', '测试3', '下单率']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6']
        },
        yAxis: {
          max: 200
        },
        series: [
          {
            name: '访问用户',
            type: 'line',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30],
            showBackground: true,
            backgroundStyle: {
              opacity: 0,
              barBorderRadius: [10, 10, 0, 0]
            },
          },
          {
            name: '下单用户',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30]
          },
          {
            name: '测试1',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30]
          },
          {
            name: '测试2',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30]
          },
          {
            name: '测试3',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30]
          },
          {
            name: '下单率',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            data: [20, 30, 20, 10, 20, 30],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      },
      lineBarOptions: {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单': 1291 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单': 3420 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单': 2813 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单': 1653 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单': 3622 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单': 4493 }
          ]
        },
        chartSettings: {
          showLine: ['下单用户', '下单'],
          axisSite: { right: ['下单用户'] },
          yAxisName: ['万元', '%']
        },
        extend: {
          dataZoom: [
            {
              show: true,
              start: 1,
              end: 100,
              height: 11
            }
          ],
          legend: {
            icon: 'circle',
            left: 0
          },
          series: {
            barWidth: 16,
            showBackground: true,
            backgroundStyle: {
              color: '#EDF0FD',
              barBorderRadius: [10, 10, 0, 0]
            },
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        }
      },
      activeArea: '全国地区',
      areaData: [{
        id: 1,
        name: '全国地区'
      }, {
        id: 1,
        name: '本地区'
      }],
      tabs: {
        active: 'market',
        tabList: [{
          label: '市场规模',
          name: 'market'
        }, {
          label: '行业分析',
          name: 'industry'
        }, {
          label: '渠道分析',
          name: 'aaaaa'
        }]
      }
    }
  },

  components: {
    JTime,
    JModule,
    JCard, 
    JTabs
  },

  computed: {},

  mounted () { },

  methods: {
    dateHandle (date) {
      console.log(date)
    },
    onClick () {
      console.log(this.formData.input)
    }
  }
}
function getRows () {
  return [{
    'word': 'visualMap',
    'count': 22199
  }, {
    'word': 'continuous',
    'count': 10288
  }, {
    'word': 'contoller',
    'count': 620
  }, {
    'word': 'series',
    'count': 10000
  }, {
    'word': 'gauge',
    'count': 12311
  }, {
    'word': 'detail',
    'count': 1206
  }, {
    'word': 'piecewise',
    'count': 4885
  }, {
    'word': 'textStyle',
    'count': 32294
  }, {
    'word': 'markPoint',
    'count': 18574
  }, {
    'word': 'pie',
    'count': 38929
  }, {
    'word': 'roseType',
    'count': 969
  }, {
    'word': 'label',
    'count': 37517
  }, {
    'word': 'emphasis',
    'count': 12053
  }, {
    'word': 'yAxis',
    'count': 57299
  }, {
    'word': 'name',
    'count': 15418
  }, {
    'word': 'type',
    'count': 22905
  }, {
    'word': 'gridIndex',
    'count': 5146
  }, {
    'word': 'normal',
    'count': 49487
  }, {
    'word': 'itemStyle',
    'count': 33837
  }, {
    'word': 'min',
    'count': 4500
  }, {
    'word': 'silent',
    'count': 5744
  }, {
    'word': 'animation',
    'count': 4840
  }, {
    'word': 'offsetCenter',
    'count': 232
  }, {
    'word': 'inverse',
    'count': 3706
  }, {
    'word': 'borderColor',
    'count': 4812
  }, {
    'word': 'markLine',
    'count': 16578
  }, {
    'word': 'line',
    'count': 76970
  }, {
    'word': 'radiusAxis',
    'count': 6704
  }, {
    'word': 'radar',
    'count': 15964
  }, {
    'word': 'data',
    'count': 60679
  }, {
    'word': 'dataZoom',
    'count': 24347
  }, {
    'word': 'tooltip',
    'count': 43420
  }, {
    'word': 'toolbox',
    'count': 25222
  }, {
    'word': 'geo',
    'count': 16904
  }, {
    'word': 'parallelAxis',
    'count': 4029
  }]
}
</script>
<style lang='less'>
.tabs-area {
  display: inline-block;
  margin-left: 10px;
  padding: 0 10px;
  min-width: 68px;
  height: 32px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  color: #bbbfd0;
  border: 1px solid #d1d4e5;
  border-radius: 16px;
  &.active {
    background: rgba(75, 102, 254, 0.1);
    border-radius: 16px;
    color: #4b66fe;
    border-width: 0px;
  }
}
</style>
