import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import IntroActivity from '../views/admin/introduction/intro-activity.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: "/login"
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin/intro/activity',
        name: 'IntroActivity',
        component: IntroActivity,
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
