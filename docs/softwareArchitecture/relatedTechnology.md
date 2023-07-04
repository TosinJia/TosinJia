# 相关技术
[[TOC]]

- [https://javadoc.io/](https://javadoc.io/)

## JDK
- [Java Archive | Oracle](http://www.oracle.com/technetwork/java/javase/archive-139210.html)
    - https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html
        - jdk-8u181-linux-x64.tar.gz
## Sentinel
- [sentinel （史上最全+入门教程）](https://www.cnblogs.com/crazymakercircle/p/14285001.html)
## nacos
### 官网参考
- https://nacos.io/zh-cn/index.html
	- https://github.com/alibaba/nacos
		- https://github.com/alibaba/nacos/releases
			- nacos-server-1.4.3.zip
			- nacos-server-2.0.4.zip
	- https://nacos.io/zh-cn/docs/what-is-nacos.html
		- https://nacos.io/zh-cn/docs/quick-start.html

- [Nacos界面功能操作](https://www.jianshu.com/p/b625508ac658)

### Windows
> D:\tools\portable\nacos

- 修改配置
1. conf\application.properties
```
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://localhost:3306/ry-config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=123456
```
2. bin\startup.cmd standalone
```
rem set MODE="cluster"
set MODE="standalone"
```
3. 启动
	- 双击 bin\startup.cmd
	- 命令
	```
	D:\tools\portable\nacos\nacos-server-2.0.4\bin>startup.cmd -m standalone
	"nacos is starting with standalone"
	
	         ,--.
	       ,--.'|
	   ,--,:  : |                                           Nacos 2.0.4
	,`--.'`|  ' :                       ,---.               Running in stand alone mode, All function modules
	|   :  :  | |                      '   ,'\   .--.--.    Port: 8848
	:   |   \ | :  ,--.--.     ,---.  /   /   | /  /    '   Pid: 7256
	|   : '  '; | /       \   /     \.   ; ,. :|  :  /`./   Console: http://192.168.56.1:8848/nacos/index.html
	'   ' ;.    ;.--.  .-. | /    / ''   | |: :|  :  ;_
	|   | | \   | \__\/: . ..    ' / '   | .; : \  \    `.      https://nacos.io
	'   : |  ; .' ," .--.; |'   ; :__|   :    |  `----.   \
	|   | '`--'  /  /  ,.  |'   | '.'|\   \  /  /  /`--'  /
	'   : |     ;  :   .'   \   :    : `----'  '--'.     /
	;   |.'     |  ,     .-./\   \  /            `--'---'
	'---'        `--`---'     `----'
	
	2022-01-29 09:02:30,267 INFO Bean 'org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler@23c388c2' of type [org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
	
	2022-01-29 09:02:30,284 INFO Bean 'methodSecurityMetadataSource' of type [org.springframework.security.access.method.DelegatingMethodSecurityMetadataSource] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
	
	2022-01-29 09:02:31,731 INFO Tomcat initialized with port(s): 8848 (http)
	
	2022-01-29 09:02:32,493 INFO Root WebApplicationContext: initialization completed in 7999 ms
	
	2022-01-29 09:02:41,785 INFO Initializing ExecutorService 'applicationTaskExecutor'
	
	2022-01-29 09:02:42,082 INFO Adding welcome page: class path resource [static/index.html]
	
	2022-01-29 09:02:43,013 INFO Creating filter chain: Ant [pattern='/**'], []
	
	2022-01-29 09:02:43,099 INFO Creating filter chain: any request, [org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@4c59e45e, org.springframework.security.web.context.SecurityContextPersistenceFilter@6009bea, org.springframework.security.web.header.HeaderWriterFilter@11ebb1b6, org.springframework.security.web.csrf.CsrfFilter@5d5b5fa7, org.springframework.security.web.authentication.logout.LogoutFilter@431f1eaf, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@75769ab0, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@27ace0b1, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@58ec7116, org.springframework.security.web.session.SessionManagementFilter@f3021cb, org.springframework.security.web.access.ExceptionTranslationFilter@6107165]
	
	2022-01-29 09:02:43,328 INFO Initializing ExecutorService 'taskScheduler'
	
	2022-01-29 09:02:43,415 INFO Exposing 16 endpoint(s) beneath base path '/actuator'
	
	2022-01-29 09:02:43,667 INFO Tomcat started on port(s): 8848 (http) with context path '/nacos'
	
	2022-01-29 09:02:43,680 INFO Nacos started successfully in stand alone mode. use external storage
	
	2022-01-29 09:03:05,107 INFO Initializing Servlet 'dispatcherServlet'
	
	2022-01-29 09:03:05,131 INFO Completed initialization in 22 ms
	```
4. 访问
	- [http://127.0.0.1:8848/nacos](http://127.0.0.1:8848/nacos)
	- http://192.168.56.1:8848/nacos/index.html
        - nacos nacos


## 工具包
### easypoi excel处理
- https://gitee.com/lemur/easypoi
    - [开发指南](http://doc.wupaas.com/docs/easypoi/easypoi-1c0u4mo8p4ro8)
    - https://easypoi.mydoc.io/

- https://gitee.com/lemur/easypoi-test/repository/blazearchive/dev.zip?Expires=1634822302&Signature=8np%2B5nyR1oIlhh9XRVqsxO5E1h9jiqHrH0BpagVsgCc%3D
	- https://gitee.com/lemur/easypoi-test/tree/master/src/test/resources/doc

#### 大数据导出
- [2.10 Excel大数据导出](http://doc.wupaas.com/docs/easypoi//22)

- [利用EasyPoi导出大量数据到Excel](https://blog.csdn.net/FtLnnL/article/details/100016193)

- [easypoi大数据导出，感觉真的好用](https://blog.csdn.net/u012572955/article/details/81908815)
- [【springboot+easypoi】大数据量excel导出](https://www.jianshu.com/p/e18f79bc5a5a)



#### jar包方式获取不到模板文件
- jar包统计目录下 添加 templates/excels/渠道返利汇总表模板.xls
```
TemplateExportParams templateExportParams = new TemplateExportParams("templates/excels/渠道返利汇总表模板.xls", true);


```
### java解析xml字符串
```
        <dependency>
            <groupId>dom4j</groupId>
            <artifactId>dom4j</artifactId>
            <version>1.6.1</version>
        </dependency>


import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import javax.inject.Singleton;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/***
 * java解析xml字符串
 * 参考：https://blog.csdn.net/u012255097/article/details/108629582
 */
@Singleton
public class XmlUtils {
    public static Map<String, String>  parseXml(String xml){
        Map<String, String> map = new HashMap<>();
//        map.put("returnsms", "returnsms.");
        return parseXml2Map(xml, map);
    }
    /**
     * 将xml转换为Map。 支持xml标签多层嵌套，并以"."分隔多级标签（不包括根节点）。 不支持XML标签重复时的情况
     *
     * @param xml
     * @param map
     * @return
     */
    private static Map<String, String> parseXml2Map(String xml, Map<String, String> map) {
        try {
            SAXReader reader = new SAXReader();
            Document doc = reader.read(new StringReader(xml));
            Element root = doc.getRootElement();
            String path = "";
            if (map.containsKey(root.getName().trim())) {
                path = map.get(root.getName().trim());
                map.remove(root.getName().trim());
            }
            for (Iterator i = root.elementIterator(); i.hasNext(); ) {
                Element element = (Element) i.next();
                if (element.isTextOnly()) {
                    if (path.length() > 0) {
                        map.put(path + element.getName().trim(), element.getTextTrim());
                    } else {
                        map.put(element.getName().trim(), element.getTextTrim());
                    }
                } else {
                    map.put(element.getName().trim(), path + element.getName().trim() + ".");
                    parseXml2Map(element.asXML(), map);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    public static void main(String[] args){
        XmlUtils test=new XmlUtils();
        String xml="<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n" +
                "<returnsms>\n" +
                "        <mobile>15829269494</mobile>\n" +
                "    <statusbox>\n" +
                "        <mobile>15829269494</mobile>\n" +
                "    </statusbox>\n" +
                "</returnsms>";
        Map map=test.parseXml(xml);
        System.out.println("resMap==="+map);
        String mobile = (String)map.get("statusbox.mobile");
        System.out.println("mobile===="+mobile);
    }
}
```


## mybatis
- [https://blog.mybatis.org/](https://blog.mybatis.org/)
- [https://mybatis.org/mybatis-3/](https://mybatis.org/mybatis-3/)
	
## pageHelper
- [https://pagehelper.github.io/](https://pagehelper.github.io/)
	- [https://pagehelper.github.io/docs/howtouse/](https://pagehelper.github.io/docs/howtouse/)

## druid
- [https://github.com/alibaba/druid](https://github.com/alibaba/druid)
	- [https://github.com/alibaba/druid/wiki/常见问题](https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
		- [https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter](https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter)


## 其他
- tk.mapper
- mybatis plus

## swagger系统接口
- [https://swagger.io/](https://swagger.io/)

## velocity代码生成
    - https://velocity.apache.org/engine/devel/user-guide.html
```
        <!--velocity代码生成使用模板 -->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
        </dependency>
```

## quartz定时任务
- [http://www.quartz-scheduler.org/](http://www.quartz-scheduler.org/)
    - [http://www.quartz-scheduler.org/documentation/quartz-2.3.0/](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/)
```
        <!-- 定时任务 -->
        <dependency>
            <groupId>org.quartz-scheduler</groupId>
            <artifactId>quartz</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>com.mchange</groupId>
                    <artifactId>c3p0</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

## 验证框架
### 表单验证
- [https://element.eleme.cn/#/zh-CN/component/form](https://element.eleme.cn/#/zh-CN/component/form)

### 自定义验证注解
- [https://javadoc.io/doc/jakarta.validation/jakarta.validation-api/2.0.2/index.html](https://javadoc.io/doc/jakarta.validation/jakarta.validation-api/2.0.2/index.html)

```
        <!-- 自定义验证注解 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```
## 优雅停止 Java 服务


```
# 1. 找出 Java 服务的进程 ID，可以使用 JDK 自带的jps命令或者 Linux 平台的ps(process status) 命令
[root@ucd468y83kxg9q dyyy]# jps
58966 jar
59357 Jps
[root@ucd468y83kxg9q dyyy]# jps -l
59378 sun.tools.jps.Jps
58966 txj-datamanage-admin.jar
[root@ucd468y83kxg9q dyyy]# ps -ef | grep java
root      58966      1  7 09:15 pts/0    00:00:32 java -jar txj-datamanage-admin.jar
root      59474  58571  0 09:22 pts/0    00:00:00 grep --color=auto java
# 2. 向 Java 进程发送信号，告知其停止服务
[root@ucd468y83kxg9q dyyy]# kill 58966
```

- 优雅停止 Java 服务
    1. 直接使用kill -9 PID，其实这个是很粗暴的而且极其危险的动作。因为它不管程序现在有没有未处理完的事情，直接强制终止进程，这对于一些比较敏感的服务，例如金融交易等业务是致命的
    1. 使用kill PID命令停止服务，发现钩子函数被正常执行了。当我们执行 kill pid 命令时，JVM 接收到关闭指令，会发布一些关闭事件，监听事件的监听器就可以在关闭服务前做相应的处理；也会触发注册的所有 Shutdown Hook，从而实现优雅停止服务。优雅停止服务还可以有多余的时间让服务执行关闭线程池等操作，实现了在停止服务前执行完线程池的任务，释放资源等操作。
    1. 比较合理的处理方式是应该先用默认信号（15) SIGTERM 尝试停止服务，如果多次尝试未停止成功，再考虑使用强制信号（9) SIGKILL 终止服务

```
[root@ucd468y83kxg9q dyyy]# cat shutdown-admin.sh 
#!/bin/bash

# 主类
APP_MAINCLASS="txj-datamanage-admin.jar"

# 进程ID
psid=0

# 记录尝试次数
num=0

# 获取进程ID，如果进程不存在则返回0，
# 当然你也可以在启动进程的时候将进程ID写到一个文件中，
# 然后使用时读取这个文件即可获取到进程ID
getpid() {
   javaps=`jps -l | grep $APP_MAINCLASS`
   if [ -n "$javaps" ]; then
      psid=`echo $javaps | awk '{print $1}'`
   else
      psid=0
   fi
}

stop() {
   getpid
   num=`expr $num + 1`  
   if [ $psid -ne 0 ]; then
    # 重试次数小于3次则继续尝试停止服务
    if [ "$num" -le 3 ];then
      echo "attempt to kill... num:$num"
      kill $psid
      sleep 1
    else
      # 重试次数大于3次，则强制停止
      echo "force kill..."
      kill -9 $psid      
    fi
    # 检查上述命令执行是否成功
    if [ $? -eq 0 ]; then
       echo "Shutdown success..."
    else
       echo "Shutdown failed..."
    fi
 
    # 重新获取进程ID，如果还存在则重试停止
    getpid
    if [ $psid -ne 0 ]; then
       stop
    fi
   else
      echo "App is not running"
   fi
}

stop
[root@ucd468y83kxg9q dyyy]# sh shutdown-admin.sh 
attempt to kill... num:1
Shutdown success...
```

- 参考
    - [Linux 环境如何使用 kill 命令优雅停止 Java 服务](https://blog.csdn.net/chenlixiao007/article/details/119394664)


## 富文本

### 官方参考
- [UEditor文档](http://fex.baidu.com/ueditor/)
	- [UEditor Github 地址](https://github.com/fex-team/ueditor)
		- https://github.com/TosinJia/ueditor
	- [使用grunt打包源代码](http://fex.baidu.com/ueditor/#dev-bale_width_grunt)
	- [自定义请求参数](http://fex.baidu.com/ueditor/#dev-serverparam)
- [vue-ueditor-wrap](https://hc199421.gitee.io/vue-ueditor-wrap/#/home)
	- https://github.com/HaoChuan9421/vue-ueditor-wrap
- https://open-doc.modstart.com/ueditor-plus/
	- [ueditor-plus](https://gitee.com/modstart-lib/ueditor-plus)
		- https://gitee.com/tosin/ueditor-plus

### 过程参考
- [vue使用百度富文本（UEditor）](https://juejin.cn/post/7023720946842206245)
- [集成ueditor实现富文本编辑器增强](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90ueditor%E5%AE%9E%E7%8E%B0%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%A2%9E%E5%BC%BA)
- [Vue集成百度的Ueditor 前端+后台](https://blog.csdn.net/qq_38571601/article/details/126040490)

### 本地联调
- E:\iEnviroment\development\projects\ideaProjects\VueDemo\UEditor
    - http://127.0.0.1:5501/
    - http://127.0.0.1:5505/




