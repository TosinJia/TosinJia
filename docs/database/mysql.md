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

mysql> CREATE DATABASE clgg_base DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
Query OK, 1 row affected (0.01 sec)

mysql> CREATE DATABASE IF NOT EXISTS clgg_base DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
Query OK, 1 row affected, 1 warning (0.00 sec)

mysql> use clgg_base;

mysql> source /root/clgg_base_20211015-000001.sql

```

## 日常

### 日常问题
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