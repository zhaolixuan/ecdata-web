<template>
  <div>
    <j-card>
      <p class="j-chart-title">非实物一级行业{{ titleData }}</p>
      <ve-histogram
        v-on-echart
        :extend="lineBarOptions.extend"
        :yAxis="lineBarOptions.extend.yAxis"
        :colors="colors"
      ></ve-histogram>
      <j-table
        :columnData="columnData"
        :tableData="tableData"
        :tableStyle="tableStyle"
        :pageParams="pageParams"
        @currentChange="currentChange"
      ></j-table>
    </j-card>
  </div>
</template>
<script>
import JCard from "@c/layout/jCard/j-card";
import JTable from "@c/function/table";
import { xAxis, yAxis, dataZoom, tooltip } from "@/assets/js/echartsConfig";
import { getNonmatterData, getNonmatterTable } from "../api/api";
export default {
  props: ["boxData"],
  data() {
    return {
      areaCode: "300000",
      newData: this.boxData,
      titleData: "",
      /* eslint-disable */
      colors: [
        "#43E5F4",
        "#EE6C65",
        "#FFC932",
        "#00DCF0",
        "#997EFF",
        "#CED3EB",
      ],
      lineBarOptions: {
        extend: {
          xAxis: {
            ...xAxis,
            axisLabel: {
              rotate: 45,
            },
          },
          yAxis: [
            {
              ...yAxis,
              name: "万元",
            },
            {
              ...yAxis,
              name: "%",
            },
          ],
          tooltip,
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 20,
              height: 11,
            },
          ],
          legend: {
            data: ["网络零售额（万元）", "同比增长（%）"],
            icon: "circle",
            left: 0,
          },
          series: [
            {
              name: "网络零售额（万元）",
              type: "bar",
              barWidth: 16,
              showBackground: true,
              data: [],
              backgroundStyle: {
                color: "#EDF0FD",
                barBorderRadius: [10, 10, 0, 0],
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0],
                },
              },
            },
            {
              name: "同比增长（%）",
              type: "line",
              yAxisIndex: 1,
              data: [],
              barWidth: 16,
              showBackground: true,
              backgroundStyle: {
                color: "#EDF0FD",
                barBorderRadius: [10, 10, 0, 0],
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0],
                },
              },
            },
          ],
        },
      },
      columnData: [
        { name: "时间", key: "date" },
        { name: "行业", key: "name" },
        { name: "网络零售额（万元）", key: "value" },
        { name: "同比增长（%）", key: "yoy" },
        { name: "占比（%）", key: "pro" },
      ],
      tableData: [],
      tableStyle: {
        height: "330px",
      },
      pageParams: {
        total: 500,
        page: 1,
        size: 5,
      },
      activeType: "",
    };
  },
  mounted() {
    this.getNonmatterTable();
    this.getNonmatterData();
  },
  methods: {
    onConfirm(val) {
      this.newData = val;
      this.getNonmatterData();
      this.getNonmatterTable();
    },
    getNonmatterData() {
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
      if (this.newData.timeData.model === "季度") {
        this.activeType = "当季网络零售额";
      } else {
        this.activeType = this.newData.sourceData[0].model;
      }
      // this.titleData = this.newData.sourceData[0].model
      this.titleData = this.newData.timeData.model;
      let data = {
        params: {
          type: this.activeType,
          start: time,
          code: this.areaCode,
          endTime: end,
        },
      };
      getNonmatterData(data).then((res) => {
        console.log(res);
        let data = res.data.data;
        let xname = [];
        let value = [];
        let yoy = [];
        data.forEach((ele) => {
          value.push(ele.value);
          yoy.push(ele.yoy);
          xname.push(ele.name);
        });
        this.lineBarOptions.extend.series[0].data = value;
        this.lineBarOptions.extend.series[1].data = yoy;
        this.lineBarOptions.extend.xAxis.data = xname;
      });
    },
    getNonmatterTable() {
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
      if (this.newData.timeData.model === "季度") {
        this.activeType = "当季网络零售额";
      } else {
        this.activeType = this.newData.sourceData[0].model;
      }
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          type: this.activeType,
          start: time,
          code: this.areaCode,
          endTime: end,
        },
      };
      getNonmatterTable(data).then((res) => {
        let data = res.data.data;
        this.tableData = data.records;
        this.pageParams.total = Number(data.total);
      });
    },
    currentChange(val) {
      this.pageParams.page = val;
      this.getNonmatterTable();
    },
  },
  components: {
    JCard,
    JTable,
  },
};
</script>