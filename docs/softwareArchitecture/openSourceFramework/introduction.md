# 开源框架
[[TOC]]

- [秒建一个后台管理系统？用这5个开源免费的Java项目就够了](https://zhuanlan.zhihu.com/p/142046905)

## 前端框架
### PanJiaChen
- [Docs](https://panjiachen.github.io/vue-element-admin-site/#/)
    - https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
#### vue-admin-template
> 基础模板，它没有复杂的功能，只包含了一个后台需要最基础的东西。

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/)
    - [vue-admin-template fork](https://github.com/TosinJia/vue-admin-template)
#### vue-element-admin
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
        - 命名规范
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
        - CDN
            - 你可以通过执行`npm run preview -- --report`来分析webpack打包之后的结果，观察各个静态资源的大小。

        - [redirect 刷新页面](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E7%82%B9%E5%87%BB%E4%BE%A7%E8%BE%B9%E6%A0%8F-%E5%88%B7%E6%96%B0%E5%BD%93%E5%89%8D%E8%B7%AF%E7%94%B1)
    - [手摸手，带你封装一个vue component-实操](https://segmentfault.com/a/1190000009090836)

##### 问题记录
###### npm install
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
## RuoYi

- [技术官网](https://ruoyi.vip/)
- [文档地址](http://doc.ruoyi.vip/)


- 开发环境配置
```
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework

Open File or Project
	\RuoYi-master
	\RuoYi-Vue-master
Maven
 E:/iEnviroment/development/apache-maven-3.8.2
Java Compiler 8
```

### RuoYi-Vue
- [文档](http://doc.ruoyi.vip/ruoyi-vue/)
- [代码下载](https://gitee.com/y_project/RuoYi-Vue)

#### 搭建
1. 解压压缩包或git clone到E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework

2. idea打开项目【Open File or Project】
    1. Maven E:/iEnviroment/development/apache-maven-3.8.2
    2. Java Compiler 8

3. 缓存
```
D:\tools\portable\Redis-x64-3.0.504>redis-server.exe redis.windows.conf
```
4. 数据库
```
[root@SystemFramework ~]# mysql -uroot -h127.0.0.1 -p123456

mysql> CREATE DATABASE IF NOT EXISTS `ry-vue` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.00 sec)

mysql> use ry-vue;
Database changed
mysql> source /root/RuoYi-Vue/ry_20210908.sql
mysql> source /root/RuoYi-Vue/quartz.sql;
```
5. 修改配置 ruoyi-admin\src\main\resources\application-druid.yml
```
            master:
                url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: 123456
```
6. 启动
    1. 后台启动 RuoYiApplication.java

    2. 后台启动
    ```
    \RuoYi-Vue>cd ruoyi-ui
    # 安装依赖
    \RuoYi-Vue\ruoyi-ui>npm install
    # 启动服务
    \RuoYi-Vue\ruoyi-ui>npm run dev
    ```
- RuoYi-Vue_1
#### 重构
> RuoYi -> DyEtc

> ruoyi -> dyetc

> Ruoyi -> Dyetc

> 若依->德银ETC

> 3.8.1->1.0.0

> RyTask->DyEtcTask

> ryTask->dyEtcTask

> ryMultipleParams -> deMultipleParams

> ryParams -> deParams

> ryNoParams -> deNoParams


1. 关闭IDEA修改文件夹名 修改文件夹名
    1. RuoYi-Vue DyEtc
    1. ruoyi--admin dyetc-admin
    1. ruoyi-common dyetc-common
    1. ruoyi-framework dyetc-framework
    1. ruoyi-generator dyetc-generator
    1. ruoyi-quartz dyetc-quartz
    1. ruoyi-system dyetc-system
    1. ruoyi-ui dyetc-ui
##### 后端重构
1. idea打开项目 隐藏dyetc-ui
###### 重构项目名模块名
1. 修改pom文件 ruoyi->dyetc 区分大小写替换
	1. pom.xml
	2. dyetc-admin\pom.xml
	3. dyetc-common\pom.xml
	4. dyetc-framework\pom.xml
	5. dyetc-generator\pom.xml
	6. dyetc-quartz\pom.xml
	7. dyetc-system\pom.xml
1. Reload All Maven Projects
1. 确认修改项目名称
	- File->Project Structure->Project Project Name
        - RuoYi-Vue DyEtc -> Apply
1. 确认修改模块名称
	- File->Project Structure->Modules 修改name -> Apply
        1. ruoyi dyetc 
        1. ruoyi-admin dyetc-admin
        1. ruoyi-common dyetc-common 
        1. ruoyi-framework dyetc-framework
        1. ruoyi-generator dyetc-generator
        1. ruoyi-quartz dyetc-quartz
        1. ruoyi-system dyetc-system
1. Reload All Maven Projects
1. 后台启动 RuoYiApplication.java 确认能够正常启动


- DyEtc_1
###### 重构包名
1. 更换项目所有包名称com.ruoyi.xxx换成com.dyetc.xxx
	- com.ruoyi -> Refactor -> Rename
		-> In Whole Project
		-> 勾选 Search in comments and strings; Search for text occurences
		-> Preview -> Do Refactor

1. 后台启动 RuoYiApplication.java 确认能够正常启动

###### 重构其他
1. ruoyi->dyetc 区分大小写替换全部
1. RuoYi -> DyEtc 
    1. class RuoYi 区分大小写 勾选File Mask:*.java 重构class类 Preview -> Do Refactor
        1. RuoYiApplication.java DyEtcApplication.java
        1. RuoYiServletInitializer.java DyEtcServletInitializer.java
        1. RuoYiConfig.java DyEtcConfig.java
    1. RuoYi -> DyEtc 区分大小写  搜索替换
1. Ruoyi -> Dyetc 区分大小写  搜索替换
    1. RuoyiScheduler -> DyetcScheduler

1. 替换其他字符串，最终检索不到区分大小写 ruoyi
        
1. 若依->德银ETC 替换全部

1. 启动验证
    1. 后台启动 RuoYiApplication.java 确认能够正常启动
    1. 后台启动
    
1. 3.8.1->1.0.0 搜索替换
1. RyTask->DyEtcTask class重构
1. ryTask->dyEtcTask 替换全部
1. ryMultipleParams -> deMultipleParams 替换全部
1. ryNoParams -> deNoParams 替换全部
1. ryParams -> deParams
    1. DyEtcTask.java
    2. ry_20210908.sql

1. ry_20210908.sql->dyetc_20210216.sql
    1. ry@ -> dyetc@
1. DyEtcApplication.java 修改
1. banner.txt 修改
##### 前端重构
1. RuoYi->DyEtc	
	1. 修改文件夹 dyetc-ui\src\components\RuoYi 重构
	1. 查找替换

1. ruoyi->dyetc	
    1. 查找文件 ruoyi
	1. 重构文件
		1. src\utils\ruoyi.js
		1. src\assets\styles\ruoyi.scss
	1. 查找替换

1. 最终检索不到区分大小写 ruoyi
1. 若依->德银ETC 查找替换

1. 3.8.1->1.0.0 搜索替换
1. 启动验证


1. index.vue
    1. RyTask->DyEtcTask 
    1. ryTask->dyEtcTask 
    1. ryMultipleParams -> deMultipleParams 
    1. ryNoParams -> deNoParams 
    1. ryParams -> deParams
- DyEtc_3

1. index.vue 修改
1. \dyetc-ui\public\favicon.ico 替换
##### 其他

1. ry.bat->dyetc.bat 重构
1. ry.sh->dyetc.sh 重构
1. ry->dyetc

1. application-druid.yml数据库名 ry-vue -> dyetc

```
[root@SystemFramework ~]# mysql -uroot -h127.0.0.1 -p123456
mysql> drop database dyetc;
Query OK, 30 rows affected (0.54 sec)

mysql> CREATE DATABASE IF NOT EXISTS dyetc DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.00 sec)

mysql> use dyetc;
Database changed
mysql> source /root/DyEtc/dyetc_20210216.sql;
mysql> source /root/DyEtc/quartz.sql;
```
- DyEtc_mysql_v1


#### RuoYi-Vue的Oracle版本
- [代码地址](https://github.com/yangzongzhuan/RuoYi-Vue-Oracle)

##### 搭建
1. 解压压缩包或git clone到E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Vue-Oracle

2. idea打开项目【Open File or Project】
    1. Maven E:/iEnviroment/development/apache-maven-3.8.2
    2. Java Compiler 8

3. 缓存
```
D:\tools\portable\Redis-x64-3.0.504>redis-server.exe redis.windows.conf
```
4. 数据库启动
```
[root@SystemFramework ~]# docker ps -a
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED        STATUS                    PORTS     NAMES
3c0ae5a124fe   registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g   "/bin/sh -c '/home/o…"   9 days ago     Exited (137) 8 days ago             oracle11g

[root@SystemFramework ~]# docker start oracle11g
oracle11g
```
5. 执行数据库脚本
```
--加了cascade就可以把用户连带的数据全部删掉
drop user ryvue cascade;
create user ryvue identified by ryvue;
grant connect,resource,dba to ryvue;

--切换到ryvue模式
1. 执行 ry_20210908.sql 
    1. find_in_set单独执行
2. 执行 quartz.sql
    1. 删除语句执行报错，skip all
```

5. 修改配置 ruoyi-admin\src\main\resources\application-druid.yml
```
            master:
                url: jdbc:oracle:thin:@127.0.0.1:1521/helowin
                username: ryvue
                password: ryvue
```
6. 启动
    1. 后台启动 RuoYiApplication.java

    2. 后台启动使用RuoYi-Vue版
    ```
    \RuoYi-Vue>cd ruoyi-ui
    # 安装依赖
    \RuoYi-Vue\ruoyi-ui>npm install
    # 启动服务
    \RuoYi-Vue\ruoyi-ui>npm run dev
    ```

#### Oracle版本重构
> 以上重构（DyEtc_mysql_v1）基础上， 借鉴RuoYi-Vue的Oracle版本完成多模块Oracle版本的重构

1. E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\数据库切换\dyetc


1. sql文件
    1. 若依 德银ETC 
    1. ruoyi dyetc
    1. ry@ dyetc@
    1. 'ry'- 'de'

1. pom文件修改
    1. pom.xml
    ```
            <oracle.version>10.2.0.4.0</oracle.version>
        </properties>

            <!--oracle驱动没有发布到中央仓库，只能从此仓库下载-->
            <repository>
                <id>jeecg</id>
                <name>jeecg Repository</name>
                <url>http://maven.jeewx.com/nexus/content/repositories/jeecg</url>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </repository>
        </repositories>
    ```
    1. dyetc-admin\pom.xml
    ```
            <!-- oracle驱动-->
            <dependency>
                <groupId>com.oracle</groupId>
                <artifactId>ojdbc14</artifactId>
                <version>${oracle.version}</version>
            </dependency>
    ```
1. 数据库搭建
```
--加了cascade就可以把用户连带的数据全部删掉
drop user dyetc cascade;
create user dyetc identified by dyetc;
grant connect,resource,dba to dyetc;

--切换到dyetc模式
1. 执行 dyetc_20220217.sql
    1. find_in_set单独执行
2. 执行 quartz.sql
    1. 删除语句执行报错，skip all
```
1. dyetc-admin\src\main\resources\application-druid.yml
```
            # 主库数据源
            master:
#                url: jdbc:oracle:thin:@10.1.180.77:1521/etc2021
                url: jdbc:oracle:thin:@127.0.0.1:1521/helowin
                username: dyetc
                password: dyetc

```

6. 启动
    1. 后台启动 XXXApplication.java

    2. 前台台启动
    ```
    >npm run dev
    ```
##### 验证测试
###### 1. 执行定时任务 
1. 问题描述
```
14:10:55.865 [restartedMain] WARN  o.q.i.j.AttributeRestoringConnectionInvocationHandler - [restoreOriginalAtributes,152] - Failed restore connection's original transaction isolation setting.
java.sql.SQLException: ORA-01453: SET TRANSACTION 必须是事务处理的第一个语句
```
1. 解决方案：修改DyEtc\dyetc-quartz\src\main\java\com\dyetc\quartz\config\ScheduleConfig.java
```
//        prop.put("org.quartz.jobStore.txIsolationLevelSerializable", "true");
        prop.put("org.quartz.jobStore.txIsolationLevelSerializable", "false");
```

###### 新增测试模块
> 类比代码生成模块新增测试模块

1. 创建文件夹文件
```
DyEtc>mkdir dyetc-test
DyEtc>cd dyetc-test
DyEtc\dyetc-test>cd . > pom.xml
DyEtc\dyetc-test>mkdir src\main\java
DyEtc\dyetc-test>mkdir src\main\resources
```
2. 复制代码生成pom.xml文件 到 \DyEtc\dyetc-test\pom.xml，修改
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>dyetc</artifactId>
        <groupId>com.dyetc</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>dyetc-test</artifactId>

    <description>
        测试模块
    </description>

    <dependencies>

        <!-- 通用工具-->
        <dependency>
            <groupId>com.dyetc</groupId>
            <artifactId>dyetc-common</artifactId>
        </dependency>
    </dependencies>

</project>
```
3. 修改DyEtc\pom.xml依赖声明节点、模块阶段添加测试模块
```
            <!-- 测试模块-->
            <dependency>
                <groupId>com.dyetc</groupId>
                <artifactId>dyetc-test</artifactId>
                <version>${dyetc.version}</version>
            </dependency>            
        </dependencies>

        <module>dyetc-test</module>
    </modules>
```
4. Reload All Maven Projects
5. 测试模块下新增测试类
```
package com.dyetc.test;

public class TestTestModule {
    public void hellTest(){
        System.out.println("hell TestModule!");
    }
}
```
6. admin模块添加测试模块依赖，测试
```
1. 添加测试模块依赖
        <!-- 测试模块-->
        <dependency>
            <groupId>com.dyetc</groupId>
            <artifactId>dyetc-test</artifactId>
        </dependency>
    </dependencies>

2. 测试包下添加测试类
DyEtc\dyetc-admin\src>mkdir test\java
DyEtc\dyetc-admin\src>mkdir test\resources
Reload All Maven Projects


package com.dyetc;

import com.dyetc.test.TestTestModule;

public class Test {
    public static void main(String[] args) {
        TestTestModule ttm = new TestTestModule();
        ttm.hellTest();
    }
}

```
###### 新增测试模块代码生成
> 比对修正代码生成模块代码

1. generator.yml
```
# 代码生成
gen:
  # 作者
  author: dyetc
  # 默认生成包路径 system 需改成自己的模块名称 如 system monitor tool
  packageName: com.dyetc.test
  # 自动去除表前缀，默认是false
  autoRemovePre: false
  # 表前缀（生成类名不会包含表前缀，多个用逗号分隔）
  tablePrefix: tst_
```


#### 功能验证
##### 代码生成
###### mysql版
1. generator.yml
```
# 代码生成
gen:
  # 作者
  author: dyetc
  # 默认生成包路径 system 需改成自己的模块名称 如 system monitor tool
  packageName: com.dyetc.test
  # 自动去除表前缀，默认是false
  autoRemovePre: false
  # 表前缀（生成类名不会包含表前缀，多个用逗号分隔）
  tablePrefix: tst_

```

1. 单表验证
    1. 数据库脚本
    ```
    drop table if exists tst_student;
    create table tst_student (
    student_id           int(11)         auto_increment    comment '编号',
    student_name         varchar(30)     default ''        comment '学生名称',
    student_age          int(3)          default null      comment '年龄',
    student_hobby        varchar(30)     default ''        comment '爱好（0代码 1音乐 2电影）',
    student_sex          char(1)         default '0'       comment '性别（0男 1女 2未知）',
    student_status       char(1)         default '0'       comment '状态（0正常 1停用）',
    student_birthday     datetime                          comment '生日',
    primary key (student_id)
    ) engine=innodb auto_increment=1 comment = '学生信息表';
    ```
    2. 导入、编辑提交
    3. 下载源码
        1. 执行 studentbsnMenu.sql
        2. vue文件加下的文件夹复制到dyetc-ui\src中
        3. main文件下覆盖目标模块下的main文件夹

    - 问题整理
        1. domain.java 报错。解决方案调整domain.java.vm
        ```
        import org.apache.commons.lang3.builder.ToStringBuilder;
        import org.apache.commons.lang3.builder.ToStringStyle;
        import com.dyetc.common.annotation.Excel;
        #if($table.crud || $table.sub)
        import com.dyetc.common.core.domain.BaseEntity;
        #elseif($table.tree)
        import com.dyetc.common.core.domain.TreeEntity;
        #end
        ```
        1. 爱好导出为空
        ```
        解决方案一：修改TstStudent.java
            /** 爱好（0代码 1音乐 2电影） */
        //    @Excel(name = "爱好", readConverterExp = "0=代码,1=音乐,2=电影")
            @Excel(name = "爱好")
        解决方案二：在字段信息中为爱好字段新增代码字典，显示类型修改为下拉框
        ```

1. 树表验证
    1. 数据库脚本
    ```
    drop table if exists tst_product;
    create table tst_product (
    product_id        bigint(20)      not null auto_increment    comment '产品id',
    parent_id         bigint(20)      default 0                  comment '父产品id',
    product_name      varchar(30)     default ''                 comment '产品名称',
    order_num         int(4)          default 0                  comment '显示顺序',
    status            char(1)         default '0'                comment '产品状态（0正常 1停用）',
    primary key (product_id)
    ) engine=innodb auto_increment=1 comment = '产品表';
    ```
    2. 导入、编辑提交
        1. 生成信息 选择树表(增删改查)，其他信息 树编码、树父编码、树名称选择
    3. 同上

1. 主子表

1. 数据库脚本
```
-- ----------------------------
-- 客户表
-- ----------------------------
drop table if exists tst_customer;
create table tst_customer (
  customer_id           bigint(20)      not null auto_increment    comment '客户id',
  customer_name         varchar(30)     default ''                 comment '客户姓名',
  phonenumber           varchar(11)     default ''                 comment '手机号码',
  sex                   varchar(20)     default null               comment '客户性别',
  birthday              datetime                                   comment '客户生日',
  remark                varchar(500)    default null               comment '客户描述',
  primary key (customer_id)
) engine=innodb auto_increment=1 comment = '客户表';


-- ----------------------------
-- 商品表
-- ----------------------------
drop table if exists tst_goods;
create table tst_goods (
  goods_id           bigint(20)      not null auto_increment    comment '商品id',
  customer_id        bigint(20)      not null                   comment '客户id',
  name               varchar(30)     default ''                 comment '商品名称',
  weight             int(5)          default null               comment '商品重量',
  price              decimal(6,2)    default null               comment '商品价格',
  date               datetime                                   comment '商品时间',
  type               char(1)         default null               comment '商品种类',
  primary key (goods_id)
) engine=innodb auto_increment=1 comment = '商品表';
```
2. 导入主子表、编辑提交
    1. 主表生成信息 主子表(增删改查)，关联信息 关联子表的表名、子表关联的外键名 

- 问题
    1. 验证过程中 子表时间需要按照2022-02-03格式录入

    1. sub-domain.java.vm 报错。解决方案调整sub-domain.java.vm
    ```
    import org.apache.commons.lang3.builder.ToStringBuilder;
    import org.apache.commons.lang3.builder.ToStringStyle;
    import com.dyetc.common.annotation.Excel;
    import com.dyetc.common.core.domain.BaseEntity;
    ```
###### oracle版
1. 单表验证数据库脚本
```
create table tst_student (
  student_id number(11) not null, 
  student_name varchar2(30) default '', 
  student_age number(3) default null, 
  student_hobby varchar2(30) default '', 
  student_sex char(1) default '0', 
  student_status char(1) default '0', 
  student_birthday date
); 
alter table 
  tst_student 
add 
  constraint pk_tst_student primary key (student_id); 

comment on table tst_student is '学生信息表';
comment on column tst_student.student_id is '编号';
comment on column tst_student.student_name is '学生名称'; 
comment on column tst_student.student_age is '年龄'; 
comment on column tst_student.student_hobby is '爱好（0代码 1音乐 2电影）'; 
comment on column tst_student.student_sex is '性别（0男 1女 2未知）'; 
comment on column tst_student.student_status is '状态（0正常 1停用）'; 
comment on column tst_student.student_birthday is '生日';
```

1. 单表综合测试脚本
```
drop table tst_person;
create table tst_person (
  person_id number(11) primary key, 
  person_name varchar2(30) default '', 
  person_age number(3) default null, 
  person_hobby varchar2(30) default '', 
  person_sex char(1) default '0', 
  person_status char(1) default '0', 
  person_birthday date,
  person_image varchar2(1024),
  person_file varchar2(1024)
); 

comment on table tst_person is '人员信息表';
comment on column tst_person.person_id is '编号';
comment on column tst_person.person_name is '名称'; 
comment on column tst_person.person_age is '年龄'; 
comment on column tst_person.person_hobby is '爱好（0代码 1音乐 2电影）'; 
comment on column tst_person.person_sex is '性别（0男 1女 2未知）'; 
comment on column tst_person.person_status is '状态（0正常 1停用）'; 
comment on column tst_person.person_birthday is '生日';
comment on column tst_person.person_image is '图片';
comment on column tst_person.person_file is '文件';
```

2. 树表数据库脚本
```
drop table tst_product;
create table tst_product (
  product_id number(20) not null,
  parent_id number(20) default 0,
  product_name varchar2(30) default '',
  order_num number(4) default 0,
  status char(1) default '0'
  
);
alter table 
  tst_product 
add 
  constraint pk_tst_product primary key (product_id); 
comment on table tst_product is '产品表';
comment on column tst_product.product_id is '产品id';
comment on column tst_product.parent_id is '父产品id';
comment on column tst_product.product_name is '产品名称';
comment on column tst_product.order_num is '显示顺序';
comment on column tst_product.status is '产品状态（0正常 1停用）';
```
3. 主子表数据库脚本
```
-- ----------------------------
-- 客户表
-- ----------------------------
drop table tst_customer;
create table tst_customer (
  customer_id number(20) primary key,
  customer_name varchar2(30) default '',
  phonenumber varchar2(11) default '',
  sex varchar2(20) default null,
  birthday date,
  remark varchar2(500) default null
);
comment on table tst_customer is '客户表';
comment on column tst_customer.customer_id is '客户id';
comment on column tst_customer.customer_name is '客户姓名';
comment on column tst_customer.phonenumber is '手机号码';
comment on column tst_customer.sex is '客户性别';
comment on column tst_customer.birthday is '客户生日';
comment on column tst_customer.remark is '客户描述';

-- ----------------------------
-- 商品表
-- ----------------------------
drop table tst_goods;
create table tst_goods (
  goods_id number(20) primary key,
  customer_id number(20) not null,
  name varchar2(30) default '',
  weight number(5) default null,
  price number(6,2) default null,
  goods_date date,
  type char(1) default null
);
comment on table tst_goods is '商品表';
comment on column tst_goods.goods_id is '商品id';
comment on column tst_goods.customer_id is '客户id';
comment on column tst_goods.name is '商品名称';
comment on column tst_goods.weight is '商品重量';
comment on column tst_goods.price is '商品价格';
comment on column tst_goods.goods_date is '商品时间';
comment on column tst_goods.type is '商品种类';
```
- 异常处理
```
加入子表商品信息异常
nested exception is org.apache.ibatis.type.TypeException: Could not set parameters for mapping: ParameterMapping{property='__frch_item_0.goodsId', mode=IN, javaType=class java.lang.Long, jdbcType=null, numericScale=null, resultMapId='null', jdbcTypeName='null', expression='null'}. Cause: org.apache.ibatis.type.TypeException: Error setting null for parameter #1 with JdbcType OTHER . Try setting a different JdbcType for this parameter or a different jdbcTypeForNull configuration property. Cause: java.sql.SQLException: 无效的列类型

解决方案
1. 添加主键自增触发器
drop sequence seq_tst_goods;
drop trigger tst_goods_pk_trigger;

create sequence seq_tst_goods
increment by 1
start with 10
nomaxvalue
nominvalue
cache 20;

create trigger tst_goods_pk_trigger before insert on tst_goods for each row
begin
    select seq_tst_goods.nextval into :new.goods_id from dual;
end;

2. 修改入库脚本，去掉主键
    <insert id="batchTstGoods">
        insert all
        <foreach item="item" index="index" collection="list">
            into tst_goods( goods_id, customer_id, name, weight, price, goods_date, type) values ( #{item.goodsId}, #{item.customerId}, #{item.name}, #{item.weight}, #{item.price}, #{item.goodsDate}, #{item.type})
        </foreach>
        SELECT 1 FROM DUAL
    </insert>

            into tst_goods( customer_id, name, weight, price, goods_date, type) values ( #{item.customerId}, #{item.name}, #{item.weight}, #{item.price}, #{item.goodsDate}, #{item.type})

```

### RuoYi
- [项目地址](https://gitee.com/y_project/RuoYi)

```
[root@SystemFramework ~]# systemctl start mysqld 
[root@SystemFramework ~]# docker start iredis

start RuoYiApplicaiton
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Vue\ruoyi-ui>npm run dev
```

```
mysql> CREATE DATABASE IF NOT EXISTS RuoYi DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 
Query OK, 1 row affected (0.00 sec)
mysql> use RuoYi;
Database changed
mysql> source /root/RuoYi/ry_20210924.sql
mysql> source /root/RuoYi/quartz.sql
```
#### 重构
##### 1. git clone 项目到本地
```
- 从现有仓库克隆
E:\TosinJia\IdeaProjects\TxjXtzc>git --help
# 浏览器中打开 file:///E:/TosinJia/tools/portableSoft/PortableGit/mingw64/share/doc/git-doc/git-clone.html
E:\TosinJia\IdeaProjects\TxjXtzc>git help clone
# TxjIs新建的项目目录名称
PS E:\TosinJia\IdeaProjects\TxjXtzc> git clone https://github.com/yangzongzhuan/RuoYi-Oracle.git TxjIs 

```
##### 2. IDEA Open File or Project
```
E:\TosinJia\IdeaProjects\TxjXtzc\TxjIs
```
##### 3. 检查maven、JDK
```
E:/TosinJia/tools/portableSoft/apache-maven-3.6.3
E:\TosinJia\tools\portableSoft\apache-maven-3.6.3\conf\settings.xml
E:\TosinJia\tools\portableSoft\apache-maven-3.6.3\repository
E:\Program Files\Java\jdk1.8.0_251

```
##### 4. 更改数据库配置
```
Copy Path From Content Root: src\main\resources\application-druid.yml
Path From Source Root: application-druid.yml
Path From Repository Root: ruoyi-admin/src/main/resources/application-druid.yml
                url: jdbc:oracle:thin:@172.16.9.206:1521/innetdb
                username: RUOYI
                password: RUOYI

- 启动验证通过

```
##### 5. 重构
###### 5.1 重命名 root
```
5.1.1 选中-右键->Refactor->Rename...[Shift+F6]
	- Enter new module name: 
5.1.2 修改 pom.xml
    <groupId>com.ruoyi</groupId>
    <artifactId>ruoyi</artifactId>
    <version>4.3.1</version>	
	
	<name>ruoyi</name>

修改为

    <groupId>com.txj.xtzc.is</groupId>
    <artifactId>txjis</artifactId>
    <version>0.1.0</version>

	<!-- Maven tool window 模块名有关 -->
    <name>txjis</name>

        <ruoyi.version>4.3.1</ruoyi.version>
		<txjis.version>0.1.0</txjis.version>

ruoyi.version->txjis.version
com.ruoyi->com.txj.xtzc.is
ruoyi- -> txjis-

```
###### 5.2 逐个重构各个子模块及其pom.xml
```
重命名子模块名
选中子模块-右键->Refactor->Rename...[Shift+F6]
Select Refactring
	- 选中 Rname module and directory
	- OK
		- Rename
			- ruoyi-admin -> txjis-admin
			- Preview
			- Do Refactor

txjis-admin/pom.xml
    <parent>
        <artifactId>ruoyi</artifactId>
        <groupId>com.ruoyi</groupId>
        <version>4.3.1</version>
    </parent>
	
    <parent>
        <groupId>com.txj.xtzc.is</groupId>
        <artifactId>txjis</artifactId>
        <version>0.1.0</version>
    </parent>


ruoyi- -> txjis-	
com.ruoyi->com.txj.xtzc.is


启动验证通过 TxjIs-1.zip

```
###### 5.3 重构包名
1. 在目录树中选中要修改的包（或 在代码中找到导入包的一条语句，将鼠标放置在要重命名的包上），点击鼠标右键->Refactro->Rename...[Shift+F6]
2. 弹出框Warning，点击 Rename package  
3. 弹出修改框Rename，输入框中新包名 com.ruoyi -> com.txj.xtzc.is，选择相应的Scope Project Files，点击 Preview，打开 Refactoring Preview 界面，点击 Do Refacotr
- [IntelliJ IDEA重命名Package(包)](https://jingyan.baidu.com/article/0a52e3f4ed1b59bf63ed727d.html)


```
------------------------------------------------------------
或者 可以逐个模块的包名重构 
com.ruoyi.web com.txj.xtzc.is.web
com.ruoyi.common com.txj.xtzc.is.common
com.ruoyi.framework com.txj.xtzc.is.framework
com.ruoyi.generator com.txj.xtzc.is.generator
com.ruoyi.quartz com.txj.xtzc.is.quartz
com.ruoyi.system com.txj.xtzc.is.system

删除com.ruoyi 包对应的directory "ruoyi"
------------------------------------------------------------
Ctrl+Shift+R 替换
com.ruoyi -> com.txj.xtzc.is


@author ruoyi -> @author txjxtzc
```
###### 5.4 重构java类
- RuoYiApplication->TxjIsApplication
- RuoYiServletInitializer -> TxjIsServletInitializer
- 异常
    - Caused by: java.lang.ClassNotFoundException: KaptchaTextCreator
```
关闭验证码
    # 验证码开关

启动验证通过
```

```
@author ruoyi -> @author TxjXtzc	

备份 TxjIs-2.zip

区分大小写
ruoyi txjis
1. ../static/ruoyi/
2. ../static/ruoyi.png
@ConfigurationProperties(prefix = "ruoyi")

Application Version: ${ruoyi.version}
<ehcache name="ruoyi" updateCheck="false">
<div><a href="http://doc.ruoyi.vip/ruoyi/document/zjwd.html#bootstrap-suggest" target="_blank">http://doc.ruoyi.vip/ruoyi/document/zjwd.html#bootstrap-suggest</a></div>
return $.table.imageView('http://demo.ruoyi.vip/ruoyi.png');

更改目录名
txjis-admin/src/main/resources/static/ruoyi -> txjis-admin/src/main/resources/static/txjis

Ctrl+Shift+N 按文件名搜索文件  更改文件名
ruoyi ->txjis .png .htlm .pdm

启动验证通过 备份 TxjIs-3.zip


区分大小写；不区分大小写查找有哪些，区分大小写替换
RuoYi TxjIs
Ruoyi Txjis

若依 -> 智能发运


验证码异常问题
Caused by: java.lang.ClassNotFoundException: KaptchaTextCreator
        // 验证码文本生成器 properties.setProperty(KAPTCHA_TEXTPRODUCER_IMPL, "KaptchaTextCreator");
        properties.setProperty(KAPTCHA_TEXTPRODUCER_IMPL, "com.ruoyi.framework.config.KaptchaTextCreator");

启动验证通过 备份 TxjIs-4.zip


```
##### 6. IDEA清除项目的git信息
- IntelliJ IDEA.md 清除项目的git信息（IntelliJ IDEA上删除Git项目）
```
备份TxjIs-5.zip
更新启动时字符画
启动验证通过 备份 TxjIs-6.zip
```
##### 7. 分享项目到SVN
- IntelliJ IDEA.md 分享项目到SVN

## Guns
- admin/111111
## pig
## Jeecg-boot
- [技术官网](http://www.jeecg.com/)
- [项目地址](https://gitee.com/jeecg/jeecg-boot)
- [在线演示](http://boot.jeecg.com/)

### [如何启动项目](http://doc.jeecg.com/1273967)

#### 1. [win10下node.js安装](https://blog.csdn.net/zsx18273117003/article/details/94716963)

```
C:\Users\Tosin>node -v
v12.18.2

C:\Users\Tosin>npm install -g http-server
E:\TosinJia\tools\portableSoft\node-v12.18.2-win-x64\http-server -> E:\TosinJia\tools\portableSoft\node-v12.18.2-win-x64\node_modules\http-server\bin\http-server
E:\TosinJia\tools\portableSoft\node-v12.18.2-win-x64\hs -> E:\TosinJia\tools\portableSoft\node-v12.18.2-win-x64\node_modules\http-server\bin\http-server
+ http-server@0.12.3
added 23 packages from 35 contributors in 17.775s

C:\Users\Tosin>
```
- E:\TosinJia\tools\portableSoft\node-v12.18.2-win-x64\node_modules\http-server\bin
```
if (!port) {
  portfinder.basePort = 8089;
  portfinder.getPort(function (err, port) {
    if (err) { throw err; }
    listen(port);
  });
}
```
### README.md
- E:\TosinJia\IdeaProjects\Jeecg-boot\README.md

### 访问账户
- admin 123456
- jeecg 123456

### 报表设计

## renren
- https://www.renren.io/

## vue-manage-system 前端
- https://gitee.com/lin-xin/vue-manage-system
    - https://lin-xin.gitee.io/example/work/#/login


## 后端


### logback的使用和logback.xml详解
- [官方文档](https://logback.qos.ch/documentation.html)
- [logback的使用和logback.xml详解](https://www.cnblogs.com/warking/p/5710303.html)
#### 三、logback的配置介绍
##### 有效级别及级别的继承
- Logger 可以被分配级别。级别包括：TRACE、DEBUG、INFO、WARN 和 ERROR，定义于ch.qos.logback.classic.Level类。如果 logger没有被分配级别，那么它将从有被分配级别的最近的祖先那里继承级别。root logger 默认级别是 DEBUG。
#### 五、logback.xml常用配置详解
#### 六、常用logger配置
```
<!-- show parameters for hibernate sql 专为 Hibernate 定制 -->
<logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" />
<logger name="org.hibernate.type.descriptor.sql.BasicExtractor" level="DEBUG" />
<logger name="org.hibernate.SQL" level="DEBUG" />
<logger name="org.hibernate.engine.QueryParameters" level="DEBUG" />
<logger name="org.hibernate.engine.query.HQLQueryPlan" level="DEBUG" />

<!--myibatis log configure-->
<logger name="com.apache.ibatis" level="TRACE"/>
<logger name="java.sql.Connection" level="DEBUG"/>
<logger name="java.sql.Statement" level="DEBUG"/>
<logger name="java.sql.PreparedStatement" level="DEBUG"/>
```
#### Demo
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false">
<!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径-->
<property name="LOG_HOME" value="/home" />
<!-- 控制台输出 -->
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
<!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
<pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
</encoder>
</appender>
<!-- 按照每天生成日志文件 -->
<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
<!--日志文件输出的文件名-->
<FileNamePattern>${LOG_HOME}/TestWeb.log.%d{yyyy-MM-dd}.log</FileNamePattern>
<!--日志文件保留天数-->
<MaxHistory>30</MaxHistory>
</rollingPolicy>
<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
<!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
<pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
</encoder>
<!--日志文件最大的大小-->
<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
<MaxFileSize>10MB</MaxFileSize>
</triggeringPolicy>
</appender>

<!-- 日志输出级别 -->
<root level="INFO">
<appender-ref ref="STDOUT" />
</root>
</configuration>
```
- %logger{50} 类名大于50采用简写，全类名不加{50}
### 日志级别控制优先级
1. application.yml
```
logging:
  level:
    org.springframework: warn
    org.activiti.engine.impl.persistence.entity: TRACE
```
2. logback.xml
```
	<logger name="org.springframework" level="warn" />
    <logger name="org.activiti.engine.impl.persistence.entity" level="info" />
```






# System Analysis
- [TruckSell](/work/TruckSell/SystemFunctions)
- [TruckSell_BusinessProcess](/work/TruckSell/BusinessProcess)