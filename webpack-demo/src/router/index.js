import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'element Upload',
      component: () => import(/* webpackChunkName: "element" */ '@/pages/element/Upload.vue')
    },
    {
      path: '/viewerjs',
      name: 'viewerjs',
      component: () => import(/* webpackChunkName: "viewerjs" */ '@/pages/viewerjs')
    }
  ]
})
