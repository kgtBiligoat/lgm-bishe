import Vue from 'vue'
import Router from 'vue-router'
// import menu from '@/components/show/index'
import main from '@/components/show/index'
// import render from '@/components/show/render'
// import preview from '@/components/show/preview'
import index from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/main',
    name: 'main',
    component: main
  }],
  mode: 'history'
})
