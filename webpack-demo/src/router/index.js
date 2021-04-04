import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Workflow',
      component: () => import(/* webpackChunkName: "workflow" */ '@/views/workflow/Index')
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: () => import(/* webpackChunkName: "photo" */ '@/views/photo/Upload')
    },
    {
      path: '/Viewerjs',
      name: 'Viewerjs',
      component: () => import(/* webpackChunkName: "photo" */ '@/views/photo/Viewerjs')
    },
    {
      path: '/VuePhotoPreview',
      name: 'VuePhotoPreview',
      component: () => import(/* webpackChunkName: "photo" */ '@/views/photo/VuePhotoPreview')
    },
    {
      path: '/DialogVueImage',
      name: 'DialogVueImage',
      component: () => import(/* webpackChunkName: "photo" */ '@/views/photo/DialogVueImage')
    }
  ]
})
