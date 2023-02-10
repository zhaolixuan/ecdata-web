<!-- 网络零售概况 -->
<template>
  <div class="online-retail-container">
    <j-tabs :tabs="tabs">
      <template #main>
        <div
          class="tabs-content"
          v-if="tabs.active == 'market' || tabs.active == 'industry' || tabs.active == 'channel'"
        >
          <span
            class="tabs-area"
            :class="{ active: activeArea === item.name }"
            @click="
              activeArea = item.name;
              area = item.area;
            "
            v-for="(item, index) in areaData1"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
        <div class="tabs-content" v-else>
          <span
            class="tabs-area"
            :class="{ active: activeArea === item.name }"
            @click="
              activeArea = item.name;
              area = item.area;
            "
            v-for="(item, index) in areaData"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
      </template>
    </j-tabs>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import JTabs from "@/components/function/tabs/tabs";
import wmarket from "./worldWide/marketSize/marketSize";
import windustry from "./worldWide/industryAnalysis/industryAnalysis";
import wchannel from "./worldWide/cannelAnalysis/cannelAnalysis";
import cmarket from "./cityWide/marketSize/marketSize";
import cindustry from "./cityWide/industryAnalysis/industryAnalysis";
import cchannel from "./cityWide/cannelAnalysis/cannelAnalysis";

export default {
  components: {
    JTabs,
    wmarket,
    windustry,
    wchannel,
    cmarket,
    cindustry,
    cchannel
  },

  data() {
    return {
      activeArea: "本地区",
      area: "c",
      areaData: [
        {
          id: 1,
          name: "全国地区",
          area: "w"
        },
        {
          id: 1,
          name: "本地区",
          area: "c"
        }
      ],
      areaData1: [
        {
          id: 1,
          name: "本地区",
          area: "c"
        }
      ],
      tabs: {
        active: "market",
        tabList: [
          {
            label: "市场规模",
            name: "market"
          },
          {
            label: "行业分析",
            name: "industry"
          },
          {
            label: "渠道分析",
            name: "channel"
          }
        ]
      }
    };
  },

  computed: {
    componentName() {
      return this.area + this.tabs.active;
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-content {
  padding: 30px 0;
  box-sizing: border-box;
}
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
