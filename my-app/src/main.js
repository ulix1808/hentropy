import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify : new Vuetify(),
}).$mount('#app')

Vue.use(BootstrapVue);

