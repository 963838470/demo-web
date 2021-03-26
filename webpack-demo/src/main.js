import Vue from 'vue'
import App from './App.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    inline: false,
    button: true,
    navbar: true,
    title: false,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true
  }
})

Vue.config.productionTip = false

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// var option = {}
// Vue.use(preview, option)

new Vue({
  render: h => h(App)
}).$mount('#app')
