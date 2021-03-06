# 分布式日志

## 基本介绍

* 什么是分布式日志

在分布式应用中，日志被分散在储存不同的设备上。如果你管理数十上百台服务器，你还在使用依次登录每台机器的传统方法查阅日志。这样是不是感觉很繁琐和效率低下。所以我们使用集中化的日志管理，分布式日志就是对大规模日志数据进行采集、追踪、处理。

* 为什么要使用分布式日志

一般我们需要进行日志分析场景：直接在日志文件中`grep`、`awk`就可以获得自己想要的信息。但在规模较大的场景中，此方法效率低下，面临问题包括日志量太大如何归档、文本搜索太慢怎么办、如何多维度查询。需要集中化的日志管理，所有服务器上的日志收集汇总。常见解决思路是建立集中式日志收集系统，将所有节点上的日志统一收集，管理，访问。

* ELK 分布式日志

实际上`ELK`是三款软件的简称，分别是`Elasticsearch`、 `Logstash`、`Kibana`组成。

**Elasticsearch** 基于`java`，是个开源分布式搜索引擎，它的特点有：分布式，零配置，自动发现，索引自动分片，索引副本机制，`restful`风格接口，多数据源，自动搜索负载等。

**Kibana** 基于`nodejs`，也是一个开源和免费的工具，`Kibana`可以为`Logstash`和`ElasticSearch`提供的日志分析友好的Web 界面，可以汇总、分析和搜索重要数据日志。

**Logstash** 基于`java`，是一个开源的用于收集,分析和存储日志的工具。

下面是`ELK`的工作原理：
![elk](https://oscimg.oschina.net/oscnet/up-c62bd9299557f77a05d1a9c4ccd046f8fef.png)

## Elasticsearch

### 简介

ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是当前流行的企业级搜索引擎。设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。

我们建立一个网站或应用程序，并要添加搜索功能，但是想要完成搜索工作的创建是非常困难的。我们希望搜索解决方案要运行速度快，我们希望能有一个零配置和一个完全免费的搜索模式，我们希望能够简单地使用JSON通过HTTP来索引数据，我们希望我们的搜索服务器始终可用，我们希望能够从一台开始并扩展到数百台，我们要实时搜索，我们要简单的多租户，我们希望建立一个云的解决方案。因此我们利用Elasticsearch来解决所有这些问题及可能出现的更多其它问题。

ElasticSearch是Elastic Stack的核心，同时Elasticsearch 是一个分布式、RESTful风格的搜索和数据分析引擎，能够解决不断涌现出的各种用例。作为Elastic Stack的核心，它集中存储您的数据，帮助您发现意料之中以及意料之外的情况。

### 下载

到官网下载： ([https://www.elastic.co/cn/downloads/elasticsearch](https://www.elastic.co/cn/downloads/elasticsearch)) 
![Elasticsearch](https://oscimg.oschina.net/oscnet/up-d392963dafc68bc669d12ada72348dbf95b.png)

### 安装

* 解压到相应目录
```sh
tar -zxvf elasticsearch-7.10.2-linux-x86_64.tar.gz -C /usr/local
```

* 修改配置
```sh
cd /usr/local/elasticsearch-7.10.2/config/
vim elasticsearch.yml
```

```sh
node.name: node-1
path.data: /usr/local/elasticsearch-7.10.2/data
path.logs: /usr/local/elasticsearch-7.10.2/logs
network.host: 127.0.0.1
http.host: 0.0.0.0
http.port: 9200
discovery.seed_hosts: ["127.0.0.1"]
cluster.initial_master_nodes: ["node-1"]
```

* 创建`es`用户
因为`ElasticSearch`不支持`Root`用户直接操作，因此我们需要创建一个`es`用户
```sh
useradd es
chown -R es:es /usr/local/elasticsearch-7.10.2
```

### 启动

* 切换用户成es用户进行操作
```sh
su - es
/usr/local/elasticsearch-7.10.2/bin/elasticsearch
```

* 后台启动
```sh
/usr/local/elasticsearch-7.10.2/bin/elasticsearch -d 
```

在浏览器打开`9200`端口地址： ([http://120.78.129.95:9200/](http://120.78.129.95:9200/))，如果出现了下面的信息，就表示已经成功启动了
![Elasticsearch](https://oscimg.oschina.net/oscnet/up-38da6dfc0998a88b8b2f974f6192ae6420a.png)

## Logstash

### 简介

Logstash是一个开源的服务器端数据处理管道，能够同时从多个来源采集数据，转换数据，然后将数据发送到最喜欢的存储库中（我们的存储库当然是ElasticSearch）

### 下载

到官网下载： ([https://www.elastic.co/cn/downloads/logstash](https://www.elastic.co/cn/downloads/logstash))  
![Logstash](https://oscimg.oschina.net/oscnet/up-7780b6e1555bae2c2d2ce3e1dde44d9e783.png)

### 安装

* 解压到相应目录
```sh
tar -zxvf logstash-7.10.2.tar.gz -C /usr/local
```

* 新增配置文件
```sh
cd /usr/local/logstash-7.10.2/bin
vim logstash-elasticsearch.conf
```

```sh
input {
	stdin {}
}
output {
	elasticsearch {
		hosts => '120.78.129.95:9200'
	}
	stdout {
		codec => rubydebug
	}
}
```

### 启动

```sh
./logstash -f logstash-elasticsearch.conf
```

## Kibana

### 简介

Kibana 是一款开源的数据分析和可视化平台，它是 Elastic Stack 成员之一，设计用于和 Elasticsearch 协作。您可以使用 Kibana 对 Elasticsearch 索引中的数据进行搜索、查看、交互操作。您可以很方便的利用图表、表格及地图对数据进行多元化的分析和呈现。

### 下载

到官网下载： ([https://www.elastic.co/cn/downloads/kibana](https://www.elastic.co/cn/downloads/kibana))   
![Kibana](https://oscimg.oschina.net/oscnet/up-8a4821b16ba2f3bd96baf9a3b2bb7b55f0b.png)

### 安装

* 解压到相应目录
```sh
tar -zxvf kibana-7.10.2-linux-x86_64.tar.gz -C /usr/local
mv /usr/local/kibana-7.10.2-linux-x86_64 /usr/local/kibana-7.10.2
```

* 修改配置
```sh
cd /usr/local/kibana-7.10.2/config
vim kibana.yml
```

```sh
server.port: 5601 
server.host: "0.0.0.0" 
elasticsearch.hosts: ["http://120.78.129.95:9200"] 
kibana.index: ".kibana"
```

* 授权es用户
```
chown -R es:es /usr/local/kibana-7.10.2/
```

### 启动

* 切换用户成es用户进行操作
```sh
su - es
/usr/local/kibana-7.10.2/bin/kibana 
```

* 后台启动
```sh
/usr/local/kibana-7.10.2/bin/kibana &
```

在浏览器打开`5601`端口地址： ([http://120.78.129.95:5601/](http://120.78.129.95:5601/))，如果出现了下面的信息，就表示已经成功启动了
![kibana](https://oscimg.oschina.net/oscnet/up-f9bd125ad0b1d3887a2d3f94df9e9202d2c.png)

## 切换中文

在`config/kibana.yml`添加
```yml
i18n.locale: "zh-CN"
```

## 日志收集

对应服务器安装`logstash`，配置规则，例如新建`logstash-apache.conf`
```sh
input {
  file {
    path => "/home/ruoyi/logs/sys-*.log"
	start_position => beginning
	sincedb_path => "/dev/null"
	codec => multiline {
      pattern => "^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"
      negate => true
      auto_flush_interval => 3
      what => previous
    }
  }
}

filter {
  if [path] =~ "info" {
    mutate { replace => { type => "sys-info" } }
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
    date {
      match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
  } else if [path] =~ "error" {
    mutate { replace => { type => "sys-error" } }
  } else {
    mutate { replace => { type => "random_logs" } }
  }
}

output {
  elasticsearch {
    hosts => '120.78.129.95:9200'
  }
  stdout { codec => rubydebug }
}
```

* 启动logstash
```sh
./logstash -f logstash-apache.conf
```

* 通过`kibana`可视化检索各个服务日志数据
![kibana](https://oscimg.oschina.net/oscnet/up-928d6f45a566fc7e6191db840a4b27de551.png)
