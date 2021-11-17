import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import IntroActivity from '../views/admin/introduction/intro-activity.vue'
import ActivityDetail from '../views/admin/introduction/activity_detail.vue'
import IntroEnroll from '../views/admin/introduction/intro_enroll.vue'
import IntroCouncil from '../views/admin/introduction/intro_council.vue'


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
        path: '/home/intro/activity',
        name: 'IntroActivity',
        component: IntroActivity,
      },{
        path: '/home/intro/enroll',
        name: 'IntroEnroll',
        component: IntroEnroll,
      },{
        path: '/home/intro/council',
        name: 'IntroCouncil',
        component: IntroCouncil,
      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    children: [
      {
        path: '/detail/activity/detail',
        name: 'ActivityDetail',
        component: ActivityDetail,
      },
    ]
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
