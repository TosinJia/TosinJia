
# Sybase PowerDesigner
[[TOC]]

- 百度云盘 TosinJia PowerDesigner16.5安装包和破解文件.rar
- [PowerDesigner安装教程（含下载+汉化+破解）](https://www.fujieace.com/software/powerdesigner.html)

## 快捷键

快捷键 | 作用
---|---
F4 | 打开检查模型窗口,检查模型
F5 | 如果图窗口内的图改变过大小,恢复为原有大小即正常大小
==F6== | 放大图窗口内的图
==F7== | 缩小图窗口内的图
==F8== | 在图窗口内中查看全部图内容
F9 | 预览图窗口
F10 | 在图窗口中以一幅视图的高度显示图Shift+单击对象连续选择对象
alt+0 | 显示或隐藏浏览器窗口
alt+1 | 显示或隐藏输出窗口
alt+2 | 显示或隐藏结果列表窗口
ctrl+双击或ctrl+"+" |   打开包图
ctrl+tab | 在图窗口中切换大小,在文本中插入制表符或在属性表窗口中切换标签页
ctrl+page up/page down | 在属性表标签页中切换标签页
ctrl+移动窗口 | 禁止Docking特性
==ctrl+b== | 在浏览器窗口中查找对象
ctrl+d | 打开选择图窗口,选择图
ctrl+e | 打开报表列表窗口
==ctrl+f== | 打开查找对象窗口,查找对象
ctrl+j | 在对象符号中调整文本
ctrl+F4 | 关闭当前图窗口
ctrl+alt+F4 | 关闭模型
ctrl+F6 | 在多个属性表窗口间切换
ctrl+shift+F6 | 在多个属性表窗口间反向切换
ctrl+u | 回到父图
shift+F2 | 打开Workspace
shift+F3 | 保存Workspace
shift+F4 | 关闭Workspace



- [PowerDesigner常用快捷键](https://www.iteye.com/blog/kafeibei-621294)


## 菜单
### Database 
- Change Current DBMS... 
	- 选择 New DBMS
- Edit Current DBMS... 【DBMS Properties(For All Models)】
    - Genral
        - ORA11GR1::Script\Sql\Format
            - CaseSensitivityUsingQuote 确定标识符的区分大小写是否使用双引号进行管理
            - EnableOwnerPrefix
            - UpperCaseOnly
- Generate Database.. 导出sql
- Apply Model Changes to Database... 

- Execute SQL... 【Execute SQL Query】


#### 【Execute SQL Query】
- Menue
    1. Insert... 执行insert语句 有执行情况反馈
#### 备注
1. 空数据库通过以下两种方式，生产的sql，区别仅在于 删除语句
    1. Generate Database.. 导出sql
    2. Apply Model Changes to Database... 


### Edit
- Export Image...   (前提：按住Shift键点击鼠标选择要导出的对象)


### Tools
- Execute Commands 
    - Edit/Run Script... 脚本

#### 脚本
##### 导出Excel脚本
- [太实用了，powerDesigner导出Excel脚本](https://zhuanlan.zhihu.com/p/365065278) 
```
'******************************************************************************
'* File:     Exported_Excel_page.vbs
'* Purpose:  分目录递归，查找当前PDM下所有表，并导出Excel
'******************************************************************************

Option Explicit
ValidationMode = True
InteractiveMode = im_Batch

'-----------------------------------------------------------------------------
' 主函数
'-----------------------------------------------------------------------------
' 获取当前活动模型
Dim mdl ' 当前的模型
Set mdl = ActiveModel
Dim EXCEL,catalog,sheet,catalogNum,rowsNum,linkNum
rowsNum = 1
catalogNum = 1
linkNum = 1

If (mdl Is Nothing) Then
    MsgBox "There is no Active Model"
Else
    SetCatalog
    ListObjects(mdl)
End If

'----------------------------------------------------------------------------------------------
' 子过程，用于扫描当前包并从当前包中打印对象的信息，然后对当前包的所有子包再次调用相同的子过程
'----------------------------------------------------------------------------------------------
Private Sub ListObjects(fldr)
    output "Scanning " & fldr.code
    Dim obj ' 运行对象
    For Each obj In fldr.children
        ' 调用子过程来打印对象上的信息
        DescribeObject obj
    Next
    ' 进入子包
    Dim f ' 运行文件夹
    For Each f In fldr.Packages
        '调用子程序扫描子程序包
        ListObjects f
    Next
End Sub

'-----------------------------------------------------------------------------
' 子过程，用于在输出中打印当前对象的信息
'-----------------------------------------------------------------------------
Private Sub DescribeObject(CurrentObject)
    if not CurrentObject.Iskindof(cls_NamedObject) then exit sub
    if CurrentObject.Iskindof(cls_Table) then 
        AddSheet CurrentObject.code
        ExportTable CurrentObject, sheet
        ExportCatalog CurrentObject
    else
        output "Found "+CurrentObject.ClassName+" """+CurrentObject.Name+""", Created by "+CurrentObject.Creator+" On "+Cstr(CurrentObject.CreationDate)   
    End if
End Sub

'----------------------------------------------------------------------------------------------
' 设置Excel的sheet页
'----------------------------------------------------------------------------------------------
Sub SetExcel()
    Set EXCEL= CreateObject("Excel.Application")

    ' 使Excel通过应用程序对象可见。
    EXCEL.Visible = True
    EXCEL.workbooks.add(-4167)'添加工作表
    EXCEL.workbooks(1).sheets(1).name ="pdm"
    set sheet = EXCEL.workbooks(1).sheets("pdm")

    ' 将一些文本放在工作表的第一行
    sheet.Cells(rowsNum, 1).Value = "表名"
    sheet.Cells(rowsNum, 2).Value = "表中文名"
    sheet.Cells(rowsNum, 3).Value = "表备注"
    sheet.Cells(rowsNum, 4).Value = "字段ID"
    sheet.Cells(rowsNum, 5).Value = "字段名"
    sheet.Cells(rowsNum, 6).Value = "字段中文名"
    sheet.Cells(rowsNum, 7).Value = "字段类型"
    sheet.Cells(rowsNum, 8).Value = "字段备注"
    sheet.cells(rowsNum, 9).Value = "主键"
    sheet.cells(rowsNum, 10).Value = "非空"
    sheet.cells(rowsNum, 11).Value = "默认值"
End Sub

'----------------------------------------------------------------------------------------------
' 导出目录结构
'----------------------------------------------------------------------------------------------
Sub ExportCatalog(tab)
    catalogNum = catalogNum + 1
    catalog.cells(catalogNum, 1).Value = tab.parent.name
    catalog.cells(catalogNum, 2).Value = tab.code
    catalog.cells(catalogNum, 3).Value = tab.comment
    '设置超链接
    catalog.Hyperlinks.Add catalog.cells(catalogNum,2), "",tab.code&"!A2"
End Sub 

'----------------------------------------------------------------------------------------------
' 导出sheet页
'----------------------------------------------------------------------------------------------
Sub ExportTable(tab, sheet)
    Dim col ' 运行列
    Dim colsNum
    colsNum = 0
    for each col in tab.columns
        colsNum = colsNum + 1
        rowsNum = rowsNum + 1
        sheet.Cells(rowsNum, 1).Value = tab.code
        'sheet.Cells(rowsNum, 2).Value = tab.name
        sheet.Cells(rowsNum, 2).Value = tab.comment
        'sheet.Cells(rowsNum, 4).Value = colsNum
        sheet.Cells(rowsNum, 3).Value = col.code
        'sheet.Cells(rowsNum, 4).Value = col.name
        sheet.Cells(rowsNum, 4).Value = col.datatype
        sheet.Cells(rowsNum, 5).Value = col.comment
        
        If col.Primary = true Then
            sheet.cells(rowsNum, 6) = "Y" 
        Else
            sheet.cells(rowsNum, 6) = "" 
        End If
        If col.Mandatory = true Then
            sheet.cells(rowsNum, 7) = "Y" 
        Else
            sheet.cells(rowsNum, 7) = "" 
        End If
        
        sheet.cells(rowsNum, 8).Value = col.defaultvalue
        '设置居中显示
        sheet.cells(rowsNum,6).HorizontalAlignment = 3
        sheet.cells(rowsNum,7).HorizontalAlignment = 3
    next
    output "Exported table: "+ +tab.Code+"("+tab.Name+")"
End Sub 

'----------------------------------------------------------------------------------------------
' 设置Excel目录页
'----------------------------------------------------------------------------------------------
Sub SetCatalog()
    Set EXCEL= CreateObject("Excel.Application")
    
    ' 使Excel通过应用程序对象可见。
    EXCEL.Visible = True
    EXCEL.workbooks.add(-4167)'添加工作表
    EXCEL.workbooks(1).sheets(1).name ="表结构"
    EXCEL.workbooks(1).sheets.add
    EXCEL.workbooks(1).sheets(1).name ="目录"
    set catalog = EXCEL.workbooks(1).sheets("目录")

    catalog.cells(catalogNum, 1) = "模块"
    catalog.cells(catalogNum, 2) = "表名"
    catalog.cells(catalogNum, 3) = "表注释"
    
    ' 设置列宽和自动换行
    catalog.Columns(1).ColumnWidth = 20
    catalog.Columns(2).ColumnWidth = 25
    catalog.Columns(3).ColumnWidth = 55
    
    '设置首行居中显示
    
    catalog.Range(catalog.cells(1,1),catalog.cells(1,3)).HorizontalAlignment = 3
    '设置首行字体加粗
    catalog.Range(catalog.cells(1,1),catalog.cells(1,3)).Font.Bold = True
End Sub 

'----------------------------------------------------------------------------------------------
' 新增sheet页
'----------------------------------------------------------------------------------------------
Sub AddSheet(sheetName)
    EXCEL.workbooks(1).Sheets(2).Select
    EXCEL.workbooks(1).sheets.add
    EXCEL.workbooks(1).sheets(2).name = sheetName
    set sheet = EXCEL.workbooks(1).sheets(sheetName)
    rowsNum = 1
    '将一些文本放在工作表的第一行
    sheet.Cells(rowsNum, 1).Value = "表名"
    'sheet.Cells(rowsNum, 2).Value = "表中文名"
    sheet.Cells(rowsNum, 2).Value = "表备注"
    'sheet.Cells(rowsNum, 4).Value = "字段ID"
    sheet.Cells(rowsNum, 3).Value = "字段名"
    'sheet.Cells(rowsNum, 4).Value = "字段中文名"
    sheet.Cells(rowsNum, 4).Value = "字段类型"
    sheet.Cells(rowsNum, 5).Value = "字段备注"
    sheet.cells(rowsNum, 6).Value = "主键"
    sheet.cells(rowsNum, 7).Value = "非空"
    sheet.cells(rowsNum, 8).Value = "默认值"
    
    '设置列宽
    sheet.Columns(1).ColumnWidth = 20
    sheet.Columns(2).ColumnWidth = 20
    sheet.Columns(3).ColumnWidth = 20
    sheet.Columns(4).ColumnWidth = 20
    sheet.Columns(5).ColumnWidth = 20
    sheet.Columns(6).ColumnWidth = 5
    sheet.Columns(7).ColumnWidth = 5
    sheet.Columns(8).ColumnWidth = 10

    '设置首行居中显示
    sheet.Range(sheet.cells(1,1),sheet.cells(1,8)).HorizontalAlignment = 3
    '设置首行字体加粗
    sheet.Range(sheet.cells(1,1),sheet.cells(1,8)).Font.Bold = True
    
    linkNum = linkNum + 1
    '设置超链接
    sheet.Hyperlinks.Add sheet.cells(1,1), "","目录"&"!B"&linkNum
End Sub 
```
##### comment写入name
- [PowerDesigner书签（03）显示comment字段注释内容](https://blog.csdn.net/itanping/article/details/108563626)
```
Option   Explicit   
    ValidationMode   =   True   
    InteractiveMode   =   im_Batch
    Dim blankStr
    blankStr   =   Space(1)
    Dim   mdl   '   the   current   model  
      
    '   get   the   current   active   model   
    Set   mdl   =   ActiveModel   
    If   (mdl   Is   Nothing)   Then   
          MsgBox   "There   is   no   current   Model "   
    ElseIf   Not   mdl.IsKindOf(PdPDM.cls_Model)   Then   
          MsgBox   "The   current   model   is   not   an   Physical   Data   model. "   
    Else   
          ProcessFolder   mdl   
    End   If  
      
    Private   sub   ProcessFolder(folder)   
    On Error Resume Next  
          Dim   Tab   'running     table   
          for   each   Tab   in   folder.tables   
                if   not   tab.isShortcut   then   
                      tab.name   =   tab.comment  
                      Dim   col   '   running   column   
                      for   each   col   in   tab.columns   
                      if col.comment = "" or replace(col.comment," ", "")="" Then
                            col.name = blankStr
                            blankStr = blankStr & Space(1)
                      else  
                            col.name = col.comment   
                      end if  
                      next   
                end   if   
          next  
      
          Dim   view   'running   view   
          for   each   view   in   folder.Views   
                if   not   view.isShortcut   then   
                      view.name   =   view.comment   
                end   if   
          next  
      
          '   go   into   the   sub-packages   
          Dim   f   '   running   folder   
          For   Each   f   In   folder.Packages   
                if   not   f.IsShortcut   then   
                      ProcessFolder   f   
                end   if   
          Next   
    end   sub
```
### Help
1. Help Contents F1
1. Online Documentation
    - [Sybase 产品手册](https://infocenter.sybase.com/help/index.jsp)

## PhysicalDiagram

### 导入库表结构
- Tools
    - -> Import Tables
        - -> SQL Inserts
            - Use Command Window
            - Import file: .sql
                - Import

### 自动布局
- 选中需要布局的元素 -> 右键 -> Auto-Layout...

### 同时显示Table Name, Table Code
1. Tools -> Model Options... -> Name Convention -> 右侧display中选择显示name还是code
不支持同时显示，但可以选择显示code，然后将name填入stereotype中，变相同时显示

2. Tools -> Display Preferences -> Table
    1. -> 勾选 stereotype是否显示
	2. -> 选中 Comment，Comment中填写表名
	3. -> Advanced... -> Customize Content -> Columns -> 添加NAME

1. 在菜单栏中选择 Tools >> Execute Commands >> Edit/Run Script...


### View Properties 视图
#### SQL Query
```
select id, LTRIM(sys_connect_by_path(abbr_name, '_'),'_') as full_name,LTRIM(sys_connect_by_path(id, ','),',') as org_ids
  from t_b_company
connect by prior id = parent_id start with parent_id='0'
```
#### Preview
```
drop view V_COMPANY_ORG;

/*==============================================================*/
/* View: V_COMPANY_ORG                                          */
/*==============================================================*/
create or replace view V_COMPANY_ORG as
select id, LTRIM(sys_connect_by_path(abbr_name, '_'),'_') as full_name,LTRIM(sys_connect_by_path(id, ','),',') as org_ids
  from t_b_company
connect by prior id = parent_id start with parent_id='0'
with read only;

```

### Sequence Properites 序列
#### Physical Options(Common)
- 不填写时默认值
```
Start with 1
Increment by 1
Min value 1
Max value 9999999999999999999999999999
Cache 20
```
- 相应Preview
```
drop sequence SEQ_T_B_FUNC;

create sequence SEQ_T_B_FUNC;
```
- 最终生成的序列
```
create sequence SEQ_T_B_FUNC
minvalue 1
maxvalue 9999999999999999999999999999
start with 1
increment by 1
cache 20;
```

### 物理模型导出-生产数据库脚本
- Database -> Generate Database...
    - 生成的脚本带双引号时，创建的表，表名区分大小写，访问时也必须加上引号。

- 删除用户
- [Database Generation - name]
	- General
		- Directory: choose directory
		- File name: input
	- Options
		- Table & Column
			- uncheck Table\Key\Index Physical options
		- 首次执行 uncheck Drop...
	- Format 注释为空时，用NAME
	    - Generate name in empty comment

```
alter table SYS_OPER_LOG
   drop primary key cascade;

drop table SYS_OPER_LOG cascade constraints;

/*==============================================================*/
/* Table: SYS_OPER_LOG                                          */
/*==============================================================*/
create table SYS_OPER_LOG 
(
   OPER_ID              NUMBER(20)           not null,
   TITLE                VARCHAR2(50)         default '',
   BUSINESS_TYPE        NUMBER(2)            default 0,
   METHOD               VARCHAR2(200)        default '',
   REQUEST_METHOD       VARCHAR2(10)         default '',
   OPERATOR_TYPE        NUMBER(1)            default 0,
   OPER_NAME            VARCHAR2(50)         default '',
   DEPT_NAME            VARCHAR2(50)         default '',
   OPER_URL             VARCHAR2(255)        default '',
   OPER_IP              VARCHAR2(50)         default '',
   OPER_LOCATION        VARCHAR2(255)        default '',
   OPER_PARAM           VARCHAR2(2000)       default '',
   JSON_RESULT          VARCHAR2(2000)       default '',
   STATUS               NUMBER(1)            default 0,
   ERROR_MSG            VARCHAR2(2000)       default '',
   OPER_TIME            DATE
--);
) tablespace  vtspace;

comment on table SYS_OPER_LOG is
'操作日志记录';

comment on column SYS_OPER_LOG.OPER_ID is
'日志主键seq_sys_oper_log.nextval';

comment on column SYS_OPER_LOG.TITLE is
'模块标题';

comment on column SYS_OPER_LOG.BUSINESS_TYPE is
'业务类型（0其它 1新增 2修改 3删除）';

comment on column SYS_OPER_LOG.METHOD is
'方法名称';

comment on column SYS_OPER_LOG.REQUEST_METHOD is
'请求方式';

comment on column SYS_OPER_LOG.OPERATOR_TYPE is
'操作类别（0其它 1后台用户 2手机端用户）';

comment on column SYS_OPER_LOG.OPER_NAME is
'操作人员';

comment on column SYS_OPER_LOG.DEPT_NAME is
'部门名称';

comment on column SYS_OPER_LOG.OPER_URL is
'请求URL';

comment on column SYS_OPER_LOG.OPER_IP is
'主机地址';

comment on column SYS_OPER_LOG.OPER_LOCATION is
'操作地点';

comment on column SYS_OPER_LOG.OPER_PARAM is
'请求参数';

comment on column SYS_OPER_LOG.JSON_RESULT is
'返回参数';

comment on column SYS_OPER_LOG.STATUS is
'操作状态（0正常 1异常）';

comment on column SYS_OPER_LOG.ERROR_MSG is
'错误消息';

comment on column SYS_OPER_LOG.OPER_TIME is
'操作时间';

alter table SYS_OPER_LOG
   add constraint PK_SYS_OPER_LOG primary key (OPER_ID);


```

#### 分隔符 ;->/
1. 指定语句分隔符进行
    - DATABASE -> EDIT CURRENT DATABASE -> General -> Script -> Sytax ->Teminator
    - 只要我在模型中加入Procedures后，生成的代码就由原来的分号（；）自动变成了斜线（/）
        - Procedure自身带分号



### 物理模型导入-DB生成PDM
- 参考
    - [PowerDesigner连接MySQL和逆向工程图](https://www.cnblogs.com/deng-cc/p/6824946.html)
    - [连接Oracle数据库并导出Oracle的表结构](https://jingyan.baidu.com/article/19192ad8f68c21e53e5707eb.html)


0. 环境设置
    1. JAVA_HOME jdk必须选择32位
    1. CLASSPATH 添加数据库驱动


```
File->Reverse Engineer->Database...
	- DBMS ORACLE Version 11g
	- 选择 确定

Database Reverse Enginneering Options
	- Using a data source
	
	- Connect to a Data Source 
		- Connection profile
			- Configure...

[Database -> Configure Connectins...]		
Configure Data Connections 界面
	选择 Connection Profiles
		Add Data Source

Connection Profile Definition 界面
Connection profile name: 
Directory:
Connection type: JDBC
DBMS type: ORACLE
User name: RUOYI
JDBC driver class: oracle.jdbc.OracleDriver
JDBC connection URL: jdbc:oracle:thin:@172.16.9.201:1521:innetdb
```
- *.dcp
    - 可以修改文件名，文件配置信息。修改文件名后，无法识别
        1. [Configure Data Connections]界面
        	- Connection Profiles
        		- 删除 old.dcp
        2. [Connect to a Data Source]界面
        	- Connection profile 
        		- Browse For Folder: 选中 new.dcp所在的文件夹
        		- Open: 选中 new.dcp

- E:\TosinJia\IdeaProjects\TxjXtzc\db\RuoYi.dcp
```
[ConnectionProfile]
ConnectionType=JDBC
Dbms=Oracle
Description=RuoYi框架数据库
DisableBind=0
Driver=oracle.jdbc.OracleDriver
JarFiles=RUOYI
LogId=RUOYI
MapDateToDateTime=1
TrimSpaces=0
URL=jdbc:oracle:thin:@172.16.9.206:1521:innetdb
```



- 选择反向数据
```
# 
Database Reverse Engineering界面
	- 选择需要反向的数据
		- 选择 Table（不选择Physical options）、Trigger、Sequence、DatabaseLink
		- 不选择 User Tablespace，User
```

#### 修改
```
Table Properties

	Owner
	Physical Options

	Key Proerties
		Physical Options
		Physical Options(Common)
```


#### Connection Profile Definition
```
Connection type: JDBC
DBMS type: ORACLE
User name: ztcbos
JDBC driver classs: oracle.jdbc.OracleDriver
JDBC connection URL: jdbc:oracle:thin:@172.16.9.201:1521:innetdb
```

#### 问题
##### Non SQL Error : Could not load class oracle.jdbc.OracleDriver
- 环境变量 CLASSPATH，添加 E:\TosinJia\tools\portableSoft\apache-maven-3.6.3\repository\com\oracle\ojdbc6\11.2.0.3\ojdbc6-11.2.0.3.jar 路径

##### ORA-12505, TNS:listener does not currently know of SID given in connect descriptor

```
SQLSTATE = 66000
Listener refused the connection with the following error:
ORA-12505, TNS:listener does not currently know of SID given in connect descriptor
```
- 解决方法
```
jdbc:oracle:thin:@172.16.9.199:1521:innetdb
Connection test sucessful.
jdbc:oracle:thin:@172.16.9.199:1521/innetdb
```


##### Could not Initialize JavaVM!
- 解决办法：jdk必须选择32位，64位会报  "Could not Initialize JavaVM!"
```
JAVA_HOME
E:\TosinJia\MyEnviroment\WorkingEnvironment\JAVAEnviroment\64\jdk1.8.0_111

E:\TosinJia\MyEnviroment\WorkingEnvironment\JAVAEnviroment\x86\jdk1.8.0_111
```
##### Non SQL Error : Could not load class oracle.jdbc.OracleDriver
- 解决办法：需要在环境变量中配置驱动的路径
```

CLASSPATH
E:\tools\maven\apache-maven-3.0.5-2.0\mavenrepo\com\oracle\ojdbc6\11.2.0.3\ojdbc6-11.2.0.3.jar
```

# 案例
## SIM卡综合管理系统
- E:\MyEnviroment\WorkingEnvironment\项目整理\中交天健\SIM卡综合管理系统\数据库设计\v2.1\SIM卡综合管理系统.pdm

## 订单系统
- E:\workspaces\eclipseProjects\txjProjects\txjiov\db\TXJIVO_V1.5.pdm

