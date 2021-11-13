import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import IntroActivity from '../views/admin/introduction/intro-activity.vue'
import IntroIntroduction from '../views/admin/introduction/intro-introduction.vue'


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
      {
        path: '/admin/intro/introduction',
        name: 'IntroIntroduction',
        component: IntroIntroduction,
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
