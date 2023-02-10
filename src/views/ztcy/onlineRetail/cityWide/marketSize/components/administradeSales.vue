<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{ titleData }}排名</p>
        <ve-histogram
          v-on-echart
          :extend="barOptions.extend"
          :yAxis="barOptions.extend.yAxis"
          height="430px"
          :colors="['#4B66FE']"
        ></ve-histogram>
      </j-card>
    </el-col>
    <el-col :span="12">
      <j-card>
        <p class="j-chart-title">{{ titleData }}排名</p>
        <j-table
          :columnData="columnData"
          :tableData="tableData"
          :tableStyle="tableStyle"
          :pageParams="pageParams"
          @currentChange="currentChange"
        ></j-table>
      </j-card>
    </el-col>
  </el-row>
</template>
<script>
import { getAdminData, getAdminTable } from "../api/api.js";
import JCard from "@c/layout/jCard/j-card";
import JTable from "@c/function/table";
import { tooltip } from "@/assets/js/echartsConfig";
export default {
  props: ["boxData"],
  data() {
    return {
      /* eslint-disable */
      areaCode: "440605",
      newData: this.boxData,
      titleData: "",
      barOptions: {
        extend: {
          xAxis: {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#999FC0",
              },
            },
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#EDF0FD",
              },
            },
          },
          tooltip,
          yAxis: {
            type: "category",
            data: [],
            boundaryGap: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#999FC0",
              },
            },
          },
          grid: {
            right: "12%",
            top: "5%",
            bottom: "5%",
          },
          dataZoom: [
            {
              show: true,
              backgroundColor: "rgb(236, 239, 253, .5)",
              fillerColor: "rgb(216, 221, 253, .5)",
              yAxisIndex: 0,
              filterMode: "empty",
              width: 11,
              height: "80%",
              showDataShadow: false,
              start: 1,
              end: 100,
              top: "center",
              right: "3%",
            },
          ],
          legend: {
            show: false,
            icon: "circle",
            left: 0,
          },
          series: [
            {
              name: "占比",
              type: "bar",
              barWidth: 16,
              showBackground: true,
              data: [],
              backgroundStyle: {
                color: "#EDF0FD",
                barBorderRadius: [0, 10, 10, 0],
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 10, 10, 0],
                },
              },
            },
          ],
        },
      },
      columnData: [
        { name: "排名", key: "rank" },
        { name: "地区", key: "name" },
        { name: "网络零售额（万元）", key: "value" },
        { name: "占比（%）", key: "contrast" },
      ],
      tableData: [],
      tableStyle: {
        height: "330px",
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 6,
      },
      activeType: "",
    };
  },
  mounted() {
    this.getAdminData();
    this.getAdminTable();
  },
  methods: {
    onConfirm(val) {
      this.newData = val;
      if (val.sourceData[0].model == 0) {
        this.areaCode = "440605";
      } else {
        this.areaCode = "440600";
      }
      this.getAdminData();
      this.getAdminTable();
    },
    getLegendData(val) {
      let data = "";
      let unit = "";
      if (val === "当月网络零售额" || val === "累计网络零售额") {
        data = "网络零售额";
        unit = "万元";
        // if (this.newData.timeData.model === "季度") {
        //   this.activeType = "当季网络零售额";
        // } else {
        //   this.activeType = this.newData.sourceData[1].model;
        // }
      } else if (val === "当月网络零售量" || val === "累计网络零售量") {
        data = "网络零售量";
        unit = "万件";
        // if (this.newData.timeData.model === "季度") {
        //   this.activeType = "当季网络零售量";
        // } else {
        //   this.activeType = this.newData.sourceData[1].model;
        // }
      }
      this.activeType = this.newData.sourceData[1].model;
      this.barOptions.extend.series[0].name = `${data}(${unit})`;
      this.columnData[2].name = `${data}(${unit})`;
    },
    getAdminData() {
      this.getLegendData(this.newData.sourceData[1].model);
      let time = "";
      let end = "";

      if (this.newData.timeData.model === "近1个月") {
        time = this.newData.timeData.time.endTime;
      } else if (this.newData.timeData.model === "季度") {
        end = this.newData.timeData.time.endTime;
        time = this.newData.timeData.time.startTime;
      } else {
        time = this.newData.timeData.time.startTime;
      }

      // this.titleData = this.newData.sourceData[1].model
      this.titleData = this.newData.timeData.model;
      let data = {
        params: {
          type: this.activeType,
          start: time,
          code: this.areaCode,
          queryType: this.newData.sourceData[0].model,
          endTime: end,
        },
      };
      getAdminData(data).then((res) => {
        let data = res.data.data;
        let yname = [];
        let salesValue = [];
        if (data) {
          data.forEach((item, index) => {
            yname.unshift(item.name);
            salesValue.unshift(item.value);
          });
          this.barOptions.extend.yAxis.data = yname;
          this.barOptions.extend.series[0].data = salesValue;
        }
      });
    },
    getAdminTable() {
      let time = "";
      let end = "";
      if (this.newData.timeData.model === "近1个月") {
        time = this.newData.timeData.time.endTime;
      } else if (this.newData.timeData.model === "季度") {
        end = this.newData.timeData.time.endTime;
        time = this.newData.timeData.time.startTime;
      } else {
        time = this.newData.timeData.time.startTime;
      }
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.activeType,
          start: time,
          code: this.areaCode,
          queryType: this.newData.sourceData[0].model,
          endtime: end,
        },
      };
      getAdminTable(data).then((res) => {
        let data = res.data.data;
        this.tableData = data.records;
        this.pageParams.total = Number(data.total);
      });
    },
    currentChange(val) {
      this.pageParams.page = val;
      this.getAdminTable();
    },
  },
  components: {
    JCard,
    JTable,
  },
};
</script>