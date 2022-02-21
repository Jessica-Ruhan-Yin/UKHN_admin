<template>
  <el-container id="container">
    <el-header id="head">
      <div>
        <img id="logo" src="../assets/logo.png">
        <span id="title">同乡会官网后台管理系统</span>

        <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认退出登录？"
              @confirm="logout()"
        >
          <template #reference>
            <el-button round
                       style="color: rgb(133, 137, 252);padding: 10px;margin-left: 65%">
              <el-icon class="icon" size="15" style="color: rgb(133, 137, 252)">
                <switch-button/>
              </el-icon>
              退出登录
            </el-button>
          </template>
        </el-popconfirm>

      </div>
    </el-header>
  </el-container>
</template>

<script>
  import {defineComponent,computed} from 'vue';
  import {SwitchButton} from '@element-plus/icons'
  import axios from 'axios'
  import store from "@/store";
  import {ElMessage} from 'element-plus'

  export default defineComponent({
    name: "the-header",
    components: {
      SwitchButton
    },
    setup(){

      const user = computed(() => store.state.user);

      const logout = () => {
        axios.get(process.env.VUE_APP_SERVER + '/system/admin/user/logout/' + user.value.token).then((response) => {
          const data = response.data;
          if (data.success) {
            ElMessage({
              message: '退出登录成功！',
              type: 'success',
            })
            store.commit("setUser", {});
            window.open("/login","_self")
          } else {
            ElMessage.error('退出登录失败！')
          }
        });
      };

      return{
        logout
      }
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
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin-right: 10px;
  }

  #title {
    font-family: Tahoma;
    font-weight: bolder;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }

</style>