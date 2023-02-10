<template>
  <div>
    <j-card>
      <!-- <p class="j-chart-title">{{titleData}}</p> -->
      <ve-histogram
        v-on-echart
        :extend="lineBarOption.extend"
        :yAxis="lineBarOption.extend.yAxis"
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
import { getMatterData, getMatterTable } from "../api/api";
export default {
  props: ["boxData"],
  data() {
    return {
      areaCode: "440605",
      newData: this.boxData,
      // titleData: '',
      /* eslint-disable */
      colors: [
        "#43E5F4",
        "#EE6C65",
        "#FFC932",
        "#00DCF0",
        "#997EFF",
        "#CED3EB",
      ],
      lineBarOption: {
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
              end: 100,
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
    this.getMatterData();
    this.getMatterTable();
  },
  methods: {
    onConfirm(val) {
      this.newData = val;
      this.getMatterTable();
      this.getMatterData();
    },
    // handleTitle (checked, list) {
    //   if (list.model === checked) {
    //     list.list.map(ele => {
    //       if (ele.label === checked) {
    //         this.title1 = ele.value
    //       }
    //     })
    //   }
    // },
    getMatterData() {
      let time = "";
      let end = "";
      if (this.newData.timeData.model === "近1个月") {
        time = this.newData.timeData.time.endTime;
      } else if (this.newData.timeData.model === "季度") {
        time = this.newData.timeData.time.startTime;
        end = this.newData.timeData.time.endTime;
      } else {
        time = this.newData.timeData.time.startTime;
      }
      // if (this.newData.timeData.model === "季度") {
      //   this.activeType = "当季网络零售额";
      // } else {
      //   this.activeType = this.newData.sourceData[0].model;
      // }
      this.activeType = this.newData.sourceData[0].model;
      // this.handleTitle('', this.newData.sourceData[1])
      // this.titleData = this.title1 + this.newData.sourceData[0].model
      // this.titleData = this.title1 + this.newData.timeData.model
      let data = {
        params: {
          // dataType: this.newData.sourceData[1].model,
          start: time,
          endTime: end,
          code: this.areaCode,
          type: this.activeType,
        },
      };
      getMatterData(data).then((res) => {
        let data = res.data.data;
        let xname = [];
        let value = [];
        let yoy = [];
        if (data) {
          data.forEach((ele) => {
            value.push(ele.value);
            yoy.push(ele.yoy);
            xname.push(ele.name);
          });
          let l = xname.length;
          if (l > 20) {
            this.lineBarOption.extend.dataZoom[0].end = Math.floor(
              (100 / l) * 25
            );
          }

          this.lineBarOption.extend.series[0].data = value;
          this.lineBarOption.extend.series[1].data = yoy;
          this.lineBarOption.extend.xAxis.data = xname;
        }
      });
    },
    getMatterTable() {
      let time = "";
      let end = "";
      if (this.newData.timeData.model === "近1个月") {
        time = this.newData.timeData.time.endTime;
      } else if (this.newData.timeData.model === "季度") {
        time = this.newData.timeData.time.startTime;
        end = this.newData.timeData.time.endTime;
      } else {
        time = this.newData.timeData.time.startTime;
      }
      // if (this.newData.timeData.model === "季度") {
      //   this.activeType = "当季网络零售额";
      // } else {
      //   this.activeType = this.newData.sourceData[0].model;
      // }
      this.activeType = this.newData.sourceData[0].model;
      let data = {
        current: this.pageParams.page,
        size: this.pageParams.size,
        condition: {
          // dataType: this.newData.sourceData[1].model,
          start: time,
          code: this.areaCode,
          type: this.activeType,
          endTime: end,
        },
      };
      getMatterTable(data).then((res) => {
        let data = res.data.data;
        this.tableData = data.records;
        this.pageParams.total = Number(data.total);
      });
    },
    currentChange(val) {
      this.pageParams.page = val;
      this.getMatterTable();
    },
  },
  components: {
    JCard,
    JTable,
  },
};
</script>