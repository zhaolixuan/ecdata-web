<!-- 市场规模 -->
<template>
  <div class="market-size-container">
    <j-module title="本地区交易平台分析">
      <check-form
        :boxData="boxData1"
        @clickConfirm="clickConfirm"
        @handleData="handleData"
      ></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
      <j-precent :boxData="boxData1" ref="platformMethod"></j-precent>
    </j-module>
  </div>
</template>
<script>
import JModule from "@/components/layout/jModule/j-module";
import titleName from "@/components/function/title/title";
import checkForm from "@/components/function/checkForm/check-form";
import jPrecent from "./components/salesPrecent";
import { getSelectList } from "./api/api";
export default {
  data() {
    return {
      areaCode: "440605",
      boxData1: {
        id: 1,
        sourceData: [
          {
            title: "交易平台",
            model: "0",
            list: [
              {
                value: "全平台",
                label: "0",
              },
              {
                value: "单平台",
                label: "1",
              },
            ],
            selectValue: "",
            selectList: [
              {
                value: "淘宝网",
                label: "淘宝网",
              },
              {
                value: "京东",
                label: "京东",
              },
              {
                value: "天猫",
                label: "天猫",
              },
            ],
          },
          // {
          //   title: "指标",
          //   model: "当月网络零售额",
          //   list: [
          //     {
          //       value: "当期网络零售额",
          //       label: "当月网络零售额",
          //     },
          //     {
          //       value: "累计网络零售额",
          //       label: "累计网络零售额",
          //     },
          //   ],
          // },
        ],
        timeData: {
          title: "时间",
          model: "近1个月",
          time: {
            type: "singleMonth", // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: "",
            endMonthTime: "",
            startTime: "",
            endTime: "",
            startPlaceholder: "请选择日期",
            endPlaceholder: "结束日期",
          },
          list: [
            {
              value: "近1个月",
            },
            {
              value: "季度",
            },
            {
              value: "月度",
            },
          ],
        },
        selectData:0
      },
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    getListData() {
      const data = {
        params: {
          code: this.areaCode,
        },
      };
      getSelectList(data).then((res) => {
        const data = res.data.data;
        const dataList = [];
        data.forEach((ele) => {
          dataList.push({ value: ele.name, label: ele.name });
        });
        this.boxData1.sourceData[0].selectList = dataList;
      });
    },
    handleData(val) {
      this.selectData = val;
      if (val === "1") {
        this.boxData1.timeData.model = "近12个月";
        this.boxData1.timeData.time.type = "sectionMonth";
        this.boxData1.timeData.list[0].value = "近12个月";
      } else if (val === "0") {
        this.boxData1.timeData.model = "近1个月";
        this.boxData1.timeData.time.type = "singleMonth";
        this.boxData1.timeData.list[0].value = "近1个月";
        this.boxData1.sourceData[0].selectValue = "";
      }
    },
    clickConfirm(val) {
      if (val.sourceData[0].model == "1" && !val.sourceData[0].selectValue) {
        this.$message({
          message: "请选择单平台！",
          type: "warning",
        });
        return;
      }
      if (this.selectData == 1) {
        // 单平台
        this.$refs.platformMethod.onConfirm1(val);
      } else {
        // 全平台
        this.$refs.platformMethod.onConfirm(val);
      }
    },
  },
  components: {
    JModule,
    titleName,
    checkForm,
    jPrecent,
  },
};
</script>
<style lang="less" scoped>
</style>
