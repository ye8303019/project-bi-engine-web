import Vue from 'vue'
import Router from 'vue-router'
import Analytics from '@/components/Analytics'
import Dashboard from '@/components/Dashboard'
import DataSource from '@/components/DataSource'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'DataSource'
      }
      }, {
      path: '/DataSource',
      name: 'DataSource',
      component: DataSource
    }, {
      path: '/Analytics',
      name: 'Analytics',
      component: Analytics
    }, {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    }, 
  ]
})
