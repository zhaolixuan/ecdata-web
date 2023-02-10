<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">购买力分布</p>
        <ve-radar
          v-on-echart
          :tooltip="radarCongig.tooltip"
          :splitArea="radarCongig.splitArea"
          :colors="radarCongig.colors"
          :series="radarCongig.series"
          :legend="radarCongig.legend"
          :radar="radarCongig.radar"
          height="300px"
        ></ve-radar>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">促销敏感度</p>
        <ve-radar
          v-on-echart
          :tooltip="radarCongig1.tooltip"
          :splitArea="radarCongig1.splitArea"
          :colors="['#00dcf0']"
          :series="radarCongig1.series"
          :legend="radarCongig1.legend"
          :radar="radarCongig1.radar"
          height="300px"
        ></ve-radar>
      </j-card>
    </el-col>
    <!-- <el-col :span="12">
      <j-card>
        <p class="j-chart-title">婚姻状况</p>
        <el-row :gutter="20" type="flex">
          <el-col :span="12">
            <ve-ring v-on-echart :extend="pieConfig" height="250px" :colors="['#4B66FE']"></ve-ring>
          </el-col>
          <el-col :span="12">
            <ve-ring v-on-echart :extend="gridConfig" height="250px" :colors="['#EE6C65']"></ve-ring>
          </el-col>
        </el-row>
      </j-card>
    </el-col> -->
  </el-row>
</template>

<script>
import JCard from "@c/layout/jCard/j-card";
import { colors, tooltipItem } from "@/assets/js/echartsConfig";
import { getGLXFXSJU } from "../../api/api";
export default {
  components: {
    JCard,
  },
  props: {
    active: {
      type: String,
      default: "",
    },
    boxData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      /* eslint-disable */
      newData: this.boxData,
      radarCongig: {
        colors: colors,
        tooltip: tooltipItem,
        legend: {
          show: false,
          left: 0,
          data: ["购买力分布（%）"],
        },
        radar: {
          shape: "circle",
          name: {
            textStyle: {
              color: "#666666",
            },
          },
          splitArea: {
            show: false,
          },
          indicator: [],
          // indicator: [
          //   { name: '销售', max: 6500},
          //   { name: '管理', max: 16000},
          //   { name: '信息技术', max: 30000},
          //   { name: '客服', max: 38000}
          // ],
          splitLine: {
            lineStyle: {
              color: "#e5e8f7",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#e5e8f7",
            },
          },
        },
        series: [
          {
            type: "radar",
            areaStyle: { normal: { color: "rgba(214, 220, 255, 1)" } },
            lineStyle: {
              width: 5,
            },
            data: [
              {
                value: [],
                name: "购买力分布（%）",
              },
            ],
          },
        ],
      },
      pieConfig: {
        tooltip: {
          show: false,
        },
        series: {
          radius: ["59%", "75%"],
          center: ["50%", "40%"],
          type: "pie",
          data: [{ value: 0, name: "已婚" }],
          label: {
            normal: {
              show: true,
              formatter: "{b}\n{c}%",
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "22",
                // fontWeight: 'bold'
              },
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: "rgba(20,29,84,0.12)",
            },
          },
        },
        legend: {
          data: ["已婚"],
          orient: "vertical",
          icon: "circle",
          itemHeight: 8,
          itemGap: 20,
          right: "center",
          bottom: "20",
        },
      },
      gridConfig: {
        tooltip: {
          show: false,
        },
        series: {
          radius: ["59%", "75%"],
          center: ["50%", "40%"],
          type: "pie",
          data: [{ value: 0, name: "未婚" }],
          label: {
            normal: {
              show: true,
              formatter: "{b}\n{c}%",
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "22",
                // fontWeight: 'bold'
              },
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
              shadowColor: "rgba(20,29,84,0.12)",
            },
          },
        },
        legend: {
          data: ["未婚"],
          orient: "vertical",
          icon: "circle",
          itemHeight: 8,
          itemGap: 20,
          right: "center",
          bottom: "20",
        },
      },
      radarCongig1: {
        tooltip: tooltipItem,
        legend: {
          show: false,
          left: 0,
          data: ["促销敏感度（%）"],
        },
        radar: {
          shape: "circle",
          name: {
            textStyle: {
              color: "#666666",
            },
          },
          splitArea: {
            show: false,
          },
          indicator: [],
          splitLine: {
            lineStyle: {
              color: "#e5e8f7",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#e5e8f7",
            },
          },
        },
        series: [
          {
            type: "radar",
            areaStyle: { normal: { color: "rgba(224, 250, 253, 1)" } },
            lineStyle: {
              width: 5,
            },
            data: [
              {
                value: [],
                name: "促销敏感度（%）",
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    active(n) {
      this.getData("购买力分布");
      this.getData("促销敏感度分布");
      // this.getData("婚姻状况分布");
    },
  },

  computed: {},

  mounted() {
    this.getData("购买力分布");
    this.getData("促销敏感度分布");
    // this.getData("婚姻状况分布");
  },
  methods: {
    onConfirm(val) {
      if (val) {
        this.newData = val;
      }
      this.getData("购买力分布");
      this.getData("促销敏感度分布");

      // this.getData("婚姻状况分布");
    },
    getData(type) {
      let data = {
        params: {
          dataType: this.active,
          type: type,
          start: this.newData.timeData.time.startTime,
        },
      };
      getGLXFXSJU(data).then((res) => {
        let data = res.data.data;
        let buyData = [];
        let indicatorData = [];
        let max = "";
        if (data.length) {
          if (type === "购买力分布") {
            max =
              Math.max.apply(
                Math,
                data.map((o) => {
                  return o.pro;
                })
              ) || 0;
            data.forEach((ele) => {
              indicatorData.push({ text: ele.name, max: max });
              buyData.push(ele.pro);
            });
            this.radarCongig.series[0].data[0].value = buyData;
            this.radarCongig.radar.indicator = indicatorData;
          } else if (type === "婚姻状况分布") {
            this.pieConfig.series.data[0].value = data[0].pro;
            this.pieConfig.series.data[0].name = data[0].name;
            this.pieConfig.legend.data[0] = data[0].name;
            this.gridConfig.series.data[0].value = data[1].pro;
            this.gridConfig.series.data[0].name = data[1].name;
            this.gridConfig.legend.data[0] = data[1].name;
          } else if (type === "促销敏感度分布") {
            max =
              Math.max.apply(
                Math,
                data.map((o) => {
                  return o.pro;
                })
              ) || 0;
            data.forEach((ele) => {
              indicatorData.push({ name: ele.name, max: max });
              buyData.push(ele.pro);
            });
            this.radarCongig1.series[0].data[0].value = buyData;
            this.radarCongig1.radar.indicator = indicatorData;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>