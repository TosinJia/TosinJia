# 开源框架
[[TOC]]

- [秒建一个后台管理系统？用这5个开源免费的Java项目就够了](https://zhuanlan.zhihu.com/p/142046905)
## RuoYi

- [技术官网](https://ruoyi.vip/)
- [文档地址](http://doc.ruoyi.vip/)


### RuoYi-Vue
- [RuoYi-Vue](https://gitee.com/y_project/RuoYi-Vue)
### RuoYi
- [项目地址](https://gitee.com/y_project/RuoYi)
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