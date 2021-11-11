import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import HomeIntro from '../views/admin/homepage/home-intro.vue'
import HomeAdvertise from '../views/admin/homepage/home-advertise.vue'


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
        path: '/admin/homepage/intro',
        name: 'HomeIntro',
        component: HomeIntro,
      },{
        path: '/admin/homepage/advertise',
        name: 'HomeAdvertise',
        component: HomeAdvertise,
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
