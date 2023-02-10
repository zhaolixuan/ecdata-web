<!-- 用户画像分析 -->
<template>
  <div>
    <j-tabs :tabs="tabs" @handleActive="handleActive">
      <template #main>
        <div style="padding-top:20px;">
          <check-form :boxData="boxData" style="margin-bottom:15px;" @clickConfirm="clickConfirm"></check-form>
        </div>
      </template>
    </j-tabs>
    <!-- <j-styleanalysis></j-styleanalysis> -->
    <j-module :title="`${titleType}用户群体性别分析`">
      <j-card>
        <j-gender :active="tabs.active" :boxData="boxData" ref="genderMethod"></j-gender>
      </j-card>
    </j-module>
    <j-module :title="`${titleType}用户群体年龄分布`">
      <j-card>
        <j-genders :active="tabs.active" :boxData="boxData" ref="gendersMethod"></j-genders>
      </j-card>
    </j-module>
    <j-module :title="`${titleType}用户群体省份分布`">
      <j-card>
        <j-mapbar :active="tabs.active" :boxData="boxData" ref="mapbarMethod"></j-mapbar>
      </j-card>
    </j-module>
    <!-- <j-module style="margin-top:20px;">
      <j-marriage :active="tabs.active" :boxData="boxData" ref="marriageMethod"></j-marriage>
    </j-module> -->
    <!-- <j-module style="margin-top:20px;">
      <j-study :active="tabs.active" :boxData="boxData" ref="studyMethod"></j-study>
    </j-module> -->
  </div>
</template>

<script>
import JModule from '@/components/layout/jModule/j-module'
import JTabs from '@/components/function/tabs/tabs'
import checkForm from '@/components/function/checkForm/check-form'
import JCard from '@c/layout/jCard/j-card'
import JMapbar from './components/mapbar'
import JGender from './components/gender'
import JGenders from './components/genders'
import JMarriage from './components/marriage'
// import JStudy from './components/study'
// import JStyleanalysis from './components/styleanalysis'
export default {
  components: {
    JModule,
    JTabs,
    JCard,
    checkForm,
    JMapbar,
    JGender,
    JGenders,
    JMarriage,
    // JStudy
  },
  data () {
    return {
      activeArea: '家具',
      tabs: {
        active: 'HMJJ',
        tabList: [{
          label: '家具',
          name: 'HMJJ'
        }, {
          label: '服饰',
          name: 'GYP'
        }, {
          label: '家电',
          name: 'YH'
        }]
      },
      boxData: {
        timeData: {
          title: '时间',
          model: '月度',
          time: {
            type: 'singleMonth', // type值为'singleMonth'选择单月，'sectionMonth'选择区间月
            startMonthTime: '', // 月度起始时间
            endMonthTime: '', // 月度结束时间
            startTime: '', // 开始时间参数
            endTime: '', // 结束时间参数
            startPlaceholder: '请选择日期',
            endPlaceholder: '结束日期'
          }
        }
      },
      titleType: '家具'
    }
  },
  watch: {
    'tabs.active' (n) {
      if(n === 'HMJJ') {
        this.titleType = '家具'
      } else if(n === 'GYP'){
        this.titleType = '服饰'
      } else if(n === 'YH') {
        this.titleType = '家电'
      }
    }
  },
  methods: {
    handleActive (val) {
      this.tabs.active = val
    },
    clickConfirm (val) {
      this.$refs.genderMethod.onConfirm(val)
      this.$refs.gendersMethod.onConfirm(val)
      this.$refs.mapbarMethod.onConfirm(val)
      this.$refs.marriageMethod.onConfirm(val)
      this.$refs.studyMethod.onConfirm(val)
    }
  }
}
</script>

<style>
</style>
