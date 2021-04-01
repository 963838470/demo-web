import Vue from 'vue'
import App from './App.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    inline: false,
    button: true, // 取消按钮
    navbar: false, // 底部导航栏
    title: true, // 标题
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true // 快捷键
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
