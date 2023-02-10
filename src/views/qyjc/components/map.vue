<!-- 网络零售分地区概况 -->
<template>
  <div class="map-conta">
    <div class="map-wrapper" id="map" ref="basicMapbox"></div>
    <map-popup id="mapPopup" v-show="mapPopupShow" :option="mapOption"></map-popup>
  </div>
</template>

<script>
import mapPointImg from './img/map_point.png'
import mapconfigs from '@/assets/js/mapboxConfig'
import mapPopup from './map-popup'
const coordtransform = require("coordtransform")
export default {
  props: {
    callBack: Function
  },
  mounted () {
    this.initMap()
  },
  data () {
    return {
      mapData: [],
      mapPopupShow: false,
      mapOption: {}
    }
  },
  components: {
    mapPopup
  },
  methods: {
    initMap () {
      /* eslint-disable */
      mapboxgl.accessToken = mapconfigs.options.config.token
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: mapconfigs.options.config.style,
        // center: [119.0044084977975, 25.429123147123775],
        // center: [118.70055526403569, 25.368398562528034],
        center: [112.91172883098693, 23.09745142636079],
        zoom: 10,
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
        doubleClickZoom: false // 禁止缩放
      })
      var language = new MapboxLanguage()
      this.map.addControl(language)
      this.loadMap()
    },
    loadMap () {
      this.map.on('load', () => {
        this.map.resize()
        this.addMapSource()
      })
    },
    addMapSource () {
      this.map.addSource('dataSource', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
      this.map.loadImage(mapPointImg, (error, img) => {
        if (error) throw error
        this.map.addImage('pointImg', img)
        this.map.addLayer({
          id: 'pointLayer',
          type: 'symbol',
          source: 'dataSource',
          layout: {
            'icon-image': 'pointImg',
            'icon-size': 0.7, // icon 得倍数
            'icon-offset': [-0.5, -0.5],
            'icon-allow-overlap': true, // 放大再显示其他企业
            visibility: 'visible'
          }
        })
        this.map.addLayer({
          id: 'hlightLayer',
          type: 'symbol',
          source: 'dataSource',
          layout: {
            'icon-image': 'pointImg',
            'icon-size': 1, // icon 得倍数
            'icon-offset': [-0.5, -0.5],
            'icon-allow-overlap': true, // 放大再显示其他企业
            visibility: 'visible'
          },
          'filter': ['in', 'name', '']
        })
        this.map.on('mousemove', (e) => {
          var features = this.map.queryRenderedFeatures(e.point, {
            layers: ['pointLayer']
          })
          if (!features.length) {
            return
          }
          const name = features[0].properties.name
          if (this.name !== name) {
            this.name = name
            this.mapOption = this.mapData.find(item => item.COMPANY_NAME === name)
            this.filter = features.reduce(
              function (memo, feature) {
                memo.push(feature.properties.name)
                return memo
              },
              ['in', 'name']
            )
          }
          this.map.setFilter('hlightLayer', this.filter)
          // 设置弹窗
          var el = document.getElementById('mapPopup')
          this.mapPopupShow = true
          this.popuWindow = new mapboxgl.Marker(el, {
            offset: [0, -40]
            // anchor: 'top'
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(this.map)
        })
        this.map.on('mouseleave', 'pointLayer', (e) => {
          var filter = ['in', 'name', '']
          this.mapPopupShow = false
          this.map.setFilter('hlightLayer', filter)
        })
        this.map.on('click', (e) => {
          var features = this.map.queryRenderedFeatures(e.point, {
            layers: ['hlightLayer']
          })
          if (!features.length) {
            return
          }
          const name = features[0].properties.name
          this.$router.push('/qyjc/dossiers?name=' + name)
        })
        // 请求数据
        this.callBack()
      })
    },
    setPointData (list) {
      this.mapData = list
      this.drawPoint()
    },
    drawPoint () {
      let companyData = {
        type: 'FeatureCollection',
        features: []
      }
      this.mapData.forEach(item => {
        var gcj02towgs84 = coordtransform.gcj02towgs84(
          Number(item.LONGITUDE) + this.createRandom(),
          Number(item.LATITUDE) + this.createRandom()
        )
        // var coordinates = [Number(item.LONGITUDE) + this.createRandom(), Number(item.LATITUDE) + this.createRandom()]
        var coordinates = gcj02towgs84
        companyData.features.push({
          type: 'Feature',
          properties: {
            id: item.COMPANY_NAME,
            name: item.COMPANY_NAME
            // kind: 'company',
            // companyType: point.companyType,
            // industryType: point.industryType,
            // score: point.score,
            // title: point.title,
            // longitude: point.longitude,
            // latitude: point.latitude
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates
          }
        })
      })
      companyData = JSON.parse(JSON.stringify(companyData))
      if (!this.map.getSource('dataSource')) return
      this.map.getSource('dataSource').setData(companyData)
      this.map.resize()
    },
    createRandom () {
      const num = (Math.floor(Math.random() * 100) + 1) * 0.00001
      return num
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
.map-conta {
  height: 100%;
}
.map-wrapper {
  width: 100%;
  height: 100%;
}
</style>
