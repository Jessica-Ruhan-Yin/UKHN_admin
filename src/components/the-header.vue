<template>
  <el-container id="container">
    <el-header id="head">
      <div>
        <img id="logo" src="../assets/logo.png">
        <span id="title">同乡会官网后台管理系统</span>
        <el-button round
                   style="color: rgb(133, 137, 252);padding: 10px;margin-left: 72%">
          <el-icon class="icon" size="15" style="color: rgb(133, 137, 252)">
            <switch-button/>
          </el-icon>
          退出登录
        </el-button>
      </div>
    </el-header>
  </el-container>
</template>

<script>
  import {defineComponent} from 'vue';
  import {SwitchButton} from '@element-plus/icons'

  export default defineComponent({
    name: "the-header",
    components: {
      SwitchButton
    }
  })
</script>

<style scoped>
  #container {
    background-color: rgb(235, 237, 238);
  }

  #head {
    width: 99%;
    margin: 0.5%;
    height: 60px;
    line-height: 60px;
    background-color: white;
  }

  #logo {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 10px;
  }

  #title {
    font-family: Tahoma;
    font-weight: bolder;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
  }

</style>