# admin
```
username: admin
password: ukhnadmin
```

### gitee repository
```
https://gitee.com/JessicaAg/ukhn_admin.git
```

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve-dev
```

#### Compiles and minifies for production
```
npm run build-prod
```

#### Lints and fixes files
```
npm run lint
```

#### Language
```
Vue3
TypeScript
```

#### Dependencies
```
"axios": "^0.24.0",
"element-plus": "^1.2.0-beta.2",
"moment": "^2.29.1",
"vue": "^3.0.0",
"vue-router": "^4.0.0-0",
"vuex": "^4.0.0-0",
"wangeditor": "^4.6.3"
```

#### menu intro
```
-public
--static
---image
---js
----enum:枚举类
----local-storage:将变量存储在local
----md5.js: md5加密密码算法
----session-storage: 页面跳转时将信息存储在session
-src
--components
---bigFile:上传图片视频文件组件
---detail: 文章详情页页面
---the-body: 主页面设计，包含侧边栏menu
---the-header: header组件，包含退出登录
--filter: 工具类
--router: 跳转路由
--store: vuex存储登录用户信息
--tool: 工具类
--views: 页面
--main: 包含axios拦截器，用于控台输出req和resp

```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
