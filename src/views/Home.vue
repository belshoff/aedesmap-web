<template>
  <section class="container-fluid">
    <div id="header" class="row px-0">
      <div class="col-md-12 col-lg-12 px-0 home-header">
        <h1>Aedes Map</h1>
      </div>
    </div>
    <div class="container-map row p-0 px-0">
      <div class="col-md-12 col-lg-12 mx-0 px-0">
        <main-map class="map" :style="{ height: mapHeihgt }" />
      </div>
    </div>
  </section>
</template>

<script>
import MainMap from '@/components/Map.vue'

export default {
  components: {
    'main-map': MainMap
  },
  data () {
    return {
      headerHeight: 0
    }
  },
  computed: {
    mapHeihgt () {
      return `calc(100vh - ${this.headerHeight}px)`
    }
  },
  mounted () {
    this.headerHeight = document.getElementById('header').clientHeight + 10
    // this.$forceUpdate()
  }
}
</script>

<style lang="scss">
.home-header {
  background-color: #42a1f5;
  color: white;
}

.container-map {
  border: solid #42a1f5 thick;
  // height: 100%;
}
</style>