import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import IntroActivity from '../views/admin/introduction/intro_activity.vue'
import ActivityDetail from '../views/admin/introduction/detail_activity.vue'
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

import ForumDetail from '../views/admin/academic/detail_forum.vue'
import ReportDetail from '../views/admin/academic/detail_report.vue'
import SeminarDetail from '../views/admin/academic/detail_seminar.vue'
import StudyAbroadDetail from '../views/admin/academic/detail_study_abroad.vue'
import ChinaDetail from '../views/admin/collaboration/detail_China.vue'
import UKIrelandDetail from '../views/admin/collaboration/detail_UK_Ireland.vue'
import CUIDetail from '../views/admin/collaboration/detail_CUI.vue'


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
        path: '/intro/activity',
        name: 'IntroActivity',
        component: IntroActivity,
      },{
        path: '/intro/enroll',
        name: 'IntroEnroll',
        component: IntroEnroll,
      },{
        path: '/intro/council',
        name: 'IntroCouncil',
        component: IntroCouncil,
      },{
        path: '/academic/forum',
        name: 'AcademicForum',
        component: AcademicForum,
      },{
        path: '/academic/report',
        name: 'AcademicReport',
        component: AcademicReport,
      },{
        path: '/academic/seminar',
        name: 'AcademicSeminar',
        component: AcademicSeminar,
      },{
        path: '/academic/study-abroad',
        name: 'AcademicStudyAbroad',
        component: AcademicStudyAbroad,
      },{
        path: '/collaboration/China',
        name: 'CollaborationChina',
        component: CollaborationChina,
      },{
        path: '/collaboration/UK-Ireland',
        name: 'CollaborationUKIreland',
        component: CollaborationUKIreland,
      },{
        path: '/collaboration/CUI',
        name: 'CollaborationCUI',
        component: CollaborationCUI,
      },{
        path: '/home/partners',
        name: 'HomePartners',
        component: HomePartners,
      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    children: [
      {
        path: '/activity/detail',
        name: 'ActivityDetail',
        component: ActivityDetail,
      },
      {
        path: '/forum/detail',
        name: 'ForumDetail',
        component: ForumDetail,
      },
      {
        path: '/report/detail',
        name: 'ReportDetail',
        component: ReportDetail,
      },{
        path: '/seminar/detail',
        name: 'SeminarDetail',
        component: SeminarDetail,
      },{
        path: '/study-abroad/detail',
        name: 'StudyAbroadDetail',
        component: StudyAbroadDetail,
      },{
        path: '/China/detail',
        name: 'ChinaDetail',
        component: ChinaDetail,
      },{
        path: '/UK-Ireland/detail',
        name: 'UKIrelandDetail',
        component: UKIrelandDetail,
      },{
        path: '/CUI/detail',
        name: 'CUIDetail',
        component: CUIDetail,
      },
    ]
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
