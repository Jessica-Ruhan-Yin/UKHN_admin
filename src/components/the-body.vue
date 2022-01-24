<template>
  <el-container id="container">
    <el-aside id="aside">
      <div>
        <el-col>
          <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon class="icon" size="20">
                  <location/>
                </el-icon>
                <span>首页</span>
              </template>
              <router-link class="link" to="/home/news">
                <el-menu-item index="1-1">最新通告</el-menu-item>
              </router-link>
              <router-link class="link" to="/home/ad">
                <el-menu-item index="1-2">广告</el-menu-item>
              </router-link>
              <router-link class="link" to="/intro/activity">
                <el-menu-item index="1-3">同乡会活动</el-menu-item>
              </router-link>
              <router-link class="link" to="/home/partners">
                <el-menu-item index="1-4">合作机构</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon class="icon" size="20">
                  <pieChart/>
                </el-icon>
                <span>自贸港专栏</span>
              </template>
              <router-link class="link" to="/trade/policy">
                <el-menu-item index="2-1">政策福利</el-menu-item>
              </router-link>
              <router-link class="link" to="/trade/business">
                <el-menu-item index="2-2">招商引资</el-menu-item>
              </router-link>
              <router-link class="link" to="/trade/project">
                <el-menu-item index="2-3">项目合作</el-menu-item>
              </router-link>
              <router-link class="link" to="/trade/promotion">
                <el-menu-item index="2-4">宣传推广</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon class="icon" size="20">
                  <histogram/>
                </el-icon>
                <span>产业合作</span>
              </template>
              <router-link class="link" to="/collaboration/China">
                <el-menu-item index="3-1">国内企业合作</el-menu-item>
              </router-link>
              <router-link class="link" to="/collaboration/UK-Ireland">
                <el-menu-item index="3-2">英国及爱尔兰企业合作</el-menu-item>
              </router-link>
              <router-link class="link" to="/collaboration/CUI">
                <el-menu-item index="3-3">中英、中爱企业合作</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon class="icon" size="20">
                  <chatDotSquare/>
                </el-icon>
                <span>学术交流</span>
              </template>
              <router-link class="link" to="/academic/forum">
                <el-menu-item index="4-1">学术论坛</el-menu-item>
              </router-link>
              <router-link class="link" to="/academic/seminar">
                <el-menu-item index="4-2">研讨会</el-menu-item>
              </router-link>
              <router-link class="link" to="/academic/report">
                <el-menu-item index="4-3">学术报告</el-menu-item>
              </router-link>
              <router-link class="link" to="/academic/study-abroad">
                <el-menu-item index="4-4">留学申请</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon class="icon" size="20">
                  <stamp/>
                </el-icon>
                <span>同乡会介绍</span>
              </template>
              <router-link class="link" to="/intro/activity">
                <el-menu-item index="5-1">同乡会活动</el-menu-item>
              </router-link>
              <router-link class="link" to="/intro/council">
                <el-menu-item index="5-2">理事会</el-menu-item>
              </router-link>
              <router-link class="link" to="/intro/enroll">
                <el-menu-item index="5-3">招新</el-menu-item>
              </router-link>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </div>

    </el-aside>
    <el-main id="main">
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>
  import {defineComponent} from 'vue';
  import {Location, PieChart, Histogram, ChatDotSquare, Stamp} from '@element-plus/icons'

  export default defineComponent({
    name: "the-menu",
    components: {
      Location,
      PieChart,
      Histogram,
      ChatDotSquare,
      Stamp
    },

  })
</script>

<style scoped>
  #container {
    width: 100%
  }

  #aside {
    width: 17%
  }

  .icon {
    color: rgb(133, 137, 252);
  }

  #main {
    width: 83%
  }

  .link {
    text-decoration: none;
  }
</style>