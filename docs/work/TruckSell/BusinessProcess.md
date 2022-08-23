
[[TOC]]

# Business Process
## 自测
### 流程设置-系统管理
#### 提报单流程
- xjyx001
0 首节点
1 新疆计划	刘莉-计划 - 刘 莉	审批
2 新疆财务	林新霞-财务 - 齐琪	审批
3 新疆总经理	付小瑞-总经理 - 付小瑞	审批

- admin
0 首节点
1 本部计划	净姿霖-计划 - 净姿霖	审批
2 业务负责人	业务负责人 - 狄青	审批
3 总经理	公司领导 - 张旭涛	审批
4 结束




## 1 提报（本部下单） 审核

### liuli

#### 提报单列表
##### 新建
1. 本部下单、订单类型、车辆型谱、车辆类型、车型编号、【车型价格、】数量
1. 完成 商务政策选择 价格信息 合同单价（元）
1. 选配信息 新增选配信息
1. 委改信息
1. 保存
##### 审核  通过

### admin 
#### 流程设置
1. 查看提报单流程
	- jingzilin (diqing/diqing1) zhangxutao

### jingzilin 
#### 提报单列表 
##### 审核 通过
### zhangxutao 
#### 提报单列表
##### 查看审核记录
##### 审核 通过
#### 订单列表
##### 收缩/展开

### xjyx001
#### 流程设置
1. 查看开票流程
	- mengjunxing fuxiaorui


### mengjunxing
#### 银行流水记录
1. 选择文件 取消


## 2

### mengjunxing
#### 银行流水记录
1. 已导入
2. 关注 剩余金额
### liuli
#### 车款核销
1. 收缩/展开 订单
2. 全选 定金核销 最终未操作
### jingzilin 


## 3
### jingzilin 
#### 银行流水记录
1. 关注 到账金额 

### jingzilin 
#### 车款核销
1. 收缩/展开 订单
	2. 关注 定金；物流状态 待排产
	2. 全选 定金核销
	3. 弹出 定金核销 界面
		1. 使用银行流水 勾选
		2. 确认

1. 收缩/展开 订单
	1. 关注 定金已核销（元） 剩余定金（元） 有变化

#### 排产登记-采购管理
1. 收缩/展开
	1. 全选 批量排产登记
	2. 弹出 排产登记 界面
		1. 选择 供应商选择 、
		1. 供应商系统订单号、供应商合同号、供应商合同价格、供应商运费价格
		2. 排产日期 预计下线日期
		3. 确认
1. 本条信息消失

#### 采购车辆入库登记-采购管理
1. 存在记录信息
#### 首页
1. 刷新
1. 采购管理
	1. 采购总量、康机采购量  +5


### liuli
#### 首页

1. 子公司销售统计
	1. 新疆远行 采购量 库存量+5
1. 库存管理
	1. 库存总量、康机库存量 +5

### yanzhenhua
#### 首页

1. 子公司销售统计
	1. 新疆远行 采购量 库存量+5

1. 采购管理
	1. 采购总量、康机采购量  +0

1. 库存管理
	1. 库存总量、康机库存量 +0

### jingzilin 
#### 采购车辆入库登记-采购管理
1. 收缩/展开
	1. 全选 批量入库登记
	2. 弹出 入库登记 界面
		1. 录入 5辆车 库存日期 车架号	发动机号	车辆流水号 信息
		2. 确定
1. 记录消失
#### 发车申请/收车登记-采购管理
1. 收缩/展开


### liuli
#### 发车申请/收车登记-采购管理
1. 收缩/展开
	1. （物流状态 订单车-商用车库存）全选 批量入库登记
	1. 弹出 发车申请 界面
		1. 期望到达时间、
		2. 选择发运方信息 弹出 接车点信息查询失败
		3. 选择接车点简称

#### 发运地管理-资源维护
1. +新增地址
	1. 弹出 地址信息 界面
		1. 录入信息
		2. 确定
#### 发车申请/收车登记-采购管理
1. 收缩/展开
	1. （物流状态 订单车-商用车库存）全选 批量入库登记
	1. 弹出 发车申请 界面
		1. 期望到达时间、
		2. 选择发运方信息 
		3. 选择接车点简称
		4. 确定
1. 记录消失

### malan
#### 发车确认/收车确认-采购管理
1. 点击 发车确认 [发车确定]
	1. 弹出 发车/收车确认 界面
	2. 确定
1. 记录消失

### liuli
#### 发车申请/收车登记-采购管理
1. 切换至 收车登记 TAB页
1. 点击 发车登记
	1. 弹出 收车登记 界面
	2. 收车证明 上传图片
	3. 点击 收车登记 按钮
1. 记录消失

### jingzilin 
#### 发车确认/收车确认-采购管理
1. 切换至 收车确认 TAB页
1. 点击 收车确认
	1. 弹出 发车/收车确认 界面
		1. 下载 收车证明
		2. 确定
1. 记录消失
#### 订单列表-采购管理
1. 收缩/展开
	1. 物流状态 渠道库存

#### 车款核销-财务管理
1. 收缩/展开
	1. 全选 尾款核销
	2. 弹出 尾款核销 界面
		1. 使用银行流水 勾选
		2. 确认
#### 采购发票管理(-B?)-采购管理
1. 收缩/展开
	1. 选择 2辆车，（物流状态 渠道库存） 商用车票据登记 
	2. 弹出 登记信息 界面
		1. 发票类型 税率 税额
		2. 开票金额 自动 生成 大写
		3. 票据信息登记
			1. 添加 3辆车 车辆流水号 开票日期 开票号码 金额 （不含税金额 大写金额 自动生成） 发票类型
		1. 确定
#### 采购发票管理列表(-B?)-采购管理
1. 查看记录？
2. 弹出 登记信息 界面


### mengjunxing
#### 采购发票管理（-C?!）--采购管理
1. 收缩/展开
	1. 选择3辆车 采购发票申请
	1. 弹出 开票信息 界面
		1. 发票类型 税率 税额（自动生成）
		2. 项目名称
		1. 确定
1. 切换 审批/登记(全部)列表 TAB页
	1. 关注 审核状态
	2. 点击 审核 按钮
	3. 弹出 开票信息 界面
		1. 通过
	1. 关注 审核状态

### xjyx001
#### 流程设置-系统管理
1. 查看 开票流程
	- 孟俊星（mengjunxing）  付小瑞 （fuxiaorui）

### fuxiaorui
#### 采购发票审批/登记（?采购发票管理-C）-采购管理
1. 切换 审批/登记(全部)列表 TAB页
	1. 点击 审核
	2. 弹出 开票信息 界面
		1. 通过
1. 【开票申请】 待审核 TAB页
	1. 收缩/展开
	2. 关注审核状态

### admin 
#### 流程设置-系统管理
1. 查看 开票流程
	- 张晗（zhanghan）、张亚（zhangya）、胡金笛（hujindi）

### zhanghan
#### 采购发票管理列表（-B?!）-采购管理
#### 采购发票管理（-B?）-采购管理
#### 销售发票申请列表-销售管理
1. 待审核 TAB页
2. 审核
3. 弹出 开票信息 界面
	1. 通过
1. 关注审核状态

### admin 
#### 流程设置-系统管理
1. 查看 开票流程
	- 张晗（zhanghan）、张亚（zhangya）、胡金笛（hujindi）

### zhangya
#### 开票审批/登记（？）-销售管理
1. 审核
2. 弹出 开票信息 界面
	1. 关注 开票金额 开票单位  
	2. 关注 开票信息 公司全称
	3. 通过
3. 关注 审核状态

### hujindi
#### 开票审批/登记（？）-销售管理
1. 待审核 TAB页
1. 审核
2. 弹出 开票信息 界面
	3. 通过
3. 记录消失

### mengjunxing


## 4
### mengjunxing
#### 采购发票审批/登记（?采购发票管理-C）-采购管理
1. 审批/登记（(全部)）列表 TAB页

1. 切换 申请列表 TAB页
#### 采购发票管理列表（?-C）-采购管理
1. 待审核 TAB页
1. 切换 已驳回 TAB页
1. 切换 已完成 TAB页

#### 采购发票管理（？）-采购管理


## 5 提报 非本部下单

### liuli

#### 提报单列表
1.  新建
	1. 非本部下单、订单类型、车辆型谱、车辆类型、车型编号、【车型价格、】数量
	1. 完成 商务政策选择 价格信息 合同单价（元）
	1. 选配信息 新增选配信息
	1. 委改信息
	1. 提交
1. 审核
	1. 通过
1. 关注 审核状态

### jingzilin
#### 提报单列表
1. 全部 TAB页
1. 点击 审核 按钮
	1. 弹出新的界面
		1. 通过

### zhangxutao
#### 提报单列表
1. 全部 TAB页
1. 点击 审核 按钮
	1. 弹出新的界面
		1. 通过
### liuli
#### 订单列表-采购管理
#### 排产登记-采购管理
1. 收缩/展开
	1. 全选 批量排产登记
	2. 弹出 排产登记 界面
		1. 选择 供应商选择 、
		1. 供应商系统订单号、供应商合同号、供应商合同价格、供应商运费价格
		2. 排产日期 预计下线日期
		3. 确认
1. 本条信息消失
#### 采购车辆入库登记-采购管理
1. 收缩/展开
	1. 选择2辆车（物流状态：订单车-已排产） 批量入库登记
	2. 弹出 入库登记 界面
		1. 录入 2辆车 库存日期 车架号	发动机号	车辆流水号 信息
		2. 确定
1. 收缩/展开
	1. 2辆车 已录入 车架号 车辆流水号，物流状态：订单车-商用车库存，复选框不可用

#### 发车申请/收车登记-采购管理
1. 收缩/展开
	1. （物流状态：订单车-商用车库存）选中2辆车 发车申请
	1. 弹出 发车申请 界面
		1. 期望到达时间
		2. 选择发运方信息 
		3. 选择接车点简称
		4. 确定
1. 记录消失

#### 发车确认/收车确认-采购管理
1. 点击 发车确认
	1. 弹出 发车/收车确认 界面
	2. 确定
1. 记录消失

#### 发车申请/收车登记-采购管理

1. 切换至 收车登记 TAB页
1. 点击 发车登记
	1. 弹出 收车登记 界面
	2. 收车证明 上传图片
	3. 点击 收车登记 按钮
1. 记录消失

#### 发车确认/收车确认-采购管理
1. 切换至 收车确认 TAB页
1. 点击 收车确认
	1. 弹出 发车/收车确认 界面
		1. 下载 收车证明
		2. 确定
1. 记录消失

1. 切换至 已完成 TAB页

#### 采购发票管理(-C?)-采购管理
1. 申请列表 TAB页
1. 收缩/展开
	1. 选择 2辆车，（物流状态 渠道库存） 采购发票申请
	2. 弹出 开票信息 界面
		1. 项目名称
		1. 发票类型 税率 税额（自动生成）
		1. 确定

#### 采购发票管理审批/登记(?采购发票管理-C)-采购管理
1. 审批/登记列表（审批/登记(全部)列表） TAB页
	1. 点击 审核 ，提示无当前数据审核权限


### shilibing
#### 采购发票管理审批/登记(?采购发票管理-C)-采购管理
1. 审批/登记列表（审批/登记(全部)列表） TAB页
	1. 想去点击 查看审核记录


## 6
### fuxiaorui
#### 采购发票管理(?采购发票管理-C)-采购管理
1. 审批/登记列表（审批/登记(全部)列表）TAB页
	1. 点击 审核登记
	1. 弹出 开票信息 界面
		1. 票据信息登记
			1. 添加 2辆车 车辆流水号 开票日期 开票号码 金额 （不含税金额 大写金额 自动生成） 发票类型
			2. 勾选 全部
		1. 确认登记


	1. 选择 2辆车，（物流状态 渠道库存） 商用车票据登记 
	2. 弹出 登记信息 界面
		1. 发票类型 税率 税额
		2. 开票金额 自动 生成 大写
		3. 票据信息登记
			1. 添加 3辆车 车辆流水号 开票日期 开票号码 金额 （不含税金额 大写金额 自动生成） 发票类型
		1. 确定

### liuli

#### 销售对象管理-销售管理
1. 收缩/展开


#### 销售合同管理-销售管理


#### 销售对象管理-销售管理
1. 收缩/展开
	1. 选择 2辆车，（物流状态 订单车-渠道库存） 销售对象信息登记
	2. 弹出 销售对象信息登记 界面
		1. 录入 终端客户信息
			1. 选择 终端客户 ，录入 销售单价、单车销售定金
		1. 确定
1. 收缩/展开
	1. 登记销售对象的2辆车 合同单价（元）、定金（元）、剩余定金（元）、尾款（元）、剩余尾款（元） 数据有变化


#### 车款核销-财务管理

1. 收缩/展开
	2. 选中2辆车（物流状态：渠道库存） 定金核销
	3. 弹出 定金核销 界面
		1. 使用银行流水 勾选 其中一项
		2. 确认


1. 收缩/展开
	1. 选中2辆车（物流状态：渠道库存） 尾款核销
	2. 弹出 尾款核销 界面
		1. 使用银行流水 勾选  其中一项
		2. 确认 弹出"资金流水选中项可使用金额不足，请添加选项或重新导入流水"
		3. 使用银行流水 勾选  另外一项
		4. 确认
1. 收缩/展开
	1. 之前选中的2辆车 尾款已核销（元）数据有变化


#### 销售票出库登记（?销售票出库登记-终端）-销售管理

1. 收缩/展开
	2. 选中2辆车（物流状态：渠道库存） 销售票据登记
	3. 弹出 登记信息 界面
		1. 发票类型 税率 税额（自动生成）
		1. 开票信息
			1. 录入 纳税人识别号、开户银行、银行账号、地址/电话
		2. 票据信息登记
			1. 添加 2辆车 车辆流水号 开票日期 开票号码 金额 （不含税金额 大写金额 自动生成） 发票类型
		1. 确定

#### 销售票出库登记列表-销售管理


### mengjunxing
#### 销售票出库登记列表-销售管理
1. （审核状态：财务审核 待审核）点击 审核
2. 弹出 登记信息 界面
	1. 通过
1. 审核状态：已完成