<!-- 网络零售分地区概况 -->
<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12" style="position: relative; overflow: hidden;">
      <div class="map-wrapper" ref="basicMapbox" style="height:470px;"></div>
      <map-popup id="mapPopup" v-show="mapPopupShow" :option="mapOption"></map-popup>
    </el-col>
    <el-col :span="12">
      <el-select v-model="value" placeholder="请选择" @change="handleChange" class="elsel">
        <el-option v-for="item in ptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <ve-histogram v-on-echart :extend="barOptions" :yAxis="barOptions.yAxis" height="430px" :colors="['#4B66FE']"></ve-histogram>
    </el-col>
  </el-row>
</template>

<script>
import mapconfigs from '@/assets/js/mapboxConfig'
import { tooltip } from '@/assets/js/echartsConfig'
import { getWLLSFDQQKUANG } from '../../api/api'
import { data } from './mapGeoJson'
import mapPopup from './map-popup'
export default {
  mounted () {
    this.initMap()
    this.getWLLSFDQQKUANGData()
  },
  data () {
    this.name = null
    this.filter = null
    return {
      /* eslint-disable */
      ptions: [{
        value: '1',
        label: '累计网络零售额（万元）'
      }, {
        value: '2',
        label: '累计网络零售额同比增长（%）'
      }],
      value: '1',
      barOptions: {
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          },
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: '#EDF0FD'
            }
          }
        },
        tooltip,
        yAxis: {
          type: 'category',
          data: [],
          boundaryGap: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999FC0"
            }
          }
        },
        grid: {
          right: '12%',
          top: '5%',
          bottom: '5%',
        },
        dataZoom: [{
          show: true,
          backgroundColor: 'rgb(236, 239, 253, .5)',
          fillerColor: 'rgb(216, 221, 253, .5)',
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 11,
          height: '80%',
          showDataShadow: false,
          start: 1,
          end: 100,
          top: 'center',
          right: '3%'
        }],
        legend: {
          show: false,
          icon: 'circle',
          left: 0
        },
        series: {
          name: '',
          barWidth: 16,
          data: [],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: '#EDF0FD',
            barBorderRadius: [10, 10, 10, 10]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10]
            }
          }
        }
      },
      map: null,
      mapPopupShow: false,
      mapOption: {
        name: 'abc',
        yoy: 0,
        pro: 0
      },
      mapData: []
    }
  },
  props: {
    startTime: {
      type: String,
      default: () => ''
    }
  },
  components: {
    mapPopup
  },
  watch: {
    startTime (n) {
      this.getWLLSFDQQKUANGData()
    }
  },
  methods: {
    initMap () {
      /* eslint-disable */
      mapboxgl.accessToken = mapconfigs.options.config.token
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: mapconfigs.options.config.style,
        center: [112.91172883098693, 23.09745142636079],
        zoom: 8.2,
        // pitch: 90,
        // bearing: 150,
        // minzoom: 2,
        // maxzoom: 14,
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: 'high'
          },
          ambient: {
            intensity: 0.2
          }
        },
        dragPan: false, // 禁止拖拽地图
        doubleClickZoom: false // 禁止缩放
      })
      this.map.scrollZoom.disable()
      var language = new MapboxLanguage()
      this.map.addControl(language)
      this.drawRegion()
    },
    // 渲染高亮区域和弹窗
    drawRegion () {
      this.map.on('load', () => {
        this.map.addSource('counties', {
          'type': 'geojson',
          'data': data
        })
        // 阴影层
        this.map.addLayer({
          'id': 'region',
          'type': 'fill',
          'source': 'counties',
          'paint': {
            // 'fill-outline-color': 'rgba(255, 255, 255,1)',
            'fill-color': 'rgba(54, 102, 255,0.25)'
          }
        })
        // 线层
        this.map.addLayer({
          'id': 'line',
          'type': 'line',
          'source': 'counties',
          'paint': {
            'line-color': 'rgba(255, 255, 255,1)',
            'line-width': 1.5
          }
        })
        // 高亮层
        this.map.addLayer(
          {
            'id': 'region-highlighted',
            'type': 'fill',
            'source': 'counties',
            // 'source-layer': 'original',
            'paint': {
              'fill-outline-color': '#3f51ff',
              'fill-color': '#3f51ff',
              'fill-opacity': 0.75
            },
            'filter': ['in', 'name', '']
          }
        )
        this.map.on('mousemove', 'region', (e) => {
          // console.log(this.map.getCenter())
          var features = this.map.queryRenderedFeatures(e.point, {
            layers: ['region']
          })
          if (!features.length) {
            return
          }
          const name = features[0].properties.name
          if (this.name !== name) {
            this.name = name
            this.mapOption = this.mapData.find(item => item.name === name)
            this.filter = features.reduce(
              function (memo, feature) {
                memo.push(feature.properties.name)
                return memo
              },
              ['in', 'name']
            )
          }
          this.map.setFilter('region-highlighted', this.filter)
          // // 设置弹窗
          var el = document.getElementById('mapPopup')
          this.mapPopupShow = true
          this.popuWindow = new mapboxgl.Marker(el, {
            offset: [0, -50]
            // anchor: 'top'
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(this.map)
        })
        this.map.on('mouseleave', 'region', (e) => {
          var filter = ['in', 'name', '']
          this.mapPopupShow = false
          this.map.setFilter('region-highlighted', filter)
        })
      })
    },
    handleChange () {
      this.getWLLSFDQQKUANGData()
    },
    getWLLSFDQQKUANGData () {
      const data = { params: { start: this.startTime } }
      getWLLSFDQQKUANG(data).then(res => {
        if (res.data.success) {
          this.barOptions.yAxis.data = []
          this.barOptions.series.data = []
          this.mapData = res.data.data
          res.data.data.forEach((item, i) => {
            this.barOptions.yAxis.data.push(item.name)
            if (this.value === '1') {
              this.barOptions.series.data.push(item.value)
              this.barOptions.series.name = "网络零售额(万元)"
            }
            if (this.value === '2') {
              this.barOptions.series.data.push(item.yoy)
              this.barOptions.series.name = "同比增长(%)"
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
a.mapboxgl-ctrl-logo {
  display: none;
}
.mapboxgl-ctrl-attrib-inner a {
  display: none;
}
.map-wrapper {
  height: 360px;
  // height: 100%;
}
/deep/ .el-select.elsel{
  width: 200px;
}
</style>
