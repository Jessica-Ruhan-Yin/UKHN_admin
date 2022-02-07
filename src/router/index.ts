import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import DetailContent from '../components/detail.vue'
import IntroActivity from '../views/admin/introduction/intro_activity.vue'
import IntroEnroll from '../views/admin/introduction/intro_enroll.vue'
import IntroCouncil from '../views/admin/introduction/intro_council.vue'
import AcademicForum from '../views/admin/academic/academic_forum.vue'
import AcademicReport from '../views/admin/academic/academic_report.vue'
import AcademicSeminar from '../views/admin/academic/academic_seminar.vue'
import AcademicStudyAbroad from '../views/admin/academic/academic_study_abroad.vue'
import CollaborationChina from '../views/admin/collaboration/collaboration_China.vue'
import CollaborationUKIreland from '../views/admin/collaboration/collaboration_UK_Ireland.vue'
import CollaborationCUI from '../views/admin/collaboration/collaboration_CUI.vue'
import HomePartners from '../views/admin/home/home_partners.vue'
import HomeNews from '../views/admin/home/home_news.vue'
import HomeAd from '../views/admin/home/home_ad.vue'
import TradeBusiness from '../views/admin/trade/trade_business.vue'
import TradePolicy from '../views/admin/trade/trade_policy.vue'
import TradeProject from '../views/admin/trade/trade_project.vue'
import TradePromotion from '../views/admin/trade/trade_promotion.vue'
import {Tool} from "@/util/tool";
import store from "@/store";


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: "/login"
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      loginRequire:true
    },
    children: [
      {
        path: '/intro/activity',
        name: 'IntroActivity',
        component: IntroActivity,
      }, {
        path: '/intro/enroll',
        name: 'IntroEnroll',
        component: IntroEnroll,
      }, {
        path: '/intro/council',
        name: 'IntroCouncil',
        component: IntroCouncil,
      }, {
        path: '/academic/forum',
        name: 'AcademicForum',
        component: AcademicForum,
      }, {
        path: '/academic/report',
        name: 'AcademicReport',
        component: AcademicReport,
      }, {
        path: '/academic/seminar',
        name: 'AcademicSeminar',
        component: AcademicSeminar,
      }, {
        path: '/academic/study-abroad',
        name: 'AcademicStudyAbroad',
        component: AcademicStudyAbroad,
      }, {
        path: '/collaboration/China',
        name: 'CollaborationChina',
        component: CollaborationChina,
      }, {
        path: '/collaboration/UK-Ireland',
        name: 'CollaborationUKIreland',
        component: CollaborationUKIreland,
      }, {
        path: '/collaboration/CUI',
        name: 'CollaborationCUI',
        component: CollaborationCUI,
      }, {
        path: '/home/partners',
        name: 'HomePartners',
        component: HomePartners,
      }, {
        path: '/home/news',
        name: 'HomeNews',
        component: HomeNews,
      }, {
        path: '/home/ad',
        name: 'HomeAd',
        component: HomeAd,
      }, {
        path: '/trade/business',
        name: 'TradeBusiness',
        component: TradeBusiness,
      }, {
        path: '/trade/policy',
        name: 'TradePolicy',
        component: TradePolicy,
      }, {
        path: '/trade/project',
        name: 'TradeProject',
        component: TradeProject,
      }, {
        path: '/trade/promotion',
        name: 'TradePromotion',
        component: TradePromotion,
      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    children: [
      {
        path: '/content',
        name: 'DetailContent',
        component: DetailContent,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    return item.meta.loginRequire
  })) {
    const loginUser = store.state.user;
    if (Tool.isEmpty(loginUser)) {
      console.log("UNAUTHORIZED!");
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
