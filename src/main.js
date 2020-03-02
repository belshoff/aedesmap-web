import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

/**
 * Axios config.
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

/**
 * Firebase config.
 */
import VueFire from 'vuefire'
Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
