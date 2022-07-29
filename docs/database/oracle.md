# Oracle
[[TOC]]

## 字符集
- [ORACLE数据库字符集](https://blog.csdn.net/qq_43455948/article/details/98969497)



### 1. 查询oracle server端的字符集
```
select userenv('language') from dual;
----数据库服务器字符集
select * from nls_database_parameters;
--查询dmp文件的字符集 查看第2第3个字节的内容，如0354，然后用以下SQL查出它对应的字符集
select nls_charset_name(to_number('0354','xxxx')) from dual;
```
### 2. 服务端字符集环境
```
select * from nls_instance_parameters;
```
### 3. 会话字符集环境
```
select * from nls_session_parameters;

   	PARAMETER	VALUE
1	NLS_LANGUAGE	AMERICAN
2	NLS_TERRITORY	AMERICA
3	NLS_CURRENCY	$
4	NLS_ISO_CURRENCY	AMERICA
5	NLS_NUMERIC_CHARACTERS	.,
6	NLS_CALENDAR	GREGORIAN
7	NLS_DATE_FORMAT	DD-MON-RR
8	NLS_DATE_LANGUAGE	AMERICAN
9	NLS_SORT	BINARY
10	NLS_TIME_FORMAT	HH.MI.SSXFF AM
11	NLS_TIMESTAMP_FORMAT	DD-MON-RR HH.MI.SSXFF AM
12	NLS_TIME_TZ_FORMAT	HH.MI.SSXFF AM TZR
13	NLS_TIMESTAMP_TZ_FORMAT	DD-MON-RR HH.MI.SSXFF AM TZR
14	NLS_DUAL_CURRENCY	$
15	NLS_COMP	BINARY
16	NLS_LENGTH_SEMANTICS	BYTE
17	NLS_NCHAR_CONV_EXCP	FALSE
```

```
insert into sys_dept values(100,  0,   '0',          '智能发运科技',   0, '智能发运', '15888888888', 'ry@qq.com', '0', '0', 'admin', TO_DATE('2018-03-16 11-33-00', 'YYYY-MM-DD HH24:MI:SS'), 'ry', TO_DATE('2018-03-16 11-33-00', 'YYYY-MM-DD HH24:MI:SS'));
ORA-12899: value too large for column "TXJIS"."SYS_DEPT"."DEPT_NAME" (actual: 36, maximum: 30)
```
#### 配置环境变量 NLS_LANG
- SIMPLIFIED CHINESE_CHINA.ZHS16GBK
```
   	PARAMETER	VALUE
1	NLS_LANGUAGE	SIMPLIFIED CHINESE
2	NLS_TERRITORY	CHINA
3	NLS_CURRENCY	￥
4	NLS_ISO_CURRENCY	CHINA
5	NLS_NUMERIC_CHARACTERS	.,
6	NLS_CALENDAR	GREGORIAN
7	NLS_DATE_FORMAT	DD-MON-RR
8	NLS_DATE_LANGUAGE	SIMPLIFIED CHINESE
9	NLS_SORT	BINARY
10	NLS_TIME_FORMAT	HH.MI.SSXFF AM
11	NLS_TIMESTAMP_FORMAT	DD-MON-RR HH.MI.SSXFF AM
12	NLS_TIME_TZ_FORMAT	HH.MI.SSXFF AM TZR
13	NLS_TIMESTAMP_TZ_FORMAT	DD-MON-RR HH.MI.SSXFF AM TZR
14	NLS_DUAL_CURRENCY	￥
15	NLS_COMP	BINARY
16	NLS_LENGTH_SEMANTICS	BYTE
17	NLS_NCHAR_CONV_EXCP	FALSE
```
- AMERICAN_AMERICA.AL32UTF8
```
   	PARAMETER	VALUE
1	NLS_LANGUAGE	AMERICAN
2	NLS_TERRITORY	AMERICA
3	NLS_CURRENCY	$
4	NLS_ISO_CURRENCY	AMERICA
5	NLS_NUMERIC_CHARACTERS	.,
6	NLS_CALENDAR	GREGORIAN
7	NLS_DATE_FORMAT	DD-MON-RR
8	NLS_DATE_LANGUAGE	AMERICAN
9	NLS_SORT	BINARY
10	NLS_TIME_FORMAT	HH.MI.SSXFF AM
11	NLS_TIMESTAMP_FORMAT	DD-MON-RR HH.MI.SSXFF AM
12	NLS_TIME_TZ_FORMAT	HH.MI.SSXFF AM TZR
13	NLS_TIMESTAMP_TZ_FORMAT	DD-MON-RR HH.MI.SSXFF AM TZR
14	NLS_DUAL_CURRENCY	$
15	NLS_COMP	BINARY
16	NLS_LENGTH_SEMANTICS	BYTE
17	NLS_NCHAR_CONV_EXCP	FALSE
```
### 4. 客户端的字符集要求与服务器一致，才能正确显示数据库的非Ascii字符。

### 修改会话的字符集与数据库的字符集一致
- [Oracle 客户端 NLS_LANG 的设置](https://www.cnblogs.com/reaperhero/p/10242865.html)

```
--AMERICAN_AMERICA.AL32UTF8
select * from nls_database_parameters;
--数据库的字符集
   	PARAMETER	VALUE
1	NLS_LANGUAGE	AMERICAN	--
2	NLS_TERRITORY	AMERICA		--
3	NLS_CURRENCY	$
4	NLS_ISO_CURRENCY	AMERICA
5	NLS_NUMERIC_CHARACTERS	.,
6	NLS_CHARACTERSET	AL32UTF8	--
7	NLS_CALENDAR	GREGORIAN
8	NLS_DATE_FORMAT	DD-MON-RR
9	NLS_DATE_LANGUAGE	AMERICAN
10	NLS_SORT	BINARY
11	NLS_TIME_FORMAT	HH.MI.SSXFF AM
12	NLS_TIMESTAMP_FORMAT	DD-MON-RR HH.MI.SSXFF AM
13	NLS_TIME_TZ_FORMAT	HH.MI.SSXFF AM TZR
14	NLS_TIMESTAMP_TZ_FORMAT	DD-MON-RR HH.MI.SSXFF AM TZR
15	NLS_DUAL_CURRENCY	$
16	NLS_COMP	BINARY
17	NLS_LENGTH_SEMANTICS	BYTE
18	NLS_NCHAR_CONV_EXCP	FALSE
19	NLS_NCHAR_CHARACTERSET	AL16UTF16
20	NLS_RDBMS_VERSION	11.2.0.1.0


- SIMPLIFIED CHINESE_CHINA.AL32UTF8
```
> 注：客户端的字符集是在没有设置NLS_LANG环境变量时，会话默认的字符集
## 客户端
### 列出当前用户下可见的所有表名及权限
- [Oracle:列出当前用户下可见的所有表名及权限…](https://blog.csdn.net/csh602583095/article/details/31760781)
#### 查看当前用户下所有表
```
select * from tab;
--用户自己拥有的表
select table_name from user_tables;
--所有其他可以访问的表
select table_name from all_tables;
--有DBA角色的用户所拥有的表
select table_name from dba_tables;
```


## 清除数据释放表空间（收缩表空间）
- https://blog.csdn.net/xtdhqdhq/article/details/45691227
### 1. drop表
```
--查看回收站
select object_name, original_name, operation, type from user_recyclebin;
----不放入回收站，彻底删除表
drop table T_CVITER_EMISSION_INFO purge;
--清除回收站里的信息
----清除指定表
purge table T_CVITER_EMISSION_INFO;
----清除当前用户的回收站
purge recyclebin;
----清除所有用户的回收站
--purge dba_recyclebin;
```

### 2. 清除表中的数据
- delete与truncate的区别
    - delete：会产生rollback，如果删除大数据量的表速度会很慢，同时会占用很多的rollback segments。
    - truncate：是DDL操作，不产生rollback，速度快。

```
清空表中数据
TRUNCATE TABLE T_CVITER_EMISSION_INFO;
DELETE FROM T_CVITER_EMISSION_INFO;
```



### 查询表空间信息
```
----查询各表在存储空间的使用分情况
--JSZX T_CVITER_OBD_INFO
SELECT TABLESPACE_NAME,
       TO_CHAR(SUM(BYTES) / (1024 * 1024), '999G999D999') CNT_MB
  FROM DBA_EXTENTS
 WHERE OWNER = '&OWNER'
   AND SEGMENT_NAME = '&TABLE_NAME'
   AND SEGMENT_TYPE LIKE 'TABLE%'
 GROUP BY TABLESPACE_NAME;

----查询存储空间情况
SELECT TABLESPACE_NAME, SUM(BYTES)/1024/1024 FROM DBA_SEGMENTS GROUP BY TABLESPACE_NAME;
```
### 查询用户下的表
```
--当前用户所拥有的表
SELECT * FROM USER_TABLES;
SELECT * FROM DBA_TABLES;
```

## 迁移数据
```
--创建DBLINKS
INSERT INTO T_B_EQUIPMENT_INFO SELECT * FROM T_B_EQUIPMENT_INFO@DBLINK_TEMP_MIGRATE WHERE SBBH='330118_SQ_LZGJL4V45KX005065';
```

## 查询Oracle正在执行的sql语句、当前的被锁对象
```
--查询Oracle正在执行的sql语句及执行该语句的用户
SELECT b.sid oracleID,  
       b.username 登录Oracle用户名,  
       b.serial#,  
       spid 操作系统ID,  
       paddr,  
       sql_text 正在执行的SQL,  
       b.machine 计算机名  
FROM v$process a, v$session b, v$sqlarea c  
WHERE a.addr = b.paddr  
   AND b.sql_hash_value = c.hash_value;

--查看正在执行sql的发起者的发放程序
SELECT OSUSER 电脑登录身份,  
       PROGRAM 发起请求的程序,  
       USERNAME 登录系统的用户名,  
       SCHEMANAME,  
       B.Cpu_Time 花费cpu的时间,  
       STATUS,  
       B.SQL_TEXT 执行的sql  
FROM V$SESSION A  
LEFT JOIN V$SQL B ON A.SQL_ADDRESS = B.ADDRESS  
                   AND A.SQL_HASH_VALUE = B.HASH_VALUE
--WHERE B.Cpu_Time IS NOT NULL               
ORDER BY b.cpu_time DESC;

--查出oracle当前的被锁对象
SELECT l.session_id sid,  
       s.serial#,  
       l.locked_mode 锁模式,  
       l.oracle_username 登录用户,  
       l.os_user_name 登录机器用户名,  
       s.machine 机器名,  
       s.terminal 终端用户名,  
       o.object_name 被锁对象名,  
       s.logon_time 登录数据库时间  
FROM v$locked_object l, all_objects o, v$session s  
WHERE l.object_id = o.object_id  
   AND l.session_id = s.sid  
ORDER BY sid, s.serial#; 

--kill掉当前的锁对象可以为
--alter system kill session 'sid,s.serial#';
```

## CMD
```
C:\Users\Administrator>sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on 星期三 10月 2 17:25:06 2019

Copyright (c) 1982, 2010, Oracle.  All rights reserved.

SQL> conn /as sysdba
已连接。
SQL> create user epesd identified by epesd;

用户已创建。

SQL> grant connect,resource,dba to epesd;

授权成功。

SQL Plus
select count(*) from v$process;
```


## 用户
```
--加了cascade就可以把用户连带的数据全部删掉
drop user epesd cascade;
create user epesd identified by epesd;
grant connect,resource,dba to epesd;
```

### 异常
#### ORA-01940: 无法删除当前连接的用户
> drop user epesd cascade; ORA-01940:cannot drop a user that is currently connected

1. 查看用户的连接状况 
```
select username,sid,serial#,paddr from v$session where username='EPESD';
--	USERNAME	SID	SERIAL#	PADDR
--1	EPESD	1153	149	000007FFC85BFC98
```
2. 找到要删除用户的sid,和serial，并删除 
```
alter system kill session '1153,149';
```
3. 删除用户
```
select saddr,sid,serial#,paddr,username,status from v$session where username is not null;
drop user epesd cascade;
```


## 表空间

### 实操
- 查询表空间方式一
```
SELECT UPPER(F.TABLESPACE_NAME) "表空间名", 
　　D.TOT_GROOTTE_MB "表空间大小(M)", 
　　D.TOT_GROOTTE_MB - F.TOTAL_BYTES "已使用空间(M)", 
　　TO_CHAR(ROUND((D.TOT_GROOTTE_MB - F.TOTAL_BYTES) / D.TOT_GROOTTE_MB * 100, 
　　2), 
　　'990.99') "使用比", 
　　F.TOTAL_BYTES "空闲空间(M)", 
　　F.MAX_BYTES "最大块(M)" 
　　FROM (SELECT TABLESPACE_NAME, 
　　ROUND(SUM(BYTES) / (1024 * 1024), 2) TOTAL_BYTES, 
　　ROUND(MAX(BYTES) / (1024 * 1024), 2) MAX_BYTES 
　　FROM SYS.DBA_FREE_SPACE 
　　GROUP BY TABLESPACE_NAME) F, 
　　(SELECT DD.TABLESPACE_NAME, 
　　ROUND(SUM(DD.BYTES) / (1024 * 1024), 2) TOT_GROOTTE_MB 
　　FROM SYS.DBA_DATA_FILES DD 
　　GROUP BY DD.TABLESPACE_NAME) D 
　　WHERE D.TABLESPACE_NAME = F.TABLESPACE_NAME 
　　ORDER BY 4 DESC;
```
- 查询表空间方式二
```
select * from v$tablespace
select * from dba_data_files

扩展表空间
alter database datafile '/data/soft/oratbs/part01.dbf' resize 10G;



```
- 表结构相关TBS_PART表空间
    - 第一种方式没查到，后边又能查到了
```
  partition T_ALARM_202008 values less than (TO_DATE(' 2020-09-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIAN'))
    tablespace TBS_PART
    pctfree 10
    initrans 1
    maxtrans 255
    storage
    (
      initial 5024K
      next 1M
      minextents 1
      maxextents unlimited
    ),

```

### ORA-01653: unable to extend table JSZX.TMP_T_CVITER_EMISSION_INFO_2 by 128 in tablespace JSZXSPACE_DEF
```
--0、表对应的表空间
SELECT * FROM DBA_TABLES WHERE TABLE_NAME like '%T_B_EQUIPMENT_INFO%';
SELECT * FROM TABS WHERE TABLE_NAME = 'T_B_EQUIPMENT_INFO';

--D:\ORACLE11\APP\ADMINISTRATOR\ORADATA\SQZTC\JSZXSPACE_DEF.DBF

--1、查看表空间使用情况
SELECT T.TABLESPACE_NAME,D.FILE_NAME,
D.AUTOEXTENSIBLE,D.BYTES,D.MAXBYTES,D.STATUS
FROM DBA_TABLESPACES T,DBA_DATA_FILES D
WHERE T.TABLESPACE_NAME =D.TABLESPACE_NAME 
-- and T.TABLESPACE_NAME='JSZXSPACE_DEF'
ORDER BY TABLESPACE_NAME,FILE_NAME;

--1、查看表空间USERS使用情况
SELECT T.TABLESPACE_NAME,D.FILE_NAME,
D.AUTOEXTENSIBLE,D.BYTES,D.MAXBYTES,D.STATUS
FROM DBA_TABLESPACES T,DBA_DATA_FILES D
WHERE T.TABLESPACE_NAME =D.TABLESPACE_NAME 
--and T.TABLESPACE_NAME='USERS'
ORDER BY TABLESPACE_NAME,FILE_NAME;

--2、修改表空间为自动增长
ALTER DATABASE 
    DATAFILE 'D:\ORACLE11\APP\ADMINISTRATOR\ORADATA\SQZTC\JSZXSPACE_DEF.DBF' AUTOEXTEND 
    ON NEXT 500M MAXSIZE UNLIMITED;
    
--3、自动增长还是不行，可能是数据库文件满了【注意：DBF文件在windows平台32g就不能用了】，就增加几个数据库文件 
ALTER TABLESPACE JSZXSPACE_DEF ADD DATAFILE 'D:\ORACLE11\APP\ADMINISTRATOR\ORADATA\SQZTC\JSZXSPACE_DEF02.DBF' SIZE 1G AUTOEXTEND ON NEXT 1G MAXSIZE 30g;
```

## 表结构

```

SELECT * FROM T_B_EQUIPMENT_INFO;
UPDATE T_B_EQUIPMENT_INFO T SET T.UPDATE_TIME=SYSDATE,T.ISAUTH= 2 WHERE T.SBBH IN('330118SQAAAGGGGGGGGSSSSSS');

--新增字段
alter table T_B_EQUIPMENT_INFO add (UPDATE_TIME1 DATE default SYSDATE);
--删除字段
ALTER TABLE T_B_EQUIPMENT_INFO DROP COLUMN UPDATE_TIME1;
```



## 版本查看
```
select * from v$version;
select banner from sys.v_$version;
```
### 版本差异
#### 1. wm_concat
```
wm_concat union 联合使用中保存 ORA-00932: inconsistent datatypes: expected - got CLOB

Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
char

Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - 64bit Production
CLOB

解决 TO_CHAR(wm_concat)
```

## package
### 创建包
```
CREATE OR REPLACE PACKAGE tosin_pack AS
 v_globalvar NUMBER := 1;
 PROCEDURE updatevar;
END tosin_pack;
```
### 创建包体
```
CREATE OR REPLACE PACKAGE BODY tosin_pack AS
 PROCEDURE updatevar IS
 BEGIN
   v_globalvar := 7;
 END updatevar;
END tosin_pack;
```
### 删除包、包体
```
DROP PACKAGE tosin_pack;
```
### 调用
```
BEGIN
tosin_pack.updatevar;
END;
```
### demo
```
--1--创建包
CREATE OR REPLACE PACKAGE tosin_pack AS
 v_globalvar NUMBER := 1;
 PROCEDURE updatevar;
END tosin_pack;
--1--创建包体
CREATE OR REPLACE PACKAGE BODY tosin_pack AS
 PROCEDURE updatevar IS
 BEGIN
   v_globalvar := 7;
 END updatevar;
END tosin_pack;

--1--调用 --2--调用 
BEGIN
tosin_pack.updatevar;
END;

--1--修改包体
CREATE OR REPLACE PACKAGE BODY tosin_pack AS
 PROCEDURE updatevar IS
   vv NUMBER;
   xx NUMBER;
 BEGIN
   v_globalvar := 8;
 END updatevar;
END tosin_pack;

```
#### ORA-06508
```
--2--调用
ORA-04068: existing state of packages has been discarded
ORA-04061: existing state of package body "ZTCBOS.TOSIN_PACK" has been invalidated
ORA-04065: not executed, altered or dropped package body "ZTCBOS.TOSIN_PACK"
ORA-06508: PL/SQL: could not find program unit being called: "ZTCBOS.TOSIN_PACK"
ORA-06512: at line 2
```
##### 解决
```
--1--修改包，问题解决
--出错原因
对于全局变量，每一个session会生成一个本地copy，如果程序重新编译的话，就会因程序里原变量找不到而丢弃该变量，继而导致这个错误。
在一个会话中调用程序包package时，会生成package中全局变量的副本，如果在另一个会话中对此package进行编译就会使前一个会话中的副本失效，故而产生错误
```

## job
- TosinJia/项目/车贷通/消息-车辆档案-超时锁车.sql
### 创建job
```
--【3、创建定时任务job（暂定每10分钟执行一次）】
declare  lockcar_job_really number; 
begin 
dbms_job.submit(lockcar_job_really,'pro_lockcartask_isovertime;',sysdate,'sysdate+10/1440'); 
commit; 
end;
```

### 查看运行的job
![image](https://note.youdao.com/yws/api/personal/file/WEB6f201c1ac1478f0532df4b55257650cb?method=getImage&version=23760&cstk=Sl-a4fhx)
```
select * from sys.user_jobs;

--DBMS_Jobs 23 ->右键->View->View SQL
begin
  sys.dbms_job.submit(job => :job,
                      what => 'pro_lockcartask_isovertime;',
                      next_date => to_date('29-05-2019 08:44:47', 'dd-mm-yyyy hh24:mi:ss'),
                      interval => 'sysdate+10/1440');
  commit;
end;
/
--demo1
begin
  sys.dbms_job.submit(job => :job,
                      what => 'pro_del_alarm_currentday;',
                      next_date => to_date('30-05-2019', 'dd-mm-yyyy'),
                      interval => 'TRUNC(SYSDATE + 1)');
  commit;
end;
/
--demo1->create
declare  del_alarm_currentday_job number; 
begin 
dbms_job.submit(del_alarm_currentday_job,'pro_del_alarm_currentday;',sysdate,'TRUNC(SYSDATE + 1)'); 
commit; 
end;
--更正
declare del_alarm_currentday_job number; 
begin 
dbms_job.submit(del_alarm_currentday_job,'pro_del_alarm_currentday;',TRUNC(SYSDATE + 1),'TRUNC(SYSDATE + 1)'); 
commit; 
end;


-- 数据
insert into sys.user_jobs (JOB, LOG_USER, PRIV_USER, SCHEMA_USER, LAST_DATE, LAST_SEC, THIS_DATE, THIS_SEC, NEXT_DATE, NEXT_SEC, TOTAL_TIME, BROKEN, INTERVAL, FAILURES, WHAT, NLS_ENV, MISC_ENV, INSTANCE)
values (23, 'TXJBOS', 'TXJBOS', 'TXJBOS', to_date('29-05-2019 08:24:45', 'dd-mm-yyyy hh24:mi:ss'), '08:24:45', null, null, to_date('29-05-2019 08:34:45', 'dd-mm-yyyy hh24:mi:ss'), '08:34:45', 515035, 'N', 'sysdate+10/1440', 0, 'pro_lockcartask_isovertime;', 'NLS_LANGUAGE=''AMERICAN'' NLS_TERRITORY=''AMERICA'' NLS_CURRENCY=''$'' NLS_ISO_CURRENCY=''AMERICA'' NLS_NUMERIC_CHARACTERS=''.,'' NLS_DATE_FORMAT=''DD-MON-RR'' NLS_DATE_LANGUAGE=''AMERICAN'' NLS_SORT=''BINARY''', '0102000200000000', 0);
```

### 停止运行的job
- broken字段 N
```
begin 
dbms_job.broken(23,true); 
commit; 
end;
```
### 启动job
- broken字段 Y
```
begin
  dbms_job.run(23);
  commit;
end;
```
### 删除job
```
begin
  dbms_job.remove(23);
  commit;
end;
```

## 约束
### 主键
```
CREATE TABLE TOSIN_EQUIPMENT_INFO AS SELECT * FROM T_B_EQUIPMENT_INFO WHERE SBBH='330118_SQ_LZGJL4V45KX005065';
SELECT * FROM TOSIN_EQUIPMENT_INFO;
----https://www.cnblogs.com/Richardzhu/p/3470929.html
--主键
ALTER TABLE TOSIN_EQUIPMENT_INFO ADD CONSTRAINT PK_TOSIN_EQUIPMENT_INFO PRIMARY KEY(SBBH);
----重命名主键
ALTER TABLE TOSIN_EQUIPMENT_INFO RENAME CONSTRAINT PK_TOSIN_EQUIPMENT_INFO TO PK_TOSIN_EQUIPMENT_INFO_ID;
----禁用主键
ALTER TABLE TOSIN_EQUIPMENT_INFO DISABLE PRIMARY KEY;
----启用主键
ALTER TABLE TOSIN_EQUIPMENT_INFO ENABLE PRIMARY KEY;

SELECT * FROM user_cons_columns WHERE TABLE_NAME='TOSIN_EQUIPMENT_INFO';
SELECT * FROM user_indexes WHERE TABLE_NAME='TOSIN_EQUIPMENT_INFO';
SELECT * FROM user_constraints WHERE TABLE_NAME='TOSIN_EQUIPMENT_INFO';
```
### 唯一性
```
--唯一性约束的创建
ALTER TABLE TOSIN_EQUIPMENT_INFO ADD CONSTRAINT UNQ_TOSIN_EQUIPMENT_INFO UNIQUE(CLSBHM);
----重命名
ALTER TABLE TOSIN_EQUIPMENT_INFO RENAME CONSTRAINT UNQ_TOSIN_EQUIPMENT_INFO TO UNQ_TOSIN_EQUIPMENT_CLSBHM;
```
### 约束
```
ALTER TABLE "TXJ"."kpi_interview" ADD CONSTRAINT "SYS_C0016442" CHECK ("interview_at" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "kpi_interview" DROP CONSTRAINT SYS_C0016442;
```

## 字符集
```
select userenv('language') from dual;
```

## 连接数
```
--数据库允许的最大连接数
select value from v$parameter where name = 'processes';
--当前的连接数
select count(*) from v$process;
--修改数据库允许的最大连接数：
--alter system set processes = 1000 scope = spfile;

--查看数据库当前会话的连接数
select count(*) from v$session;
--查看数据库的并发连接数：
select count(*) from v$session where status='ACTIVE';
--查看当前数据库建立的会话情况：
select sid,serial#,username,program,machine,status from v$session;

```

## 修改数据库DBA密码
- 方式一
```
PS C:\Users\Administrator> sqlplus

SQL*Plus: Release 11.2.0.1.0 Production on 星期五 10月 16 11:35:39 2020

Copyright (c) 1982, 2010, Oracle.  All rights reserved.

请输入用户名:  epesd
输入口令:
ERROR:
ORA-28001: the password has expired


更改 epesd 的口令
新口令:
重新键入新口令:
口令已更改

连接到:
Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

SQL>
```
- 方式二
```
sqlplus /nolog
connect / as sysdba
alter user sys identified by sys;
```

### 修改用户密码过期日期 

```
----system 123456 txjiov 172.16.88.162/orcl
--在密码将要过期或已经过期时可通过 语句进行修改密码，密码修改后该用户可正常连接数据库
ALTER USER TXJIOV IDENTIFIED BY TXJIOV;

--查看用户;用户的PROIFLE是哪个，一般是DEFAULT;到期日期
SELECT USERNAME, PROFILE, EXPIRY_DATE FROM DBA_USERS;
--查看指定概要文件的密码有效期设置
SELECT * FROM DBA_PROFILES s WHERE s.profile='DEFAULT' AND s.RESOURCE_NAME='PASSWORD_LIFE_TIME';
--将密码有效期有默认的180修改成 无限制，修改之后不需要重启动数据库，会立即生效
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
--将密码有效期设置为指定天数
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME 365;

--解锁普通用户
alter user TXJIOV account unlock;
alter user txjiov account unlock;
--修改普通用户密码，密码以英文字母开头
alter user TXJIOV identified by TXJIOV;
alter user txjiov identified by txjiov;
```

## DB Link
### Oracle DBLink连接数过多
- https://www.cnblogs.com/ebs-blog/p/6484973.html
```
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。

C:\Users\Administrator>sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on 星期六 11月 30 10:10:38 2019

Copyright (c) 1982, 2010, Oracle.  All rights reserved.

SQL> conn /as sysdba
已连接。
SQL> show parameter open_links

NAME                                 TYPE
------------------------------------ ----------------------
VALUE
------------------------------
open_links                           integer
4
open_links_per_instance              integer
4
SQL> alter system set open_links=50 scope=spfile;

系统已更改。

SQL> alter system set open_links_per_instance=50 scope=spfile;

系统已更改。

SQL> show parameter open_links;

NAME                                 TYPE
------------------------------------ ----------------------
VALUE
------------------------------
open_links                           integer
4
open_links_per_instance              integer
4
SQL> shutdown immediate
数据库已经关闭。
已经卸载数据库。
ORACLE 例程已经关闭。
SQL> startup
ORACLE 例程已经启动。

Total System Global Area 3423965184 bytes
Fixed Size                  2180544 bytes
Variable Size            2667579968 bytes
Database Buffers          738197504 bytes
Redo Buffers               16007168 bytes
数据库装载完毕。
数据库已经打开。
SQL> show parameter open_links

NAME                                 TYPE
------------------------------------ ----------------------
VALUE
------------------------------
open_links                           integer
50
open_links_per_instance              integer
50
```


- SQL*Plus
```
http://www.cnblogs.com/ebs-blog/p/6484973.html

SQL*Plus: Release 11.2.0.1.0 Production on 星期四 12月 20 12:18:32 2018

Copyright (c) 1982, 2010, Oracle.  All rights reserved.

请输入用户名:  root
输入口令:
ERROR:
ORA-01017: invalid username/password; logon denied


请输入用户名:  TXJBOS
输入口令:

连接到:
Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

SQL> show parameter open_links

NAME                                 TYPE
------------------------------------ ----------------------
VALUE
------------------------------
open_links                           integer
4
open_links_per_instance              integer
4
SQL>
```

- plsql
```
alter system set open_links=50 scope=spfile;
alter system set open_links_per_instance=50 scope=spfile;
```
- 重启服务
![ORACLE-RESTART-SERVICE](https://note.youdao.com/yws/api/personal/file/WEBcd1a027a1aa84dd7488f0828fb969cad?method=getImage&version=14198&cstk=HuVtfC-k)

- SQL*Plus
```
SQL*Plus: Release 11.2.0.1.0 Production on 星期四 12月 20 12:18:32 2018

Copyright (c) 1982, 2010, Oracle.  All rights reserved.

请输入用户名:  root
输入口令:
ERROR:
ORA-01017: invalid username/password; logon denied


请输入用户名:  TXJBOS
输入口令:

连接到:
Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

SQL> show parameter open_links

NAME                                 TYPE
------------------------------------ ----------------------
VALUE
------------------------------
open_links                           integer
4
open_links_per_instance              integer
4
SQL>
```


### 查看
    select owner,object_name from dba_objects where object_type='DATABASE LINK';
    select * from dba_db_links;
### 创建
```
    create public database link DBLINK_IDC
    connect to USER_NAME identified by USER_PWD
    using '(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(PROTOCOL = TCP)(HOST = IP_ADDRESS)(PORT = 1521)))(CONNECT_DATA =(SERVICE_NAME = innetdb)))';
    
    --HgMonitoring区分大小写
    create public database link DBLINK_GATEWAY
    connect to HgMonitoring identified by HgMonitoring
    using '(DESCRIPTION =(ADDRESS_LIST=(ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.9.13)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.9.14)(PORT = 1521))(LOAD_BALANCE= YES)(FAILOVER = ON))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = innetdb)(FAILOVER_MODE=(TYPE = session)(METHOD = preconnect)(RETRIES = 180)(DELAY = 5))))';
```
    
### 删除
    drop public database link LINK_TXJ1_HGMONITORING;

### 查看表
    SELECT * FROM T_B_CAR_INFO@DBLINK_IDC;
    
## 同义词
### 查看
    select * from dba_synonyms WHERE OWNER='TXJBOS';
### 创建
```
create synonym CONFIG_DEV_INFO for CONFIG_DEV_INFO@LINK_TXJ1_HGMONITORING;
create or replace synonym TOSIN_T_IMEI_RECORD for T_IMEI_RECORD@LINK_TXJ1_HGMONITORING;
```
### 删除
    drop synonym CONFIG_DEV_INFO;
### 验证
    SELECT * FROM CONFIG_DEV_INFO;
    
    



## 表
### UNION
```
CREATE OR REPLACE VIEW VIEW_LOCK_INFO_LOG AS
  SELECT lg.TERMINAL_ID, lg.OPERATE_TYPE, lg.CREATE_TIME, lg.TASK_TIME, u.USER_NAME USER_NAME FROM T_B_LOCK_INFO_LOG lg LEFT JOIN t_b_user u on (lg.USER_ID=u.ID) WHERE lg.OPERATE_TYPE IN(2, 3)
UNION
  SELECT lg.TERMINAL_ID, lg.OPERATE_TYPE, lg.CREATE_TIME, lg.TASK_TIME, '2.0系统'||nvl2(u.USER_NAME, ':'||u.USER_NAME, '') USER_NAME FROM T_B_LOCK_INFO_LOG@DBLINK_2 lg LEFT JOIN t_b_user@DBLINK_2 u on (lg.USER_ID=u.ID) WHERE lg.OPERATE_TYPE=2 OR  lg.OPERATE_TYPE=3
UNION
  SELECT TERMINALID TERMINAL_ID, CASE  WHEN OPERATIONMSG='锁车' THEN 2 WHEN OPERATIONMSG='解锁' THEN 3 END  OPERATE_TYPE, OPERATIONTIME CREATE_TIME, null TASK_TIME, '1.0系统'||nvl2(OPERATORNAME, ':'||OPERATORNAME, '') USER_NAME FROM T_B_USER_OPERATION@DBLINK_1 lg WHERE OPERATIONMSG ='锁车' OR OPERATIONMSG ='解锁'
UNION
  SELECT TERMINALID TERMINAL_ID, CASE WHEN OPE_TYPE=3 THEN 2 WHEN OPE_TYPE=4 THEN 3 END OPERATE_TYPE, ISSUED_TIME CREATE_TIME, TO_DATE(FNISH_TIME, 'yyyy-mm-dd hh24:mi:ss') TASK_TIME, '售后系统'||nvl2(OPE_USER, ':'||OPE_USER, '') USER_NAME FROM t_b_lockcar_ope_log@DBLINK_3 WHERE OPE_TYPE=3 OR OPE_TYPE=4;

```
### 删除
```
TRUNCATE TABLE TEMP_TOSIN_EVENT_LOG;
--分区也会删除
DROP TABLE TEMP_TOSIN_EVENT_LOG;
```
### 备份表数据
```
CREATE TABLE TEMP_EVENT_LOG AS SELECT * FROM TEMP_TOSIN_EVENT_LOG;
```

### 索引
#### 创建
```
CREATE INDEX TTEL_EVENT_TIME ON TEMP_TOSIN_EVENT_LOG(EVENT_TIME);
```
#### 查询
```
SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
  FROM USER_CONSTRAINTS
 WHERE TABLE_NAME = 'T_O_EVENT_LOG';
SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
  FROM DBA_CONSTRAINTS
 WHERE TABLE_NAME = 'T_O_EVENT_LOG';

SELECT * FROM USER_INDEXES WHERE TABLE_NAME = 'T_O_EVENT_LOG';
SELECT * FROM ALL_INDEXES WHERE TABLE_NAME = 'TEMP_TOSIN_EVENT_LOG';
```
### 删除
```
DROP INDEX TTEL_EVENT_TIME;
```

### 字段
#### 默认值
```
ALTER TABLE "kpi_interview" MODIFY "interview_at" CHAR(10) DEFAULT NULL;
```

#### 可为空/非空切换
```
-- 将字段修改为非空 重复执行 SQL 错误 [1442] [72000]: ORA-01442: 要修改为 NOT NULL 的列已经是 NOT NULL
ALTER TABLE "kpi_interview" MODIFY "interview_at" CHAR(10) NOT NULL;
-- 将字段修改为可为空 重复执行 SQL 错误 [1451] [72000]: ORA-01451: 要修改为 NULL 的列无法修改为 NULL
ALTER TABLE "kpi_interview" MODIFY "interview_at" CHAR(10) NULL;
-- 不会修改 非空/可为空状态
ALTER TABLE "kpi_interview" MODIFY "interview_at" CHAR(10);

-- 注意：查询结果中，字段非空是 ‘N’，可为空是 ‘Y’
SELECT 
  a.TABLE_NAME 表名, 
  a.COLUMN_NAME 列名, 
  a.DATA_TYPE 数据类型, 
  a.DATA_LENGTH 长度, 
--  a.NULLABLE 非空, 
  (CASE WHEN a.NULLABLE = 'N' THEN '非空' ELSE '可为空' END) 非空,
  a.DATA_DEFAULT, 
  b.COMMENTS 注释
FROM user_tab_columns a
LEFT JOIN user_col_comments b ON a.TABLE_NAME = b.TABLE_NAME AND a.COLUMN_NAME = b.COLUMN_NAME
WHERE a.TABLE_NAME = 'kpi_interview' AND a.COLUMN_NAME='interview_at'
ORDER BY a.COLUMN_ID

SELECT 
  a.OWNER 模式,
  a.TABLE_NAME 表名, 
  a.COLUMN_NAME 列名, 
  a.DATA_TYPE 数据类型, 
  a.DATA_LENGTH 长度, 
--  a.NULLABLE 非空, 
  (CASE WHEN a.NULLABLE = 'N' THEN '非空' ELSE '可为空' END) 非空,  
  a.DATA_DEFAULT,  
  a.DATA_DEFAULT, 
  b.COMMENTS 注释
FROM all_tab_columns a
LEFT JOIN all_col_comments b ON a.OWNER = b.OWNER AND a.TABLE_NAME = b.TABLE_NAME AND a.COLUMN_NAME = b.COLUMN_NAME
WHERE a.OWNER = 'TXJ' AND a.TABLE_NAME = 'kpi_interview' AND a.COLUMN_NAME='interview_at'
ORDER BY a.TABLE_NAME, a.COLUMN_ID
```


#### 数据类型
##### DATE和TIMESTAMP区别
###### DATE
```
--系统日期和时间
SELECT sysdate FROM DUAL;
--DATE->CHAR
SELECT TO_CHAR(sysdate,'yyyy-mm-dd hh24:mi:ss') FROM DUAL;
--DATE->TIMESTAMP
select TO_TIMESTAMP(TO_CHAR(sysdate,'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') from dual;
--DATE差值
select TO_DATE('2020-08-10 09:48:28','yyyy-mm-dd hh24:mi:ss')-sysdate from dual;
```
###### TIMESTAMP

```
--系统日期和时间
SELECT systimestamp FROM DUAL;
--TIMESTAMP->CHAR
SELECT TO_CHAR(systimestamp,'yyyy-mm-dd hh24:mi:ss') FROM DUAL;
--TIMESTAMP->DATE
select to_date(TO_CHAR(systimestamp,'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') from dual;
--TIMESTAMP差值
select TO_TIMESTAMP('2020-08-10 09:48:28','yyyy-mm-dd hh24:mi:ss')-systimestamp from dual;
```

- 显示乱码，尚未解决
```
--systimestamp 显示乱码
--查询数据库服务器端字符集编码 SIMPLIFIED CHINESE_CHINA.AL32UTF8
select userenv('language') from dual;

--环境变量
NLS_LANG SIMPLIFIED CHINESE_CHINA.AL32UTF8
NLS_TIMESTAMP_FORMAT YYYY-MM-DD HH24:MI:SS:FF6
```

## 分区表
### 查询指定表下面的所有分区
```sql
SELECT * FROM USER_SEGMENTS WHERE 
	1=1 
	AND SEGMENT_TYPE='TABLE PARTITION' 
	AND SEGMENT_NAME='TEMP_TOSIN_EVENT_LOG';
```
### 删除分区表分区数据
```sql
--全删除
ALTER TABLE tableName DROP PARTITION partionName;  
--清数据
ALTER TABLE tableName TRUNCATE PARTITION partionName;  
```
### 查询指定分区的数据
```
SELECT * FROM TEMP_TOSIN_EVENT_LOG PARTITION(PAR20151101);
```
### 创建表同时创建分区
```
CREATE TABLE TEMP_TOSIN_EVENT_LOG
PARTITION BY RANGE(EVENT_TIME)(
	PARTITION PAR20150701 VALUES LESS THAN (TO_DATE('2015-07-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PAR20150801 VALUES LESS THAN (TO_DATE('2015-08-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PAR20150901 VALUES LESS THAN (TO_DATE('2015-09-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PARMAX VALUES LESS THAN (MAXVALUE)
) AS SELECT * FROM TEMP_EVENT_LOG;
```
### 修改表分区
```
--ORA-14080: partition cannot be split along the specified high bound 上限
--ORA-14012: resulting partition name conflicts with that of an existing partition 分区名存在
ALTER TABLE TEMP_TOSIN_EVENT_LOG SPLIT PARTITION PARMAX AT (TO_DATE('2015-12-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')) INTO (PARTITION PAR20151201, PARTITION PARMAX) UPDATE GLOBAL INDEXES;
```
### 相关问题
#### ORA-14400: inserted partition key does not map to any partition

[ORA-14400: 插入的分区关键字未映射到任何分区](https://blog.csdn.net/lc547913923/article/details/78730823)
```
--1.确定该表是否已经添加了表分区
select partition_name,high_value from user_tab_partitions t where table_name='T_O_DEV_STATICS';
--2.查询表分区绑定的字段名称
select * from user_part_key_columns t where name='T_O_DEV_STATICS';
--3.查看当前表分区的具体情况
select * from user_tab_partitions t where table_name='T_O_DEV_STATICS';
--SELECT * FROM USER_SEGMENTS WHERE  1=1  AND SEGMENT_TYPE='TABLE PARTITION' AND SEGMENT_NAME='T_O_DEV_STATICS';
--4.查询表分区绑定的字段的最大值。注：此处的table_name应为当前表对应的原始库中的源表。
select max(CLCT_DATE) from T_O_DEV_STATICS t;
--5.将查询到的表分区绑定字段的最大值插入到当前表中进行测试，发现报错。
insert into T_O_DEV_STATICS(id, terminal_id, CLCT_DATE, OVER_SPEED_NUM_1, OVER_SPEED_NUM_2,	 OVER_SPEED_NUM_3, OVER_SPEED_NUM_4,  OVER_SPEED_NUM_5, OVER_SPEED_NUM_6, OVER_SPEED_NUM_7, SPEED_UP_NUM, SPEED_DOWN_NUM, OVER_IDLE_NUM,  OUT_GREEN_ZONE_NUM, FATIGUE_NUM, COASTING_NUM, MILEAGE) values (SEQ_T_O_DEV_STATICS.nextval, '1805020686',20200101,0,0,0,1,2,0,0,0,0,1921,11127,0,0,281.2000122070313);
--6.经过以上环节确定源表中出现错误数据，并且由于错误数据的时间跨度大于当前分区的范围，导致ORA-14400错误的出现，但是由于该数据必须保留，因此对表分区进行扩展。

--7.扩展当前表分区以保证范围大于绑定字段的最大值。
alter table T_O_EVENT_LOG add  partition T_EVENT_202001 values less than (TO_DATE(' 2020-02-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIAN'))
    tablespace TBS_EVENT_PART
    pctfree 10
    initrans 1
    maxtrans 255
    storage
    (
      initial 5024K
      next 1M
      minextents 1
      maxextents unlimited
    );
alter table T_O_RUN_CHART split partition PMAXVALUE at(20200101) into (partition P202001, partition PMAXVALUE);

--8.结束。再次使用kettle进行抽取时顺利抽取。
```


## 存储过程
### 创建
```
CREATE OR REPLACE
PROCEDURE TOSINCREATEPARTITION
AS
	dt varchar2(200);
	sumNumber number;
	toDate date;
	partitionName varchar(50);
	createSqlText varchar(300);
BEGIN
	--定义游标
	DECLARE CURSOR myCursor IS SELECT TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') DT, COUNT(1) FROM TEMP_TOSIN_EVENT_LOG TEL GROUP BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') ORDER BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm');
	BEGIN
		OPEN myCursor;
		LOOP
			FETCH myCursor INTO dt, sumNumber;
			EXIT WHEN myCursor%NOTFOUND;
			if(dt is not null)
			then
				toDate:=TO_DATE(dt, 'yyyy-mm');
				toDate:=ADD_MONTHS(toDate, 1);
				if(toDate > TO_DATE('2015-12-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') and 
					toDate < TO_DATE('2018-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss'))
				then
					partitionName:=TO_CHAR(toDate, 'yyyymmdd');
					createSqlText:='ALTER TABLE TEMP_TOSIN_EVENT_LOG SPLIT PARTITION PARMAX AT (TO_DATE('''||TO_CHAR(toDate, 'yyyy-mm-dd hh24:mi:ss')||''', ''yyyy-mm-dd hh24:mi:ss'')) INTO (PARTITION PAR'||partitionName||', PARTITION PARMAX) UPDATE GLOBAL INDEXES';
					DBMS_OUTPUT.put_line (createSqlText);
					execute immediate createSqlText;
				end if;

			end if;
		END LOOP;
		CLOSE myCursor;
	END;
END TOSINCREATEPARTITION;
```
### 查看
```
SELECT *
    FROM user_source
   WHERE NAME = upper('TosinCreatePartition')
ORDER BY line;
--其中Procedure Name为存储过程名字，需要全部用大写英文。
```
### 执行
- Navicat ->DB->登录名->Functions->存储过程->Execute Function

### 删除
```
DROP PROCEDURE TOSINCREATEPARTITION;
```
### 测试
- 截图：PL/SQL->Procedures->存储过程->Test
### 异常日志
```
--记录存储过程异常日志
create table DEBUG_PROC_SYS_LOG
(
    S_TIME            VARCHAR2(32) not null,
    S_LEVEL            VARCHAR2(32),
    S_PROCNAME        VARCHAR2(64),
    S_MSG            VARCHAR2(4000),
    S_ADVICE        VARCHAR2(1024)
);
-- Add comments to the table 
comment on table DEBUG_PROC_SYS_LOG
  is '存储过程日志表';
-- Add comments to the columns 
comment on column DEBUG_PROC_SYS_LOG.S_TIME
  is '操作时间';
-- Add comments to the columns 
comment on column DEBUG_PROC_SYS_LOG.S_LEVEL
  is '操作级别';
-- Add comments to the columns 
comment on column DEBUG_PROC_SYS_LOG.S_PROCNAME
  is '执行存储过程名称';
-- Add comments to the columns 
comment on column DEBUG_PROC_SYS_LOG.S_MSG
  is '错误信息';
-- Add comments to the columns 
comment on column DEBUG_PROC_SYS_LOG.S_ADVICE
  is '建议信息';

alter table DEBUG_PROC_SYS_LOG add DEFAULTTIME date default sysdate;

SELECT * FROM DEBUG_PROC_SYS_LOG ORDER BY S_TIME DESC;


create or replace procedure TEST_UpdateSMSState(AState number, ATerminalID varchar2, ASeqID number) is
  nCount number;
  lcount number;
  -- 操作时间
  str_time   varchar2(32);
  -- 操作级别
  str_level  varchar2(32);
  -- 执行存储过程名称
  p_procname varchar2(1024);
  -- 错误信息，或者记录信息
  p_msg      varchar2(1024);
  -- 建议信息
  p_advice   varchar2(1024);  
  
  errorException exception; --申明异常
  errorCode number; --异常代号
  errorMsg varchar2(1000); --异常信息  
begin
  p_procname := 'TEST_UpdateSMSState';
  str_time := to_char(SYSDATE, 'yyyy-mm-dd hh24:mi:ss');
  INSERT INTO DEBUG_PROC_SYS_LOG (s_time, s_procname, s_msg) VALUES (str_time, p_procname, ATerminalID || '-SEQID-' || ASeqID || '-STATE-' || AState);
  SELECT (AState/ASeqID) into nCount FROM DUAL;
  INSERT INTO DEBUG_PROC_SYS_LOG (s_time, s_procname, s_msg) VALUES (str_time, p_procname, 'SELECT T_B_Message_Month'||'-NCOUNT-' || nCount);

  exception
    when errorException then
      errorCode := SQLCODE;
      errorMsg := SUBSTR(SQLERRM, 1, 200);	
      INSERT INTO DEBUG_PROC_SYS_LOG (s_time, s_procname, s_msg) VALUES (str_time, p_procname, errorCode||'+'||errorMsg);
    when others then
      errorCode := SQLCODE;
      errorMsg := SUBSTR(SQLERRM, 1, 200);	
      INSERT INTO DEBUG_PROC_SYS_LOG (s_time, s_procname, s_msg) VALUES (str_time, p_procname, errorCode||'+'||errorMsg);
end TEST_UpdateSMSState;   
```

## 函数
### 内置
#### price_revision_truck
- [Oracle 行转列 pivot函数基本用法](https://blog.csdn.net/Huay_Li/article/details/82914161) 
```
SELECT * FROM
	(
	SELECT
		T3."work_number" "wn",
		T3."property_value",
		T2."name"
	FROM
		"profile_property" t2
	INNER JOIN "profile_property_value" t3 ON
		T2."id" = T3."property_id") pivot (max("property_value") FOR "name" IN ('入党转正时间' "入党转正时间", '入党预备时间' "入党预备时间", '入学时间' "入学时间", '入职日期' "入职日期", '出生时间' "出生时间", '劳动合同编号' "劳动合同编号", '合同到期日一' "合同到期日一", '合同到期日二' "合同到期日二", '合同起始日一' "合同起始日一", '合同起始日二' "合同起始日二", '婚否' "婚否", '学位' "学位", '学历' "学历", '孩子姓名一' "孩子姓名一", '孩子姓名三' "孩子姓名三", '孩子姓名二' "孩子姓名二", '孩子性别一' "孩子性别一", '孩子性别三' "孩子性别三", '孩子性别二' "孩子性别二", '孩子身份证号一' "孩子身份证号一", '孩子身份证号三' "孩子身份证号三", '孩子身份证号二' "孩子身份证号二", '工作单位' "工作单位", '工作地点' "工作地点", '工作所在地' "工作所在地", '工龄' "工龄", '年龄' "年龄", '应急电话' "应急电话", '开始上班时间' "开始上班时间", '性别' "性别", '户口性质' "户口性质", '户口所在地' "户口所在地", '所学专业' "所学专业", '政治面貌' "政治面貌", '是否签订一' "是否签订一", '是否签订二' "是否签订二", '是否转正' "是否转正", '本人联系电话' "本人联系电话", '本企业工龄' "本企业工龄", '毕业时间' "毕业时间", '毕业院校' "毕业院校", '民族' "民族", '现居住地址' "现居住地址", '用工性质' "用工性质", '直属上级' "直属上级", '社保类型' "社保类型", '社保缴纳地' "社保缴纳地", '籍贯' "籍贯", '紧急联系人' "紧急联系人", '职务' "职务", '职称/资格' "职称/资格", '试用期到期日' "试用期到期日", '身份证号码' "身份证号码", '配偶姓名' "配偶姓名", '配偶身份证号' "配偶身份证号", '集团细分岗位类别' "集团细分岗位类别") )
```

#### NVL NVL2
- [oracle nvl2函数](https://www.cnblogs.com/hyang0/p/10633820.html)
```
select nvl2(1, sysdate-(sysdate-1/24/60), sysdate), nvl2(null,sysdate-(sysdate-1/24/60), sysdate) from dual;
select nvl('1', 'A'), nvl(null, sysdate) from dual;
```

### 自定义
```
--1 Row 类型
CREATE OR REPLACE TYPE ty_row_str_split as object (strValue VARCHAR2 (4000));
--2 Table 类型
CREATE OR REPLACE TYPE ty_tbl_str_split IS TABLE OF ty_row_str_split;
--3 创建函数
------------------------------
--  拆分字符串函数  --
------------------------------
--p_str 目标字符串
--p_delimiter 分隔符
--返回以一个一维数组
CREATE OR REPLACE FUNCTION fn_split(p_str       IN VARCHAR2,
                                    p_delimiter IN VARCHAR2)
  RETURN ty_tbl_str_split IS
  j         INT := 0;
  i         INT := 1;
  len       INT := 0;
  len1      INT := 0;
  str       VARCHAR2(4000);
  str_split ty_tbl_str_split := ty_tbl_str_split();
BEGIN
  len  := LENGTH(p_str);
  len1 := LENGTH(p_delimiter);

  WHILE j < len LOOP
    j := INSTR(p_str, p_delimiter, i);
  
    IF j = 0 THEN
      j   := len;
      str := SUBSTR(p_str, i);
      str_split.EXTEND;
      str_split(str_split.COUNT) := ty_row_str_split(strValue => str);
    
      IF i >= len THEN
        EXIT;
      END IF;
    ELSE
      str := SUBSTR(p_str, i, j - i);
      i   := j + len1;
      str_split.EXTEND;
      str_split(str_split.COUNT) := ty_row_str_split(strValue => str);
    END IF;
  END LOOP;

  RETURN str_split;
END fn_split;
--测试
select to_char(strvalue) as Value from table(fn_split('aa,bb,cc',','));

------------------------------
--  解析JSON字符串  --
------------------------------
--p_jsonstr json字符串
--p_key 键
--返回p_key对应的值
CREATE OR REPLACE FUNCTION fn_parsejson(p_jsonstr varchar2, p_key varchar2)
  RETURN VARCHAR2 IS
  rtnVal    VARCHAR2(50);
  i         NUMBER(2);
  jsonkey   VARCHAR2(50);
  jsonvalue VARCHAR2(50);
  JSON      VARCHAR2(1000);
BEGIN
  IF p_jsonstr IS NOT NULL THEN
    JSON := REPLACE(p_jsonstr, '{', '');
    JSON := REPLACE(JSON, '}', '');
    JSON := REPLACE(JSON, '"', '');
    FOR temprow IN (SELECT strvalue AS VALUE FROM TABLE(fn_split(JSON, ','))) LOOP
      IF temprow.VALUE IS NOT NULL THEN
        i         := 0;
        jsonkey   := '';
        jsonvalue := '';
        FOR tem2 IN (SELECT strvalue AS VALUE
                       FROM TABLE(fn_split(temprow.value, ':'))) LOOP
          IF i = 0 THEN
            jsonkey := tem2.VALUE;
          END IF;
          IF i = 1 THEN
            jsonvalue := tem2.VALUE;
          END IF;
        
          i := i + 1;
        END LOOP;
      
        IF (jsonkey = p_key) THEN
          rtnVal := jsonvalue;
        END IF;
      END IF;
    END LOOP;
  END IF;

  RETURN rtnVal;
END fn_parsejson;

SELECT fn_parsejson('{"carVin":"12345678","simNo": "18710461528", "carColor": 1, "lockStateEx": 1}','simNo') FROM DUAL;


```

## 序列
```
DROP SEQUENCE SEQ_TOSIN_SYNCHRONIZE;

CREATE SEQUENCE SEQ_TOSIN_SYNCHRONIZE
MINVALUE 1
MAXVALUE 999999999999999999999999
START WITH 1
INCREMENT BY 1
NOCACHE;

SELECT SEQ_TOSIN_SYNCHRONIZE.NEXTVAL FROM DUAL;
--修改这个序列的increment，然后做一次select，然后再把increment 修改回来：
alter sequence SEQ_TOSIN_SYNCHRONIZE increment by 10000;
SELECT SEQ_TOSIN_SYNCHRONIZE.NEXTVAL FROM DUAL;
alter sequence SEQ_TOSIN_SYNCHRONIZE increment by 1;

--ora-080200 先执行 SELECT SEQ_T_B_COMPANY.nextval FROM DUAL;
SELECT SEQ_T_B_COMPANY.currval FROM DUAL;
SELECT SEQ_T_B_COMPANY.nextval FROM DUAL;
```

## 触发器
### 查询
```
select * from all_triggers WHERE table_name = 'TASK_INFORMATION_III';
```
### 主键自增
- [oracle触发器实现主键自增](https://blog.csdn.net/jjkang_/article/details/81538073)
```
create table test_pk_autoincrement_table(id int primary key,age int,name varchar2(32));

CREATE SEQUENCE test_seq_pk_ai_table
MINVALUE 1
START WITH 1
INCREMENT BY 1
NOCACHE;

create trigger test_trg_pk_ai_table before insert on test_pk_autoincrement_table for each row
begin
    select test_seq_pk_ai_table.nextval into :new.id from dual;
end;

insert into test_pk_autoincrement_table(age, name) values(21,'name1');

select * from test_pk_autoincrement_table;
```

### 数据表同步
```
--建表
DROP TABLE Tosin_Synchronize_Info;
DROP TABLE Tosin_Synchronize_Info_1;

CREATE TABLE Tosin_Synchronize_Info (
  ID         INTEGER     primary key,
  UserName   VARCHAR(30),
  PassWord   VARCHAR(20),
  CreateDate DATE,
  Status     INTEGER
);
--           备份数据
CREATE TABLE TOSIN_SYNCHRONIZE_INFO_1 AS SELECT * FROM TOSIN_SYNCHRONIZE_INFO;

--创建触发器
create or replace trigger TOSIN_SYNCHRONIZE_TG after insert or update or delete
on TOSIN_SYNCHRONIZE_INFO for each row
declare
    integrity_error exception;
    errno            integer;
    errmsg           char(200);
    dummy            integer;
    found            boolean;
    
begin
if inserting then
    insert into TOSIN_SYNCHRONIZE_INFO_1(ID,UserName,PassWord,CreateDate,Status) values(:NEW.ID,:NEW.UserName,:NEW.PassWord,:new.CreateDate,:NEW.Status);
elsif updating then 
    update TOSIN_SYNCHRONIZE_INFO_1 set ID=:NEW.ID,UserName=:NEW.UserName,PassWord=:NEW.PassWord,Status=:NEW.Status where id=:OLD.id;    
elsif deleting then
    delete from TOSIN_SYNCHRONIZE_INFO_1 where id=:OLD.id;
end if;
exception
    when integrity_error then
       raise_application_error(errno, errmsg);
end;

--测试
insert into Tosin_Synchronize_Info(ID,UserName,PassWord,CreateDate,Status)values(1,'xier','222',to_date('2008-10-11','yyyy-mm-dd'),1);
update Tosin_Synchronize_Info u set u.status=3,u.username='xier' where u.id=1;
delete from Tosin_Synchronize_Info u where u.id=1;

SELECT * FROM TOSIN_SYNCHRONIZE_INFO;
SELECT * FROM TOSIN_SYNCHRONIZE_INFO_1;
```
- Test Window
```
-- Created on 2019/3/7 by TOSINJIA 
declare 
  -- Local variables here
  i integer;
begin
  -- Test statements here
  update Tosin_Synchronize_Info u set u.status=3,u.username='xier' where u.id=1;
  COMMIT;
end;
```

## 问题汇总
### 超时: 分布式事务处理等待锁
```
### Error updating database.  Cause: java.sql.SQLException: ORA-02049: 超时: 分布式事务处理等待锁

### The error may exist in URL [jar:file:/D:/txjis-services/datadocking/txjis-datadocking-1.0.1-SNAPSHOT.jar!/BOOT-INF/classes!/mapper/mapper3/VehicleMapper.xml]
### The error may involve com.txj.xtzc.txjisdatadocking.db.db3.dao.ITxjisVehicleMapper.mergeVehicle-Inline
### The error occurred while setting parameters
### SQL: MERGE INTO t_vehicle v USING(                         SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,              null DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,               ?  CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,              null SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,               ?  CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,              null SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,               ?  CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,              null SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,               ?  CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,              null SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,               ?  DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL          UNION ALL              SELECT               ?  VEHICLE_NUM,               ?  VIN,              null CLASS_CODE,              null MODEL_POWER,              null ENGINE_NO,              null  ENGINE_TYPE,              null HAS_ENGINE_CERT,              null BULLETIN_MODEL_CODE,              null  DESIGIN_MODEL_CODE,              null PRODUCT_SERIES,              null  MODEL_CODE,              null DATA_NUMBER,               ?  SHIPPING_STATUS,              null BELONG_CLASS,              null AGENCY_ID             FROM DUAL                    ) TMP         ON(TMP.VEHICLE_NUM = v.VEHICLE_NUM)         WHEN MATCHED THEN         UPDATE          SET v.vin =NVL(tmp.vin,v.vin),                     v.CLASS_CODE = NVL(tmp.CLASS_CODE,v.CLASS_CODE),                     v.MODEL_POWER = NVL(tmp.MODEL_POWER,v.MODEL_POWER),                     v.ENGINE_TYPE = NVL(tmp.ENGINE_TYPE,v.ENGINE_TYPE),                     v.ENGINE_NO = NVL(tmp.ENGINE_NO,v.ENGINE_NO),                     v.HAS_ENGINE_CERT = NVL(tmp.HAS_ENGINE_CERT,v.HAS_ENGINE_CERT),                     v.BULLETIN_MODEL_CODE = NVL(tmp.BULLETIN_MODEL_CODE,v.BULLETIN_MODEL_CODE),                     v.DESIGIN_MODEL_CODE = NVL(tmp.DESIGIN_MODEL_CODE,v.DESIGIN_MODEL_CODE),                     v.PRODUCT_SERIES = NVL(tmp.PRODUCT_SERIES,v.PRODUCT_SERIES),                     v.MODEL_CODE = NVL(tmp.MODEL_CODE,v.MODEL_CODE),                     v.DATA_NUMBER = NVL(tmp.DATA_NUMBER,v.DATA_NUMBER),                     v.SHIPPING_STATUS = NVL(tmp.SHIPPING_STATUS,v.SHIPPING_STATUS) ,                     v.BELONG_CLASS = NVL(tmp.BELONG_CLASS,v.BELONG_CLASS) ,                     v.AGENCY_ID = NVL(tmp.AGENCY_ID,v.AGENCY_ID),                     v.LAST_CHANGE_TIME = sysdate          WHEN NOT MATCHED THEN         INSERT          ( id,             vehicle_num,             vin,             class_code,             model_power,             engine_type,             engine_no,             has_engine_cert,             bulletin_model_code,             desigin_model_code,             product_series,             model_code,             data_number,             shipping_status,             platform_type,             BELONG_CLASS,             AGENCY_ID,             create_time,             last_change_time )           VALUES( seq_t_vehicle.nextval,             tmp.VEHICLE_NUM,             tmp.VIN,             tmp.CLASS_CODE ,             tmp.MODEL_POWER ,             tmp.ENGINE_TYPE,             tmp.ENGINE_NO  ,             tmp.HAS_ENGINE_CERT ,             tmp.BULLETIN_MODEL_CODE ,             tmp.DESIGIN_MODEL_CODE,             tmp.PRODUCT_SERIES ,             tmp.MODEL_CODE,             tmp.DATA_NUMBER,             tmp.SHIPPING_STATUS,             1,             tmp.BELONG_CLASS,             tmp.AGENCY_ID,             sysdate,             sysdate )
### Cause: java.sql.SQLException: ORA-02049: 超时: 分布式事务处理等待锁

; bad SQL grammar []; nested exception is java.sql.SQLException: ORA-02049: 超时: 分布式事务处理等待锁
```

### 1. ORA-12547:TNS:lost contact
1. D:\oracle11\app\Administrator\product\11.2.0\dbhome_1\NETWORK\ADMIN\listener.ora
```
      (ADDRESS = (PROTOCOL = TCP)(HOST = HangZhouDiBiao)(PORT = 1521))
```
2. \app\Administrator\diag\tnslsnr\CheDaiDb-P\listener\trace\listener.log 超过4个G

```
-- 转义字符
Select 'test' || '''' from dual;
Select 'test ''' from dual;

SELECT * FROM T_O_EVENT_LOG;
SELECT COUNT(*) FROM T_O_EVENT_LOG;

CREATE TABLE TEMP_EVENT_LOG AS SELECT * FROM T_O_EVENT_LOG;
SELECT COUNT(*) FROM TEMP_EVENT_LOG;


--模拟元数据表
CREATE TABLE TEMP_TOSIN_EVENT_LOG AS SELECT * FROM T_O_EVENT_LOG;
--数据备份到临时表
CREATE TABLE TEMP_EVENT_LOG AS SELECT * FROM TEMP_TOSIN_EVENT_LOG;
--检查数据一致性
SELECT COUNT(*) FROM TEMP_TOSIN_EVENT_LOG;
SELECT COUNT(*) FROM TEMP_EVENT_LOG;

--删除表
TRUNCATE TABLE TEMP_TOSIN_EVENT_LOG;
	--删除表分区也会删除
DROP TABLE TEMP_TOSIN_EVENT_LOG;
	--查询指定表下面的所有分区
SELECT * FROM USER_SEGMENTS WHERE 
	1=1 
	AND SEGMENT_TYPE='TABLE PARTITION' 
	AND SEGMENT_NAME='TEMP_TOSIN_EVENT_LOG';
	--分区表删除分区数据
		--全删除
--ALTER TABLE tableName DROP PARTITION partionName;  
		--清数据
--ALTER TABLE tableName TRUNCATE PARTITION partionName;  

	--查询指定分区的数据
SELECT * FROM TEMP_TOSIN_EVENT_LOG PARTITION(PAR20151101);	--34551

--创建表同时创建分区
CREATE TABLE TEMP_TOSIN_EVENT_LOG
PARTITION BY RANGE(EVENT_TIME)(
	PARTITION PAR20150701 VALUES LESS THAN (TO_DATE('2015-07-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PAR20150801 VALUES LESS THAN (TO_DATE('2015-08-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PAR20150901 VALUES LESS THAN (TO_DATE('2015-09-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')),
	PARTITION PARMAX VALUES LESS THAN (MAXVALUE)
) AS SELECT * FROM TEMP_EVENT_LOG;

SELECT * FROM TEMP_TOSIN_EVENT_LOG WHERE EVENT_TIME = TO_DATE('2015-08-01 09:53:51', 'yyyy-mm-dd hh24:mi:ss');


SELECT TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') DT, COUNT(1) FROM TEMP_EVENT_LOG TEL GROUP BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') ORDER BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm');

--ORA-14080: partition cannot be split along the specified high bound 上限
--ORA-14012: resulting partition name conflicts with that of an existing partition 分区名存在
ALTER TABLE TEMP_TOSIN_EVENT_LOG SPLIT PARTITION PARMAX AT (TO_DATE('2015-12-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')) INTO (PARTITION PAR20151201, PARTITION PARMAX) UPDATE GLOBAL INDEXES;



---ORA-01652: unable to extend temp segment by 8192 in tablespace USERS
--CREATE TABLE TEMP_EVENT_LOG_BAK AS SELECT * FROM T_O_EVENT_LOG;
--SELECT COUNT(1) FROM TEMP_EVENT_LOG_BAK;



--创建
CREATE OR REPLACE
PROCEDURE TOSINCREATEPARTITION
AS
	dt varchar2(200);
	sumNumber number;
	toDate date;
	partitionName varchar(50);
	createSqlText varchar(300);
BEGIN
	--定义游标
	DECLARE CURSOR myCursor IS SELECT TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') DT, COUNT(1) FROM TEMP_TOSIN_EVENT_LOG TEL GROUP BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm') ORDER BY TO_CHAR(TEL.EVENT_TIME, 'yyyy-mm');
	BEGIN
		OPEN myCursor;
		LOOP
			FETCH myCursor INTO dt, sumNumber;
			EXIT WHEN myCursor%NOTFOUND;
			if(dt is not null)
			then
				toDate:=TO_DATE(dt, 'yyyy-mm');
				toDate:=ADD_MONTHS(toDate, 1);
				if(toDate > TO_DATE('2015-12-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') and 
					toDate < TO_DATE('2018-01-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss'))
				then
					partitionName:=TO_CHAR(toDate, 'yyyymmdd');
					createSqlText:='ALTER TABLE TEMP_TOSIN_EVENT_LOG SPLIT PARTITION PARMAX AT (TO_DATE('''||TO_CHAR(toDate, 'yyyy-mm-dd hh24:mi:ss')||''', ''yyyy-mm-dd hh24:mi:ss'')) INTO (PARTITION PAR'||partitionName||', PARTITION PARMAX) UPDATE GLOBAL INDEXES';
					DBMS_OUTPUT.put_line (createSqlText);
					execute immediate createSqlText;
				end if;

			end if;
		END LOOP;
		CLOSE myCursor;
	END;
END TOSINCREATEPARTITION;

--查看存储过程
SELECT *
    FROM user_source
   WHERE NAME = upper('TosinCreatePartition')
ORDER BY line;--其中Procedure Name为存储过程名字，需要全部用大写英文。

--删除存储过程
DROP PROCEDURE TOSINCREATEPARTITION;


--效率测试
SELECT * FROM TEMP_EVENT_LOG WHERE EVENT_TIME = TO_DATE('2015-07-28 09:37:47', 'yyyy-mm-dd hh24:mi:ss');
SELECT * FROM TEMP_TOSIN_EVENT_LOG WHERE EVENT_TIME = TO_DATE('2015-07-28 09:37:47', 'yyyy-mm-dd hh24:mi:ss');
SELECT * FROM TEMP_TOSIN_EVENT_LOG PARTITION(PAR20150801) WHERE EVENT_TIME = TO_DATE('2015-07-28 09:37:47', 'yyyy-mm-dd hh24:mi:ss');

	--
SELECT COUNT(*) FROM TEMP_EVENT_LOG;
SELECT COUNT(*) FROM TEMP_TOSIN_EVENT_LOG;

SELECT * FROM TEMP_EVENT_LOG WHERE EVENT_TIME > TO_DATE('2015-07-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-07-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');
SELECT * FROM TEMP_TOSIN_EVENT_LOG WHERE EVENT_TIME > TO_DATE('2015-07-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-07-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');



SELECT COUNT(*) FROM T_O_EVENT_LOG WHERE EVENT_TIME > TO_DATE('2015-08-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-08-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');
SELECT COUNT(*) FROM TEMP_EVENT_LOG WHERE EVENT_TIME > TO_DATE('2015-08-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-08-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');
SELECT COUNT(*) FROM TEMP_TOSIN_EVENT_LOG WHERE EVENT_TIME > TO_DATE('2015-08-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-08-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');  
SELECT COUNT(*) FROM TEMP_TOSIN_EVENT_LOG PARTITION(PAR20150801) WHERE EVENT_TIME > TO_DATE('2015-08-02 09:37:47', 'yyyy-mm-dd hh24:mi:ss') AND EVENT_TIME < TO_DATE('2015-08-04 09:37:47', 'yyyy-mm-dd hh24:mi:ss');  


--创建索引
create index TEL_EVENT_TIME on TEMP_EVENT_LOG(EVENT_TIME);
CREATE INDEX TTEL_EVENT_TIME ON TEMP_TOSIN_EVENT_LOG(EVENT_TIME);


--查看索引
SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
  FROM USER_CONSTRAINTS
 WHERE TABLE_NAME = 'T_O_EVENT_LOG';
SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
  FROM DBA_CONSTRAINTS
 WHERE TABLE_NAME = 'T_O_EVENT_LOG';

SELECT * FROM USER_INDEXES WHERE TABLE_NAME = 'T_O_EVENT_LOG';
SELECT * FROM ALL_INDEXES WHERE TABLE_NAME = 'TEMP_TOSIN_EVENT_LOG';

SELECT * FROM T_O_EVENT_LOG L WHERE 1=1 AND L.EVENT_TIME BETWEEN 
TO_DATE('2015-07-02 09:37:47', 'YYYY-MM-DD HH24:MI:SS') AND TO_DATE('2015-07-04 09:37:47', 'YYYY-MM-DD HH24:MI:SS')
 AND L.LNG !=-1 AND L.LAT !=-1



```



## 练习
### 创建表

```
--.71/innetdb HgMonitoring

--网关数据库任务表修改
ALTER TABLE TASK_INFORMATION_III ADD API_TASK_ID VARCHAR2(30);
--ALTER TABLE TASK_INFORMATION_III DROP COLUMN API_TASK_UPDATETIME;
ALTER TABLE TASK_INFORMATION_III ADD API_TASK_SENDTIME DATE;
ALTER TABLE TASK_INFORMATION_III ADD API_TASKSTATE_UPDATETIME

COMMENT ON COLUMN TASK_INFORMATION_III.API_TASK_ID IS '调用技术中心API接口，返回的TASKID';
COMMENT ON COLUMN TASK_INFORMATION_III.API_TASK_SENDTIME IS '调用技术中心API接口时间';
COMMENT ON COLUMN TASK_INFORMATION_III.API_TASKSTATE_UPDATETIME IS '技术中心任务状态回调更新状态时的时间';


--技术中心API任务信息记录
--DROP TABLE API_TASK;
CREATE TABLE API_TASK(
       AUTO_INCR_ID NUMBER NOT NULL PRIMARY KEY,
       ID VARCHAR2(30),
       STATE_CODE VARCHAR(10),
       GEN_TIME NUMBER,
       SERVER_TIME NUMBER,
       TIME DATE DEFAULT SYSDATE
);

COMMENT ON TABLE API_TASK IS '技术中心API任务信息';
COMMENT ON COLUMN API_TASK.AUTO_INCR_ID IS '自增序列';
COMMENT ON COLUMN API_TASK.ID IS '任务ID';
COMMENT ON COLUMN API_TASK.STATE_CODE IS '任务状态编码';
COMMENT ON COLUMN API_TASK.GEN_TIME IS '终端任务状态变更时间';
COMMENT ON COLUMN API_TASK.SERVER_TIME IS '技术中心API接口服务器时间';
COMMENT ON COLUMN API_TASK.TIME IS '本条数据生成时间';

--DROP SEQUENCE SEQ_API_TASK;
CREATE SEQUENCE SEQ_API_TASK
MINVALUE 1
MAXVALUE 999999999999999999999999
START WITH 1
INCREMENT BY 1
NOCACHE;

--SELECT SEQ_API_TASK.NEXTVAL FROM DUAL;
--DROP TRIGGER TRI_API_TASK;
CREATE OR REPLACE TRIGGER TRI_API_TASK
  BEFORE INSERT ON API_TASK --触发条件：当向表执行插入操作时触发此触发器
  FOR EACH ROW --对每一行都检测是否触发
BEGIN
  --触发器开始
  --触发器主题内容，即触发后执行的动作，在此是取得序列的下一个值插入到表中的自增字段中
  SELECT SEQ_API_TASK.NEXTVAL INTO :NEW.AUTO_INCR_ID FROM DUAL;
END;

INSERT INTO API_TASK(ID, STATE_CODE, GEN_TIME, SERVER_TIME) VALUES ('1150424012120170712T0924175827', '2', 1542769127254, 1542769127254);
--DELETE FROM API_TASK WHERE AUTO_INCR_ID=1;
SELECT * FROM API_TASK;
```

### 组织
```
SELECT * FROM T_B_COMPANY;


SELECT * FROM T_B_COMPANY 
SELECT * FROM T_B_COMPANY 
       WHERE 
       --PARENT_ID=0;
       PARENT_ID IS NULL
       ID=95;
--Oracle树查询(查询所有子节点，父节点等等) https://blog.csdn.net/qiange520/article/details/50515317

--3.查找一个节点的所有 直属子节点（所有后代）。
SELECT ID, NAME, PARENT_ID FROM T_B_COMPANY START WITH ID = 95 CONNECT BY PARENT_ID = PRIOR ID;
--5.查找一个节点的所有直属父节点（祖宗）。注意的是这个查询出来的结果的顺序是先列出子类节点再列出父类节点，姑且认为是个倒序吧
SELECT ID, NAME, PARENT_ID FROM T_B_COMPANY START WITH ID = 95 CONNECT BY PRIOR PARENT_ID = ID;


--10.名称要列出名称全部路径。
--从顶部开始
SELECT ID, NAME, PARENT_ID, SYS_CONNECT_BY_PATH(NAME, '_') FROM T_B_COMPANY START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID;
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FROM T_B_COMPANY START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID;
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FROM T_B_COMPANY WHERE ID=11135 START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID
--从当前节点开始
SELECT ID, NAME, SYS_CONNECT_BY_PATH (NAME, '/') FROM T_B_COMPANY START WITH ID = 56830484 CONNECT BY PRIOR PARENT_ID = ID;

--省市县样例
SELECT ID, NAME, FULL_NAME, FULL_ID
  FROM (SELECT ID,
               LABEL_CN NAME,
               REPLACE(SYS_CONNECT_BY_PATH(LABEL_CN, '_'), '_', '') FULL_NAME,
               SUBSTR(SYS_CONNECT_BY_PATH(ID, '_'), 2) FULL_ID
          FROM T_DISTRICT
         START WITH PARENT_ID = 10000046
        CONNECT BY PARENT_ID = PRIOR ID)
 WHERE FULL_NAME like '新疆维吾尔自治区哈密地区哈密市';



SELECT NAME, SYS_CONNECT_BY_PATH (NAME, '_') FROM T_B_COMPANY START WITH PARENT_ID=0  CONNECT BY  PARENT_ID = PRIOR ID;


SELECT ID, NAME, PARENT_ID FROM T_B_COMPANY;

SELECT * FROM T_B_COMPANY WHERE ID=56830484;

SELECT * FROM T_B_COMPANY START WITH ID=56830484 CONNECT BY PRIOR PARENT_ID = ID;
SELECT  ID, NAME, SYS_CONNECT_BY_PATH (NAME, '_') FROM T_B_COMPANY START WITH ID=56830484 CONNECT BY PRIOR PARENT_ID = ID;
SELECT  ID, NAME, SYS_CONNECT_BY_PATH (NAME, '_') FROM T_B_COMPANY START WITH ID=56830484 CONNECT BY PARENT_ID = PRIOR ID;

SELECT      SYS_CONNECT_BY_PATH (NAME, '/')   
           FROM T_B_COMPANY   
          WHERE ID = 56830484   
    START WITH PARENT_ID = 0
    CONNECT BY ID = PRIOR PARENT_ID;
    
SELECT SYS_CONNECT_BY_PATH (NAME, '/')   
          FROM T_B_COMPANY   
    START WITH ID = 56830484   
     CONNECT BY PRIOR PARENT_ID = ID;      
    





-----------------
SELECT * FROM T_B_ORG WHERE 1=1
--       AND PARENT_ID IS NULL
--       AND PARENT_ID = -1;
       AND PARENT_ID<-1;
       
       
       
       
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FROM T_B_COMPANY START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID;       
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FULL_NAME FROM T_B_COMPANY START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID;

WITH ORG AS(
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FULL_NAME FROM T_B_COMPANY START WITH PARENT_ID=0 CONNECT BY PARENT_ID = PRIOR ID
)
SELECT * FROM ORG WHERE FULL_NAME like '%陕重汽_德银租赁_济宁晟翔汽车销售服务有限公司%';
SELECT * FROM ORG WHERE FULL_NAME like '%济宁晟翔汽车销售服务有限公司%';

SELECT FULL_NAME, COUNT(*) FROM ORG GROUP BY FULL_NAME;

SELECT * FROM T_B_COMPANY WHERE NAME LIKE '陕西华昊德汽车销售服务有限公司';





SELECT * FROM T_B_ORG@DBLINK_1;
SELECT * FROM T_B_CAR_INFO;
SELECT * FROM T_B_CAR_INFO@DBLINK_1;


--1.0非德银的车贷车的组织ID
select vin_code,org_id from t_b_car_info@dblink_1 
where vin_code in
(
  select *  from cartemp
)
  --1.0 VIN, ORG FULLPATH

WITH ORG AS(  
SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FULL_PATH FROM CARORG START WITH PARENT_ID=-1 CONNECT BY PARENT_ID = PRIOR ID
),
CAR AS(
select vin_code,org_id from t_b_car_info@dblink_1 
where vin_code in
(
  select *  from cartemp
)
)

--SELECT * FROM CAR WHERE CAR.vin_code='GX031515';
SELECT CAR.VIN_CODE, ORG.FULL_PATH FROM CAR LEFT JOIN ORG ON CAR.ORG_ID=ORG.ID;


--1.0组织机构临时表
SELECT * FROM CARORG;

SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FROM CARORG START WITH PARENT_ID=-1 CONNECT BY PARENT_ID = PRIOR ID;

SELECT ID, NAME, PARENT_ID, SUBSTR(SYS_CONNECT_BY_PATH(NAME, '_'), 2) FROM CARORG WHERE ID IN(
SELECT ORG_ID FROM TEMP_TOSIN_ORG_1
) START WITH PARENT_ID=-1 CONNECT BY PARENT_ID = PRIOR ID;



--创建临时表 
CREATE TABLE TEMP_TOSIN_ORG_1 AS SELECT * FROM (
select DISTINCT ORG_ID from t_b_car_info@dblink_1 
where vin_code in
(
  select *  from cartemp
)
);
SELECT * FROM TEMP_TOSIN_ORG_1;



--
SELECT * FROM user_role_org_vehicle_dingdan@Dblink_2;


```

### 分组
```
SELECT *  
--DELETE
FROM T_B_CAR_TERMINAL WHERE ID IN(

--需要删除的IDSTART
select ID from
--select * from
(
select t.*, row_number() over (partition by TERMINAL_ID order by ID DESC) rn ,count(*) over (partition by TERMINAL_ID) nums from (
  --重复数据START
  SELECT ID, TERMINAL_ID FROM T_B_CAR_TERMINAL WHERE TERMINAL_ID IN(
  SELECT TERMINAL_ID FROM (
  SELECT CAR_ID, TERMINAL_ID, TERMINAL_INSTALL_DATE, TERMINAL_UNINSTALL_DATE, DESCB, 
  HISTORY_PULSE, TERMINAL_TYPE, TERMINAL_LOCATION_SOURCE, IS_AUTO_PLAY, LAST_UPDATE_BY, TERMINAL_ID12, COUNT(1)
   FROM T_B_CAR_TERMINAL GROUP BY CAR_ID, TERMINAL_ID, TERMINAL_INSTALL_DATE, TERMINAL_UNINSTALL_DATE, DESCB, 
  HISTORY_PULSE, TERMINAL_TYPE, TERMINAL_LOCATION_SOURCE, IS_AUTO_PLAY, LAST_UPDATE_BY, TERMINAL_ID12 HAVING COUNT(1)>1
  ))
  --重复数据END
) t
)
where rn != 1
--需要删除的IDEND

);
```
- 国六、国五 VIN，终端号，插入时间
    1. VIN 终端号有重复的
    2. 按VIN 终端号去重后，VIN有重复或终端号有重复的
```
WITH T1 AS(
SELECT FIELD1 VIN, FIELD2 TER, FIELD3 TYPE, FIELD10 INSERT_DATE FROM TEMP_TS_20210523 
 WHERE 1=1
--FIELD3 IS NULL --国六
--FIELD3=1 --国五
),
T2 AS(
SELECT DISTINCT VIN, TER FROM T1
)
--按VIN，TER去重后，TER有重复的数据
--SELECT TER, COUNT(TER) FROM T2 GROUP BY TER HAVING COUNT(TER) > 1
--按VIN，TER去重后，VIN有重复的数据
--SELECT VIN, COUNT(VIN) FROM T2 GROUP BY VIN HAVING COUNT(VIN) > 1
--VIN、TER重复的数据 取第一条数据
SELECT *
  FROM (SELECT ROW_NUMBER() OVER(PARTITION BY VIN, TER ORDER BY INSERT_DATE DESC) rn,
               T1.*
          FROM T1
         WHERE VIN IN (SELECT VIN FROM T2 GROUP BY VIN HAVING COUNT(VIN) = 1)
           AND TER IN(SELECT TER  FROM T2 GROUP BY TER HAVING COUNT(TER) = 1)
           --AND TER NOT IN(SELECT TER  FROM T2 GROUP BY TER HAVING COUNT(TER) > 1)
         ORDER BY VIN)
 WHERE rn = 1


CREATE Table TEMP_TS_20210523
(
  FIELD1       VARCHAR2(2000),
  FIELD2       VARCHAR2(2000),
  FIELD3       VARCHAR2(2000),
  FIELD4       VARCHAR2(2000),
  FIELD5       VARCHAR2(2000),
  FIELD6       VARCHAR2(2000),
  FIELD7       VARCHAR2(2000),
  FIELD8       VARCHAR2(2000),
  FIELD9       VARCHAR2(2000),
  FIELD10       DATE
);
```

## 整库备份还原

> 备注：执行导出导入命令的机器要安装oracle客户端。

- [oracle 备份与还原](https://blog.csdn.net/yztezhl/article/details/80451046)
- [oracle数据库备份与还原完整版](https://blog.csdn.net/qq_34967770/article/details/105983053)

- Docker安装Oracle环境
```
[oracle@3c0ae5a124fe ~]$ vi .bash_profile
...
PATH=$PATH:$HOME/bin

export PATH
ORACLE_BASE=/home/oracle/app/oracle;export ORACLE_BASE
ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_2;export ORACLE_HOME
ORACLE_SID=helowin;export ORACLE_SID
ORACLE_TERM=xterm;export ORACLE_TERM
PATH=/usr/sbin:$PATH; export PATH
PATH=$ORACLE_HOME/bin:$PATH; export PATH
LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib; export LD_LIBRARY_PATH
CLASSPATH=$ORACLE_HOME/JRE:$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib;
export CLASSPATH
export ORACLE_HOME
export PATH
[oracle@3c0ae5a124fe ~]$ source .bash_profile 
```
### 备份 exp
```
[oracle@3c0ae5a124fe ~]$ exp 'TXJ/pm2022@10.1.180.77/pman' owner=TXJ file=/home/oracle/backup/TXJ2022070402.dmp buffer=10240 
\
Export: Release 11.2.0.1.0 - Production on һ 7 11:24:38 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.


Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options
Export done in ZHS16GBK character set and AL16UTF16 NCHAR character set

About to export specified users ...
. exporting pre-schema procedural objects and actions
. exporting foreign function library names for user TXJ 
. exporting PUBLIC type synonyms
. exporting private type synonyms
. exporting object type definitions for user TXJ 
About to export TXJ's objects ...
. exporting database links
. exporting sequence numbers
. exporting cluster definitions
. about to export TXJ's tables via Conventional Path ...
. . exporting table                        article          0 rows exported
. . exporting table               article_category          0 rows exported
. . exporting table                     attachment        153 rows exported
. . exporting table            goal_cor_item_month          0 rows exported
. . exporting table             goal_cor_item_year         11 rows exported
. . exporting table          goal_cor_measure_year         33 rows exported
. . exporting table                goal_item_month       3476 rows exported
. . exporting table                 goal_item_year        518 rows exported
. . exporting table              goal_measure_temp          0 rows exported
. . exporting table              goal_measure_year        525 rows exported
. . exporting table                       integral          0 rows exported
. . exporting table                            job          0 rows exported
. . exporting table                        kpi_cor          0 rows exported
. . exporting table                  kpi_interview        448 rows exported
. . exporting table                            log          8 rows exported
. . exporting table                   measure_data          0 rows exported
. . exporting table        measure_data_attendance          0 rows exported
. . exporting table             measure_data_queue          0 rows exported
. . exporting table           measure_data_special       1368 rows exported
. . exporting table                    measure_lib        284 rows exported
. . exporting table                        message       4353 rows exported
. . exporting table                   organization         90 rows exported
. . exporting table              organization_user          0 rows exported
. . exporting table                     permission         98 rows exported
. . exporting table                        profile         99 rows exported
. . exporting table               profile_property         56 rows exported
. . exporting table         profile_property_value       5544 rows exported
. . exporting table                           role         10 rows exported
. . exporting table                role_permission        747 rows exported
. . exporting table                      role_user          0 rows exported
. . exporting table                  transfer_post          0 rows exported
. . exporting table                  user_relation         81 rows exported
. exporting synonyms
. exporting views
. exporting stored procedures
. exporting operators
. exporting referential integrity constraints
. exporting triggers
. exporting indextypes
. exporting bitmap, functional and extensible indexes
. exporting posttables actions
. exporting materialized views
. exporting snapshot logs
. exporting job queues
. exporting refresh groups and children
. exporting dimensions
. exporting post-schema procedural objects and actions
. exporting statistics
Export terminated successfully without warnings.

```
#### 异常
```
[oracle@3c0ae5a124fe ~]$ exp 'TXJ/pm2022@10.1.180.77/pman' owner=TXJ file=/home/oracle/backup/TXJ2022070401.dmp buffer=10240 full=y

Export: Release 11.2.0.1.0 - Production on Mon Jul 4 10:25:49 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.


Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options
EXP-00026: conflicting modes specified
EXP-00000: Export terminated unsuccessfully
```
#### 空表
> 是因为在oracle11G中有新特性，当表无数据时，不分配segment，以节省空间。而使用exp命令时，无segment的表不会被导出。


```
select 'alter table '||table_name||' allocate extent;' from user_tables where num_rows=0;
select 'alter table "'||table_name||'" allocate extent;' from user_tables where num_rows=0;
alter table "article" allocate extent;


--4、查询其分配的segment
select segment_name,sum(bytes)/1024/1024 from user_extents group by segment_name;
---- 查看那些表没有分配查询其分配的segment
SELECT
	table_name
FROM
	(
	SELECT
		table_name
	FROM
		user_tables
	WHERE
		num_rows = 0) tb_null
WHERE
	NOT EXISTS (
	SELECT
		segment_name
	FROM
		user_extents tb_not_null
	WHERE
		tb_null.table_name = tb_not_null.segment_name
	GROUP BY
		segment_name);
```
- [Oracle空表的分配segment](https://www.cnblogs.com/isme-zjh/p/11389690.html)
- [oracle用exp命令导出数据时，有些表无法导出](https://blog.csdn.net/wang263334857/article/details/40781541)

#### help
```
[oracle@3c0ae5a124fe ~]$ exp -?    
template                IAS Template to be used
silent          silent: display banner information, default is N
metrics         metrics: display performance information, default is N
userid          user/password to connect to oracle: no default
recordlength            record length of file: optional, default is system dependent
buffer          array fetch buffer size: default is EXUAFCH (4096)
file            export file names: format is (file1, file2...) default is EXPDAT.DMP
full            export entire database: default is N
grants          export grants option: default is Y
rows            export rows option: default is Y
compress                compact extents option: default is Y
trace           trace option: enable sql_trace and timed_stat, default is N
resumable               enable resumable session : default is N
resumable_timeout               resumable_timeout: wait time for resumable
resumable_name          resumable string: SQL statements to be resumable
owner           users to export: format is '(user1, user2, .., userN)'
tables          tables to export: format is '(table1, table2, ..., tableN)'
parfile         parameter file: name of file that contains parameter specifications
indexes         export indexes option: default is Y
inctype         incremental export option: (incremental, cumulative or complete)
record          option to record incremental/cumulative export: default is Y
constraints             export table constraints option: default is Y
consistent              provide read-consistency for the entire export: default is N
help            help: display descriptions on export parameters, default is N
log             log export messages to specified file
statistics              analyze option: (estimate, cumulative, none)
feedback                feedback in rows default is EXUFDB
direct          direct path option: default is N
point_in_time_recover           point-in-time recover option: default is N
tts_full_check          TTS perform strict test for objects in recovery set: default is N
tablespaces             tablespaces to transport or recover: format is '(ts1, ts2, ..., tsN)'
query           query used to select a subset of rows for a table
filesize                file size: the size of export dump files
volsize         volume size: the size of each volume
transport_tablespace            transportable tablespace option: default is N
triggers                export triggers option: default is Y
impparfile              file to create as paramfile for IMP for transportable tablespaces
file_format             format of export file names
flashback_time          database time to be used for flashback export: no default
flashback_scn           system change number to be used for flashback export: no default
object_consistent               Provides consistency for registered objects during execution of procedureal callback: default is N

Export: Release 11.2.0.1.0 - Production on Mon Jul 4 09:37:56 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.
```
### 导入还原 imp
```
[oracle@3c0ae5a124fe ~]$ sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on Mon Jul 4 10:37:30 2022

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

SQL> conn /as sysdba
Connected.
SQL> ^Z^Z      
SQL> drop user DYJX cascade;
drop user DYJX cascade
*
ERROR at line 1:
ORA-01940: cannot drop a user that is currently connected


SQL> drop user DYJX cascade;

User dropped.

SQL> create user DYJX identified by 123456;

User created.

SQL> grant connect,resource,dba to DYJX;

Grant succeeded.
```
- imp
```
[oracle@3c0ae5a124fe ~]$ imp 'root/123456@127.0.0.1/helowin' fromuser=TXJ touser=DYJX file=/home/oracle/backup/TXJ2022070402.dmp  log=/home/oracle/backup/TXJ2022070402.log ignore=y;  

Import: Release 11.2.0.1.0 - Production on һ 7 11:44:15 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.


Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

Export file created by EXPORT:V11.02.00 via conventional path

Warning: the objects were exported by TXJ, not by you

import done in ZHS16GBK character set and AL16UTF16 NCHAR character set
. importing TXJ's objects into DYJX
. . importing table                      "article"          0 rows imported
. . importing table             "article_category"          0 rows imported
. . importing table                   "attachment"        153 rows imported
. . importing table          "goal_cor_item_month"          0 rows imported
. . importing table           "goal_cor_item_year"         11 rows imported
. . importing table        "goal_cor_measure_year"         33 rows imported
. . importing table              "goal_item_month"       3476 rows imported
. . importing table               "goal_item_year"        518 rows imported
. . importing table            "goal_measure_temp"          0 rows imported
. . importing table            "goal_measure_year"        525 rows imported                                                                                                                                   
. . importing table                     "integral"          0 rows imported
. . importing table                          "job"          0 rows imported
. . importing table                      "kpi_cor"          0 rows imported
. . importing table                "kpi_interview"        448 rows imported
. . importing table                          "log"          8 rows imported
. . importing table                 "measure_data"          0 rows imported
. . importing table      "measure_data_attendance"          0 rows imported
. . importing table           "measure_data_queue"          0 rows imported
. . importing table         "measure_data_special"       1368 rows imported
. . importing table                  "measure_lib"        284 rows imported
. . importing table                      "message"       4353 rows imported
. . importing table                 "organization"         90 rows imported
. . importing table            "organization_user"          0 rows imported
. . importing table                   "permission"         98 rows imported
. . importing table                      "profile"         99 rows imported
. . importing table             "profile_property"         56 rows imported
. . importing table       "profile_property_value"       5544 rows imported
. . importing table                         "role"         10 rows imported
. . importing table              "role_permission"        747 rows imported
. . importing table                    "role_user"          0 rows imported
. . importing table                "transfer_post"          0 rows imported
. . importing table                "user_relation"         81 rows imported
About to enable constraints...
Import terminated successfully without warnings.

```

#### 异常
```
[oracle@e63af26799ac ~]$ imp 'DYJX/123456@127.0.0.1/helowin' fromuser=TXJ touser=DYJX file=/home/oracle/backup/TXJ20220726-P.dmp  log=/home/oracle/backup/TXJ20220726-P.log ignore=y;  

Import: Release 11.2.0.1.0 - Production on 星期二 7月 26 16:08:51 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.


Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options

Export file created by EXPORT:V11.02.00 via conventional path

Warning: the objects were exported by TXJ, not by you

import done in AL32UTF8 character set and AL16UTF16 NCHAR character set
. . importing table              "_kpi_attendance"          0 rows imported
. . importing table         "_profile_bak20201111"          0 rows imported
IMP-00017: following statement failed with ORACLE error 959:
 "CREATE TABLE "article" ("id" NUMBER NOT NULL ENABLE, "category_id" NUMBER N"
 "OT NULL ENABLE, "title" VARCHAR2(255 CHAR) NOT NULL ENABLE, "content" CLOB "
 "NOT NULL ENABLE, "user_id" NUMBER NOT NULL ENABLE, "created_at" DATE NOT NU"
 "LL ENABLE, "updated_at" DATE NOT NULL ENABLE, "deleted_at" DATE)  PCTFREE 1"
 "0 PCTUSED 40 INITRANS 1 MAXTRANS 255 STORAGE(INITIAL 131072 NEXT 1048576 MI"
 "NEXTENTS 1 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT) TABLESPACE "T"
 "XJ" LOGGING NOCOMPRESS LOB ("content") STORE AS BASICFILE  (TABLESPACE "TXJ"
 "" ENABLE STORAGE IN ROW CHUNK 8192 RETENTION  NOCACHE LOGGING  STORAGE(INIT"
 "IAL 65536 NEXT 1048576 MINEXTENTS 1 FREELISTS 1 FREELIST GROUPS 1 BUFFER_PO"
 "OL DEFAULT))"
IMP-00003: ORACLE error 959 encountered
ORA-00959: 表空间 'TXJ' 不存在
. . importing table             "article_category"          0 rows imported
. . importing table                   "attachment"        148 rows imported
. . importing table          "goal_cor_item_month"          0 rows imported
. . importing table           "goal_cor_item_year"         11 rows imported
. . importing table        "goal_cor_measure_year"         33 rows imported
. . importing table              "goal_item_month"       4084 rows imported
. . importing table               "goal_item_year"        518 rows imported
. . importing table            "goal_measure_temp"          0 rows imported
. . importing table            "goal_measure_year"        528 rows imported
. . importing table                     "integral"          0 rows imported
. . importing table                          "job"          0 rows imported
. . importing table                      "kpi_cor"          0 rows imported
IMP-00017: following statement failed with ORACLE error 959:
 "CREATE TABLE "kpi_interview" ("id" NUMBER NOT NULL ENABLE, "year" NUMBER NO"
 "T NULL ENABLE, "month" NUMBER NOT NULL ENABLE, "work_number" VARCHAR2(50 CH"
 "AR) NOT NULL ENABLE, "org_name" VARCHAR2(255 CHAR), "job_name" VARCHAR2(255"
 " CHAR), "leader_work_number" VARCHAR2(50 CHAR), "interview_at" CHAR(10), "p"
 "lace" VARCHAR2(255), "type" NUMBER, "con_result" CHAR(1 CHAR), "con_highlig"
 "ht" VARCHAR2(4000 CHAR), "con_work_need_up" VARCHAR2(4000 CHAR), "con_agree"
 "ment" NUMBER, "con_plan" VARCHAR2(4000 CHAR), "con_help" VARCHAR2(4000 CHAR"
 "), "status" NUMBER NOT NULL ENABLE, "status_description" VARCHAR2(1000 CHAR"
 "), "leader_confirmed_date" DATE, "created_at" DATE NOT NULL ENABLE, "update"
 "d_at" DATE NOT NULL ENABLE, "deleted_at" DATE, "transfer_mark" VARCHAR2(4) "
 "NOT NULL ENABLE, "con_description" CLOB)  PCTFREE 10 PCTUSED 40 INITRANS 1 "
 "MAXTRANS 255 STORAGE(INITIAL 655360 NEXT 1048576 MINEXTENTS 1 FREELISTS 1 F"
 "REELIST GROUPS 1 BUFFER_POOL DEFAULT) TABLESPACE "TXJ" LOGGING NOCOMPRESS L"
 "OB ("con_description") STORE AS BASICFILE  (TABLESPACE "TXJ" ENABLE STORAGE"
 " IN ROW CHUNK 8192 RETENTION  NOCACHE LOGGING  STORAGE(INITIAL 65536 NEXT 1"
 "048576 MINEXTENTS 1 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT))"
IMP-00003: ORACLE error 959 encountered
ORA-00959: 表空间 'TXJ' 不存在
IMP-00017: following statement failed with ORACLE error 959:
 "CREATE TABLE "kpi_interview_bak220701" ("id" NUMBER NOT NULL ENABLE, "year""
 " NUMBER NOT NULL ENABLE, "month" NUMBER NOT NULL ENABLE, "work_number" VARC"
 "HAR2(50 CHAR) NOT NULL ENABLE, "org_name" VARCHAR2(255 CHAR), "job_name" VA"
 "RCHAR2(255 CHAR), "leader_work_number" VARCHAR2(50 CHAR), "interview_at" CH"
 "AR(10 CHAR) NOT NULL ENABLE, "place" VARCHAR2(255 CHAR) NOT NULL ENABLE, "t"
 "ype" NUMBER NOT NULL ENABLE, "con_result" CHAR(1 CHAR), "con_highlight" VAR"
 "CHAR2(4000 CHAR), "con_work_need_up" VARCHAR2(4000 CHAR), "con_agreement" N"
 "UMBER, "con_plan" VARCHAR2(4000 CHAR), "con_help" VARCHAR2(4000 CHAR), "sta"
 "tus" NUMBER NOT NULL ENABLE, "status_description" VARCHAR2(1000 CHAR), "lea"
 "der_confirmed_date" DATE, "created_at" DATE NOT NULL ENABLE, "updated_at" D"
 "ATE NOT NULL ENABLE, "deleted_at" DATE, "transfer_mark" VARCHAR2(4) NOT NUL"
 "L ENABLE, "con_description" CLOB)  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRAN"
 "S 255 STORAGE(INITIAL 589824 NEXT 1048576 MINEXTENTS 1 FREELISTS 1 FREELIST"
 " GROUPS 1 BUFFER_POOL DEFAULT) TABLESPACE "TXJ" LOGGING NOCOMPRESS LOB ("co"
 "n_description") STORE AS BASICFILE  (TABLESPACE "TXJ" ENABLE STORAGE IN ROW"
 " CHUNK 8192 PCTVERSION 10 NOCACHE LOGGING  STORAGE(INITIAL 65536 NEXT 10485"
 "76 MINEXTENTS 1 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT))"
IMP-00003: ORACLE error 959 encountered
ORA-00959: 表空间 'TXJ' 不存在
IMP-00017: following statement failed with ORACLE error 959:
 "CREATE TABLE "log" ("id" NUMBER NOT NULL ENABLE, "ip" VARCHAR2(255 CHAR) NO"
 "T NULL ENABLE, "module" VARCHAR2(4000 CHAR) NOT NULL ENABLE, "action" VARCH"
 "AR2(255 CHAR) NOT NULL ENABLE, "description" CLOB NOT NULL ENABLE, "created"
 "_at" DATE NOT NULL ENABLE, "updated_at" DATE NOT NULL ENABLE, "work_number""
 " VARCHAR2(50))  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 STORAGE(INITI"
 "AL 14680064 NEXT 1048576 MINEXTENTS 1 FREELISTS 1 FREELIST GROUPS 1 BUFFER_"
 "POOL DEFAULT) TABLESPACE "TXJ" LOGGING NOCOMPRESS LOB ("description") STORE"
 " AS BASICFILE  (TABLESPACE "TXJ" ENABLE STORAGE IN ROW CHUNK 8192 RETENTION"
 "  NOCACHE LOGGING  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 FREELIST"
 "S 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT))"
IMP-00003: ORACLE error 959 encountered
ORA-00959: 表空间 'TXJ' 不存在
. . importing table                 "measure_data"          0 rows imported
. . importing table      "measure_data_attendance"          0 rows imported
. . importing table           "measure_data_queue"          0 rows imported
. . importing table         "measure_data_special"       1811 rows imported
. . importing table                  "measure_lib"        285 rows imported
. . importing table                      "message"       4988 rows imported
. . importing table                 "organization"         90 rows imported
. . importing table            "organization_user"          0 rows imported
. . importing table                   "permission"         98 rows imported
. . importing table                      "profile"         99 rows imported
. . importing table             "profile_property"         56 rows imported
. . importing table       "profile_property_value"       5544 rows imported
. . importing table                         "role"         10 rows imported
. . importing table              "role_permission"        747 rows imported
. . importing table                    "role_user"          0 rows imported
. . importing table                "transfer_post"          0 rows imported
. . importing table                "user_relation"         80 rows imported
About to enable constraints...
Import terminated successfully with warnings.
```
- 解决问题
```
SQL> drop user TXJ cascade;                                                                                                                                              
User dropped.
SQL> drop user DYJX cascade;
User dropped.
[oracle@e63af26799ac ~]$ mkdir -p /home/oracle/oradata/DYJX
SQL> create tablespace DYJX logging datafile'/home/oracle/oradata/DYJX/DYJX.dbf' size 1024m autoextend on next 100m maxsize 10240m extent management local;
Tablespace created.
SQL> create user DYJX identified by 123456 default tablespace DYJX;
User created.
SQL> grant connect,resource,dba to DYJX;
Grant succeeded.

create table test1
 (id number(8),
  work clob
  )
 LOB (work) STORE AS
     (
   TABLESPACE DYJX
   STORAGE (
            INITIAL 10M
            NEXT 10M
                   )
     NOCACHE NOLOGGING
            );
SELECT * FROM test1;
INSERT INTO test1 VALUES(1, '123');

[oracle@e63af26799ac ~]$ imp 'system/system@127.0.0.1/helowin' fromuser=TXJ touser=DYJX file=/home/oracle/backup/TXJ20220726-P.dmp  log=/home/oracle/backup/TXJ20220726-P.log ignore=y;
```



### 乱码
```
-- TEST   SIMPLIFIED CHINESE_CHINA.ZHS16GBK
-- 本地库 SIMPLIFIED CHINESE_CHINA.AL32UTF8
select userenv('language') from dual;
```

#### 修改字符集
##### 修改服务器字符集
```
[oracle@3c0ae5a124fe ~]$ vi .bash_profile 
...
export NLS_LANG="SIMPLIFIED CHINESE_CHINA.ZHS16GBK"
[oracle@3c0ae5a124fe ~]$ source .bash_profile 

[oracle@3c0ae5a124fe ~]$ echo $NLS_LANG
SIMPLIFIED CHINESE_CHINA.ZHS16GBK
```
###### 问题 EXP-00091: Exporting questionable statistics.
```
[oracle@e63af26799ac ~]$ exp 'TXJ/pm2022@10.1.180.77/pman' owner=TXJ file=/home/oracle/backup/TXJ20220726-T.dmp buffer=10240      

Export: Release 11.2.0.1.0 - Production on Tue Jul 26 14:33:03 2022

Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.


Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production
With the Partitioning, OLAP, Data Mining and Real Application Testing options
Export done in US7ASCII character set and AL16UTF16 NCHAR character set
server uses ZHS16GBK character set (possible charset conversion)

About to export specified users ...
. exporting pre-schema procedural objects and actions
. exporting foreign function library names for user TXJ 
. exporting PUBLIC type synonyms
. exporting private type synonyms
. exporting object type definitions for user TXJ 
About to export TXJ's objects ...
. exporting database links
. exporting sequence numbers
. exporting cluster definitions
. about to export TXJ's tables via Conventional Path ...
. . exporting table                        article          0 rows exported
EXP-00091: Exporting questionable statistics.

```
- 分析解决
```
TEST SIMPLIFIED CHINESE_CHINA.ZHS16GBK
LOCAL SIMPLIFIED CHINESE_CHINA.AL32UTF8
[oracle@e63af26799ac ~]$ export NLS_LANG="SIMPLIFIED CHINESE_CHINA.ZHS16GBK"

[oracle@e63af26799ac ~]$ vi .bash_profile
[oracle@e63af26799ac ~]$ source .bash_profile 
[oracle@e63af26799ac ~]$ echo $NLS_LANG              
SIMPLIFIED CHINESE_CHINA.ZHS16GBK

-- 数据库字符集并未改变
select userenv('language') from dual;
SIMPLIFIED CHINESE_CHINA.AL32UTF8
```

##### 修改本地库字符集
```
[oracle@3c0ae5a124fe ~]$ sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on һ 7 11:38:18 2022

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

SQL> conn /as sysdba
Connected.
SQL> shutdown immediate
Database closed.
Database dismounted.
ORACLE instance shut down.
SQL> STARTUP MOUNT
ORACLE instance started.

Total System Global Area 1603411968 bytes
Fixed Size                  2213776 bytes
Variable Size             738199664 bytes
Database Buffers          855638016 bytes
Redo Buffers                7360512 bytes
Database mounted.
SQL> ALTER SYSTEM ENABLE RESTRICTED SESSION;

System altered.

SQL> ALTER SYSTEM SET JOB_QUEUE_PROCESSES=0;

System altered.

SQL> ALTER SYSTEM SET AQ_TM_PROCESSES=0;

System altered.

SQL> ALTER DATABASE OPEN;

Database altered.

SQL> ALTER DATABASE CHARACTER SET ZHS16GBK;
ALTER DATABASE CHARACTER SET ZHS16GBK
*
ERROR at line 1:
ORA-12712: Ϊ
若出现上面的错误，使用下面的办法进行修改，使用INTERNAL_USE可以跳过超集的检查：

SQL> ALTER DATABASE CHARACTER SET INTERNAL_USE ZHS16GBK;

Database altered.

SQL> SHUTDOWN IMMEDIATE;
Database closed.
Database dismounted.
ORACLE instance shut down.
SQL> STARTUP
ORACLE instance started.

Total System Global Area 1603411968 bytes
Fixed Size                  2213776 bytes
Variable Size             738199664 bytes
Database Buffers          855638016 bytes
Redo Buffers                7360512 bytes
Database mounted.
Database opened.
```
- [ORACLE如何修改字符集](https://blog.csdn.net/shouhuxiancheng/article/details/82769040)