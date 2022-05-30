# UKHN admin dashboard
```
This is the admin dashboard for UKHN official website
```
<img src='https://ukhn-admin.oss-cn-hongkong.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220530133340.png?versionId=CAEQMRiBgMDNm.rNiBgiIDA0YjYyYWJmYmRkNzQxNGU5MTk3MzA1NWY1M2VhNTc0' width=800px/><br/>
<img src='https://ukhn-admin.oss-cn-hongkong.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220530134319.png?versionId=CAEQMRiBgMDu.fvNiBgiIDRkNGQ3YmZkMmFmZTQwOTI4Y2YzN2E0MjJmOTMwNWEz' width=800px/><br/>

```
Administrators can login to the dashboard and manage the resources of the website.
```

### Code installation
```
https://github.com/littlelittleJessica/UKHN_admin.git
or
gh repo clone littlelittleJessica/UKHN_admin
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
--static: static files
---image: image resources for the website
---js: js tools
----enum
----local-storage: tool for storing in local
----md5.js: md5 encoding algorithm
----session-storage
-src
--components
---bigFile: file uploading component
---detail
---the-body
---the-header
--filter: tool
--router
--store
--tool
--view
--main

```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Other info
The website is deployed, please do not use the code for commercial purposes
