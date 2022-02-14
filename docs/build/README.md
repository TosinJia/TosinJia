

# 网站搭建
[[toc]]
## 搭建
- https://www.cnblogs.com/softidea/p/10084946.html

- [二丫讲梵](https://wiki.eryajf.net/)

### Markdown 增强
- https://vuepress-theme-hope.github.io/md-enhance/zh/

- 19^th^
- H~2~O

### 搜索
#### vuepress-plugin-fulltext-search
1. 安装全文搜索插件
```
E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>npm install --save vuepress-plugin-fulltext-search
```
1. docs\.vuepress\config.js
```
    plugins: ['fulltext-search'],
```
1. docs\.vuepress\styles\index.styl
```

// 命中文字高亮红色
.search-box .suggestion a .suggestion-row .suggestion-content .highlight
    color: red;

// 命中文字高亮蓝色，背景色纳瓦白
// .search-box .suggestion a .suggestion-row .suggestion-content .highlight
//    color: blue;
//    background-color: NavajoWhite;
```

- https://zhuanlan.zhihu.com/p/369923082
- https://wiki.eryajf.net/pages/8aafb1/
### 部署
#### Github Pages
- deploy.sh

##### 运行2
1. 添加环境变量
  - Path D:\tools\portable\PortableGit\bin 
2. 项目目录对应的文件资源管理器中的目录位置输入 bash/sh 回车
3. 新打开的窗口中
```
$ yarn deploy
或者
$ npm run deploy
```
##### 运行1
- D:\tools\portable\PortableGit\git-bash.exe
```
User@WIN10-0009 MINGW64 /
$ cd E:/iEnviroment/development/projects/ideaProjects/VueDemo/TosinJia

User@WIN10-0009 MINGW64 /e/iEnviroment/development/projects/ideaProjects/VueDemo/TosinJia (main)
$ npm run deploy

> TosinJia@1.0.0 deploy E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia
> bash deploy.sh


> TosinJia@1.0.0 docs:build E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia
> vuepress build docs

wait Extracting site metadata...
tip Apply theme @vuepress/theme-default ...
tip Apply plugin container (i.e. "vuepress-plugin-container") ...
tip Apply plugin @vuepress/register-components (i.e. "@vuepress/plugin-register-components") ...
tip Apply plugin @vuepress/active-header-links (i.e. "@vuepress/plugin-active-header-links") ...
tip Apply plugin @vuepress/search (i.e. "@vuepress/plugin-search") ...
tip Apply plugin @vuepress/nprogress (i.e. "@vuepress/plugin-nprogress") ...
i Compiling Client
i Compiling Server
√ Server: Compiled successfully in 9.55s
√ Client: Compiled successfully in 15.66s
wait Rendering static HTML...
success Generated static files in docs\.vuepress\dist.

hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
Initialized empty Git repository in E:/iEnviroment/development/projects/ideaProjects/VueDemo/TosinJia/docs/.vuepress/dist/.git/
warning: LF will be replaced by CRLF in 404.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in assets/img/search.83621669.svg.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in assets/js/app.c63c6ca0.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in build/README1.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in build/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in index.html.
The file will have its original line endings in your working directory
[master (root-commit) a80c5fd] deploy
 15 files changed, 298 insertions(+)
 create mode 100644 404.html
 create mode 100644 assets/css/0.styles.e4d8b86b.css
 create mode 100644 assets/img/search.83621669.svg
 create mode 100644 assets/js/2.703b2056.js
 create mode 100644 assets/js/3.1e97dab3.js
 create mode 100644 assets/js/4.b7d0708f.js
 create mode 100644 assets/js/5.9e2f4ca7.js
 create mode 100644 assets/js/6.c7b54f12.js
 create mode 100644 assets/js/7.486b01f5.js
 create mode 100644 assets/js/8.f8315380.js
 create mode 100644 assets/js/9.a4f21c4b.js
 create mode 100644 assets/js/app.c63c6ca0.js
 create mode 100644 build/README1.html
 create mode 100644 build/index.html
 create mode 100644 index.html
Enumerating objects: 22, done.
Counting objects: 100% (22/22), done.
Delta compression using up to 4 threads
Compressing objects: 100% (20/20), done.
Writing objects: 100% (22/22), 95.26 KiB | 355.00 KiB/s, done.
Total 22 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), done.
To github.com:TosinJia/TosinJia.github.io.git
 + dd02e9a...a80c5fd master -> master (forced update)
/e/iEnviroment/development/projects/ideaProjects/VueDemo/TosinJia
```
- [https://tosinjia.github.io/](https://tosinjia.github.io/)


#### 本地部署
- http://127.0.0.1:9999/
```
D:\tools\portable\nginx-1.21.3>stop nginx.exe

D:\tools\portable\nginx-1.21.3>nginx.exe -s stop
```

### 配置
- [配置 | VuePress](https://vuepress.vuejs.org/zh/config/)

- config.js 修改后需要重新运行才能生效
### 初始化
- 参考
    - https://vuepress.vuejs.org/zh/guide/getting-started.html
```
Microsoft Windows [版本 10.0.19043.1348]
(c) Microsoft Corporation。保留所有权利。

E:\iEnviroment\development\projects\ideaProjects\VueDemo>mkdir TosinJia && cd TosinJia

E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>npm init -y
Wrote to E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia\package.json:

{
  "name": "TosinJia",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>npm install --save vuepress
npm WARN deprecated chokidar@2.1.8: Chokidar 2 does not receive security updates since 2019. Upgrade to chokidar 3 with 15x fewer dependencies
npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
npm WARN deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated highlight.js@9.18.5: Support has ended for 9.x series. Upgrade to @latest
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated mkdirp@0.3.0: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
npm WARN deprecated har-validator@5.1.5: this library is no longer supported

> core-js@3.21.0 postinstall E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js:
> https://opencollective.com/core-js
> https://patreon.com/zloirock
> https://paypal.me/zloirock
> bitcoin: bc1qlea7544qtsmj2rayg0lthvza9fau63ux0fstcz

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> esbuild@0.14.7 postinstall E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia\node_modules\esbuild
> node install.js


> highlight.js@9.18.5 postinstall E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia\node_modules\highlight.js
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

> vuepress@1.9.7 postinstall E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia\node_modules\vuepress
> opencollective-postinstall || exit 0

Thank you for using vuepress!
If you rely on this package, please consider supporting our open collective:
> https://opencollective.com/vuepress/donate

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.7 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-32@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-32):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-32@0.14.7: wanted {"os":"linux","arch":"ia32"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-android-arm64@0.14.7 (node_modules\esbuild\node_modules\esbuild-android-arm64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-android-arm64@0.14.7: wanted {"os":"android","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-freebsd-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-freebsd-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-freebsd-64@0.14.7: wanted {"os":"freebsd","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-64@0.14.7: wanted {"os":"linux","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-mips64le@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-mips64le):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-mips64le@0.14.7: wanted {"os":"linux","arch":"mips64el"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-freebsd-arm64@0.14.7 (node_modules\esbuild\node_modules\esbuild-freebsd-arm64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-freebsd-arm64@0.14.7: wanted {"os":"freebsd","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-darwin-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-darwin-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-darwin-64@0.14.7: wanted {"os":"darwin","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-darwin-arm64@0.14.7 (node_modules\esbuild\node_modules\esbuild-darwin-arm64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-darwin-arm64@0.14.7: wanted {"os":"darwin","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-arm@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-arm):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-arm@0.14.7: wanted {"os":"linux","arch":"arm"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-arm64@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-arm64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-arm64@0.14.7: wanted {"os":"linux","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-linux-ppc64le@0.14.7 (node_modules\esbuild\node_modules\esbuild-linux-ppc64le):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-linux-ppc64le@0.14.7: wanted {"os":"linux","arch":"ppc64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-netbsd-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-netbsd-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-netbsd-64@0.14.7: wanted {"os":"netbsd","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-openbsd-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-openbsd-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-openbsd-64@0.14.7: wanted {"os":"openbsd","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-sunos-64@0.14.7 (node_modules\esbuild\node_modules\esbuild-sunos-64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-sunos-64@0.14.7: wanted {"os":"sunos","arch":"x64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-windows-32@0.14.7 (node_modules\esbuild\node_modules\esbuild-windows-32):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-windows-32@0.14.7: wanted {"os":"win32","arch":"ia32"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: esbuild-windows-arm64@0.14.7 (node_modules\esbuild\node_modules\esbuild-windows-arm64):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for esbuild-windows-arm64@0.14.7: wanted {"os":"win32","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.3.2 (node_modules\watchpack\node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN TosinJia@1.0.0 No description
npm WARN TosinJia@1.0.0 No repository field.

+ vuepress@1.9.7
added 1277 packages from 906 contributors in 60.384s

84 packages are looking for funding
  run `npm fund` for details


E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>mkdir docs && echo '# Hello TosinJia!' > docs/README.md

E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>type package.json
{
  "name": "TosinJia",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vuepress": "^1.9.7"
  }
}
```
- yarn
```
E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>yarn instal
E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>yarn docs:dev 
E:\iEnviroment\development\projects\ideaProjects\VueDemo\TosinJia>yarn docs:build
```