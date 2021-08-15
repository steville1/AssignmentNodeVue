import Vue from 'vue'
import App from './App.vue'
import router from  './utils/router'
import  './utils/axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false
//Vue.prototype.$http = axios;

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
