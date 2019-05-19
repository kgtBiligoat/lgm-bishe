import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/show/index'
import users from '@/components/show/users'
import getForm from '@/components/show/getForm'
import setForm from '@/components/show/setForm'
import login from '@/components/index.vue'
import liucheng from '@/components/show/components/showData.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      {
        path: 'users',
        name: 'users',
        component: users
      },
      {
        path: 'setForm',
        name: 'setForm',
        component: setForm
      },
      {
        path: 'getForm',
        name: 'getForm',
        component: liucheng
      }
    ]
  }],
  mode: 'history'
})
