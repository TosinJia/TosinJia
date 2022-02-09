
# Hello TosinJia!

## 搭建
- https://www.cnblogs.com/softidea/p/10084946.html


### 部署
#### Github Pages
- deploy.sh


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
