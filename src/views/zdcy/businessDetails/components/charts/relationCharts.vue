<template>
  <div :id="id" :class="option.class" :style="option.style"></div>
</template>

<script>
export default {
  name: 'Portrait',
  props: {
    id: {
      type: String,
      default: ''
    },
    option: {
      type: Object
    },
    relationData: {
      type: Object
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandle)
  },
  watch: {
    relationData: {
      handler (newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(this.defaultOption())
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  methods: {
    init () {
      let that = this
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.defaultOption())
      window.addEventListener('resize', this.resizeHandle)
      this.chart.on('click', function(params) {
        that.$emit('handleChartsClick', params.name)
      })
    },
    resizeHandle () {
      this.chart.resize()
    },
    defaultOption () {
      return {
        series: [{
            type: 'tree',
            roam: true,
            layout: 'orthogonal',
            orient: 'LR',
            symbol: 'emptyCircle',
            symbolSize: 10,
            left:100,
            right:120,
            initialTreeDepth:2,
            // expandAndCollapse: false,
            label: {
                show: true,
                offset: [0, 0],
                align: 'center',
            },
            lineStyle: {
                color:'#3C65FF'
            },
            tooltip: {
                formatter: function(params){ return params.value.replace('/r/n','<br />')}
            },
            data: this.handleData()
            // data: [{
            //     name: this.relationData.title,
            //     value: this.relationData.title,
            //     symbol: 'circle',
            //     symbolSize: 1,
            //     label: {
            //         offset: [-30, 1],
            //         width: 94,
            //         height: 94,
            //         backgroundColor: '#3C65FF',
            //         lineHeight: 94,
            //         borderRadius: 50,
            //         borderColor:'rgba(70,109,255,.15)',
            //         borderWidth: 5,
            //         fontSize: 16,
            //         color:'#fff',
            //     },
            //     // children: [{
            //     //         name: '一级',
            //     //         value: '一级',
            //     //         symbol: 'circle',
            //     //         symbolSize: 14,
            //     //         label: {
            //     //             offset: [0, -15],
            //     //             fontSize: 14,
            //     //             color:'#666',
            //     //         },
            //     //         itemStyle: {
            //     //             borderColor:'rgba(70,109,255,.15)',
            //     //             borderWidth: 8,
            //     //             color: '#3C65FF',
            //     //         },
            //     //         children: [{
            //     //             name: '二级',
            //     //             value: '二级',
            //     //             symbol: 'circle',
            //     //             symbolSize: 14,
            //     //             label: {
            //     //                 offset: [0, -15],
            //     //                 fontSize: 14,
            //     //                 color:'#666',
            //     //             },
            //     //             itemStyle: {
            //     //                 borderColor:'rgba(70,109,255,.15)',
            //     //                 borderWidth: 8,
            //     //                 color: '#3C65FF',
            //     //             },
            //     //         }, {
            //     //             name: '二级22',
            //     //             value: '二级22',
            //     //             symbol: 'circle',
            //     //             symbolSize: 14,
            //     //             label: {
            //     //                 offset: [0, -15],
            //     //                 fontSize: 14,
            //     //                 color:'#666',
            //     //             },
            //     //             itemStyle: {
            //     //                 borderColor:'rgba(70,109,255,.15)',
            //     //                 borderWidth: 8,
            //     //                 color: '#3C65FF',
            //     //             },
            //     //         }]
            //     //     },
            //     //     {
            //     //         name: '一级2',
            //     //         value: '一级2',
            //     //         symbol: 'circle',
            //     //         symbolSize: 14,
            //     //         label: {
            //     //             offset: [0, -15],
            //     //             fontSize: 14,
            //     //             color:'#666',
            //     //         },
            //     //         itemStyle: {
            //     //             borderColor:'rgba(70,109,255,.15)',
            //     //             borderWidth: 8,
            //     //             color: '#3C65FF',
            //     //         }
            //     //     }
            //     // ]
            // }]
        }]
      }
    },
    handleData () {
      console.log(this.relationData)
      let data = []
      data= [{
        name: this.relationData.title,
        value: this.relationData.title,
        symbol: 'circle',
        symbolSize: 20,
        label: {
          offset: [10, -20],
          fontSize: 16,
          color:'#666',
        },
        itemStyle: {
            borderColor:'rgba(70,109,255,.15)',
            borderWidth: 14,
            color: '#3C65FF',
          },
        children: []
        }]
      this.relationData.childrenData.forEach((item, index) => {
        data[0].children.push({
          name: item.name,
          value: item.value,
          symbol: 'circle',
          symbolSize: 14,
          label: {
            offset: [0, -15],
            fontSize: 14,
            color:'#666',
          },
          itemStyle: {
            borderColor:'rgba(70,109,255,.15)',
            borderWidth: 8,
            color: '#3C65FF',
          },
          children: [] 
          })
        if (item.childrenData) {
          item.childrenData.forEach((ele, key) => {
            data[0].children[index].children.push({
              name: ele.name,
              value: ele.value,
              symbol: 'circle',
              symbolSize: 14,
              label: {
                offset: [0, -15],
                fontSize: 14,
                color:'#666',
              },
              itemStyle: {
                borderColor:'rgba(70,109,255,.15)',
                borderWidth: 8,
                color: '#3C65FF',
              } 
            })
          })
        }
      })
      console.log(data)
      return data
    }
  }
}
</script>

<style scoped>

</style>
