import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'workflow',
      component: () => import(/* webpackChunkName: "viewerjs" */ '@/views/workflow/index')
    },
    {
      path: '/el-image',
      name: 'el-image',
      component: () => import(/* webpackChunkName: "photo" */ '@/views/photo/upload')
    },
    {
      path: '/viewerjs',
      name: 'viewerjs',
      component: () => import(/* webpackChunkName: "viewerjs" */ '@/views/photo/viewerjs')
    },
    {
      path: '/vue-photo-preview',
      name: 'vue-photo-preview',
      component: () => import(/* webpackChunkName: "viewerjs" */ '@/views/photo/vue-photo-preview')
    }
  ]
})
