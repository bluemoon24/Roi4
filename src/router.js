import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Chart from './views/Chart.vue'
import Page from './views/Page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
