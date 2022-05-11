[[TOC]]

# RuoYi-Cloud
- https://gitee.com/y_project/RuoYi-Cloud
	- https://gitee.com/tosin/RuoYi-Cloud

# 应用容器部署
- http://doc.ruoyi.vip/ruoyi-cloud/cloud/dokcer.html

## 部署
```
docker-compose images
docker stop ruoyi-gateway
docker rm ruoyi-gateway  
docker rmi docker_ruoyi-gateway
docker-compose ps
docker-compose build ruoyi-auth 
docker images
docker-compose up ruoyi-auth 
docker-compose up -d ruoyi-auth 
docker-compose start ruoyi-auth 
docker-compose logs -f ruoyi-auth
docker-compose stop
docker-compose stop ruoyi-auth
docker-compose down --rmi all
```

```
\bin>clean.bat
\bin>package.bat
\ruoyi-ui>npm run build:prod

User@WIN10-0009 MINGW64 /e/../docker (docker-deploy)
$ sh copy.sh
begin copy sql
begin copy html
begin copy ruoyi-gateway
begin copy ruoyi-auth
begin copy ruoyi-visual
begin copy ruoyi-modules-system
begin copy ruoyi-modules-file
begin copy ruoyi-modules-job
begin copy ruoyi-modules-gen
```

- 上传docker至服务器
```
sftp> cd /root/RuoYi-Cloud
sftp> lcd E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud\      
sftp> put -r docker 
```
- 部署
```
[root@SystemFramework docker]# sh deploy.sh buildBase
Building ruoyi-mysql
Step 1/3 : FROM mysql:5.7
 ---> c20987f18b13
Step 2/3 : MAINTAINER ruoyi
 ---> Running in 2286aada24e3
Removing intermediate container 2286aada24e3
 ---> ce7ee8fec2ec
Step 3/3 : ADD ./db/*.sql /docker-entrypoint-initdb.d/
 ---> 6504b7257a61

Successfully built 6504b7257a61
Successfully tagged docker_ruoyi-mysql:latest
Building ruoyi-nacos
Step 1/3 : FROM nacos/nacos-server
 ---> bdf60dc2ada3
Step 2/3 : MAINTAINER ruoyi
 ---> Running in 3dc8338aeb74
Removing intermediate container 3dc8338aeb74
 ---> 0472a38c50eb
Step 3/3 : COPY ./conf/application.properties /home/nacos/conf/application.properties
 ---> bcde7da6e900

Successfully built bcde7da6e900
Successfully tagged docker_ruoyi-nacos:latest
Building ruoyi-redis
Step 1/6 : FROM redis
 ---> 7614ae9453d1
Step 2/6 : MAINTAINER ruoyi
 ---> Running in 2551d15a09c7
Removing intermediate container 2551d15a09c7
 ---> 7e11f708e574
Step 3/6 : VOLUME /home/ruoyi/redis
 ---> Running in b80b59fe08a7
Removing intermediate container b80b59fe08a7
 ---> aeba7a671953
Step 4/6 : RUN mkdir -p /home/ruoyi/redis
 ---> Running in 831e7617740d
Removing intermediate container 831e7617740d
 ---> 159508eed1bc
Step 5/6 : WORKDIR /home/ruoyi/redis
 ---> Running in a40e56187065
Removing intermediate container a40e56187065
 ---> 94535d6b17fd
Step 6/6 : COPY ./conf/redis.conf /home/ruoyi/redis/redis.conf
 ---> f45642cde337

Successfully built f45642cde337
Successfully tagged docker_ruoyi-redis:latest

[root@SystemFramework docker]# sh deploy.sh base
Creating network "docker_default" with the default driver
Creating ruoyi-mysql ... done
Creating ruoyi-redis ... done
Creating ruoyi-nacos ... done


```
- http://192.168.56.107:8848/nacos/index.html

```
[root@SystemFramework docker]# sh deploy.sh buildModules
Building ruoyi-gateway
Step 1/7 : FROM  openjdk:8-jre
8-jre: Pulling from library/openjdk
0e29546d541c: Pull complete
9b829c73b52b: Pull complete
cb5b7ae36172: Pull complete
99ce012bef04: Pull complete
22dc2a72d098: Pull complete
9c69a57e10d9: Pull complete
Digest: sha256:c0ab1c0631266ef9420a414726a790733a2561efc5f4fa2f9b8186f4d6b00d53
Status: Downloaded newer image for openjdk:8-jre
 ---> 26ac3f63d29f
Step 2/7 : MAINTAINER ruoyi
 ---> Running in a810463c5519
Removing intermediate container a810463c5519
 ---> 4fea841e0c9d
Step 3/7 : VOLUME /home/ruoyi
 ---> Running in f1ca7a4384e6
Removing intermediate container f1ca7a4384e6
 ---> ece5adfc14d7
Step 4/7 : RUN mkdir -p /home/ruoyi
 ---> Running in 859b13d2b476
Removing intermediate container 859b13d2b476
 ---> 66191c4a7a3d
Step 5/7 : WORKDIR /home/ruoyi
 ---> Running in 74d83f956546
Removing intermediate container 74d83f956546
 ---> b1f829de9a2e
Step 6/7 : COPY ./jar/ruoyi-gateway.jar /home/ruoyi/ruoyi-gateway.jar
 ---> 0cc84b1ccbfe
Step 7/7 : ENTRYPOINT ["java","-jar","ruoyi-gateway.jar"]
 ---> Running in f50546bf83db
Removing intermediate container f50546bf83db
 ---> ef50747599eb

Successfully built ef50747599eb
Successfully tagged docker_ruoyi-gateway:latest
Building ruoyi-nginx
Step 1/7 : FROM nginx
latest: Pulling from library/nginx
a2abf6c4d29d: Already exists
a9edb18cadd1: Pull complete
589b7251471a: Pull complete
186b1aaa4aa6: Pull complete
b4df32aa5a72: Pull complete
a0bcbecc962e: Pull complete
Digest: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
Status: Downloaded newer image for nginx:latest
 ---> 605c77e624dd
Step 2/7 : MAINTAINER ruoyi
 ---> Running in 841154f0b4a8
Removing intermediate container 841154f0b4a8
 ---> 666bfb0a0648
Step 3/7 : VOLUME /home/ruoyi/projects/ruoyi-ui
 ---> Running in de7ae37b72e1
Removing intermediate container de7ae37b72e1
 ---> 0671a9e3ea50
Step 4/7 : RUN mkdir -p /home/ruoyi/projects/ruoyi-ui
 ---> Running in 29089bc50cae
Removing intermediate container 29089bc50cae
 ---> 549fe32f5eed
Step 5/7 : WORKDIR /home/ruoyi/projects/ruoyi-ui
 ---> Running in fa4578b03821
Removing intermediate container fa4578b03821
 ---> 4734ecaa0825
Step 6/7 : COPY ./conf/nginx.conf /etc/nginx/nginx.conf
 ---> ed5856367957
Step 7/7 : COPY ./html/dist /home/ruoyi/projects/ruoyi-ui
 ---> 33baf5a40d9d

Successfully built 33baf5a40d9d
Successfully tagged docker_ruoyi-nginx:latest
Building ruoyi-auth
Step 1/7 : FROM  openjdk:8-jre
 ---> 26ac3f63d29f
Step 2/7 : MAINTAINER ruoyi
 ---> Using cache
 ---> 4fea841e0c9d
Step 3/7 : VOLUME /home/ruoyi
 ---> Using cache
 ---> ece5adfc14d7
Step 4/7 : RUN mkdir -p /home/ruoyi
 ---> Using cache
 ---> 66191c4a7a3d
Step 5/7 : WORKDIR /home/ruoyi
 ---> Using cache
 ---> b1f829de9a2e
Step 6/7 : COPY ./jar/ruoyi-auth.jar /home/ruoyi/ruoyi-auth.jar
 ---> 0d6c897cec7f
Step 7/7 : ENTRYPOINT ["java","-jar","ruoyi-auth.jar"]
 ---> Running in 59f13ffb89ad
Removing intermediate container 59f13ffb89ad
 ---> 5244610d39cd

Successfully built 5244610d39cd
Successfully tagged docker_ruoyi-auth:latest
Building ruoyi-modules-system
Step 1/7 : FROM  openjdk:8-jre
 ---> 26ac3f63d29f
Step 2/7 : MAINTAINER ruoyi
 ---> Using cache
 ---> 4fea841e0c9d
Step 3/7 : VOLUME /home/ruoyi
 ---> Using cache
 ---> ece5adfc14d7
Step 4/7 : RUN mkdir -p /home/ruoyi
 ---> Using cache
 ---> 66191c4a7a3d
Step 5/7 : WORKDIR /home/ruoyi
 ---> Using cache
 ---> b1f829de9a2e
Step 6/7 : COPY ./jar/ruoyi-modules-system.jar /home/ruoyi/ruoyi-modules-system.jar
 ---> 730c465686c4
Step 7/7 : ENTRYPOINT ["java","-jar","ruoyi-modules-system.jar"]
 ---> Running in 88b4baf84821
Removing intermediate container 88b4baf84821
 ---> 2ce4ac988d8c

Successfully built 2ce4ac988d8c
Successfully tagged docker_ruoyi-modules-system:latest

[root@SystemFramework docker]# sh deploy.sh modules
ruoyi-redis is up-to-date
ruoyi-mysql is up-to-date
Creating ruoyi-gateway        ... done
Creating ruoyi-auth           ... done
Creating ruoyi-modules-system ... done
Creating ruoyi-nginx          ... done
```
- http://192.168.56.107/

> mysql重新初始化，需要清除目录挂载相关的文件夹

```
[root@SystemFramework docker]# docker-compose images


[root@SystemFramework docker]# docker stop ruoyi-gateway

[root@SystemFramework docker]# docker rm ruoyi-gateway  
[root@SystemFramework docker]# docker rmi docker_ruoyi-gateway
[root@SystemFramework docker]# docker-compose ps
[root@SystemFramework docker]# docker-compose build ruoyi-auth 
[root@SystemFramework docker]# docker images
[root@SystemFramework docker]# docker-compose up ruoyi-auth 
[root@SystemFramework docker]# docker-compose up -d ruoyi-auth 
[root@SystemFramework docker]# docker-compose start ruoyi-auth 
[root@SystemFramework docker]# docker-compose logs -f ruoyi-auth
[root@SystemFramework docker]# docker-compose stop ruoyi-auth
[root@SystemFramework docker]# docker-compose down --rmi all
Removing ruoyi-nginx          ... done
Removing ruoyi-modules-system ... done
Removing ruoyi-auth           ... done
Removing ruoyi-gateway        ... done
Removing ruoyi-nacos          ... done
Removing ruoyi-redis          ... done
Removing ruoyi-mysql          ... done
Removing network docker_default
Removing image docker_ruoyi-mysql
Removing image docker_ruoyi-nacos
Removing image docker_ruoyi-redis
Removing image docker_ruoyi-gateway
Removing image docker_ruoyi-nginx
Removing image docker_ruoyi-auth
Removing image docker_ruoyi-modules-system
Removing image docker_ruoyi-modules-gen
WARNING: Image docker_ruoyi-modules-gen not found.
Removing image docker_ruoyi-modules-job
WARNING: Image docker_ruoyi-modules-job not found.
Removing image docker_ruoyi-modules-file
WARNING: Image docker_ruoyi-modules-file not found.
Removing image docker_ruoyi-visual-monitor
WARNING: Image docker_ruoyi-visual-monitor not found.
```
# 开发环境搭建
```
[root@SystemFramework RuoYi-Cloud]# ll sql/
total 96
-rw-r--r--. 1 root root 11985 Mar 22 09:07 quartz.sql
-rw-r--r--. 1 root root 56121 Apr 12 10:17 ry_20210908.sql
-rw-r--r--. 1 root root 20572 Mar 22 09:07 ry_config_20220114.sql
-rw-r--r--. 1 root root  3083 Mar 22 09:07 ry_seata_20210128.sql
[root@SystemFramework RuoYi-Cloud]# mysql -uroot -h127.0.0.1 -p123456
mysql> source /root/RuoYi-Cloud/sql/ry_20210908.sql
mysql> use `ry-cloud`
Database changed
mysql> source /root/RuoYi-Cloud/sql/quartz.sql
mysql> source /root/RuoYi-Cloud/sql/ry_config_20220114.sql
mysql> source /root/RuoYi-Cloud/sql/ry_seata_20210128.sql
```

- nacos  数据库配置（nacos-server-2.0.4.zip）
	- 配置管理 修改数据库密码 password: 123456
		- ruoyi-system-dev.yml
		- ruoyi-gen-dev.yml
		- ruoyi-job-dev.yml
	- 服务列表
```
D:\tools\portable\nacos\nacos-server-2.0.4\bin\startup.cmd
- http://127.0.0.1:8848/nacos/index.html
```


- 启动后台服务

- ui
```
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud-master\ruoyi-ui>npm install
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud-master\ruoyi-ui>npm run dev

# 打包
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud\ruoyi-ui>npm run build:stage
```
- 前端部署
```
D:\tools\portable\nginx-1.21.3

D:\tools\portable\nginx-1.21.3\conf\nginx.conf
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

		location /stage-api/ {
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

D:\tools\portable\nginx-1.21.3>start nginx.exe

http://127.0.0.1/
chunk-libs.d0154874.js:41 Error: Cannot find module '@/views/system/user/index'
    at i (app.b51cee25.js:1:295157)
    at app.b51cee25.js:1:72835
    
参考：https://blog.csdn.net/qq_40147863/article/details/121727997

E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud\ruoyi-ui\src\store\modules\permission.js
export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}
E:\iEnviroment\development\projects\ideaProjects\Demo\system-framework\RuoYi-Cloud\ruoyi-ui\package.json

    "build:development": "vue-cli-service build --mode development",
```

## docker
- reids
```
[root@SystemFramework ~]# docker -v
Docker version 20.10.8, build 3967b7d
[root@SystemFramework ~]# docker run -di --name iredis -p 6379:6379 redis
dda8982e104393edc924c83a5ef6552f558805a4487b4b7f122440d3c77bdd2b
```

## 部署

```
bin>package.bat
```
- 启动
```
# -Dfile.encoding=utf-8 org.yaml.snakeyaml.error.YAMLException: java.nio.charset.MalformedInputException: Input length = 1
>java -jar -Dfile.encoding=utf-8 ruoyi-gateway.jar
```


## docker-compose
```
[root@SystemFramework mysql]# systemctl stop mysqld 
[root@SystemFramework mysql]# pwd
/root/RuoYi-Cloud/docker/mysql
[root@SystemFramework mysql]# tree ./
./
├── db
│   ├── readme.txt
│   ├── ry_20210908.sql
│   ├── ry_config_20220114.sql
│   └── ry_seata_20210128.sql
└── dockerfile

[root@SystemFramework mysql]# docker build -f /root/RuoYi-Cloud/docker/mysql/dockerfile --tag image-ruoyi-cloud-mysql:1.0 .
Sending build context to Docker daemon  100.9kB
Step 1/3 : FROM mysql:5.7
5.7: Pulling from library/mysql
72a69066d2fe: Pull complete 
93619dbc5b36: Pull complete 
99da31dd6142: Pull complete 
626033c43d70: Pull complete 
37d5d7efb64e: Pull complete 
ac563158d721: Pull complete 
d2ba16033dad: Pull complete 
0ceb82207cd7: Pull complete 
37f2405cae96: Pull complete 
e2482e017e53: Pull complete 
70deed891d42: Pull complete 
Digest: sha256:f2ad209efe9c67104167fc609cca6973c8422939491c9345270175a300419f94
Status: Downloaded newer image for mysql:5.7
 ---> c20987f18b13
Step 2/3 : MAINTAINER ruoyi
 ---> Running in 5e98f4df2ef3
Removing intermediate container 5e98f4df2ef3
 ---> 0f4c867d4ef1
Step 3/3 : ADD ./db/*.sql /docker-entrypoint-initdb.d/
 ---> a0074eeeb208
Successfully built a0074eeeb208
Successfully tagged image-ruoyi-cloud-mysql:1.0
[root@SystemFramework mysql]# docker images
REPOSITORY                                             TAG       IMAGE ID       CREATED          SIZE
image-ruoyi-cloud-mysql                                1.0       a0074eeeb208   34 seconds ago   448MB

[root@SystemFramework mysql]# docker run -di --name ry-mysql -p 3306:3306 -v /root/RuoYi-Cloud/docker/mysql/conf:/etc/mysql/conf.d -v /root/RuoYi-Cloud/docker/mysql/logs:/logs -v /root/RuoYi-Cloud/docker/mysql/data:/var/lib/mysql -e MYSQL_DATABASE='ry-cloud' -e MYSQL_ROOT_PASSWORD=password image-ruoyi-cloud-mysql:1.0 mysqld --innodb-buffer-pool-size=80M --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time-zone=+8:00 --lower-case-table-names=1
8bce514155d4bbeaca67e14b0f8a6e0ef1ccb3834e9ccd43cbd53bd857bf12f1


[root@SystemFramework mysql]# docker run -di --name ry-mysql -p 3306:3306 -v /root/RuoYi-Cloud/docker/mysql/conf:/etc/mysql/conf.d -v /root/RuoYi-Cloud/docker/mysql/logs:/logs -v /root/RuoYi-Cloud/docker/mysql/data:/var/lib/mysql -e MYSQL_DATABASE='ry-cloud' -e MYSQL_ROOT_PASSWORD=password image-ruoyi-cloud-mysql:1.0 mysqld --innodb-buffer-pool-size 80M --character-set-server utf8mb4 --collation-server utf8mb4_unicode_ci --default-time-zone +8:00 --lower-case-table-names 1
472d95d5e33c161e3dbd330c1e978c98120e7ff0b8f683f637fc0236df46867a



[root@SystemFramework docker]# docker-compose --file docker-compose-mysql.yml config -q
[root@SystemFramework docker]# docker-compose --file docker-compose-mysql.yml up -d
Creating network "docker_default" with the default driver
Creating ruoyi-mysql ... done

[root@SystemFramework docker]# cat nacos/conf/application.properties 
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://192.168.56.107:3306/ry-config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
[root@SystemFramework docker]# docker-compose --file docker-compose-nacos.yml config -q

[root@SystemFramework docker]# docker-compose --file docker-compose-nacos.yml up -d
WARNING: Found orphan containers (ruoyi-mysql) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Creating ruoyi-nacos ... done
- http://192.168.56.107:8848/nacos/index.html

[root@SystemFramework docker]# docker-compose --file docker-compose-redis.yml config -q
[root@SystemFramework docker]# docker-compose --file docker-compose-redis.yml up -d
WARNING: Found orphan containers (ruoyi-nacos, ruoyi-mysql) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Creating ruoyi-redis ... done
```
