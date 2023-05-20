# MySQL
[[TOC]]
## 在线资料
### 官网
- [MySQL](https://www.mysql.com/)
    - 账户：公用oracle账户
### 手册
- [MySQL :: MySQL Documentation](https://dev.mysql.com/doc/)
    - https://dev.mysql.com/doc/refman/5.7/en/
        - https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html
            - https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_str-to-date
        - [MySQL :: MySQL 5.7 Reference Manual :: 11 Data Types](https://dev.mysql.com/doc/refman/5.7/en/data-types.html)
		- [MySQL :: MySQL 5.7 Reference Manual :: 13.1.21 CREATE VIEW Statement](https://dev.mysql.com/doc/refman/5.7/en/create-view.html)
		- [MySQL :: MySQL 5.7 Reference Manual :: 13.2.9 SELECT Statement](https://dev.mysql.com/doc/refman/5.7/en/select.html)
    - [MySQL 5.1 中文参考手册 - 目录](http://www.mysqlab.net/docs/view/refman-5.1-zh/chapter/index.html)
    - [MySQL 中文文档 | MySQL 中文网](https://www.mysqlzh.com/)

#### select statement
- [MySQL 通配符学习小结](https://www.cnblogs.com/hrhguanli/p/3826218.html)
- [MySQL :: MySQL 5.7 Reference Manual :: 12.8.2 Regular Expressions](https://dev.mysql.com/doc/refman/5.7/en/regexp.html)

```
select id, word, ipa_phonetic_symbol, pronunciation, audio, meaning, update_time, create_time from dict_word_info WHERE word like concat('%', 'a_', '%')
select id, word, ipa_phonetic_symbol, pronunciation, audio, meaning, update_time, create_time from dict_word_info WHERE word rlike '^[abc]+$'
select id, word, ipa_phonetic_symbol, pronunciation, audio, meaning, update_time, create_time from dict_word_info WHERE word regexp '^[abc]+$' 
```
#### 表
##### 添加字段
```
ALTER TABLE `ry-vue`.dict_word_info ADD meaning varchar(1024) NULL COMMENT '含义';
ALTER TABLE `ry-vue`.dict_word_info CHANGE meaning meaning varchar(1024) NULL COMMENT '含义' AFTER audio;
```
#### 视图
```
create [or replace] view view_outdict_query_info as
select
	dwi.word query_word,
	dwi.word,
	dwi.ipa_phonetic_symbol,
	dwi.pronunciation
from
	dict_word_info dwi
union all
select
	oi.query_word,
	dwi.word,
	dwi.ipa_phonetic_symbol,
	dwi.pronunciation
from
	outdict_info oi
left join dict_word_info dwi on
	oi.word = dwi.word
where
	oi.dict_type = '1'
```
##### 问题
1. SQL 错误 [1064] [42000]: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'union all
```
create view view_outdict_query_info as( select  dwi.word query_word,  dwi.word,  dwi.pronunciation from  dict_word_info dwi union all select  oi.query_word,  dwi.word,  dwi.pronunciation from  outdict_info oi left join dict_word_info dwi on  oi.word = dwi.word where  oi.dict_type = '1')
```
#### 函数

- [MySQL :: MySQL 5.7 Reference Manual :: 12.7 Date and Time Functions](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html)

select current_timestamp(), now(), curdate();
```
"current_timestamp()","now()","curdate()"
"2021-11-16 11:23:39","2021-11-16 11:23:39","2021-11-16"
```
- [MySQL :: MySQL 5.7 Reference Manual :: 12.8 String Functions and Operators](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html)
	- [function_find-in-set](https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_find-in-set)
##### DATE_ADD
- https://www.w3school.com.cn/sql/func_date_add.asp

##### DATE_FORMAT
- https://www.w3school.com.cn/sql/func_date_format.asp
##### CURDATE
- https://www.w3school.com.cn/sql/func_curdate.asp


## 常用指令
### mysqldump
- [MySQL5.7 --- mysqldump 备份与恢复](https://blog.csdn.net/mashuai720/article/details/83347029)

- 软件开发/database/工具/DBeaver
#### 整库备份还原


```
[root@etc ~]# mysqldump -help
Usage: mysqldump [OPTIONS] database [tables]
OR     mysqldump [OPTIONS] --databases [OPTIONS] DB1 [DB2 DB3...]
OR     mysqldump [OPTIONS] --all-databases [OPTIONS]
For more options, use mysqldump --help

# 调用mysqldump带有--all-databases选项备份所有的数据库
# mysqldump -uroot -pClgg7890 --all-databases > Shaanxi_NetworkFreight_20220310.sql
# 调用mysqldump带有- -databases选项备份指定的数据库
# mysqldump -uroot -pClgg7890 --databases gateway yy_framework yy_matchup yy_tms > Shaanxi_NetworkFreight_20220310_used.sql
[root@localhost ~]# mysqldump -uroot -pClgg7890 --databases clgg_base > clgg_base20210929.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.

[root@etc ~]# mysql -h127.0.0.1 -uroot -p123456 -p123456 --default-character-set=utf8
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.29 MySQL Community Server (GPL)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| clgg_base          |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

mysql> drop database clgg_base;
Query OK, 120 rows affected (1.92 sec)

mysql> quit;
Bye

[root@etc ~]# mysql -h127.0.0.1 -uroot -p123456 < clgg_base20210929.sql 
mysql: [Warning] Using a password on the command line interface can be insecure.
```


##### linux定时备份
```
[root@clggdb ~]# crontab -l
0 0 * * * sh /home/db/db_back_up.sh
* * * * * /bin/bash /home/dbspc_redhat_centos_x64/spc1/startspc.sh
20 11 * * * sh /home/db/clean_redundancy_db_back_up.sh

[root@clggdb ~]# cat /home/db/db_back_up.sh
#!/bin/bash
#在使用之前，请提前创建以下各个目录
#获取当前时间
date_now=$(date "+%Y%m%d-%H%M%S")
backUpFolder=/home/db/backup
db_name="clgg_base"
#定义备份文件名
fileName="${db_name}_${date_now}.sql"
#定义备份文件目录
backUpFileName="${backUpFolder}/${fileName}"
echo "starting backup mysql ${db_name} at ${date_now}."
mysqldump  --lock-all-tables --flush-logs ${db_name} > ${backUpFileName}
echo "backup process finished!"

# 清除指定日期和天数的sql文件
[root@clggdb ~]# cat /home/db/clean_redundancy_db_back_up.sh
find /home/db/backup -mtime +50 -name '*.sql' -exec rm -rf {} \;
```

#### 非整库
1. 备份
```
[root@localhost database_bak]# mysqldump -h 127.0.0.1 -uroot -pClgg7890 -R -i --set-gtid-purged=OFF clgg_base1 > /root/database_bak/clgg_base1_20211022-1.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.

存储过程缺失-R
[root@localhost database_bak]# mysqldump -h 127.0.0.1 -uroot -pClgg7890 -R -i --no-data clgg_base1 > /root/database_bak/clgg_base1_20211022-2.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.
```

- -R:指定备份存储过程
- -i:备份注释
- --no-data:如果不需要数据
- -h:指定服务器
- -u:用户名
- -p:密码


2. 恢复数据库
```
mysql> drop database clgg_base;
Query OK, 120 rows affected (3.06 sec)

# utf8 utf8_general_ci
mysql> CREATE DATABASE clgg_base DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.01 sec)

mysql> CREATE DATABASE IF NOT EXISTS clgg_base DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected, 1 warning (0.00 sec)

mysql> use clgg_base;

mysql> source /root/clgg_base_20211015-000001.sql

```

## 日常

### 日常问题
#### timestamp与datatime
参考
- [MySQL 中 datetime 和 timestamp 的区别与选择](https://cloud.tencent.com/developer/article/1541699)
- [MYSQL-datatime和timestamp的区别](https://blog.csdn.net/u014696474/article/details/70568733)
##### 选择
1. 如果在时间上要超过Linux时间的，或者服务器时区不一样的就建议选择 datetime。
2. 如果是想要使用自动插入时间或者自动更新时间功能的，可以使用timestamp。
3. 如果只是想表示年、日期、时间的还可以使用 year、 date、 time，它们分别占据 1、3、3 字节，而datetime就是它们的集合。

##### 区别
1. 对于timestamp来说，如果储存时的时区和检索时的时区不一样，那么拿出来的数据也不一样。对于datetime来说，存什么拿到的就是什么。
2. 如果存进去的是NULL，timestamp会自动储存当前时间，而datetime会储存NULL。

##### 总结
1. TIMESTAMP和DATETIME除了存储范围和存储方式不一样，没有太大区别。当然，对于跨时区的业务，TIMESTAMP更为合适。
2. timestamp有自动初始化和更新，当你update某条记录的时候，该列值会自动更新，这是和datatime最大的区别。

#### MySQL不区分大小写设置
> 修改配置后需要重启服务，如果之前的数据库删除不了，将配置调回去再删。
```
[root@CentOS-7 imysql]# docker exec -it imysql /bin/bash

[mysqld]
...

lower_case_table_names=1

```
- sql
```SQL

show variables like "%case%";
lower_case_file_system	OFF
lower_case_table_names	1
```

- 参考
	- [MySQL不区分大小写设置](https://blog.csdn.net/wangkun_j/article/details/117651603)

#### mysql字符集 utf8 和utf8mb4 的区别
- [mysql字符集 utf8 和utf8mb4 的区别](https://blog.csdn.net/qq_37054881/article/details/90023611)

#### SQL 错误 [1055] [42000]:
##### 问题描述
```
org.jkiss.dbeaver.model.sql.DBSQLException: SQL 错误 [1055] [42000]: Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 's.tenant_id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```
- 相关sql
```
SELECT
	count(0)
FROM
	(
	SELECT
		s.id,
		s.tenant_id,
		s.create_time,
		s.modify_time,
		s.load_place,
		s.load_place_code,
		s.load_place_address,
		s.unload_place,
		s.unload_place_code,
		s.unload_place_address,
		s.sender,
		s.sender_phone,
		s.recipient,
		s.recipient_phone,
		s.goods_name,
		s.goods_type,
		s.use_type,
		s.vehicle_type,
		s.vehicle_length,
		s.goods_weight,
		s.goods_body,
		s.load_time,
		s.load_way,
		s.goods_freight,
		s.price_negotiation,
		s.remarks,
		s.status,
		s.is_assign,
		s.reasons_expiration,
		s.valuation_way,
		s.code,
		s.transport_tenant_id transporttenantid,
		s.is_cancel is_cancel,
		s.cancel_reason cancel_reason,
		s.send_area_id,
		s.arrive_area_id,
		u.link_man,
		u.tenant_head_portrait,
		u.transaction_count,
		u.tran_transaction_count,
		p.cash_payment,
		p.unpaid,
		p.oil_card,
		p.arrrival_payment,
		p.oil_card_deposit,
		p.other_amount,
		p.back_bill_deposit,
		c.company_name company_name,
		c.address company_address,
		tr.tenant_id tran_tenant_id,
		tr.link_man tran_link_man,
		tr.tenant_head_portrait tran_tenant_head_portrait,
		tr.link_phone,
		tr.driver,
		tr.car_number,
		tr.code tran_code,
		tr.tran_transaction_count v_tran_transaction_count,
		tr.send_goods_count tran_send_goods_count,
		tr.company_name tran_company_name,
		tr.address tran_company_address,
		tr.load_time tran_load_time
	FROM
		v_source_goods_capacity s
	LEFT JOIN company_info c ON
		c.tenant_id = s.tenant_id
	LEFT JOIN my_user_info u ON
		u.id = s.tenant_id
	LEFT JOIN biz_payment_way p ON
		p.source_goods_id = s.id
	LEFT JOIN v_transport_info tr ON
		tr.is_deleted = 0
		AND tr.source_goods_id = s.id
	WHERE
		s.transport_tenant_id = 170
	GROUP BY
		s.id) table_count;
```
##### 问题处理
```sql
select version();
SELECT @@GLOBAL.sql_mode;
select @@SESSION.sql_mode;
set sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

```
- shell
```shell
[root@etc ~]# vim /etc/my.cnf 
[mysqld]
explicit_defaults_for_timestamp=true
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
port=3306
socket=/usr/local/mysql/data/mysql.sock
character-set-server=utf8
log-error=/usr/local/mysql/data/mysqld.log
pid-file=/usr/local/mysql/data/mysqld.pid

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

[root@etc ~]# service mysqld restart
Shutting down MySQL.... SUCCESS! 
Starting MySQL.. SUCCESS! 
```
- [MySql出现错误：ERROR 1055 (42000) 和 MYSQL的WARNINGS 和 ERRORS查询细节](https://blog.csdn.net/helloxiaozhe/article/details/78570016)
- [mysql的sql_mode设置](https://www.cnblogs.com/kiko2014551511/p/11527480.html)
- [MySQL如何在linux中重新启动](https://www.php.cn/mysql-tutorials-480982.html)

### 日常操作


#### 查询数据库中各表的数据量
```
select t.TABLE_NAME, t.TABLE_ROWS from information_schema.TABLES t where t.TABLE_SCHEMA ='ruoyi-vue-activiti7' and t.TABLE_NAME in (
'act_evt_log',
'act_ru_variable'
) order by t.TABLE_ROWS desc;
```
#### 查询数据库中各表的主键、自增标识
```
-- 所有表主键 mysql查询数据库中各表的主键、自增标识
SELECT
  t.TABLE_NAME,
  c.COLUMN_NAME,
  ts.AUTO_INCREMENT
FROM
  INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS t,
  information_schema.TABLES AS ts,
  information_schema.KEY_COLUMN_USAGE AS c
WHERE
  t.TABLE_NAME = ts.TABLE_NAME
  AND ts.TABLE_NAME  = c.TABLE_NAME
  AND t.TABLE_SCHEMA = 'truck_sell_test'
  AND t.CONSTRAINT_TYPE = 'PRIMARY KEY'
  ORDER BY ts.`AUTO_INCREMENT` DESC;
```

#### 版本查看
```
select version();
```

#### NULL判断
```
-- SQL 错误 [1052] [23000]: Column 'phone' in field list is ambiguous
select phone from bak_sys_client_20220107 a LEFT JOIN (select phone from sys_client) b on a.phone=b.phone;

select a.phone,b.phone phone2 from bak_sys_client_20220107 a LEFT JOIN (select distinct phone from sys_client) b on a.phone=b.phone where b.phone is null;
```

#### 分组获取每组里边的第一条数据
```
select
	iecur1.*
from
	icbc_etc_card_update_record iecur1,
	(
	select
		service_order_no,
		unit_type,
		MAX(create_time) create_time
	from
		icbc_etc_card_update_record
	group by
		service_order_no,
		unit_type ) as iecur2
where
	iecur1.service_order_no = iecur2.service_order_no
	and iecur1.unit_type = iecur2.unit_type
	and iecur1.create_time = iecur2.create_time
order by
	iecur1.service_order_no,
	iecur1.unit_type,
	iecur1.create_time desc
```


#### 修改root密码
- [MySQL修改root用户密码](https://blog.csdn.net/qq_40757240/article/details/118068317)

- [mysql修改root密码(包括远程登录密码)](https://blog.csdn.net/u011311291/article/details/87923540)
##### 1. 修改本地访问密码 mysqladmin 
```
[root@SystemFramework ~]# mysqladmin -u root -h 127.0.0.1 -p password "123456" --> 新密码
Enter password: 旧密码
mysqladmin: [Warning] Using a password on the command line interface can be insecure.
Warning: Since password will be sent to server in plain text, use ssl connection to ensure password safety.
```
- 语法参数说明如下：
    - usermame 指需要修改密码的用户名称，在这里指定为 root 用户；
    - hostname 指需要修改密码的用户主机名，该参数可以不写，默认是 localhost；
    - password 为关键字，而不是指旧密码；
    - newpwd 为新设置的密码，必须用双引号括起来。如果使用单引号会引发错误，可能会造成修改后的密码不是你想要的。

##### 2. 修改远程访问密码
```
[root@SystemFramework ~]# mysql -uroot -h127.0.0.1 -uroot -p123456 
mysql> ALTER USER 'root'@'%' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.01 sec)
```

### 数据表
#### 备份
```
SELECT * FROM channel_month_rebate;
create table tmp_channel_month_rebate as SELECT * FROM channel_month_rebate;
SELECT * FROM tmp_channel_month_rebate;
DROP table tmp_channel_month_rebate;
```
#### 从查询结果中更新数据
- [mysql update select 从查询结果中更新数据](https://blog.csdn.net/qq_39840681/article/details/79401795)
- update select 语句(注意:必须使用inner join) 语法
```
UPDATE a
INNER JOIN ( SELECT yy FROM b ) c ON a.id = c.id 
SET a.xx = c.yy
```
- demo
```
UPDATE bak_sso_20220107_sys_client_update a
	INNER JOIN ( 
		select sc.user_name, sc.user_code, sc1.user_code user_code_org from bak_sso_20220107_sys_client_update sc left join bak_sys_client_20220107 sc1 on sc.user_name =sc1.user_name where sc.user_code!=sc1.user_code 
	) b ON a.user_name = b.user_name 
SET a.user_code = b.user_code_org;
-- SET a.user_code = 999999;

# 更新后验证总是没更新 原因
-- 同一个user_name在bak_sys_client_20220107有两条数据，bak_sso_20220107_sys_client_update一条数据
```
# 教程
- [MySQL常用操作指令大全](https://songyu.blog.csdn.net/article/details/109108573)
- http://c.biancheng.net/view/2413.html

## 建库脚本
```
-- 查看MYSQL数据库服务器和数据库字符集 
show variables like '%character%';
show variables like 'collation%';

-- 建库脚本
CREATE DATABASE test DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```
- 样例脚本
```
DROP DATABASE IF EXISTS `ry-vue`;

CREATE DATABASE `ry-vue` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE `ry-vue`;
```


## 存储过程
- [面向MySQL存储过程编程（详细）](https://juejin.cn/post/6844904185725468685)

- [【黑马程序员】两小时带你玩转MySQL数据库存储过程【配套源码+笔记】](https://www.bilibili.com/video/BV1q64y1T7Uh)

- https://dev.mysql.com/doc/refman/5.6/en/preface.html
- https://dev.mysql.com/doc/refman/5.6/en/server-error-reference.html
	- https://dev.mysql.com/doc/mysql-errors/5.7/en/server-error-reference.html
- https://dev.mysql.com/doc/refman/5.7/en/sql-prepared-statements.html
- https://dev.mysql.com/doc/refman/5.7/en/sql-compound-statements.html


### 一、存储过程
#### 1.1 什么是存储过程
#### 1.2 数据库存储过程程序
#### 1.3 为什么要使用存储程序
### 二、存储过程的使用步骤
#### 2.1 存储过程的开发思想
#### 2.2 存储过程的优缺点
#### 2.3 MySQL存储过程的官方文档
#### 2.3 存储过程的使用语法
### 三、存储过程的变量和赋值
#### 3.1 局部变量
#### 3.2 用户变量
#### 3.3 会话变量
#### 3.4 全局变量
#### 3.5 入参出参
### 四、存储过程中的流程控制
#### 4.1 if 条件判断（推荐）
#### 4.2 case条件判断
#### 4.3 loop循环
#### 4.4 repeat循环
#### 4.5 while循环
#### 4.6 流程控制语句（继续、结束）
### 五、游标与handler
#### 5.1 游标
#### 5.2 handler句柄


## MySQL数据库高级
- [MySQL 高级开发 ProcessOn Mind](https://www.processon.com/mindmap/6164d01b1e085340f84175ca)

- [尚硅谷MySQL数据库高级，mysql优化，数据库优化](https://www.bilibili.com/video/BV1KW411u7vy?p=1)

- [MySQL优化学习笔记](https://blog.csdn.net/u011863024/article/details/115470147)

### 其他参考

- https://naotu.baidu.com/file/9fd1b2249eb371587b71bf4b7be39757
- [mysql高级应用.mmap](http://3brother.cn/mysql.html)
- [尚硅谷MySQL高级学习笔记](https://blog.csdn.net/qq_21579045/article/details/99702766)
- [MySQL高级建表语句](https://blog.csdn.net/weixin_46002478/article/details/109158249)
- [72_MySQL 高级开发 | ProcessOn免费在线作图,在线流程图,在线思维导图](https://www.processon.com/view/link/5eafbe626376897466a3403f)

- https://github.com/a29hbGE/mysql.git
- [MySQL 数据库使用](https://juejin.cn/column/6962445414091980814)
- http://note.youdao.com/noteshare?id=9621ae473061a1cb975bc11580311f8c




## MySQL安装配置
### mysql-5.7.39 RPM包安装
- [Linux安装配置MySQL详细步骤](http://c.biancheng.net/view/7616.html)
#### 1. 下载地址
- [MySQL :: Download MySQL Community Server (Archived Versions)](https://downloads.mysql.com/archives/community/)
	1. Product Version: 5.7.39
	2. Operating System: Red Hat Enterprise Linux / Oracle Linux
	3. OS Version: All
		- https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.39-1.el7.x86_64.rpm-bundle.tar
		
- CentOS 7 应该选用 el7 安装包。如果安装包对应的系统版本不正确，安装时会出现有关 glibc 的依赖错误。CentOS 6.5，选用 el6 的安装包。

#### 2. 检测本地包
```
[root@2m264bunohhn7o ~]# rpm -qa | grep mariadb
mariadb-libs-5.5.65-1.el7.x86_64
[root@2m264bunohhn7o ~]# yum -y remove mariadb-libs-5.5.65-1.el7.x86_64
```

#### 3. 安装
##### 3.1 下载解压安装包
```
# 创建用于存放第三方软件包的目录
[root@2m264bunohhn7o ~]# mkdir -p /opt/module/mysql
[root@2m264bunohhn7o ~]# cd /opt/module/mysql/

# 下载安装包 步骤 1)：进入官方下载页面选择要下载的包。
[root@2m264bunohhn7o mysql]# wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.39-1.el7.x86_64.rpm-bundle.tar
[root@2m264bunohhn7o mysql]# tar -xvf mysql-5.7.39-1.el7.x86_64.rpm-bundle.tar 
[root@2m264bunohhn7o mysql]# ll
total 1086272
-rw-r--r-- 1 root root  556165120 Jun 13  2022 mysql-5.7.39-1.el7.x86_64.rpm-bundle.tar
-rw-r--r-- 1 7155 31415  29107248 Jun 13  2022 mysql-community-client-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415    318320 Jun 13  2022 mysql-community-common-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415   4383060 Jun 13  2022 mysql-community-devel-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415  48149356 Jun 13  2022 mysql-community-embedded-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415  23316500 Jun 13  2022 mysql-community-embedded-compat-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415 133181836 Jun 13  2022 mysql-community-embedded-devel-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415   2717964 Jun 13  2022 mysql-community-libs-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415   1264480 Jun 13  2022 mysql-community-libs-compat-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415 186717812 Jun 13  2022 mysql-community-server-5.7.39-1.el7.x86_64.rpm
-rw-r--r-- 1 7155 31415 126996412 Jun 13  2022 mysql-community-test-5.7.39-1.el7.x86_64.rpm

# 步骤 2)：下载完成后，切换到 root 用户。按照依赖关系依次安装 rpm 包，依赖关系依次为 common→libs→client→server。使用命令rpm -ivh {-file-name}进行安装操作。
# 安装common （卸载rpm -e mysql-community-common-5.7.39-1.el7.x86_64 检测）
[root@2m264bunohhn7o mysql]# rpm -ivh mysql-community-common-5.7.39-1.el7.x86_64.rpm
[root@2m264bunohhn7o mysql]# rpm -ivh mysql-community-libs-5.7.39-1.el7.x86_64.rpm
[root@2m264bunohhn7o mysql]# rpm -ivh mysql-community-client-5.7.39-1.el7.x86_64.rpm
[root@2m264bunohhn7o mysql]# rpm -ivh mysql-community-server-5.7.39-1.el7.x86_64.rpm
# 检测
[root@2m264bunohhn7o mysql]# rpm -qa | grep mysql
mysql-community-common-5.7.39-1.el7.x86_64
mysql-community-client-5.7.39-1.el7.x86_64
mysql-community-server-5.7.39-1.el7.x86_64
mysql-community-libs-5.7.39-1.el7.x86_64
```
#### 4. 启动
```
[root@2m264bunohhn7o mysql]# which mysql
/bin/mysql
[root@2m264bunohhn7o mysql]# whereis mysql
mysql: /usr/bin/mysql /usr/lib64/mysql /usr/share/mysql /usr/share/man/man1/mysql.1.gz
# 步骤 3)：通过以下命令可以启动 MySQL 数据库，但是必须使用 root 权限。
[root@2m264bunohhn7o mysql]# service mysqld start
Redirecting to /bin/systemctl start mysqld.service
[root@2m264bunohhn7o mysql]# mysql --version
mysql  Ver 14.14 Distrib 5.7.39, for Linux (x86_64) using  EditLine wrapper
# 步骤 4)：服务启动后，查找 root 初始随机密码（如果没有初始密码，直接输入用户名 root 登录即可）
[root@2m264bunohhn7o mysql]# cat /var/log/mysqld.log | grep password
2023-04-20T02:44:53.745467Z 1 [Note] A temporary password is generated for root@localhost: cuQA>7Iarx2X
# 步骤 5)：安装成功后，使用以下命令登录 MySQL。
[root@2m264bunohhn7o mysql]# mysql -uroot -p'cuQA>7Iarx2X'
# 步骤 6)：可使用以下命令修改密码
mysql> set password='dyyy2023.xxjsb@DYTX';
Query OK, 0 rows affected (0.00 sec);
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_check_user_name    | OFF    |
| validate_password_dictionary_file    |        |
| validate_password_length             | 8      |
| validate_password_mixed_case_count   | 1      |
| validate_password_number_count       | 1      |
| validate_password_policy             | MEDIUM |
| validate_password_special_char_count | 1      |
+--------------------------------------+--------+
7 rows in set (0.00 sec)
# 步骤 7)：配置 MySQL 服务，将 /usr/share/mysql/ 或 /usr/share/ 文件夹下的某一个后缀名为 cnf 的文件拷贝到 /etc/ 文件夹下，并且改名为 my.cnf。使用 vi 编辑器来编辑 my.cnf
[root@2m264bunohhn7o mysql]# find / -name my.cnf
/etc/my.cnf
[root@2m264bunohhn7o mysql]# cat /etc/my.cnf
# 编辑并保存 my.cnf 文件后，必须重新启动 MySQL 服务，这样 my.cnf 中的配置才会起作用
```
- 192.168.150.58:3306 
	- root dyyy2023.xxjsb@DYTX

#### 5. 开启远程访问权限
- [MySQL 异常: "Host 'xxx' is not allowed to connect to this MySQL server"](https://blog.csdn.net/mazaiting/article/details/106661158)
- [mysql撤销授权不生效_MySql授权和撤销权限操作](https://blog.csdn.net/weixin_31832223/article/details/113971079)

##### 第一种（改表法）
```
[root@2m264bunohhn7o mysql]# mysql -uroot -p'dyyy2023.xxjsb@DYTX'
# 使用数据库mysql
mysql> use mysql;
# 查看主机和用户
mysql> select host,user from user;
+-----------+---------------+
| host      | user          |
+-----------+---------------+
| localhost | mysql.session |
| localhost | mysql.sys     |
| localhost | root          |
+-----------+---------------+
3 rows in set (0.00 sec)
mysql> update user set host = '%' where user = 'root';
mysql> select host,user from user;
+-----------+---------------+
| host      | user          |
+-----------+---------------+
| %         | root          |
| localhost | mysql.session |
| localhost | mysql.sys     |
+-----------+---------------+
3 rows in set (0.00 sec)
```
##### 第二种（授权法）
1. 你想root使用mypassword从任何主机连接到mysql服务器的话
```
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'dyyy2023.xxjsb@DYTX' WITH GRANT OPTION;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> select host,user from user;
+-----------+---------------+
| host      | user          |
+-----------+---------------+
| %         | root          |
| localhost | mysql.session |
| localhost | mysql.sys     |
| localhost | root          |
+-----------+---------------+
4 rows in set (0.00 sec)

# 撤销授权（无效）
mysql> revoke ALL PRIVILEGES ON *.* from 'root'@'%';
Query OK, 0 rows affected (0.00 sec)
# 删除mysql的user表中的数据，将没权限访问:(彻底的收权方法:)
mysql> delete from user where user='root' and host='%';
Query OK, 1 row affected (0.00 sec)

mysql> select host,user from user;
+-----------+---------------+
| host      | user          |
+-----------+---------------+
| localhost | mysql.session |
| localhost | mysql.sys     |
| localhost | root          |
+-----------+---------------+
3 rows in set (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```
2. 允许用户root从ip为192.168.150.20的主机连接到mysql服务器，并使用'dyyy2023.xxjsb@DYTX'作为密码
```
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.150.20' IDENTIFIED BY 'dyyy2023.xxjsb@DYTX' WITH GRANT OPTION;
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.150.57' IDENTIFIED BY 'dyyy2023.xxjsb@DYTX' WITH GRANT OPTION;
mysql> select host,user from user;
+----------------+---------------+
| host           | user          |
+----------------+---------------+
| 192.168.150.20 | root          |
| 192.168.150.57 | root          |
```

#### 6.开机自启
```
[root@2m264bunohhn7o mysql]# vi /etc/rc.local
# 添加mysqld开机自启
service mysqld start
```
#### 7.配置调整
```
[root@2m264bunohhn7o ~]# find / -name my.cnf
/etc/my.cnf
[root@2m264bunohhn7o ~]# vi /etc/my.cnf
# 移除默认的ONLY_FULL_GROUP_BY
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
# 大小写不敏感
lower_case_table_names=1
[root@2m264bunohhn7o ~]# service mysqld restart
Redirecting to /bin/systemctl restart mysqld.service
```
- 验证
```
[root@2m264bunohhn7o ~]# mysql -uroot -p'dyyy2023.xxjsb@DYTX'
mysql> show global variables like '%lower_case%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   |
| lower_case_table_names | 1     |
+------------------------+-------+
2 rows in set (0.01 sec)

# 调整前
mysql> select @@global.sql_mode;
+-------------------------------------------------------------------------------------------------------------------------------------------+
| @@global.sql_mode                                                                                                                         |
+-------------------------------------------------------------------------------------------------------------------------------------------+
| ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+-------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
# 调整后
mysql> select @@global.sql_mode;
+------------------------------------------------------------------------------------------------------------------------+
| @@global.sql_mode                                                                                                      |
+------------------------------------------------------------------------------------------------------------------------+
| STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

#### 其他
##### Linux平台MySQL的安装目录

文件夹 | 文件夹内容
---|---
/usr/bin | 客户端和脚本（mysqladmin、mysqldump 等命令）
/usr/sbin | mysqld 服务器
/var/lib/mysql | 日志文件、socket 文件和数据库
/usr/share/info | 信息格式的手册
/usr/share/man | UNIX 帮助页
/usr/include/mysql | 头文件
/usr/lib/mysql | 库
/usr/share/mysql | 错误消息、字符集、安装文件和配置文件等
/etc/rc.d/init.d/ | 启动脚本文件的 mysql 目录，可以用来启动和停止 MySQL 服务 

##### 命令登录 MySQL
- Commands end with; or\g：说明 mysql 命令行下的命令是以分号（;）或“\g”来结束的，遇到这个结束符就开始执行命令。
- Your MySQL connection id is 1：id 表示 MySQL 数据库的连接次数，这里为 1，说明是首次登录。
- Server version: 5.7.39 Server: Server version 后面说明数据库的版本，这个版本为 5.7.39； version: 5. 7.29-log MySQL Community Server（GPL）：Server version 后面说明数据库的版本，这个版本为 5.7.29。Community 表示该版本是社区版。
- Type 'help;' or '\h' for help：表示输入”help;“或者”\h“可以看到帮助信息。
- Type '\c' to clear the current input statement：表示遇到”\c“就清除前面的命令。

```
[root@2m264bunohhn7o mysql]# mysql -uroot -p'cuQA>7Iarx2X'
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Server version: 5.7.39

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

```
##### 异常处理
- [安装mysql 5.7.19 rpm包报错：/usr/bin/perl is needed by mysql-community-server-5.7.19-1.el7.x86_64](https://blog.csdn.net/u010886217/article/details/89416159)
```
[root@2m264bunohhn7o mysql]# rpm -ivh mysql-community-server-5.7.39-1.el7.x86_64.rpm 
warning: mysql-community-server-5.7.39-1.el7.x86_64.rpm: Header V4 RSA/SHA256 Signature, key ID 3a79bd29: NOKEY
error: Failed dependencies:
	/usr/bin/perl is needed by mysql-community-server-5.7.39-1.el7.x86_64
	perl(Getopt::Long) is needed by mysql-community-server-5.7.39-1.el7.x86_64
	perl(strict) is needed by mysql-community-server-5.7.39-1.el7.x86_64
# 缺少nperl.x86_64依赖，使用yum安装即可。
[root@2m264bunohhn7o mysql]# yum search perl | grep perl.x86_64
perl.x86_64 : Practical Extraction and Report Language
[root@2m264bunohhn7o mysql]# yum -y install perl.x86_64
```

### mysql-5.7.28 RPM包安装
#### 1. 官网下载地址
- https://dev.mysql.com/downloads/mysql/5.7.html#downloads
	- https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
	- [Archives](https://downloads.mysql.com/archives/community/)
#### 2. 检测本地包
1.检测本地是否有mysql已存在的包
```
[root@bd-00-00 software]# rpm -qa | grep mysql
# 必须 载原有系统mysql的内部库
[root@bd-00-00 software]# yum remove mysql-libs 
```
2. 检测本地是否有mariadb已存在的包（可选）
```
[root@bd-00-00 software]# rpm -qa | grep mariadb
mariadb-libs-5.5.60-1.el7_5.x86_64
# rpm -e --nodeps mariadb-libs-5.5.60-1.el7_5.x86_64
[root@bd-00-00 software]# yum -y remove mariadb-libs-5.5.60-1.el7_5.x86_64
```
#### 3. 安装
##### 1. 上传安装包到指定目录
```
[root@bd-00-00 software]# ll
total 595272
-rw-r--r-- 1 root root 609556480 Nov  8 22:51 mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
```
##### 2. 解压安装包
```
[root@bd-00-00 software]# mkdir -p /opt/module/mysql
[root@bd-00-00 software]# tar -xvf mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar -C /opt/module/mysql
```
##### 3. 安装
1. 必须
```
[root@bd-00-00 software]# cd /opt/module/mysql/
[root@bd-00-00 mysql]# rpm -ivh mysql-community-common-5.7.28-1.el7.x86_64.rpm 
[root@bd-00-00 mysql]# rpm -ivh mysql-community-libs-5.7.28-1.el7.x86_64.rpm 
[root@bd-00-00 mysql]# rpm -ivh mysql-community-client-5.7.28-1.el7.x86_64.rpm 
[root@bd-00-00 mysql]# rpm -ivh mysql-community-server-5.7.28-1.el7.x86_64.rpm 
warning: mysql-community-server-5.7.28-1.el7.x86_64.rpm: Header V3 DSA/SHA1 Signature, key ID 5072e1f5: NOKEY
error: Failed dependencies:
        net-tools is needed by mysql-community-server-5.7.28-1.el7.x86_64
# 安装依赖
# # yum install -y perl
[root@bd-00-00 mysql]# yum -y install net-tools
```
2. 可选
```
[root@bd-00-00 mysql]# rpm -ivh mysql-community-libs-compat-5.7.28-1.el7.x86_64.rpm 
[root@bd-00-00 mysql]# rpm -ivh mysql-community-devel-5.7.28-1.el7.x86_64.rpm 
```
#### 4. 启动
```
[root@bd-00-00 ~]# whereis mysql
mysql: /usr/bin/mysql /usr/lib64/mysql /usr/include/mysql /usr/share/mysql /usr/share/man/man1/mysql.1.gz
[root@bd-00-00 ~]# which mysql
/usr/bin/mysql
```
##### 1 查看mysql服务是否启动
```
[root@bd-00-00 mysql]# service mysqld status
Redirecting to /bin/systemctl status mysqld.service
```
##### 2 启动mysql服务 
```
[root@bd-00-00 mysql]# service mysqld start
Redirecting to /bin/systemctl start mysqld.service
```
##### 3 查看默认生成的密码
```
[root@bd-00-00 mysql]# cat /var/log/mysqld.log | grep password
2019-11-09T10:51:45.963490Z 1 [Note] A temporary password is generated for root@localhost: w1>e5jiRwah,
```
##### 4 登录
```
[root@bd-00-00 mysql]# mysql -uroot -p'w1>e5jiRwah,'
```
##### 5 修改密码
```
mysql> alter user 'root'@'localhost' identified by'000000';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```
###### 1 修改密码规则

级别 | 描述
---|---
0 or LOW | 长度
1 or MEDIUM | 长度、大小写、数字、特殊字符
2 or STRONG | 长度、大小写、数字、特殊字符、词典

- 注 以下修改是临时修改
```
# 1.密码强度检查等级，0/LOW、1/MEDIUM、2/STRONG
mysql> set global validate_password_policy=0;
# 2.密码至少要包含的小写字母个数和大写字母个数
mysql> set global validate_password_mixed_case_count=0;
# 3.密码至少要包含的数字个数 
mysql> set global validate_password_number_count=3;
# 4. 密码至少要包含的特殊字符数
mysql> set global validate_password_special_char_count=0;
# 5.密码最小长度，参数默认为8
# 它有最小值的限制，最小值为：validate_password_number_count + 密码至少要包含的数字个数validate_password_special_char_count +特殊字符(2 * validate_password_mixed_case_count)至少要包含的小写字母个数和大写字母个数
mysql> set global validate_password_length=3;
```

###### 2 修改密码
```
mysql> alter user 'root'@'localhost' identified by'000000';

（跳过）GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '000000' WITH GRANT OPTION;
```

####### 1 查询当前user表内root的登录权限
```
mysql> select host,user from mysql.user; 
+-----------+---------------+
| host      | user          |
+-----------+---------------+
| localhost | mysql.session |
| localhost | mysql.sys     |
| localhost | root          |
+-----------+---------------+
3 rows in set (0.00 sec)
```
####### 2 修改host为所有%
```
mysql> update mysql.user set host='%' where user='root';
```
####### 3 刷新缓存
```
mysql> flush privileges;
```
#### 5. 远程访问
- 关闭防火墙

#### 6. 补充操作
```
mysql> help;
# 修改root本地密码
mysql> alter user 'root'@'localhost'identified by 'TosinJia_1';
# 远程访问
mysql> create user 'root'@'%' identified by 'TosinJia_1';
# 授权 所有库 所有权限
mysql> grant all on *.* to 'root'@'%';

#创建数据库
mysql> create database hive;
#创建用户
mysql> create user 'hiveowner'@'%' identified by 'TosinJia_1';
#给用户授权
mysql> grant all on hive.* TO 'hiveowner'@'%';
mysql> grant all on hive.* TO 'hiveowner'@'localhost' identified by 'TosinJia_1';
```