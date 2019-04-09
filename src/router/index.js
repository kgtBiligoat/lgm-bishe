import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/components/show/menu'
import main from '@/components/show/main'
import render from '@/components/show/render'
import preview from '@/components/show/preview'
import index from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/render',
    name: 'render',
    component: render
  }, {
    path: '/preview',
    name: 'preview',
    component: preview
  }],
  mode: 'history'
})
