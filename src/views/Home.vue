<template>
  <section class="container-fluid">
    <div id="header" class="row px-0 home-header">
      <div class="col-md-12 col-lg-12 pt-2 text-left">
        <h1>Aedes Map</h1>
      </div>
    </div>

    <!-- <div class="col-md-2 col-lg-2 container-custom-select " >
      <select class="custom-select" v-model="mapType" >
        <option v-for="type in mapTypes" :key="type.key" :value="type.key"> {{ type.label }} </option>
      </select>
    </div> -->
    <div class="container-map row p-0 px-0">
      <div class="col-md-12 col-lg-12 mx-0 px-0">
        <marker-map v-if="mapType == 1" class="map" :style="{ height: mapHeihgt }" />
      </div>
    </div>
  </section>
</template>

<script>
import MarkerMap from '@/components/MarkerMap.vue'
import Services from '@/utils/services'

export default {
  mixins: [Services],
  components: {
    'marker-map': MarkerMap,
    // 'heat-map': HeatMap
  },
  computed: {
    mapHeihgt () {
      return `calc(100vh - ${this.headerHeight}px)`
    },
    mapTypes () {
      return [
        {
          label: 'Marker Cluster',
          key: 1
        },
        // {
        //   label: 'Heat Map',
        //   key: 2
        // },
      ]
    }
  },
  data () {
    return {
      headerHeight: 0,
      mapType: 1,
    }
  },
  mounted () {
    this.headerHeight = document.getElementById('header').clientHeight + 10
  },
  methods: { }
}
</script>

<style lang="scss">
.home-header {
  font-family: 'Trade Winds', ;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: gray;
  color: white;
  background-color: #42a1f5;
  // color: white;
}

.container-custom-select{
  position: absolute;
  top: 5rem;
  z-index: 999;
  right: 1rem;
  &>*{
    // background-color: transparent;
    // border-color: white;
    // color: white;
  }
}
</style>