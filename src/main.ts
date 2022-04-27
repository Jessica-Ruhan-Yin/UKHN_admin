import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '../theme/index.css'
import axios from "axios";
import {Tool} from "@/util/tool";

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

axios.interceptors.request.use(function (config) {
  const token = store.state.user.token;
  if (Tool.isNotEmpty(token)) {
    config.headers!.token = token;
    // console.log("请求headers增加token:", token);
  }
  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  //发布时需要注释拦截器，防止信息泄露
  // console.log('返回结果：', response);
  return response;
}, error => {
  //发布时需要注释拦截器，防止信息泄露
  // console.log('返回错误：', error);
  return Promise.reject(error);
});


const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
