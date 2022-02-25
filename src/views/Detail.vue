<template>
  <div class="detail">
    <el-container id="container">
      <el-header>
        <div id="head">
          <img id="logo" src="../assets/logo.png">
          <span id="title">详情内容编辑</span>
          <a id="back" @click="goBack">返回列表>></a>
        </div>
      </el-header>
      <el-main id="body">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import {useRouter} from 'vue-router';

  export default defineComponent({
    name: 'Detail',
    components: {},
    setup() {
      const router = useRouter()
      const goBack = () => {
        router.go(-1)
      }
      return {
        goBack
      };
    }
  });
</script>


<style scoped>
  #head {
    margin-left: 5%;
    margin-top: 20px;
  }

  #title {
    font-size: 20px;
    font-weight: bolder;
    font-family: Tahoma;
    display: inline-block;
    vertical-align: center;
    margin-left: 10px;
  }

  #logo {
    width: 60px;
    height: 60px;
    vertical-align: middle;
    display: inline-block;
  }

  #back {
    font-size: 15px;
    font-family: Tahoma;
    color: #9ea5ff;
    display: inline-block;
    vertical-align: center;
    margin-left: 20px;
  }

  #body {
    width: 90%;
    vertical-align: middle;
    margin-left: 5%;
  }
</style>