import Vue from 'vue'
import App from './App.vue'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.config.productionTip = false

var option = {}
Vue.use(preview, option)

new Vue({
  render: h => h(App)
}).$mount('#app')
