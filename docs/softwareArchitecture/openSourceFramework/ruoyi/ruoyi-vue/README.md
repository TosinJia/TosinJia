# RuoYi-Vue
[[TOC]]



## 参考

- [RuoYi-Vue源码](https://gitee.com/y_project/RuoYi-Vue)
  - [Forked](https://gitee.com/tosin/RuoYi-Vue)

- [Element官网](https://element.eleme.cn/#/zh-CN)
    - [组件 | Element Upload 上传](https://element.eleme.cn/#/zh-CN/component/upload)
    - [组件 | Element Link 文字链接](https://element.eleme.cn/#/zh-CN/component/link)
- https://cli.vuejs.org/config/#devserver-proxy


## 新增模块
### 1. 新增模块
1. 创建文件夹 `\ruoyi-english`
2. 创建pom.xml `\ruoyi-english\pom.xml`
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>ruoyi</artifactId>
        <groupId>com.ruoyi</groupId>
        <version>3.8.1</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>ruoyi-english</artifactId>

    <description>
        english模块
    </description>

    <dependencies>

        <!-- 通用工具-->
        <dependency>
            <groupId>com.ruoyi</groupId>
            <artifactId>ruoyi-common</artifactId>
        </dependency>

    </dependencies>

</project>
```
### 2. 修改父级pom.xml
1. 修改父级pom.xml `\pom.xml`
```
    <!-- 依赖声明 -->
    <dependencyManagement>
        <dependencies>
            ...
            <dependency>
                <groupId>com.ruoyi</groupId>
                <artifactId>ruoyi-english</artifactId>
                <version>${ruoyi.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <modules>
        ...
        <module>ruoyi-english</module>
    </modules>
```
2. Maven窗口 Reload All Maven Projects，识别模块

### 3. 使用新建模块
1. src目录中 添加main中相关代码
2. Maven窗口 Reload All Maven Projects，识别代码
3. 启动项目pom.xml中配置
```
    <dependencies>

        ...
        
        <!-- english模块-->
        <dependency>
            <groupId>com.ruoyi</groupId>
            <artifactId>ruoyi-english</artifactId>
        </dependency>
    </dependencies>
```

## 代码生成
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

### 实操
```
E:\iEnviroment\英语学习\开发\ruoyi>tree /F
卷 新加卷 的文件夹 PATH 列表
卷序列号为 3448-8611
E:.
│  dic_word_bizMenu.sql
│
├─main
│  ├─java
│  │  └─com
│  │      └─ruoyi
│  │          └─english
│  │              ├─controller
│  │              │      DictWordInfoController.java
│  │              │
│  │              ├─domain
│  │              │      DictWordInfo.java
│  │              │
│  │              ├─mapper
│  │              │      DictWordInfoMapper.java
│  │              │
│  │              └─service
│  │                  │  IDictWordInfoService.java
│  │                  │
│  │                  └─impl
│  │                          DictWordInfoServiceImpl.java
│  │
│  └─resources
│      └─mapper
│          └─english_mod
│                  DictWordInfoMapper.xml
│
└─vue
    ├─api
    │  └─english_mod
    │          dic_word_biz.js
    │
    └─views
        └─english_mod
            └─dic_word_biz
                    index.vue
```
1. 执行 dic_word_bizMenu.sql

1. 覆盖文件夹
```
RuoYi-Vue\ruoyi-admin\src\main
main

RuoYi-Vue\ruoyi-ui\src

vue\
```
### oralce版


#### 1. 单表
1. 新增功能数据库脚本
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
2. 导入、编辑提交
3. 下载源码
    1. 执行 *.sql
    2. vue文件加下的文件夹复制到dyetc-ui\src中
    3. main文件下覆盖目标模块下的main文件夹

## 上传下载
- 参考
    - [上传下载](http://doc.ruoyi.vip/ruoyi-cloud/document/htsc.html#%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD)
    - 88-89

1. 建库脚本
```
drop table if exists sys_file_info;
create table sys_file_info (
  file_id           int(11)          not null auto_increment       comment '文件id',
  file_name         varchar(50)      default ''                    comment '文件名称',
  file_path         varchar(255)     default ''                    comment '文件路径',
  primary key (file_id)
) engine=innodb auto_increment=1 default charset=utf8 comment = '文件信息表';
```
2. 代码生成
### 上传
- 参考
    - [组件 | Element Upload 上传](https://element.eleme.cn/#/zh-CN/component/upload)

1. 替换上传控件
```
          <el-upload
            ref="upload"
            :limit="1"
            accept=".jpg, .png"
            :action="upload.url"
            :headers="upload.headers"
            :file-list="upload.fileList"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" :loading="upload.isUploading" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
```
2. 引入getToken方法
```
import { getToken } from "@/utils/auth";
```
3. data中添加用于上传的数据
```
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/common/upload",
        // 上传的文件列表
        fileList: []
      },
```
4. 处理fileList参数
```
    handleAdd() {

      this.upload.fileList = [];
    },

    handleUpdate(row) {

        this.upload.fileList = [{ name: this.form.fileName, url: this.form.filePath }];
      });
    },
```
5. 添加上传事件
```
    // 文件提交处理
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      this.form.filePath = response.url;
      this.$modal.msgSuccess(response.msg);
      // this.msgSuccess(response.msg);
    },
```

### 下载
1. 添加下载按钮
```
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDownload(scope.row)"
          >下载</el-button>
```
2. 实现下载事件
```
    // 文件下载处理
    handleDownload(row) {
      var name = row.fileName;
      var url = row.filePath;
      var suffix = url.substring(url.lastIndexOf("."), url.length);
      const a = document.createElement('a')
      a.setAttribute('download', name + suffix)
      a.setAttribute('target', '_blank')
      a.setAttribute('href', url)
      a.click()
    }
```

#### 无法下载问题
> a标签跨域会导致download属性无效

- [a标签download属性不起作用](https://blog.csdn.net/zgjsxzlx/article/details/86543022)
- [\<a>标签下载文件重命名失败，download 无效](https://blog.csdn.net/xi_nuo/article/details/104795963)

## 本地文件访问
- 参考
    - [【开发实践】ruoyi如何实现图片的服务器上传和地址回显](https://blog.csdn.net/Mr_Wonka/article/details/118631772)

### 前端
```
RuoYi-Vue\ruoyi-ui\vue.config.js
// 使用代理来解决跨域问题 http://localhost/dev-api -> http://localhost:8080
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },

-- 前端请求 /dev-api
http://localhost/dev-api/profile/upload/2022/02/22/3f08f7aa-4014-484d-b89d-673a418d2399.pdf
-- 处理后，将请求交给后端处理
http://localhost:8080/profile/upload/2022/02/22/3f08f7aa-4014-484d-b89d-673a418d2399.pdf
```
### 后端

- 后端对匹配的URL进行拦截 /profile/** ，映射至本地文件夹 RuoYiConfig.getProfile()。
```
@Configuration
public class ResourcesConfig implements WebMvcConfigurer
{

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        /** 本地文件上传路径 */
        registry.addResourceHandler(Constants.RESOURCE_PREFIX + "/**")
                .addResourceLocations("file:" + RuoYiConfig.getProfile() + "/");


public class Constants
    /**
     * 资源映射路径 前缀
     */
    public static final String RESOURCE_PREFIX = "/profile";

application.yml
# 项目相关配置
ruoyi:
  # 文件路径 示例（ Windows配置D:/ruoyi/uploadPath，Linux配置 /home/ruoyi/uploadPath）
  profile: D:/ruoyi/uploadPath

@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter
                .antMatchers(
                        HttpMethod.GET,
                        "/profile/**"
                ).permitAll()
```


## 重构
- 数据库
```
[root@SystemFramework ~]# mysql -uroot -h127.0.0.1 -p123456
mysql> CREATE DATABASE IF NOT EXISTS RuoYi_Vue DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;       
Query OK, 1 row affected (0.00 sec)
mysql> use RuoYi_Vue;
Database changed
mysql> source /root/RuoYi-Vue/ry_20210908.sql;
mysql> source /root/RuoYi-Vue/quartz.sql;
```
- 缓存
```
D:\tools\portable\Redis-x64-3.0.504>redis-server.exe redis.windows.conf
```

```
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Vue-master\ruoyi-ui>npm install
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Vue-master\ruoyi-ui>npm run dev
```
- http://localhost/login

### RuoYi-Vue-Oracle
- https://github.com/yangzongzhuan/RuoYi-Vue-Oracle

### 重构
- https://blog.csdn.net/qq_36557065/article/details/115488387
https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E4%B8%8D%E7%99%BB%E5%BD%95%E7%9B%B4%E6%8E%A5%E8%AE%BF%E9%97%AE

> RuoYi -> SqdyEtc
> ruoyi -> sqdyetc
> Ruoyi -> Sqdyetc
> 若依->陕汽德银ETC
> 3.8.1->1.0.0

#### 前端

1. RuoYi->SqdyEtc	
	1. 修改文件夹 sqdyetc-ui\src\components\RuoYi
	1. 查找替换

1. ruoyi->sqdyetc	
	1. 重构文件
		1. src\utils\ruoyi.js
		1. src\assets\styles\ruoyi.scss
	1. 查找替换
1. 最终检索不到区分大小写 ruoyi
1. 若依->陕汽德银ETC 查找替换

#### 后端
1. RuoYi-Vue-master.zip 解压 修改文件件为 SqdyEtc
2. 修改项目名称、模块文件夹名
	- File->Project Structure->Project Project Name SqdyEtc
3. 修改模块名称
	- File->Project Structure->Modules
		- sqdyetc   Apply
		- sqdyetc-admin
		- sqdyetc-common
		- sqdyetc-framework
		- sqdyetc-generator
		- sqdyetc-quartz
		- sqdyetc-system
4. 修改模块文件夹名
5. 修改pom文件
	1. pom.xml ruoyi->sqdyetc
	2. sqdyetc-admin\pom.xml
	3. sqdyetc-common\pom.xml
	4. sqdyetc-framework\pom.xml
	5. sqdyetc-generator\pom.xml
	6. sqdyetc-quartz\pom.xml
	7. sqdyetc-system\pom.xml

6. 检测
	1. 修改数据库配置 sqdyetc-admin\src\main\resources\application-druid.yml
	```
	            master:
	                url: jdbc:mysql://localhost:3306/RuoYi_Vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
	                username: root
	                password: 123456
	```
	2. 前端
	```
	SqdyEtc>cd sqdyetc-ui
	SqdyEtc\sqdyetc-ui>npm install
	SqdyEtc\sqdyetc-ui>npm run dev
	```
6. 更换项目所有包名称com.ruoyi.xxx换成com.dyetc.xxx
	- com.ruoyi -> Refactor -> Rename 
		-> In Whole Project
		-> 勾选 Search in comments and strings; Search for text occurences
		-> Preview -> Do Refactor

1. 启动检测
	1. sqdyetc-admin\src\main\resources\application.yml
		1. ruoyi->sqdyetc
		2. RuoYi -> SqdyEtc
1. 替换
	1. RuoYi -> SqdyEtc
		- RuoYiConfig -> SqdyEtcConfig
		- RuoYiApplication -> SqdyEtcApplication
		- RuoYiServletInitializer -> SqdyEtcServletInitializer
	1. Ruoyi -> Sqdyetc
		- RuoyiScheduler
	1. 替换其他字符串，最终检索不到区分大小写 ruoyi

1. 若依->陕汽德银ETC 查找替换

##### 数据库
```
CREATE DATABASE IF NOT EXISTS `sqdy-etc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```



## 部署
### 前端
```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
		charset utf-8;

		location / {
            root   D://tools/portable/nginx-1.21.3/app/ruoyi-ui;
			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
		
		location /dev-api/ {
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}	
		location /stage-api/ {
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}
		location /prod-api/ {
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}	

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
