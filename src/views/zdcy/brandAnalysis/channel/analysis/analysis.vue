<template>
  <div class="mahogany-container mt30">
    <check-form
      class="boxshadow"
      :boxData="boxData"
      @clickConfirm="initData"
    ></check-form>
    <j-module title="品牌渠道零售额分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">TOP20品牌渠道零售额占比分析</p>
        <ve-histogram
          v-on-echart
          :extend="lineBarOptions.extend"
          :yAxis="lineBarOptions.yAxis"
          :colors="colors"
        ></ve-histogram>
      </j-card>
      <j-card class="boxshadow mt30">
        <!-- <p class="j-chart-title"><span>TOP20品牌渠道零售额分析(单位：万元)</span><span class="right"><span class="btn" :class="{active:tableActive===1}" @click="retailSalesChange(1)">占比</span><span class="btn" :class="{active:tableActive===2}" @click="retailSalesChange(2)">数值</span></span></p> -->
        <p class="j-chart-title">TOP20品牌渠道零售额分析(单位：元)</p>
        <j-table
          :columnData="columnData"
          :tableData="tableData"
          :tableStyle="tableStyle"
          :pageParams="pageParams"
        ></j-table>
      </j-card>
    </j-module>
    <j-module title="品牌渠道零售量分析">
      <j-card class="boxshadow">
        <p class="j-chart-title">TOP20品牌渠道零售量占比分析</p>
        <ve-histogram
          v-on-echart
          :extend="lineBarOptions1.extend"
          :yAxis="lineBarOptions1.yAxis"
          :colors="colors"
        ></ve-histogram>
      </j-card>
      <j-card class="boxshadow mt30">
        <p class="j-chart-title">TOP20品牌价格区间零售量分析(单位：件)</p>
        <!-- <p class="j-chart-title"><span>TOP20品牌价格区间零售量分析(单位：件)</span><span class="right"><span class="btn" :class="{active:tableActive1===1}" @click="salesVolumeChange(1)">占比</span><span class="btn" :class="{active:tableActive===2}" @click="salesVolumeChange(2)">数值</span></span></p> -->
        <j-table
          :columnData="columnData1"
          :tableData="tableData1"
          :tableStyle="tableStyle"
          :pageParams="pageParams"
        ></j-table>
      </j-card>
    </j-module>
  </div>
</template>

<script>
import JModule from "@/components/layout/jModule/j-module";
import JCard from "@c/layout/jCard/j-card";
import checkForm from "@/components/function/checkForm/check-form";
import JTable from "@c/function/table";
import { xAxis, yAxis, dataZoom, tooltip,colors } from "@/assets/js/echartsConfig";
import { getTop20pingtai, getTop20ppqdfx } from "../../api/api";

export default {
  props: ["activeName"],
  data() {
    return {
      boxData: {
        timeData: {
          title: "时间",
          model: "月度",
          time: {
            startMonthTime: "", // 月度起始时间
            type: "singleMonth", // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startTime: "",
            endTime: "",
          },
        },
      },
      colors: colors,
      seriesConfig: {
        barWidth: 8,
        backgroundStyle: {
          color: "#EDF0FD",
          barBorderRadius: [10, 10, 0, 0],
        },
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0],
          },
        },
        type: "bar",
      },
      lineBarOptions: {
        yAxis: {
          ...yAxis,
          name: "零售额占比(%)",
          nameTextStyle: {
            padding: [0, 0, -10, 55],
          },
        },
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45,
            },
          },
          dataZoom:[
            {
              show: true,
              start: 1,
              end: 20,
              height: 11
            }
          ],
          tooltip,
          legend: {
            data: [],
            icon: "circle",
            left: 0,
          },
          series: [],
        },
      },
      lineBarOptions1: {
        yAxis: {
          ...yAxis,
          name: "零售量占比（%）",
          nameTextStyle: {
            padding: [0, 0, -10, 55],
          },
        },
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45,
            },
          },
          dataZoom:[
              {
              show: true,
              start: 1,
              end: 20,
              height: 11
            }
          ],
          tooltip,
          legend: {
            data: [],
            icon: "circle",
            left: 0,
          },
          series: [],
        },
      },
      columnData: [],
      tableData: [],
      tableActive: 1,
      columnData1: [],
      tableData1: [],
      tableActive1: 1,
      tableStyle: {
        isShowSort: false,
      },
      pageParams: {
        flag: false,
      },
      rsColumn: {
        rs: [], // 销售额
        rsRatio: [], // 占比
      },
      svColumn: {
        sv: [], // 销售量
        svRatio: [], // 占比
      },
    };
  },

  components: {
    JModule,
    checkForm,
    JCard,
    JTable,
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.getTop20pingtai();
      this.getTop20ppqdfx();
    },
    getTop20pingtai() {
      const platform = [];
      const rs = this.rsColumn;
      const sv = this.svColumn;
      rs.rs = [];
      rs.rsRatio = [];
      sv.sv = [];
      sv.svRatio = [];
      // const columns1 = [{ name: '品牌', key: 'BRAND_NAME' }]
      // const columns2 = [{ name: '品牌', key: 'BRAND_NAME' }]
      rs.rs.push({ name: "品牌", key: "BRAND_NAME" });
      rs.rsRatio.push({ name: "品牌", key: "BRAND_NAME" });
      sv.sv.push({ name: "品牌", key: "BRAND_NAME" });
      sv.svRatio.push({ name: "品牌", key: "BRAND_NAME" });
      getTop20pingtai({
        params: {
          table: `${this.activeName}`,
          dataMonth: this.boxData.timeData.time.startTime,
        },
      }).then((res) => {
        const data = res.data.data;
        data.forEach((element) => {
          platform.push(element.PLATFORM);
          rs.rs.push({
            name: element.PLATFORM,
            key: `${element.PLATFORM}零售额`,
          });
          rs.rsRatio.push({
            name: element.PLATFORM,
            key: `${element.PLATFORM}零售额占比`,
          });
          sv.sv.push({
            name: element.PLATFORM,
            key: `${element.PLATFORM}零售量`,
          });
          sv.svRatio.push({
            name: element.PLATFORM,
            key: `${element.PLATFORM}零售量占比`,
          });
        });
        this.columnData = rs.rs;
        // 给新增 width 属性 修改列宽使用
        this.columnData.map((item, index) => {
          if (index < 5) item.width = "400px";
          else item.width = "120px";
        });
        this.columnData1 = sv.sv;
        // 给新增 width 属性 修改列宽使用 这次改完 43694和43698Bug 也解决了
        this.columnData1.map((item, index) => {
          if (index < 5) item.width = "400px";
          else item.width = "120px";
        });
        this.lineBarOptions.extend.legend.data = platform;
        this.lineBarOptions1.extend.legend.data = platform;
      });
    },
    getTop20ppqdfx() {
      const data = {
        params: {
          table: `${this.activeName}`,
          dataMonth: this.boxData.timeData.time.startTime,
        },
      };
      this.lineBarOptions.extend.xAxis.data = [];
      const xnames = [];
      getTop20ppqdfx(data).then((res) => {
        const data = res.data.data;
        this.tableData = this.tableData1 = data;
        data.forEach((item) => {
          xnames.push(item.BRAND_NAME);
        });
        const yAxisDATA = this.handleData(
          this.lineBarOptions.extend.legend.data,
          data,
          "零售额占比"
        );
        const yAxisDATA1 = this.handleData(
          this.lineBarOptions.extend.legend.data,
          data,
          "零售量占比"
        );
        this.lineBarOptions.extend.xAxis.data = xnames;
        this.lineBarOptions1.extend.xAxis.data = xnames;
        this.lineBarOptions.extend.series =
          this.lineBarOptions.extend.legend.data.map((item, index) => {
            return { ...this.seriesConfig, name: item, data: yAxisDATA[index] };
          });
        this.lineBarOptions1.extend.series =
          this.lineBarOptions.extend.legend.data.map((item, index) => {
            return {
              ...this.seriesConfig,
              name: item,
              data: yAxisDATA1[index],
            };
          });
      });
    },
    // 零售额占比和数量的切换 1:占比 2:数量
    retailSalesChange(type) {
      this.tableActive = type;
      if (type === 1) {
        this.columnData = this.rsColumn.rsRatio;
      } else {
        this.columnData = this.rsColumn.rs;
      }
    },
    salesVolumeChange(type) {
      this.tableActive1 = type;
      if (type === 1) {
        this.columnData1 = this.svColumn.svRatio;
      } else {
        this.columnData1 = this.svColumn.sv;
      }
    },
    // 处理数据，转换成echart需要的格式
    handleData(arr, arrobj, suffix) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        result[i] = [];
        for (let j = 0; j < arrobj.length; j++) {
          result[i].push(arrobj[j][`${arr[i]}${suffix}`]);
        }
      }
      return result;
    },
  },

  watch: {
    activeName(newval) {
      this.initData();
    },
  },
};
</script>

<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
.bg {
  background: #f6f7fb;
}
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39, 55, 153, 0.1);
  border-radius: 10px;
  height: 100%;
}
.j-chart-title {
  .right {
    float: right;
    .btn {
      cursor: pointer;
      &.active {
        color: #409eff;
      }
    }
    .btn + .btn {
      margin-left: 20px;
    }
  }
}
</style>
