import Vue from 'vue'
import App from './App.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Viewer, {
  defaultOptions: {
    inline: false,
    button: true, // 取消按钮
    navbar: false, // 底部导航栏
    title: true, // 标题
    toolbar: {
      flipHorizontal: 0,
      flipVertical: 1,
      next: 2,
      oneToOne: 3,
      play: 4,
      prev: 'small',
      reset: 'small',
      rotateLeft: 'medium',
      rotateRight: 'medium',
      zoomIn: 'large',
      zoomOut: 'large'
    },
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
Vue.use(ElementUI)

Vue.config.productionTip = false

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// var option = {}
// Vue.use(preview, option)

new Vue({
  render: h => h(App)
}).$mount('#app')
