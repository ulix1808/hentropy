import Vue from 'vue'
import App from './App.vue'
//import { BootstrapVue } from 'bootstrap-vue'
import Vuetify from 'vuetify';
import VuetifyIco from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import VueQRCodeComponent from 'vue-qrcode-component'
import DatetimePicker from 'vuetify-datetime-picker'
import '@mdi/font/css/materialdesignicons.css' 
import VueRouter from 'vue-router'
import router from './router'
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(Vuetify)
Vue.use(VuetifyIco)
Vue.use(DatetimePicker)
Vue.use(VueRouter)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify : new Vuetify(),
}).$mount('#app')

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

//Vue.use(BootstrapVue);

