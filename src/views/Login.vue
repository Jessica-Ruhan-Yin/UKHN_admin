<template>
  <div class="box">
    <el-container id="whole">
      <el-aside id="left">
      </el-aside>

      <el-main id="right">
        <div id="head">
          <img id="logo" src="../assets/logo.png">
          <span id="title">同乡会官网后台管理系统</span>
        </div>
        <el-form id="login-form">
          <el-form-item>
            <el-icon class="icon" size="20">
              <user/>
            </el-icon>
            <el-input
                  v-model="loginUser.loginName"
                  class="input"
                  placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-icon class="icon" size="20">
              <key/>
            </el-icon>
            <el-input
                  v-model="loginUser.password"
                  class="input"
                  placeholder="请输入密码"
                  type="password"
                  autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" id="login-button" @click="login">登&nbsp;&nbsp;录</el-button>

      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, computed} from 'vue';
  import {User, Key} from '@element-plus/icons'
  import axios from 'axios'
  import {ElMessage} from 'element-plus'
  import store from "@/store";

  declare let hexMd5: any;
  declare let KEY: any;

  export default defineComponent({
    name: "Login",
    components: {
      User,
      Key
    },

    setup() {
      //登录后保存
      const user = computed(() => store.state.user);

      //用来登录
      const loginUser = ref({
        loginName: "",
        password: ""
      });

      //登录
      const login = () => {
        console.log("开始登录")
        loginUser.value.password = hexMd5(loginUser.value.password + KEY);
        axios.post('http://127.0.0.1:9000/system/admin/user/login', loginUser.value).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage.success('登录成功！')
            store.commit("setUser", data.content)
            window.open("/home","_self")
          } else {
            ElMessage.error('用户名或密码错误！')
          }
        })
      };

      return {
        loginUser,
        login
      }
    }
  })
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  #whole {
    width: 100%;
    height: 100%;
  }

  #left {
    width: 50%;
    height: 100%;
    background-color: rgb(177, 179, 245);
    text-align: center;
    background-image: url("../assets/working_man.png");
    background-size: 400px 400px;
    background-position: center;
    background-repeat: no-repeat;
  }

  #right {
    width: 50%;
    height: 100%;
    text-align: center;
  }

  #head {
    margin-top: 70px;
  }

  #logo {
    text-align: center;
    width: 60px;
    height: 60px;
  }

  #title {
    font-family: Tahoma;
    font-weight: bolder;
    font-size: 24px;
    display: block;
    margin-top: 15px;
  }

  #login-form {
    margin-top: 30px;
  }

  .input {
    width: 240px;
    font-size: small;
    vertical-align: center;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(177, 179, 245, 0.8);
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075), 0px 0px 8px rgba(177, 179, 245, 0.8);
    margin-left: 10px;
  }

  .icon {
    color: rgb(177, 179, 245);
    vertical-align: middle
  }

  #login-button {
    width: 150px;
    text-align: center;
    vertical-align: middle;
  }

</style>