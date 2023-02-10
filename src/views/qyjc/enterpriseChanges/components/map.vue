<!-- 网络零售分地区概况 -->
<template>
  <div class="map-wrapper" ref="basicMapbox" style="height:724px;"></div>
</template>

<script>
import mapconfigs from '@/assets/js/mapboxConfig'
export default {
  mounted () {
    this.initMap()
  },
  data () {
    return {
    }
  },
  methods: {
    initMap () {
      /* eslint-disable */
      let map = null
        ; (mapboxgl.accessToken = mapconfigs.options.config.token),
          (map = new mapboxgl.Map({
            container: this.$refs.basicMapbox,
            style: mapconfigs.options.config.style,
            center: [112.950464, 27.836981],
            zoom: 9,
            // pitch: 90,
            // bearing: 150,
            minzoom: 2,
            maxzoom: 14,
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
            doubleClickZoom: false
          }))
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
}
</style>
