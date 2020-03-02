<template>
  <section>
    <v-map :zoom="10" :center="initialLocation" style="height: 100%;">
      <v-icondefault></v-icondefault>
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker-cluster :options="clusterOptions" @clusterclick="click()" @ready="ready">
        <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icon">
          <v-popup :content="l.text"></v-popup>
        </v-marker>
      </v-marker-cluster>
    </v-map>
  </section>
</template>

<script>
  import * as Vue2Leaflet from 'vue2-leaflet'
  import { latLng, Icon, icon } from 'leaflet'
  import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
  import iconUrl from 'leaflet/dist/images/marker-icon.png'
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

  import app from '@/utils/firebase'

  function rand(n) {
    let max = n + 0.1
    let min = n - 0.1
    return Math.random() * (max - min) + min;
  }

  export default {
    components: {
      'v-map': Vue2Leaflet.LMap,
      'v-tilelayer': Vue2Leaflet.LTileLayer,
      'v-icondefault': Vue2Leaflet.LIconDefault,
      'v-marker': Vue2Leaflet.LMarker,
      'v-popup': Vue2Leaflet.LPopup,
      'v-marker-cluster': Vue2LeafletMarkercluster
    },
    firebase: {
      db_locations: app.database().ref('locations')
    },
    computed: {
      locations () {
        let arr = []
        this.db_locations.forEach( ( el, i ) => {
          arr.push({
            id: i,
            latlng: latLng(el.latitude, el.longitude),
            text: `<label>ComFoco: ${el.score * 100}%</label><img style="width: 100%" src="${el.urlImage}" />`
          })
        });
        return arr
      }
    },
    data () {
      let customicon = icon(Object.assign({},
        Icon.Default.prototype.options,
        {iconUrl, shadowUrl}
      ))
      return {
        icon: customicon,
        clusterOptions: {},
        initialLocation: latLng(-4.567198, -37.791344)
      }
    },
    mounted() {
      setTimeout(() => {
        // console.log('done')
        this.$nextTick(() =>{
          this.clusterOptions = { disableClusteringAtZoom: 11 }
        });
      }, 5000);
      this.init()
    },
    methods: {
      click: (e) => console.log("clusterclick", e),
      ready (e) {
        // console.log('ready', e)
      },
      init () {

        navigator.geolocation.getCurrentPosition(
          pos => {
            console.log("POS", pos)
            // this.gettingLocation = false;
            // this.location = pos;
          },
          err => {
            console.error("Não pegou");
            // this.gettingLocation = false;
            // this.errorStr = err.message;
          }
        )
      }
    },
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  html, body {
    height: 100%;
    margin: 0;
  }
</style>