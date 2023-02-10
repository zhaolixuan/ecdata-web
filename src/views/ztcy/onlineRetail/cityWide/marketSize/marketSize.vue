<!-- 市场规模 -->
<template>
  <div class="market-size-container">
    <j-module title="本地区整体零售市场分析">
      <check-form :boxData="boxData1" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售额" icon="wllse"></title-name>
      </template>
      <j-whole :boxData="boxData1" ref="wholeMethod"></j-whole>
    </j-module>
    <!-- 2020年10月08日修改 隐藏 -->
    <!-- <j-module title="上级地区整体零售市场分析">
      <check-form :boxData="boxData2" @clickConfirm="clickConfirm"></check-form>
    </j-module> -->
    <!-- 2021年10月12日修改 隐藏 -->
    <!-- <j-module>
      <template #title>
        <title-name title="当期网络零售量" icon="wllsl"></title-name>
      </template>
      <j-equal :boxData="boxData2" ref="equalMethod"></j-equal>
    </j-module> -->
    <j-module title="行政区域横向对比分析">
      <check-form :boxData="boxData3" @clickConfirm="clickConfirm"></check-form>
    </j-module>
    <j-module>
      <template #title>
        <title-name title="当期网络零售量" icon="wllsl"></title-name>
      </template>
      <j-administration
        :boxData="boxData3"
        ref="adminMethod"
      ></j-administration>
    </j-module>
  </div>
</template>
<script>
import JModule from "@/components/layout/jModule/j-module";
import titleName from "@/components/function/title/title";
import checkForm from "@/components/function/checkForm/check-form";
import jWhole from "./components/currentSales";
import jEqual from "./components/equalSales";
import jAdministration from "./components/administradeSales";
export default {
  data() {
    return {
      boxData1: {
        id: 1,
        sourceData: [
          {
            title: "指标",
            model: "当月网络零售额",
            list: [
              {
                value: "当期网络零售额",
                label: "当月网络零售额"
              },
              {
                value: "累计网络零售额",
                label: "累计网络零售额"
              }
              // 2020年10月08日修改 注释下面这四条
              // {
              //   value: "当期网络零售量",
              //   label: "当月网络零售量"
              // },
              // {
              //   value: "累计网络零售量",
              //   label: "累计网络零售量"
              // },
              // {
              //   value: "店铺数",
              //   label: "当月店铺数"
              // },
              // {
              //   value: "从业人数",
              //   label: "从业人数"
              // }
            ]
          }
        ],
        timeData: {
          title: "时间",
          model: "近12个月",
          list: [
            {
              value: "近12个月"
            },
            {
              value: "季度"
            },
            {
              value: "月度"
            }
          ],
          time: {
            type: "sectionMonth", // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: "", // 月度起始时间
            endMonthTime: "", // 月度结束时间
            startTime: "", // 开始时间参数
            endTime: "", // 结束时间参数
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期"
          }
        }
      },
      boxData2: {
        id: 2,
        sourceData: [
          {
            title: "指标",
            model: "当月网络零售额",
            list: [
              {
                value: "当期网络零售额",
                label: "当月网络零售额"
              },
              {
                value: "累计网络零售额",
                label: "累计网络零售额"
              },
              {
                value: "当期网络零售量",
                label: "当月网络零售量"
              },
              {
                value: "累计网络零售量",
                label: "累计网络零售量"
              },
              {
                value: "店铺数",
                label: "当月店铺数"
              },
              {
                value: "从业人数",
                label: "从业人数"
              }
            ]
          }
        ],
        timeData: {
          title: "时间",
          model: "近12个月",
          list: [
            {
              value: "近12个月"
            },
            {
              value: "季度"
            },
            {
              value: "月度"
            }
          ],
          time: {
            type: "sectionMonth", // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: "", // 月度起始时间
            endMonthTime: "", // 月度结束时间
            startTime: "", // 开始时间参数
            endTime: "", // 结束时间参数
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期"
          }
        }
      },
      boxData3: {
        id: 3,
        sourceData: [
          {
            title: "地区类型",
            model: "1",
            list: [
              // {
              //   value: "同级行政区",
              //   label: "0"
              // },
              // 2020年10月08日修改 改为 下级行政区 显示
              {
                value: "下级行政区",
                label: "1"
              }
            ]
          },
          {
            title: "指标",
            model: "当月网络零售额",
            list: [
              {
                value: "当期网络零售额",
                label: "当月网络零售额"
              },
              {
                value: "累计网络零售额",
                label: "累计网络零售额"
              }
              // 2020年10月08日修改 注释下面两条
              // {
              //   value: "当期网络零售量",
              //   label: "当月网络零售量"
              // },
              // {
              //   value: "累计网络零售量",
              //   label: "累计网络零售量"
              // }
            ]
          }
        ],
        timeData: {
          title: "时间",
          model: "近1个月",
          list: [
            {
              value: "近1个月"
            },
            {
              value: "季度"
            },
            {
              value: "月度"
            }
          ],
          time: {
            type: "singleMonth", // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: "", // 月度起始时间
            startTime: "", // 开始时间参数
            endTime: "", // 结束时间参数
            startPlaceholder: "请选择日期"
          }
        }
      }
    };
  },
  methods: {
    clickConfirm(val) {
      if (val.id === 1) {
        this.$refs.wholeMethod.onConfirm(val);
      } else if (val.id === 2) {
        this.$refs.equalMethod.onConfirm(val);
      } else {
        this.$refs.adminMethod.onConfirm(val);
      }
    }
  },
  components: {
    JModule,
    titleName,
    checkForm,
    jWhole,
    jEqual,
    jAdministration
  }
};
</script>
<style lang="less" scoped></style>
