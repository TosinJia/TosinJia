[[TOC]]
# 前端框架
- [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/)
    - [Router and Nav | vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html)
## vue-admin-template
> 基础模板，它没有复杂的功能，只包含了一个后台需要最基础的东西。

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/)
    - [vue-admin-template fork](https://github.com/TosinJia/vue-admin-template)
## vue-element-admin
> 一个 vue 的管理后台集成方案

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
    - [vue-element-admin fork](https://github.com/TosinJia/vue-element-admin)
- [介绍 | vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)
    - [手摸手，带你用vue撸后台 系列一（基础篇）](https://juejin.cn/post/6844903476661583880)
    - [手摸手，带你用vue撸后台 系列二(登录权限篇)](https://juejin.cn/post/6844903478880370701)
    - [手摸手，带你用vue撸后台 系列三(实战篇)](https://juejin.cn/post/6844903481224986638)
        - Table 拖拽排序
            - [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
        - Table 内联编辑
            - https://vuejs.org/v2/guide/reactivity.html
        - Upload 上传
            - src\views\qiniu\upload.vue
    - [手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.cn/post/6844903486241374221)
        - https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
        - https://www.iconfont.cn/

    - [手摸手，带你用vue撸后台 系列五(v4.0新版本)](https://juejin.cn/post/6844903840626507784)
 
        - CDN
            - 你可以通过执行`npm run preview -- --report`来分析webpack打包之后的结果，观察各个静态资源的大小。

        - [redirect 刷新页面](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E7%82%B9%E5%87%BB%E4%BE%A7%E8%BE%B9%E6%A0%8F-%E5%88%B7%E6%96%B0%E5%BD%93%E5%89%8D%E8%B7%AF%E7%94%B1)
    - [手摸手，带你封装一个vue component-实操](https://segmentfault.com/a/1190000009090836)

### 系列四(vueAdmin 一个极简的后台基础模板)


### 系列五(v4.0新版本)
#### 命名规范
- [风格指南 — Vue.js](https://cn.vuejs.org/v2/style-guide/)
- Component
    - 所有的Component文件都是以大写开头 (PascalCase)，但除了 index.vue。这也是官方所推荐的[单文件组件文件的大小写](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)。
- JS 文件
    - 所有的.js文件都遵循横线连接 (kebab-case)。
- Views
    - 在views文件下，代表路由的.vue文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。
    - 使用横线连接 (kebab-case)来命名views主要是出于以下几个考虑。
        1. 横线连接 (kebab-case) 也是官方推荐的命名规范之一[文档](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
        2. views下的.vue文件代表的是一个路由，所以它需要和component进行区分(component 都是大写开头)
        3. 页面的url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一
        4. 没有大小写敏感问题   
#### snippets 自动生成代码片段
- https://github.com/TosinJia/vue-element-admin/blob/develop/src/views/test-plop-view/index.vue
```
snippets 自动生成代码片段 基于plop，提供了几个基础模板，方便创建新的view或者component
E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin>npm run new

> vue-element-admin@4.4.0 new E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin
> plop

? [PLOP] Please choose a generator. view - generate a view
? view name please test-plop-view
? Blocks: (Press <space> to select, <a> to toggle all, <i> to invert selection)<template>, <script>, style
√  ++ \src\views\test-plop-view\index.vue
```
- https://github.com/TosinJia/vue-element-admin/blob/develop/src/components/TestPlopComponent/index.vue
```
snippets 自动生成代码片段 基于plop，提供了几个基础模板，方便创建新的view或者component
E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin>npm run new

> vue-element-admin@4.4.0 new E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin
> plop

? [PLOP] Please choose a generator. component - generate vue component
? component name please test-plop-component
? Blocks: (Press <space> to select, <a> to toggle all, <i> to invert selection)<template>, <script>, style
√  ++ \src\components\TestPlopComponent\index.vue
```
- https://github.com/TosinJia/vue-element-admin/blob/develop/src/store/modules/test-plop-store.js
```
E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin>npm run new

> vue-element-admin@4.4.0 new E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin
> plop

? [PLOP] Please choose a generator. store - generate store
? store name please test-plop-store
? Blocks: (Press <space> to select, <a> to toggle all, <i> to invert selection)state, mutations, actions
√  ++ \src\store\modules\test-plop-store.js
```
### 问题记录
#### npm install
- Command failed: git clone
```
E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin>npm install
npm ERR! code 128
npm ERR! Command failed: git clone --mirror -q git://github.com/adobe-webplatform/eve.git C:\Users\User\AppData\Roaming\npm-cache\_cacache\tmp\git-clone-6806fa1c\.git --config core.longpaths=true
npm ERR! warning: templates not found in C:\Users\User\AppData\Local\Temp\pacote-git-template-tmp\git-clone-e4afbf9c
npm ERR! error: RPC failed; curl 56 OpenSSL SSL_read: Connection was reset, errno 10054
npm ERR! error: 4706 bytes of body are still expected
npm ERR! fetch-pack: unexpected disconnect while reading sideband packet
npm ERR! fatal: early EOF
npm ERR! fatal: fetch-pack: invalid index-pack output
npm ERR! 

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\User\AppData\Roaming\npm-cache\_logs\2022-04-24T03_04_41_825Z-debug.log
```
- 开启代理，重新安装
```
E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin>npm install

> deasync@0.1.26 install E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\deasync
> node ./build.js

`win32-x64-node-14` exists; testing
Binary is fine; exiting

> yorkie@2.0.0 install E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\yorkie
> node bin/install.js

setting up Git hooks
skipping applypatch-msg hook (existing user hook)
skipping pre-applypatch hook (existing user hook)
skipping post-applypatch hook (existing user hook)
skipping pre-commit hook (existing user hook)
skipping prepare-commit-msg hook (existing user hook)
skipping commit-msg hook (existing user hook)
skipping post-commit hook (existing user hook)
skipping pre-rebase hook (existing user hook)
skipping post-checkout hook (existing user hook)
skipping post-merge hook (existing user hook)
skipping pre-push hook (existing user hook)
skipping pre-receive hook (existing user hook)
skipping update hook (existing user hook)
skipping post-receive hook (existing user hook)
skipping post-update hook (existing user hook)
skipping push-to-checkout hook (existing user hook)
skipping pre-auto-gc hook (existing user hook)
skipping post-rewrite hook (existing user hook)
skipping sendemail-validate hook (existing user hook)
done


> husky@1.3.1 install E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\husky
> node husky install

husky > setting up git hooks
husky > done

> core-js@2.6.12 postinstall E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\babel-runtime\node_modules\core-js> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon: 
> https://opencollective.com/core-js 
> https://www.patreon.com/zloirock 

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> core-js@3.6.5 postinstall E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"


> ejs@2.7.4 postinstall E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\ejs
> node ./postinstall.js

Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)


> highlight.js@9.18.5 postinstall E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\highlight.js
> node deprecated.js

-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

  Verion 9 of Highlight.js has reached EOL.  It will no longer
  be supported or receive security updates in the future.
  Please upgrade to version 10 or encourage your indirect
  dependencies to do so.

  For more info:

  https://github.com/highlightjs/highlight.js/issues/2877
  https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md

-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

> core-js@2.6.12 postinstall E:\iEnviroment\development\projects\ideaProjects\Demo\PanJiaChen\vue-element-admin\node_modules\node-plop\node_modules\core-js    
> node -e "try{require('./postinstall')}catch(e){}"

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\webpack-dev-server\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\watchpack-chokidar2\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\jest-haste-map\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 2031 packages from 2006 contributors in 197.569s

101 packages are looking for funding
  run `npm fund` for details
```
- 异常信息 The unauthenticated git protocol on port 9418 is no longer supported.
```
npm WARN deprecated left-pad@1.3.0: use String.prototype.padStart()
npm ERR! Error while executing:
npm ERR! D:\tools\portable\PortableGit\cmd\git.EXE ls-remote -h -t git://github.com/adobe-webplatform/eve.git
npm ERR!
npm ERR! fatal: remote error:
npm ERR!   The unauthenticated git protocol on port 9418 is no longer supported.
npm ERR! Please see https://github.blog/2021-09-01-improving-git-protocol-security-github/ for more information.
npm ERR!
npm ERR! exited with error code: 128
```
- 解决方案：使用https:替换git:
```
>git config --global url."https://".insteadOf git://

>git config --list
url.https://.insteadof=git://
```

- 参考
    - [fatal: remote error: The unauthenticated git protocol on port 9418 is no longer support问题解决](https://blog.csdn.net/m290345792/article/details/123577379)