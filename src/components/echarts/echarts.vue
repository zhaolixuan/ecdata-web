<template>
  <div :id="buyKey" :style="option.style" v-loading="loading"></div>
</template>

<script>
export default {
  props: ['buykey', 'option', 'xarr', 'yarr'],
  data () {
    return {
      buyData: [],
      buyKey: `chart${(Math.random() * 1000000).toFixed(0)}`,
      loading: true
    };
  },
  computed: {
    colorShoppingList: {
      get () {
        return this.$store.state.option.colorShoppingList;
      },
      set (newValue) {
        return newValue;
      }
    }
  },
  mounted () {
    const chart = document.getElementById(this.buyKey);
    this.$echarts.init(chart).setOption(this.getOption());
  },
  updated () {
    const chart = document.getElementById(this.buyKey);
    this.$echarts.init(chart).setOption(this.getOption());
  },
  watch: {
    xarr () {
      this.buyData = this.xarr;
      if (this.buyData.length !== 0) {
        this.loading = false;
      }
      const chart = document.getElementById(this.buyKey);
      this.$echarts.init(chart).setOption(this.getOption());
    },
    yarr () {
      const chart = document.getElementById(this.buyKey);
      this.$echarts.init(chart).setOption(this.getOption());
    }
  },
  methods: {
    getOption () {
      const symobls = [
        'path://M11.2238582,4.35482246 L12.638012,3.20159169 L15.3073231,7.34455385 L15.3073231,7.34824615 L13.1017846,10.8079385 L9.20770475,10.7131594 L11.2238582,4.35482246 Z M10.1863385,-6.15384616e-05 L12.1740308,2.59316923 L10.6688,3.85224615 L8.32664615,10.7285538 L5.87249231,10.7064 L4.17895385,3.7304 L6.03249231,0.205476923 L10.1863385,-6.15384616e-05 Z M1.23064615,4.11501538 L4.16255963,2.73429618 L3.53558804,3.69174082 L5.24020342,10.7502024 L1.15433846,10.7820923 L-0.000123076923,8.91009231 L1.23064615,4.11501538 Z',
        'path://M6.63012,10.30925 C6.63012,9.64005 3.62012,6.63145 2.95092,6.63145 C3.62012,6.63145 6.63012,3.62005 6.63012,2.95085 C6.63012,3.62005 9.64012,6.63145 10.30932,6.63145 C9.64012,6.63145 6.63012,9.64005 6.63012,10.30925 M6.63012,-0.00035 C2.96912,-0.00035 -0.00028,2.96905 -0.00028,6.63145 C-0.00028,10.29245 2.96912,13.26045 6.63012,13.26045 C10.29252,13.26045 13.26052,10.29245 13.26052,6.63145 C13.26052,2.96905 10.29252,-0.00035 6.63012,-0.00035',
        'path://M-0.000466666667,8.6184 L6.6087,0.000233333333 L3.43536667,9.07806667 L-0.000466666667,8.6184 Z M10.19025,9.09218333 L7.22691667,0.0166833333 L13.7800833,8.73285 L10.19025,9.09218333 Z M10.23015,10.1390333 L13.63915,9.73186667 L7.31115,18.0117 L10.23015,10.1390333 Z M6.5646,18.0350333 L0.0639333333,9.5662 L3.48576667,9.99436667 L6.5646,18.0350333 Z M4.58115,9.15308333 L6.90515,0.438083333 L9.23848333,9.17875 L4.58115,9.15308333 Z M6.90795,17.7189833 L4.69595,10.10765 L9.11061667,10.1718167 L6.90795,17.7189833 Z',
        'path://M15.0827385,5.0316 L11.3124308,5.0316 L8.79781538,13.2076 L15.0827385,5.0316 Z M6.28427692,13.2076 L3.7632,5.0316 L0.000430769231,5.0316 L6.28427692,13.2076 Z M5.02750769,5.0316 L7.53458462,13.8343692 C7.53996923,13.8354462 7.54643077,13.8354462 7.55181538,13.8365231 L10.0556615,5.0316 L5.02750769,5.0316 Z M15.0827385,3.77375385 L11.9402769,0.000215384615 L8.79781538,0.000215384615 L11.3124308,3.77375385 L15.0827385,3.77375385 Z M3.14181538,0.000215384615 L0.000430769231,3.77375385 L3.77073846,3.77375385 L6.28427692,0.000215384615 L3.14181538,0.000215384615 Z M5.02750769,3.77375385 L10.0556615,3.77375385 L7.54212308,0.000215384615 L5.02750769,3.77375385 Z',
        'path://M8.64327692,10.7588923 L5.27573846,7.81673846 L8.18881538,2.35673846 C7.71927692,2.18658462 7.38327692,1.73966154 7.38327692,1.2152 C7.38327692,0.544276923 7.93358462,0.000430769232 8.61312308,0.000430769232 C9.29266154,0.000430769232 9.84189231,0.542123077 9.84189231,1.2152 C9.84189231,1.73966154 9.50804615,2.18443077 9.03635385,2.35673846 L11.9483538,7.81673846 L8.64327692,10.7588923 Z M15.9825077,3.731 C16.6642,3.731 17.2134308,4.27376923 17.2134308,4.94684615 C17.2134308,5.61776923 16.6642,6.16269231 15.9835846,6.16161538 C15.8748154,6.16161538 15.7692769,6.14546154 15.6658923,6.11961538 L14.5803538,11.0260769 C14.5803538,12.0803846 11.9052769,12.9365385 8.60666154,12.9365385 C5.30804615,12.9365385 2.63404615,12.0803846 2.63404615,11.0260769 L1.54743077,6.11961538 C1.44727692,6.14653846 1.33958462,6.16161538 1.22866154,6.16161538 C0.5502,6.16161538 -0.000107692308,5.61884615 -0.000107692308,4.94684615 C-0.000107692308,4.27484615 0.5502,3.731 1.22866154,3.731 C1.9082,3.731 2.45743077,4.27376923 2.45743077,4.94684615 C2.45743077,5.33776923 2.27112308,5.68561538 1.98035385,5.90853846 L8.60773846,11.8596154 L15.2318923,5.90853846 C14.9422,5.68561538 14.7548154,5.33776923 14.7548154,4.94684615 C14.7548154,4.27484615 15.3062,3.72992308 15.9825077,3.731 Z'
      ]
      const picData = this.buyData.map((item, index) => {
        if (index === 0) {
          return {
            value: item,
            symbol: symobls[index],
            symbolSize: ['18', '10.7'],
            symbolMargin: 5.3
          };
        } if (index === 1) {
          return {
            value: item,
            symbol: symobls[index],
            symbolSize: ['13.3', '13.3'],
            symbolMargin: 8
          };
        } if (index === 2) {
          return {
            value: item,
            symbol: symobls[index],
            symbolSize: ['17', '17.6'],
            symbolMargin: 6.1
          };
        } if (index === 3) {
          return {
            value: item,
            symbol: symobls[index],
            symbolSize: ['17', '14'],
            symbolMargin: 5.5
          };
        }
        return {
          value: item,
          symbol: symobls[index],
          symbolSize: ['17', '10'],
          symbolMargin: 4.4
        };
      });

      const colorShoppingList = [
        this.colorShoppingList[4],
        this.colorShoppingList[3],
        this.colorShoppingList[2],
        this.colorShoppingList[1],
        this.colorShoppingList[0]
      ]; // 颜色数组
      return {
        grid: {
          containLabel: true,
          left: 43,
          top: 24
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          backgroundColor: 'rgba(250,250,250,0.7)',
          borderColor: '#C2D5FF',
          borderSize: 1,
          // padding: 10,
          textStyle: {
            color: '#666',
            fontSize: 14
          },
          extraCssText: 'box-shadow: 0 0 4px 0 rgba(184,194,217,0.50);',
          formatter (params) {
            return `<span style="color:#353F44">${params[0].seriesName}</span><br/><span style="color:#7E828C">${params[0].name}：</span><span style="color:#7E828C">${params[0].value}%</span>`
          }
        },
        xAxis: {
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: {
          // data: self.yarr,
          data: ['收入很少', '蓝领', '小白领', '高级白领', '土豪'],
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },

          axisLabel: {
            margin: 30,
            textStyle: {
              fontSize: 14,
              color: '#7E828C'
            }
          }
        },
        series: {
          name: '购买力分布',
          type: 'pictorialBar',
          // label: labelSetting,
          symbolRepeat: true,
          //   symbolSize: ["65%", "60%"],
          barCategoryGap: '40%',

          itemStyle: {
            normal: {
              opacity: 0.8,
              color (params) {
                return colorShoppingList[params.dataIndex];
              }
            },
            emphasis: {
              opacity: 1
            }
          },
          data: picData,
          z: 10
        }
      };
    }
  }
};
</script>

<style scoped>
</style>
