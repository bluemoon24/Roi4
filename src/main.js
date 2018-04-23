import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)
Vue.use(Vuetify)

Vue.config.productionTip = false

// router.hashbang = false
// router.mode = 'history'
// router.base = '/roi4/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
