
[[TOC]]

# 系统功能
- http://127.0.0.1:8081/doc.html
## 附件
```
FileUploadSaveUtils.fileSave

select * from submission;

```
## 登录
- http://127.0.0.1:8081/user/login
    - com.clgg.modules.system.controller.UserController#login
```
-- Parameters: admin(String)
select u.id, u.user_name, u.account, u.password, u.salt, u.status, u.agency_code, u.create_time, u.create_user, u.update_time, u.update_user,u.phone, r.id roleId,r.role_name, r.type roleType, r.status roleStatus, m.id menuId, m.parent_id, m.menu_name, m.menu_url, m.perms, m.type menuType, m.icon, m.order_num, m.system_type from sys_user u left join sys_role_user ru on ru.user_id = u.id left join sys_role r on r.id = ru.role_id left join sys_user_menu mu on mu.user_id = u.id left join sys_menu m on mu.menu_id = m.id where u.user_name = 'admin' and u.`status` = '0' order by m.order_num asc ;
SELECT id, parent_id parentId, menu_name menuName, menu_url menuUrl, perms, type, icon, order_num orderNum, system_type systemType FROM sys_menu where system_type <> 2 order by order_num asc ;
```
### 相关
- 各子公司超管账号
```
select
	su.user_name,
	su.account,
	su.agency_code,
	sos.agency_name,
	sr.role_name 
from
	sys_user su
left join sys_org_user sou on
	su.id = sou.user_id
left join sys_org_structure sos on
	sou.org_id = sos.id
left join sys_role_user sru on 
	sru.user_id =su.id 
left join sys_role sr on 
	sru.role_id = sr.id 
	
where
-- 	su.account ='张旭涛'
-- 	sos.agency_name like '%新疆%'
	su.account like '%系统操作员%'
	and sos.status = 0
order by
	sos.id, su.id;
```

## 采购管理
### 提报单列表
#### 全部
- http://127.0.0.1:8081/submission/list
    - com.clgg.modules.system.controller.SubmissionController#list
```
-- 获取下拉框内容
-- 获取经销商信息（提报方）
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE (agency_code_ours = '20190619154208925923' or father = '20190619154208925923') and status = '0' and status = "0" ;
-- Parameters: 0(String)

-- 获取产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取待办数
select count(0) from submission where current_check_user like concat(concat('%#',89),'#%') 
-- Parameters: 89(Long)

-- 获取结果集
select id, submission_no, name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_code, version, market_type, truck_type_name, truck_type_id, public_type, engine_type, horsepower, wheel_base, cab_type, speed_changing_box, frame, front_axle, behand_axle, front_spring, behand_spring, fuel_tank, tyre_type, number, standard_price, adjust_price, price, total_price, end_price, down_price, remark, status, create_user, create_date, update_user, update_date, work_flow_node, agency_code, current_step, current_check_user, basic_config_name, matching_information, contact_total_price, contact_single_price, current_flow_position, intention_no, source,intention_id,is_reform,choose_config,discount_rate,discount_price,agency_client_id, sub_single_price,sub_down_price,sub_total_price,submission_type,basic_electric_id,manufactor_id,order_strategy,so_type,reform_price,fare,cab_color,policyChoose from ((select * from submission WHERE status like '%待审核%' and delete_status = '0' order by create_date DESC LIMIT 99999999) UNION all (select * from submission WHERE status like '%驳回%' and delete_status = '0' order by create_date DESC LIMIT 99999999) UNION all (select * from submission WHERE status like '%待提交%' and delete_status = '0' order by create_date DESC LIMIT 99999999) UNION all (select * from submission WHERE status like '%已完成%' and delete_status = '0' order by create_date DESC LIMIT 99999999)) t WHERE so_type is null and agency_code = '20190619154208925923' limit 0,10 ;
-- Parameters: 20190619154208925923(String), 0(Integer), 10(Integer)

-- return "submission/list";
-- templates/submission/list.html
-- static/javascript/submission/submission_list.js
```
#### 新增

- templates/submission/add.html
    - com.clgg.modules.system.controller.SubmissionController#add

- http://127.0.0.1:8081/submission/toAdd?isConfirm=1
    - com.clgg.modules.system.controller.SubmissionController#toAddPage
```
-- 车辆型谱 
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 车辆类型 
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 车辆类型 获
select id, agency_code, client_no, modify_status, client_name, client_type, client_phone, client_driver, client_driver_phone, vin_short, factory_no, vin, truck_type, product_line, truck_no, sell_time, sell_year, sell_month, truck_company, truck_code, engine, engine_no, horsepower, fuel_type, emission_standard, contract_no, yx_contract_no, sell_company, sell_way, business_leader, business_leader_phone, legal_person_name, legal_person_id_no, legal_person_id_img, license_img, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_user, create_time, update_user, udpate_time,client_address from sys_agency_client WHERE agency_code = '20190619154208925923' order by create_time desc ;
-- Parameters: 20190619154208925923(String)
```

- http://127.0.0.1:8081/trans/getSenders
    - com.clgg.modules.system.controller.TransceiverController#getSenders
```
-- 发运方信息/客户信息 拉取当前用户信息 
select id, send_name, create_user, create_time, update_user, update_time, agency_code from send_info WHERE agency_code = '20190619154208925923' ;
-- Parameters: 20190619154208925923(String)

-- 接收方信息
select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = 2 ;
-- Parameters: 2(Long)
```


#### 待审核
- http://127.0.0.1:8081/submission/list?listType=1&pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&publicType=&startDate=&endDate=
```
URI_S_20220531124831143: /submission/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"listType":["1"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"publicType":[""],"startDate":[""],"endDate":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select count(0) from submission where current_check_user like concat(concat('%#',?),'#%') 
==> Parameters: 1(Long)
<==      Total: 1
==>  Preparing: SELECT count(0) FROM ((SELECT * FROM submission WHERE status LIKE '%待审核%' AND delete_status = '0' LIMIT 99999999) UNION ALL (SELECT * FROM submission WHERE status LIKE '%驳回%' AND delete_status = '0' LIMIT 99999999) UNION ALL (SELECT * FROM submission WHERE status LIKE '%待提交%' AND delete_status = '0' LIMIT 99999999) UNION ALL (SELECT * FROM submission WHERE status LIKE '%已完成%' AND delete_status = '0' LIMIT 99999999)) t WHERE so_type IS NULL AND current_check_user LIKE concat(concat('%', ?), '%') AND current_flow_position = ? 
==> Parameters: #1#(String), 1(String)
<==      Total: 1
URI_E_20220531124831143: /submission/list, time: 138, 
	|--reponse: "submission/list" 

```


### 订单列表
- http://127.0.0.1:8081/order/list
```
URI_S_20220531124407669: /order/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531124407669: /order/list, time: 153, 
	|--reponse: "order/list" 

```

#### 查询
```
URI_S_20220611140605650: http://127.0.0.1:8082/order/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":["base"],"productTypeId":["60"],"platetTypeId":["7"],"isOnAccount":[""],"submissionNo":["T20220324004"],"truckCode":["V3ET"],"serialNumber":["MA004632"],"contactNo":["FSCM-JT-SD-XS-202203-0006"],"startTime":["2022-03-24"],"endTime":["2022-03-25"],"orderStatus":["2"]}, body: null

-- 提报方 提报方
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0" 
-- Parameters: 0(String)

-- 产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name 
-- Parameters: 0(String)

-- 车辆类别 
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name 
-- Parameters: 0(String)

SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.submission_no = ? AND oi.contact_no = ? AND oi.agency_code = ? AND oi.product_type_id = ? AND oi.platet_type_id = ? AND oi.truck_code = ? AND ii.serial_number LIKE concat(concat('%', ?), '%') AND oi.create_time >= str_to_date(concat(?, ' 00:00:00'), '%Y-%m-%d %H:%i:%s') AND oi.create_time <= str_to_date(concat(?, ' 23:59:59'), '%Y-%m-%d %H:%i:%s') AND ot.status IN (?)) table_count 
-- Parameters: T20220324004(String), FSCM-JT-SD-XS-202203-0006(String), base(String), 60(Long), 7(Long), V3ET(String), MA004632(String), 2022-03-24(String), 2022-03-25(String), 2(String)

select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.submission_no = 'T20220324004' and oi.contact_no = 'FSCM-JT-SD-XS-202203-0006' and oi.agency_code = 'base' and oi.product_type_id = 60 and oi.platet_type_id = 7 and oi.truck_code = 'V3ET' and ii.serial_number like concat(concat('%','MA004632'), '%') and oi.create_time >= str_to_date(concat('2022-03-24', ' 00:00:00'), '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date(concat('2022-03-25', ' 23:59:59'), '%Y-%m-%d %H:%i:%s') and ot.status in (2) order by oi.create_time desc, oi.order_no desc limit 0,10
--  Parameters: T20220324004(String), FSCM-JT-SD-XS-202203-0006(String), base(String), 60(Long), 7(Long), V3ET(String), MA004632(String), 2022-03-24(String), 2022-03-25(String), 2(String), 0(Integer), 10(Integer)


select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.submission_no = 'T20220324004' and oi.contact_no = 'FSCM-JT-SD-XS-202203-0006' and oi.agency_code = 'base' and oi.product_type_id = 60 and oi.platet_type_id = 7 and oi.truck_code = 'V3ET' and ii.serial_number like concat(concat('%','MA004632'), '%') and oi.create_time >= str_to_date(concat('2022-03-24', ' 00:00:00'), '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date(concat('2022-03-25', ' 23:59:59'), '%Y-%m-%d %H:%i:%s') and ot.status in ( '0' , '1' , '2' , '4' , '6' , '7' ) order by oi.create_time desc, oi.order_no desc limit 0,10
-- Parameters: T20220324004(String), FSCM-JT-SD-XS-202203-0006(String), base(String), 60(Long), 7(Long), V3ET(String), MA004632(String), 2022-03-24(String), 2022-03-25(String), 0(String), 1(String), 2(String), 4(String), 6(String), 7(String), 0(Integer), 10(Integer)


URI_E_20220611140605650: http://127.0.0.1:8082/order/list, time: 40, 
	|--reponse: "order/list" 
```
#### 收缩/展开
```
URI_S_20220611140758145: http://127.0.0.1:8082/order/getTruckListByOrderId,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"orderId":["1441"]}, body: [1441]
	
select t.id, t.order_id, t.name, t.product_type_name, t.product_type_id, t.platet_type_name, t.platet_type_id, t.truck_code, t.version, t.market_type, t.truck_type_name, t.truck_type_id, t.public_type, t.engine_type, t.horsepower, t.wheel_base, t.cab_type, t.speed_changing_box, t.frame, t.front_axle, t.behand_axle, t.front_spring, t.behand_spring, t.fuel_tank, t.tyre_type, t.status, t.create_user, t.create_date, t.update_user, t.update_data, t.remark, t.manufactor_id, t.order_strategy, s.single_price, s.down_price, s.down_price_cancel, s.down_price_leave, s.tail_money, s.tail_money_wait_cancel, s.tail_money_cancel, s.is_on_account, on_account_leave, s.on_account_cancel, s.logistics_status, s.others, s.sub_single_price, s.sub_on_account, s.sub_on_account_cancel, s.sub_down_price, s.sub_down_price_cancel, s.sub_down_price_leave, s.sub_tail_money, s.sub_tail_money_wait_cancel, s.sub_tail_money_cancel, sm.submission_type, s.sub_client_id, ii.truck_id bindingTruckId, ii.vin, s.truck_status, pi.plan_time from order_truck_sell_info s LEFT JOIN order_truck t on t.id = s.truck_id LEFT JOIN order_info o ON o.id = s.order_id LEFT JOIN incoming_info ii ON ii.truck_id = t.id LEFT JOIN submission sm ON sm.submission_no = o.submission_no LEFT JOIN planning_info pi on pi.truck_id = s.truck_id WHERE s.order_id = 1441 
-- Parameters: 1441(Long)

select i.id, os.truck_id, i.order_id, i.incoming_time, i.vin, i.serial_number, i.engine_number, i.create_time, i.create_user, os.down_price, os.tail_money, pi.bh_order_no, pi.manufactor_contact_no, pi.manufactor_contact_price, pi.manufactor_name from order_truck_sell_info os left join incoming_info i on os.truck_id = i.truck_id left join planning_info pi on pi.truck_id = os.truck_id where os.truck_id = 11110 or os.truck_id = 11111 or os.truck_id = 11112 or os.truck_id = 11113 
-- Parameters: 11110(Long), 11111(Long), 11112(Long), 11113(Long)

SELECT
	prt.truck_id truckId,
	prt.original_price originalPrice,
	sum(prtd.price) revisionPrice,
	prt.price endPrice
FROM
	price_revision_truck prt
LEFT JOIN price_revision_truck_detail prtd on
	prtd.truck_id = prt.truck_id
	and prtd.apply_no = prt.apply_no
LEFT JOIN price_revision_apply pra on
	pra.apply_no = prt.apply_no
where
	( prt.truck_id = 11110
		or prt.truck_id = 11111
		or prt.truck_id = 11112
		or prt.truck_id = 11113 )
	and pra.status = '审核通过'
GROUP BY
	prt.truck_id 
-- Parameters: 11110(Long), 11111(Long), 11112(Long), 11113(Long)

URI_E_20220611140758145: http://127.0.0.1:8082/order/getTruckListByOrderId, time: 35, 
	|--reponse: {"code":0,"truckIds":[11110,11111,11112,11113],"data":[{"behandAxle":"13T北奔双减桥","behandSpring":"/","cabType":"/","createDate":1648107372000,"createUser":81,"engineType":"WP13NG460E61","frame":"/","frontAxle":"/","frontSpring":"/","fuelTank":"1000L（LNG气瓶）","horsepower":"460","id":11110,"incomingInfo":{"createUser":0,"truckId":11110,"vin":"LBZ44DEB7LA011868"},"manufactorId":45,"marketType":"/","name":"北奔6x4","orderId":1441,"orderStrategy":"0","planningInfo":{"createUser":0,"planTime":1647273600000},"platetTypeId":7,"platetTypeName":"LNG牵引车","productTypeId":60,"productTypeName":"北奔","publicType":"ND4250BG6J7Z01","remark":"牵引车-复合;6×4/2;变速箱：16JSDX240TA（铝）；发动机：WP13NG460E61；12R22.5-18PR;13T北奔双减桥/4.2（ABS+轮间差速锁）;1350L（LNG气瓶）;智能包1（多功能方向盘+10.2寸彩色显示屏+蓝牙）;50#单向鞍座（90鞍座）;无;无选装包;顶部及侧部导流罩;无;加强副梁;3/4;D50;7.5吨;11.00;钢轮辋;FHB400缓速器","sellInfo":{"downPrice":0.00,"downPriceCancel":0.00,"downPriceLeave":0.00,"isOnAccount":false,"logisticsStatus":"","onAccountCancel":0.00,"onAccountLeave":0.00,"others":"","singlePrice":360000.00,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"tailMoney":360000.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":360000.00,"truckStatus":0},"speedChangingBox":"16JSDX240TA（铝）","status":"2","submissionType":"0","truckCode":"V3ET","truckNational":0,"truckTypeId":59,"truckTypeName":"64QY","tyreType":"12R22.5-18PR","updateUser":170,"version":"复合版","wheelBase":"/"},{"behandAxle":"13T北奔双减桥","behandSpring":"/","cabType":"/","createDate":1648107372000,"createUser":81,"engineType":"WP13NG460E61","frame":"/","frontAxle":"/","frontSpring":"/","fuelTank":"1000L（LNG气瓶）","horsepower":"460","id":11111,"incomingInfo":{"createUser":0,"truckId":11111,"vin":"LBZ44DEB7MA004632"},"manufactorId":45,"marketType":"/","name":"北奔6x4","orderId":1441,"orderStrategy":"0","planningInfo":{"createUser":0,"planTime":1647273600000},"platetTypeId":7,"platetTypeName":"LNG牵引车","productTypeId":60,"productTypeName":"北奔","publicType":"ND4250BG6J7Z01","remark":"牵引车-复合;6×4/2;变速箱：16JSDX240TA（铝）；发动机：WP13NG460E61；12R22.5-18PR;13T北奔双减桥/4.2（ABS+轮间差速锁）;1350L（LNG气瓶）;智能包1（多功能方向盘+10.2寸彩色显示屏+蓝牙）;50#单向鞍座（90鞍座）;无;无选装包;顶部及侧部导流罩;无;加强副梁;3/4;D50;7.5吨;11.00;钢轮辋;FHB400缓速器","sellInfo":{"downPrice":0.00,"downPriceCancel":0.00,"downPriceLeave":0.00,"isOnAccount":false,"logisticsStatus":"","onAccountCancel":0.00,"onAccountLeave":0.00,"others":"","singlePrice":360000.00,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"tailMoney":360000.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":360000.00,"truckStatus":0},"speedChangingBox":"16JSDX240TA（铝）","status":"2","submissionType":"0","truckCode":"V3ET","truckNational":0,"truckTypeId":59,"truckTypeName":"64QY","tyreType":"12R22.5-18PR","updateUser":170,"version":"复合版","wheelBase":"/"},{"behandAxle":"13T北奔双减桥","behandSpring":"/","cabType":"/","createDate":1648107372000,"createUser":81,"engineType":"WP13NG460E61","frame":"/","frontAxle":"/","frontSpring":"/","fuelTank":"1000L（LNG气瓶）","horsepower":"460","id":11112,"incomingInfo":{"createUser":0,"truckId":11112,"vin":"LBZ44DEB9MA004633"},"manufactorId":45,"marketType":"/","name":"北奔6x4","orderId":1441,"orderStrategy":"0","planningInfo":{"createUser":0,"planTime":1647273600000},"platetTypeId":7,"platetTypeName":"LNG牵引车","productTypeId":60,"productTypeName":"北奔","publicType":"ND4250BG6J7Z01","remark":"牵引车-复合;6×4/2;变速箱：16JSDX240TA（铝）；发动机：WP13NG460E61；12R22.5-18PR;13T北奔双减桥/4.2（ABS+轮间差速锁）;1350L（LNG气瓶）;智能包1（多功能方向盘+10.2寸彩色显示屏+蓝牙）;50#单向鞍座（90鞍座）;无;无选装包;顶部及侧部导流罩;无;加强副梁;3/4;D50;7.5吨;11.00;钢轮辋;FHB400缓速器","sellInfo":{"downPrice":0.00,"downPriceCancel":0.00,"downPriceLeave":0.00,"isOnAccount":false,"logisticsStatus":"","onAccountCancel":0.00,"onAccountLeave":0.00,"others":"","singlePrice":360000.00,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"tailMoney":360000.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":360000.00,"truckStatus":0},"speedChangingBox":"16JSDX240TA（铝）","status":"2","submissionType":"0","truckCode":"V3ET","truckNational":0,"truckTypeId":59,"truckTypeName":"64QY","tyreType":"12R22.5-18PR","updateUser":170,"version":"复合版","wheelBase":"/"},{"behandAxle":"13T北奔双减桥","behandSpring":"/","cabType":"/","createDate":1648107372000,"createUser":81,"engineType":"WP13NG460E61","frame":"/","frontAxle":"/","frontSpring":"/","fuelTank":"1000L（LNG气瓶）","horsepower":"460","id":11113,"incomingInfo":{"createUser":0,"truckId":11113,"vin":"LBZ44DEB0MA004634"},"manufactorId":45,"marketType":"/","name":"北奔6x4","orderId":1441,"orderStrategy":"0","planningInfo":{"createUser":0,"planTime":1647273600000},"platetTypeId":7,"platetTypeName":"LNG牵引车","productTypeId":60,"productTypeName":"北奔","publicType":"ND4250BG6J7Z01","remark":"牵引车-复合;6×4/2;变速箱：16JSDX240TA（铝）；发动机：WP13NG460E61；12R22.5-18PR;13T北奔双减桥/4.2（ABS+轮间差速锁）;1350L（LNG气瓶）;智能包1（多功能方向盘+10.2寸彩色显示屏+蓝牙）;50#单向鞍座（90鞍座）;无;无选装包;顶部及侧部导流罩;无;加强副梁;3/4;D50;7.5吨;11.00;钢轮辋;FHB400缓速器","sellInfo":{"downPrice":0.00,"downPriceCancel":0.00,"downPriceLeave":0.00,"isOnAccount":false,"logisticsStatus":"","onAccountCancel":0.00,"onAccountLeave":0.00,"others":"","singlePrice":360000.00,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"tailMoney":360000.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":360000.00,"truckStatus":0},"speedChangingBox":"16JSDX240TA（铝）","status":"2","submissionType":"0","truckCode":"V3ET","truckNational":0,"truckTypeId":59,"truckTypeName":"64QY","tyreType":"12R22.5-18PR","updateUser":170,"version":"复合版","wheelBase":"/"}],"success":true,"truckInfo":{11110:{"bhOrderNo":"/","createTime":1648114215000,"createUser":81,"downPrice":"0.00","engineNumber":"/","id":7752,"incomingTime":1647273600000,"manufactorContactNo":"2022-03-0005","manufactorContactPrice":"360000","manufactorName":"包头市瑞顺吉贸易有限责任公司","orderId":"D20220324003","serialNumber":"LA011868","tailMoney":"360000.00","truckId":11110,"vin":"LBZ44DEB7LA011868"},11111:{"bhOrderNo":"/","createTime":1648114215000,"createUser":81,"downPrice":"0.00","engineNumber":"/","id":7753,"incomingTime":1647273600000,"manufactorContactNo":"2022-03-0005","manufactorContactPrice":"360000","manufactorName":"包头市瑞顺吉贸易有限责任公司","orderId":"D20220324003","serialNumber":"MA004632","tailMoney":"360000.00","truckId":11111,"vin":"LBZ44DEB7MA004632"},11112:{"bhOrderNo":"/","createTime":1648114215000,"createUser":81,"downPrice":"0.00","engineNumber":"/","id":7754,"incomingTime":1647273600000,"manufactorContactNo":"2022-03-0005","manufactorContactPrice":"360000","manufactorName":"包头市瑞顺吉贸易有限责任公司","orderId":"D20220324003","serialNumber":"MA004633","tailMoney":"360000.00","truckId":11112,"vin":"LBZ44DEB9MA004633"},11113:{"bhOrderNo":"/","createTime":1648114215000,"createUser":81,"downPrice":"0.00","engineNumber":"/","id":7755,"incomingTime":1647273600000,"manufactorContactNo":"2022-03-0005","manufactorContactPrice":"360000","manufactorName":"包头市瑞顺吉贸易有限责任公司","orderId":"D20220324003","serialNumber":"MA004634","tailMoney":"360000.00","truckId":11113,"vin":"LBZ44DEB0MA004634"}},"revisionInfo":{}} 

```
#### 查看订单
```
URI_S_20220611140908995: http://127.0.0.1:8082/order/goDetail,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"id":["1441"]}, body: [1441,{}]

select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, ( SELECT manufactor_contact_no FROM planning_info WHERE truck_id = null) AS manufactor_contact_no, ( SELECT manufactor_name FROM planning_info WHERE truck_id = null) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no WHERE oi.id = 1441 order by oi.create_time desc, oi.order_no desc;
-- Parameters: null, null, 1441(Long)

SELECT ii.serial_number serialNumber, oi.submit_client submitClient, rci.house_name houseName, rci.address address, rci.receive_name receiveName, rci.receive_phone receivePhone, pli.manufactor_name manufactorName, pli.bh_order_no bhOrderNo, pli.manufactor_contact_no manufactorContactNo from order_info oi LEFT JOIN order_truck ot on ot.order_id = oi.id LEFT JOIN repertory_info ri on ot.id = ri.truck_id LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN receive_info rci on rci.id = ri.receive_id LEFT JOIN planning_info pli on pli.truck_id = ot.id where oi.id = 1441 
-- Parameters: 1441(Long)

select id, submission_no, name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_code, version, market_type, truck_type_name, truck_type_id, public_type, engine_type, horsepower, wheel_base, cab_type, speed_changing_box, frame, front_axle, behand_axle, front_spring, behand_spring, fuel_tank, tyre_type, number, standard_price, adjust_price, price, total_price, end_price, down_price, remark, status, create_user, create_date, update_user, update_date, work_flow_node, agency_code, current_step, current_check_user, basic_config_name, matching_information, contact_total_price, contact_single_price, current_flow_position,intention_no, source,intention_id,is_reform,choose_config,discount_rate,discount_price,agency_client_id, sub_single_price,sub_down_price,sub_total_price,manufactor_id,order_strategy,so_type,reform_price,fare,submission_type,cab_color from submission where submission_no = 'T20220324004' LIMIT 1 
-- Parameters: T20220324004(String)
-- 提报附件
select DISTINCT file_path from file_repository where apply_no='T20220324004' and subject_type = '8' 
-- Parameters: T20220324004(String), 8(String)

URI_E_20220611140908995: http://127.0.0.1:8082/order/goDetail, time: 57, 
	|--reponse: "order/detail" 
```

#### 查看提报单
```
URI_S_20220611141022984: http://127.0.0.1:8082/submission/viewByNo,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"submissionNo":["T20220324004"]}, body: ["T20220324004",null,{}]

-- 提报订单消息
select id, submission_no, name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_code, version, market_type, truck_type_name, truck_type_id, public_type, engine_type, horsepower, wheel_base, cab_type, speed_changing_box, frame, front_axle, behand_axle, front_spring, behand_spring, fuel_tank, tyre_type, number, standard_price, adjust_price, price, total_price, end_price, down_price, remark, status, create_user, create_date, update_user, update_date, work_flow_node, agency_code, current_step, current_check_user, basic_config_name, matching_information, contact_total_price, contact_single_price, current_flow_position,intention_no, source,intention_id,is_reform,choose_config,discount_rate,discount_price,agency_client_id, sub_single_price,sub_down_price,sub_total_price,manufactor_id,order_strategy,so_type,reform_price,fare,submission_type,cab_color from submission where submission_no = 'T20220324004' LIMIT 1 
-- Parameters: T20220324004(String)

-- 提报附件
select DISTINCT file_path from file_repository where apply_no='T20220324004' and subject_type = '8' 
-- Parameters: T20220324004(String), 8(String)

-- 【提报单改价】
select id, submission_no, order_no, reason, original_price, price, create_user, create_time from price_revision_submission where submission_no = 'T20220324004' 
-- Parameters: T20220324004(String)

-- 选配信息
select s.id, s.selection_id, s.selection_detail_id, s.submission_no, s.selection_price,bs.project_name,bd.selection_content,bd.selection_unit,bd.remark from submission_selection s left join basic_config_selection bs on bs.id = s.selection_id left join basic_config_selection_detail bd on bd.id = s.selection_detail_id where s.submission_no = 'T20220324004' 
-- Parameters: T20220324004(String)

URI_E_20220611141022984: http://127.0.0.1:8082/submission/viewByNo, time: 76, 
	|--reponse: "submission/view" 
```


### 排产登记

#### 待排产列表
- http://127.0.0.1:8081/plan/list
```
URI_S_20220531124232890: /plan/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor WHERE company_type = ? order by create_time desc 
==> Parameters: 1(String)
<==      Total: 41
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no LEFT JOIN order_truck ot ON ot.order_id = oi.id WHERE ot.status = ?) table_count 
==> Parameters: null, null, 0(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no left join order_truck ot on ot.order_id = oi.id WHERE ot.status = ? order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: null, null, 0(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531124232890: /plan/list, time: 110, 
	|--reponse: "plan/list" 

```
#### 已排产列表
- http://127.0.0.1:8081/plan/planedList
```
URI_S_20220531124300444: /plan/planedList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM planning_info pli LEFT JOIN order_truck ot ON ot.id = pli.truck_id LEFT JOIN incoming_info ii ON ot.id = ii.truck_id LEFT JOIN order_info oi ON oi.order_no = pli.order_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT pli.id id,pli.plan_time planTime,pli.manufactor_contact_no manufactorContactNo,pli.manufactor_contact_price manufactorContactPrice, pli.manufactor_contact_fare manufactorContactFare,pli.manufactor_name manufactorName,pli.manufactor_contact_path manufactorContactPath, pli.order_id orderId,pli.bh_order_no bhOrderNo, ot.product_type_name productTypeName,ot.platet_type_name platetTypeName,ot.truck_code truckCode,ot.truck_type_name truckTypeName, sa.agency_simple_name as submitClient,ot.status as truckStatus,oi.contact_no as contactNo from planning_info pli LEFT JOIN order_truck ot on ot.id = pli.truck_id LEFT JOIN incoming_info ii on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.order_no = pli.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code order by pli.create_time desc,pli.id,pli.bh_order_no desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531124300444: /plan/planedList, time: 204, 
	|--reponse: "plan/planed_list" 

```
### 采购车辆入库登记
#### 待入库车辆列表
- http://127.0.0.1:8081/incoming/list
```
URI_S_20220531124040270: /incoming/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no LEFT JOIN order_truck ot ON ot.order_id = oi.id WHERE ot.status = ?) table_count 
==> Parameters: null, null, 1(String)
<==      Total: 1
URI_E_20220531124040270: /incoming/list, time: 49, 
	|--reponse: "incoming/list" 

```
#### 已入库车辆列表
- http://127.0.0.1:8081/incoming/incomingList
```
URI_S_20220531124117605: /incoming/incomingList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ot.product_type_name, ot.platet_type_name, ot.truck_type_name, sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, ii.order_id, ii.incoming_time, ii.vin, ii.serial_number, ii.engine_number, ii.id, pli.bh_order_no, pli.manufactor_contact_no FROM incoming_info ii LEFT JOIN order_truck ot ON ot.id = ii.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN planning_info pli ON pli.truck_id = ot.id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT distinct ot.product_type_name,ot.platet_type_name,ot.truck_type_name, sa.agency_simple_name agency_name,sa.agency_code_ours agency_code, ii.order_id,ii.incoming_time,ii.vin,ii.serial_number,ii.engine_number,ii.id, pli.bh_order_no,pli.manufactor_contact_no from incoming_info ii LEFT JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN planning_info pli on pli.truck_id = ot.id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code order by ii.incoming_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531124117605: /incoming/incomingList, time: 412, 
	|--reponse: "incoming/incoming_list" 

```


### 发车申请/收车登记
#### 发车申请
- http://127.0.0.1:8081/trans/sendList
    - com.clgg.modules.system.controller.TransceiverController#sendApply
```
-- 获取经销商信息（提报方）
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0" ;
--  Parameters: 0(String)

-- 获取产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取结果
SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = null) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = null) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy, th.transfers_no FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no LEFT JOIN transfers_history th ON th.order_id = oi.id LEFT JOIN order_truck ot ON ot.order_id = oi.id WHERE ((ot.status = '2') OR transfers_no IS NOT NULL)) table_count ;
-- Parameters: null, null, 2(String)
select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = null) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = null) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy ,th.transfers_no from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no left join transfers_history th on th.order_id = oi.id left join order_truck ot on ot.order_id = oi.id WHERE (( ot.status = '2' ) or transfers_no is not null) order by oi.create_time desc,oi.order_no desc limit 0,10;
-- Parameters: null, null, 2(String), 0(Integer), 10(Integer)

return "trans/send_list";
templates/trans/send_list.html
```
#### 收车登记
- http://127.0.0.1:8081/trans/sendSub?status=4
    - com.clgg.modules.system.controller.TransceiverController#sendSub
```
-- 获取经销商信息（提报方）
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0" ;
-- Parameters: 0(String)

-- 获取产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;
-- Parameters: 0(String)

-- 获取结果
SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE ot.status = '4' AND ri.status = '0') table_count 
-- Parameters: 4(String)

return "trans/send_sub_list";
templates/trans/send_sub_list.html
```

#### 发车驳回
- http://127.0.0.1:8081/trans/sendSub?transStatus=1
```
SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE ri.status = '1') table_count ;
-- Parameters: 1(String)
```
#### 收车驳回
- http://127.0.0.1:8081/trans/sendSub?transStatus=3

```
SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE ri.status = '3') table_count ;
-- Parameters: 3(String)

select DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image,ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time,sm.submission_type,ri.check_agency_code from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE ri.status = 3 order by ri.create_time desc limit 0,10 ;
-- Parameters: 3(String), 0(Integer), 10(Integer)
```
#### 已完成
- http://127.0.0.1:8081/trans/sendSub?status=6
```
SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE ot.status = '6' AND ri.status = '2') table_count ;
-- Parameters: 6(String), 2(String)

select DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image,ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time,sm.submission_type,ri.check_agency_code from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE ot.status = '6' and ri.status = '2' order by ri.create_time desc limit 0,10 ;
-- Parameters: 6(String), 2(String), 0(Integer), 10(Integer)
```



### 发车确认/收车确认
#### 发车确认
- http://127.0.0.1:8081/trans/confirmList?status=3&pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&sendNumber=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531115538915: /trans/confirmList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["3"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"sendNumber":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = '0' 
==> Parameters: 0(String), 3(String)
<==      Total: 1
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = '0' 
==> Parameters: 0(String), 5(String)
<==      Total: 1
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE sm.submission_type = ? AND ot.status = ? AND ri.status = '0') table_count 
==> Parameters: 0(String), 3(String)
<==      Total: 1
URI_E_20220531115538915: /trans/confirmList, time: 107, 
	|--reponse: "trans/confirm_list" 

```
#### 收车确认
- http://127.0.0.1:8081/trans/confirmList?status=5&pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&sendNumber=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531115609137: /trans/confirmList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["5"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"sendNumber":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = '0' 
==> Parameters: 0(String), 3(String)
<==      Total: 1
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = '0' 
==> Parameters: 0(String), 5(String)
<==      Total: 1
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE sm.submission_type = ? AND ot.status = ? AND ri.status = '0') table_count 
==> Parameters: 0(String), 5(String)
<==      Total: 1
URI_E_20220531115609137: /trans/confirmList, time: 113, 
	|--reponse: "trans/confirm_list" 

```
#### 已完成
- http://127.0.0.1:8081/trans/confirmList?status=6&pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&sendNumber=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531115636932: /trans/confirmList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["6"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"sendNumber":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = ? 
==> Parameters: 0(String), 3(String), 2(String)
<==      Total: 1
==>  Preparing: select count(0) count from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = ? 
==> Parameters: 0(String), 5(String), 2(String)
<==      Total: 1
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image, ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time, sm.submission_type, ri.check_agency_code FROM repertory_info ri LEFT JOIN sys_agency sa ON sa.agency_code_ours = ri.apply_code LEFT JOIN order_truck ot ON ot.id = ri.truck_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission sm ON sm.submission_no = oi.submission_no WHERE sm.submission_type = ? AND ot.status = ? AND ri.status = ?) table_count 
==> Parameters: 0(String), 6(String), 2(String)
<==      Total: 1
==>  Preparing: select DISTINCT ri.send_number, ri.create_time, ri.except_time, ri.send_id, ri.receive_id, ri.receive_time, ri.receive_image,ri.create_user, ri.apply_code, ri.status, ri.reason, sa.agency_name, ri.real_send_time,sm.submission_type,ri.check_agency_code from repertory_info ri left join sys_agency sa on sa.agency_code_ours = ri.apply_code left join order_truck ot on ot.id = ri.truck_id left join order_info oi on oi.id = ot.order_id left join submission sm on sm.submission_no = oi.submission_no WHERE sm.submission_type = ? and ot.status = ? and ri.status = ? order by ri.create_time desc limit ?,? 
==> Parameters: 0(String), 6(String), 2(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531115636932: /trans/confirmList, time: 148, 
	|--reponse: "trans/confirm_list" 

```



### 采购发票管理-B
- http://127.0.0.1:8081/bill/list
```
URI_S_20220531115118933: /bill/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no) table_count 
==> Parameters: null, null
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: null, null, 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
URI_E_20220531115118933: /bill/list, time: 318, 
	|--reponse: "bill/list" 
```

### 采购发票管理列表-B
- http://127.0.0.1:8081/bill/viewList
```
URI_S_20220531115026988: /bill/viewList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM bill_register br LEFT JOIN sys_agency sa ON sa.tax_number = br.invoice_rate_no WHERE (br.apply_invoice_type IS NULL OR br.apply_invoice_type = 0) 
==> Parameters: 
<==      Total: 1
==>  Preparing: select br.id, br.order_no, br.apply_no, br.applyer, br.invoice_company, br.project_name, br.invoice_type, br.invoice_rate, br.invoice_money, br.capitalization,br.lowercase, br.invoice_for_company, br.invoice_rate_no, br.invoice_bank, br.invoice_bank_account, br.invoice_address, br.invoice_phone, br.invoice_remark, br.create_user, br.create_time, br.update_user, br.update_time, br.submission_no, br.contact_no, br.invoice_rate_money from bill_register br left join sys_agency sa on sa.tax_number = br.invoice_rate_no WHERE (br.apply_invoice_type is null or br.apply_invoice_type=0) order by create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531115026988: /bill/viewList, time: 78, 
	|--reponse: "bill/viewList" 

```


### 采购发票管理-C
#### 申请列表
- http://127.0.0.1:8081/invoice/apply
```
URI_S_20220531114504467: /invoice/apply,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE ot.status IN (?, ?, ?, ?, ?, ?)) table_count 
==> Parameters: 2(String), 3(String), 4(String), 5(String), 6(String), 7(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE ot.status in ( ? , ? , ? , ? , ? , ? ) order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: 2(String), 3(String), 4(String), 5(String), 6(String), 7(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531114504467: /invoice/apply, time: 305, 
	|--reponse: "invoice/apply" 
```
#### 待审核
- http://127.0.0.1:8081/invoice/check?currentCheckStatus=%E5%BE%85%E5%AE%A1%E6%A0%B8
```
URI_S_20220531114538949: /invoice/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["待审核"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? AND i.current_check_user = ?) table_count 
==> Parameters: 待审核(String), #1#(String)
<==      Total: 1
URI_E_20220531114538949: /invoice/check, time: 95, 
	|--reponse: "invoice/invoice_check" 

```
#### 已驳回
- http://127.0.0.1:8081/invoice/check?currentCheckStatus=%E5%B7%B2%E9%A9%B3%E5%9B%9E
```
URI_S_20220531114604401: /invoice/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已驳回"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已驳回(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已驳回(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220311001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220311001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220124001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220124001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211123001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20211123001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211122001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20211122001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211118001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20211118001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211012001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20211012001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709009(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20210709009(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709008(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20210709008(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210630002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20210630002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210628005(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20210628005(String)
<==      Total: 1
URI_E_20220531114604401: /invoice/check, time: 606, 
	|--reponse: "invoice/invoice_check" 
```
#### 待提交
- http://127.0.0.1:8081/invoice/check?currentCheckStatus=%E5%BE%85%E6%8F%90%E4%BA%A4
```
URI_S_20220531114707732: /invoice/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["待提交"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 待提交(String)
<==      Total: 1
URI_E_20220531114707732: /invoice/check, time: 61, 
	|--reponse: "invoice/invoice_check" 

```
#### 已完成
- http://127.0.0.1:8081/invoice/check?currentCheckStatus=%E5%B7%B2%E5%AE%8C%E6%88%90
```
URI_S_20220531114747896: /invoice/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已完成"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已完成(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已完成(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220427001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220427001(String)
<==      Total: 1
URI_E_20220531114747896: /invoice/check, time: 1111, 
	|--reponse: "invoice/invoice_check" 

```
#### 审批/登记(全部)列表
- http://127.0.0.1:8081/invoice/check
```
URI_S_20220531114828435: /invoice/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no order by i.create_time DESC limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220526001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220526001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
URI_E_20220531114828435: /invoice/check, time: 693, 
	|--reponse: "invoice/invoice_check" 

```

### 采购发票管理列表-C

#### 待审核
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%BE%85%E5%AE%A1%E6%A0%B8
```
URI_S_20220531114051441: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["待审核"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? AND i.current_check_user = ?) table_count 
==> Parameters: 待审核(String), #1#(String)
<==      Total: 1
URI_E_20220531114051441: /invoice/list, time: 68, 
	|--reponse: "invoice/invoice_list" 

```
#### 已驳回
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%B7%B2%E9%A9%B3%E5%9B%9E
```
URI_S_20220531114115635: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已驳回"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已驳回(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已驳回(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220311001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220311001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220124001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220124001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211123001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211123001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211122001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211122001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211118001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211118001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211012001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211012001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709009(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210709009(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709008(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210709008(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210630002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210630002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210628005(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210628005(String)
<==      Total: 1
URI_E_20220531114115635: /invoice/list, time: 508, 
	|--reponse: "invoice/invoice_list" 
```
#### 已完成
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%B7%B2%E5%AE%8C%E6%88%90
```
URI_S_20220531114150399: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已完成"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已完成(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已完成(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220427001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220427001(String)
<==      Total: 1
URI_E_20220531114150399: /invoice/list, time: 473, 
	|--reponse: "invoice/invoice_list" 

```
#### 暂估列表
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=estimate
```
URI_S_20220531114216438: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["estimate"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE iad.invoice_type = "2") table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE iad.invoice_type = "2" order by i.create_time DESC limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210927004(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210927004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506024(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506024(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506013(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506013(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506012(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506012(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506011(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506011(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506004(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506003(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506002(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210331021(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210331021(String)
<==      Total: 1
URI_E_20220531114216438: /invoice/list, time: 567, 
	|--reponse: "invoice/invoice_list" 

```


### 采购合同管理
- http://127.0.0.1:8081/contract/list?dataType=0
```
URI_S_20220531113822102: /contract/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataType":["0"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT c.id, c.submission_no, c.contact_no, c.contact_file, c.contact_status, c.create_user, c.create_time, c.update_user, c.update_time, o.submit_time submitTime, say.agency_name submitClient, ot.product_type_name productTypeName, ot.platet_type_name platetTypeName, o.order_no orderNo, ot.public_type publicType, ot.truck_code truckCode, count(DISTINCT ot.id) numbers, SUM(otsi.single_price) contractPrice, SUM(otsi.single_price) totalPrice, sac.client_name sales_target, c.sales_target_id FROM contact_manager c LEFT JOIN contact_truck ct ON ct.contact_id = c.id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ct.truck_id LEFT JOIN order_truck ot ON ot.id = ct.truck_id LEFT JOIN order_info o ON o.id = otsi.order_id LEFT JOIN sys_agency_client sac ON sac.id = c.sales_target_id LEFT JOIN sys_agency say ON say.agency_code_ours = c.down_agency_code WHERE otsi.manufactor_id = 1 AND c.down_agency_code = ? GROUP BY c.contact_no) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT c.id, c.submission_no, c.contact_no, c.contact_file, c.contact_status, c.create_user, c.create_time, c.update_user, c.update_time, o.submit_time submitTime, say.agency_name submitClient, ot.product_type_name productTypeName, ot.platet_type_name platetTypeName, o.order_no orderNo, ot.public_type publicType, ot.truck_code truckCode, count(distinct ot.id) numbers, SUM(otsi.single_price) contractPrice, SUM(otsi.single_price) totalPrice, sac.client_name sales_target, c.sales_target_id FROM contact_manager c LEFT JOIN contact_truck ct ON ct.contact_id = c.id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ct.truck_id LEFT JOIN order_truck ot ON ot.id = ct.truck_id LEFT JOIN order_info o ON o.id = otsi.order_id LEFT JOIN sys_agency_client sac ON sac.id = c.sales_target_id LEFT JOIN sys_agency say ON say.agency_code_ours = c.down_agency_code WHERE otsi.manufactor_id = 1 and c.down_agency_code = ? group by c.contact_no order by o.submit_time desc,c.contact_no desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531113822102: /contract/list, time: 134, 
	|--reponse: "contract/contract_list" 

```


### 付款申请
#### 待审核

- http://127.0.0.1:8081/payment/index
```
URI_S_20220531113321086: /payment/index,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["0"],"pageNum":["1"],"pageSize":["10"],"payeeName":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select * from sys_agency_payment 
==> Parameters: 
<==      Total: 2
==>  Preparing: SELECT count(0) FROM payment_info WHERE check_status = ? 
==> Parameters: 0(String)
<==      Total: 1
==>  Preparing: select id, apply_no, payer_type, payer_code, payer_name,payer_bank,payer_bank_account, payee_type, payee_code, payee_name, payee_bank, payee_bank_account, amount, truck_number, remark, payment_time, check_user, check_user_name, check_status, create_time, create_user, update_time, update_user,payment_type,payment_code,payment_purpose from payment_info WHERE check_status = ? order by id desc limit ?,? 
==> Parameters: 0(String), 0(Integer), 10(Integer)
<==      Total: 1
==>  Preparing: select id, agency_code, bank_name, bank_account, create_user, create_time, update_user, update_time,bank_subject,bank_subject_no,bank_code,bank_fullName from sys_agency_bank where agency_code = ? order by create_time asc 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
URI_E_20220531113321086: /payment/index, time: 74, 
	|--reponse: "payment/payment_list" 

```
#### 已完成
- http://127.0.0.1:8081/payment/index
```
URI_S_20220531113531520: /payment/index,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["1"],"pageNum":["1"],"pageSize":["10"],"payeeName":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select * from sys_agency_payment 
==> Parameters: 
<==      Total: 2
==>  Preparing: SELECT count(0) FROM payment_info WHERE check_status = ? 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select id, apply_no, payer_type, payer_code, payer_name,payer_bank,payer_bank_account, payee_type, payee_code, payee_name, payee_bank, payee_bank_account, amount, truck_number, remark, payment_time, check_user, check_user_name, check_status, create_time, create_user, update_time, update_user,payment_type,payment_code,payment_purpose from payment_info WHERE check_status = ? order by id desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select id, agency_code, bank_name, bank_account, create_user, create_time, update_user, update_time,bank_subject,bank_subject_no,bank_code,bank_fullName from sys_agency_bank where agency_code = ? order by create_time asc 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
URI_E_20220531113531520: /payment/index, time: 91, 
	|--reponse: "payment/payment_list" 
```
#### 已驳回
- http://127.0.0.1:8081/payment/index
```
URI_S_20220531113700080: /payment/index,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["2"],"pageNum":["1"],"pageSize":["10"],"payeeName":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select * from sys_agency_payment 
==> Parameters: 
<==      Total: 2
==>  Preparing: SELECT count(0) FROM payment_info WHERE check_status = ? 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select id, apply_no, payer_type, payer_code, payer_name,payer_bank,payer_bank_account, payee_type, payee_code, payee_name, payee_bank, payee_bank_account, amount, truck_number, remark, payment_time, check_user, check_user_name, check_status, create_time, create_user, update_time, update_user,payment_type,payment_code,payment_purpose from payment_info WHERE check_status = ? order by id desc limit ?,? 
==> Parameters: 2(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select id, agency_code, bank_name, bank_account, create_user, create_time, update_user, update_time,bank_subject,bank_subject_no,bank_code,bank_fullName from sys_agency_bank where agency_code = ? order by create_time asc 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
URI_E_20220531113700080: /payment/index, time: 240, 
	|--reponse: "payment/payment_list" 
```

### 应付车款挂账管理
- http://127.0.0.1:8081/onAccount/applyList?listType=0
```
URI_S_20220531113113820: /onAccount/applyList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"listType":["0"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.agency_code = ? order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531113113820: /onAccount/applyList, time: 107, 
	|--reponse: "onAccount/applyList" 

```

### 应付车款挂账申请列表

#### 全部
- http://127.0.0.1:8081/onAccount/checkList?currentCheckStatus=&listType=0
```
URI_S_20220531112923387: /onAccount/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":[""],"listType":["0"]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT oa.id, oa.apply_no, oa.vehicle_count, oa.apply_status, oa.create_user, oa.create_time, oa.deal_user, oa.agency_code, oa.submit_client, oa.on_account_date, oa.total_on_account_money, oa.total_contract_money, oa.day_number, oa.remark, contact_no, oa.current_step_order, oa.current_check_user, oa.current_position, oa.current_check_status, oa.apply_type, oa.apply_to FROM on_account_apply oa LEFT JOIN on_account_apply_detail oaad ON oaad.apply_no = oa.apply_no LEFT JOIN incoming_info ii ON ii.truck_id = oaad.truck_id WHERE oa.agency_code = ? AND oa.apply_to = ? GROUP BY oa.apply_no) table_count 
==> Parameters: base(String), 0(String)
<==      Total: 1
==>  Preparing: select oa.id, oa.apply_no, oa.vehicle_count, oa.apply_status, oa.create_user, oa.create_time, oa.deal_user, oa.agency_code, oa.submit_client, oa.on_account_date, oa.total_on_account_money, oa.total_contract_money, oa.day_number, oa.remark,contact_no, oa.current_step_order, oa.current_check_user, oa.current_position, oa.current_check_status,oa.apply_type,oa.apply_to from on_account_apply oa left join on_account_apply_detail oaad on oaad.apply_no = oa.apply_no left join incoming_info ii on ii.truck_id = oaad.truck_id WHERE oa.agency_code = ? and oa.apply_to = ? group by oa.apply_no order by oa.create_time desc limit ?,? 
==> Parameters: base(String), 0(String), 0(Integer), 10(Integer)
<==      Total: 7
URI_E_20220531112923387: /onAccount/checkList, time: 20, 
	|--reponse: "onAccount/checkList" 

```
#### 待审核
- http://127.0.0.1:8081/onAccount/checkList?currentCheckStatus=%E5%BE%85%E5%AE%A1%E6%A0%B8&listType=0
```
URI_S_20220531113010521: /onAccount/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["待审核"],"listType":["0"]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT oa.id, oa.apply_no, oa.vehicle_count, oa.apply_status, oa.create_user, oa.create_time, oa.deal_user, oa.agency_code, oa.submit_client, oa.on_account_date, oa.total_on_account_money, oa.total_contract_money, oa.day_number, oa.remark, contact_no, oa.current_step_order, oa.current_check_user, oa.current_position, oa.current_check_status, oa.apply_type, oa.apply_to FROM on_account_apply oa LEFT JOIN on_account_apply_detail oaad ON oaad.apply_no = oa.apply_no LEFT JOIN incoming_info ii ON ii.truck_id = oaad.truck_id WHERE oa.agency_code = ? AND oa.current_check_status REGEXP ? AND oa.current_check_user = ? AND oa.apply_to = ? GROUP BY oa.apply_no) table_count 
==> Parameters: base(String), 待审核(String), #1#(String), 0(String)
<==      Total: 1
URI_E_20220531113010521: /onAccount/checkList, time: 48, 
	|--reponse: "onAccount/checkList" 

```

## 销售管理


### 合格证申请
- http://127.0.0.1:8081/certificate/apply?pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531112226891: /certificate/apply,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no) table_count 
==> Parameters: null, null
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: null, null, 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531112226891: /certificate/apply, time: 159, 
	|--reponse: "certificate/list" 

```


### 合格证审核列表

#### 全部
- http://127.0.0.1:8081/certificate/checkList?pageNum=&pageSize=&applyNo=&serialNumber=&contactNo=&currentCheckStatus=&startDate=&endDate=&jumpNumber=
```
URI_S_20220531112109615: /certificate/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":[""],"applyNo":[""],"serialNumber":[""],"contactNo":[""],"currentCheckStatus":[""],"startDate":[""],"endDate":[""],"jumpNumber":[""]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ca.*, s.submission_type FROM certificate_apply ca LEFT JOIN certificate_apply_detail cad ON ca.apply_no = cad.apply_no LEFT JOIN submission s ON s.submission_no = cad.submission_no) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT ca.*, s.submission_type from certificate_apply ca LEFT JOIN certificate_apply_detail cad on ca.apply_no=cad.apply_no left join submission s on s.submission_no = cad.submission_no order by ca.apply_status asc,ca.create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531112109615: /certificate/checkList, time: 35, 
	|--reponse: "certificate/checkListBase" 
```
### 合格证登记列表

#### 全部
- http://127.0.0.1:8081/certificate/list
```
URI_S_20220531111951881: /certificate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ca.*, cad.certificate_no, cad.issue_date FROM certificate_apply ca LEFT JOIN certificate_apply_detail cad ON ca.apply_no = cad.apply_no WHERE ca.apply_status IN (1, 2)) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT ca.*,cad.certificate_no,cad.issue_date from certificate_apply ca LEFT JOIN certificate_apply_detail cad on ca.apply_no=cad.apply_no WHERE ca.apply_status in (1,2) order by ca.create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531111951881: /certificate/list, time: 29, 
	|--reponse: "certificate/applyListBase" 

```
#### 待登记
- http://127.0.0.1:8081/certificate/list?applyStatus=1
```
URI_S_20220531111843166: /certificate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"applyStatus":["1"]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ca.*, cad.certificate_no, cad.issue_date FROM certificate_apply ca LEFT JOIN certificate_apply_detail cad ON ca.apply_no = cad.apply_no WHERE ca.apply_status = ?) table_count 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select DISTINCT ca.*,cad.certificate_no,cad.issue_date from certificate_apply ca LEFT JOIN certificate_apply_detail cad on ca.apply_no=cad.apply_no WHERE ca.apply_status = ? order by ca.create_time desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531111843166: /certificate/list, time: 62, 
	|--reponse: "certificate/applyListBase" 
```
#### 已登记
- http://127.0.0.1:8081/certificate/list?applyStatus=2
```
URI_S_20220531111758912: /certificate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"applyStatus":["2"]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ca.*, cad.certificate_no, cad.issue_date FROM certificate_apply ca LEFT JOIN certificate_apply_detail cad ON ca.apply_no = cad.apply_no WHERE ca.apply_status = ?) table_count 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select DISTINCT ca.*,cad.certificate_no,cad.issue_date from certificate_apply ca LEFT JOIN certificate_apply_detail cad on ca.apply_no=cad.apply_no WHERE ca.apply_status = ? order by ca.create_time desc limit ?,? 
==> Parameters: 2(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531111758912: /certificate/list, time: 46, 
	|--reponse: "certificate/applyListBase" 
```

### 开票价更改申请

- http://127.0.0.1:8081/price/revision/index?pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&startTime=&endTime=&serialNumber=&contactNo=
```
URI_S_20220531111138901: /price/revision/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"startTime":[""],"endTime":[""],"serialNumber":[""],"contactNo":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531111138901: /price/revision/index, time: 103, 
	|--reponse: "price_resivison/index" 
```

### 开票价更改申请列表 


- http://127.0.0.1:8081/price/revision/check?pageNum=&pageSize=10&currentCheckStatus=&agencyCode=&applyNo=&serialNumber=&contactNo=
```
URI_S_20220531110618665: /price/revision/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"currentCheckStatus":[""],"agencyCode":[""],"applyNo":[""],"serialNumber":[""],"contactNo":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE (agency_code_ours = 'base' or father = 'base') and status = "0" 
==> Parameters: 
<==      Total: 21
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT pa.id, pa.apply_no, pa.numbers, pa.remark, pa.reason, pa.agency_code, pa.create_user, pa.create_time, pa.update_user, pa.update_time, pa.status, sa.agency_name, s.submission_type, GROUP_CONCAT(ii.serial_number) serial_number, oi.contact_no, pa.current_check_status, pa.current_check_user FROM price_revision_apply pa LEFT JOIN sys_agency sa ON sa.agency_code_ours = pa.agency_code LEFT JOIN price_revision_truck prt ON pa.apply_no = prt.apply_no LEFT JOIN incoming_info ii ON prt.truck_id = ii.truck_id LEFT JOIN order_info oi ON prt.order_no = oi.order_no LEFT JOIN submission s ON s.submission_no = prt.submission_no GROUP BY pa.id) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT pa.id, pa.apply_no, pa.numbers, pa.remark, pa.reason, pa.agency_code, pa.create_user, pa.create_time, pa.update_user, pa.update_time,pa.status, sa.agency_name, s.submission_type,GROUP_CONCAT(ii.serial_number) serial_number,oi.contact_no,pa.current_check_status,pa.current_check_user from price_revision_apply pa left join sys_agency sa on sa.agency_code_ours = pa.agency_code LEFT JOIN price_revision_truck prt on pa.apply_no=prt.apply_no LEFT JOIN incoming_info ii on prt.truck_id=ii.truck_id LEFT JOIN order_info oi on prt.order_no = oi.order_no left join submission s on s.submission_no = prt.submission_no group by pa.id order by pa.create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531110618665: /price/revision/check, time: 185, 
	|--reponse: "price_resivison/check" 
```
#### 待审核
- http://127.0.0.1:8081/price/revision/check?pageNum=&pageSize=10&currentCheckStatus=%E5%AE%A1%E6%A0%B8%E4%B8%AD&agencyCode=&applyNo=&serialNumber=&contactNo=
```
URI_S_20220531110748502: /price/revision/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"currentCheckStatus":["审核中"],"agencyCode":[""],"applyNo":[""],"serialNumber":[""],"contactNo":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE (agency_code_ours = 'base' or father = 'base') and status = "0" 
==> Parameters: 
<==      Total: 21
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT pa.id, pa.apply_no, pa.numbers, pa.remark, pa.reason, pa.agency_code, pa.create_user, pa.create_time, pa.update_user, pa.update_time, pa.status, sa.agency_name, s.submission_type, GROUP_CONCAT(ii.serial_number) serial_number, oi.contact_no, pa.current_check_status, pa.current_check_user FROM price_revision_apply pa LEFT JOIN sys_agency sa ON sa.agency_code_ours = pa.agency_code LEFT JOIN price_revision_truck prt ON pa.apply_no = prt.apply_no LEFT JOIN incoming_info ii ON prt.truck_id = ii.truck_id LEFT JOIN order_info oi ON prt.order_no = oi.order_no LEFT JOIN submission s ON s.submission_no = prt.submission_no LEFT JOIN approval_manager am ON am.apply_no = pa.apply_no WHERE pa.status = ? AND am.current_check_user = ? GROUP BY pa.id) table_count 
==> Parameters: 审核中(String), 1(String)
<==      Total: 1
URI_E_20220531110748502: /price/revision/check, time: 38, 
	|--reponse: "price_resivison/check" 

```
#### 全部
- http://127.0.0.1:8081/price/revision/check?pageNum=&pageSize=10&currentCheckStatus=&agencyCode=&applyNo=&serialNumber=&contactNo=
```

URI_S_20220531110957759: /price/revision/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"currentCheckStatus":[""],"agencyCode":[""],"applyNo":[""],"serialNumber":[""],"contactNo":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE (agency_code_ours = 'base' or father = 'base') and status = "0" 
==> Parameters: 
<==      Total: 21
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT pa.id, pa.apply_no, pa.numbers, pa.remark, pa.reason, pa.agency_code, pa.create_user, pa.create_time, pa.update_user, pa.update_time, pa.status, sa.agency_name, s.submission_type, GROUP_CONCAT(ii.serial_number) serial_number, oi.contact_no, pa.current_check_status, pa.current_check_user FROM price_revision_apply pa LEFT JOIN sys_agency sa ON sa.agency_code_ours = pa.agency_code LEFT JOIN price_revision_truck prt ON pa.apply_no = prt.apply_no LEFT JOIN incoming_info ii ON prt.truck_id = ii.truck_id LEFT JOIN order_info oi ON prt.order_no = oi.order_no LEFT JOIN submission s ON s.submission_no = prt.submission_no GROUP BY pa.id) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT pa.id, pa.apply_no, pa.numbers, pa.remark, pa.reason, pa.agency_code, pa.create_user, pa.create_time, pa.update_user, pa.update_time,pa.status, sa.agency_name, s.submission_type,GROUP_CONCAT(ii.serial_number) serial_number,oi.contact_no,pa.current_check_status,pa.current_check_user from price_revision_apply pa left join sys_agency sa on sa.agency_code_ours = pa.agency_code LEFT JOIN price_revision_truck prt on pa.apply_no=prt.apply_no LEFT JOIN incoming_info ii on prt.truck_id=ii.truck_id LEFT JOIN order_info oi on prt.order_no = oi.order_no left join submission s on s.submission_no = prt.submission_no group by pa.id order by pa.create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531110957759: /price/revision/check, time: 166, 
	|--reponse: "price_resivison/check" 

```

### 应收车款挂账管理
- http://127.0.0.1:8081/onAccount/applyList?pageNum=&pageSize=10&listType=0&agencyCode=base&productTypeId=&platetTypeId=&submissionNo=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=

```
URI_S_20220531110454035: /onAccount/applyList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"listType":["0"],"agencyCode":["base"],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE oi.agency_code = ? order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531110454035: /onAccount/applyList, time: 77, 
	|--reponse: "onAccount/applyList" 

```


### 应收车款挂账申请列表
#### 全部

##### 查询
```
URI_S_20220613155813261: http://127.0.0.1:8082/onAccount/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":[""],"currentCheckStatus":[""],"listType":["1"],"applyNo":["GZ1648459151239"],"serialNumber":["MX102662"],"startDate":["2022-03-28"],"endDate":["2022-03-29"],"jumpNumber":[""]}, body: null

SELECT count(0) FROM (SELECT oa.id, oa.apply_no, oa.vehicle_count, oa.apply_status, oa.create_user, oa.create_time, oa.deal_user, oa.agency_code, oa.submit_client, oa.on_account_date, oa.total_on_account_money, oa.total_contract_money, oa.day_number, oa.remark, contact_no, oa.current_step_order, oa.current_check_user, oa.current_position, oa.current_check_status, oa.apply_type, oa.apply_to FROM on_account_apply oa LEFT JOIN on_account_apply_detail oaad ON oaad.apply_no = oa.apply_no LEFT JOIN incoming_info ii ON ii.truck_id = oaad.truck_id WHERE oa.apply_no = ? AND ii.serial_number LIKE concat(concat('%', ?), '%') AND oa.create_time >= str_to_date(concat(?, ' 00:00:00'), '%Y-%m-%d %H:%i:%s') AND oa.create_time <= str_to_date(concat(?, ' 23:59:59'), '%Y-%m-%d %H:%i:%s') AND oa.apply_to = ? GROUP BY oa.apply_no) table_count 
-- Parameters: GZ1648459151239(String), MX102662(String), 2022-03-28(String), 2022-03-29(String), 0(String)

select
	oa.id,
	oa.apply_no,
	oa.vehicle_count,
	oa.apply_status,
	oa.create_user,
	oa.create_time,
	oa.deal_user,
	oa.agency_code,
	oa.submit_client,
	oa.on_account_date,
	oa.total_on_account_money,
	oa.total_contract_money,
	oa.day_number,
	oa.remark,
	contact_no,
	oa.current_step_order,
	oa.current_check_user,
	oa.current_position,
	oa.current_check_status,
	oa.apply_type,
	oa.apply_to
from
	on_account_apply oa
left join on_account_apply_detail oaad on
	oaad.apply_no = oa.apply_no
left join incoming_info ii on
	ii.truck_id = oaad.truck_id
WHERE
	oa.apply_no = 'GZ1648459151239'
	and ii.serial_number like concat(concat('%','MX102662'), '%')
	and oa.create_time >= str_to_date(concat('2022-03-28', ' 00:00:00'),
	'%Y-%m-%d %H:%i:%s')
	and oa.create_time <= str_to_date(concat('2022-03-29', ' 23:59:59'),
	'%Y-%m-%d %H:%i:%s')
	and oa.apply_to = '0'
group by
	oa.apply_no
order by
	oa.create_time desc
limit 0,10
-- Parameters: GZ1648459151239(String), MX102662(String), 2022-03-28(String), 2022-03-29(String), 0(String), 0(Integer), 10(Integer)

URI_E_20220613155813261: http://127.0.0.1:8082/onAccount/checkList, time: 20, 
	|--reponse: "onAccount/checkList" 
```

##### 查看挂账申请
```
URI_S_20220613155933813: http://127.0.0.1:8082/onAccount/getInfoByApplyNo,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"applyNo":["GZ1648459151239"]}, body: ["GZ1648459151239"]

-- 合格证申请详细信息
select id, apply_no, truck_id, deal_time, deal_user, is_reject,on_account_money from on_account_apply_detail where apply_no = 'GZ1648459151239' 
--  Parameters: GZ1648459151239(String)

-- 合格证申请
select id, apply_no, vehicle_count, apply_status, create_user, create_time, deal_user, agency_code, submit_client, on_account_date, total_on_account_money, total_contract_money, day_number, remark,contact_no, current_step_order, current_check_user, current_position, current_check_status,apply_type,apply_to from on_account_apply where apply_no = 'GZ1648459151239' 
-- Parameters: GZ1648459151239(String)

SELECT SUM(down_price_cancel) FROM on_account_apply_detail oaad LEFT JOIN order_truck_sell_info otsi on otsi.truck_id = oaad.truck_id where oaad.apply_no ='GZ1648459151239' and otsi.agency_code = 'base' 
-- Parameters: GZ1648459151239(String), base(String)

-- 【附件仓库】
select DISTINCT file_path from file_repository where apply_no='GZ1648459151239' and subject_type = '4' 
-- Parameters: GZ1648459151239(String), 4(String)

SELECT ot.product_type_name productTypeName, ot.platet_type_name platetTypeName, ot.truck_code truckCode, ot.truck_type_name truckTypeName, otsi.single_price singlePrice, ii.serial_number serialNumber, ii.vin, ii.engine_number engineNumber, ii.truck_id truckId, oi.in_parent_price inParentPrice, oi.in_parent_date inParentDate, otsi.sub_down_price downPrice, otsi.sub_tail_money tailMoney, otsi.sub_client_id subClientId FROM order_truck ot LEFT JOIN order_truck_sell_info otsi ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id left join order_truck_invertory_info oi on oi.truck_id = ot.id where ( ot.id = 11125 or ot.id = 11126 or ot.id = 11127 or ot.id = 11128 or ot.id = 11129 or ot.id = 11130 or ot.id = 11131 or ot.id = 11132 or ot.id = 11133 or ot.id = 11134 ) and otsi.manufactor_id = 1
-- Parameters: 11125(Long), 11126(Long), 11127(Long), 11128(Long), 11129(Long), 11130(Long), 11131(Long), 11132(Long), 11133(Long), 11134(Long)

URI_E_20220613155933813: http://127.0.0.1:8082/onAccount/getInfoByApplyNo, time: 26, 
	|--reponse: {"code":0,"success":true,"onAccountVos":[{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102662","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11125,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV49MX102662"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102669","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11126,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV41MX102669"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102671","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11127,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV4XMX102671"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102685","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11128,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV4XMX102685"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102691","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11129,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV45MX102691"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102695","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11130,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV42MX102695"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102697","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11131,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV46MX102697"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102699","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11132,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV4XMX102699"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102700","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11133,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV42MX102700"},{"downPrice":"0.00","engineNumber":"/","platetTypeName":"牵引车","productTypeName":"陕重汽","serialNumber":"MX102702","singlePrice":"215000.00","subClientId":1402,"tailMoney":"0.00","truckCode":"SX4258GV324","truckId":11134,"truckTypeName":"陕重汽M3000S","vin":"LZGJLGV46MX102702"}],"onAccountApply":{"agencyCode":"base","applyNo":"GZ1648459151239","applyStatus":"1","applyTo":"0","applyType":"0","createTime":1648459151000,"createUser":81,"currentCheckStatus":"已完成","currentCheckUser":"","currentPosition":"1","currentStepOrder":"4","dayNumber":90,"id":1318,"onAccountDate":"2022年06月26日","remark":"","submitClient":"上海远行供应链管理（集团）有限公司","totalContractMoney":"2150000","totalOnAccountMoney":"2150000","vehicleCount":"10"},"onAccountApplyDetailList":[{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5962,"isReject":"0","onAccountMoney":"215000","truckId":11125},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5963,"isReject":"0","onAccountMoney":"215000","truckId":11126},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5964,"isReject":"0","onAccountMoney":"215000","truckId":11127},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5965,"isReject":"0","onAccountMoney":"215000","truckId":11128},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5966,"isReject":"0","onAccountMoney":"215000","truckId":11129},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5967,"isReject":"0","onAccountMoney":"215000","truckId":11130},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5968,"isReject":"0","onAccountMoney":"215000","truckId":11131},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5969,"isReject":"0","onAccountMoney":"215000","truckId":11132},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5970,"isReject":"0","onAccountMoney":"215000","truckId":11133},{"applyNo":"GZ1648459151239","dealTime":1648459151000,"dealUser":81,"id":5971,"isReject":"0","onAccountMoney":"215000","truckId":11134}],"totalDownPrice":0,"filePaths":[]} 
```
##### 查看审核记录
```
URI_S_20220613160012322: http://127.0.0.1:8082/approval/getRecordByNo,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"recordNo":["GZ1648459151239"]}, body: ["GZ1648459151239"]

select st.id, st.record_no, st.approval_step_id, st.approval_name_id, st.approval_time, st.role_code, st.approval_type, st.table_id, st.approval_status, st.remark, aps.step_name, sa.type, sa.agency_code_ours, su.account, sr.role_name from approval_step_record st left join approval_step aps on aps.id = st.approval_step_id left join approval_name an on an.id = st.approval_name_id left join sys_agency sa on sa.agency_code_ours = an.agency_code left join sys_user su on su.id = st.role_code left join sys_role_user sru on sru.user_id = st.role_code left join sys_role sr on sr.id = sru.role_id where st.record_no = 'GZ1648459151239' order by st.approval_time asc
--  Parameters: GZ1648459151239(String)

URI_E_20220613160012322: http://127.0.0.1:8082/approval/getRecordByNo, time: 358, 
	|--reponse: {"code":0,"data":[{"agency":{"agencyCodeOurs":"base"},"approvalNameId":9,"approvalStatus":"0","approvalStep":{"stepName":"首节点"},"approvalStepId":29,"approvalTime":1648459151000,"approvalType":"挂账流程","id":26674,"recordNo":"GZ1648459151239","remark":"新增","role":{"roleName":"马兰-计划"},"roleCode":81,"tableId":1318,"user":{"account":"马兰","icon":"userIcon","text":"马兰"}},{"agency":{"agencyCodeOurs":"base"},"approvalNameId":9,"approvalStatus":"1","approvalStep":{"stepName":"计划审核"},"approvalStepId":384,"approvalTime":1648459162000,"approvalType":"挂账流程","id":26675,"recordNo":"GZ1648459151239","remark":"","role":{"roleName":"马兰-计划"},"roleCode":81,"tableId":1318,"user":{"account":"马兰","icon":"userIcon","text":"马兰"}},{"agency":{"agencyCodeOurs":"base"},"approvalNameId":9,"approvalStatus":"1","approvalStep":{"stepName":"业务负责人审核"},"approvalStepId":30,"approvalTime":1648459740000,"approvalType":"挂账流程","id":26681,"recordNo":"GZ1648459151239","remark":"","role":{"roleName":"业务负责人"},"roleCode":170,"tableId":1318,"user":{"account":"狄青","icon":"userIcon","text":"狄青"}},{"agency":{"agencyCodeOurs":"base"},"approvalNameId":9,"approvalStatus":"1","approvalStep":{"stepName":"总经理审核"},"approvalStepId":173,"approvalTime":1648460952000,"approvalType":"挂账流程","id":26688,"recordNo":"GZ1648459151239","remark":"","role":{"roleName":"公司领导"},"roleCode":79,"tableId":1318,"user":{"account":"张旭涛","icon":"userIcon","text":"张旭涛"}}],"success":true} 
```

#### 待审核
- http://127.0.0.1:8081/onAccount/checkList?pageNum=&pageSize=&currentCheckStatus=%E5%BE%85%E5%AE%A1%E6%A0%B8&listType=1&applyNo=&serialNumber=&startDate=&endDate=&jumpNumber=
```
URI_S_20220531110317158: /onAccount/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":[""],"currentCheckStatus":["待审核"],"listType":["1"],"applyNo":[""],"serialNumber":[""],"startDate":[""],"endDate":[""],"jumpNumber":[""]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT oa.id, oa.apply_no, oa.vehicle_count, oa.apply_status, oa.create_user, oa.create_time, oa.deal_user, oa.agency_code, oa.submit_client, oa.on_account_date, oa.total_on_account_money, oa.total_contract_money, oa.day_number, oa.remark, contact_no, oa.current_step_order, oa.current_check_user, oa.current_position, oa.current_check_status, oa.apply_type, oa.apply_to FROM on_account_apply oa LEFT JOIN on_account_apply_detail oaad ON oaad.apply_no = oa.apply_no LEFT JOIN incoming_info ii ON ii.truck_id = oaad.truck_id WHERE oa.current_check_status REGEXP ? AND oa.current_check_user = ? AND oa.apply_to = ? GROUP BY oa.apply_no) table_count 
==> Parameters: 待审核(String), #1#(String), 0(String)
<==      Total: 1
URI_E_20220531110317158: /onAccount/checkList, time: 9, 
	|--reponse: "onAccount/checkList" 

```
 
### 销售发票申请-子公司
- http://127.0.0.1:8081/invoice/apply?pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=&orderStatus=
```
RI_S_20220531105603292: /invoice/apply,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""],"orderStatus":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE ot.status IN (?, ?, ?, ?, ?, ?)) table_count 
==> Parameters: 2(String), 3(String), 4(String), 5(String), 6(String), 7(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE ot.status in ( ? , ? , ? , ? , ? , ? ) order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: 2(String), 3(String), 4(String), 5(String), 6(String), 7(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531105603292: /invoice/apply, time: 279, 
	|--reponse: "invoice/apply" 

```


### 销售发票申请列表
#### 待审核
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%BE%85%E5%AE%A1%E6%A0%B8&pageNum=&pageSize=10&agencyCode=&truckCode=&orderNo=&contactNo=&serialNumber=&productTypeId=&plateTypeId=&submissionNo=&publicType=&submitStartTime=&submitEndTime=&startTime=&endTime=

```
URI_S_20220531105009132: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["待审核"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"truckCode":[""],"orderNo":[""],"contactNo":[""],"serialNumber":[""],"productTypeId":[""],"plateTypeId":[""],"submissionNo":[""],"publicType":[""],"submitStartTime":[""],"submitEndTime":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? AND i.current_check_user = ?) table_count 
==> Parameters: 待审核(String), #1#(String)
<==      Total: 1
URI_E_20220531105009132: /invoice/list, time: 347, 
	|--reponse: "invoice/invoice_list" 

```

#### 已驳回
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%B7%B2%E9%A9%B3%E5%9B%9E&pageNum=&pageSize=10&agencyCode=&truckCode=&orderNo=&contactNo=&serialNumber=&productTypeId=&plateTypeId=&submissionNo=&publicType=&submitStartTime=&submitEndTime=&startTime=&endTime=
```
URI_S_20220531105147043: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已驳回"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"truckCode":[""],"orderNo":[""],"contactNo":[""],"serialNumber":[""],"productTypeId":[""],"plateTypeId":[""],"submissionNo":[""],"publicType":[""],"submitStartTime":[""],"submitEndTime":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已驳回(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已驳回(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220311001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220311001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220124001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220124001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211123001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211123001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211122001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211122001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211118001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211118001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20211012001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20211012001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709009(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210709009(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210709008(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210709008(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210630002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210630002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210628005(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210628005(String)
<==      Total: 1
URI_E_20220531105147043: /invoice/list, time: 396, 
	|--reponse: "invoice/invoice_list" 

```

#### 已完成
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=%E5%B7%B2%E5%AE%8C%E6%88%90&pageNum=&pageSize=10&agencyCode=&truckCode=&orderNo=&contactNo=&serialNumber=&productTypeId=&plateTypeId=&submissionNo=&publicType=&submitStartTime=&submitEndTime=&startTime=&endTime=
```
URI_S_20220531105342932: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["已完成"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"truckCode":[""],"orderNo":[""],"contactNo":[""],"serialNumber":[""],"productTypeId":[""],"plateTypeId":[""],"submissionNo":[""],"publicType":[""],"submitStartTime":[""],"submitEndTime":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ?) table_count 
==> Parameters: 已完成(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE i.current_check_status REGEXP ? order by i.create_time DESC limit ?,? 
==> Parameters: 已完成(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220519001(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220519001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220518001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428004(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428003(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428002(String)
<==      Total: 0
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220428001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20220427001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20220427001(String)
<==      Total: 1
URI_E_20220531105342932: /invoice/list, time: 516, 
	|--reponse: "invoice/invoice_list" 

```

#### 暂估列表
- http://127.0.0.1:8081/invoice/list?currentCheckStatus=estimate&pageNum=&pageSize=10&agencyCode=&truckCode=&orderNo=&contactNo=&serialNumber=&productTypeId=&plateTypeId=&submissionNo=&publicType=&submitStartTime=&submitEndTime=&startTime=&endTime=
```
URI_S_20220531105431508: /invoice/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"currentCheckStatus":["estimate"],"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"truckCode":[""],"orderNo":[""],"contactNo":[""],"serialNumber":[""],"productTypeId":[""],"plateTypeId":[""],"submissionNo":[""],"publicType":[""],"submitStartTime":[""],"submitEndTime":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad ON iad.apply_no = i.apply_no WHERE iad.invoice_type = "2") table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT DISTINCT i.apply_no, i.agency_code,i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status,i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac on iac.apply_no = i.apply_no LEFT JOIN invoice_apply_detail iad on iad.apply_no = i.apply_no WHERE iad.invoice_type = "2" order by i.create_time DESC limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210927004(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210927004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506024(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506024(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506013(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506013(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506012(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506012(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506011(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506011(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506004(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506004(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506003(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506003(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506002(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506002(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210506001(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210506001(String)
<==      Total: 1
==>  Preparing: select group_concat(DISTINCT invoice_no) from invoice_apply_detail where apply_no=? group by apply_no 
==> Parameters: KP20210331021(String)
<==      Total: 1
==>  Preparing: select count(truck_id) from invoice_apply_content where apply_no = ? group by apply_no; 
==> Parameters: KP20210331021(String)
<==      Total: 1
URI_E_20220531105431508: /invoice/list, time: 514, 
	|--reponse: "invoice/invoice_list" 

```




### 返利管理（后期开发）




### 销售合同管理
- http://127.0.0.1:8081/contract/list?pageNum=&pageSize=10&dataType=1&agencyCode=base&productTypeId=&platetTypeId=&submissionNo=&contactNo=&truckCode=&publicType=&startTime=&endTime=
```
URI_S_20220531104629782: /contract/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"dataType":["1"],"agencyCode":["base"],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"contactNo":[""],"truckCode":[""],"publicType":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT c.id, c.submission_no, c.contact_no, c.contact_file, c.contact_status, c.create_user, c.create_time, c.update_user, c.update_time, o.submit_time submitTime, say.agency_name submitClient, ot.product_type_name productTypeName, ot.platet_type_name platetTypeName, o.order_no orderNo, ot.public_type publicType, ot.truck_code truckCode, count(DISTINCT ot.id) numbers, SUM(otsi.single_price) contractPrice, SUM(otsi.single_price) totalPrice, sac.client_name sales_target, c.sales_target_id FROM contact_manager c LEFT JOIN contact_truck ct ON ct.contact_id = c.id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ct.truck_id LEFT JOIN order_truck ot ON ot.id = ct.truck_id LEFT JOIN order_info o ON o.id = otsi.order_id LEFT JOIN sys_agency_client sac ON sac.id = c.sales_target_id LEFT JOIN sys_agency say ON say.agency_code_ours = c.down_agency_code WHERE otsi.manufactor_id = 1 AND c.up_agency_code = ? GROUP BY c.contact_no) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT c.id, c.submission_no, c.contact_no, c.contact_file, c.contact_status, c.create_user, c.create_time, c.update_user, c.update_time, o.submit_time submitTime, say.agency_name submitClient, ot.product_type_name productTypeName, ot.platet_type_name platetTypeName, o.order_no orderNo, ot.public_type publicType, ot.truck_code truckCode, count(distinct ot.id) numbers, SUM(otsi.single_price) contractPrice, SUM(otsi.single_price) totalPrice, sac.client_name sales_target, c.sales_target_id FROM contact_manager c LEFT JOIN contact_truck ct ON ct.contact_id = c.id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ct.truck_id LEFT JOIN order_truck ot ON ot.id = ct.truck_id LEFT JOIN order_info o ON o.id = otsi.order_id LEFT JOIN sys_agency_client sac ON sac.id = c.sales_target_id LEFT JOIN sys_agency say ON say.agency_code_ours = c.down_agency_code WHERE otsi.manufactor_id = 1 and c.up_agency_code = ? group by c.contact_no order by o.submit_time desc,c.contact_no desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531104629782: /contract/list, time: 152, 
	|--reponse: "contract/contract_list" 
```
### 销售对象管理
- http://127.0.0.1:8081/salesTarget/list?pageNum=&pageSize=10&agencyCode=base&productTypeId=&platetTypeId=&submissionNo=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531104422542: /salesTarget/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":["base"],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no WHERE oi.agency_code = ?) table_count 
==> Parameters: null, null, base(String)
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no WHERE oi.agency_code = ? order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: null, null, base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531104422542: /salesTarget/list, time: 409, 
	|--reponse: "sales/list" 
```


### 销售票出库登记-终端

- http://127.0.0.1:8081/salesTicket/list?pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&serialNumber=&contactNo=&startTime=&endTime=
```
URI_S_20220531103512240: /salesTicket/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"truckCode":[""],"serialNumber":[""],"contactNo":[""],"startTime":[""],"endTime":[""]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN allot_info ai ON ai.apply_no = oi.submission_no) table_count 
==> Parameters: null, null
<==      Total: 1
==>  Preparing: select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = ?) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = ?) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no order by oi.create_time desc,oi.order_no desc limit ?,? 
==> Parameters: null, null, 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531103512240: /salesTicket/list, time: 187, 
	|--reponse: "sales_ticket/list" 
```
### 销售票出库登记列表
- http://127.0.0.1:8081/salesTicket/viewList?pageNum=&pageSize=&applyNo=&serialNumber=&invoiceForCompany=&contactNo=&startDate=&endDate=
```
URI_S_20220531103710640: /salesTicket/viewList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":[""],"applyNo":[""],"serialNumber":[""],"invoiceForCompany":[""],"contactNo":[""],"startDate":[""],"endDate":[""]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT str.id, str.order_no, str.apply_no, str.applyer, str.invoice_company, str.project_name, str.invoice_type, str.invoice_rate, str.invoice_money, str.capitalization, str.lowercase, str.invoice_for_company, str.invoice_rate_no, str.invoice_bank, str.invoice_bank_account, str.invoice_address, str.invoice_phone, str.invoice_remark, str.create_user, str.create_time, str.update_user, str.update_time, str.submission_no, str.current_step_order, str.current_check_user, str.current_check_status, oi.contact_no, ii.serial_number FROM sales_ticket_register str LEFT JOIN sales_ticket_register_content strc ON str.apply_no = strc.apply_no LEFT JOIN incoming_info ii ON strc.truck_id = ii.truck_id LEFT JOIN order_info oi ON ii.order_id = oi.order_no LEFT JOIN vehicle_belong vb ON vb.vehicle_no = strc.truck_id) table_count 
==> Parameters: 
slow sql 4598 millis. SELECT count(0) FROM (SELECT DISTINCT str.id, str.order_no, str.apply_no, str.applyer, str.invoice_company, str.project_name, str.invoice_type, str.invoice_rate, str.invoice_money, str.capitalization, str.lowercase, str.invoice_for_company, str.invoice_rate_no, str.invoice_bank, str.invoice_bank_account, str.invoice_address, str.invoice_phone, str.invoice_remark, str.create_user, str.create_time, str.update_user, str.update_time, str.submission_no, str.current_step_order, str.current_check_user, str.current_check_status, oi.contact_no, ii.serial_number FROM sales_ticket_register str LEFT JOIN sales_ticket_register_content strc ON str.apply_no = strc.apply_no LEFT JOIN incoming_info ii ON strc.truck_id = ii.truck_id LEFT JOIN order_info oi ON ii.order_id = oi.order_no LEFT JOIN vehicle_belong vb ON vb.vehicle_no = strc.truck_id) table_count[]
<==      Total: 1
==>  Preparing: SELECT DISTINCT str.id, str.order_no, str.apply_no, str.applyer, str.invoice_company, str.project_name, str.invoice_type, str.invoice_rate, str.invoice_money, str.capitalization, str.lowercase, str.invoice_for_company, str.invoice_rate_no, str.invoice_bank, str.invoice_bank_account, str.invoice_address, str.invoice_phone, str.invoice_remark, str.create_user, str.create_time, str.update_user, str.update_time, str.submission_no, str.current_step_order, str.current_check_user, str.current_check_status,oi.contact_no,ii.serial_number FROM sales_ticket_register str left JOIN sales_ticket_register_content strc ON str.apply_no = strc.apply_no LEFT JOIN incoming_info ii on strc.truck_id = ii.truck_id LEFT JOIN order_info oi on ii.order_id = oi.order_no left join vehicle_belong vb on vb.vehicle_no = strc.truck_id order by str.create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
slow sql 4512 millis. SELECT DISTINCT str.id, str.order_no, str.apply_no, str.applyer, str.invoice_company, str.project_name,
        str.invoice_type, str.invoice_rate, str.invoice_money, str.capitalization, str.lowercase,
        str.invoice_for_company, str.invoice_rate_no, str.invoice_bank, str.invoice_bank_account, str.invoice_address,
        str.invoice_phone, str.invoice_remark, str.create_user, str.create_time, str.update_user, str.update_time,
        str.submission_no, str.current_step_order, str.current_check_user,
        str.current_check_status,oi.contact_no,ii.serial_number FROM
        sales_ticket_register str left JOIN
        sales_ticket_register_content strc ON str.apply_no = strc.apply_no
        LEFT JOIN incoming_info ii on strc.truck_id = ii.truck_id
        LEFT JOIN order_info oi on ii.order_id = oi.order_no
        left join vehicle_belong vb on vb.vehicle_no = strc.truck_id
          
        order by str.create_time desc limit ?,?[0,10]
<==      Total: 10
URI_E_20220531103710640: /salesTicket/viewList, time: 9158, 
	|--reponse: "sales_ticket/viewList" 
```


## 财务管理
### 银行流水记录
- http://127.0.0.1:8081/bank/list
```
URI_S_20220531161115204: /bank/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: SELECT count(0) FROM capital_inflow WHERE belong = ? 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: select id, serial_number, account_amount, used_amount, unused_amount, others_amount, payment_date, write_off_time, payment_type, payment_client, payment_account, base_account, abstract_info, remark, client_name, client_no, create_time, create_user, update_time, update_user,belong from capital_inflow WHERE belong = ? order by payment_date desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531161115204: /bank/list, time: 2336, 
	|--reponse: "bank/list" 

```
### 返利流水记录
- http://127.0.0.1:8081/rebate/list
```
URI_S_20220531161238903: /rebate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT r.id, r.rebate_no, r.status, r.remark, r.rebate_url, r.create_user, r.create_time, r.update_user, r.update_time FROM rebate r LEFT JOIN rebate_detail d ON d.rebate_id = r.id) rd 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, rebate_no, status, remark, rebate_url, create_user, create_time, update_user, update_time ,'' rebateType ,'' rebateSeason ,'' clientNo from ( select DISTINCT r.id, r.rebate_no, r.status, r.remark, r.rebate_url, r.create_user, r.create_time, r.update_user, r.update_time from rebate r left join rebate_detail d on d.rebate_id = r.id ) rd order by create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 16(Long)
<====      Total: 4
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 15(Long)
<====      Total: 2
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 14(Long)
<====      Total: 2
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 13(Long)
<====      Total: 3
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 12(Long)
<====      Total: 1
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 11(Long)
<====      Total: 1
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 10(Long)
<====      Total: 2
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 9(Long)
<====      Total: 2
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 8(Long)
<====      Total: 2
====>  Preparing: select id, rebate_id rebateId, rebate_import_no rebateImportNo, company_name companyName, client_no clientNo, rebate_type rebateType, rebate_ym rebateYm, rebate_year rebateYear, rebate_season rebateSeason, total_amount totalAmount, used_amount usedAmount, unused_amount unusedAmount,remark from rebate_detail where rebate_id = ? 
====> Parameters: 7(Long)
<====      Total: 6
<==      Total: 10
URI_E_20220531161238903: /rebate/list, time: 296, 
	|--reponse: "rebate/rebate_list" 

```
### 车款核销
#### 查询

```
URI_S_20220609161051199: http://127.0.0.1:8082/writeOff/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"agencyCode":[""],"productTypeId":[""],"platetTypeId":[""],"submissionNo":[""],"serialNumber":["MB006650"],"contactNo":[""],"truckCode":[""],"startTime":[""],"endTime":[""],"isOnAccount":[""]}, body: null

-- 提报方
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0"; 
-- Parameters: 0(String)

-- 产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name 
-- Parameters: 0(String)

-- 车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name 
-- Parameters: 0(String)

select id, serial_number, account_amount, used_amount, unused_amount, others_amount, payment_date, write_off_time, payment_type, payment_client, payment_account, base_account, abstract_info, remark, client_name, client_no, create_time, create_user, update_time, update_user,belong from capital_inflow WHERE unused_amount != '0' and belong = 'base' order by payment_date desc; 
-- Parameters: base(String)

select r.id, r.rebate_id, r.rebate_import_no, r.company_name, r.client_no, r.rebate_type, r.rebate_ym, r.rebate_year, r.rebate_season, r.total_amount, r.used_amount, r.unused_amount, r.remark from rebate_detail r left join sys_agency a on a.agency_code = r.client_no where a.agency_code_ours = 'base' and r.unused_amount > 0; 
-- Parameters: base(String)

SELECT count(0) FROM (SELECT DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no, oi.numbers, oi.contract_price, oi.single_price, oi.total_price, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time, sm.submission_type, oi.order_strategy FROM order_info oi LEFT JOIN submission sm ON sm.submission_no = oi.submission_no LEFT JOIN order_truck_sell_info otsi ON otsi.order_id = oi.id LEFT JOIN order_truck ot ON ot.id = otsi.truck_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id WHERE ii.serial_number LIKE concat(concat('%', ?), '%')) table_count 
-- Parameters: MB006650(String)

select
	DISTINCT oi.id,
	oi.submission_id,
	oi.submission_no,
	oi.order_no,
	oi.contact_no,
	oi.numbers,
	oi.contract_price,
	oi.single_price,
	oi.total_price,
	oi.down_price,
	oi.down_price_cancel,
	oi.down_price_leave,
	oi.final_payment_contract,
	oi.final_payment,
	oi.final_payment_leave,
	oi.final_payment_credit,
	oi.status,
	oi.product_type_name,
	oi.product_type_id,
	oi.platet_type_name,
	oi.platet_type_id,
	oi.truck_code,
	oi.truck_type_name,
	oi.truck_type_id,
	oi.public_type,
	oi.submit_client,
	oi.work_flow_node,
	oi.agency_code,
	oi.current_step,
	oi.current_check_user,
	oi.basic_config_name,
	oi.submit_time,
	oi.create_time,
	sm.submission_type,
	oi.order_strategy
from
	order_info oi
LEFT JOIN submission sm ON
	sm.submission_no = oi.submission_no
LEFT JOIN order_truck_sell_info otsi ON
	otsi.order_id = oi.id
LEFT JOIN order_truck ot ON
	ot.id = otsi.truck_id
LEFT JOIN incoming_info ii ON
	ii.truck_id = ot.id
WHERE
	ii.serial_number like concat(concat('%','MB006650'), '%')
order by
	oi.create_time desc,
	oi.order_no desc
limit 0,10 ;
-- Parameters: MB006650(String), 0(Integer), 10(Integer)

URI_E_20220609161051199: http://127.0.0.1:8082/writeOff/list, time: 76, 
	|--reponse: "write_off/write_off_list" 

http://127.0.0.1:8082/writeOff/blankDataList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"search":[""],"order":["asc"]}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1654759134394,"id":"18295279239464E5264CB36D9B34F5B9","lastAccessedTime":1654762251290,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
select id, serial_number, account_amount, used_amount, unused_amount, others_amount, payment_date, write_off_time, payment_type, payment_client, payment_account, base_account, abstract_info, remark, client_name, client_no, create_time, create_user, update_time, update_user,belong from capital_inflow WHERE unused_amount != '0' and belong = 'base' order by payment_date desc; 
-- Parameters: base(String)
URI_E_20220609161051483: http://127.0.0.1:8082/writeOff/blankDataList, time: 42, 
	|--reponse: [{"abstractInfo":"","accountAmount":"3811989","baseAccount":"03004871188","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1649746042000,"createUser":168,"id":7545,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20220401103500","paymentType":"现金","remark":"车款","serialNumber":"20220412004","unusedAmount":"3811989","usedAmount":"0"},{"abstractInfo":"","accountAmount":"3722.60","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1648525803000,"createUser":153,"id":7509,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20220325133510","paymentType":"现金","remark":"电动车车款","serialNumber":"20220329005","unusedAmount":"3722.60","usedAmount":"0"},{"abstractInfo":"","accountAmount":"2900000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1646200901000,"createUser":168,"id":7359,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20220216114855","paymentType":"现金","remark":"预付车款","serialNumber":"202203020001","unusedAmount":"2900000.00","usedAmount":"0"},{"abstractInfo":"KB016261、KB016275、KB016281、KB016404","accountAmount":"446681.20","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7152,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211228180554","paymentType":"车款","remark":"车款","serialNumber":"202112280002","unusedAmount":"446681.20","usedAmount":"0"},{"abstractInfo":"KB015809、KB016253","accountAmount":"247046.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7151,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211228161004","paymentType":"车款","remark":"车款","serialNumber":"202112280001","unusedAmount":"247046.80","usedAmount":"0"},{"abstractInfo":"KB016267，KB016269，KB016400","accountAmount":"359090.20","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640599095000,"createUser":153,"id":7143,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211227173938","paymentType":"车款","remark":"车款","serialNumber":"202112270006","unusedAmount":"359090.20","usedAmount":"0"},{"abstractInfo":"KB016278，KB016279","accountAmount":"239108.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7153,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211224142101","paymentType":"车款","remark":"车款","serialNumber":"202112280003","unusedAmount":"239108.80","usedAmount":"0"},{"abstractInfo":"","accountAmount":"20000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1639098649000,"createUser":153,"id":7077,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211209134510","paymentType":"车款订金","remark":"车款订金","serialNumber":"202112100001","unusedAmount":"20000.00","usedAmount":"0"},{"abstractInfo":"KB015810","accountAmount":"117363.40","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1638235935000,"createUser":153,"id":7045,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211129164428","paymentType":"现金","remark":"车款","serialNumber":"202111300001","unusedAmount":"117363.40","usedAmount":"0"},{"abstractInfo":"KB016254、KB016256","accountAmount":"62000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1636419853000,"createUser":153,"id":6775,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211108163855","paymentType":"现金","remark":"车款","serialNumber":"202111090001","unusedAmount":"62000.00","usedAmount":"0"},{"abstractInfo":"KB016254 KB016256","accountAmount":"172726.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1636333680000,"createUser":153,"id":6774,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211105171613","paymentType":"现金","remark":"车款","serialNumber":"202111080001","unusedAmount":"172726.80","usedAmount":"0"},{"abstractInfo":"","accountAmount":"557831.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1634778712000,"createUser":153,"id":6735,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211020150718","paymentType":"现金","remark":"车款","serialNumber":"202110210001","unusedAmount":"40000.00","updateTime":1635230943000,"updateUser":81,"usedAmount":"517831.00"},{"abstractInfo":"MB6816;6819","accountAmount":"756400.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1634087275000,"createUser":153,"id":6724,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211012152633","paymentType":"现金","remark":"车款","serialNumber":"202110130001","unusedAmount":"20000.00","updateTime":1635229926000,"updateUser":81,"usedAmount":"736400.00"},{"abstractInfo":"MB502","accountAmount":"274819.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1632358967000,"createUser":153,"id":6679,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210922162520","paymentType":"现金","remark":"车款","serialNumber":"202109230001","unusedAmount":"20000.00","updateTime":1632377958000,"updateUser":83,"usedAmount":"254819.00"},{"abstractInfo":"","accountAmount":"859401.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1631497675000,"createUser":153,"id":6637,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210911135506","paymentType":"现金","remark":"车款","serialNumber":"202109130001","unusedAmount":"200000.00","updateTime":1632641772000,"updateUser":83,"usedAmount":"659401.00"},{"abstractInfo":"MB404;409;423;432;399;416;401;HG14752;MB13611","accountAmount":"2575567.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1631149968000,"createUser":153,"id":6610,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210908170948","paymentType":"现金","remark":"车款","serialNumber":"202109090002","unusedAmount":"140000.00","updateTime":1632378249000,"updateUser":83,"usedAmount":"2435567.00"},{"abstractInfo":"MB000494;MB000501;MB000497","accountAmount":"873900.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1630044591000,"createUser":153,"id":6546,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210827131437","paymentType":"现金","remark":"车款","serialNumber":"202108270002","unusedAmount":"60000.00","updateTime":1630397309000,"updateUser":81,"usedAmount":"813900.00"},{"abstractInfo":"MB504;503","accountAmount":"549638.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1629682782000,"createUser":153,"id":6528,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210820100549","paymentType":"现金","remark":"车款","serialNumber":"202108230001","unusedAmount":"7038.00","updateTime":1629688357000,"updateUser":83,"usedAmount":"542600.00"},{"abstractInfo":"MB13600；3612；3614；3617；5202；5206；5222；5226；5229；5243；LB16032；6031；6034；6033；5889；6037","accountAmount":"4462590.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626916364000,"createUser":153,"id":6457,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210722084522","paymentType":"现金","remark":"车款","serialNumber":"202107220001","unusedAmount":"120000.00","updateTime":1627609792000,"updateUser":83,"usedAmount":"4342590.00"},{"abstractInfo":"MB425","accountAmount":"291300.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626829960000,"createUser":153,"id":6456,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210720121527","paymentType":"现金","remark":"车款","serialNumber":"202107210001","unusedAmount":"20000.00","updateTime":1627609884000,"updateUser":83,"usedAmount":"271300.00"},{"abstractInfo":"MB495;493;500;490;505;433","accountAmount":"1747800.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626742991000,"createUser":153,"id":6452,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210719203032","paymentType":"现金","remark":"车款","serialNumber":"202107200001","unusedAmount":"120000.00","updateTime":1627609970000,"updateUser":83,"usedAmount":"1627800.00"},{"abstractInfo":"MB422；436","accountAmount":"582600.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626413257000,"createUser":153,"id":6446,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210716122054","paymentType":"现金","remark":"车款","serialNumber":"202107160001","unusedAmount":"40000.00","updateTime":1627610015000,"updateUser":83,"usedAmount":"542600.00"},{"abstractInfo":"LB4560;4564","accountAmount":"727200.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626252822000,"createUser":153,"id":6442,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210713182510","paymentType":"现金","remark":"车款","serialNumber":"202107140001","unusedAmount":"40000.00","updateTime":1627610053000,"updateUser":83,"usedAmount":"687200.00"},{"abstractInfo":"LB5918","accountAmount":"285676.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625620229000,"createUser":153,"id":6428,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210706163619","paymentType":"现金","remark":"车款","serialNumber":"202107070001","unusedAmount":"10000.00","updateTime":1626146207000,"updateUser":83,"usedAmount":"275676.00"},{"abstractInfo":"MB7888;8547;407","accountAmount":"874700.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625188650000,"createUser":153,"id":6416,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210701153248","paymentType":"现金","remark":"车款","serialNumber":"汇入外LZ21070100316934","unusedAmount":"110000.00","updateTime":1626146484000,"updateUser":83,"usedAmount":"764700.00"},{"abstractInfo":"MB7267,7272","accountAmount":"769260.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625050665000,"createUser":153,"id":6415,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210630172518","paymentType":"现金","remark":"车款","serialNumber":"202106300009","unusedAmount":"20000.00","updateTime":1625050884000,"updateUser":83,"usedAmount":"749260.00"},{"abstractInfo":"HE11347","accountAmount":"260100.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1622687016000,"createUser":153,"id":6152,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20210602123925","paymentType":"现金","remark":"车款","serialNumber":"202106020001","unusedAmount":"260100.00","usedAmount":"0"},{"abstractInfo":"LB017771；11005；17759；7913；7939；7905；7927；7902；HF14214;217;215","accountAmount":"3178918.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1621487564000,"createUser":153,"id":5917,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210520111908","paymentType":"现金","remark":"车款","serialNumber":"202105200006","unusedAmount":"38800.00","updateTime":1625047908000,"updateUser":83,"usedAmount":"3140118.00"},{"abstractInfo":"KB016280、KB016245车款","accountAmount":"241726.8","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1614937119000,"createUser":87,"id":5237,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20210304182548","paymentType":"现金","remark":"KB016280、KB016245车款","serialNumber":"202103040005","unusedAmount":"241726.8","usedAmount":"0"},{"abstractInfo":"订金","accountAmount":"700000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1612258034000,"createUser":87,"id":5068,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210201205238","paymentType":"现金","remark":"订金","serialNumber":"202102010001","unusedAmount":"380000.00","updateTime":1640759344000,"updateUser":83,"usedAmount":"320000.00"},{"abstractInfo":"HH15808电动车百分之七十车款","accountAmount":"99911","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1611306272000,"createUser":87,"id":4998,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20210122163424","paymentType":"现金","remark":"","serialNumber":"202101220002","unusedAmount":"99911","usedAmount":"0"},{"abstractInfo":"50台车辆定金","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1611305053000,"createUser":87,"id":4997,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210120100326","paymentType":"现金","remark":"50台车辆定金","serialNumber":"202101200001","unusedAmount":"500000","updateTime":1611307061000,"updateUser":83,"usedAmount":"0"},{"abstractInfo":"2021年轻卡定金","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1610443591000,"createUser":87,"id":4943,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210112165653","paymentType":"2021年轻卡定金","remark":"2021年轻卡定金","serialNumber":"202101120002","unusedAmount":"50000","updateTime":1611807248000,"updateUser":83,"usedAmount":"450000"},{"abstractInfo":"LB012551/LB013647/LB012558/LB013321/LB013320/LB012424/LB010350/LB010572/LB010578/LB010831/LB010931","accountAmount":"1868000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1610077471000,"createUser":87,"id":4924,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20210108205906","paymentType":"承兑","remark":"车款","serialNumber":"202101080001","unusedAmount":"4000","updateTime":1610950936000,"updateUser":83,"usedAmount":"1864000"},{"abstractInfo":"车款","accountAmount":"220000","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1609389208000,"createUser":87,"id":4845,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201229140144","paymentType":"承兑","remark":"车款","serialNumber":"202012290002","unusedAmount":"117836.64","updateTime":1609389259000,"updateUser":83,"usedAmount":"102163.36"},{"abstractInfo":"LB009457、LB009695、LB012796、LB012539、LB012542、LB012379、LB012358","accountAmount":"1210360","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1608880777000,"createUser":87,"id":4771,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201225155615","paymentType":"承兑","remark":"车款","serialNumber":"202012250001","unusedAmount":"274360.00","updateTime":1628756894000,"updateUser":83,"usedAmount":"936000.00"},{"abstractInfo":"LB014697,14893,14933,15092","accountAmount":"754300","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1608801837000,"createUser":87,"id":4750,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201224155615","paymentType":"现金","remark":"4台车款","serialNumber":"202012240001","unusedAmount":"216396.00","updateTime":1628747489000,"updateUser":83,"usedAmount":"537904.00"},{"abstractInfo":"车款","accountAmount":"96163.36","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1608801837000,"createUser":87,"id":4751,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201224155615","paymentType":"承兑","remark":"4台车款","serialNumber":"202012240002","unusedAmount":"64797.36","updateTime":1628737490000,"updateUser":83,"usedAmount":"31366.00"},{"abstractInfo":"HH16259;HH16403","accountAmount":"217274.4","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1608197691000,"createUser":87,"id":4683,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20201217120134","paymentType":"现金","remark":"车款","serialNumber":"202012170001","unusedAmount":"217274.4","usedAmount":"0"},{"abstractInfo":"订金","accountAmount":"50000","baseAccount":"98250154740006273","belong":"base","clientName":"烟台耀通商贸有限公司","clientNo":"1005427","createTime":1608188130000,"createUser":87,"id":4678,"othersAmount":"0","paymentAccount":"15349701040003363","paymentClient":"烟台耀通商贸有限公司","paymentDate":"20201215105708","paymentType":"现金","remark":"订金","serialNumber":"202012150001","unusedAmount":"50000","updateTime":1610445269000,"updateUser":79,"usedAmount":"0"},{"abstractInfo":"","accountAmount":"440155","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1608025828000,"createUser":87,"id":4665,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201214165915","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012140003","unusedAmount":"1930.31","updateTime":1628745900000,"updateUser":83,"usedAmount":"438224.69"},{"abstractInfo":"LBOO5890 LB004550 LB008784","accountAmount":"300000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1608025828000,"createUser":87,"id":4664,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201214165710","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012140002","unusedAmount":"98300.00","updateTime":1628746805000,"updateUser":83,"usedAmount":"201700.00"},{"abstractInfo":"LB010136/010139/012793/012795/013317、LB012369/010835/010579、LB012538/012543/012554","accountAmount":"1900000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1607587730000,"createUser":87,"id":4650,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201210173010","paymentType":"承兑","remark":"车款","serialNumber":"202012100001","unusedAmount":"401000.00","updateTime":1628757072000,"updateUser":83,"usedAmount":"1499000.00"},{"abstractInfo":"四季度返利","accountAmount":"73700","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1607483776000,"createUser":87,"id":4640,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090004","unusedAmount":"73700","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"340440","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4643,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090007","unusedAmount":"340440","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"265160","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4644,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090008","unusedAmount":"22323.36","updateTime":1609389388000,"updateUser":83,"usedAmount":"242836.64"},{"abstractInfo":"三季度返利","accountAmount":"39000","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4645,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090009","unusedAmount":"39000","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"6600","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1607483776000,"createUser":87,"id":4646,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090010","unusedAmount":"6600","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"157000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1607483776000,"createUser":87,"id":4647,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090011","unusedAmount":"157000","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"837800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1607483776000,"createUser":87,"id":4648,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090012","unusedAmount":"871.69","updateTime":1628748087000,"updateUser":83,"usedAmount":"836928.31"},{"abstractInfo":"LB004549、LB000699","accountAmount":"532855","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1607420387000,"createUser":87,"id":4636,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201208173010","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012080002","unusedAmount":"60016","updateTime":1628748087000,"updateUser":83,"usedAmount":"472839"},{"abstractInfo":"车款","accountAmount":"368065","baseAccount":"98250154740006273","belong":"base","clientName":"陕西中富物联科技服务有限公司","clientNo":"0100038","createTime":1607420387000,"createUser":87,"id":4635,"othersAmount":"0","paymentAccount":"2605040609200099072","paymentClient":"陕西中富物联科技服务有限公司","paymentDate":"20201208151840","paymentType":"现金","remark":"车款","serialNumber":"202012080001","unusedAmount":"30000.00","updateTime":1628746198000,"updateUser":83,"usedAmount":"338065.00"},{"abstractInfo":"LB014891;14885","accountAmount":"565836","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607420387000,"createUser":87,"id":4634,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201207173022","paymentType":"现金","remark":"车款","serialNumber":"202012070005","unusedAmount":"296820.00","updateTime":1628665691000,"updateUser":83,"usedAmount":"269016.00"},{"abstractInfo":"车辆定金","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"潍坊大成汽车销售服务有限公司","clientNo":"1000664","createTime":1607332284000,"createUser":87,"id":4627,"othersAmount":"0","paymentAccount":"2390031234205000010144","paymentClient":"潍坊大成汽车销售服务有限公司","paymentDate":"20201207163851","paymentType":"现金","remark":"车辆定金","serialNumber":"202012070002","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"1341658.81","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1607322889000,"createUser":87,"id":4625,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201204171124","paymentType":"承兑","remark":"车款","serialNumber":"202012040005","unusedAmount":"1458.69","updateTime":1607323096000,"updateUser":83,"usedAmount":"1340200.12"},{"abstractInfo":"定金（虚拟）","accountAmount":"60000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1606729664000,"createUser":87,"id":4587,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201130170328","paymentType":"现金","remark":"定金（虚拟）","serialNumber":"202011300005","unusedAmount":"20000","updateTime":1606729741000,"updateUser":81,"usedAmount":"40000"},{"abstractInfo":"山西远行康机订金","accountAmount":"30000","baseAccount":"98250154740006273","belong":"base","clientName":"山西德银远行供应链管理有限公司","clientNo":"0100033","createTime":1610693912000,"createUser":87,"id":4973,"othersAmount":"0","paymentAccount":"161401201020524141","paymentClient":"山西德银远行供应链管理有限公司","paymentDate":"20201130154526","paymentType":"现金","remark":"山西远行康机订金","serialNumber":"202011300008","unusedAmount":"30000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"984262","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1606457650000,"createUser":87,"id":4529,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201126143422","paymentType":"现金","remark":"车款","serialNumber":"202011260002","unusedAmount":"61058.00","updateTime":1628746950000,"updateUser":83,"usedAmount":"923204.00"},{"abstractInfo":"LB012949,10994","accountAmount":"624165","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1605580419000,"createUser":87,"id":4289,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201117102306","paymentType":"现金","remark":"2台车款","serialNumber":"202011170001","unusedAmount":"110035.00","updateTime":1628746681000,"updateUser":83,"usedAmount":"514130.00"},{"abstractInfo":"定金","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1605174049000,"createUser":87,"id":4225,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201112150528","paymentType":"现金","remark":"定金","serialNumber":"202011120001","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"B014670,4671,4740,4570,4672,4738","accountAmount":"1679586","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1604911659000,"createUser":87,"id":4222,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201109132445","paymentType":"现金","remark":"6台车款","serialNumber":"202011090001","unusedAmount":"1679586","usedAmount":"0"},{"abstractInfo":"LB009454/009676/009679/009684/010131/010145/009692/LB012372/010833/010935/010582","accountAmount":"1876842.1","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1603267078000,"createUser":87,"id":3956,"othersAmount":"0","paymentAccount":"815012201421022106","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201021140253","paymentType":"承兑","remark":"车款","serialNumber":"202010210002","unusedAmount":"686842.10","updateTime":1628671425000,"updateUser":83,"usedAmount":"1190000.00"},{"abstractInfo":"车辆定金","accountAmount":"200000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1603264863000,"createUser":87,"id":3953,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201020154218","paymentType":"现金","remark":"车辆定金","serialNumber":"202010200003","unusedAmount":"160000.00","updateTime":1646979156000,"updateUser":82,"usedAmount":"40000.00"},{"abstractInfo":"支付KB018225、KB018226车辆采购定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"陕西远行供应链管理有限公司","clientNo":"0100027","createTime":1602752738000,"createUser":87,"id":3925,"othersAmount":"0","paymentAccount":"26170201040002188","paymentClient":"陕西远行供应链管理有限公司","paymentDate":"20201014144053","paymentType":"现金","remark":"定金","serialNumber":"202010140001","unusedAmount":"40000","updateTime":1604638712000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"LB013061 LB013046","accountAmount":"423302.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1601278970000,"createUser":87,"id":3863,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200928132133","paymentType":"现金","remark":"车辆买断款","serialNumber":"202009280001","unusedAmount":"71302","updateTime":1628747938000,"updateUser":83,"usedAmount":"352000"},{"abstractInfo":"LB007178、4568、/4557/4571/4562、4566/HCC6286","accountAmount":"2374016.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1600851457000,"createUser":87,"id":3710,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200923101016","paymentType":"现金","remark":"7台车款","serialNumber":"202009230001","unusedAmount":"609741.00","updateTime":1628668828000,"updateUser":83,"usedAmount":"1764275.00"},{"abstractInfo":"车辆定金","accountAmount":"100000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1599036312000,"createUser":87,"id":3402,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200902103732","paymentType":"现金","remark":"车辆定金","serialNumber":"202009020001","unusedAmount":"40000.00","updateTime":1640922798000,"updateUser":81,"usedAmount":"60000.00"},{"abstractInfo":"HL18773 HG14765 HG15178 LB000254 LB000269 LB000270 HD10445","accountAmount":"608900","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598606410000,"createUser":87,"id":3359,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828165420","paymentType":"现金","remark":"车辆尾款","serialNumber":"202008280005","unusedAmount":"11500","updateTime":1628747938000,"updateUser":83,"usedAmount":"597400"},{"abstractInfo":"虚拟返利","accountAmount":"824720","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1598608724000,"createUser":87,"id":3361,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280007","unusedAmount":"824720","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"6000","baseAccount":"98250154740006273","belong":"base","clientName":"青岛祥瑞和汽车销售有限公司","clientNo":"100000000170","createTime":1598608724000,"createUser":87,"id":3362,"othersAmount":"0","paymentAccount":"9020102404342050002115","paymentClient":"青岛祥瑞和汽车销售服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280008","unusedAmount":"6000","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"12000","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1598608724000,"createUser":87,"id":3363,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280009","unusedAmount":"12000","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"928800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598608724000,"createUser":87,"id":3364,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280010","unusedAmount":"928800","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"928800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598608724000,"createUser":87,"id":3365,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280011","unusedAmount":"928800","usedAmount":"0"},{"abstractInfo":"2台国六翼6超低顶汽车吊底盘定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","createTime":1598261517000,"createUser":87,"id":3249,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200821171026","paymentType":"现金","remark":"2台国六翼6超低顶汽车吊底盘定金","serialNumber":"202008210002","unusedAmount":"40000","updateTime":1602320004000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"七台牵引车定金","accountAmount":"140000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1595404140000,"createUser":87,"id":1633,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200722152539","paymentType":"现金","remark":"899017250468","serialNumber":"20200722002","unusedAmount":"100000","updateTime":1597312675000,"updateUser":81,"usedAmount":"40000.00"},{"abstractInfo":"定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1595404140000,"createUser":87,"id":1632,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200722144403","paymentType":"现金","remark":"899018330491","serialNumber":"20200722001","unusedAmount":"40000","updateTime":1602320004000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"车辆尾款LB011375 LB011376 LB011377 LB011374 LB011379 LB011380 LB011518 LB011373","accountAmount":"2852728","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1595208249000,"createUser":87,"id":1615,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200716105201","paymentType":"现金","remark":"899012760117","serialNumber":"202007160002","unusedAmount":"209182","updateTime":1628747938000,"updateUser":83,"usedAmount":"2643546"},{"abstractInfo":"付上海远行本部2台牵引车定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1594715650000,"createUser":87,"id":284,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200714143708","paymentType":"现金","remark":"899019180434","serialNumber":"20200714002","unusedAmount":"40000","updateTime":1597312419000,"updateUser":81,"usedAmount":"0.00"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"1703300.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594715650000,"createUser":87,"id":283,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200714092224","paymentType":"现金","remark":"899017340061","serialNumber":"20200714001","unusedAmount":"1703300.00","usedAmount":"0"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594691623000,"createUser":87,"id":279,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200713135953","paymentType":"现金","remark":"899018190425","serialNumber":"20200713004","unusedAmount":"450000","updateTime":1598324141000,"updateUser":83,"usedAmount":"50000"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"4800000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594710572000,"createUser":87,"id":280,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200713135601","paymentType":"现金","remark":"899017770416","serialNumber":"20200713005","unusedAmount":"4800000","usedAmount":"0"},{"abstractInfo":"HL19244\nHL19161\nHL19235\nHL19225\nHL19237\nHL19251\nHL19253\nHL19233\nHL19252\nHL19155","accountAmount":"3338000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594353675000,"createUser":87,"id":272,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200709165115","paymentType":"现金","remark":"899016890702","serialNumber":"20200709001","unusedAmount":"3338000.00","usedAmount":"0"},{"abstractInfo":"HL19227 HL19169 HL19254 HL19246 HL19255 HL19231 HL19241 HL19162 HL19167 HL19160","accountAmount":"3338000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594258236000,"createUser":87,"id":271,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200708151345","paymentType":"现金","remark":"899017440515","serialNumber":"20200708002","unusedAmount":"1569000.00","updateTime":1595066897000,"updateUser":81,"usedAmount":"1769000.00"},{"abstractInfo":"1台车款（LB005903)）","accountAmount":"279470.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1593315299000,"createUser":87,"id":184,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200624183011","paymentType":"现金","remark":"899018421417","serialNumber":"20200624004","unusedAmount":"7090.00","updateTime":1628734341000,"updateUser":83,"usedAmount":"272380.00"},{"abstractInfo":"车架号LB009453/9678/9687","accountAmount":"550000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592990959000,"createUser":87,"id":183,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200624163046","paymentType":"现金","remark":"999015760403","serialNumber":"20200624003","unusedAmount":"550000","usedAmount":"0"},{"abstractInfo":"15台牵引车定金","accountAmount":"300000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1592990959000,"createUser":87,"id":181,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200624133718","paymentType":"现金","remark":"899016870515","serialNumber":"20200624001","unusedAmount":"100000","updateTime":1594622437000,"updateUser":81,"usedAmount":"200000.00"},{"abstractInfo":"车款LB009255","accountAmount":"88140.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1592905297000,"createUser":87,"id":179,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200623124741","paymentType":"现金","remark":"899018500390","serialNumber":"20200623002","unusedAmount":"78140.00","updateTime":1594630687000,"updateUser":81,"usedAmount":"10000.00"},{"abstractInfo":"车款 对应车架号：LB009460/9685/9688","accountAmount":"570000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":174,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200618164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006180001","unusedAmount":"570000","usedAmount":"0"},{"abstractInfo":"4台车款LB005917;5919;5901;5920","accountAmount":"1117880.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1592384831000,"createUser":87,"id":158,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200617170119","paymentType":"现金","remark":"999015140341","serialNumber":"20200617002","unusedAmount":"144574.00","updateTime":1595071278000,"updateUser":81,"usedAmount":"973306.00"},{"abstractInfo":"车款 对应车架号：LB009452、9674、9675、9677、9683","accountAmount":"950000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":173,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200610164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006100001","unusedAmount":"950000","usedAmount":"0"},{"abstractInfo":"付上海远行本部20台牵引车定金","accountAmount":"400000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1591348880000,"createUser":87,"id":145,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200605171853","paymentType":"现金","remark":"899018480890","serialNumber":"20200605004","unusedAmount":"120000","updateTime":1594626698000,"updateUser":81,"usedAmount":"280000.00"},{"abstractInfo":"4台车款HD10214,10209,HC06303,HD11277","accountAmount":"1021200.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1591346261000,"createUser":87,"id":144,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200605161923","paymentType":"现金","remark":"899017590785","serialNumber":"20200605003","unusedAmount":"10000.00","updateTime":1628746098000,"updateUser":83,"usedAmount":"1011200.00"},{"abstractInfo":"10台车款LB005899,005897,005908,005891,005924,004213,004214,004208,004211,004212","accountAmount":"3141685.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1591255533000,"createUser":87,"id":140,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200604100717","paymentType":"现金","remark":"899018350132","serialNumber":"20200604001","unusedAmount":"111170.00","updateTime":1595064700000,"updateUser":81,"usedAmount":"3030515.00"},{"abstractInfo":"LB009456、9670、9671","accountAmount":"563365.91","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":172,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200602164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006020001","unusedAmount":"563365.91","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"4000000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":171,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200529164159","paymentType":"承兑","remark":"999015960311","serialNumber":"202005290002","unusedAmount":"1340000","updateTime":1595038276000,"updateUser":81,"usedAmount":"2660000"},{"abstractInfo":"付上海远行本部二十台自卸车定金","accountAmount":"200000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1590052101000,"createUser":87,"id":106,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200521164502","paymentType":"现金","remark":"899018870574","serialNumber":"20200521012","unusedAmount":"160000","updateTime":1595146256000,"updateUser":81,"usedAmount":"40000"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"80000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1590049736000,"createUser":87,"id":95,"othersAmount":"0","paymentAccount":"840012010900000187","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521001","unusedAmount":"80000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1590049736000,"createUser":87,"id":97,"othersAmount":"0","paymentAccount":"93801880161688008","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521003","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"1045000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1590049736000,"createUser":87,"id":100,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521006","unusedAmount":"665000","updateTime":1597039244000,"updateUser":83,"usedAmount":"380000"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"118200","baseAccount":"98250154740006273","belong":"base","clientName":"青岛运发汽车销售服务有限公司","clientNo":"1001087","createTime":1590049736000,"createUser":87,"id":101,"othersAmount":"0","paymentAccount":"802720200205494","paymentClient":"青岛运发汽车销售服务有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521007","unusedAmount":"118200","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"250000","baseAccount":"98250154740006273","belong":"base","createTime":1590049736000,"createUser":87,"id":102,"othersAmount":"0","paymentAccount":"154739932","paymentClient":"四川臻宏车业有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521008","unusedAmount":"250000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"900","baseAccount":"98250154740006273","belong":"base","clientName":"梁山环球专用汽车制造有限公司","clientNo":"100000000501","createTime":1590049736000,"createUser":87,"id":103,"othersAmount":"0","paymentAccount":"15491101040025936","paymentClient":"梁山环球汽车销售服务有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521009","unusedAmount":"900","usedAmount":"0"},{"abstractInfo":"定金","accountAmount":"500000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1589520932000,"createUser":87,"id":87,"othersAmount":"0","paymentAccount":"840012010900000187","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200514173046","paymentType":"现金","remark":"AAAAA1511935","serialNumber":"20200514001","unusedAmount":"300000","updateTime":1594625476000,"updateUser":81,"usedAmount":"200000.00"},{"abstractInfo":"山西远行车款","accountAmount":"1000000.00","baseAccount":"98250154740006273","belong":"base","clientName":"山西德银远行供应链管理有限公司","clientNo":"0100033","createTime":1589423609000,"createUser":87,"id":76,"othersAmount":"0","paymentAccount":"161401201020524141","paymentClient":"山西德银远行供应链管理有限公司","paymentDate":"20200505165430","paymentType":"现金","remark":"AAAAA5230388","serialNumber":"20200505001","unusedAmount":"1000000.00","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"160000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":63,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200424151755","paymentType":"现金","remark":"899017690565","serialNumber":"20200424001","unusedAmount":"160000.00","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"300000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":58,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200421132004","paymentType":"现金","remark":"899016860337","serialNumber":"20200421001","unusedAmount":"180000.00","updateTime":1589970358000,"updateUser":81,"usedAmount":"120000.00"},{"abstractInfo":"X3L车辆定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":43,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200415152349","paymentType":"现金","remark":"899016540632","serialNumber":"20200415004","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"10000000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":169,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200403164158","paymentType":"承兑","remark":"600310020000001222","serialNumber":"202004030001","unusedAmount":"1432000","updateTime":1595036554000,"updateUser":81,"usedAmount":"8568000"},{"abstractInfo":"KB016358","accountAmount":"150000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":168,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200330164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003300001","unusedAmount":"150000","usedAmount":"0"},{"abstractInfo":"6.8米的全款","accountAmount":"128300.00","baseAccount":"98250154740006273","belong":"base","clientName":"青岛骏邦汽车销售服务有限公司","clientNo":"100000000514","createTime":1593574634000,"createUser":87,"id":239,"othersAmount":"0","paymentAccount":"3803025209200129969","paymentClient":"青岛骏邦汽车销售服务有限公司","paymentDate":"20200330091901","paymentType":"现金","remark":"AAAAA2710104","serialNumber":"20200330001","unusedAmount":"128300.00","usedAmount":"0"},{"abstractInfo":"港牵车定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":237,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200326153803","paymentType":"现金","remark":"899018570483","serialNumber":"20200326001","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"HH16405","accountAmount":"35300.00","baseAccount":"98250154740006273","belong":"base","clientName":"青岛祥瑞和汽车销售有限公司","clientNo":"100000000170","createTime":1593574634000,"createUser":87,"id":236,"othersAmount":"0","paymentAccount":"9020102404342050002115","paymentClient":"青岛祥瑞和汽车销售服务有限公司","paymentDate":"20200325170124","paymentType":"现金","remark":"AAAAA0520577","serialNumber":"20200325006","unusedAmount":"1000.00","updateTime":1595058366000,"updateUser":81,"usedAmount":"34300.00"},{"abstractInfo":"KB010266、016350、016353","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":167,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200319164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003190001","unusedAmount":"500000","usedAmount":"0"},{"abstractInfo":"016360、016354、010235","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":166,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200318164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003180001","unusedAmount":"500000","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"200000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1595041371000,"createUser":86,"id":1113,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316174340","paymentType":"现金","remark":"车辆定金","serialNumber":"20200316099","unusedAmount":"180000","updateTime":1601021078000,"updateUser":45,"usedAmount":"20000"},{"abstractInfo":"车辆定金","accountAmount":"200000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":223,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316174340","paymentType":"现金","remark":"899016770698","serialNumber":"20200316008","unusedAmount":"20000.00","updateTime":1595041216000,"updateUser":81,"usedAmount":"180000.00"},{"abstractInfo":"34辆打包车订金","accountAmount":"340000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1593574634000,"createUser":87,"id":222,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200316162823","paymentType":"现金","remark":"999015320304","serialNumber":"20200316007","unusedAmount":"310000.00","updateTime":1595033766000,"updateUser":81,"usedAmount":"30000.00"},{"abstractInfo":"车款","accountAmount":"100000","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1595141983000,"createUser":86,"id":1605,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20200316152536","paymentType":"现金","remark":"车款","serialNumber":"20200316066","unusedAmount":"10380.00","updateTime":1596090311000,"updateUser":83,"usedAmount":"89620.00"},{"abstractInfo":"车辆尾款YXK1911151","accountAmount":"569800.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":218,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316141853","paymentType":"现金","remark":"899016670409","serialNumber":"20200316003","unusedAmount":"569800.00","usedAmount":"0"},{"abstractInfo":"车辆尾款HE12392","accountAmount":"190500.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":217,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316113713","paymentType":"现金","remark":"999015720135","serialNumber":"20200316002","unusedAmount":"190500.00","usedAmount":"0"},{"abstractInfo":"KB010245","accountAmount":"123925.07","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":165,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200309164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003090001","unusedAmount":"123925.07","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"140000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":212,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200306154919","paymentType":"现金","remark":"899019180452","serialNumber":"20200306001","unusedAmount":"140000.00","usedAmount":"0"},{"abstractInfo":"010265、010269车款及2万合同定金","accountAmount":"300000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":164,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200120164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001200001","unusedAmount":"262500","updateTime":1596873401000,"updateUser":81,"usedAmount":"37500"},{"abstractInfo":"车辆定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":201,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200116103104","paymentType":"现金","remark":"899019100190","serialNumber":"20200116001","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"KB010255、010267","accountAmount":"250000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":162,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200113164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001130001","unusedAmount":"250000","usedAmount":"0"},{"abstractInfo":"车辆尾款","accountAmount":"647900.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":197,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200109105714","paymentType":"现金","remark":"899017060211","serialNumber":"20200109001","unusedAmount":"647900.00","usedAmount":"0"},{"abstractInfo":"010243、010239","accountAmount":"399684.4","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":161,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200108164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001080001","unusedAmount":"399684.4","usedAmount":"0"},{"abstractInfo":"车辆尾款","accountAmount":"568500.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":196,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200107143433","paymentType":"现金","remark":"999015560228","serialNumber":"20200107001","unusedAmount":"568500.00","usedAmount":"0"},{"abstractInfo":"KB016366车款","accountAmount":"100000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":160,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200102164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001020001","unusedAmount":"100000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"1620600","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1594983235000,"createUser":84,"id":1111,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20191231152257","paymentType":"现金","remark":"车款","serialNumber":"20191231099","unusedAmount":"1360151.00","updateTime":1628733594000,"updateUser":83,"usedAmount":"260449.00"},{"abstractInfo":"车辆定金","accountAmount":"60000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1599105559000,"createUser":87,"id":3403,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20191224143315","paymentType":"现金","remark":"车辆定金","serialNumber":"201912240010","unusedAmount":"60000.00","updateTime":1599105672000,"updateUser":83,"usedAmount":"0"},{"abstractInfo":"L 支付11台车尾款","accountAmount":"2242600.00","baseAccount":"98250154740006273","belong":"base","createTime":1598252290000,"createUser":87,"id":3248,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20190424163651","paymentType":"现金","remark":"L 支付11台车尾款","serialNumber":"201904240001","unusedAmount":"1999560.00","updateTime":1598509675000,"updateUser":83,"usedAmount":"243040.00"}] 
```

##### 展开
```
URI_S_20220609161129206: http://127.0.0.1:8082/certificate/getTruckByOrderId,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"orderId":["1226"]}, body: [1226]
SELECT
	t.id,
	t.order_id AS orderId,
	t. NAME,
	t.product_type_name AS productTypeName,
	t.product_type_id AS productTypeId,
	t.platet_type_name AS platetTypeName,
	t.platet_type_id AS platetTypeId,
	t.truck_code AS truckCode,
	t.version,
	t.market_type AS marketType,
	t.truck_type_name AS truckTypeName,
	t.truck_type_id AS truckTypeId,
	t.public_type AS publicType,
	t. STATUS,
	t.remark,
	s.single_price AS singlePrice,
	s.down_price AS downPrice,
	s.down_price_cancel AS downPriceCancel,
	s.down_price_leave AS downPriceLeave,
	s.tail_money AS tailMoney,
	s.tail_money_wait_cancel AS tailMoneyWaitCancel,
	s.tail_money_cancel AS tailMoneyCancel,
	s.sub_single_price AS subSinglePrice,
	s.sub_down_price AS subDownPrice,
	s.sub_down_price_cancel AS subDownPriceCancel,
	s.sub_down_price_leave AS subDownPriceLeave,
	s.sub_tail_money AS subTailMoney,
	s.sub_tail_money_wait_cancel AS subTailMoneyWaitCancel,
	s.sub_tail_money_cancel AS subTailMoneyCancel,
	s.is_on_account AS isOnAccount,
	s.on_account_leave AS onAccountLeave,
	s.on_account_cancel AS onAccountCancel,
	s.logistics_status AS logisticsStatus,
	s.others,
	ii.incoming_time AS incomingTime,
	ii.serial_number AS serialNumber,
	ii.vin,
	ii.engine_number AS engineNumber,
	pi.plan_time AS planTime,
	oi.contact_no AS contactNo,
	s.truck_id AS truckId,
	sm.submission_type as submissionType,
	s.sub_on_account subOnAccount,
	s.sub_on_account_cancel subOnAccountCancel,
	s.sub_client_id subClientId,
	sm.agency_code agencyCode
FROM
	order_truck t
LEFT JOIN order_truck_sell_info s ON
	s.truck_id = t.id
LEFT JOIN incoming_info ii ON
	ii.truck_id = s.truck_id
LEFT JOIN planning_info pi ON
	pi.truck_id = s.truck_id
LEFT JOIN order_info oi ON
	oi.id = s.order_id
LEFT JOIN submission sm ON
	sm.submission_no = oi.submission_no
where
	oi.id = '1226'; 
-- Parameters: 1226(Long)

select id, truck_id, serial_number, attach_type, attach_id, attach_no, create_time, create_user, update_time, update_user from order_truck_attach where truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? or truck_id = ? ;
-- Parameters: 9208(Long), 9209(Long), 9210(Long), 9211(Long), 9212(Long), 9213(Long), 9214(Long), 9215(Long), 9216(Long), 9217(Long), 9218(Long), 9219(Long), 9220(Long), 9221(Long), 9222(Long), 9223(Long), 9224(Long), 9225(Long), 9226(Long), 9227(Long), 9228(Long), 9229(Long), 9230(Long), 9231(Long), 9232(Long), 9233(Long), 9234(Long), 9235(Long), 9236(Long), 9237(Long), 9238(Long), 9239(Long), 9240(Long), 9241(Long), 9242(Long), 9243(Long), 9244(Long), 9245(Long), 9246(Long), 9247(Long), 9248(Long), 9249(Long), 9250(Long), 9251(Long), 9252(Long), 9253(Long), 9254(Long), 9255(Long), 9256(Long), 9257(Long)

URI_E_20220609161129206: http://127.0.0.1:8082/certificate/getTruckByOrderId, time: 22, 
	|--reponse: {"code":0,"data":[{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30001","id":9208,"incomingTime":1617638400000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006618","singlePrice":481125.00,"status":"7","subClientId":873,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":420000.00,"subTailMoney":420000.00,"subTailMoneyCancel":420000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9208,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG847MB006618"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30046","id":9209,"incomingTime":1617638400000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006661","singlePrice":481125.00,"status":"7","subClientId":873,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":420000.00,"subTailMoney":420000.00,"subTailMoneyCancel":420000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9209,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG848MB006661"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30004","id":9210,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006616","singlePrice":481125.00,"status":"6","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":430000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9210,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG843MB006616"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30040","id":9211,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006617","singlePrice":481125.00,"status":"6","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":430000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9211,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006617"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30034","id":9212,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006619","singlePrice":481125.00,"status":"7","subClientId":1353,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":450000.00,"subOnAccountCancel":427000.00,"subSinglePrice":450000.00,"subTailMoney":450000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9212,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG849MB006619"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30035","id":9213,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006620","singlePrice":481125.00,"status":"6","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":430000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9213,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006620"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30048","id":9214,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006621","singlePrice":481125.00,"status":"7","subClientId":1252,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":425000.00,"subTailMoney":425000.00,"subTailMoneyCancel":425000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9214,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG847MB006621"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30037","id":9215,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006622","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9215,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG849MB006622"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30042","id":9216,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006623","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9216,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG840MB006623"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30038","id":9217,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006624","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9217,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG842MB006624"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30030","id":9218,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006625","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9218,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG844MB006625"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30041","id":9219,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006626","singlePrice":481125.00,"status":"7","subClientId":1353,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":450000.00,"subOnAccountCancel":427000.00,"subSinglePrice":450000.00,"subTailMoney":450000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9219,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG846MB006626"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30043","id":9220,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006627","singlePrice":481125.00,"status":"6","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":430000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9220,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG848MB006627"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30050","id":9221,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006628","singlePrice":481125.00,"status":"7","subClientId":1353,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":450000.00,"subOnAccountCancel":427000.00,"subSinglePrice":450000.00,"subTailMoney":450000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9221,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG84XMB006628"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30025","id":9222,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006629","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9222,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG841MB006629"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30011","id":9223,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006630","singlePrice":481125.00,"status":"7","subClientId":365,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":430000.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9223,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG848MB006630"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30023","id":9224,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006631","singlePrice":481125.00,"status":"7","subClientId":1353,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":450000.00,"subOnAccountCancel":427000.00,"subSinglePrice":450000.00,"subTailMoney":450000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9224,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG84XMB006631"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30012","id":9225,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006632","singlePrice":481125.00,"status":"7","subClientId":1253,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":425000.00,"subTailMoney":425000.00,"subTailMoneyCancel":425000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9225,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG841MB006632"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30010","id":9226,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006633","singlePrice":481125.00,"status":"7","subClientId":1242,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":430000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9226,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG843MB006633"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30007","id":9227,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006634","singlePrice":481125.00,"status":"7","subClientId":365,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":430000.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9227,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006634"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30027","id":9228,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006635","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9228,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG847MB006635"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30032","id":9229,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006636","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9229,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG849MB006636"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30028","id":9230,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006637","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9230,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG840MB006637"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30003","id":9231,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006638","singlePrice":481125.00,"status":"7","subClientId":365,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":430000.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9231,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG842MB006638"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30006","id":9232,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006639","singlePrice":481125.00,"status":"7","subClientId":365,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":430000.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9232,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG844MB006639"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30031","id":9233,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006640","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9233,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG840MB006640"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30022","id":9234,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006642","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9234,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG844MB006642"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30049","id":9235,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006643","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":435000.00,"subOnAccountCancel":0.00,"subSinglePrice":435000.00,"subTailMoney":435000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9235,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG846MB006643"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30033","id":9236,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006644","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9236,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG848MB006644"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30045","id":9237,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006645","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":435000.00,"subOnAccountCancel":0.00,"subSinglePrice":435000.00,"subTailMoney":435000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9237,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG84XMB006645"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30047","id":9238,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006646","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9238,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG841MB006646"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30016","id":9239,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006647","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9239,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG843MB006647"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30036","id":9240,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006648","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":0.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9240,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006648"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30026","id":9241,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006650","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":435000.00,"subOnAccountCancel":0.00,"subSinglePrice":435000.00,"subTailMoney":435000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9241,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG843MB006650"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30021","id":9242,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006651","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":435000.00,"subOnAccountCancel":0.00,"subSinglePrice":435000.00,"subTailMoney":435000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9242,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006651"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30005","id":9243,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006652","singlePrice":481125.00,"status":"7","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":415000.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9243,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG847MB006652"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30017","id":9244,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006653","singlePrice":481125.00,"status":"7","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":415000.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9244,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG849MB006653"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30029","id":9245,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006654","singlePrice":481125.00,"status":"7","subClientId":935,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":435000.00,"subOnAccountCancel":0.00,"subSinglePrice":435000.00,"subTailMoney":435000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9245,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG840MB006654"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30014","id":9246,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006655","singlePrice":481125.00,"status":"7","subClientId":1401,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":423000.00,"subOnAccountCancel":323000.00,"subSinglePrice":423000.00,"subTailMoney":423000.00,"subTailMoneyCancel":100000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9246,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG842MB006655"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30018","id":9247,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006656","singlePrice":481125.00,"status":"7","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":415000.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9247,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG844MB006656"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30044","id":9248,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006657","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9248,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG846MB006657"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30020","id":9249,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006658","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9249,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG848MB006658"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30002","id":9250,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006659","singlePrice":481125.00,"status":"7","subClientId":1279,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":425000.00,"subTailMoney":425000.00,"subTailMoneyCancel":425000.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9250,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG84XMB006659"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30019","id":9251,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006660","singlePrice":481125.00,"status":"7","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":415000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9251,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG846MB006660"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30013","id":9252,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006662","singlePrice":481125.00,"status":"7","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":415000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9252,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG84XMB006662"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30009","id":9253,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1429,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006663","singlePrice":481125.00,"status":"6","subClientId":1,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":415000.00,"subTailMoney":415000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":415000.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9253,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG841MB006663"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30015","id":9254,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006664","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9254,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG843MB006664"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30008","id":9255,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006665","singlePrice":481125.00,"status":"7","subClientId":365,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":430000.00,"subOnAccountCancel":430000.00,"subSinglePrice":430000.00,"subTailMoney":430000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9255,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG845MB006665"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30024","id":9256,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006641","singlePrice":481125.00,"status":"7","subClientId":945,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":425000.00,"subOnAccountCancel":425000.00,"subSinglePrice":425000.00,"subTailMoney":425000.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9256,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG842MB006641"},{"agencyCode":"20190724162907561293","contactNo":"SJ202104-0002","downPrice":10000.00,"downPriceCancel":0.00,"downPriceLeave":10000.00,"engineNumber":"13N8H4M30039","id":9257,"incomingTime":1617811200000,"isOnAccount":false,"logisticsStatus":"","marketType":"原煤/ 焦炭","name":"轩德翼3系6×4-CNG","onAccountCancel":0.00,"onAccountLeave":0.00,"orderId":1226,"others":"","planTime":1617638400000,"platetTypeId":1,"platetTypeName":"牵引车","productTypeId":30,"productTypeName":"常规车","publicType":"SX4251MPN404","remark":"驾驶室：翼3加长高顶标配版（新内饰、主驾气囊减震座椅、电动车窗、自动恒温空调、收放机（带5寸屏）、中控锁（2把钥匙）、智雅版天行健、整体式后视镜、LED大灯、发光标徽、窗帘、多功能方向盘（多媒体）、7寸彩色液晶屏组合仪表、遮阳罩、预留顶侧导流罩安装孔）；四点气囊悬置；电动翻转；右转弯语音提示；车道偏离预警、前向碰撞报警；300W逆变电源；驾驶室颜色：赤红。\r\n底盘：贴服式/直流空滤器；整体式防飞溅挡泥板；普通50鞍座；国产四通道ABS；伸缩轴换挡；165Ah免维护蓄电池；铝合金储气筒；前铝后钢轮辋；小轮边铸造后桥；缸内制动；双缸空压机；制动蹄片磨损报警；铁质操作平台；导静电橡胶拖地带；前后桥轮边免维护。","serialNumber":"MB006649","singlePrice":481125.00,"status":"6","subClientId":0,"subDownPrice":0.00,"subDownPriceCancel":0.00,"subDownPriceLeave":0.00,"subOnAccount":0.00,"subOnAccountCancel":0.00,"subSinglePrice":0.00,"subTailMoney":0.00,"subTailMoneyCancel":0.00,"subTailMoneyWaitCancel":0.00,"submissionType":"1","tailMoney":471125.00,"tailMoneyCancel":0.00,"tailMoneyWaitCancel":471125.00,"truckCode":"SX4256G3Y46Q4040N","truckId":9257,"truckTypeId":28,"truckTypeName":"轩德翼3系64QY","version":"轻量化","vin":"LZGJLG847MB006649"}],"attachMap":{},"attachDataMap":{},"success":true} 
```
##### 查看订单
```
2022-06-09 16:48:42.318  INFO 16432 --- [io-8082-exec-27] com.clgg.aop.aspect.LogRecordAspect      : URI_S_20220609164842317: http://127.0.0.1:8082/order/goDetail,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"id":["1226"]}, body: [1226,{}]
select
	DISTINCT oi.id,
	oi.submission_id,
	oi.submission_no,
	oi.order_no,
	oi.contact_no,
	oi.numbers,
	oi.contract_price,
	oi.single_price,
	oi.total_price,
	(
	SELECT
		manufactor_contact_no
	FROM
		planning_info
	WHERE
		truck_id = null) AS manufactor_contact_no,
	(
	SELECT
		manufactor_name
	FROM
		planning_info
	WHERE
		truck_id = null) AS manufactor_name,
	oi.down_price,
	oi.down_price_cancel,
	oi.down_price_leave,
	oi.final_payment_contract,
	oi.final_payment,
	oi.final_payment_leave,
	oi.final_payment_credit,
	oi.status,
	oi.product_type_name,
	oi.product_type_id,
	oi.platet_type_name,
	oi.platet_type_id,
	oi.truck_code,
	oi.truck_type_name,
	oi.truck_type_id,
	oi.public_type,
	oi.submit_client,
	oi.work_flow_node,
	oi.agency_code,
	oi.current_step,
	oi.current_check_user,
	oi.basic_config_name,
	oi.submit_time,
	oi.create_time,
	sm.submission_type,
	oi.order_strategy
from
	order_info oi
left join submission sm on
	sm.submission_no = oi.submission_no
left join allot_info ai on
	ai.apply_no = oi.submission_no
WHERE
	oi.id = 1226
order by
	oi.create_time desc,
	oi.order_no desc; 
-- Parameters: null, null, 1226(Long)

SELECT ii.serial_number serialNumber,oi.submit_client submitClient,rci.house_name houseName,rci.address address,rci.receive_name receiveName,rci.receive_phone receivePhone, pli.manufactor_name manufactorName,pli.bh_order_no bhOrderNo,pli.manufactor_contact_no manufactorContactNo from order_info oi LEFT JOIN order_truck ot on ot.order_id = oi.id LEFT JOIN repertory_info ri on ot.id = ri.truck_id LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN receive_info rci on rci.id = ri.receive_id LEFT JOIN planning_info pli on pli.truck_id = ot.id where oi.id = 1226; 
-- Parameters: 1226(Long)

select id, submission_no, name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_code, version, market_type, truck_type_name, truck_type_id, public_type, engine_type, horsepower, wheel_base, cab_type, speed_changing_box, frame, front_axle, behand_axle, front_spring, behand_spring, fuel_tank, tyre_type, number, standard_price, adjust_price, price, total_price, end_price, down_price, remark, status, create_user, create_date, update_user, update_date, work_flow_node, agency_code, current_step, current_check_user, basic_config_name, matching_information, contact_total_price, contact_single_price, current_flow_position,intention_no, source,intention_id,is_reform,choose_config,discount_rate,discount_price,agency_client_id, sub_single_price,sub_down_price,sub_total_price,manufactor_id,order_strategy,so_type,reform_price,fare,submission_type,cab_color from submission where submission_no = 'T20210330001' LIMIT 1; 
-- Parameters: T20210330001(String)

select DISTINCT file_path from file_repository where apply_no='T20210330001' and subject_type = '8' 
-- Parameters: T20210330001(String), 8(String)
2022-06-09 16:48:42.505  INFO 16432 --- [io-8082-exec-27] com.clgg.aop.aspect.LogRecordAspect      : URI_E_20220609164842317: http://127.0.0.1:8082/order/goDetail, time: 187, 
	|--reponse: "order/detail" 
```

##### 查看提报单
```
2022-06-09 16:49:10.150  INFO 16432 --- [nio-8082-exec-6] com.clgg.aop.aspect.LogRecordAspect      : URI_S_20220609164910149: http://127.0.0.1:8082/submission/viewByNo,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"submissionNo":["T20210330001"]}, body: ["T20210330001",null,{}]
	
select id, submission_no, name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_code, version, market_type, truck_type_name, truck_type_id, public_type, engine_type, horsepower, wheel_base, cab_type, speed_changing_box, frame, front_axle, behand_axle, front_spring, behand_spring, fuel_tank, tyre_type, number, standard_price, adjust_price, price, total_price, end_price, down_price, remark, status, create_user, create_date, update_user, update_date, work_flow_node, agency_code, current_step, current_check_user, basic_config_name, matching_information, contact_total_price, contact_single_price, current_flow_position,intention_no, source,intention_id,is_reform,choose_config,discount_rate,discount_price,agency_client_id, sub_single_price,sub_down_price,sub_total_price,manufactor_id,order_strategy,so_type,reform_price,fare,submission_type,cab_color from submission where submission_no = 'T20210330001' LIMIT 1; 
-- Parameters: T20210330001(String)

select DISTINCT file_path from file_repository where apply_no='T20210330001' and subject_type = '8' 
-- Parameters: T20210330001(String), 8(String)

select id, submission_no, order_no, reason, original_price, price, create_user, create_time from price_revision_submission where submission_no = 'T20210330001'
-- Parameters: T20210330001(String)

-- 选配信息
select s.id, s.selection_id, s.selection_detail_id, s.submission_no, s.selection_price,bs.project_name,bd.selection_content,bd.selection_unit,bd.remark from submission_selection s left join basic_config_selection bs on bs.id = s.selection_id left join basic_config_selection_detail bd on bd.id = s.selection_detail_id where s.submission_no = 'T20210330001'; 
-- Parameters: T20210330001(String)

2022-06-09 16:49:10.228  INFO 16432 --- [nio-8082-exec-6] com.clgg.aop.aspect.LogRecordAspect      : URI_E_20220609164910149: http://127.0.0.1:8082/submission/viewByNo, time: 79, 
	|--reponse: "submission/view" 
```

### 车款核销列表
- http://127.0.0.1:8081/writeOff/report
```
URI_S_20220531161600710: /writeOff/report,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM (SELECT ot.id truckId, o.submission_no submissionNo, o.order_no orderNo, o.contact_no contactNo, ot.name, ot.product_type_name productType, ot.platet_type_name plateType, ot.public_type publicType, ot.truck_type_name truckType, ot.truck_code truckCode, o.single_price singlePrice, i.vin, i.engine_number engineNo, i.serial_number serialNumber, ci.belong agencyCode FROM order_truck ot LEFT JOIN order_info o ON o.id = ot.order_id LEFT JOIN incoming_info i ON i.truck_id = ot.id LEFT JOIN write_off wof ON wof.truck_id = ot.id LEFT JOIN write_off_detail wod ON wod.write_off_id = wof.id LEFT JOIN capital_inflow ci ON ci.id = wod.inflow_id LEFT JOIN sys_user su ON su.id = wof.create_user WHERE su.agency_code = ? AND ci.belong = ? AND wof.id IS NOT NULL GROUP BY ot.id) table_count 
==> Parameters: base(String), base(String)
<==      Total: 1
==>  Preparing: select ot.id truckId, o.submission_no submissionNo, o.order_no orderNo, o.contact_no contactNo, ot.name, ot.product_type_name productType, ot.platet_type_name plateType, ot.public_type publicType, ot.truck_type_name truckType, ot.truck_code truckCode, o.single_price singlePrice, i.vin, i.engine_number engineNo, i.serial_number serialNumber,ci.belong agencyCode from order_truck ot left join order_info o on o.id = ot.order_id left join incoming_info i on i.truck_id = ot.id LEFT JOIN write_off wof on wof.truck_id = ot.id left join write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id LEFT JOIN sys_user su on su.id = wof.create_user WHERE su.agency_code = ? and ci.belong = ? and wof.id is not null group by ot.id ORDER BY wof.write_off_time desc limit ?,? 
==> Parameters: base(String), base(String), 0(Integer), 10(Integer)
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9506(Long), base(String), 9506(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9557(Long), base(String), 9557(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9597(Long), base(String), 9597(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9603(Long), base(String), 9603(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9594(Long), base(String), 9594(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9528(Long), base(String), 9528(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9626(Long), base(String), 9626(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9584(Long), base(String), 9584(Long), base(String)
<====      Total: 1
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9520(Long), base(String), 9520(Long), base(String)
<====      Total: 2
====>  Preparing: select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.belong = ? union all select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,ci.rebate_year paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN rebate_detail ci on ci.id = wd.rebate_id left join sys_user su on su.id = w.create_user where w.truck_id = ? and ci.agency_code = ? 
====> Parameters: 9648(Long), base(String), 9648(Long), base(String)
<====      Total: 1
<==      Total: 10
URI_E_20220531161600710: /writeOff/report, time: 326, 
	|--reponse: "write_off/write_off_report" 

```
### 凭证管理

#### 财务入库凭证
- http://127.0.0.1:8081/voucher/index
```
URI_S_20220531161753899: /voucher/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vb.id, vb.company, vb.record_date, vb.business_date, vb.capital_month, vb.voucher_type, vb.voucher_no, vb.entry_no, vb.remark, vb.subject, vb.currency, vb.exchange_rate, vb.direction, vb.amount, vb.numbers, vb.single_price, vb.debtor_amount, vb.lender_amount, vb.flow_marker, vb.accounting_items, vb.item_no, vb.item_name, vb.bill_flow_id, vb.export_nums, vb.agency_code, vb.serial_number FROM voucher_bill vb WHERE vb.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vb.id, vb.company, vb.record_date, vb.business_date, vb.capital_month, vb.voucher_type, vb.voucher_no, vb.entry_no, vb.remark, vb.subject, vb.currency, vb.exchange_rate, vb.direction, vb.amount, vb.numbers, vb.single_price, vb.debtor_amount, vb.lender_amount, vb.flow_marker, vb.accounting_items, vb.item_no, vb.item_name, vb.bill_flow_id, vb.export_nums,vb.agency_code,vb.serial_number FROM voucher_bill vb WHERE vb.agency_code = ? order by vb.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 12(Integer)
<==      Total: 12
URI_E_20220531161753899: /voucher/index, time: 112, 
	|--reponse: "voucher/voucherBill" 

```
#### 流水进账凭证
- http://127.0.0.1:8081/voucher/capital
```
URI_S_20220531161838307: /voucher/capital,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.capital_flow_id, vc.export_nums, vc.agency_code, vc.bank_code, vc.bank_fullName FROM voucher_capital vc WHERE vc.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.capital_flow_id, vc.export_nums,vc.agency_code,vc.bank_code,vc.bank_fullName from voucher_capital vc WHERE vc.agency_code = ? order by vc.id desc,vc.entry_no limit ?,? 
==> Parameters: base(String), 0(Integer), 20(Integer)
<==      Total: 20
URI_E_20220531161838307: /voucher/capital, time: 143, 
	|--reponse: "voucher/index" 

```
#### 收款核销凭证
- http://127.0.0.1:8081/voucher/writeOff
```
URI_S_20220531161907506: /voucher/writeOff,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vwo.id, vwo.company, vwo.record_date, vwo.business_date, vwo.capital_month, vwo.voucher_type, vwo.voucher_no, vwo.entry_no, vwo.remark, vwo.subject, vwo.currency, vwo.exchange_rate, vwo.direction, vwo.amount, vwo.numbers, vwo.single_price, vwo.debtor_amount, vwo.lender_amount, vwo.flow_marker, vwo.accounting_items, vwo.item_no, vwo.item_name, vwo.write_off_id, vwo.export_nums, vwo.agency_code FROM voucher_write_off vwo WHERE vwo.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vwo.id, vwo.company, vwo.record_date, vwo.business_date, vwo.capital_month, vwo.voucher_type, vwo.voucher_no, vwo.entry_no, vwo.remark, vwo.subject, vwo.currency, vwo.exchange_rate, vwo.direction, vwo.amount, vwo.numbers, vwo.single_price, vwo.debtor_amount, vwo.lender_amount, vwo.flow_marker, vwo.accounting_items, vwo.item_no, vwo.item_name, vwo.write_off_id, vwo.export_nums,vwo.agency_code FROM voucher_write_off vwo WHERE vwo.agency_code = ? order by vwo.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 20(Integer)
<==      Total: 20
URI_E_20220531161907506: /voucher/writeOff, time: 93, 
	|--reponse: "voucher/write_off" 

```
#### 财务出库凭证
- http://127.0.0.1:8081/voucher/sales
```
URI_S_20220531161950521: /voucher/sales,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vs.id, vs.company, vs.record_date, vs.business_date, vs.capital_month, vs.voucher_type, vs.voucher_no, vs.entry_no, vs.remark, vs.subject, vs.currency, vs.exchange_rate, vs.direction, vs.amount, vs.numbers, vs.single_price, vs.debtor_amount, vs.lender_amount, vs.flow_marker, vs.accounting_items, vs.item_no, vs.item_name, vs.sales_ticket_id, vs.export_nums, vs.project, vs.agency_code, vs.serial_number FROM voucher_sales vs WHERE vs.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vs.id, vs.company, vs.record_date, vs.business_date, vs.capital_month, vs.voucher_type, vs.voucher_no, vs.entry_no, vs.remark, vs.subject, vs.currency, vs.exchange_rate, vs.direction, vs.amount, vs.numbers, vs.single_price, vs.debtor_amount, vs.lender_amount, vs.flow_marker, vs.accounting_items, vs.item_no, vs.item_name, vs.sales_ticket_id, vs.export_nums,vs.project,vs.agency_code,vs.serial_number FROM voucher_sales vs WHERE vs.agency_code = ? order by vs.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 20(Integer)
<==      Total: 20
URI_E_20220531161950521: /voucher/sales, time: 138, 
	|--reponse: "voucher/sales" 

```
#### 结转成本凭证
- http://127.0.0.1:8081/voucher/carryovers
```
URI_S_20220531162019477: /voucher/carryovers,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.sales_ticket_id, vc.export_nums, vc.project, vc.agency_code, vc.serial_number, vc.invoice_type FROM voucher_carryovers vc WHERE vc.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.sales_ticket_id, vc.export_nums,vc.project, vc.agency_code,vc.serial_number,vc.invoice_type FROM voucher_carryovers vc WHERE vc.agency_code = ? order by vc.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 20(Integer)
<==      Total: 20
URI_E_20220531162019477: /voucher/carryovers, time: 124, 
	|--reponse: "voucher/carryovers" 

```
#### 付款凭证
- http://127.0.0.1:8081/voucher/payment
```
URI_S_20220531162042779: /voucher/payment,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.bill_flow_id, vc.export_nums, vc.agency_code, vc.bank_code, vc.bank_fullName FROM voucher_payment vc WHERE vc.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vc.id, vc.company, vc.record_date, vc.business_date, vc.capital_month, vc.voucher_type, vc.voucher_no, vc.entry_no, vc.remark, vc.subject, vc.currency, vc.exchange_rate, vc.direction, vc.amount, vc.numbers, vc.single_price, vc.debtor_amount, vc.lender_amount, vc.flow_marker, vc.accounting_items, vc.item_no, vc.item_name, vc.bill_flow_id, vc.export_nums,vc.agency_code,vc.bank_code,vc.bank_fullName from voucher_payment vc WHERE vc.agency_code = ? order by vc.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 12(Integer)
<==      Total: 12
URI_E_20220531162042779: /voucher/payment, time: 127, 
	|--reponse: "voucher/voucherPayment" 

```
#### 付款核销凭证

- http://127.0.0.1:8081/voucher/writeOffPayment
```
URI_S_20220531162117886: /voucher/writeOffPayment,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT vwo.id, vwo.company, vwo.record_date, vwo.business_date, vwo.capital_month, vwo.voucher_type, vwo.voucher_no, vwo.entry_no, vwo.remark, vwo.subject, vwo.currency, vwo.exchange_rate, vwo.direction, vwo.amount, vwo.numbers, vwo.single_price, vwo.debtor_amount, vwo.lender_amount, vwo.flow_marker, vwo.accounting_items, vwo.item_no, vwo.item_name, vwo.write_off_id, vwo.export_nums, vwo.agency_code FROM voucher_payment_write_off vwo WHERE vwo.agency_code = ?) table_count 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT DISTINCT vwo.id, vwo.company, vwo.record_date, vwo.business_date, vwo.capital_month, vwo.voucher_type, vwo.voucher_no, vwo.entry_no, vwo.remark, vwo.subject, vwo.currency, vwo.exchange_rate, vwo.direction, vwo.amount, vwo.numbers, vwo.single_price, vwo.debtor_amount, vwo.lender_amount, vwo.flow_marker, vwo.accounting_items, vwo.item_no, vwo.item_name, vwo.write_off_id, vwo.export_nums,vwo.agency_code FROM voucher_payment_write_off vwo WHERE vwo.agency_code = ? order by vwo.id desc limit ?,? 
==> Parameters: base(String), 0(Integer), 12(Integer)
<==      Total: 12
URI_E_20220531162117886: /voucher/writeOffPayment, time: 55, 
	|--reponse: "voucher/write_off_payment" 

```
### 暂估管理
#### 全部


- http://127.0.0.1:8081/estimate/list
```
URI_S_20220531162307952: /estimate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM estimate_apply ea 
==> Parameters: 
<==      Total: 1
==>  Preparing: select ea.id, ea.truck_number, ea.apply_no, ea.invoice_company, ea.invoice_company_code, ea.invoice_money, ea.capitalization, ea.invoice_for_company, ea.invoice_for_company_code, ea.invoice_remark, ea.create_user, ea.create_time, ea.contact_no, ea.check_status, ea.estimate_date, ea.estimate_status, ea.estimate_type, ea.client_name, ea.client_no from estimate_apply ea order by check_status,estimate_date limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 5
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210315001(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210315002(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210224001(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210226001(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210226002(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531162307952: /estimate/list, time: 313, 
	|--reponse: "estimate/list" 

```
#### 待审核
- http://127.0.0.1:8081/estimate/list?checkStatus=1
```
URI_S_20220531162632562: /estimate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["1"]}, body: null
==>  Preparing: SELECT count(0) FROM estimate_apply ea LEFT JOIN approval_manager am ON am.apply_no = ea.apply_no WHERE ea.check_status = ? AND am.current_check_user = ? 
==> Parameters: 1(String), 1(Long)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531162632562: /estimate/list, time: 136, 
	|--reponse: "estimate/list" 

```
#### 已完成
- http://127.0.0.1:8081/estimate/list?checkStatus=2
```
URI_S_20220531162715595: /estimate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["2"]}, body: null
==>  Preparing: SELECT count(0) FROM estimate_apply ea WHERE ea.check_status = ? 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531162715595: /estimate/list, time: 55, 
	|--reponse: "estimate/list" 

```
#### 已驳回
- http://127.0.0.1:8081/estimate/list?checkStatus=3
```
URI_S_20220531162801584: /estimate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["3"]}, body: null
==>  Preparing: SELECT count(0) FROM estimate_apply ea WHERE ea.check_status = ? 
==> Parameters: 3(String)
<==      Total: 1
==>  Preparing: select ea.id, ea.truck_number, ea.apply_no, ea.invoice_company, ea.invoice_company_code, ea.invoice_money, ea.capitalization, ea.invoice_for_company, ea.invoice_for_company_code, ea.invoice_remark, ea.create_user, ea.create_time, ea.contact_no, ea.check_status, ea.estimate_date, ea.estimate_status, ea.estimate_type, ea.client_name, ea.client_no from estimate_apply ea WHERE ea.check_status = ? order by check_status,estimate_date limit ?,? 
==> Parameters: 3(String), 0(Integer), 10(Integer)
<==      Total: 3
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210224001(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210226001(String)
<==      Total: 1
==>  Preparing: select id, approval_type, apply_no, current_order, current_check_user, current_agency_code, current_status, next_order, next_check_user, next_agency_code,approval_step_id,approval_name_id,create_time,create_user,update_time,update_user from approval_manager where apply_no = ? 
==> Parameters: ZG20210226002(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531162801584: /estimate/list, time: 658, 
	|--reponse: "estimate/list" 

```
#### 待冲销列表
- http://127.0.0.1:8081/estimate/list?estimateStatus=1&checkStatus=2
```
URI_S_20220531162847936: /estimate/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"estimateStatus":["1"],"checkStatus":["2"]}, body: null
==>  Preparing: SELECT count(0) FROM estimate_apply ea WHERE ea.check_status = ? AND ea.estimate_status = ? 
==> Parameters: 2(String), 1(String)
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531162847936: /estimate/list, time: 56, 
	|--reponse: "estimate/list" 

```
#### 返利发票登记列表
- http://127.0.0.1:8081/estimate/registerList
```
URI_S_20220531162950854: /estimate/registerList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM estimate_invoice_register eir LEFT JOIN estimate_type et ON eir.estimate_type_id = et.id 
==> Parameters: 
<==      Total: 1
URI_E_20220531162950854: /estimate/registerList, time: 17, 
	|--reponse: "estimate/register_list" 

```
#### 暂估报表
- http://127.0.0.1:8081/estimate/reportList
```
URI_S_20220531163018682: /estimate/reportList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653985791167,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
URI_E_20220531163018682: /estimate/reportList, time: 0, 
	|--reponse: "estimate/estimate_report" 

```

### 红字发票管理
#### 红字发票申请
- http://127.0.0.1:8081/credit/list
```
URI_S_20220531163223893: /credit/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653985887504,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc 
==> Parameters: 
<==      Total: 50
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = ? 
==> Parameters: base(String)
<==      Total: 1
URI_E_20220531163223893: /credit/list, time: 35, 
	|--reponse: "credit/list" 

```
#### 待审核列表
- http://127.0.0.1:8081/credit/registerlist?checkStatus=1
```
URI_S_20220531163256208: /credit/registerlist,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["1"]}, body: null
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT i.apply_no, i.agency_code, i.id, i.order_no, i.applyer, i.invoice_company, i.project_name, i.invoice_type, i.invoice_rate, i.invoice_money, i.capitalization, i.lowercase, i.invoice_rate_no, i.invoice_bank, i.invoice_for_company, i.invoice_bank_account, i.invoice_address, i.invoice_phone, i.invoice_remark, i.create_user, i.create_time, i.update_user, i.update_time, i.submission_no, i.contact_no, i.current_step_order, i.current_check_user, i.current_position, i.current_check_status, i.invoice_rate_money, iac.submission_type FROM invoice_apply i LEFT JOIN invoice_apply_content iac ON iac.apply_no = i.apply_no WHERE i.apply_invoice_type = 1 AND i.current_check_status REGEXP "待审核") table_count 
==> Parameters: 
<==      Total: 1
URI_E_20220531163256208: /credit/registerlist, time: 52, 
	|--reponse: "credit/credit_sub_list" 

```
#### 待登记列表
- http://127.0.0.1:8081/credit/registerlist?checkStatus=2
```
URI_S_20220531163358064: /credit/registerlist,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["2"]}, body: null
==>  Preparing: SELECT count(0) FROM bill_register br LEFT JOIN sys_agency sa ON sa.tax_number = br.invoice_rate_no LEFT JOIN bill_register_detail brd ON brd.apply_no = br.apply_no WHERE br.apply_invoice_type = 1 AND brd.id IS NULL 
==> Parameters: 
<==      Total: 1
URI_E_20220531163358064: /credit/registerlist, time: 48, 
	|--reponse: "credit/credit_list" 

```
#### 已完成
- http://127.0.0.1:8081/credit/registerlist?checkStatus=3
```
URI_S_20220531163436718: /credit/registerlist,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["3"]}, body: null
==>  Preparing: SELECT count(0) FROM bill_register br LEFT JOIN sys_agency sa ON sa.tax_number = br.invoice_rate_no LEFT JOIN bill_register_detail brd ON brd.apply_no = br.apply_no WHERE br.apply_invoice_type = 1 AND brd.id IS NOT NULL 
==> Parameters: 
<==      Total: 1
URI_E_20220531163436718: /credit/registerlist, time: 54, 
	|--reponse: "credit/credit_list" 
```

## 电子合同
### 电子合同管理
- http://127.0.0.1:8081/ele_contract/list
```
URI_S_20220531163727930: /ele_contract/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = "0" 
==> Parameters: 
<==      Total: 22
==>  Preparing: SELECT count(0) FROM t_contract_infos tci LEFT JOIN t_signature_infos tsi ON tci.the_seller_company_name = tsi.agency_name WHERE contract_id IS NOT NULL 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT tci.id, tci.contract_id, tci.contract_no, tci.contract_name, tci.submission_type, tci.is_intention, tci.intention_no, tci.contract_type, tci.STATUS, tci.the_seller, tci.the_buyer, tci.sign_address, tci.object_name, tci.notice_type, tci.brand_vender, tci.`number`, tci.single_price, tci.total_price, tci.delivery_time, tci.standard_infos, tci.optional_infos, tci.amount_lower, tci.amount_capital, tci.down_price_method, tci.down_price, tci.down_price_capital, tci.delivery_method, tci.delivery_method1_address, tci.delivery_method2_address, tci.delivery_method2_pick_one, tci.other_matters, tci.the_seller_company_name, tci.the_seller_abode, tci.the_seller_legal_person, tci.the_seller_agent, tci.the_seller_deposit_bank, tci.the_seller_bank_account, tci.the_buyer_company_name, tci.the_buyer_abode, tci.the_buyer_legal_person, tci.the_buyer_agent, tci.the_buyer_deposit_bank, tci.the_buyer_bank_account, tci.the_seller_agent_phone, tci.the_seller_agent_type, tci.the_seller_agent_role, tci.the_buyer_agent_phone, tci.the_buyer_agent_type, tci.the_buyer_agent_role, tci.create_user, tci.create_time FROM t_contract_infos tci LEFT JOIN t_signature_infos tsi ON tci.the_seller_company_name = tsi.agency_name WHERE contract_id IS NOT NULL ORDER BY create_time DESC limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 8
URI_E_20220531163727930: /ele_contract/list, time: 96, 
	|--reponse: "ele_contract/ele_contract_list" 

```

## 库存管理  0
### 调拨管理
#### 调拨申请
- http://127.0.0.1:8081/allot/index?dataFlag=0
```
URI_S_20220531164038122: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["0"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164038122: /allot/index, time: 63, 
	|--reponse: "allot/list" 
```
- http://127.0.0.1:8081/allot/getAllotData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&status=
```

URI_S_20220531164038654: /allot/getAllotData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"status":[""]}, body: [{"agencyCode":"","pageNo":0,"pageSize":10,"status":"","truckCode":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986438514,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: select count(0) from (select case vb.vehicle_belong is null when true then sa.agency_simple_name else sa2.agency_simple_name end agencyName, case vb.vehicle_belong is null when true then o.agency_code else vb.vehicle_belong end agencyCode, rei.address address, ri.receive_id receiveId, ot.truck_type_id truckTypeId, ot.truck_type_name truckTypeName, ot.truck_code truckCode, ot.status status, count(ot.id) count, avg(os.single_price) singlePrice from order_info o left join order_truck ot on ot.order_id = o.id left join order_truck_sell_info os on os.truck_id = ot.id left join sys_agency sa on sa.agency_code_ours = o.agency_code left join repertory_info ri on ri.truck_id = ot.id left join receive_info rei on rei.id = ri.receive_id left join vehicle_belong vb on vb.vehicle_no = ot.id left join sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong WHERE (ot.status = 1 or ot.status = 2 or ot.status = 6 or ot.status = 61 or ot.status = 0) and ((vb.vehicle_belong is null and o.agency_code != ?) or (vb.vehicle_belong is not null and vb.vehicle_belong != ?)) and (os.sub_client_id is null or os.sub_client_id = '') group by o.agency_code, rei.id, ot.truck_type_id,ot.status,ot.truck_code) tmp_count 
==> Parameters: base(String), base(String)
<==      Total: 1
==>  Preparing: select case vb.vehicle_belong is null when true then sa.agency_simple_name else sa2.agency_simple_name end agencyName, case vb.vehicle_belong is null when true then o.agency_code else vb.vehicle_belong end agencyCode, rei.address address, ri.receive_id receiveId, ot.truck_type_id truckTypeId, ot.truck_type_name truckTypeName, ot.truck_code truckCode, ot.status status, count(ot.id) count, avg(os.single_price) singlePrice from order_info o left join order_truck ot on ot.order_id = o.id left join order_truck_sell_info os on os.truck_id = ot.id left join sys_agency sa on sa.agency_code_ours = o.agency_code left join repertory_info ri on ri.truck_id = ot.id left join receive_info rei on rei.id = ri.receive_id left join vehicle_belong vb on vb.vehicle_no = ot.id left join sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong WHERE (ot.status = 1 or ot.status = 2 or ot.status = 6 or ot.status = 61 or ot.status = 0) and ((vb.vehicle_belong is null and o.agency_code != ?) or (vb.vehicle_belong is not null and vb.vehicle_belong != ?)) and (os.sub_client_id is null or os.sub_client_id = '') group by o.agency_code, rei.id, ot.truck_type_id,ot.status,ot.truck_code limit ?,? 
==> Parameters: base(String), base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164038654: /allot/getAllotData, time: 109, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"address":"苏州吴中经济开发区227省道尹山段299号1幢","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"81","receiveId":170,"singlePrice":"109100.00","status":"6","truckCode":"SX1046E1K16B3310","truckTypeId":"13","truckTypeName":"轩德9系42WL"},{"address":"南通市港闸区城港路309号","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"97","receiveId":403,"singlePrice":"119058.76","status":"6","truckCode":"SX1046E1K16B3310","truckTypeId":"13","truckTypeName":"轩德9系42WL"},{"address":"张家港市后塍朱家宕村双珠路艳蓝环保院内","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"1","receiveId":408,"singlePrice":"367930.00","status":"6","truckCode":"SX4256G2M49Q3240","truckTypeId":"28","truckTypeName":"轩德翼3系64QY"},{"address":"上海市浦东新区海徐路1767号","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"1","receiveId":432,"singlePrice":"420000.00","status":"6","truckCode":"SX4189CY521C","truckTypeId":"40","truckTypeName":"1801项目"},{"address":"上海市浦东新区海徐路1767号","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"1","receiveId":432,"singlePrice":"450000.00","status":"6","truckCode":"SX4259C4454C","truckTypeId":"40","truckTypeName":"1801项目"},{"address":"苏州市姑苏区传化物流园A146-A151室","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"23","receiveId":537,"singlePrice":"131100.00","status":"6","truckCode":"SX1046E3K16B3310","truckTypeId":"44","truckTypeName":"轩德翼9/42WL"},{"address":"无锡市江海西路88号B124","agencyCode":"20190619154208925923","agencyName":"远行物流","count":"22","receiveId":543,"singlePrice":"131100.00","status":"6","truckCode":"SX1046E3K16B3310","truckTypeId":"44","truckTypeName":"轩德翼9/42WL"},{"agencyCode":"20190724162907561293","agencyName":"新疆远行","count":"5","singlePrice":"312174.00","status":"0","truckCode":"SX4255G1M44Q3240","truckTypeId":"1","truckTypeName":"轩德3系64QY"},{"agencyCode":"20190724162907561293","agencyName":"新疆远行","count":"29","receiveId":137,"singlePrice":"330916.00","status":"6","truckCode":"SX4255G3M44Q3245","truckTypeId":"28","truckTypeName":"轩德翼3/64QY"},{"address":"新疆维吾尔自治区喀什地区喀什市夏马勒巴格乡13村","agencyCode":"20190724162907561293","agencyName":"新疆远行","count":"1","receiveId":386,"singlePrice":"331000.00","status":"6","truckCode":"SX4255G3M44Q3244","truckTypeId":"28","truckTypeName":"轩德翼3系64QY"}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":8,"prePage":0,"size":10,"startRow":1,"total":74} 

```
#### 调拨待审批
- http://127.0.0.1:8081/allot/index?dataFlag=1
```
URI_S_20220531164147448: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["1"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164147448: /allot/index, time: 40, 
	|--reponse: "allot/apply_list" 
```
- http://127.0.0.1:8081/allot/getAllotApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&serialNumber=&truckStatus=&status=0
```
URI_S_20220531164147868: /allot/getAllotApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"serialNumber":[""],"truckStatus":[""],"status":["0"]}, body: [{"agencyCode":"","dataFlag":"0","pageNo":0,"pageSize":10,"serialNumber":"","status":"0","truckCode":"","truckStatus":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986507843,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT ai.* FROM allot_info ai LEFT JOIN allot_truck alt ON alt.apply_no = ai.apply_no WHERE ai.status = ? GROUP BY ai.id) table_count 
==> Parameters: 0(String)
<==      Total: 1
URI_E_20220531164147868: /allot/getAllotApplyData, time: 89, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 调拨已完成
- http://127.0.0.1:8081/allot/index?dataFlag=2
```
URI_S_20220531164254323: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["2"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164254323: /allot/index, time: 33, 
	|--reponse: "allot/apply_list" 
```
- http://127.0.0.1:8081/allot/getAllotApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&serialNumber=&truckStatus=&status=1
```
URI_S_20220531164254780: /allot/getAllotApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"serialNumber":[""],"truckStatus":[""],"status":["1"]}, body: [{"agencyCode":"","dataFlag":"0","pageNo":0,"pageSize":10,"serialNumber":"","status":"1","truckCode":"","truckStatus":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986574775,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT ai.* FROM allot_info ai LEFT JOIN allot_truck alt ON alt.apply_no = ai.apply_no WHERE ai.status = ? GROUP BY ai.id) table_count 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select ai.* from allot_info ai left join allot_truck alt on alt.apply_no = ai.apply_no WHERE ai.status = ? group by ai.id order by create_date desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164254780: /allot/getAllotApplyData, time: 130, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"allotAmount":"416000","allotFreight":"0","allotInAddress":"新疆维吾尔自治区伊犁哈萨克自治州伊宁县汽车站【陕西路之星】","allotInCode":"20190724162907561293","allotInContactNo":"FSCM-NM-SD-XS-202203-0006","allotInName":"新疆远行供应链管理有限公司","allotInReceiveId":134,"allotInSubmissionNo":"ALLOT20220303003","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190730184136956746","allotOutContactNo":"FSCM-JT-SD-XS-202203-0001","allotOutName":"内蒙远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303002","allotQuantity":"7","applyNo":"ALLOT20220303003","createDate":1646277490000,"createUser":101,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":105,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646278548000,"updateUser":94},{"allotAmount":"415500","allotFreight":"0","allotInAddress":"内蒙古自治区包头市九原区210国道东侧46中北侧，陕汽商用车","allotInCode":"20190730184136956746","allotInContactNo":"FSCM-JT-SD-XS-202203-0001","allotInName":"内蒙古远行供应链管理有限公司","allotInReceiveId":123,"allotInSubmissionNo":"ALLOT20220303002","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"base","allotOutContactNo":"FSCM-XJ-SD-XS-202203-0002","allotOutName":"上海远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303001","allotQuantity":"7","applyNo":"ALLOT20220303002","createDate":1646276397000,"createUser":94,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"新疆库车市经济技术开发区规划路以北经四路以西","freightAmount":"0","freightPayer":"out","id":104,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646276514000,"updateUser":79},{"allotAmount":"415000","allotFreight":"0","allotInAddress":"上海市静安区永和路118弄东方环球企业中心2号楼","allotInCode":"base","allotInContactNo":"FSCM-XJ-SD-XS-202203-0002","allotInName":"上海远行供应链管理（集团）有限公司","allotInReceiveId":545,"allotInSubmissionNo":"ALLOT20220303001","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190724162907561293","allotOutContactNo":"SJ202104-0002","allotOutName":"新疆远行","allotOutReceiveId":507,"allotOutSubmissionNo":"T20210330001","allotQuantity":"7","applyNo":"ALLOT20220303001","createDate":1646274432000,"createUser":81,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":103,"remark":"","shippingWay":"自提","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646275767000,"updateUser":101},{"allotAmount":"354330","allotFreight":"0","allotInAddress":"江苏省淮安市清江浦区淮海南路333号淮安江冠陕汽重卡","allotInCode":"20190619154208925923","allotInContactNo":"FSCM-BJ-SD-XS-202107-0003","allotInName":"上海远行物流服务有限公司","allotInReceiveId":98,"allotInSubmissionNo":"ALLOT20210730001","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0095","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200807094","allotQuantity":"1","applyNo":"ALLOT20210730001","createDate":1627632866000,"createUser":89,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"河北","freightAmount":"0","freightPayer":"out","id":102,"remark":"HM21692","shippingWay":"送车","status":"1","truckCode":"SX4256G1Y46Q3840L","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1627633133000,"updateUser":149},{"allotAmount":"240000","allotFreight":"0","allotInAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotInCode":"20190730184702579901","allotInContactNo":"FSCM-ZF-SD-XS-202106-0049","allotInName":"北京德银远行供应链管理有限公司","allotInReceiveId":106,"allotInSubmissionNo":"ALLOT20210630001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184852711095","allotOutContactNo":"FSCM-BJ-SD-XS-202106-0010","allotOutName":"陕西中富","allotOutReceiveId":106,"allotOutSubmissionNo":"ALLOT20210624003","allotQuantity":"1","applyNo":"ALLOT20210630001","createDate":1625038721000,"createUser":97,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"/","freightAmount":"","freightPayer":"out","id":101,"remark":"LB005367","shippingWay":"自提","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1625038973000,"updateUser":106},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0028","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629006","allotInvoice":"0","allotOutAddress":"河北省唐山市玉田县南环路南白塔村路口东行100米","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0076","allotOutName":"北京德银","allotOutReceiveId":429,"allotOutSubmissionNo":"T20200807075","allotQuantity":"1","applyNo":"ALLOT20210629006","createDate":1624937166000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":100,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y44Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938608000,"updateUser":149},{"allotAmount":"243700","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0029","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629005","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0091","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20200807099","allotQuantity":"2","applyNo":"ALLOT20210629005","createDate":1624937051000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":99,"remark":"流水号：LB014076、 LB014078；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938618000,"updateUser":149},{"allotAmount":"254000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0030","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629004","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202012-0044","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20201223002","allotQuantity":"5","applyNo":"ALLOT20210629004","createDate":1624935688000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":98,"remark":"流水号：LB019269 、LB019270 、LB019529 、LB019530、 LB019268；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938635000,"updateUser":149},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0031","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629002","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0115","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200808004","allotQuantity":"1","applyNo":"ALLOT20210629002","createDate":1624935391000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":96,"remark":"流水号：LB007494；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938643000,"updateUser":149},{"allotAmount":"241000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0032","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0096","allotOutName":"北京德银","allotOutReceiveId":106,"allotOutSubmissionNo":"T20200807093","allotQuantity":"2","applyNo":"ALLOT20210629001","createDate":1624934909000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":95,"remark":"流水号：LB009886、LB012240；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938651000,"updateUser":149}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":9,"prePage":0,"size":10,"startRow":1,"total":90} 

```
#### 审批驳回
- http://127.0.0.1:8081/allot/index?dataFlag=3
```
URI_S_20220531164404794: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["3"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164404794: /allot/index, time: 57, 
	|--reponse: "allot/apply_list" 
```
- http://127.0.0.1:8081/allot/getAllotApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&serialNumber=&truckStatus=&status=2
```
URI_S_20220531164405277: /allot/getAllotApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"serialNumber":[""],"truckStatus":[""],"status":["2"]}, body: [{"agencyCode":"","dataFlag":"0","pageNo":0,"pageSize":10,"serialNumber":"","status":"2","truckCode":"","truckStatus":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986645253,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT ai.* FROM allot_info ai LEFT JOIN allot_truck alt ON alt.apply_no = ai.apply_no WHERE ai.status = ? GROUP BY ai.id) table_count 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select ai.* from allot_info ai left join allot_truck alt on alt.apply_no = ai.apply_no WHERE ai.status = ? group by ai.id order by create_date desc limit ?,? 
==> Parameters: 2(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164405277: /allot/getAllotApplyData, time: 141, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":2,"list":[{"allotAmount":"254000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutName":"北京德银","allotOutReceiveId":427,"allotQuantity":"5","applyNo":"ALLOT20210629003","createDate":1624935678000,"createUser":106,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":97,"remark":"流水号：LB019269 LB019270 LB019529 LB019530 LB019268；","shippingWay":"送车","status":"2","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624935768000,"updateUser":106},{"allotAmount":"333800","allotFreight":"0","allotInAddress":"上海市浦东新区海徐路1767号","allotInCode":"20190619154208925923","allotInName":"上海远行物流服务有限公司","allotInReceiveId":432,"allotInvoice":"0","allotOutAddress":"河北省唐山市玉田县南环路南白塔村路口东行100米","allotOutCode":"20190730184702579901","allotOutName":"北京德银","allotOutReceiveId":429,"allotQuantity":"1","applyNo":"ALLOT20210628001","createDate":1624869668000,"createUser":89,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":89,"remark":"LB003100","shippingWay":"送车","status":"2","truckCode":"SX4256G1Y40Q3840L","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1625034836000,"updateUser":89},{"allotAmount":"13137","allotFreight":"0","allotInAddress":"河南省周口市川汇区周项路与周口大道交叉口向东1公里路南周口双意汽车贸易有限公司","allotInCode":"20190730184345661796","allotInName":"河南德银供应链管理有限公司","allotInReceiveId":144,"allotInvoice":"0","allotOutAddress":"衡水市高新区威武大街苏正车管所北邻100米路西","allotOutCode":"20190730184702579901","allotOutName":"北京德银","allotOutReceiveId":428,"allotQuantity":"1","applyNo":"ALLOT20210626002","createDate":1624689702000,"createUser":110,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":87,"remark":"","shippingWay":"送车","status":"2","truckCode":"SX1045E1N14B3310","truckStatus":"6","truckTypeId":23,"truckTypeName":"轩德9系42WL","updateTime":1624689823000,"updateUser":110},{"allotAmount":"378384","allotFreight":"0","allotInAddress":"江苏省淮安市清江浦区淮海南路333号淮安江冠陕汽重卡","allotInCode":"20190619154208925923","allotInName":"上海远行物流服务有限公司","allotInReceiveId":98,"allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"base","allotOutName":"上海远行","allotOutReceiveId":427,"allotQuantity":"1","applyNo":"ALLOT20210623007","createDate":1624444110000,"createUser":89,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":65,"remark":"","shippingWay":"送车","status":"2","truckCode":"SX3315M2M39J2460","truckStatus":"61","truckTypeId":32,"truckTypeName":"轩德翼3系84ZX","updateTime":1624444128000,"updateUser":89},{"allotAmount":"234922","allotFreight":"0","allotInAddress":"内蒙古自治区包头市九原区210国道东侧46中北侧，陕汽商用车","allotInCode":"20190730184136956746","allotInName":"内蒙古远行供应链管理有限公司","allotInReceiveId":123,"allotInvoice":"0","allotOutAddress":"山西省运城市盐湖区盐湖工业园区盐湖工程机械城","allotOutCode":"20190730184526325982","allotOutName":"山西德银","allotOutReceiveId":435,"allotQuantity":"1","applyNo":"ALLOT20210618005","createDate":1624000130000,"createUser":94,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":53,"remark":"MB000070","shippingWay":"送车","status":"2","truckCode":"SX4255G3Y42Q3244","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624000659000,"updateUser":113},{"allotAmount":"252000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"base","allotOutContactNo":"FSCM-JT-SD-XS-202004-0042,FSCM-JT-SD-XS-202007-0012,FSCM-JT-SD-XS-202007-0013,FSCM-JT-SD-XS-202008-0039","allotOutName":"上海远行","allotOutReceiveId":106,"allotOutSubmissionNo":"T20200701010,T20200709005,T20200710005,T20200722001","allotQuantity":"10","applyNo":"ALLOT20210609006","createDate":1623235214000,"createUser":106,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县","freightAmount":"0","freightPayer":"out","id":29,"remark":"流水号：LB015908、 LB016325 、LB016035、 LB016138、 LB016326、 LB015916、 LB015921、 LB015911 、LB015903、 LB014542；","shippingWay":"送车","status":"2","truckCode":"SX4255G2K40Q3240","truckStatus":"61","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1623313729000,"updateUser":81},{"allotAmount":"252000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"base","allotOutName":"上海远行","allotOutReceiveId":106,"allotQuantity":"12","applyNo":"ALLOT20210609002","createDate":1623233676000,"createUser":106,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"0","freightPayer":"out","id":25,"remark":"流水号：LB015908、LB016325 、LB016035、 LB016138、LB016326 、LB016036 、LB015918、 LB015921、 LB015911 、LB015915 、LB015903、LB014542；","shippingWay":"送车","status":"2","truckCode":"SX4255G2K40Q3240","truckStatus":"61","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1623235123000,"updateUser":106},{"allotAmount":"252000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"base","allotOutName":"上海远行","allotOutReceiveId":106,"allotQuantity":"11","applyNo":"ALLOT20210609001","createDate":1623232592000,"createUser":106,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"0","freightPayer":"out","id":24,"remark":"流水号：LB015908、LB016325 、LB016035、 LB016138、LB016326 、LB016036 、LB015918、 LB015921、 LB015911 、LB015915 、LB015903；","shippingWay":"送车","status":"2","truckCode":"SX4255G2K40Q3240","truckStatus":"61","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1623233328000,"updateUser":121},{"allotAmount":"398384","allotFreight":"0","allotInAddress":"苏州吴中经济开发区227省道尹山段299号1幢","allotInCode":"20190619154208925923","allotInName":"上海远行物流服务有限公司","allotInReceiveId":170,"allotInvoice":"0","allotOutAddress":"-","allotOutCode":"base","allotOutContactNo":"FSCM-JT-SD-XS-202005-0004","allotOutName":"上海远行","allotOutSubmissionNo":"T20200810006","allotQuantity":"11","applyNo":"ALLOT20210413002","createDate":1618293854000,"createUser":89,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":15,"remark":"","shippingWay":"送车","status":"2","truckCode":"SX3315M2M39J2460","truckStatus":"2","truckTypeId":32,"truckTypeName":"轩德翼3系84ZX","updateTime":1618294841000,"updateUser":81},{"allotAmount":"398384","allotFreight":"0","allotInAddress":"苏州吴中经济开发区227省道尹山段299号1幢","allotInCode":"20190619154208925923","allotInName":"上海远行物流服务有限公司","allotInReceiveId":170,"allotInvoice":"0","allotOutAddress":"-","allotOutCode":"base","allotOutContactNo":"FSCM-JT-SD-XS-202005-0004","allotOutName":"上海远行","allotOutSubmissionNo":"T20200810006","allotQuantity":"2","applyNo":"ALLOT20210413001","createDate":1618293829000,"createUser":89,"currentCheckStatus":"已驳回","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":14,"remark":"","shippingWay":"送车","status":"2","truckCode":"SX3315M1M39J2460","truckStatus":"2","truckTypeId":32,"truckTypeName":"轩德翼3系84ZX","updateTime":1618294849000,"updateUser":81}],"navigatePages":8,"navigatepageNums":[1,2],"nextPage":2,"pageNum":1,"pageSize":10,"pages":2,"prePage":0,"size":10,"startRow":1,"total":12} 

```
#### 车款核销
- http://127.0.0.1:8081/allot/index?dataFlag=4
```
URI_S_20220531164538425: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["4"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164538425: /allot/index, time: 48, 
	|--reponse: "allot/apply_list" 
```
- http://127.0.0.1:8081/allot/getAllotApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&serialNumber=&truckStatus=&status=1
- http://127.0.0.1:8081/writeOff/blankDataList?search=&order=asc
```	

URI_S_20220531164539008: /allot/getAllotApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"serialNumber":[""],"truckStatus":[""],"status":["1"]}, body: [{"agencyCode":"","dataFlag":"0","pageNo":0,"pageSize":10,"serialNumber":"","status":"1","truckCode":"","truckStatus":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986738959,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT ai.* FROM allot_info ai LEFT JOIN allot_truck alt ON alt.apply_no = ai.apply_no WHERE ai.status = ? GROUP BY ai.id) table_count 
==> Parameters: 1(String)
URI_S_20220531164539083: /writeOff/blankDataList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"search":[""],"order":["asc"]}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986739082,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
<==      Total: 1
==>  Preparing: select ai.* from allot_info ai left join allot_truck alt on alt.apply_no = ai.apply_no WHERE ai.status = ? group by ai.id order by create_date desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164539008: /allot/getAllotApplyData, time: 165, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"allotAmount":"416000","allotFreight":"0","allotInAddress":"新疆维吾尔自治区伊犁哈萨克自治州伊宁县汽车站【陕西路之星】","allotInCode":"20190724162907561293","allotInContactNo":"FSCM-NM-SD-XS-202203-0006","allotInName":"新疆远行供应链管理有限公司","allotInReceiveId":134,"allotInSubmissionNo":"ALLOT20220303003","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190730184136956746","allotOutContactNo":"FSCM-JT-SD-XS-202203-0001","allotOutName":"内蒙远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303002","allotQuantity":"7","applyNo":"ALLOT20220303003","createDate":1646277490000,"createUser":101,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":105,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646278548000,"updateUser":94},{"allotAmount":"415500","allotFreight":"0","allotInAddress":"内蒙古自治区包头市九原区210国道东侧46中北侧，陕汽商用车","allotInCode":"20190730184136956746","allotInContactNo":"FSCM-JT-SD-XS-202203-0001","allotInName":"内蒙古远行供应链管理有限公司","allotInReceiveId":123,"allotInSubmissionNo":"ALLOT20220303002","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"base","allotOutContactNo":"FSCM-XJ-SD-XS-202203-0002","allotOutName":"上海远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303001","allotQuantity":"7","applyNo":"ALLOT20220303002","createDate":1646276397000,"createUser":94,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"新疆库车市经济技术开发区规划路以北经四路以西","freightAmount":"0","freightPayer":"out","id":104,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646276514000,"updateUser":79},{"allotAmount":"415000","allotFreight":"0","allotInAddress":"上海市静安区永和路118弄东方环球企业中心2号楼","allotInCode":"base","allotInContactNo":"FSCM-XJ-SD-XS-202203-0002","allotInName":"上海远行供应链管理（集团）有限公司","allotInReceiveId":545,"allotInSubmissionNo":"ALLOT20220303001","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190724162907561293","allotOutContactNo":"SJ202104-0002","allotOutName":"新疆远行","allotOutReceiveId":507,"allotOutSubmissionNo":"T20210330001","allotQuantity":"7","applyNo":"ALLOT20220303001","createDate":1646274432000,"createUser":81,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":103,"remark":"","shippingWay":"自提","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646275767000,"updateUser":101},{"allotAmount":"354330","allotFreight":"0","allotInAddress":"江苏省淮安市清江浦区淮海南路333号淮安江冠陕汽重卡","allotInCode":"20190619154208925923","allotInContactNo":"FSCM-BJ-SD-XS-202107-0003","allotInName":"上海远行物流服务有限公司","allotInReceiveId":98,"allotInSubmissionNo":"ALLOT20210730001","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0095","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200807094","allotQuantity":"1","applyNo":"ALLOT20210730001","createDate":1627632866000,"createUser":89,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"河北","freightAmount":"0","freightPayer":"out","id":102,"remark":"HM21692","shippingWay":"送车","status":"1","truckCode":"SX4256G1Y46Q3840L","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1627633133000,"updateUser":149},{"allotAmount":"240000","allotFreight":"0","allotInAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotInCode":"20190730184702579901","allotInContactNo":"FSCM-ZF-SD-XS-202106-0049","allotInName":"北京德银远行供应链管理有限公司","allotInReceiveId":106,"allotInSubmissionNo":"ALLOT20210630001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184852711095","allotOutContactNo":"FSCM-BJ-SD-XS-202106-0010","allotOutName":"陕西中富","allotOutReceiveId":106,"allotOutSubmissionNo":"ALLOT20210624003","allotQuantity":"1","applyNo":"ALLOT20210630001","createDate":1625038721000,"createUser":97,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"/","freightAmount":"","freightPayer":"out","id":101,"remark":"LB005367","shippingWay":"自提","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1625038973000,"updateUser":106},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0028","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629006","allotInvoice":"0","allotOutAddress":"河北省唐山市玉田县南环路南白塔村路口东行100米","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0076","allotOutName":"北京德银","allotOutReceiveId":429,"allotOutSubmissionNo":"T20200807075","allotQuantity":"1","applyNo":"ALLOT20210629006","createDate":1624937166000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":100,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y44Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938608000,"updateUser":149},{"allotAmount":"243700","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0029","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629005","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0091","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20200807099","allotQuantity":"2","applyNo":"ALLOT20210629005","createDate":1624937051000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":99,"remark":"流水号：LB014076、 LB014078；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938618000,"updateUser":149},{"allotAmount":"254000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0030","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629004","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202012-0044","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20201223002","allotQuantity":"5","applyNo":"ALLOT20210629004","createDate":1624935688000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":98,"remark":"流水号：LB019269 、LB019270 、LB019529 、LB019530、 LB019268；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938635000,"updateUser":149},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0031","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629002","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0115","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200808004","allotQuantity":"1","applyNo":"ALLOT20210629002","createDate":1624935391000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":96,"remark":"流水号：LB007494；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938643000,"updateUser":149},{"allotAmount":"241000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0032","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0096","allotOutName":"北京德银","allotOutReceiveId":106,"allotOutSubmissionNo":"T20200807093","allotQuantity":"2","applyNo":"ALLOT20210629001","createDate":1624934909000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":95,"remark":"流水号：LB009886、LB012240；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938651000,"updateUser":149}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":9,"prePage":0,"size":10,"startRow":1,"total":90} 
==>  Preparing: select id, serial_number, account_amount, used_amount, unused_amount, others_amount, payment_date, write_off_time, payment_type, payment_client, payment_account, base_account, abstract_info, remark, client_name, client_no, create_time, create_user, update_time, update_user,belong from capital_inflow WHERE unused_amount != '0' and belong = ? order by payment_date desc 
==> Parameters: base(String)
<==      Total: 135
URI_E_20220531164539083: /writeOff/blankDataList, time: 146, 
	|--reponse: [{"abstractInfo":"","accountAmount":"375000.00","baseAccount":"03004871188","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1653528372000,"createUser":153,"id":7669,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20220525203012","paymentType":"现金","remark":"车款","serialNumber":"20220525001","unusedAmount":"375000.00","usedAmount":"0"},{"abstractInfo":"","accountAmount":"1000000.00","baseAccount":"03004871188","belong":"base","clientName":"包头市海泰汽车贸易有限公司","clientNo":"1004326","createTime":1653374149000,"createUser":153,"id":7662,"othersAmount":"0","paymentAccount":"05628101040022384","paymentClient":"包头市海泰汽车贸易有限公司","paymentDate":"20220521155457","paymentType":"现金","remark":"车款","serialNumber":"202205240001","unusedAmount":"1000000.00","usedAmount":"0"},{"abstractInfo":"","accountAmount":"500000.00","baseAccount":"03004871188","belong":"base","clientName":"包头市海泰汽车贸易有限公司","clientNo":"1004326","createTime":1653374149000,"createUser":153,"id":7663,"othersAmount":"0","paymentAccount":"05628101040022384","paymentClient":"包头市海泰汽车贸易有限公司","paymentDate":"20220521155457","paymentType":"现金","remark":"车款","serialNumber":"202205240002","unusedAmount":"500000.00","usedAmount":"0"},{"abstractInfo":"","accountAmount":"3811989","baseAccount":"03004871188","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1649746042000,"createUser":168,"id":7545,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20220401103500","paymentType":"现金","remark":"车款","serialNumber":"20220412004","unusedAmount":"3811989","usedAmount":"0"},{"abstractInfo":"","accountAmount":"3722.60","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1648525803000,"createUser":153,"id":7509,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20220325133510","paymentType":"现金","remark":"电动车车款","serialNumber":"20220329005","unusedAmount":"3722.60","usedAmount":"0"},{"abstractInfo":"","accountAmount":"2900000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1646200901000,"createUser":168,"id":7359,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20220216114855","paymentType":"现金","remark":"预付车款","serialNumber":"202203020001","unusedAmount":"2900000.00","usedAmount":"0"},{"abstractInfo":"KB016261、KB016275、KB016281、KB016404","accountAmount":"446681.20","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7152,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211228180554","paymentType":"车款","remark":"车款","serialNumber":"202112280002","unusedAmount":"446681.20","usedAmount":"0"},{"abstractInfo":"KB015809、KB016253","accountAmount":"247046.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7151,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211228161004","paymentType":"车款","remark":"车款","serialNumber":"202112280001","unusedAmount":"247046.80","usedAmount":"0"},{"abstractInfo":"KB016267，KB016269，KB016400","accountAmount":"359090.20","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640599095000,"createUser":153,"id":7143,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211227173938","paymentType":"车款","remark":"车款","serialNumber":"202112270006","unusedAmount":"359090.20","usedAmount":"0"},{"abstractInfo":"KB016278，KB016279","accountAmount":"239108.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1640740502000,"createUser":153,"id":7153,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211224142101","paymentType":"车款","remark":"车款","serialNumber":"202112280003","unusedAmount":"239108.80","usedAmount":"0"},{"abstractInfo":"","accountAmount":"20000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1639098649000,"createUser":153,"id":7077,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211209134510","paymentType":"车款订金","remark":"车款订金","serialNumber":"202112100001","unusedAmount":"20000.00","usedAmount":"0"},{"abstractInfo":"KB015810","accountAmount":"117363.40","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1638235935000,"createUser":153,"id":7045,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211129164428","paymentType":"现金","remark":"车款","serialNumber":"202111300001","unusedAmount":"117363.40","usedAmount":"0"},{"abstractInfo":"KB016254、KB016256","accountAmount":"62000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1636419853000,"createUser":153,"id":6775,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211108163855","paymentType":"现金","remark":"车款","serialNumber":"202111090001","unusedAmount":"62000.00","usedAmount":"0"},{"abstractInfo":"KB016254 KB016256","accountAmount":"172726.80","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1636333680000,"createUser":153,"id":6774,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20211105171613","paymentType":"现金","remark":"车款","serialNumber":"202111080001","unusedAmount":"172726.80","usedAmount":"0"},{"abstractInfo":"","accountAmount":"557831.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1634778712000,"createUser":153,"id":6735,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211020150718","paymentType":"现金","remark":"车款","serialNumber":"202110210001","unusedAmount":"40000.00","updateTime":1635230943000,"updateUser":81,"usedAmount":"517831.00"},{"abstractInfo":"MB6816;6819","accountAmount":"756400.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1634087275000,"createUser":153,"id":6724,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20211012152633","paymentType":"现金","remark":"车款","serialNumber":"202110130001","unusedAmount":"20000.00","updateTime":1635229926000,"updateUser":81,"usedAmount":"736400.00"},{"abstractInfo":"MB502","accountAmount":"274819.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1632358967000,"createUser":153,"id":6679,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210922162520","paymentType":"现金","remark":"车款","serialNumber":"202109230001","unusedAmount":"20000.00","updateTime":1632377958000,"updateUser":83,"usedAmount":"254819.00"},{"abstractInfo":"","accountAmount":"859401.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1631497675000,"createUser":153,"id":6637,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210911135506","paymentType":"现金","remark":"车款","serialNumber":"202109130001","unusedAmount":"200000.00","updateTime":1632641772000,"updateUser":83,"usedAmount":"659401.00"},{"abstractInfo":"MB404;409;423;432;399;416;401;HG14752;MB13611","accountAmount":"2575567.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1631149968000,"createUser":153,"id":6610,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210908170948","paymentType":"现金","remark":"车款","serialNumber":"202109090002","unusedAmount":"140000.00","updateTime":1632378249000,"updateUser":83,"usedAmount":"2435567.00"},{"abstractInfo":"MB000494;MB000501;MB000497","accountAmount":"873900.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1630044591000,"createUser":153,"id":6546,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210827131437","paymentType":"现金","remark":"车款","serialNumber":"202108270002","unusedAmount":"60000.00","updateTime":1630397309000,"updateUser":81,"usedAmount":"813900.00"},{"abstractInfo":"MB504;503","accountAmount":"549638.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1629682782000,"createUser":153,"id":6528,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210820100549","paymentType":"现金","remark":"车款","serialNumber":"202108230001","unusedAmount":"7038.00","updateTime":1629688357000,"updateUser":83,"usedAmount":"542600.00"},{"abstractInfo":"MB13600；3612；3614；3617；5202；5206；5222；5226；5229；5243；LB16032；6031；6034；6033；5889；6037","accountAmount":"4462590.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626916364000,"createUser":153,"id":6457,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210722084522","paymentType":"现金","remark":"车款","serialNumber":"202107220001","unusedAmount":"120000.00","updateTime":1627609792000,"updateUser":83,"usedAmount":"4342590.00"},{"abstractInfo":"MB425","accountAmount":"291300.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626829960000,"createUser":153,"id":6456,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210720121527","paymentType":"现金","remark":"车款","serialNumber":"202107210001","unusedAmount":"20000.00","updateTime":1627609884000,"updateUser":83,"usedAmount":"271300.00"},{"abstractInfo":"MB495;493;500;490;505;433","accountAmount":"1747800.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626742991000,"createUser":153,"id":6452,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210719203032","paymentType":"现金","remark":"车款","serialNumber":"202107200001","unusedAmount":"120000.00","updateTime":1627609970000,"updateUser":83,"usedAmount":"1627800.00"},{"abstractInfo":"MB422；436","accountAmount":"582600.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626413257000,"createUser":153,"id":6446,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210716122054","paymentType":"现金","remark":"车款","serialNumber":"202107160001","unusedAmount":"40000.00","updateTime":1627610015000,"updateUser":83,"usedAmount":"542600.00"},{"abstractInfo":"LB4560;4564","accountAmount":"727200.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1626252822000,"createUser":153,"id":6442,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210713182510","paymentType":"现金","remark":"车款","serialNumber":"202107140001","unusedAmount":"40000.00","updateTime":1627610053000,"updateUser":83,"usedAmount":"687200.00"},{"abstractInfo":"LB5918","accountAmount":"285676.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625620229000,"createUser":153,"id":6428,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210706163619","paymentType":"现金","remark":"车款","serialNumber":"202107070001","unusedAmount":"10000.00","updateTime":1626146207000,"updateUser":83,"usedAmount":"275676.00"},{"abstractInfo":"MB7888;8547;407","accountAmount":"874700.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625188650000,"createUser":153,"id":6416,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210701153248","paymentType":"现金","remark":"车款","serialNumber":"汇入外LZ21070100316934","unusedAmount":"110000.00","updateTime":1626146484000,"updateUser":83,"usedAmount":"764700.00"},{"abstractInfo":"MB7267,7272","accountAmount":"769260.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1625050665000,"createUser":153,"id":6415,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210630172518","paymentType":"现金","remark":"车款","serialNumber":"202106300009","unusedAmount":"20000.00","updateTime":1625050884000,"updateUser":83,"usedAmount":"749260.00"},{"abstractInfo":"HE11347","accountAmount":"260100.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1622687016000,"createUser":153,"id":6152,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20210602123925","paymentType":"现金","remark":"车款","serialNumber":"202106020001","unusedAmount":"260100.00","usedAmount":"0"},{"abstractInfo":"LB017771；11005；17759；7913；7939；7905；7927；7902；HF14214;217;215","accountAmount":"3178918.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1621487564000,"createUser":153,"id":5917,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20210520111908","paymentType":"现金","remark":"车款","serialNumber":"202105200006","unusedAmount":"38800.00","updateTime":1625047908000,"updateUser":83,"usedAmount":"3140118.00"},{"abstractInfo":"KB016280、KB016245车款","accountAmount":"241726.8","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1614937119000,"createUser":87,"id":5237,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20210304182548","paymentType":"现金","remark":"KB016280、KB016245车款","serialNumber":"202103040005","unusedAmount":"241726.8","usedAmount":"0"},{"abstractInfo":"订金","accountAmount":"700000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1612258034000,"createUser":87,"id":5068,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210201205238","paymentType":"现金","remark":"订金","serialNumber":"202102010001","unusedAmount":"380000.00","updateTime":1640759344000,"updateUser":83,"usedAmount":"320000.00"},{"abstractInfo":"HH15808电动车百分之七十车款","accountAmount":"99911","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1611306272000,"createUser":87,"id":4998,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20210122163424","paymentType":"现金","remark":"","serialNumber":"202101220002","unusedAmount":"99911","usedAmount":"0"},{"abstractInfo":"50台车辆定金","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1611305053000,"createUser":87,"id":4997,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210120100326","paymentType":"现金","remark":"50台车辆定金","serialNumber":"202101200001","unusedAmount":"500000","updateTime":1611307061000,"updateUser":83,"usedAmount":"0"},{"abstractInfo":"2021年轻卡定金","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1610443591000,"createUser":87,"id":4943,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20210112165653","paymentType":"2021年轻卡定金","remark":"2021年轻卡定金","serialNumber":"202101120002","unusedAmount":"50000","updateTime":1611807248000,"updateUser":83,"usedAmount":"450000"},{"abstractInfo":"LB012551/LB013647/LB012558/LB013321/LB013320/LB012424/LB010350/LB010572/LB010578/LB010831/LB010931","accountAmount":"1868000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1610077471000,"createUser":87,"id":4924,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20210108205906","paymentType":"承兑","remark":"车款","serialNumber":"202101080001","unusedAmount":"4000","updateTime":1610950936000,"updateUser":83,"usedAmount":"1864000"},{"abstractInfo":"车款","accountAmount":"220000","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1609389208000,"createUser":87,"id":4845,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201229140144","paymentType":"承兑","remark":"车款","serialNumber":"202012290002","unusedAmount":"117836.64","updateTime":1609389259000,"updateUser":83,"usedAmount":"102163.36"},{"abstractInfo":"LB009457、LB009695、LB012796、LB012539、LB012542、LB012379、LB012358","accountAmount":"1210360","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1608880777000,"createUser":87,"id":4771,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201225155615","paymentType":"承兑","remark":"车款","serialNumber":"202012250001","unusedAmount":"274360.00","updateTime":1628756894000,"updateUser":83,"usedAmount":"936000.00"},{"abstractInfo":"LB014697,14893,14933,15092","accountAmount":"754300","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1608801837000,"createUser":87,"id":4750,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201224155615","paymentType":"现金","remark":"4台车款","serialNumber":"202012240001","unusedAmount":"216396.00","updateTime":1628747489000,"updateUser":83,"usedAmount":"537904.00"},{"abstractInfo":"车款","accountAmount":"96163.36","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1608801837000,"createUser":87,"id":4751,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201224155615","paymentType":"承兑","remark":"4台车款","serialNumber":"202012240002","unusedAmount":"64797.36","updateTime":1628737490000,"updateUser":83,"usedAmount":"31366.00"},{"abstractInfo":"HH16259;HH16403","accountAmount":"217274.4","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1608197691000,"createUser":87,"id":4683,"othersAmount":"0","paymentAccount":"1702029309200673017","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20201217120134","paymentType":"现金","remark":"车款","serialNumber":"202012170001","unusedAmount":"217274.4","usedAmount":"0"},{"abstractInfo":"订金","accountAmount":"50000","baseAccount":"98250154740006273","belong":"base","clientName":"烟台耀通商贸有限公司","clientNo":"1005427","createTime":1608188130000,"createUser":87,"id":4678,"othersAmount":"0","paymentAccount":"15349701040003363","paymentClient":"烟台耀通商贸有限公司","paymentDate":"20201215105708","paymentType":"现金","remark":"订金","serialNumber":"202012150001","unusedAmount":"50000","updateTime":1610445269000,"updateUser":79,"usedAmount":"0"},{"abstractInfo":"","accountAmount":"440155","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1608025828000,"createUser":87,"id":4665,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201214165915","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012140003","unusedAmount":"1930.31","updateTime":1628745900000,"updateUser":83,"usedAmount":"438224.69"},{"abstractInfo":"LBOO5890 LB004550 LB008784","accountAmount":"300000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1608025828000,"createUser":87,"id":4664,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201214165710","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012140002","unusedAmount":"98300.00","updateTime":1628746805000,"updateUser":83,"usedAmount":"201700.00"},{"abstractInfo":"LB010136/010139/012793/012795/013317、LB012369/010835/010579、LB012538/012543/012554","accountAmount":"1900000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1607587730000,"createUser":87,"id":4650,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201210173010","paymentType":"承兑","remark":"车款","serialNumber":"202012100001","unusedAmount":"401000.00","updateTime":1628757072000,"updateUser":83,"usedAmount":"1499000.00"},{"abstractInfo":"四季度返利","accountAmount":"73700","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1607483776000,"createUser":87,"id":4640,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090004","unusedAmount":"73700","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"340440","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4643,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090007","unusedAmount":"340440","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"265160","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4644,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090008","unusedAmount":"22323.36","updateTime":1609389388000,"updateUser":83,"usedAmount":"242836.64"},{"abstractInfo":"三季度返利","accountAmount":"39000","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607483776000,"createUser":87,"id":4645,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090009","unusedAmount":"39000","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"6600","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1607483776000,"createUser":87,"id":4646,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090010","unusedAmount":"6600","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"157000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1607483776000,"createUser":87,"id":4647,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090011","unusedAmount":"157000","usedAmount":"0"},{"abstractInfo":"三季度返利","accountAmount":"837800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1607483776000,"createUser":87,"id":4648,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201209173010","paymentType":"现金","remark":"车辆返利","serialNumber":"202012090012","unusedAmount":"871.69","updateTime":1628748087000,"updateUser":83,"usedAmount":"836928.31"},{"abstractInfo":"LB004549、LB000699","accountAmount":"532855","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1607420387000,"createUser":87,"id":4636,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201208173010","paymentType":"现金","remark":"车辆尾款","serialNumber":"202012080002","unusedAmount":"60016","updateTime":1628748087000,"updateUser":83,"usedAmount":"472839"},{"abstractInfo":"车款","accountAmount":"368065","baseAccount":"98250154740006273","belong":"base","clientName":"陕西中富物联科技服务有限公司","clientNo":"0100038","createTime":1607420387000,"createUser":87,"id":4635,"othersAmount":"0","paymentAccount":"2605040609200099072","paymentClient":"陕西中富物联科技服务有限公司","paymentDate":"20201208151840","paymentType":"现金","remark":"车款","serialNumber":"202012080001","unusedAmount":"30000.00","updateTime":1628746198000,"updateUser":83,"usedAmount":"338065.00"},{"abstractInfo":"LB014891;14885","accountAmount":"565836","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1607420387000,"createUser":87,"id":4634,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201207173022","paymentType":"现金","remark":"车款","serialNumber":"202012070005","unusedAmount":"296820.00","updateTime":1628665691000,"updateUser":83,"usedAmount":"269016.00"},{"abstractInfo":"车辆定金","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"潍坊大成汽车销售服务有限公司","clientNo":"1000664","createTime":1607332284000,"createUser":87,"id":4627,"othersAmount":"0","paymentAccount":"2390031234205000010144","paymentClient":"潍坊大成汽车销售服务有限公司","paymentDate":"20201207163851","paymentType":"现金","remark":"车辆定金","serialNumber":"202012070002","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"1341658.81","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1607322889000,"createUser":87,"id":4625,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201204171124","paymentType":"承兑","remark":"车款","serialNumber":"202012040005","unusedAmount":"1458.69","updateTime":1607323096000,"updateUser":83,"usedAmount":"1340200.12"},{"abstractInfo":"定金（虚拟）","accountAmount":"60000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1606729664000,"createUser":87,"id":4587,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201130170328","paymentType":"现金","remark":"定金（虚拟）","serialNumber":"202011300005","unusedAmount":"20000","updateTime":1606729741000,"updateUser":81,"usedAmount":"40000"},{"abstractInfo":"山西远行康机订金","accountAmount":"30000","baseAccount":"98250154740006273","belong":"base","clientName":"山西德银远行供应链管理有限公司","clientNo":"0100033","createTime":1610693912000,"createUser":87,"id":4973,"othersAmount":"0","paymentAccount":"161401201020524141","paymentClient":"山西德银远行供应链管理有限公司","paymentDate":"20201130154526","paymentType":"现金","remark":"山西远行康机订金","serialNumber":"202011300008","unusedAmount":"30000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"984262","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1606457650000,"createUser":87,"id":4529,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20201126143422","paymentType":"现金","remark":"车款","serialNumber":"202011260002","unusedAmount":"61058.00","updateTime":1628746950000,"updateUser":83,"usedAmount":"923204.00"},{"abstractInfo":"LB012949,10994","accountAmount":"624165","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1605580419000,"createUser":87,"id":4289,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201117102306","paymentType":"现金","remark":"2台车款","serialNumber":"202011170001","unusedAmount":"110035.00","updateTime":1628746681000,"updateUser":83,"usedAmount":"514130.00"},{"abstractInfo":"定金","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1605174049000,"createUser":87,"id":4225,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201112150528","paymentType":"现金","remark":"定金","serialNumber":"202011120001","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"B014670,4671,4740,4570,4672,4738","accountAmount":"1679586","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1604911659000,"createUser":87,"id":4222,"othersAmount":"0","paymentAccount":"107641769444","paymentClient":"新疆远行供应链管理有限公司石河子市分公司","paymentDate":"20201109132445","paymentType":"现金","remark":"6台车款","serialNumber":"202011090001","unusedAmount":"1679586","usedAmount":"0"},{"abstractInfo":"LB009454/009676/009679/009684/010131/010145/009692/LB012372/010833/010935/010582","accountAmount":"1876842.1","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1603267078000,"createUser":87,"id":3956,"othersAmount":"0","paymentAccount":"815012201421022106","paymentClient":"河南骏通车辆有限公司","paymentDate":"20201021140253","paymentType":"承兑","remark":"车款","serialNumber":"202010210002","unusedAmount":"686842.10","updateTime":1628671425000,"updateUser":83,"usedAmount":"1190000.00"},{"abstractInfo":"车辆定金","accountAmount":"200000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1603264863000,"createUser":87,"id":3953,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20201020154218","paymentType":"现金","remark":"车辆定金","serialNumber":"202010200003","unusedAmount":"160000.00","updateTime":1646979156000,"updateUser":82,"usedAmount":"40000.00"},{"abstractInfo":"支付KB018225、KB018226车辆采购定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"陕西远行供应链管理有限公司","clientNo":"0100027","createTime":1602752738000,"createUser":87,"id":3925,"othersAmount":"0","paymentAccount":"26170201040002188","paymentClient":"陕西远行供应链管理有限公司","paymentDate":"20201014144053","paymentType":"现金","remark":"定金","serialNumber":"202010140001","unusedAmount":"40000","updateTime":1604638712000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"LB013061 LB013046","accountAmount":"423302.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1601278970000,"createUser":87,"id":3863,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200928132133","paymentType":"现金","remark":"车辆买断款","serialNumber":"202009280001","unusedAmount":"71302","updateTime":1628747938000,"updateUser":83,"usedAmount":"352000"},{"abstractInfo":"LB007178、4568、/4557/4571/4562、4566/HCC6286","accountAmount":"2374016.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1600851457000,"createUser":87,"id":3710,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200923101016","paymentType":"现金","remark":"7台车款","serialNumber":"202009230001","unusedAmount":"609741.00","updateTime":1628668828000,"updateUser":83,"usedAmount":"1764275.00"},{"abstractInfo":"车辆定金","accountAmount":"100000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1599036312000,"createUser":87,"id":3402,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200902103732","paymentType":"现金","remark":"车辆定金","serialNumber":"202009020001","unusedAmount":"40000.00","updateTime":1640922798000,"updateUser":81,"usedAmount":"60000.00"},{"abstractInfo":"HL18773 HG14765 HG15178 LB000254 LB000269 LB000270 HD10445","accountAmount":"608900","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598606410000,"createUser":87,"id":3359,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828165420","paymentType":"现金","remark":"车辆尾款","serialNumber":"202008280005","unusedAmount":"11500","updateTime":1628747938000,"updateUser":83,"usedAmount":"597400"},{"abstractInfo":"虚拟返利","accountAmount":"824720","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1598608724000,"createUser":87,"id":3361,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280007","unusedAmount":"824720","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"6000","baseAccount":"98250154740006273","belong":"base","clientName":"青岛祥瑞和汽车销售有限公司","clientNo":"100000000170","createTime":1598608724000,"createUser":87,"id":3362,"othersAmount":"0","paymentAccount":"9020102404342050002115","paymentClient":"青岛祥瑞和汽车销售服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280008","unusedAmount":"6000","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"12000","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1598608724000,"createUser":87,"id":3363,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280009","unusedAmount":"12000","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"928800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598608724000,"createUser":87,"id":3364,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280010","unusedAmount":"928800","usedAmount":"0"},{"abstractInfo":"虚拟返利","accountAmount":"928800","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1598608724000,"createUser":87,"id":3365,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200828110118","paymentType":"现金","remark":"虚拟返利","serialNumber":"202008280011","unusedAmount":"928800","usedAmount":"0"},{"abstractInfo":"2台国六翼6超低顶汽车吊底盘定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","createTime":1598261517000,"createUser":87,"id":3249,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200821171026","paymentType":"现金","remark":"2台国六翼6超低顶汽车吊底盘定金","serialNumber":"202008210002","unusedAmount":"40000","updateTime":1602320004000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"七台牵引车定金","accountAmount":"140000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1595404140000,"createUser":87,"id":1633,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200722152539","paymentType":"现金","remark":"899017250468","serialNumber":"20200722002","unusedAmount":"100000","updateTime":1597312675000,"updateUser":81,"usedAmount":"40000.00"},{"abstractInfo":"定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1595404140000,"createUser":87,"id":1632,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200722144403","paymentType":"现金","remark":"899018330491","serialNumber":"20200722001","unusedAmount":"40000","updateTime":1602320004000,"updateUser":83,"usedAmount":"0.00"},{"abstractInfo":"车辆尾款LB011375 LB011376 LB011377 LB011374 LB011379 LB011380 LB011518 LB011373","accountAmount":"2852728","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1595208249000,"createUser":87,"id":1615,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200716105201","paymentType":"现金","remark":"899012760117","serialNumber":"202007160002","unusedAmount":"209182","updateTime":1628747938000,"updateUser":83,"usedAmount":"2643546"},{"abstractInfo":"付上海远行本部2台牵引车定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1594715650000,"createUser":87,"id":284,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200714143708","paymentType":"现金","remark":"899019180434","serialNumber":"20200714002","unusedAmount":"40000","updateTime":1597312419000,"updateUser":81,"usedAmount":"0.00"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"1703300.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594715650000,"createUser":87,"id":283,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200714092224","paymentType":"现金","remark":"899017340061","serialNumber":"20200714001","unusedAmount":"1703300.00","usedAmount":"0"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594691623000,"createUser":87,"id":279,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200713135953","paymentType":"现金","remark":"899018190425","serialNumber":"20200713004","unusedAmount":"450000","updateTime":1598324141000,"updateUser":83,"usedAmount":"50000"},{"abstractInfo":"车辆尾款HG15167\nHL19238\nH19156\nH19232\nHL19247\nH19234\nH19239\nH19159\nHL19236\nHL19248\nHL19230\nH19243\nH 19229\nHL19242\nH 19249\nH19158\nHL19245\nH19228\nH19157\nH 19224\nH19226 HG15167","accountAmount":"4800000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594710572000,"createUser":87,"id":280,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200713135601","paymentType":"现金","remark":"899017770416","serialNumber":"20200713005","unusedAmount":"4800000","usedAmount":"0"},{"abstractInfo":"HL19244\nHL19161\nHL19235\nHL19225\nHL19237\nHL19251\nHL19253\nHL19233\nHL19252\nHL19155","accountAmount":"3338000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594353675000,"createUser":87,"id":272,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200709165115","paymentType":"现金","remark":"899016890702","serialNumber":"20200709001","unusedAmount":"3338000.00","usedAmount":"0"},{"abstractInfo":"HL19227 HL19169 HL19254 HL19246 HL19255 HL19231 HL19241 HL19162 HL19167 HL19160","accountAmount":"3338000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1594258236000,"createUser":87,"id":271,"othersAmount":"0","paymentAccount":"1001051009300032761","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200708151345","paymentType":"现金","remark":"899017440515","serialNumber":"20200708002","unusedAmount":"1569000.00","updateTime":1595066897000,"updateUser":81,"usedAmount":"1769000.00"},{"abstractInfo":"1台车款（LB005903)）","accountAmount":"279470.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1593315299000,"createUser":87,"id":184,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200624183011","paymentType":"现金","remark":"899018421417","serialNumber":"20200624004","unusedAmount":"7090.00","updateTime":1628734341000,"updateUser":83,"usedAmount":"272380.00"},{"abstractInfo":"车架号LB009453/9678/9687","accountAmount":"550000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592990959000,"createUser":87,"id":183,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200624163046","paymentType":"现金","remark":"999015760403","serialNumber":"20200624003","unusedAmount":"550000","usedAmount":"0"},{"abstractInfo":"15台牵引车定金","accountAmount":"300000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1592990959000,"createUser":87,"id":181,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200624133718","paymentType":"现金","remark":"899016870515","serialNumber":"20200624001","unusedAmount":"100000","updateTime":1594622437000,"updateUser":81,"usedAmount":"200000.00"},{"abstractInfo":"车款LB009255","accountAmount":"88140.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1592905297000,"createUser":87,"id":179,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200623124741","paymentType":"现金","remark":"899018500390","serialNumber":"20200623002","unusedAmount":"78140.00","updateTime":1594630687000,"updateUser":81,"usedAmount":"10000.00"},{"abstractInfo":"车款 对应车架号：LB009460/9685/9688","accountAmount":"570000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":174,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200618164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006180001","unusedAmount":"570000","usedAmount":"0"},{"abstractInfo":"4台车款LB005917;5919;5901;5920","accountAmount":"1117880.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1592384831000,"createUser":87,"id":158,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200617170119","paymentType":"现金","remark":"999015140341","serialNumber":"20200617002","unusedAmount":"144574.00","updateTime":1595071278000,"updateUser":81,"usedAmount":"973306.00"},{"abstractInfo":"车款 对应车架号：LB009452、9674、9675、9677、9683","accountAmount":"950000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":173,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200610164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006100001","unusedAmount":"950000","usedAmount":"0"},{"abstractInfo":"付上海远行本部20台牵引车定金","accountAmount":"400000.00","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1591348880000,"createUser":87,"id":145,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200605171853","paymentType":"现金","remark":"899018480890","serialNumber":"20200605004","unusedAmount":"120000","updateTime":1594626698000,"updateUser":81,"usedAmount":"280000.00"},{"abstractInfo":"4台车款HD10214,10209,HC06303,HD11277","accountAmount":"1021200.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1591346261000,"createUser":87,"id":144,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200605161923","paymentType":"现金","remark":"899017590785","serialNumber":"20200605003","unusedAmount":"10000.00","updateTime":1628746098000,"updateUser":83,"usedAmount":"1011200.00"},{"abstractInfo":"10台车款LB005899,005897,005908,005891,005924,004213,004214,004208,004211,004212","accountAmount":"3141685.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1591255533000,"createUser":87,"id":140,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200604100717","paymentType":"现金","remark":"899018350132","serialNumber":"20200604001","unusedAmount":"111170.00","updateTime":1595064700000,"updateUser":81,"usedAmount":"3030515.00"},{"abstractInfo":"LB009456、9670、9671","accountAmount":"563365.91","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":172,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200602164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202006020001","unusedAmount":"563365.91","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"4000000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":171,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200529164159","paymentType":"承兑","remark":"999015960311","serialNumber":"202005290002","unusedAmount":"1340000","updateTime":1595038276000,"updateUser":81,"usedAmount":"2660000"},{"abstractInfo":"付上海远行本部二十台自卸车定金","accountAmount":"200000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1590052101000,"createUser":87,"id":106,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200521164502","paymentType":"现金","remark":"899018870574","serialNumber":"20200521012","unusedAmount":"160000","updateTime":1595146256000,"updateUser":81,"usedAmount":"40000"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"80000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1590049736000,"createUser":87,"id":95,"othersAmount":"0","paymentAccount":"840012010900000187","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521001","unusedAmount":"80000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"20000","baseAccount":"98250154740006273","belong":"base","clientName":"河南德银供应链管理有限公司","clientNo":"0100019","createTime":1590049736000,"createUser":87,"id":97,"othersAmount":"0","paymentAccount":"93801880161688008","paymentClient":"河南德银供应链管理有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521003","unusedAmount":"20000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"1045000","baseAccount":"98250154740006273","belong":"base","clientName":"北京德银远行供应链管理有限公司","clientNo":"0100032","createTime":1590049736000,"createUser":87,"id":100,"othersAmount":"0","paymentAccount":"110917441510701","paymentClient":"北京德银远行供应链管理有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521006","unusedAmount":"665000","updateTime":1597039244000,"updateUser":83,"usedAmount":"380000"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"118200","baseAccount":"98250154740006273","belong":"base","clientName":"青岛运发汽车销售服务有限公司","clientNo":"1001087","createTime":1590049736000,"createUser":87,"id":101,"othersAmount":"0","paymentAccount":"802720200205494","paymentClient":"青岛运发汽车销售服务有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521007","unusedAmount":"118200","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"250000","baseAccount":"98250154740006273","belong":"base","createTime":1590049736000,"createUser":87,"id":102,"othersAmount":"0","paymentAccount":"154739932","paymentClient":"四川臻宏车业有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521008","unusedAmount":"250000","usedAmount":"0"},{"abstractInfo":"期初（2020.3.31）","accountAmount":"900","baseAccount":"98250154740006273","belong":"base","clientName":"梁山环球专用汽车制造有限公司","clientNo":"100000000501","createTime":1590049736000,"createUser":87,"id":103,"othersAmount":"0","paymentAccount":"15491101040025936","paymentClient":"梁山环球汽车销售服务有限公司","paymentDate":"20200521120222","paymentType":"现金","remark":"899018530779","serialNumber":"20200521009","unusedAmount":"900","usedAmount":"0"},{"abstractInfo":"定金","accountAmount":"500000.00","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1589520932000,"createUser":87,"id":87,"othersAmount":"0","paymentAccount":"840012010900000187","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200514173046","paymentType":"现金","remark":"AAAAA1511935","serialNumber":"20200514001","unusedAmount":"300000","updateTime":1594625476000,"updateUser":81,"usedAmount":"200000.00"},{"abstractInfo":"山西远行车款","accountAmount":"1000000.00","baseAccount":"98250154740006273","belong":"base","clientName":"山西德银远行供应链管理有限公司","clientNo":"0100033","createTime":1589423609000,"createUser":87,"id":76,"othersAmount":"0","paymentAccount":"161401201020524141","paymentClient":"山西德银远行供应链管理有限公司","paymentDate":"20200505165430","paymentType":"现金","remark":"AAAAA5230388","serialNumber":"20200505001","unusedAmount":"1000000.00","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"160000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":63,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200424151755","paymentType":"现金","remark":"899017690565","serialNumber":"20200424001","unusedAmount":"160000.00","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"300000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":58,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200421132004","paymentType":"现金","remark":"899016860337","serialNumber":"20200421001","unusedAmount":"180000.00","updateTime":1589970358000,"updateUser":81,"usedAmount":"120000.00"},{"abstractInfo":"X3L车辆定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1589423609000,"createUser":87,"id":43,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200415152349","paymentType":"现金","remark":"899016540632","serialNumber":"20200415004","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"10000000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":169,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200403164158","paymentType":"承兑","remark":"600310020000001222","serialNumber":"202004030001","unusedAmount":"1432000","updateTime":1595036554000,"updateUser":81,"usedAmount":"8568000"},{"abstractInfo":"KB016358","accountAmount":"150000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":168,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200330164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003300001","unusedAmount":"150000","usedAmount":"0"},{"abstractInfo":"6.8米的全款","accountAmount":"128300.00","baseAccount":"98250154740006273","belong":"base","clientName":"青岛骏邦汽车销售服务有限公司","clientNo":"100000000514","createTime":1593574634000,"createUser":87,"id":239,"othersAmount":"0","paymentAccount":"3803025209200129969","paymentClient":"青岛骏邦汽车销售服务有限公司","paymentDate":"20200330091901","paymentType":"现金","remark":"AAAAA2710104","serialNumber":"20200330001","unusedAmount":"128300.00","usedAmount":"0"},{"abstractInfo":"港牵车定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":237,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200326153803","paymentType":"现金","remark":"899018570483","serialNumber":"20200326001","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"HH16405","accountAmount":"35300.00","baseAccount":"98250154740006273","belong":"base","clientName":"青岛祥瑞和汽车销售有限公司","clientNo":"100000000170","createTime":1593574634000,"createUser":87,"id":236,"othersAmount":"0","paymentAccount":"9020102404342050002115","paymentClient":"青岛祥瑞和汽车销售服务有限公司","paymentDate":"20200325170124","paymentType":"现金","remark":"AAAAA0520577","serialNumber":"20200325006","unusedAmount":"1000.00","updateTime":1595058366000,"updateUser":81,"usedAmount":"34300.00"},{"abstractInfo":"KB010266、016350、016353","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":167,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200319164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003190001","unusedAmount":"500000","usedAmount":"0"},{"abstractInfo":"016360、016354、010235","accountAmount":"500000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":166,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200318164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003180001","unusedAmount":"500000","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"200000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1595041371000,"createUser":86,"id":1113,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316174340","paymentType":"现金","remark":"车辆定金","serialNumber":"20200316099","unusedAmount":"180000","updateTime":1601021078000,"updateUser":45,"usedAmount":"20000"},{"abstractInfo":"车辆定金","accountAmount":"200000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":223,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316174340","paymentType":"现金","remark":"899016770698","serialNumber":"20200316008","unusedAmount":"20000.00","updateTime":1595041216000,"updateUser":81,"usedAmount":"180000.00"},{"abstractInfo":"34辆打包车订金","accountAmount":"340000.00","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1593574634000,"createUser":87,"id":222,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20200316162823","paymentType":"现金","remark":"999015320304","serialNumber":"20200316007","unusedAmount":"310000.00","updateTime":1595033766000,"updateUser":81,"usedAmount":"30000.00"},{"abstractInfo":"车款","accountAmount":"100000","baseAccount":"98250154740006273","belong":"base","clientName":"内蒙古远行供应链管理有限公司","clientNo":"0100030","createTime":1595141983000,"createUser":86,"id":1605,"othersAmount":"0","paymentAccount":"0604044009022184178","paymentClient":"内蒙古远行供应链管理有限公司","paymentDate":"20200316152536","paymentType":"现金","remark":"车款","serialNumber":"20200316066","unusedAmount":"10380.00","updateTime":1596090311000,"updateUser":83,"usedAmount":"89620.00"},{"abstractInfo":"车辆尾款YXK1911151","accountAmount":"569800.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":218,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316141853","paymentType":"现金","remark":"899016670409","serialNumber":"20200316003","unusedAmount":"569800.00","usedAmount":"0"},{"abstractInfo":"车辆尾款HE12392","accountAmount":"190500.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":217,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200316113713","paymentType":"现金","remark":"999015720135","serialNumber":"20200316002","unusedAmount":"190500.00","usedAmount":"0"},{"abstractInfo":"KB010245","accountAmount":"123925.07","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":165,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200309164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202003090001","unusedAmount":"123925.07","usedAmount":"0"},{"abstractInfo":"车辆定金","accountAmount":"140000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":212,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200306154919","paymentType":"现金","remark":"899019180452","serialNumber":"20200306001","unusedAmount":"140000.00","usedAmount":"0"},{"abstractInfo":"010265、010269车款及2万合同定金","accountAmount":"300000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":164,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200120164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001200001","unusedAmount":"262500","updateTime":1596873401000,"updateUser":81,"usedAmount":"37500"},{"abstractInfo":"车辆定金","accountAmount":"40000.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":201,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200116103104","paymentType":"现金","remark":"899019100190","serialNumber":"20200116001","unusedAmount":"40000.00","usedAmount":"0"},{"abstractInfo":"KB010255、010267","accountAmount":"250000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":162,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200113164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001130001","unusedAmount":"250000","usedAmount":"0"},{"abstractInfo":"车辆尾款","accountAmount":"647900.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":197,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200109105714","paymentType":"现金","remark":"899017060211","serialNumber":"20200109001","unusedAmount":"647900.00","usedAmount":"0"},{"abstractInfo":"010243、010239","accountAmount":"399684.4","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":161,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200108164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001080001","unusedAmount":"399684.4","usedAmount":"0"},{"abstractInfo":"车辆尾款","accountAmount":"568500.00","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1593574634000,"createUser":87,"id":196,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20200107143433","paymentType":"现金","remark":"999015560228","serialNumber":"20200107001","unusedAmount":"568500.00","usedAmount":"0"},{"abstractInfo":"KB016366车款","accountAmount":"100000","baseAccount":"98250154740006273","belong":"base","clientName":"河南骏通车辆有限公司","clientNo":"1001430","createTime":1592535007000,"createUser":87,"id":160,"othersAmount":"0","paymentAccount":"1713020709200014680","paymentClient":"河南骏通车辆有限公司","paymentDate":"20200102164158","paymentType":"承兑","remark":"999015960311","serialNumber":"202001020001","unusedAmount":"100000","usedAmount":"0"},{"abstractInfo":"车款","accountAmount":"1620600","baseAccount":"98250154740006273","belong":"base","clientName":"新疆远行供应链管理有限公司","clientNo":"0100041","createTime":1594983235000,"createUser":84,"id":1111,"othersAmount":"0","paymentAccount":"512090100100005415","paymentClient":"新疆远行供应链管理有限公司","paymentDate":"20191231152257","paymentType":"现金","remark":"车款","serialNumber":"20191231099","unusedAmount":"1360151.00","updateTime":1628733594000,"updateUser":83,"usedAmount":"260449.00"},{"abstractInfo":"车辆定金","accountAmount":"60000","baseAccount":"98250154740006273","belong":"base","clientName":"上海远行物流服务有限公司","clientNo":"0100055","createTime":1599105559000,"createUser":87,"id":3403,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20191224143315","paymentType":"现金","remark":"车辆定金","serialNumber":"201912240010","unusedAmount":"60000.00","updateTime":1599105672000,"updateUser":83,"usedAmount":"0"},{"abstractInfo":"L 支付11台车尾款","accountAmount":"2242600.00","baseAccount":"98250154740006273","belong":"base","createTime":1598252290000,"createUser":87,"id":3248,"othersAmount":"0","paymentAccount":"121918524810802","paymentClient":"上海远行物流服务有限公司","paymentDate":"20190424163651","paymentType":"现金","remark":"L 支付11台车尾款","serialNumber":"201904240001","unusedAmount":"1999560.00","updateTime":1598509675000,"updateUser":83,"usedAmount":"243040.00"}] 

```
#### 调拨开票
- http://127.0.0.1:8081/allot/index?dataFlag=5
```
URI_S_20220531164758994: /allot/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"dataFlag":["5"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164758994: /allot/index, time: 33, 
	|--reponse: "allot/apply_list" 

```
- http://127.0.0.1:8081/allot/getAllotApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeId=&truckCode=&serialNumber=&truckStatus=&status=1
```
URI_S_20220531164759549: /allot/getAllotApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeId":[""],"truckCode":[""],"serialNumber":[""],"truckStatus":[""],"status":["1"]}, body: [{"agencyCode":"","dataFlag":"0","pageNo":0,"pageSize":10,"serialNumber":"","status":"1","truckCode":"","truckStatus":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986879548,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT ai.* FROM allot_info ai LEFT JOIN allot_truck alt ON alt.apply_no = ai.apply_no WHERE ai.status = ? GROUP BY ai.id) table_count 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select ai.* from allot_info ai left join allot_truck alt on alt.apply_no = ai.apply_no WHERE ai.status = ? group by ai.id order by create_date desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164759549: /allot/getAllotApplyData, time: 116, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"allotAmount":"416000","allotFreight":"0","allotInAddress":"新疆维吾尔自治区伊犁哈萨克自治州伊宁县汽车站【陕西路之星】","allotInCode":"20190724162907561293","allotInContactNo":"FSCM-NM-SD-XS-202203-0006","allotInName":"新疆远行供应链管理有限公司","allotInReceiveId":134,"allotInSubmissionNo":"ALLOT20220303003","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190730184136956746","allotOutContactNo":"FSCM-JT-SD-XS-202203-0001","allotOutName":"内蒙远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303002","allotQuantity":"7","applyNo":"ALLOT20220303003","createDate":1646277490000,"createUser":101,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":105,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646278548000,"updateUser":94},{"allotAmount":"415500","allotFreight":"0","allotInAddress":"内蒙古自治区包头市九原区210国道东侧46中北侧，陕汽商用车","allotInCode":"20190730184136956746","allotInContactNo":"FSCM-JT-SD-XS-202203-0001","allotInName":"内蒙古远行供应链管理有限公司","allotInReceiveId":123,"allotInSubmissionNo":"ALLOT20220303002","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"base","allotOutContactNo":"FSCM-XJ-SD-XS-202203-0002","allotOutName":"上海远行","allotOutReceiveId":507,"allotOutSubmissionNo":"ALLOT20220303001","allotQuantity":"7","applyNo":"ALLOT20220303002","createDate":1646276397000,"createUser":94,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"新疆库车市经济技术开发区规划路以北经四路以西","freightAmount":"0","freightPayer":"out","id":104,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646276514000,"updateUser":79},{"allotAmount":"415000","allotFreight":"0","allotInAddress":"上海市静安区永和路118弄东方环球企业中心2号楼","allotInCode":"base","allotInContactNo":"FSCM-XJ-SD-XS-202203-0002","allotInName":"上海远行供应链管理（集团）有限公司","allotInReceiveId":545,"allotInSubmissionNo":"ALLOT20220303001","allotInvoice":"0","allotOutAddress":"新疆维吾尔自治区乌鲁木齐市头屯河区公路1575号","allotOutCode":"20190724162907561293","allotOutContactNo":"SJ202104-0002","allotOutName":"新疆远行","allotOutReceiveId":507,"allotOutSubmissionNo":"T20210330001","allotQuantity":"7","applyNo":"ALLOT20220303001","createDate":1646274432000,"createUser":81,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"","freightAmount":"","freightPayer":"out","id":103,"remark":"","shippingWay":"自提","status":"1","truckCode":"SX4256G3Y46Q4040N","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1646275767000,"updateUser":101},{"allotAmount":"354330","allotFreight":"0","allotInAddress":"江苏省淮安市清江浦区淮海南路333号淮安江冠陕汽重卡","allotInCode":"20190619154208925923","allotInContactNo":"FSCM-BJ-SD-XS-202107-0003","allotInName":"上海远行物流服务有限公司","allotInReceiveId":98,"allotInSubmissionNo":"ALLOT20210730001","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0095","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200807094","allotQuantity":"1","applyNo":"ALLOT20210730001","createDate":1627632866000,"createUser":89,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"河北","freightAmount":"0","freightPayer":"out","id":102,"remark":"HM21692","shippingWay":"送车","status":"1","truckCode":"SX4256G1Y46Q3840L","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1627633133000,"updateUser":149},{"allotAmount":"240000","allotFreight":"0","allotInAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotInCode":"20190730184702579901","allotInContactNo":"FSCM-ZF-SD-XS-202106-0049","allotInName":"北京德银远行供应链管理有限公司","allotInReceiveId":106,"allotInSubmissionNo":"ALLOT20210630001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184852711095","allotOutContactNo":"FSCM-BJ-SD-XS-202106-0010","allotOutName":"陕西中富","allotOutReceiveId":106,"allotOutSubmissionNo":"ALLOT20210624003","allotQuantity":"1","applyNo":"ALLOT20210630001","createDate":1625038721000,"createUser":97,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"/","freightAmount":"","freightPayer":"out","id":101,"remark":"LB005367","shippingWay":"自提","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1625038973000,"updateUser":106},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0028","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629006","allotInvoice":"0","allotOutAddress":"河北省唐山市玉田县南环路南白塔村路口东行100米","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0076","allotOutName":"北京德银","allotOutReceiveId":429,"allotOutSubmissionNo":"T20200807075","allotQuantity":"1","applyNo":"ALLOT20210629006","createDate":1624937166000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":100,"remark":"","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y44Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938608000,"updateUser":149},{"allotAmount":"243700","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0029","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629005","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0091","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20200807099","allotQuantity":"2","applyNo":"ALLOT20210629005","createDate":1624937051000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":99,"remark":"流水号：LB014076、 LB014078；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938618000,"updateUser":149},{"allotAmount":"254000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0030","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629004","allotInvoice":"0","allotOutAddress":"平泉市卧龙镇下洼子村","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202012-0044","allotOutName":"北京德银","allotOutReceiveId":427,"allotOutSubmissionNo":"T20201223002","allotQuantity":"5","applyNo":"ALLOT20210629004","createDate":1624935688000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":98,"remark":"流水号：LB019269 、LB019270 、LB019529 、LB019530、 LB019268；","shippingWay":"送车","status":"1","truckCode":"SX4255G2Y42Q3240","truckStatus":"6","truckTypeId":28,"truckTypeName":"轩德翼3系64QY","updateTime":1624938635000,"updateUser":149},{"allotAmount":"252100","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0031","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629002","allotInvoice":"0","allotOutAddress":"河北省邢台市沙河市京广路碧水嘉园门口北侧A-37号","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0115","allotOutName":"北京德银","allotOutReceiveId":112,"allotOutSubmissionNo":"T20200808004","allotQuantity":"1","applyNo":"ALLOT20210629002","createDate":1624935391000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":96,"remark":"流水号：LB007494；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938643000,"updateUser":149},{"allotAmount":"241000","allotFreight":"0","allotInAddress":"陕西省渭南市富平县南二环西段北侧","allotInCode":"20190730184852711095","allotInContactNo":"FSCM-BJ-SD-XS-202106-0032","allotInName":"陕西中富物联科技服务有限公司","allotInReceiveId":88,"allotInSubmissionNo":"ALLOT20210629001","allotInvoice":"0","allotOutAddress":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","allotOutCode":"20190730184702579901","allotOutContactNo":"SJ202008-0096","allotOutName":"北京德银","allotOutReceiveId":106,"allotOutSubmissionNo":"T20200807093","allotQuantity":"2","applyNo":"ALLOT20210629001","createDate":1624934909000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","downPrice":"0","freightAddress":"陕西省渭南市富平县南二环西段北侧","freightAmount":"0","freightPayer":"out","id":95,"remark":"流水号：LB009886、LB012240；","shippingWay":"送车","status":"1","truckCode":"SX4255G1Y42Q3240","truckStatus":"6","truckTypeId":1,"truckTypeName":"轩德3系64QY","updateTime":1624938651000,"updateUser":149}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":9,"prePage":0,"size":10,"startRow":1,"total":90} 

```

### 退库管理
#### 退库申请
- http://127.0.0.1:8081/cancellingStockNew/index
```
URI_S_20220531164958114: /cancellingStockNew/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986958738,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type where status = 0 
==> Parameters: 
<==      Total: 14
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531164958114: /cancellingStockNew/index, time: 112, 
	|--reponse: "cancelling/cancelling_index" 
```
- http://127.0.0.1:8081/cancellingStockNew/applyList?pageSize=10&pageNo=0&agencyName=&truckTypeName=&truckCode=&submissionType=&serialNumber=&status=
```
URI_S_20220531164958629: /cancellingStockNew/applyList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyName":[""],"truckTypeName":[""],"truckCode":[""],"submissionType":[""],"serialNumber":[""],"status":[""]}, body: [{"agencyName":"","clientId":0,"pageNo":0,"pageSize":10,"receiveId":0,"serialNumber":"","status":"","submissionId":0,"submissionType":"","truckCode":"","truckId":0,"truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653986998628,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ot.id truckId, sa.agency_simple_name agencySimpleName, sa.agency_name agencyName, ot.status, ot.truck_type_name truckTypeName, ot.truck_code truckCode, ii.serial_number serialNumber, ii.vin, ot.product_type_name productTypeName, o.submission_type submissionType, o.agency_code agencyCode, vb.vehicle_belong vehicleBelong, ri.address houseName, o.submission_no submissionNo, ot.manufactor_id manufactorId, o.contact_no contactNo FROM order_truck ot LEFT JOIN order_info o ON o.id = ot.order_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = o.agency_code LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN vehicle_belong vb ON vb.vehicle_no = ot.id LEFT JOIN repertory_info r ON r.truck_id = ot.id LEFT JOIN receive_info ri ON ri.id = r.receive_id WHERE ot.status != 8 AND ot.status != 3 AND ot.status != 4 AND ot.status != 5 AND (o.agency_code = ? OR vb.vehicle_belong = ? OR (o.submission_type = 0 AND ot.status BETWEEN 0 AND 2))) table_count 
==> Parameters: base(String), base(String)
<==      Total: 1
==>  Preparing: select DISTINCT ot.id truckId, sa.agency_simple_name agencySimpleName,sa.agency_name agencyName,ot.status,ot.truck_type_name truckTypeName,ot.truck_code truckCode,ii.serial_number serialNumber,ii.vin ,ot.product_type_name productTypeName,o.submission_type submissionType,o.agency_code agencyCode,vb.vehicle_belong vehicleBelong,ri.address houseName,o.submission_no submissionNo, ot.manufactor_id manufactorId, o.contact_no contactNo from order_truck ot left join order_info o on o.id = ot.order_id left join sys_agency sa on sa.agency_code_ours = o.agency_code left join incoming_info ii on ii.truck_id = ot.id left join vehicle_belong vb on vb.vehicle_no = ot.id left join repertory_info r on r.truck_id = ot.id left join receive_info ri on ri.id =r.receive_id WHERE ot.status != 8 and ot.status != 3 and ot.status != 4 and ot.status != 5 and (o.agency_code = ? or vb.vehicle_belong = ? or (o.submission_type= 0 and ot.status between 0 and 2)) limit ?,? 
==> Parameters: base(String), base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531164958629: /cancellingStockNew/applyList, time: 175, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"agencyCode":"20190730184136956746","agencyName":"内蒙古远行供应链管理有限公司","agencySimpleName":"内蒙远行","contactNo":"YXK1805291","manufactorId":"1","productTypeName":"康明斯产品","status":"0","submissionNo":"T20200520002","submissionType":"0","truckCode":"QB4MH64M44V320","truckId":4072,"truckTypeName":"轩德3系64QY"},{"agencyCode":"20190730184136956746","agencyName":"内蒙古远行供应链管理有限公司","agencySimpleName":"内蒙远行","contactNo":"YXK1805291","manufactorId":"1","productTypeName":"康明斯产品","status":"0","submissionNo":"T20200520002","submissionType":"0","truckCode":"QB4MH64M44V320","truckId":4073,"truckTypeName":"轩德3系64QY"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0001","houseName":"四川成都","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HE11352","status":"7","submissionNo":"T20200719003","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5186,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW49KB011352"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0001","houseName":"四川成都","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HE11354","status":"7","submissionNo":"T20200719003","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5187,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW42KB011354"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0001","houseName":"四川成都","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HD11137","status":"7","submissionNo":"T20200719003","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5188,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW45KB011137"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0001","houseName":"四川成都","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HE11353","status":"7","submissionNo":"T20200719003","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5189,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW40KB011353"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0001","houseName":"四川成都","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HE11356","status":"7","submissionNo":"T20200719003","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5190,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW46KB011356"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202003-0017","houseName":"西安市高陵区马家湾","manufactorId":"1","productTypeName":"康明斯产品","serialNumber":"HD11134","status":"7","submissionNo":"T20200719004","submissionType":"0","truckCode":"QB4MH64M44V322","truckId":5191,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW4XKB011134"},{"agencyCode":"base","agencyName":"上海远行供应链管理（集团）有限公司","agencySimpleName":"上海远行","contactNo":"FSCM-JT-SD-XS-202007-0027","manufactorId":"1","productTypeName":"康明斯产品","status":"0","submissionNo":"T20200729001","submissionType":"0","truckCode":"SX4255G2M44Q3240","truckId":5247,"truckTypeName":"轩德3系64QY"},{"agencyCode":"20190724162907561293","agencyName":"新疆远行供应链管理有限公司","agencySimpleName":"新疆远行","contactNo":"FSCM-JT-SD-XS-202009-0005","manufactorId":"1","productTypeName":"康明斯产品","status":"0","submissionNo":"T20200910001","submissionType":"0","truckCode":"SX4255G1M44Q3240","truckId":7516,"truckTypeName":"轩德3系64QY"}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":13,"prePage":0,"size":10,"startRow":1,"total":130} 

```
#### 退库待审批
- http://127.0.0.1:8081/cancellingStockNew/checkList?checkStatus=0
```
URI_S_20220531165115460: /cancellingStockNew/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["0"]}, body: null
2022-05-31 16:51:15.499 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.SysAgencyMapper.searchAgency   : ==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
2022-05-31 16:51:15.499 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.SysAgencyMapper.searchAgency   : ==> Parameters: 0(String)
2022-05-31 16:51:15.506 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.SysAgencyMapper.searchAgency   : <==      Total: 22
2022-05-31 16:51:15.506 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.T.selectAllByStatus            : ==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
2022-05-31 16:51:15.506 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.T.selectAllByStatus            : ==> Parameters: 0(String)
2022-05-31 16:51:15.511 DEBUG 3480 --- [io-8081-exec-14] c.c.m.s.d.T.selectAllByStatus            : <==      Total: 51
2022-05-31 16:51:15.511  INFO 3480 --- [io-8081-exec-14] com.clgg.aop.aspect.LogRecordAspect      : URI_E_20220531165115460: /cancellingStockNew/checkList, time: 51, 
	|--reponse: "cancelling/cancelling_check" 
```
- http://127.0.0.1:8081/cancellingStockNew/getCancellingApplyList
```
URI_S_20220531165116001: /cancellingStockNew/getCancellingApplyList,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"applyerName":[""],"applyToName":[""],"cancellingType":[""],"truckTypeName":[""],"checkStatus":["0"],"serialNumber":[""]}, body: [{"applyToName":"","applyerName":"","cancellingType":"","checkStatus":"0","pageNo":0,"pageSize":10,"serialNumber":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987075996,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
2022-05-31 16:51:16.061 DEBUG 3480 --- [io-8081-exec-19] c.m.s.d.C.searchCancellingInfoByVo_COUNT : ==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time, ci.submission_type, ri.address FROM cancelling_info ci LEFT JOIN receive_info ri ON ri.id = ci.cancelling_to_stock LEFT JOIN cancelling_truck ct ON ct.cancelling_id = ci.id WHERE ci.check_status = ?) table_count 
2022-05-31 16:51:16.062 DEBUG 3480 --- [io-8081-exec-19] c.m.s.d.C.searchCancellingInfoByVo_COUNT : ==> Parameters: 0(String)
2022-05-31 16:51:16.068 DEBUG 3480 --- [io-8081-exec-19] c.m.s.d.C.searchCancellingInfoByVo_COUNT : <==      Total: 1
2022-05-31 16:51:16.080  INFO 3480 --- [io-8081-exec-19] com.clgg.aop.aspect.LogRecordAspect      : URI_E_20220531165116001: /cancellingStockNew/getCancellingApplyList, time: 78, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 退库已完成
- http://127.0.0.1:8081/cancellingStockNew/checkList?checkStatus=1
```
URI_S_20220531165205980: /cancellingStockNew/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["1"]}, body: null
2022-05-31 16:52:05.993 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.SysAgencyMapper.searchAgency   : ==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
2022-05-31 16:52:05.993 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.SysAgencyMapper.searchAgency   : ==> Parameters: 0(String)
2022-05-31 16:52:06.001 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.SysAgencyMapper.searchAgency   : <==      Total: 22
2022-05-31 16:52:06.001 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.T.selectAllByStatus            : ==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
2022-05-31 16:52:06.001 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.T.selectAllByStatus            : ==> Parameters: 0(String)
2022-05-31 16:52:06.006 DEBUG 3480 --- [nio-8081-exec-5] c.c.m.s.d.T.selectAllByStatus            : <==      Total: 51
2022-05-31 16:52:06.006  INFO 3480 --- [nio-8081-exec-5] com.clgg.aop.aspect.LogRecordAspect      : URI_E_20220531165205980: /cancellingStockNew/checkList, time: 26, 
	|--reponse: "cancelling/cancelling_check" 
```

- http://127.0.0.1:8081/cancellingStockNew/getCancellingApplyList
```
URI_S_20220531165206487: /cancellingStockNew/getCancellingApplyList,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"applyerName":[""],"applyToName":[""],"cancellingType":[""],"truckTypeName":[""],"checkStatus":["1"],"serialNumber":[""]}, body: [{"applyToName":"","applyerName":"","cancellingType":"","checkStatus":"1","pageNo":0,"pageSize":10,"serialNumber":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987126355,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time, ci.submission_type, ri.address FROM cancelling_info ci LEFT JOIN receive_info ri ON ri.id = ci.cancelling_to_stock LEFT JOIN cancelling_truck ct ON ct.cancelling_id = ci.id WHERE ci.check_status = ?) table_count 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time,ci.submission_type, ri.address from cancelling_info ci left join receive_info ri on ri.id = ci.cancelling_to_stock left join cancelling_truck ct on ct.cancelling_id = ci.id WHERE ci.check_status = ? order by ci.id desc limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531165206487: /cancellingStockNew/getCancellingApplyList, time: 121, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"address":"河南省郑州市管城区十八里河镇小刘桥世贸汽车城","applyNo":"TKD20220519003","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":146,"cancellingType":"2","checkStatus":"1","checkUser":"","createTime":1652944336000,"createUser":110,"cutPaymentWay":"1","id":274,"liquidatedDamages":"0","remark":"","submissionType":"1","updateTime":1652944346000,"updateUser":110},{"address":"河南省郑州市管城区十八里河镇小刘桥世贸汽车城","applyNo":"TKD20220519002","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":146,"cancellingType":"2","checkStatus":"1","checkUser":"","createTime":1652944302000,"createUser":110,"cutPaymentWay":"1","id":273,"liquidatedDamages":"0","remark":"","submissionType":"1","updateTime":1652944351000,"updateUser":110},{"address":"河南省郑州市管城区十八里河镇小刘桥世贸汽车城","applyNo":"TKD20220519001","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":146,"cancellingType":"2","checkStatus":"1","checkUser":"","createTime":1652944273000,"createUser":110,"cutPaymentWay":"1","id":272,"liquidatedDamages":"0","remark":"","submissionType":"1","updateTime":1652944355000,"updateUser":110},{"address":"河南省郑州市新郑市郭店镇新能源汽车城院内F8号","applyNo":"TKD20220118002","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":414,"cancellingType":"2","checkStatus":"1","checkUser":"","createTime":1642492101000,"createUser":110,"cutPaymentWay":"1","id":271,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1642492115000,"updateUser":110},{"address":"河南省郑州市新郑市郭店镇新能源汽车城院内F8号","applyNo":"TKD20220118001","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":414,"cancellingType":"2","checkStatus":"1","checkUser":"","createTime":1642472402000,"createUser":110,"cutPaymentWay":"1","id":270,"liquidatedDamages":"0","remark":"","submissionType":"1","updateTime":1642472415000,"updateUser":110},{"applyNo":"TKD20211231006","applyTo":"1","applyToName":"陕汽集团商用车有限公司","applyer":"base","applyerName":"上海远行供应链管理（集团）有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"0","checkStatus":"1","checkUser":"","createTime":1640942590000,"createUser":81,"cutPaymentWay":"1","id":269,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1640942662000,"updateUser":79},{"applyNo":"TKD20211231005","applyTo":"1","applyToName":"陕汽集团商用车有限公司","applyer":"base","applyerName":"上海远行供应链管理（集团）有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"0","checkStatus":"1","checkUser":"","createTime":1640942528000,"createUser":81,"cutPaymentWay":"1","id":268,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1640942667000,"updateUser":79},{"applyNo":"TKD20211231004","applyTo":"1","applyToName":"陕汽集团商用车有限公司","applyer":"base","applyerName":"上海远行供应链管理（集团）有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"0","checkStatus":"1","checkUser":"","createTime":1640942488000,"createUser":81,"cutPaymentWay":"1","id":267,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1640942671000,"updateUser":79},{"applyNo":"TKD20211231003","applyTo":"base","applyToName":"上海远行供应链管理（集团）有限公司","applyer":"20190619154208925923","applyerName":"上海远行物流服务有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"1","checkStatus":"1","checkUser":"","createTime":1640941826000,"createUser":89,"cutPaymentWay":"1","id":266,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1640942227000,"updateUser":79},{"applyNo":"TKD20211231002","applyTo":"base","applyToName":"上海远行供应链管理（集团）有限公司","applyer":"20190619154208925923","applyerName":"上海远行物流服务有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"1","checkStatus":"1","checkUser":"","createTime":1640941803000,"createUser":89,"cutPaymentWay":"1","id":265,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1640942233000,"updateUser":79}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":27,"prePage":0,"size":10,"startRow":1,"total":267} 
```
- http://127.0.0.1:8081/cancellingStockNew/getCancellingNumber
```

URI_S_20220531165206637: /cancellingStockNew/getCancellingNumber,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{"applyToName":"","applyerName":"","cancellingType":"","checkStatus":"1","pageNo":1,"pageSize":10,"truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987126620,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: select SUM(cci.cancelling_number) cancellingNumber from (select DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time,ci.submission_type, ri.address from cancelling_info ci left join receive_info ri on ri.id = ci.cancelling_to_stock left join cancelling_truck ct on ct.cancelling_id = ci.id WHERE ci.check_status = ? order by ci.id desc) cci 
==> Parameters: 1(String)
<==      Total: 1
URI_E_20220531165206637: /cancellingStockNew/getCancellingNumber, time: 63, 
	|--reponse: {"code":0,"success":true,"cancellingNumber":529} 

```
#### 审批驳回
- http://127.0.0.1:8081/cancellingStockNew/checkList?checkStatus=2
```
URI_S_20220531165442691: /cancellingStockNew/checkList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"checkStatus":["2"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
URI_E_20220531165442691: /cancellingStockNew/checkList, time: 53, 
	|--reponse: "cancelling/cancelling_check" 
```
- http://127.0.0.1:8081/cancellingStockNew/getCancellingApplyList
```
URI_S_20220531165443405: /cancellingStockNew/getCancellingApplyList,method: POST, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"applyerName":[""],"applyToName":[""],"cancellingType":[""],"truckTypeName":[""],"checkStatus":["2"],"serialNumber":[""]}, body: [{"applyToName":"","applyerName":"","cancellingType":"","checkStatus":"2","pageNo":0,"pageSize":10,"serialNumber":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987283039,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time, ci.submission_type, ri.address FROM cancelling_info ci LEFT JOIN receive_info ri ON ri.id = ci.cancelling_to_stock LEFT JOIN cancelling_truck ct ON ct.cancelling_id = ci.id WHERE ci.check_status = ?) table_count 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select DISTINCT ci.id, ci.apply_no, ci.applyer, ci.applyer_name, ci.apply_to, ci.apply_to_name, ci.cancelling_type, ci.cancelling_to_stock, ci.cancelling_number, ci.remark, ci.liquidated_damages, ci.cut_payment_way, ci.check_status, ci.check_user, ci.create_user, ci.create_time, ci.update_user, ci.update_time,ci.submission_type, ri.address from cancelling_info ci left join receive_info ri on ri.id = ci.cancelling_to_stock left join cancelling_truck ct on ct.cancelling_id = ci.id WHERE ci.check_status = ? order by ci.id desc limit ?,? 
==> Parameters: 2(String), 0(Integer), 10(Integer)
<==      Total: 5
URI_E_20220531165443405: /cancellingStockNew/getCancellingApplyList, time: 99, 
	|--reponse: {"endRow":5,"firstPage":1,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"lastPage":1,"list":[{"applyNo":"TKD20210617005","applyTo":"base","applyToName":"上海远行供应链管理（集团）有限公司","applyer":"20190730184702579901","applyerName":"北京德银远行供应链管理有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"1","checkStatus":"2","checkUser":"","createTime":1623914362000,"createUser":97,"cutPaymentWay":"1","id":236,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1623914961000,"updateUser":149},{"applyNo":"TKD20210208006","applyTo":"1","applyToName":"陕汽集团商用车有限公司","applyer":"20190619154208925923","applyerName":"上海远行物流服务有限公司","cancellingNumber":"10","cancellingToStock":0,"cancellingType":"0","checkStatus":"2","checkUser":"","createTime":1612772825000,"createUser":89,"cutPaymentWay":"1","id":116,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1612772891000,"updateUser":89},{"applyNo":"TKD20210123003","applyTo":"1","applyToName":"陕汽集团商用车有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"0","checkStatus":"2","checkUser":"","createTime":1611388446000,"createUser":110,"cutPaymentWay":"1","id":87,"liquidatedDamages":"0","remark":"","submissionType":"0","updateTime":1611388880000,"updateUser":109},{"applyNo":"TKD20201111001","applyTo":"base","applyToName":"上海远行供应链管理（集团）有限公司","applyer":"20190724162907561293","applyerName":"新疆远行供应链管理有限公司","cancellingNumber":"1","cancellingToStock":0,"cancellingType":"1","checkStatus":"2","checkUser":"","createTime":1605084457000,"createUser":101,"cutPaymentWay":"1","id":6,"liquidatedDamages":"0","remark":"调回本部，其他子公司试调拨","submissionType":"0","updateTime":1605084520000,"updateUser":79},{"address":"河南省郑州市管城区十八里河镇小刘桥世贸汽车城","applyNo":"TKD20201105001","applyTo":"20190730184345661796","applyToName":"河南德银供应链管理有限公司","applyer":"20190730184345661796","applyerName":"河南德银供应链管理有限公司","cancellingNumber":"1","cancellingToStock":146,"cancellingType":"2","checkStatus":"2","checkUser":"","createTime":1604563454000,"createUser":118,"cutPaymentWay":"","id":1,"liquidatedDamages":"0","remark":"","submissionType":"1","updateTime":1604568226000,"updateUser":109}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":5,"startRow":1,"total":5} 

```

### 库存盘点管理
- http://127.0.0.1:8081/inventory/report/check
```
URI_S_20220531165607683: /inventory/report/check,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ot.id, ii.vin, ii.serial_number AS serialNumber, ot.status, sa.address AS agencyAddress, sa.agency_simple_name AS agencySimpleName, ot.`name` AS orderTruckName, ot.cab_type AS cabType, ot.truck_code AS truckCode, ot.public_type AS publicType, tctemp.check_status AS checkStatus, tctemp.check_remark AS checkRemark, tctemp.error_status errorStatus, rii.address storeAddress, tctemp.pass_status passStatus, tctemp.pass_remark passRemark, tctemp.check_time checkTime, tctemp.id checkId FROM order_truck ot LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code RIGHT JOIN (SELECT tc.id, tc.truck_id, tc.check_status, tc.check_remark, tc.check_time, tc.error_status, tc.pass_status, tc.pass_remark FROM truck_check tc WHERE STR_TO_DATE(tc.check_time, '%Y-%m-%d') >= STR_TO_DATE(?, '%Y-%m-%d') AND STR_TO_DATE(tc.check_time, '%Y-%m-%d') <= STR_TO_DATE(?, '%Y-%m-%d')) tctemp ON tctemp.truck_id = ot.id LEFT JOIN repertory_info ri ON ri.truck_id = ot.id LEFT JOIN receive_info rii ON rii.id = ri.receive_id WHERE tctemp.truck_id IS NOT NULL AND ot.status = '6') table_count 
==> Parameters: 2022-05-25(String), 2022-06-05(String)
<==      Total: 1
==>  Preparing: select DISTINCT ot.id,ii.vin,ii.serial_number as serialNumber, ot.status,sa.address as agencyAddress, sa.agency_simple_name as agencySimpleName,ot.`name` as orderTruckName,ot.cab_type as cabType, ot.truck_code as truckCode, ot.public_type as publicType,tctemp.check_status as checkStatus,tctemp.check_remark as checkRemark,tctemp.error_status errorStatus,rii.address storeAddress, tctemp.pass_status passStatus,tctemp.pass_remark passRemark,tctemp.check_time checkTime,tctemp.id checkId from order_truck ot left join order_info oi on oi.id = ot.order_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id left join sys_agency sa on sa.agency_code_ours = oi.agency_code right JOIN ( SELECT tc.id, tc.truck_id, tc.check_status, tc.check_remark, tc.check_time, tc.error_status, tc.pass_status, tc.pass_remark FROM truck_check tc WHERE STR_TO_DATE( tc.check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE( tc.check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') ) tctemp on tctemp.truck_id = ot.id left join repertory_info ri on ri.truck_id = ot.id left join receive_info rii on rii.id = ri.receive_id WHERE tctemp.truck_id is not null and ot.status = '6' order by tctemp.pass_status asc,tctemp.check_time desc limit ?,? 
==> Parameters: 2022-05-25(String), 2022-06-05(String), 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 8215(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 9446(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 5810(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 9359(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 9008(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 8698(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 8094(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 4646(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 5402(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
==>  Preparing: select image imageUrl, address,longitude,latitude,truck_id truckId,serial_number serialNumber,type from sys_check_repertory WHERE truck_id = ? AND STR_TO_DATE(check_time, '%Y-%m-%d' ) >= STR_TO_DATE( ?, '%Y-%m-%d' ) AND STR_TO_DATE(check_time, '%Y-%m-%d' ) <= STR_TO_DATE(?,'%Y-%m-%d') 
==> Parameters: 10808(Long), 2022-05-25(String), 2022-06-05(String)
<==      Total: 0
URI_E_20220531165607683: /inventory/report/check, time: 200, 
	|--reponse: "inventory/report_check" 

```

### 库存盘点报表
- http://127.0.0.1:8081/inventory/report/checklist
```
URI_S_20220531165651208: /inventory/report/checklist,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987368285,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, DATE_FORMAT(check_time,'%Y-%m-%d')as check_time, agency_name, agency_code, total_num, check_num,check_notpass_num,no_check_num, remark, checked_num,checked_pass_num,no_operation_num from truck_check_result WHERE YEAR(check_time)=YEAR(?) and Month(check_time)=Month(?) order by agency_code 
==> Parameters: 2022-04-01(String), 2022-04-01(String)
<==      Total: 7
==>  Preparing: SELECT SUM(total_num) as total_num,SUM(check_num) as check_num,SUM(check_notpass_num) as check_notpass_num,SUM(no_check_num) as no_check_num,sum(checked_num) checked_num, sum(checked_pass_num) checked_pass_num, sum(no_operation_num) no_operation_num from truck_check_result where YEAR(check_time)=YEAR(?) and Month(check_time)=Month(?) 
==> Parameters: 2022-04-01(String), 2022-04-01(String)
<==      Total: 1
URI_E_20220531165651208: /inventory/report/checklist, time: 37, 
	|--reponse: "inventory/report_check_list" 

```

### 盘点权限管理
- http://127.0.0.1:8081/check/permission/index
```
URI_S_20220531165735075: /check/permission/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: SELECT count(0) FROM truck_check_permission p LEFT JOIN receive_info r ON r.id = p.receive_id WHERE p.status = '0' 
==> Parameters: 
<==      Total: 1
==>  Preparing: select p.id, p.receive_id, p.checker_name, p.checker_phone, p.agency_code, p.agency_name, p.status, p.create_user, p.create_time, p.update_user, p.update_time, r.address from truck_check_permission p left join receive_info r on r.id = p.receive_id WHERE p.status = '0' limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select r.id, r.address, r.receive_name, r.receive_phone, r.send_id, r.create_user, r.create_time, r.update_user, r.update_time, s.send_name,r.house_name,r.receive_type,s.agency_code from receive_info r left join send_info s on r.send_id = s.id left join truck_check_permission t on t.receive_id = r.id WHERE r.receive_type = ? and s.id is not null order by r.create_time desc 
==> Parameters: 仓库(String)
<==      Total: 27
URI_E_20220531165735075: /check/permission/index, time: 130, 
	|--reponse: "check_permission/permission_list" 

```

### 移库申请
- http://127.0.0.1:8081/stock/move/index
```
URI_S_20220531165824055: /stock/move/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987455617,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531165824055: /stock/move/index, time: 44, 
	|--reponse: "move/index" 
```
- http://127.0.0.1:8081/stock/move/getStockTruckForApply?pageSize=10&pageNo=0&agencyCode=&truckTypeName=&truckCode=&serialNumber=&status=
```
URI_S_20220531165824574: /stock/move/getStockTruckForApply,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeName":[""],"truckCode":[""],"serialNumber":[""],"status":[""]}, body: [{"agencyCode":"","pageNo":0,"pageSize":10,"serialNumber":"","status":"","truckCode":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987504571,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: select count(0) from (select DISTINCT ot.id truckId, a.agency_simple_name agencyName, r.address, ot.truck_type_name truckTypeName, ot.truck_code truckCode,ii.serial_number serialNumber, case ot.status when 0 then '待排产' when 1 then '已排产' when 2 then '主机厂库存' when 3 then '已申请发车' when 4 then '在途' when 5 then '已申请收车' when 6 then '渠道库存' when 7 then '已销售' when 8 then '已退库' when 61 then '渠道库存-退' else '' end 'status', o.submission_id submissionId, o.agency_code agencyCode, ri.receive_id receiveId,r.house_name houseName,ii.vin from order_truck ot left join order_info o on o.id = ot.order_id left join incoming_info ii on ii.truck_id = ot.id left join repertory_info ri on ri.truck_id = ot.id left join receive_info r on r.id = ri.receive_id left join sys_agency a on a.agency_code_ours = o.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id WHERE (ot.status in(6,61))) tmp_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT ot.id truckId, a.agency_simple_name agencyName, r.address, ot.truck_type_name truckTypeName, ot.truck_code truckCode,ii.serial_number serialNumber, case ot.status when 0 then '待排产' when 1 then '已排产' when 2 then '主机厂库存' when 3 then '已申请发车' when 4 then '在途' when 5 then '已申请收车' when 6 then '渠道库存' when 7 then '已销售' when 8 then '已退库' when 61 then '渠道库存-退' else '' end 'status', o.submission_id submissionId, o.agency_code agencyCode, ri.receive_id receiveId,r.house_name houseName,ii.vin from order_truck ot left join order_info o on o.id = ot.order_id left join incoming_info ii on ii.truck_id = ot.id left join repertory_info ri on ri.truck_id = ot.id left join receive_info r on r.id = ri.receive_id left join sys_agency a on a.agency_code_ours = o.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id WHERE (ot.status in(6,61)) limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531165824574: /stock/move/getStockTruckForApply, time: 145, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"address":"天津市北辰区津围公路与津榆公路交口卡车市场院内","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":288,"serialNumber":"HE12404","status":"渠道库存","submissionId":93,"truckCode":"QC5MH62K27V540","truckId":2814,"truckTypeName":"轩德3系62WL","vin":"LZGCL2L92KB012404"},{"agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":375,"serialNumber":"HD11145","status":"渠道库存","submissionId":90,"truckCode":"QB4MH64M44V322","truckId":3112,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW44KB011145"},{"agencyCode":"20190730184852711095","agencyName":"陕西中富","serialNumber":"HF14415","status":"渠道库存","submissionId":91,"truckCode":"QB4MH64M44V322","truckId":3153,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW40KB014415"},{"address":"天津市天津市北辰区刘安庄工业园佳景道2号","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"天津盛德广通汽车销售有限公司","receiveId":113,"serialNumber":"HF14419","status":"渠道库存","submissionId":92,"truckCode":"QB4MH64M44V322","truckId":3586,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW48KB014419"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015966","status":"渠道库存","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4137,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW47LB015966"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015961","status":"渠道库存","submissionId":26,"truckCode":"SX4255G2M44Q3240","truckId":4139,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW48LB015961"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015694","status":"渠道库存","submissionId":26,"truckCode":"SX4255G2M44Q3240","truckId":4140,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW40LB015694"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015689","status":"渠道库存","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4141,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW47LB015689"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015964","status":"渠道库存","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4142,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW43LB015964"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","houseName":"唐山盛通汽车销售有限公司","receiveId":106,"serialNumber":"LB015696","status":"渠道库存","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4143,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW44LB015696"}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":73,"prePage":0,"size":10,"startRow":1,"total":723} 

```

### 借车申请
#### 借车申请
- http://127.0.0.1:8081/stock/lend/index
```
URI_S_20220531170102043: /stock/lend/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987569019,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170102043: /stock/lend/index, time: 31, 
	|--reponse: "lend/lend_index" 
```
- http://127.0.0.1:8081/stock/lend/getApplyData?pageSize=10&pageNo=0&agencyCode=&truckTypeName=&truckCode=&serialNumber=&status=
```
URI_S_20220531170102456: /stock/lend/getApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"agencyCode":[""],"truckTypeName":[""],"truckCode":[""],"serialNumber":[""],"status":[""]}, body: [{"agencyCode":"","pageNo":0,"pageSize":10,"serialNumber":"","status":"","truckCode":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987662402,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT ot.id truckId, a.agency_simple_name agencyName, r.address, ot.truck_type_name truckTypeName, ot.truck_code truckCode, ii.serial_number serialNumber, ot.status, o.submission_id submissionId, o.agency_code agencyCode, ri.receive_id receiveId, r.house_name houseName, ii.vin FROM order_truck ot LEFT JOIN order_info o ON o.id = ot.order_id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN repertory_info ri ON ri.truck_id = ot.id LEFT JOIN receive_info r ON r.id = ri.receive_id LEFT JOIN sys_agency a ON a.agency_code_ours = o.agency_code LEFT JOIN vehicle_belong vb ON vb.vehicle_no = ot.id WHERE (ot.status IN (6, 61, 2))) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: select DISTINCT ot.id truckId, a.agency_simple_name agencyName, r.address, ot.truck_type_name truckTypeName, ot.truck_code truckCode,ii.serial_number serialNumber, ot.status, o.submission_id submissionId, o.agency_code agencyCode, ri.receive_id receiveId,r.house_name houseName,ii.vin from order_truck ot left join order_info o on o.id = ot.order_id left join incoming_info ii on ii.truck_id = ot.id left join repertory_info ri on ri.truck_id = ot.id left join receive_info r on r.id = ri.receive_id left join sys_agency a on a.agency_code_ours = o.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id WHERE (ot.status in(6,61,2)) limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531170102456: /stock/lend/getApplyData, time: 171, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":8,"list":[{"address":"天津市北辰区津围公路与津榆公路交口卡车市场院内","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":288,"serialNumber":"HE12404","status":"6","submissionId":93,"truckCode":"QC5MH62K27V540","truckId":2814,"truckTypeName":"轩德3系62WL","vin":"LZGCL2L92KB012404"},{"agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":375,"serialNumber":"HD11145","status":"6","submissionId":90,"truckCode":"QB4MH64M44V322","truckId":3112,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW44KB011145"},{"agencyCode":"20190730184852711095","agencyName":"陕西中富","serialNumber":"HF14415","status":"6","submissionId":91,"truckCode":"QB4MH64M44V322","truckId":3153,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW40KB014415"},{"address":"天津市天津市北辰区刘安庄工业园佳景道2号","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":113,"serialNumber":"HF14419","status":"6","submissionId":92,"truckCode":"QB4MH64M44V322","truckId":3586,"truckTypeName":"轩德3系64QY","vin":"LZGJLGW48KB014419"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015966","status":"6","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4137,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW47LB015966"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015961","status":"6","submissionId":26,"truckCode":"SX4255G2M44Q3240","truckId":4139,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW48LB015961"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015694","status":"6","submissionId":26,"truckCode":"SX4255G2M44Q3240","truckId":4140,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW40LB015694"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015689","status":"6","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4141,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW47LB015689"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015964","status":"6","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4142,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW43LB015964"},{"address":"河北省唐山市路北区韩城镇东欢坨1村【唐山盛通】","agencyCode":"20190730184852711095","agencyName":"陕西中富","receiveId":106,"serialNumber":"LB015696","status":"6","submissionId":27,"truckCode":"SX4255G2M44Q3240","truckId":4143,"truckTypeName":"轩德翼3系64QY","vin":"LZGJLGW44LB015696"}],"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":94,"prePage":0,"size":10,"startRow":1,"total":934} 

```
#### 借车待审批
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=0
```
URI_S_20220531170147954: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["0"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170147954: /stock/lend/lendCheck, time: 93, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=0&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170148674: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["0"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"0","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987708679,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 0(String)
<==      Total: 1
URI_E_20220531170148674: /stock/lend/getLendData, time: 67, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 借车审批通过
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=1
```
URI_S_20220531170230467: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["1"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170230467: /stock/lend/lendCheck, time: 30, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=1&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170231029: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["1"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"1","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987750988,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 1(String)
<==      Total: 1
URI_E_20220531170231029: /stock/lend/getLendData, time: 32, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 发车申请
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=3
```
URI_S_20220531170307727: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["3"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170307727: /stock/lend/lendCheck, time: 31, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=3&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170308243: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["3"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"3","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987788242,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 3(String)
<==      Total: 1
URI_E_20220531170308243: /stock/lend/getLendData, time: 41, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 已发车
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=4
```
URI_S_20220531170409579: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["4"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170409579: /stock/lend/lendCheck, time: 83, 
	|--reponse: "lend/lend_check" 

```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=4&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170410258: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["4"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"4","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987850194,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 4(String)
<==      Total: 1
URI_E_20220531170410258: /stock/lend/getLendData, time: 57, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 借车明细
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=5
```
write javaBean error, class org.springframework.validation.BeanPropertyBindingResult, fieldName : org.springframework.validation.BindingResult.stockLendVo, write javaBean error, class org.springframework.beans.GenericTypeAwarePropertyDescriptor, fieldName : 5
URI_S_20220531170503844: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["5"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170503844: /stock/lend/lendCheck, time: 90, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=5&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170504493: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["5"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"5","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987904460,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 5(String)
<==      Total: 1
URI_E_20220531170504493: /stock/lend/getLendData, time: 91, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 还车确认
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=6
```
URI_S_20220531170613388: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["6"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170613388: /stock/lend/lendCheck, time: 100, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=6&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170613991: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["6"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"6","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987973904,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 6(String)
slow sql 230 millis. SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count["6"]
<==      Total: 1
URI_E_20220531170613991: /stock/lend/getLendData, time: 363, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 续借申请
- http://127.0.0.1:8081/stock/lend/renew
```
URI_S_20220531170658774: /stock/lend/renew,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653987974355,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170658774: /stock/lend/renew, time: 36, 
	|--reponse: "lend/lend_renew" 
```
- http://127.0.0.1:8081/stock/lend/getRenewData?pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=&renewStatus=0
```
URI_S_20220531170659270: /stock/lend/getRenewData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""],"renewStatus":["0"]}, body: [{"lendFromAgencyCode":"","pageNo":0,"pageSize":10,"renewStatus":"0","serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653988019171,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT lr.id, lr.stock_lend_apply_no, lr.stock_lend_id, lr.apply_no, lr.return_date, lr.renew_date, lr.renew_reason, lr.renew_cost, lr.renew_status, lr.create_user, lr.create_time, lr.update_user, lr.update_time, su.account checkUser, sa.agency_name lendFromCompanyName, ssa.agency_name applyAgencyName, l.lend_from_agency_code lendFromAgencyCode, l.lend_to_agency_code lendToAgencyCode FROM stock_lend_renew lr LEFT JOIN stock_lend l ON lr.stock_lend_id = l.id LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = lr.stock_lend_id LEFT JOIN approval_manager am ON am.apply_no = lr.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE lr.renew_status = ?) table_count 
==> Parameters: 0(String)
<==      Total: 1
URI_E_20220531170659270: /stock/lend/getRenewData, time: 56, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 已还车
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=7
```
URI_S_20220531170741350: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["7"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170741350: /stock/lend/lendCheck, time: 115, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=7&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170742045: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["7"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"7","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653988062014,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 7(String)
<==      Total: 1
URI_E_20220531170742045: /stock/lend/getLendData, time: 75, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 已驳回
- http://127.0.0.1:8081/stock/lend/lendCheck?lendStatus=2
```
URI_S_20220531170830360: /stock/lend/lendCheck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["2"]}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT r.id,r.address,r.receive_name,r.receive_phone,r.house_name FROM receive_info r left join send_info s on r.send_id = s.id where s.agency_code = ? 
==> Parameters: base(String)
<==      Total: 14
URI_E_20220531170830360: /stock/lend/lendCheck, time: 162, 
	|--reponse: "lend/lend_check" 
```
- http://127.0.0.1:8081/stock/lend/getLendData?lendStatus=2&pageSize=10&pageNo=0&lendFromAgencyCode=&truckTypeName=&serialNumber=&truckStatus=
```
URI_S_20220531170831135: /stock/lend/getLendData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"lendStatus":["2"],"pageSize":["10"],"pageNo":["0"],"lendFromAgencyCode":[""],"truckTypeName":[""],"serialNumber":[""],"truckStatus":[""]}, body: [{"lendFromAgencyCode":"","lendStatus":"2","pageNo":0,"pageSize":10,"serialNumber":"","truckStatus":"","truckTypeName":""},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653988111122,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM (SELECT DISTINCT l.id, l.apply_no, l.lend_from_agency_code, l.lend_from_address, l.lend_from_address_id, l.lend_to_agency_code, l.lend_to_address, l.lend_to_address_id, l.lend_reason, l.lend_status, l.lend_date, l.lend_confirm_date, l.lend_confirm_user, l.return_date, l.return_confirm_date, l.return_confirm_user, l.return_address, l.return_address_id, l.remark, l.lend_cost, l.create_user, l.create_time, l.update_user, l.update_time, su.account checkUser, sa.agency_name, ssa.agency_name applyAgencyName, l.lend_real_send_date, l.lend_confirm_user_phone FROM stock_lend l LEFT JOIN stock_lend_truck lt ON lt.stock_lend_id = l.id LEFT JOIN approval_manager am ON am.apply_no = l.apply_no LEFT JOIN sys_user su ON su.id = am.current_check_user LEFT JOIN order_truck ot ON ot.id = lt.truck_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = l.lend_from_agency_code LEFT JOIN sys_agency ssa ON ssa.agency_code_ours = l.lend_to_agency_code WHERE l.lend_status = ?) table_count 
==> Parameters: 2(String)
<==      Total: 1
URI_E_20220531170831135: /stock/lend/getLendData, time: 27, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```


## 报表管理

### 02 整车日报表-自动抓取
- http://127.0.0.1:8082/reportDayAutoInventory/view?agencyCode=20190730184852711095&endTime=2022-05-31
	- com.clgg.modules.system.controller.ReportDayAutoInventoryController#dayView
```
URI_S_20220606095103856: /reportDayAutoInventory/view,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"agencyCode":["20190730184852711095"],"endTime":["2022-05-31"]}, body: null

select id, product_type_id, product_type, agency_code, agency_name, buy_day, buy_month, buy_year, sales_day, sales_month, sales_year, pay_day, pay_month, pay_year, sales_ticket_day, sales_ticket_month, sales_ticket_year, inventory, inventory_on_way, low_thirty, low_sixty, low_ninty, low_hundred_twenty, low_others, low_others_reserve, inventory_on_sub, inventory_total, in_produce, remark, submit_user_name, create_user, create_time, transfer_day, transfer_month, transfer_year, low_half_year from report_auto_day_inventory where STR_TO_DATE(create_time,'%Y-%m-%d') = STR_TO_DATE('2022-05-31 23:59:59','%Y-%m-%d') and agency_code = '20190730184852711095'; 
--  Parameters: 2022-05-31 23:59:59(String), 20190730184852711095(String)

-- id	agency_name	agency_simple_name	father	agency_code	type	type_address	status	phone	address	postcode	remark	tax_number	bank_name	bank_account	bank_account_phone	bank_account_address	create_time	create_user	agency_code_ours	bank_code	bank_fullName
-- 13	陕西中富物联科技服务有限公司	陕西中富	base	0100038	0	西部	0	029-86962890	陕西省西安市高陵区西金路泾渭国际中心5楼	710200		9161000059875616XN	中国工商银行富平县支行	2605040609200099072	0913-8209777	富平县南二环西段北侧	2019-07-30 18:48:53	1	20190730184852711095	[NULL]	[NULL]
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0" 
--  Parameters: 0(String)

	|--reponse: "report/report_day_auto" 
```
#### 相关
##### 定时任务
- com.clgg.config.ReportScheduleConfig#autoCreateAutoDayInventory
##### 接口
- http://127.0.0.1:8082/reportDayAutoInventory/auto?datetIime=2022-06-02 00:01:10
	- com.clgg.modules.system.controller.ReportDayAutoInventoryController#autoCreateDayInventory
```
URI_S_20220606104028232: /reportDayAutoInventory/auto,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"datetIime":["2022-06-02 00:01:10"]}, body: ["2022-06-02 00:01:10"]

ReportDaySearchVo(startTime=2022-06-01 00:00:00, endTime=2022-06-01 23:59:59, startMonthTime=2022-06-01 00:00:00, startYearTime=2022-01-01 00:00:00, agencyCode=base)

-- //      1、获取有效本部、子公司和经销商列表
select * from sys_agency where `status` = "0" order by id; 
-- Parameters: 

-- //      2、获取车辆型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type where status = 0 and name_type in (0,2) order by id ;
--  Parameters: 

-- //      3、采购日 [采购]
SELECT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number from order_info oi LEFT JOIN order_truck ot on ot.original_submission_no = oi.submission_no LEFT JOIN planning_info pli on pli.truck_id = ot.id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE pli.plan_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and pli.plan_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') GROUP BY oi.agency_code,ot.product_type_id; 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      4、采购月
SELECT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number from order_info oi LEFT JOIN order_truck ot on ot.original_submission_no = oi.submission_no LEFT JOIN planning_info pli on pli.truck_id = ot.id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE pli.plan_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and pli.plan_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') GROUP BY oi.agency_code,ot.product_type_id; 
-- Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      5、采购年
SELECT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number from order_info oi LEFT JOIN order_truck ot on ot.original_submission_no = oi.submission_no LEFT JOIN planning_info pli on pli.truck_id = ot.id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE pli.plan_time >= str_to_date('2022-01-01 00:00:00', '%Y-%m-%d %H:%i:%s') and pli.plan_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') GROUP BY oi.agency_code,ot.product_type_id; 
--  Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)

-- //      3、销售订单日 [销售订单]
SELECT
	DISTINCT tmp.agency_simple_name,
	tmp.agency_code,
	tmp.product_type_name,
	tmp.product_type_id,
	COUNT(tmp.id) truck_number
FROM
	(
	SELECT
		DISTINCT sa.agency_simple_name,
		oi.agency_code,
		ot.product_type_name,
		ot.product_type_id,
		cm.create_time,
		cm.contact_no,
		otsi.sub_down_price,
		otsi.sub_down_price_leave,
		ot.id
	from
		order_truck_sell_info otsi
	left JOIN order_truck ot on
		ot.id = otsi.truck_id
	LEFT JOIN order_info oi on
		oi.id = otsi.order_id
	LEFT JOIN contact_truck ct on
		ct.truck_id = ot.id
	left JOIN contact_manager cm on
		cm.id = ct.contact_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	where
		cm.sales_target_id is not null
		and otsi.truck_status <> 1
		and otsi.sub_down_price = 0
		and cm.create_time >= str_to_date('2022-06-01 00:00:00',
		'%Y-%m-%d %H:%i:%s')
		and cm.create_time <= str_to_date('2022-06-01 23:59:59',
		'%Y-%m-%d %H:%i:%s')
	group by
		ot.id
UNION ALL
	SELECT
		DISTINCT sa.agency_simple_name,
		oi.agency_code,
		ot.product_type_name,
		ot.product_type_id,
		wo.write_off_time create_time,
		cm.contact_no,
		otsi.sub_down_price,
		otsi.sub_down_price_leave,
		ot.id
	from
		order_truck_sell_info otsi
	left JOIN order_truck ot on
		ot.id = otsi.truck_id
	LEFT JOIN order_info oi on
		oi.id = otsi.order_id
	LEFT JOIN contact_truck ct on
		ct.truck_id = ot.id
	left JOIN contact_manager cm on
		cm.id = ct.contact_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	LEFT JOIN write_off wo on
		wo.truck_id = otsi.truck_id
	LEFT JOIN write_off_detail wod on
		wod.write_off_id = wo.id
	LEFT JOIN capital_inflow ci on
		ci.id = wod.inflow_id
	where
		cm.sales_target_id is not null
		and otsi.truck_status <> 1
		and otsi.sub_down_price <> 0
		and otsi.sub_down_price_leave = 0
		and wo.write_off_type = '定金'
		and ci.belong <> 'base'
		and wo.write_off_time >= str_to_date('2022-06-01 00:00:00',
		'%Y-%m-%d %H:%i:%s')
		and wo.write_off_time <= str_to_date('2022-06-01 23:59:59',
		'%Y-%m-%d %H:%i:%s')
	group by
		ot.id
UNION ALL
	SELECT
		DISTINCT sa.agency_simple_name,
		oi.agency_code,
		ot.product_type_name,
		ot.product_type_id,
		wo.write_off_time create_time,
		oi.contact_no contact_no,
		otsi.down_price sub_down_price,
		otsi.down_price_leave sub_down_price_leave,
		ot.id
	from
		order_truck_sell_info otsi
	left JOIN order_truck ot on
		ot.id = otsi.truck_id
	LEFT JOIN order_info oi on
		oi.id = otsi.order_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	LEFT JOIN write_off wo on
		wo.truck_id = otsi.truck_id
	LEFT JOIN write_off_detail wod on
		wod.write_off_id = wo.id
	LEFT JOIN capital_inflow ci on
		ci.id = wod.inflow_id
	where
		otsi.down_price <> 0
		and otsi.agency_code <> 'base'
		and otsi.down_price_leave = 0
		and sa.type = 1
		and sa.`status` = 0
		and wo.write_off_type = '定金'
		and ci.belong = 'base'
		and wo.write_off_time >= str_to_date('2022-06-01 00:00:00',
		'%Y-%m-%d %H:%i:%s')
		and wo.write_off_time <= str_to_date('2022-06-01 23:59:59',
		'%Y-%m-%d %H:%i:%s')
	GROUP BY
		ot.id )tmp
GROUP BY
	tmp.agency_code,
	tmp.product_type_id ;
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      4、销售订单月
SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, cm.create_time,cm.contact_no,otsi.sub_down_price,otsi.sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN contact_truck ct on ct.truck_id = ot.id left JOIN contact_manager cm on cm.id = ct.contact_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where cm.sales_target_id is not null and otsi.truck_status <> 1 and otsi.sub_down_price = 0 and cm.create_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and cm.create_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,cm.contact_no,otsi.sub_down_price,otsi.sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN contact_truck ct on ct.truck_id = ot.id left JOIN contact_manager cm on cm.id = ct.contact_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where cm.sales_target_id is not null and otsi.truck_status <> 1 and otsi.sub_down_price <> 0 and otsi.sub_down_price_leave = 0 and wo.write_off_type = '定金' and ci.belong <> 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no contact_no,otsi.down_price sub_down_price,otsi.down_price_leave sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.down_price <> 0 and otsi.agency_code <> 'base' and otsi.down_price_leave = 0 and sa.type = 1 and sa.`status` = 0 and wo.write_off_type = '定金' and ci.belong = 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      5、销售订单年
SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, cm.create_time,cm.contact_no,otsi.sub_down_price,otsi.sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN contact_truck ct on ct.truck_id = ot.id left JOIN contact_manager cm on cm.id = ct.contact_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where cm.sales_target_id is not null and otsi.truck_status <> 1 and otsi.sub_down_price = 0 and cm.create_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and cm.create_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,cm.contact_no,otsi.sub_down_price,otsi.sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN contact_truck ct on ct.truck_id = ot.id left JOIN contact_manager cm on cm.id = ct.contact_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where cm.sales_target_id is not null and otsi.truck_status <> 1 and otsi.sub_down_price <> 0 and otsi.sub_down_price_leave = 0 and wo.write_off_type = '定金' and ci.belong <> 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no contact_no,otsi.down_price sub_down_price,otsi.down_price_leave sub_down_price_leave,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.down_price <> 0 and otsi.agency_code <> 'base' and otsi.down_price_leave = 0 and sa.type = 1 and sa.`status` = 0 and wo.write_off_type = '定金' and ci.belong = 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id 
--  Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)

-- //      3、回款日 [回款]
SELECT
	DISTINCT tmp.agency_simple_name,
	tmp.agency_code,
	tmp.product_type_name,
	tmp.product_type_id,
	COUNT(tmp.id) truck_number
FROM
	(
	SELECT
		DISTINCT sa.agency_simple_name,
		oi.agency_code,
		ot.product_type_name,
		ot.product_type_id,
		wo.write_off_time create_time,
		oi.contact_no,
		otsi.sub_tail_money,
		otsi.sub_tail_money_wait_cancel,
		wo.write_off_type,
		ot.id
	from
		order_truck_sell_info otsi
	left JOIN order_truck ot on
		ot.id = otsi.truck_id
	LEFT JOIN order_info oi on
		oi.id = ot.order_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	LEFT JOIN write_off wo on
		wo.truck_id = otsi.truck_id
	LEFT JOIN write_off_detail wod on
		wod.write_off_id = wo.id
	LEFT JOIN capital_inflow ci on
		ci.id = wod.inflow_id
	where
		otsi.sub_tail_money_wait_cancel = 0
		and otsi.truck_status <> 1
		and otsi.sub_on_account = otsi.sub_on_account_cancel
		and wo.write_off_type <> '定金'
		and ci.belong <> 'base'
		and wo.write_off_time >= str_to_date('2022-06-01 00:00:00',
		'%Y-%m-%d %H:%i:%s')
		and wo.write_off_time <= str_to_date('2022-06-01 23:59:59',
		'%Y-%m-%d %H:%i:%s')
	group by
		ot.id
UNION ALL
	SELECT
		DISTINCT sa.agency_simple_name,
		oi.agency_code,
		ot.product_type_name,
		ot.product_type_id,
		wo.write_off_time create_time,
		oi.contact_no,
		otsi.tail_money,
		otsi.tail_money_wait_cancel,
		wo.write_off_type,
		ot.id
	from
		order_truck_sell_info otsi
	left JOIN order_truck ot on
		ot.id = otsi.truck_id
	LEFT JOIN order_info oi on
		oi.id = ot.order_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	LEFT JOIN write_off wo on
		wo.truck_id = otsi.truck_id
	LEFT JOIN write_off_detail wod on
		wod.write_off_id = wo.id
	LEFT JOIN capital_inflow ci on
		ci.id = wod.inflow_id
	where
		otsi.tail_money_wait_cancel = 0
		and otsi.on_account_leave = 0
		and otsi.agency_code <> 'base'
		and sa.type = 1
		and sa.`status` = 0
		and wo.write_off_type <> '定金'
		and ci.belong = 'base'
		and wo.write_off_time >= str_to_date('2022-06-01 00:00:00',
		'%Y-%m-%d %H:%i:%s')
		and wo.write_off_time <= str_to_date('2022-06-01 23:59:59',
		'%Y-%m-%d %H:%i:%s')
	GROUP BY
		ot.id )tmp
GROUP BY
	tmp.agency_code,
	tmp.product_type_id; 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      4、回款月
SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no,otsi.sub_tail_money,otsi.sub_tail_money_wait_cancel,wo.write_off_type,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.sub_tail_money_wait_cancel = 0 and otsi.truck_status <> 1 and otsi.sub_on_account = otsi.sub_on_account_cancel and wo.write_off_type <> '定金' and ci.belong <> 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no,otsi.tail_money,otsi.tail_money_wait_cancel,wo.write_off_type,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.tail_money_wait_cancel = 0 and otsi.on_account_leave = 0 and otsi.agency_code <> 'base' and sa.type = 1 and sa.`status` = 0 and wo.write_off_type <> '定金' and ci.belong = 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      5、回款年
SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no,otsi.sub_tail_money,otsi.sub_tail_money_wait_cancel,wo.write_off_type,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.sub_tail_money_wait_cancel = 0 and otsi.truck_status <> 1 and otsi.sub_on_account = otsi.sub_on_account_cancel and wo.write_off_type <> '定金' and ci.belong <> 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') group by ot.id UNION ALL SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, wo.write_off_time create_time,oi.contact_no,otsi.tail_money,otsi.tail_money_wait_cancel,wo.write_off_type,ot.id from order_truck_sell_info otsi left JOIN order_truck ot on ot.id = otsi.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo on wo.truck_id = otsi.truck_id LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where otsi.tail_money_wait_cancel = 0 and otsi.on_account_leave = 0 and otsi.agency_code <> 'base' and sa.type = 1 and sa.`status` = 0 and wo.write_off_type <> '定金' and ci.belong = 'base' and wo.write_off_time >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and wo.write_off_time <= str_to_date(?, '%Y-%m-%d %H:%i:%s') GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id 
--  Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)


-- //      3、销售票日 [销售票]
SELECT
	DISTINCT tmpp.agency_simple_name,
	tmpp.agency_code,
	tmpp.product_type_name,
	tmpp.product_type_id,
	sum(truck_number) truck_number
from
	(
	SELECT
		DISTINCT tmp.agency_simple_name,
		tmp.agency_code,
		tmp.product_type_name,
		tmp.product_type_id,
		COUNT(tmp.id) truck_number
	FROM
		(
		SELECT
			DISTINCT sa.agency_simple_name,
			oi.agency_code,
			ot.product_type_name,
			ot.product_type_id,
			strd.invoice_date,
			oi.contact_no,
			ot.id,
			strd.status
		FROM
			sales_ticket_register_detail strd
		LEFT JOIN incoming_info ii on
			ii.serial_number = strd.serial_number
		left JOIN order_truck ot on
			ot.id = ii.truck_id
		LEFT JOIN order_info oi on
			oi.id = ot.order_id
		LEFT JOIN sys_agency sa on
			sa.agency_code_ours = oi.agency_code
		WHERE
			STR_TO_DATE(strd.invoice_date,
			'%Y-%m-%d %H:%i:%s') >= str_to_date('2022-06-01 00:00:00',
			'%Y-%m-%d %H:%i:%s')
			and STR_TO_DATE(strd.invoice_date,
			'%Y-%m-%d %H:%i:%s') <= str_to_date('2022-06-01 23:59:59',
			'%Y-%m-%d %H:%i:%s')
			and strd.invoice_type <> 4
			and strd.status <> 1
		GROUP BY
			ot.id,
			strd.status,
			strd.apply_no
	UNION ALL
		-- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 
		SELECT
			DISTINCT sa.agency_simple_name,
			oi.agency_code,
			ot.product_type_name,
			ot.product_type_id,
			iad.invoice_date,
			oi.contact_no,
			ot.id,
			iad.status
		FROM
			invoice_apply_detail iad
		LEFT JOIN incoming_info ii on
			ii.serial_number = iad.serial_number
		left JOIN order_truck ot on
			ot.id = ii.truck_id
		LEFT JOIN order_info oi on
			oi.id = ot.order_id
		LEFT JOIN sys_agency sa on
			sa.agency_code_ours = oi.agency_code
		where
			(sa.type = 1
				or sa.type is null)
			and sa.`status` = 0
			and iad.invoice_type = 1
			and STR_TO_DATE(iad.invoice_date,
			'%Y-%m-%d %H:%i:%s') >= str_to_date('2022-06-01 00:00:00',
			'%Y-%m-%d %H:%i:%s')
			and STR_TO_DATE(iad.invoice_date,
			'%Y-%m-%d %H:%i:%s') <= str_to_date('2022-06-01 23:59:59',
			'%Y-%m-%d %H:%i:%s')
			and iad.invoice_type <> 4
			and iad.status <> 1
		GROUP BY
			ot.id,
			iad.status,
			iad.apply_no )tmp
	GROUP BY
		tmp.agency_code,
		tmp.product_type_id,
		tmp.status ) tmpp
GROUP BY
	tmpp.agency_code,
	tmpp.product_type_id
-- Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      4、销售票月
SELECT DISTINCT tmpp.agency_simple_name,tmpp.agency_code,tmpp.product_type_name,tmpp.product_type_id,sum(truck_number) truck_number from ( SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, strd.invoice_date,oi.contact_no,ot.id,strd.status FROM sales_ticket_register_detail strd LEFT JOIN incoming_info ii on ii.serial_number = strd.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and strd.invoice_type <> 4 and strd.status <> 1 GROUP BY ot.id,strd.status,strd.apply_no UNION ALL -- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, iad.invoice_date,oi.contact_no,ot.id,iad.status FROM invoice_apply_detail iad LEFT JOIN incoming_info ii on ii.serial_number = iad.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where (sa.type = 1 or sa.type is null) and sa.`status` = 0 and iad.invoice_type = 1 and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and iad.invoice_type <> 4 and iad.status <> 1 GROUP BY ot.id,iad.status,iad.apply_no )tmp GROUP BY tmp.agency_code,tmp.product_type_id,tmp.status ) tmpp GROUP BY tmpp.agency_code,tmpp.product_type_id 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      5、销售票年
SELECT DISTINCT tmpp.agency_simple_name,tmpp.agency_code,tmpp.product_type_name,tmpp.product_type_id,sum(truck_number) truck_number from ( SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, strd.invoice_date,oi.contact_no,ot.id,strd.status FROM sales_ticket_register_detail strd LEFT JOIN incoming_info ii on ii.serial_number = strd.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and strd.invoice_type <> 4 and strd.status <> 1 GROUP BY ot.id,strd.status,strd.apply_no UNION ALL -- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, iad.invoice_date,oi.contact_no,ot.id,iad.status FROM invoice_apply_detail iad LEFT JOIN incoming_info ii on ii.serial_number = iad.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where (sa.type = 1 or sa.type is null) and sa.`status` = 0 and iad.invoice_type = 1 and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and iad.invoice_type <> 4 and iad.status <> 1 GROUP BY ot.id,iad.status,iad.apply_no )tmp GROUP BY tmp.agency_code,tmp.product_type_id,tmp.status ) tmpp GROUP BY tmpp.agency_code,tmpp.product_type_id 
-- Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)
<==      Total: 21

-- //        销售红字发票 [销售票]
-- //      3、销售票日
SELECT DISTINCT tmpp.agency_simple_name,tmpp.agency_code,tmpp.product_type_name,tmpp.product_type_id,sum(truck_number) truck_number from ( SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, strd.invoice_date,oi.contact_no,ot.id,strd.status FROM sales_ticket_register_detail strd LEFT JOIN incoming_info ii on ii.serial_number = strd.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and strd.invoice_type = 4 and strd.status <> 1 GROUP BY ot.id,strd.status,strd.apply_no UNION ALL -- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, iad.invoice_date,oi.contact_no,ot.id,iad.status FROM invoice_apply_detail iad LEFT JOIN incoming_info ii on ii.serial_number = iad.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where (sa.type = 1 or sa.type is null) and sa.`status` = 0 and iad.invoice_type = 1 and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and iad.invoice_type = 4 and iad.status <> 1 GROUP BY ot.id,iad.status,iad.apply_no )tmp GROUP BY tmp.agency_code,tmp.product_type_id,tmp.status ) tmpp GROUP BY tmpp.agency_code,tmpp.product_type_id 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      4、销售票月
SELECT DISTINCT tmpp.agency_simple_name,tmpp.agency_code,tmpp.product_type_name,tmpp.product_type_id,sum(truck_number) truck_number from ( SELECT DISTINCT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number FROM ( SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, strd.invoice_date,oi.contact_no,ot.id,strd.status FROM sales_ticket_register_detail strd LEFT JOIN incoming_info ii on ii.serial_number = strd.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(strd.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and strd.invoice_type = 4 and strd.status <> 1 GROUP BY ot.id,strd.status,strd.apply_no UNION ALL -- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 SELECT DISTINCT sa.agency_simple_name,oi.agency_code,ot.product_type_name,ot.product_type_id, iad.invoice_date,oi.contact_no,ot.id,iad.status FROM invoice_apply_detail iad LEFT JOIN incoming_info ii on ii.serial_number = iad.serial_number left JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code where (sa.type = 1 or sa.type is null) and sa.`status` = 0 and iad.invoice_type = 1 and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') >= str_to_date(?, '%Y-%m-%d %H:%i:%s') and STR_TO_DATE(iad.invoice_date,'%Y-%m-%d %H:%i:%s') <= str_to_date(?, '%Y-%m-%d %H:%i:%s') and iad.invoice_type = 4 and iad.status <> 1 GROUP BY ot.id,iad.status,iad.apply_no )tmp GROUP BY tmp.agency_code,tmp.product_type_id,tmp.status ) tmpp GROUP BY tmpp.agency_code,tmpp.product_type_id 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- //      5、销售票年
SELECT
	DISTINCT tmpp.agency_simple_name,
	tmpp.agency_code,
	tmpp.product_type_name,
	tmpp.product_type_id,
	sum(truck_number) truck_number
from
	(
	SELECT
		DISTINCT tmp.agency_simple_name,
		tmp.agency_code,
		tmp.product_type_name,
		tmp.product_type_id,
		COUNT(tmp.id) truck_number
	FROM
		(
		SELECT
			DISTINCT sa.agency_simple_name,
			oi.agency_code,
			ot.product_type_name,
			ot.product_type_id,
			strd.invoice_date,
			oi.contact_no,
			ot.id,
			strd.status
		FROM
			sales_ticket_register_detail strd
		LEFT JOIN incoming_info ii on
			ii.serial_number = strd.serial_number
		left JOIN order_truck ot on
			ot.id = ii.truck_id
		LEFT JOIN order_info oi on
			oi.id = ot.order_id
		LEFT JOIN sys_agency sa on
			sa.agency_code_ours = oi.agency_code
		WHERE
			STR_TO_DATE(strd.invoice_date,
			'%Y-%m-%d %H:%i:%s') >= str_to_date('2022-01-01 00:00:00',
			'%Y-%m-%d %H:%i:%s')
			and STR_TO_DATE(strd.invoice_date,
			'%Y-%m-%d %H:%i:%s') <= str_to_date('2022-06-01 23:59:59',
			'%Y-%m-%d %H:%i:%s')
			and strd.invoice_type = 4
			and strd.status <> 1
		GROUP BY
			ot.id,
			strd.status,
			strd.apply_no
	UNION ALL
		-- 河南骏通和山东办事处登记正常销售,计正数；无暂估发票 
		SELECT
			DISTINCT sa.agency_simple_name,
			oi.agency_code,
			ot.product_type_name,
			ot.product_type_id,
			iad.invoice_date,
			oi.contact_no,
			ot.id,
			iad.status
		FROM
			invoice_apply_detail iad
		LEFT JOIN incoming_info ii on
			ii.serial_number = iad.serial_number
		left JOIN order_truck ot on
			ot.id = ii.truck_id
		LEFT JOIN order_info oi on
			oi.id = ot.order_id
		LEFT JOIN sys_agency sa on
			sa.agency_code_ours = oi.agency_code
		where
			(sa.type = 1
				or sa.type is null)
			and sa.`status` = 0
			and iad.invoice_type = 1
			and STR_TO_DATE(iad.invoice_date,
			'%Y-%m-%d %H:%i:%s') >= str_to_date('2022-01-01 00:00:00',
			'%Y-%m-%d %H:%i:%s')
			and STR_TO_DATE(iad.invoice_date,
			'%Y-%m-%d %H:%i:%s') <= str_to_date('2022-06-01 23:59:59',
			'%Y-%m-%d %H:%i:%s')
			and iad.invoice_type = 4
			and iad.status <> 1
		GROUP BY
			ot.id,
			iad.status,
			iad.apply_no )tmp
	GROUP BY
		tmp.agency_code,
		tmp.product_type_id,
		tmp.status ) tmpp
GROUP BY
	tmpp.agency_code,
	tmpp.product_type_id;
-- Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String), 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)



-- //      5、厂内库存
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name,ot.product_type_id,ot.id from order_truck ot LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where ot.`status` in ( 2 ) ) tmp GROUP BY tmp.agency_code,tmp.product_type_id; 
-- Parameters: 2(Integer)
-- //      5、在途库存
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name,ot.product_type_id,ot.id from order_truck ot LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where ot.`status` in ( 3 , 4 , 5 ) ) tmp GROUP BY tmp.agency_code,tmp.product_type_id 
-- Parameters: 3(Integer), 4(Integer), 5(Integer)
-- //      5、在制车
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name,ot.product_type_id,ot.id from order_truck ot LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where ot.`status` in ( 1 ) ) tmp GROUP BY tmp.agency_code,tmp.product_type_id; 
--  Parameters: 1(Integer)

-- //      渠道库存区间 [渠道库存]
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name, ot.product_type_id, ot.id, max(ri.real_send_time) real_send_time FROM order_truck ot LEFT JOIN repertory_info ri on ri.truck_id = ot.id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where (ot.`status` = 6 or ot.`status` = 61) GROUP BY ot.id ) tmp WHERE DATE_SUB(STR_TO_DATE('2022-06-01 23:59:59','%Y-%m-%d'), INTERVAL 30 DAY) < str_to_date(tmp.real_send_time,'%Y-%m-%d') GROUP BY tmp.agency_code,tmp.product_type_id ;
-- arameters: 2022-06-01 23:59:59(String), 30(Integer)
SELECT
	tmp.agency_simple_name,
	tmp.agency_code,
	tmp.product_type_name,
	tmp.product_type_id,
	COUNT(tmp.id) truck_number
from
	(
	SELECT
		(CASE vb.vehicle_belong is null
		when TRUE THEN oi.agency_code
		ELSE vb.vehicle_belong
	END) agency_code,
		(CASE vb.vehicle_belong is null
		when TRUE THEN sa.agency_simple_name
		ELSE sa2.agency_simple_name
	END) agency_simple_name,
		ot.product_type_name,
		ot.product_type_id,
		ot.id,
		max(ri.real_send_time) real_send_time
	FROM
		order_truck ot
	LEFT JOIN repertory_info ri on
		ri.truck_id = ot.id
	LEFT JOIN order_info oi on
		oi.id = ot.order_id
	LEFT JOIN sys_agency sa on
		sa.agency_code_ours = oi.agency_code
	left join vehicle_belong vb on
		vb.vehicle_no = ot.id
	LEFT JOIN sys_agency sa2 on
		sa2.agency_code_ours = vb.vehicle_belong
	where
		(ot.`status` = 6
			or ot.`status` = 61)
	GROUP BY
		ot.id ) tmp
WHERE
	DATE_SUB(STR_TO_DATE('2022-06-01 23:59:59', '%Y-%m-%d'), INTERVAL 60 DAY) < str_to_date(tmp.real_send_time,
	'%Y-%m-%d')
	and DATE_SUB(STR_TO_DATE('2022-06-01 23:59:59', '%Y-%m-%d'), INTERVAL 30 DAY) >= str_to_date(tmp.real_send_time,
	'%Y-%m-%d')
GROUP BY
	tmp.agency_code,
	tmp.product_type_id ;
-- Parameters: 2022-06-01 23:59:59(String), 60(Integer), 2022-06-01 23:59:59(String), 30(Integer)
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name, ot.product_type_id, ot.id, max(ri.real_send_time) real_send_time FROM order_truck ot LEFT JOIN repertory_info ri on ri.truck_id = ot.id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where (ot.`status` = 6 or ot.`status` = 61) GROUP BY ot.id ) tmp WHERE DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) < str_to_date(tmp.real_send_time,'%Y-%m-%d') and DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) >= str_to_date(tmp.real_send_time,'%Y-%m-%d') GROUP BY tmp.agency_code,tmp.product_type_id 
-- Parameters: 2022-06-01 23:59:59(String), 90(Integer), 2022-06-01 23:59:59(String), 60(Integer)
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name, ot.product_type_id, ot.id, max(ri.real_send_time) real_send_time FROM order_truck ot LEFT JOIN repertory_info ri on ri.truck_id = ot.id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where (ot.`status` = 6 or ot.`status` = 61) GROUP BY ot.id ) tmp WHERE DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) < str_to_date(tmp.real_send_time,'%Y-%m-%d') and DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) >= str_to_date(tmp.real_send_time,'%Y-%m-%d') GROUP BY tmp.agency_code,tmp.product_type_id 
-- Parameters: 2022-06-01 23:59:59(String), 120(Integer), 2022-06-01 23:59:59(String), 90(Integer)
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name, ot.product_type_id, ot.id, max(ri.real_send_time) real_send_time FROM order_truck ot LEFT JOIN repertory_info ri on ri.truck_id = ot.id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where (ot.`status` = 6 or ot.`status` = 61) GROUP BY ot.id ) tmp WHERE DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) < str_to_date(tmp.real_send_time,'%Y-%m-%d') and DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) >= str_to_date(tmp.real_send_time,'%Y-%m-%d') GROUP BY tmp.agency_code,tmp.product_type_id 
-- Parameters: 2022-06-01 23:59:59(String), 180(Integer), 2022-06-01 23:59:59(String), 120(Integer)
SELECT tmp.agency_simple_name,tmp.agency_code,tmp.product_type_name,tmp.product_type_id,COUNT(tmp.id) truck_number from ( SELECT (CASE vb.vehicle_belong is null when TRUE THEN oi.agency_code ELSE vb.vehicle_belong END) agency_code, (CASE vb.vehicle_belong is null when TRUE THEN sa.agency_simple_name ELSE sa2.agency_simple_name END) agency_simple_name, ot.product_type_name, ot.product_type_id, ot.id, max(ri.real_send_time) real_send_time FROM order_truck ot LEFT JOIN repertory_info ri on ri.truck_id = ot.id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code left join vehicle_belong vb on vb.vehicle_no = ot.id LEFT JOIN sys_agency sa2 on sa2.agency_code_ours = vb.vehicle_belong where (ot.`status` = 6 or ot.`status` = 61) GROUP BY ot.id ) tmp WHERE DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d'), INTERVAL ? DAY) >= str_to_date(tmp.real_send_time,'%Y-%m-%d') GROUP BY tmp.agency_code,tmp.product_type_id 
-- Parameters: 2022-06-01 23:59:59(String), 180(Integer)


-- ////      6、调拨日 调入 [调拨日]
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_in_code WHERE oi.create_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id; 
-- Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- ////      6、调拨月 调入
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_in_code WHERE oi.create_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id; 
-- Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- ////      6、调拨年 调入
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_in_code WHERE oi.create_time >= str_to_date('2022-01-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id;
-- Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)


-- ////      6、调拨日 调出 [调拨日]
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_out_code WHERE oi.create_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id; 
-- Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- ////      6、调拨月 调出
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_out_code WHERE oi.create_time >= str_to_date('2022-06-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id; 
--  Parameters: 2022-06-01 00:00:00(String), 2022-06-01 23:59:59(String)
-- ////      6、调拨年 调出
SELECT sa.agency_simple_name,sa.agency_code_ours agency_code,ot.product_type_name,ot.product_type_id,COUNT(ot.id) truck_number FROM allot_truck alt left JOIN allot_info ai on ai.id = alt.allot_id LEFT JOIN order_info oi on oi.submission_no = ai.allot_in_submission_no LEFT JOIN order_truck ot on ot.id= alt.truck_id LEFT JOIN sys_agency sa on sa.agency_code_ours = ai.allot_out_code WHERE oi.create_time >= str_to_date('2022-01-01 00:00:00', '%Y-%m-%d %H:%i:%s') and oi.create_time <= str_to_date('2022-06-01 23:59:59', '%Y-%m-%d %H:%i:%s') and ai.status="1" GROUP BY sa.agency_code_ours,ot.product_type_id; 
-- Parameters: 2022-01-01 00:00:00(String), 2022-06-01 23:59:59(String)

insert into report_auto_day_inventory(product_type_id, product_type, agency_code, agency_name, buy_day, buy_month, buy_year, sales_day, sales_month, sales_year, pay_day, pay_month, pay_year, sales_ticket_day, sales_ticket_month, sales_ticket_year, inventory, inventory_on_way, low_thirty, low_sixty, low_ninty, low_hundred_twenty, low_others, inventory_on_sub, inventory_total, in_produce, remark, submit_user_name, create_user, create_time, transfer_day, transfer_month, transfer_year, low_half_year ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) , ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) 
-- Parameters: 31(Long), 陕重汽(String), base(String), 上海远行(String), 0(Integer), 0(Integer), 10(Integer), 0(Integer), 0(Integer), 10(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 10(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 33(Long), 挂车(String), base(String), 上海远行(String), 0(Integer), 0(Integer), 88(Integer), 0(Integer), 0(Integer), 88(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 88(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 60(Long), 北奔(String), base(String), 上海远行(String), 0(Integer), 0(Integer), 12(Integer), 0(Integer), 0(Integer), 8(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 8(Integer), 4(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 4(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20190619154208925923(String), 远行物流(String), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 30(Integer), 0(Integer), 0(Integer), 38(Integer), 0(Integer), 0(Integer), 30(Integer), 200(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 223(Integer), 3(Integer), 226(Integer), 426(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 35(Long), 国5-康机(String), 20190619154208925923(String), 远行物流(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 2(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20190724162907561293(String), 新疆远行(String), 0(Integer), 0(Integer), 41(Integer), 0(Integer), 0(Integer), 27(Integer), 0(Integer), 0(Integer), 37(Integer), 0(Integer), 0(Integer), 27(Integer), 0(Integer), 0(Integer), 35(Integer), 0(Integer), 0(Integer), 0(Integer), 87(Integer), 122(Integer), 122(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20190724162907561293(String), 新疆远行(String), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 24(Integer), 0(Integer), 0(Integer), 12(Integer), 0(Integer), 0(Integer), 20(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 23(Integer), 24(Integer), 24(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 33(Long), 挂车(String), 20190724162907561293(String), 新疆远行(String), 0(Integer), 0(Integer), 12(Integer), 0(Integer), 0(Integer), 12(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 12(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 35(Long), 国5-康机(String), 20190724162907561293(String), 新疆远行(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 17(Integer), 0(Integer), 0(Integer), 17(Integer), 0(Integer), 0(Integer), 17(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 102(Integer), 102(Integer), 102(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 33(Long), 挂车(String), 20190730184136956746(String), 内蒙远行(String), 0(Integer), 0(Integer), 99(Integer), 0(Integer), 0(Integer), 99(Integer), 0(Integer), 0(Integer), 57(Integer), 0(Integer), 0(Integer), 99(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 34(Long), 国5-常规(String), 20190730184136956746(String), 内蒙远行(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 11(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 59(Long), 红岩(String), 20190730184136956746(String), 内蒙远行(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 11(Integer), 0(Integer), 0(Integer), 15(Integer), 0(Integer), 0(Integer), 10(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 3(Integer), 3(Integer), 3(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 29(Long), 电动车(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 34(Integer), 1(Integer), 1(Integer), 33(Integer), 0(Integer), 0(Integer), 26(Integer), 1(Integer), 1(Integer), 33(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Integer), 1(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 31(Long), 陕重汽(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 34(Long), 国5-常规(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 48(Integer), 0(Integer), 0(Integer), 11(Integer), 0(Integer), 0(Integer), 48(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 57(Integer), 57(Integer), 57(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 35(Long), 国5-康机(String), 20190730184345661796(String), 河南德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 8(Integer), 0(Integer), 0(Integer), 2(Integer), 0(Integer), 0(Integer), 8(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 16(Integer), 16(Integer), 16(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20190730184526325982(String), 山西德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 5(Integer), 0(Integer), 0(Integer), 3(Integer), 7(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 35(Integer), 35(Integer), 42(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20190730184702579901(String), 北京德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 4(Integer), 0(Integer), 0(Integer), 4(Integer), 0(Integer), 0(Integer), 4(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 6(Integer), 6(Integer), 6(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 29(Long), 电动车(String), 20190730184702579901(String), 北京德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 3(Integer), 3(Integer), 3(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20190730184702579901(String), 北京德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 11(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 12(Integer), 12(Integer), 12(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 31(Long), 陕重汽(String), 20190730184702579901(String), 北京德银(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20190730184852711095(String), 陕西中富(String), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 44(Integer), 44(Integer), 44(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 29(Long), 电动车(String), 20190730184852711095(String), 陕西中富(String), 0(Integer), 0(Integer), 9(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 6(Integer), 0(Integer), 0(Integer), 3(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 3(Integer), 3(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20190730184852711095(String), 陕西中富(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 33(Integer), 33(Integer), 33(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20191011164728815407(String), 河南骏通(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 4(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Long), 康明斯产品(String), 20200603112814779687(String), 陕西远行(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 1(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 7(Integer), 7(Integer), 7(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 30(Long), 常规车(String), 20200603112814779687(String), 陕西远行(String), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 7(Integer), 0(Integer), 0(Integer), 10(Integer), 0(Integer), 0(Integer), 7(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 0(Integer), 16(Integer), 16(Integer), 16(Integer), 0(Integer), null, null, null, 2022-06-01 00:01:10.0(Timestamp), 0(Integer), 0(Integer), 0(Integer), 0(Integer)
-- Updates: 29

URI_E_20220606104028232: /reportDayAutoInventory/auto, time: 1030656, 
	|--reponse: {"code":0,"success":true} 
```



### 03 车辆明细报表
- http://127.0.0.1:8081/report/detail
```
URI_S_20220531200705913: /report/detail,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT count(0) FROM (SELECT sya.agency_simple_name agency_name, sya.agency_code_ours agency_code, ot.product_type_id, ot.product_type_name, ot.`name`, ot.truck_type_name, ot.truck_type_id, ot.public_type, ot.truck_code, ot.remark, ot.`status`, ot.truck_national, ii.vin, ii.serial_number, oi.submission_type, oi.order_strategy, oi.contact_no, oi.contract_price, oi.submission_no, cad.v_color, cad.issue_date, otsi.down_price_leave, otsi.sub_down_price_leave, ri.real_send_time, CONCAT(ot.version, ot.market_type, ot.market_type, ot.engine_type, ot.horsepower, ot.wheel_base, ot.cab_type, ot.speed_changing_box, ot.frame, ot.front_axle, ot.behand_axle, ot.front_spring, ot.behand_spring, ot.fuel_tank, ot.tyre_type) choose_config, DATEDIFF(DATE_FORMAT(NOW(), '%Y-%m-%d'), STR_TO_DATE(ri.real_send_time, '%Y-%m-%d')) inventory_date, rf.address, CASE sya.type WHEN "1" THEN iad.invoice_money ELSE strd.invoice_money END invoice_money, CASE sya.type WHEN "1" THEN iad.invoice_date ELSE strd.invoice_date END invoice_date FROM order_truck ot LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ot.id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN planning_info pif ON pif.truck_id = ot.id LEFT JOIN certificate_apply_detail cad ON cad.truck_id = ot.id LEFT JOIN sys_agency sya ON sya.agency_code_ours = oi.agency_code LEFT JOIN repertory_info ri ON ri.truck_id = ot.id LEFT JOIN receive_info rf ON rf.id = ri.receive_id LEFT JOIN (SELECT serial_number, min(invoice_date) invoice_date, SUM(invoice_money) invoice_money, SUM(invoice_notax_money) invoice_notax_money FROM invoice_apply_detail WHERE status != 1 GROUP BY serial_number) iad ON iad.serial_number = ii.serial_number LEFT JOIN (SELECT serial_number, min(invoice_date) invoice_date, SUM(invoice_money) invoice_money, SUM(invoice_notax_money) invoice_notax_money FROM sales_ticket_register_detail WHERE status != 1 GROUP BY serial_number) strd ON strd.serial_number = ii.serial_number WHERE otsi.order_id = oi.id AND (ri.`status` = 0 OR ri.`status` = 2 OR ri.`status` IS NULL) GROUP BY ot.id, oi.id, ri.id, rf.id) table_count 
==> Parameters: 
slow sql 333 millis. SELECT count(0) FROM (SELECT sya.agency_simple_name agency_name, sya.agency_code_ours agency_code, ot.product_type_id, ot.product_type_name, ot.`name`, ot.truck_type_name, ot.truck_type_id, ot.public_type, ot.truck_code, ot.remark, ot.`status`, ot.truck_national, ii.vin, ii.serial_number, oi.submission_type, oi.order_strategy, oi.contact_no, oi.contract_price, oi.submission_no, cad.v_color, cad.issue_date, otsi.down_price_leave, otsi.sub_down_price_leave, ri.real_send_time, CONCAT(ot.version, ot.market_type, ot.market_type, ot.engine_type, ot.horsepower, ot.wheel_base, ot.cab_type, ot.speed_changing_box, ot.frame, ot.front_axle, ot.behand_axle, ot.front_spring, ot.behand_spring, ot.fuel_tank, ot.tyre_type) choose_config, DATEDIFF(DATE_FORMAT(NOW(), '%Y-%m-%d'), STR_TO_DATE(ri.real_send_time, '%Y-%m-%d')) inventory_date, rf.address, CASE sya.type WHEN "1" THEN iad.invoice_money ELSE strd.invoice_money END invoice_money, CASE sya.type WHEN "1" THEN iad.invoice_date ELSE strd.invoice_date END invoice_date FROM order_truck ot LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ot.id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN planning_info pif ON pif.truck_id = ot.id LEFT JOIN certificate_apply_detail cad ON cad.truck_id = ot.id LEFT JOIN sys_agency sya ON sya.agency_code_ours = oi.agency_code LEFT JOIN repertory_info ri ON ri.truck_id = ot.id LEFT JOIN receive_info rf ON rf.id = ri.receive_id LEFT JOIN (SELECT serial_number, min(invoice_date) invoice_date, SUM(invoice_money) invoice_money, SUM(invoice_notax_money) invoice_notax_money FROM invoice_apply_detail WHERE status != 1 GROUP BY serial_number) iad ON iad.serial_number = ii.serial_number LEFT JOIN (SELECT serial_number, min(invoice_date) invoice_date, SUM(invoice_money) invoice_money, SUM(invoice_notax_money) invoice_notax_money FROM sales_ticket_register_detail WHERE status != 1 GROUP BY serial_number) strd ON strd.serial_number = ii.serial_number WHERE otsi.order_id = oi.id AND (ri.`status` = 0 OR ri.`status` = 2 OR ri.`status` IS NULL) GROUP BY ot.id, oi.id, ri.id, rf.id) table_count[]
<==      Total: 1
==>  Preparing: SELECT sya.agency_simple_name agency_name, sya.agency_code_ours agency_code, ot.product_type_id, ot.product_type_name, ot.`name`, ot.truck_type_name, ot.truck_type_id, ot.public_type, ot.truck_code, ot.remark, ot.`status`, ot.truck_national, ii.vin, ii.serial_number, oi.submission_type, oi.order_strategy, oi.contact_no, oi.contract_price, oi.submission_no, cad.v_color, cad.issue_date, otsi.down_price_leave, otsi.sub_down_price_leave, ri.real_send_time, CONCAT(ot.version,ot.market_type,ot.market_type,ot.engine_type, ot.horsepower,ot.wheel_base,ot.cab_type,ot.speed_changing_box,ot.frame, ot.front_axle, ot.behand_axle, ot.front_spring, ot.behand_spring, ot.fuel_tank, ot.tyre_type ) choose_config, DATEDIFF( DATE_FORMAT(NOW(), '%Y-%m-%d'), STR_TO_DATE( ri.real_send_time, '%Y-%m-%d' ) ) inventory_date, rf.address, CASE sya.type WHEN "1" THEN iad.invoice_money ELSE strd.invoice_money END invoice_money, CASE sya.type WHEN "1" THEN iad.invoice_date ELSE strd.invoice_date END invoice_date -- SUM(iad.invoice_money) invoice_money, -- iad.invoice_date FROM order_truck ot LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ot.id LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN planning_info pif ON pif.truck_id = ot.id LEFT JOIN certificate_apply_detail cad ON cad.truck_id = ot.id LEFT JOIN sys_agency sya ON sya.agency_code_ours = oi.agency_code LEFT JOIN repertory_info ri ON ri.truck_id = ot.id LEFT JOIN receive_info rf ON rf.id = ri.receive_id LEFT JOIN (SELECT serial_number,min(invoice_date) invoice_date,SUM(invoice_money) invoice_money,SUM(invoice_notax_money) invoice_notax_money from invoice_apply_detail where status != 1 GROUP BY serial_number) iad ON iad.serial_number = ii.serial_number LEFT JOIN (SELECT serial_number,min(invoice_date) invoice_date,SUM(invoice_money) invoice_money,SUM(invoice_notax_money) invoice_notax_money from sales_ticket_register_detail where status != 1 GROUP BY serial_number) strd ON strd.serial_number = ii.serial_number WHERE otsi.order_id = oi.id and (ri.`status`=0 or ri.`status` = 2 or ri.`status` is null) GROUP BY ot.id,oi.id,ri.id,rf.id ORDER BY oi.create_time desc,ri.real_send_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
slow sql 270 millis. SELECT
            sya.agency_simple_name agency_name,
            sya.agency_code_ours agency_code,
            ot.product_type_id,
            ot.product_type_name,
            ot.`name`,
            ot.truck_type_name,
            ot.truck_type_id,
            ot.public_type,
            ot.truck_code,
            ot.remark,
            ot.`status`,
               ot.truck_national,

            ii.vin,
            ii.serial_number,
            oi.submission_type,
            oi.order_strategy,
            oi.contact_no,
            oi.contract_price,
            oi.submission_no,
            cad.v_color,
            cad.issue_date,
            otsi.down_price_leave,
            otsi.sub_down_price_leave,
            ri.real_send_time,
            CONCAT(ot.version,ot.market_type,ot.market_type,ot.engine_type,
                ot.horsepower,ot.wheel_base,ot.cab_type,ot.speed_changing_box,ot.frame,
        ot.front_axle,
        ot.behand_axle,
        ot.front_spring,
        ot.behand_spring,
        ot.fuel_tank,
        ot.tyre_type
                ) choose_config,
            DATEDIFF(
                DATE_FORMAT(NOW(), '%Y-%m-%d'),
                STR_TO_DATE(
                    ri.real_send_time,
                    '%Y-%m-%d'
                )
            ) inventory_date,
            rf.address,
            CASE sya.type
                WHEN "1" THEN
                iad.invoice_money
                ELSE
                strd.invoice_money
                END invoice_money,
            CASE sya.type
                WHEN "1" THEN
        iad.invoice_date
                ELSE
        strd.invoice_date
                END invoice_date
--             SUM(iad.invoice_money) invoice_money,
--             iad.invoice_date
        FROM
            order_truck ot
        LEFT JOIN order_info oi ON oi.id = ot.order_id
        LEFT JOIN order_truck_sell_info otsi ON otsi.truck_id = ot.id
        LEFT JOIN incoming_info ii ON ii.truck_id = ot.id
        LEFT JOIN planning_info pif ON pif.truck_id = ot.id
        LEFT JOIN certificate_apply_detail cad ON cad.truck_id = ot.id
        LEFT JOIN sys_agency sya ON sya.agency_code_ours = oi.agency_code
        LEFT JOIN repertory_info ri ON ri.truck_id = ot.id
        LEFT JOIN receive_info rf ON rf.id = ri.receive_id
        LEFT JOIN (SELECT serial_number,min(invoice_date) invoice_date,SUM(invoice_money) invoice_money,SUM(invoice_notax_money) invoice_notax_money from invoice_apply_detail where status != 1 GROUP BY serial_number) iad ON iad.serial_number = ii.serial_number
        LEFT JOIN (SELECT serial_number,min(invoice_date) invoice_date,SUM(invoice_money) invoice_money,SUM(invoice_notax_money) invoice_notax_money from sales_ticket_register_detail where status != 1 GROUP BY serial_number) strd ON strd.serial_number = ii.serial_number

        







         WHERE  otsi.order_id = oi.id
            and (ri.`status`=0 or  ri.`status` = 2 or ri.`status` is null) 
        GROUP BY
        ot.id,oi.id,ri.id,rf.id
        ORDER BY
            oi.create_time desc,ri.real_send_time desc limit ?,?[0,10]
<==      Total: 10
URI_E_20220531200705913: /report/detail, time: 2725, 
	|--reponse: "report/report_truck_detail" 

```
### 04 业务财务流转报表
- http://127.0.0.1:8081/report/truck
```
URI_S_20220531200832196: /report/truck,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: SELECT count(0) FROM order_truck t LEFT JOIN order_info o ON o.id = t.order_id LEFT JOIN order_truck_sell_info s ON s.truck_id = t.id LEFT JOIN incoming_info i ON i.truck_id = t.id LEFT JOIN sys_agency sa ON sa.agency_code_ours = o.agency_code 
==> Parameters: 
<==      Total: 1
==>  Preparing: select t.id, t.order_id, t.name, t.product_type_name, t.product_type_id, t.platet_type_name, t.platet_type_id, t.truck_code, t.version, t.market_type, t.truck_type_name, t.truck_type_id, t.public_type, t.engine_type, t.horsepower, t.wheel_base, t.cab_type, t.speed_changing_box, t.frame, t.front_axle, t.behand_axle, t.front_spring, t.behand_spring, t.fuel_tank, t.tyre_type, t.status, t.create_user, t.create_date, t.update_user, t.update_data, t.remark, s.single_price, s.down_price, s.down_price_cancel, s.down_price_leave, s.tail_money, s.tail_money_wait_cancel, s.tail_money_cancel, s.is_on_account, on_account_leave, s.on_account_cancel, s.logistics_status, s.others, i.vin, i.serial_number, i.engine_number, o.submission_no, o.contact_no, o.order_no, o.submit_client,sa.address,sa.agency_simple_name from order_truck t left join order_info o on o.id = t.order_id left join order_truck_sell_info s on s.truck_id = t.id left join incoming_info i on i.truck_id = t.id left join sys_agency sa on sa.agency_code_ours = o.agency_code ORDER BY t.create_date DESC limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531200832196: /report/truck, time: 150, 
	|--reponse: "report/report_truck" 

```
#### 查看流转单
1. http://127.0.0.1:8081/api/wexp/bf?truckId=11363
	- com.clgg.modules.api.controller.WordExportController#businessFlowExport

```
-- 获取流单订单信息 oi.submission_no提报单号 T20220511001
select DISTINCT oi.id, oi.submission_id, oi.submission_no, oi.order_no, oi.contact_no,oi.numbers, oi.contract_price, oi.single_price, oi.total_price, (SELECT manufactor_contact_no FROM planning_info WHERE truck_id = 11363) AS manufactor_contact_no, (SELECT manufactor_name FROM planning_info WHERE truck_id = 11363) AS manufactor_name, oi.down_price, oi.down_price_cancel, oi.down_price_leave, oi.final_payment_contract, oi.final_payment, oi.final_payment_leave, oi.final_payment_credit, oi.status, oi.product_type_name, oi.product_type_id, oi.platet_type_name, oi.platet_type_id, oi.truck_code, oi.truck_type_name, oi.truck_type_id, oi.public_type, oi.submit_client, oi.work_flow_node, oi.agency_code, oi.current_step, oi.current_check_user, oi.basic_config_name, oi.submit_time, oi.create_time,sm.submission_type,oi.order_strategy from order_info oi left join submission sm on sm.submission_no = oi.submission_no left join allot_info ai on ai.apply_no = oi.submission_no left join order_truck ot on ot.order_id = oi.id WHERE ot.id = 11363 order by oi.create_time desc,oi.order_no desc; 
-- Parameters: 11363(Long), 11363(Long), 11363(Long)

-- 获取销售合同签署经办人 sa.agency_code_ours 客户的唯一编码，内部系统使用 20190730184345661796
select st.id, st.record_no, st.approval_step_id, st.approval_name_id, st.approval_time, st.role_code, st.approval_type, st.table_id, st.approval_status, st.remark, aps.step_name, sa.type, sa.agency_code_ours, su.account, sr.role_name from approval_step_record st left join approval_step aps on aps.id = st.approval_step_id left join approval_name an on an.id = st.approval_name_id left join sys_agency sa on sa.agency_code_ours = an.agency_code left join sys_user su on su.id = st.role_code left join sys_role_user sru on sru.user_id = st.role_code left join sys_role sr on sr.id = sru.role_id where st.record_no = 'T20220511001' order by st.approval_time asc ;
-- Parameters: T20220511001(String)

-- 未确保客户名称准确，此处进行实时客户名称查询
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency where agency_code_ours = '20190730184345661796';
-- 20190730184345661796(String)

-- 查询车辆信息
SELECT t.id, t.order_id AS orderId, t. NAME, t.product_type_name AS productTypeName, t.product_type_id AS productTypeId, t.platet_type_name AS platetTypeName, t.platet_type_id AS platetTypeId, t.truck_code AS truckCode, t.version, t.market_type AS marketType, t.truck_type_name AS truckTypeName, t.truck_type_id AS truckTypeId, t.public_type AS publicType, t. STATUS, t.remark, s.single_price AS singlePrice, s.down_price AS downPrice, s.down_price_cancel AS downPriceCancel, s.down_price_leave AS downPriceLeave, s.tail_money AS tailMoney, s.tail_money_wait_cancel AS tailMoneyWaitCancel, s.tail_money_cancel AS tailMoneyCancel, s.is_on_account AS isOnAccount, s.on_account_leave AS onAccountLeave, s.on_account_cancel AS onAccountCancel, s.logistics_status AS logisticsStatus, s.others, ii.incoming_time AS incomingTime, ii.serial_number AS serialNumber, ii.vin, ii.engine_number AS engineNumber, pi.plan_time AS planTime, oi.contact_no AS contactNo, oi.order_no AS orderNo, oi.submission_no AS submissionNo, oi.submission_type AS submissionType, oi.submit_client AS submitClient, s.truck_id AS truckId FROM order_truck t LEFT JOIN order_truck_sell_info s ON s.truck_id = t.id LEFT JOIN incoming_info ii ON ii.truck_id = s.truck_id LEFT JOIN planning_info pi ON pi.truck_id = s.truck_id LEFT JOIN order_info oi ON oi.id = t.order_id where t.id = 11363; 
-- Parameters: 11363(Long)

-- 组装销售合同签署信息,使用订单创建时间，或创建时间为空，则为导入数据，直接使用单据提交时间
-- contactSign
-- contactSignPerson

-- 组装定金、尾款核销信息，获取定金核销记录并组装数据
select w.write_off_type writeOffType,wd.write_off_type writeOffWay,w.write_off_time writeOffTime, wd.inflow_no bankSerialNumber,wd.rebate_import_no rebateNo, wd.used_amount usedAmount,STR_TO_DATE(ci.payment_date,'%Y%m%d%H%i%s') paymentDate,su.account,su.agency_code agencyCode from write_off w left join write_off_detail wd on wd.write_off_id = w.id LEFT JOIN capital_inflow ci on ci.id = wd.inflow_id left join sys_user su on su.id = w.create_user where w.truck_id = 11363 order by w.create_time desc; 
-- Parameters: 11363(Long)

-- 获取入库时间，即收发车收车确认时间
select id, order_id, send_number, create_time, except_time, send_id, receive_id, receive_time, receive_image,create_user, apply_code, truck_id, status, reason, real_send_time,update_time,check_agency_code from repertory_info WHERE truck_id = 11363; 
-- Parameters: 11363(Long)
SELECT * FROM sys_user su where su.id = ? 
--  Parameters: null

-- 获取合格证是否已领取
select id, apply_no, submission_no, order_no, vin_code, certificate_no, issue_date, serial_number, engine_number, contact_no, public_type, truck_id, deal_time, deal_user, v_model, v_type,v_color, v_engine, v_size, v_container_size, v_wheel_base, v_tread_size, v_tyre_type, v_plate_spring, v_rated_weight, v_all_weight, v_weight_use_number, v_trailer_weight, v_other_weight, v_most_weight, v_people_number,is_reject from certificate_apply_detail where truck_id = 11363 and is_reject = 0; 
--  Parameters: 11363(Long)

-- src/main/resources/业务流转单模板.docx
```
2. http://127.0.0.1:8081/api/wexp/download?type=1
    - com.clgg.modules.api.controller.WordExportController#downloadFile


#### 查询
- http://127.0.0.1:8081/report/truck?pageNum=&pageSize=10&agencyCode=&productTypeId=&platetTypeId=&submissionNo=&truckCode=&status=&serialNumber=&contactNo=&startTime=&endTime=&expStartTime=&expEndTime=
    - com.clgg.modules.system.controller.ReportController#truck
```
-- 获取经销商信息（提报方）
-- Parameters: 0(String)
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0" ;
-- 获取产品型谱
-- Parameters: 0(String)
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
-- 获取车辆类别	
-- Parameters: 0(String)
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;

SELECT count(0) FROM order_truck t LEFT JOIN order_info o ON o.id = t.order_id LEFT JOIN order_truck_sell_info s ON s.truck_id = t.id LEFT JOIN incoming_info i ON i.truck_id = t.id LEFT JOIN sys_agency sa ON sa.agency_code_ours = o.agency_code;
-- Parameters: 0(Integer), 10(Integer)
select t.id, t.order_id, t.name, t.product_type_name, t.product_type_id, t.platet_type_name, t.platet_type_id, t.truck_code, t.version, t.market_type, t.truck_type_name, t.truck_type_id, t.public_type, t.engine_type, t.horsepower, t.wheel_base, t.cab_type, t.speed_changing_box, t.frame, t.front_axle, t.behand_axle, t.front_spring, t.behand_spring, t.fuel_tank, t.tyre_type, t.status, t.create_user, t.create_date, t.update_user, t.update_data, t.remark, s.single_price, s.down_price, s.down_price_cancel, s.down_price_leave, s.tail_money, s.tail_money_wait_cancel, s.tail_money_cancel, s.is_on_account, on_account_leave, s.on_account_cancel, s.logistics_status, s.others, i.vin, i.serial_number, i.engine_number, o.submission_no, o.contact_no, o.order_no, o.submit_client,sa.address,sa.agency_simple_name from order_truck t left join order_info o on o.id = t.order_id left join order_truck_sell_info s on s.truck_id = t.id left join incoming_info i on i.truck_id = t.id left join sys_agency sa on sa.agency_code_ours = o.agency_code ORDER BY t.create_date DESC limit 0,10 ;
```



### 10 车辆采购销售报表


#### 销售台账
- http://127.0.0.1:8081/report/ledger?listType=0&startTime=2022-05-31
```
URI_S_20220531201349469: /report/ledger,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"listType":["0"],"startTime":["2022-05-31"]}, body: ["0","2022-05-31",{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999055858,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: SELECT iad.invoice_date,sa.agency_simple_name invoice_company,iad.serial_number,ii.vin, ot.product_type_name,ot.truck_type_name, SUM(iad.invoice_money) sales_price,SUM(iad.invoice_notax_money) sales_notax_price,GROUP_CONCAT(iad.invoice_no) invoice_no, tem.invoice_money in_price,tem.invoice_notax_money in_notax_price FROM invoice_apply_detail iad LEFT JOIN invoice_apply ia on iad.apply_no = ia.apply_no LEFT JOIN sys_agency sa on sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii on ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info otsi on otsi.truck_id = ii.truck_id LEFT JOIN order_truck ot on ot.id = ii.truck_id LEFT JOIN (SELECT SUM(brd.invoice_money) invoice_money,SUM(brd.invoice_notax_money) invoice_notax_money,brd.serial_number from bill_register_detail brd GROUP BY brd.serial_number) tem on tem.serial_number = iad.serial_number LEFT JOIN order_info oi on oi.id = otsi.order_id LEFT JOIN submission si on si.submission_no = oi.submission_no where (si.submission_type != '1' or si.submission_type is null) and STR_TO_DATE(iad.invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and otsi.truck_status != 2 GROUP BY iad.serial_number,iad.invoice_type ORDER BY sa.agency_code_ours,iad.invoice_date,ot.product_type_name,ot.truck_type_name,ii.serial_number 
==> Parameters: 2022-05-31(String)
<==      Total: 0
URI_E_20220531201349469: /report/ledger, time: 36, 
	|--reponse: "report/report_truck_ledger" 

```
#### 采购台账
- http://127.0.0.1:8081/report/ledger?listType=1&startTime=2022-05-31
```
URI_S_20220531201441200: /report/ledger,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"listType":["1"],"startTime":["2022-05-31"]}, body: ["1","2022-05-31",{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999229868,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: SELECT tmp.invoice_company invoiceCompany,tmp.create_time createTime, tmp.invoice_money invoiceMoney,tmp.invoice_no invoiceNo, otsi.single_price singlePrice,tmp.invoice_notax_money as invoiceRate, ot.id truckId,ii.serial_number serialNumber,ii.vin vin, ot.truck_type_name truckTypeName,ot.product_type_name productTypeName, (SELECT voucher_no from voucher_bill vb WHERE vb.serial_number = tmp.serial_number and vb.agency_code ='base' LIMIT 1) as voucherNo from ( SELECT SUM(brd.invoice_money) invoice_money,SUM(brd.invoice_notax_money) invoice_notax_money,group_concat(invoice_no) invoice_no,brd.serial_number, br.id,br.invoice_company,br.create_time FROM bill_register_detail brd LEFT JOIN bill_register br on brd.apply_no = br.apply_no WHERE STR_TO_DATE(brd.invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') GROUP BY brd.serial_number,brd.invoice_type ) tmp LEFT JOIN incoming_info ii on ii.serial_number = tmp.serial_number LEFT JOIN order_truck_sell_info otsi on otsi.truck_id = ii.truck_id LEFT JOIN order_truck ot on ot.id = ii.truck_id where otsi.truck_status != 2 
==> Parameters: 2022-05-31(String)
<==      Total: 0
URI_E_20220531201441200: /report/ledger, time: 50, 
	|--reponse: "report/report_truck_ledger" 

```
### 11 账面库存统计表 异常
- 
```

```
### 13 销量统计表
- http://127.0.0.1:8081/report/sales
```
URI_S_20220531201658522: /report/sales,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [null,{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999406243,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: SELECT tmp.agency_code,tmp.agency_simple_name, tmp.id,tmp.product_type_name,tmp.product_type_id, tmp.invoice_date,COUNT(tmp.id) as countNum FROM ( SELECT DISTINCT 'base' as agency_code,'上海远行' as agency_simple_name, ot.id,ot.product_type_name,ot.product_type_id, iad.invoice_date from order_truck ot LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN invoice_apply_detail iad on iad.serial_number = ii.serial_number where ot.status = 7 and sa.type = 1 and sa.`status` = 0 and iad.invoice_type <> 4 and DATE_FORMAT(iad.invoice_date,'%Y')= ? GROUP BY ot.id UNION ALL SELECT DISTINCT str.agency_code,sa.agency_simple_name, ot.id,ot.product_type_name,ot.product_type_id, strd.invoice_date from order_truck ot LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN sales_ticket_register_detail strd on strd.serial_number = ii.serial_number LEFT JOIN sales_ticket_register str on str.apply_no = strd.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = str.agency_code where ot.status = 7 and DATE_FORMAT(strd.invoice_date,'%Y')= ? and strd.invoice_type <> 4 GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id,DATE_FORMAT(tmp.invoice_date,'%Y-%m') 
==> Parameters: 2022(Integer), 2022(Integer)
<==      Total: 48
==>  Preparing: SELECT tmp.agency_code,tmp.agency_simple_name, tmp.id,tmp.product_type_name,tmp.product_type_id, tmp.invoice_date,COUNT(tmp.id) as countNum FROM ( SELECT DISTINCT 'base' as agency_code,'上海远行' as agency_simple_name, ot.id,ot.product_type_name,ot.product_type_id, iad.invoice_date from order_truck ot LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN invoice_apply_detail iad on iad.serial_number = ii.serial_number where ot.status = 7 and sa.type = 1 and sa.`status` = 0 and iad.invoice_type = 4 and DATE_FORMAT(iad.invoice_date,'%Y')= ? GROUP BY ot.id UNION ALL SELECT DISTINCT str.agency_code,sa.agency_simple_name, ot.id,ot.product_type_name,ot.product_type_id, strd.invoice_date from order_truck ot LEFT JOIN incoming_info ii on ii.truck_id = ot.id LEFT JOIN sales_ticket_register_detail strd on strd.serial_number = ii.serial_number LEFT JOIN sales_ticket_register str on str.apply_no = strd.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = str.agency_code where ot.status = 7 and DATE_FORMAT(strd.invoice_date,'%Y')= ? and strd.invoice_type = 4 GROUP BY ot.id )tmp GROUP BY tmp.agency_code,tmp.product_type_id,DATE_FORMAT(tmp.invoice_date,'%Y-%m') 
==> Parameters: 2022(Integer), 2022(Integer)
<==      Total: 2
==>  Preparing: select * from sys_agency where `status` = "0" order by id; 
==> Parameters: 
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type where status = 0 and name_type in (0,2) order by id 
==> Parameters: 
<==      Total: 13
URI_E_20220531201658522: /report/sales, time: 63, 
	|--reponse: "report/report_truck_sales" 

```
### 20 资金明细表
- http://127.0.0.1:8081/report/moneyDetails
```
URI_S_20220531201822918: /report/moneyDetails,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
查看资金明细表。----Tue May 31 20:18:22 CST 2022
==>  Preparing: SELECT ci.serial_number serialNumber, ci.payment_date paymentDate, ci.payment_client paymentClient, ci.account_amount accountAmount, ciu.contact_nos contactNos, ciu.serial_number serialNumberCar, ciu.write_off_time writeOffTime, ciu.used_amount usedAmount, ciu.unused_amount unusedAmount, ciu.amount amount, ci.client_no clientNo, ci.client_name clientName, ciu.write_off_type writeOffType, ci.abstract_info abstractInfo FROM capital_inflow ci INNER JOIN capital_inflow_used ciu ON ci.id = ciu.capital_inflow_id WHERE belong = ? order by ci.payment_date,ciu.write_off_time desc 
==> Parameters: base(String)
<==      Total: 5278
URI_E_20220531201822918: /report/moneyDetails, time: 330, 
	|--reponse: "report/money_detail" 

```
### 22 应收账款报表
- http://127.0.0.1:8081/report/billRecivablesReport
```
URI_S_20220531201933843: /report/billRecivablesReport,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
查看应收账款表。----null
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), base(String)
<==      Total: 12
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( -- 查询本部开出去票的含税金额+定金 明细 SELECT DISTINCT "上海远行" AS agency_name, "base" AS agency_code, sa.agency_name AS client_name, sa.agency_code client_no, iad.invoice_money AS this_in_price, temp.used_amount this_write_off_price, iad.serial_number, iad.invoice_date, iad.invoice_no FROM invoice_apply_detail iad LEFT JOIN invoice_apply ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id left join ( select wod.truck_id,wod.used_amount from write_off_detail wod LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id where ci.belong = 'base' AND wo.write_off_type = '定金' ) temp on temp.truck_id = ii.truck_id WHERE STR_TO_DATE(iad.invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') AND ia.invoice_company = "上海远行供应链管理（集团）有限公司" AND sa.agency_code IS NOT NULL and sa.agency_code_ours = ot.agency_code AND ot.down_price > 0 and ot.truck_status !=1 UNION SELECT DISTINCT "上海远行" AS agency_name, "base" AS agency_code, sa.agency_name AS client_name, sa.agency_code client_no, iad.invoice_money AS this_in_price, 0 as this_write_off_price, iad.serial_number, iad.invoice_date, iad.invoice_no FROM invoice_apply_detail iad LEFT JOIN invoice_apply ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id WHERE STR_TO_DATE(iad.invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') AND ia.invoice_company = "上海远行供应链管理（集团）有限公司" AND sa.agency_code IS NOT NULL and sa.agency_code_ours = ot.agency_code AND (ot.down_price IS NULL OR ot.down_price = 0) and ot.truck_status !=1 ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT "上海远行" agency_name, "base" agency_code, sa.agency_name client_name, sa.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN invoice_apply_detail iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sa ON sa.agency_code = ci.client_no WHERE ci.belong = 'base' AND ( wo.write_off_type = '尾款' OR wo.write_off_type = '挂账' ) AND iad.apply_no IS NOT NULL and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') UNION SELECT DISTINCT "上海远行" agency_name, "base" agency_code, sa.agency_name client_name, sa.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN rebate_detail ci ON wod.rebate_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN invoice_apply_detail iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sa ON sa.agency_code = ci.client_no WHERE ci.agency_code = 'base' AND ( wo.write_off_type = '尾款' OR wo.write_off_type = '挂账' ) AND iad.apply_no IS NOT NULL and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ) tmp GROUP BY tmp.client_no 
==> Parameters: 2022-05-01(String), 2022-05-01(String)
<==      Total: 2
==>  Preparing: select * from sys_agency where `status` = "0" and type="0" and father="base" order by id; 
==> Parameters: 
<==      Total: 8
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190619154208925923(String)
<==      Total: 7
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190619154208925923(String), 20190619154208925923(String), 20190619154208925923(String), 2022-05-01(String), 20190619154208925923(String), 20190619154208925923(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190619154208925923(String), 20190619154208925923(String), 20190619154208925923(String), 2022-05-01(String), 20190619154208925923(String), 20190619154208925923(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190619154208925923(String), 20190619154208925923(String), 2022-05-01(String)
<==      Total: 4
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190619154208925923(String), 20190619154208925923(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190724162907561293(String)
<==      Total: 28
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190724162907561293(String), 20190724162907561293(String), 20190724162907561293(String), 2022-05-01(String), 20190724162907561293(String), 20190724162907561293(String)
<==      Total: 4
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190724162907561293(String), 20190724162907561293(String), 20190724162907561293(String), 2022-05-01(String), 20190724162907561293(String), 20190724162907561293(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190724162907561293(String), 20190724162907561293(String), 2022-05-01(String)
<==      Total: 6
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190724162907561293(String), 20190724162907561293(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190730184136956746(String)
<==      Total: 5
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184136956746(String), 20190730184136956746(String), 20190730184136956746(String), 2022-05-01(String), 20190730184136956746(String), 20190730184136956746(String)
<==      Total: 1
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184136956746(String), 20190730184136956746(String), 20190730184136956746(String), 2022-05-01(String), 20190730184136956746(String), 20190730184136956746(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184136956746(String), 20190730184136956746(String), 2022-05-01(String)
<==      Total: 1
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184136956746(String), 20190730184136956746(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190730184345661796(String)
<==      Total: 25
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184345661796(String), 20190730184345661796(String), 20190730184345661796(String), 2022-05-01(String), 20190730184345661796(String), 20190730184345661796(String)
<==      Total: 10
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184345661796(String), 20190730184345661796(String), 20190730184345661796(String), 2022-05-01(String), 20190730184345661796(String), 20190730184345661796(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184345661796(String), 20190730184345661796(String), 2022-05-01(String)
<==      Total: 5
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184345661796(String), 20190730184345661796(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190730184526325982(String)
<==      Total: 4
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184526325982(String), 20190730184526325982(String), 20190730184526325982(String), 2022-05-01(String), 20190730184526325982(String), 20190730184526325982(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184526325982(String), 20190730184526325982(String), 20190730184526325982(String), 2022-05-01(String), 20190730184526325982(String), 20190730184526325982(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184526325982(String), 20190730184526325982(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184526325982(String), 20190730184526325982(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190730184702579901(String)
<==      Total: 5
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184702579901(String), 20190730184702579901(String), 20190730184702579901(String), 2022-05-01(String), 20190730184702579901(String), 20190730184702579901(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184702579901(String), 20190730184702579901(String), 20190730184702579901(String), 2022-05-01(String), 20190730184702579901(String), 20190730184702579901(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184702579901(String), 20190730184702579901(String), 2022-05-01(String)
<==      Total: 1
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184702579901(String), 20190730184702579901(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20190730184852711095(String)
<==      Total: 4
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184852711095(String), 20190730184852711095(String), 20190730184852711095(String), 2022-05-01(String), 20190730184852711095(String), 20190730184852711095(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20190730184852711095(String), 20190730184852711095(String), 20190730184852711095(String), 2022-05-01(String), 20190730184852711095(String), 20190730184852711095(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184852711095(String), 20190730184852711095(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20190730184852711095(String), 20190730184852711095(String), 2022-05-01(String)
<==      Total: 0
==>  Preparing: select id, agency_name, agency_code, initial_price, this_in_price, this_write_off_price, this_year_in_price, this_year_write_off_price, this_ending_price, date_time,client_name,client_no,adjust_price,adjust_remark from report_receivables where STR_TO_DATE(date_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and agency_code = ? 
==> Parameters: 2022-04-01(String), 20200603112814779687(String)
<==      Total: 7
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, sum(wod.used_amount) this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL GROUP BY ii.serial_number UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.client_name, sac.client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM sales_ticket_register_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN sales_ticket_register ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id WHERE ia.agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20200603112814779687(String), 20200603112814779687(String), 20200603112814779687(String), 2022-05-01(String), 20200603112814779687(String), 20200603112814779687(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_in_price) this_in_price, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, wod.used_amount this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code LEFT JOIN write_off_detail wod ON wod.truck_id = ii.truck_id LEFT JOIN write_off wo ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id WHERE ia.up_agency_code = ? and ot.agency_code = ? and ot.sub_down_price > 0 and ci.belong = ? AND wo.write_off_type = '定金' AND sa.agency_code IS NOT NULL UNION SELECT DISTINCT sa.agency_simple_name AS agency_name, sa.agency_code_ours agency_code, iad.invoice_money AS this_in_price, 0 as this_write_off_price, sac.agency_name client_name, sac.agency_code client_no, ii.serial_number, iad.invoice_date, iad.invoice_no FROM ( SELECT apply_no, sum(invoice_money) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT(invoice_no) invoice_no FROM allot_invoice_detail WHERE STR_TO_DATE(invoice_date, '%Y-%m') = STR_TO_DATE(?,'%Y-%m') and invoice_type = 1 GROUP BY serial_number ) iad LEFT JOIN allot_invoice ia ON ia.apply_no = iad.apply_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = ia.up_agency_code LEFT JOIN incoming_info ii ON ii.serial_number = iad.serial_number LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN sys_agency sac ON sac.agency_code_ours = ia.down_agency_code WHERE ia.up_agency_code = ? and ot.agency_code = ? AND (ot.sub_down_price is null or ot.sub_down_price = 0) ) tmp GROUP BY tmp.client_no ORDER BY tmp.client_no 
==> Parameters: 2022-05-01(String), 20200603112814779687(String), 20200603112814779687(String), 20200603112814779687(String), 2022-05-01(String), 20200603112814779687(String), 20200603112814779687(String)
<==      Total: 0
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.client_name, sac.client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN (SELECT apply_no,sum(invoice_money) as invoice_money,invoice_date, serial_number,GROUP_CONCAT(invoice_no) invoice_no from sales_ticket_register_detail where invoice_type = 1 group by serial_number ) iad ON iad.serial_number=ii.serial_number LEFT JOIN sys_agency_client sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status <> 1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,sac.client_no,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20200603112814779687(String), 20200603112814779687(String), 2022-05-01(String)
<==      Total: 1
==>  Preparing: SELECT tmp.agency_name, tmp.agency_code, tmp.client_name, tmp.client_no, sum(tmp.this_write_off_price) this_write_off_price FROM ( SELECT DISTINCT sa.agency_simple_name agency_name, sa.agency_code_ours agency_code, sac.agency_name client_name, sac.agency_code client_no, wo.used_amount this_write_off_price, ii.serial_number, wo.write_off_time, iad.invoice_date, iad.invoice_no, iad.invoice_money FROM write_off wo LEFT JOIN write_off_detail wod ON wo.id = wod.write_off_id LEFT JOIN capital_inflow ci ON wod.inflow_id = ci.id LEFT JOIN incoming_info ii ON ii.truck_id = wod.truck_id LEFT JOIN order_truck_sell_info ot ON ot.truck_id = ii.truck_id LEFT JOIN ( SELECT apply_no, sum( invoice_money ) AS invoice_money, invoice_date, serial_number, GROUP_CONCAT( invoice_no ) invoice_no FROM allot_invoice_detail WHERE invoice_type = 1 GROUP BY serial_number ) iad ON iad.serial_number = ii.serial_number LEFT JOIN sys_agency sac ON sac.id = ot.sub_client_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = ci.belong WHERE ci.belong =? and ot.agency_code =? and ot.truck_status =1 and (wo.write_off_type = '尾款' or wo.write_off_type = '挂账') and iad.apply_no is not null and STR_TO_DATE(wo.write_off_time,'%Y-%m') = STR_TO_DATE(?,'%Y-%m') ORDER BY sa.agency_code_ours,ii.serial_number ) tmp GROUP BY tmp.client_no 
==> Parameters: 20200603112814779687(String), 20200603112814779687(String), 2022-05-01(String)
<==      Total: 0
URI_E_20220531201933843: /report/billRecivablesReport, time: 1059, 
	|--reponse: "report/report_base_recivables" 

```
### 24 车款回款表 车辆回款表
#### 本部车款回款表

##### 查询
```
URI_S_20220610102321556: http://127.0.0.1:8082/report/repayMoneyDetail,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageNum":[""],"pageSize":["10"],"truckTypeId":[""],"vin":[""],"serialNumber":["N8000138"],"manufactorId":[""],"status":[""],"startTime":[""],"endTime":[""],"tailStartTime":[""],"tailEndTime":[""]}, body: null
        //获取下拉框内容
-- 获取经销商信息（提报方）
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status ='0' and status = "0" ;
-- Parameters: 0(String)

-- // 获取主机厂
select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc; 
--  Parameters: 

-- 获取产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name ;
--  Parameters: 0(String)

-- 获取车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name ;
--  Parameters: 0(String)

-- 获得车型系列
select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = '0' ;
--  Parameters: 0(String)


//查询         List<TruckRepayReportBaseVo> truckInfos = truckBusinessReportViewDao.selectTruckRepayInfos(searchVo);
SELECT count(0) FROM (SELECT ot.truck_type_name truckTypeName, ot.truck_type_id truckTypeId, ot.product_type_name productTypeName, ot.product_type_id productTypeId, ot.id truckId, ii.vin, ii.serial_number serialNumber, mf.company_name manufactor, ot.`status` truckStatus, pli.bh_order_no manufactorOrderNo, sum(brd.invoice_money) manufactorPrice, sa.agency_name subcompany, sa.agency_code_ours agencyCode FROM order_truck ot LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN planning_info pli ON pli.truck_id = ot.id LEFT JOIN bill_register_detail brd ON brd.serial_number = ii.serial_number LEFT JOIN manufactor mf ON mf.id = ot.manufactor_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code WHERE ii.serial_number LIKE CONCAT('%', ?, '%') GROUP BY ii.vin, ii.serial_number) table_count 
-- Parameters: N8000138(String)
SELECT ot.truck_type_name truckTypeName,ot.truck_type_id truckTypeId,ot.product_type_name productTypeName,ot.product_type_id productTypeId,ot.id truckId, ii.vin,ii.serial_number serialNumber, mf.company_name manufactor,ot.`status` truckStatus, pli.bh_order_no manufactorOrderNo,sum(brd.invoice_money) manufactorPrice, sa.agency_name subcompany,sa.agency_code_ours agencyCode FROM order_truck ot LEFT JOIN incoming_info ii on ii.truck_id = ot.id left join planning_info pli on pli.truck_id = ot.id left join bill_register_detail brd on brd.serial_number = ii.serial_number LEFT JOIN manufactor mf on mf.id = ot.manufactor_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code WHERE ii.serial_number like CONCAT('%', 'N8000138', '%') GROUP BY ii.vin,ii.serial_number ORDER BY oi.create_time DESC limit 0,10; 
-- Parameters: N8000138(String), 0(Integer), 10(Integer)

TruckRepayReportBaseVo

    @ExcelProperty(value = {"采购信息", "车辆状态"}, index = 6)
    private String truckStatus;
    @ExcelProperty(value = {"子公司终端客户销售信息", "销售状态"}, index = 22)
    private String customerTruckStatus;
    @ExcelProperty(value = {"销售信息", "销售状态"}, index = 15)
    private String subcompanyTruckStatus;
	
//         truckAddWriteOffInfo(truckInfos);
//批量查询        List<InvoiceInfoVo> invoiceInfosList = invoiceApplyDetailMapper.batchSelectInvoiceInfos(truckIdList, serialNumList);
SELECT sum( tmp.invoice_money ) AS invoiceMoney, tmp.invoice_date AS invoiceDate, tmp.serial_number AS serialNumber, tmp.truck_id AS truckId FROM ( SELECT tem.invoice_money AS invoice_money, tem.invoice_date AS invoice_date, tem.truck_id, iaci.serial_number FROM ( SELECT iad.*, iac.truck_id FROM invoice_apply_detail iad LEFT JOIN invoice_apply_content iac ON iac.apply_no = iad.apply_no WHERE 1 = 1 AND iac.truck_id IN ( 11010 ) ) tem LEFT JOIN incoming_info ii ON ii.truck_id = tem.truck_id LEFT JOIN invoice_apply_content_invoice iaci ON ii.serial_number = iaci.serial_number AND tem.invoice_no = iaci.invoice_no WHERE 1 = 1 AND iaci.serial_number IN ( 'N8000138' ) GROUP BY iaci.serial_number,iaci.invoice_no ) tmp GROUP BY tmp.serial_number; 
-- Parameters: 11010(Long), N8000138(String)

    @ExcelProperty(value = {"销售信息", "销售价格"}, index = 16)
    private String subcompanyPrice;
	
        // 本部销售核销信息 List<WriteOffDetailVo> writeOffDetailVosList = truckBusinessReportViewDao.batchGetBaseWriteOffByTruckId(Lists.newArrayList(Constants.AGENCY_CODE_BASE), truckIdList);
SELECT wo.truck_id truckId,wo.write_off_type writeOffType,SUM(wod.used_amount) writeOffMoney,STR_TO_DATE(ci.payment_date,'%Y%m%d') writeOffDate,ci.payment_client paymentClient,ci.belong AS agencyCode from write_off wo LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where 1 = 1 AND ci.belong IN ( 'base' ) AND wo.truck_id IN ( 11010 ) GROUP BY wo.truck_id,wo.write_off_type; 
-- Parameters: base(String), 11010(Long)

    @ExcelProperty(value = {"销售信息", "客户已付定金"}, index = 17)
    private String subcompanyDownPrice;
    @ExcelProperty(value = {"销售信息", "定金支付日期"}, index = 18)
    private String subcompanyDownPriceDate;

    @ExcelProperty(value = {"销售信息", "客户尾款"}, index = 19)
    private String subcompanyTailPrice;
    @ExcelProperty(value = {"销售信息", "回款日期"}, index = 20)
    private String subcompanyTailPriceDate;

        // 子公司销售核销信息
SELECT sum(tmp.invoice_money) as salesInvoiceMoney,tmp.invoice_date as salesInvoiceDate,tmp.invoice_for_company as salesInvoiceCompay, tmp.serial_number as serialNumber,tmp.truck_id as truckId from ( SELECT tem.invoice_money ,tem.invoice_date,stci.serial_number,tem.invoice_for_company,tem.truck_id FROM( select strd.* ,strc.truck_id,str.invoice_for_company from sales_ticket_register_detail strd LEFT JOIN sales_ticket_register_content strc on strc.apply_no = strd.apply_no LEFT JOIN sales_ticket_register str on str.apply_no = strd.apply_no where 1 = 1 AND strc.truck_id IN ( 11010 ) )tem LEFT JOIN incoming_info ii on ii.truck_id = tem.truck_id LEFT JOIN sales_ticket_content_invoice stci on ii.serial_number = stci.serial_number and tem.invoice_no = stci.invoice_no where 1 = 1 AND stci.serial_number IN ( 'N8000138' ) GROUP BY stci.serial_number,stci.invoice_no ) tmp GROUP BY tmp.serial_number; 
-- Parameters: 11010(Long), N8000138(String)
    @ExcelProperty(value = {"子公司终端客户销售信息", "销售方"}, index = 21)
    private String customer;
	@ExcelProperty(value = {"子公司终端客户销售信息", "销售单价"}, index = 23)
    private String customerPrice;


SELECT wo.truck_id truckId,wo.write_off_type writeOffType,SUM(wod.used_amount) writeOffMoney,STR_TO_DATE(ci.payment_date,'%Y%m%d') writeOffDate,ci.payment_client paymentClient,ci.belong AS agencyCode from write_off wo LEFT JOIN write_off_detail wod on wod.write_off_id = wo.id LEFT JOIN capital_inflow ci on ci.id = wod.inflow_id where 1 = 1 AND ci.belong IN ( 'base' ) AND wo.truck_id IN ( 11010 ) GROUP BY wo.truck_id,wo.write_off_type; 
-- Parameters: base(String), 11010(Long)

    @ExcelProperty(value = {"子公司终端客户销售信息", "客户已付定金"}, index = 24)
    private String customerDownPrice;
    @ExcelProperty(value = {"子公司终端客户销售信息", "定金支付日期"}, index = 25)
    private String customerDownPriceDate;
	
    @ExcelProperty(value = {"子公司终端客户销售信息", "客户尾款"}, index = 26)
    private String customerTailPrice;
    @ExcelProperty(value = {"子公司终端客户销售信息", "回款日期"}, index = 27)
    private String customerTailPriceDate;

URI_E_20220610102321556: http://127.0.0.1:8082/report/repayMoneyDetail, time: 55, 
	|--reponse: "report/report_repay_money_base" 
```

- http://127.0.0.1:8081/report/repayMoneyDetail?pageNum=4&pageSize=10&truckTypeId=59&vin=LJRD1338XN8000154&serialNumber=N8000154&manufactorId=33&status=7&startTime=&endTime=&tailStartTime=2022-02-01&tailEndTime=
    - com.clgg.modules.system.controller.ReportController#RepayMoneyDetail
        - return "report/report_repay_money_base";
```
select
	ot.truck_type_name truckTypeName,
	ot.truck_type_id truckTypeId,
	ot.product_type_name productTypeName,
	ot.product_type_id productTypeId,
	ot.id truckId,
	ii.vin,
	ii.serial_number serialNumber,
	mf.company_name manufactor,
	ot.`status` truckStatus,
	pli.bh_order_no manufactorOrderNo,
	sum(brd.invoice_money) manufactorPrice,
	sa.agency_name subcompany,
	sa.agency_code_ours agencyCode
from
	order_truck ot -- 订单车辆信息
left join incoming_info ii on -- 入库信息
	ii.truck_id = ot.id
left join planning_info pli on -- 排产信息
	pli.truck_id = ot.id
left join bill_register_detail brd on -- 商用车开票申请详细信息
	brd.serial_number = ii.serial_number
left join manufactor mf on	-- 主机厂
	mf.id = ot.manufactor_id
left join order_info oi on -- 订单表
	oi.id = ot.order_id
left join sys_agency sa on -- 经销商
	sa.agency_code_ours = oi.agency_code
left join write_off wo on -- 核销[报销]
	wo.truck_id = ot.id
left join write_off_detail wod on -- 核销详情
	wod.truck_id = ot.id
left join capital_inflow ci on -- [资金流入]
	ci.id = wod.inflow_id

where ot.truck_type_id = 59
and ot.status = '7'
and ii.serial_number like CONCAT('%', 'N8000154', '%')
and ii.vin like CONCAT('%', 'LJRD1338XN8000154', '%')
and ot.manufactor_id = 33
and str_to_date(ci.payment_date,
'%Y%m%d%H%i%s') >= str_to_date(concat('2022-02-01', ' 00:00:00'),
'%Y-%m-%d %H:%i:%s')
and wo.write_off_type <> "定金"
and ci.belong = "base"
group by
ii.vin,
ii.serial_number
order by
oi.create_time desc
limit 0,10; 
--  Parameters: 59(Long), 7(String), N8000154(String), LJRD1338XN8000154(String), 33(Long), 2022-02-01(String), 0(Integer), 10(Integer)
```

##### 导出

```
URI_S_20220611094529040: http://127.0.0.1:8082/report/doExportRepayMoney,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null

SELECT ot.truck_type_name truckTypeName,ot.truck_type_id truckTypeId,ot.product_type_name productTypeName,ot.product_type_id productTypeId,ot.id truckId, ii.vin,ii.serial_number serialNumber, mf.company_name manufactor,ot.`status` truckStatus, pli.bh_order_no manufactorOrderNo,sum(brd.invoice_money) manufactorPrice, sa.agency_name subcompany,sa.agency_code_ours agencyCode FROM order_truck ot LEFT JOIN incoming_info ii on ii.truck_id = ot.id left join planning_info pli on pli.truck_id = ot.id left join bill_register_detail brd on brd.serial_number = ii.serial_number LEFT JOIN manufactor mf on mf.id = ot.manufactor_id LEFT JOIN order_info oi on oi.id = ot.order_id LEFT JOIN sys_agency sa on sa.agency_code_ours = oi.agency_code GROUP BY ii.vin,ii.serial_number ORDER BY oi.create_time DESC 
-- Parameters: 

         truckAddWriteOffInfo(truckInfos); 参考查询
URI_S_20220611094529040: http://127.0.0.1:8082/report/doExportRepayMoney, time: 19282, 
	|--reponse: null 
```


#### 子公司回款表
- http://127.0.0.1:8081/report/repayMoneySubDetail?pageNum=&pageSize=10&agencyCode=&truckTypeId=&vin=&serialNumber=&manufactorId=&status=&startTime=&endTime=&tailStartTime=&tailEndTime=
    - com.clgg.modules.system.controller.ReportController#repayMoneySubDetail
        - return "report/report_repay_money_sub";
        ```
        采购方 ${truck.manufactor}
        车辆状态 ${truck.truckStatus}
        
        销售方 ${truck.subcompany}
        销售单价 ${T(com.clgg.common.utils.MoneyFormat).stringToMoney(truck.subcompanyPrice)}
        客户已付定金 ${T(com.clgg.common.utils.MoneyFormat).stringToMoney(truck.subcompanyDownPrice)}
        定金支付日期 ${truck.subcompanyDownPriceDate}
        客户尾款 ${T(com.clgg.common.utils.MoneyFormat).stringToMoney(truck.subcompanyTailPrice)}
        回款日期 ${truck.subcompanyTailPriceDate}
        com.clgg.modules.system.vo.TruckBusinessReport.TruckRepayReportSubVo
        ```
```

-- 获取经销商信息（提报方）
select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = '0' and status = "0"; 
-- Parameters: 0(String)

-- 获取主机厂（采购方）
select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc; 
-- Parameters: 
2022-05-30 10:24:38.181 DEBUG 10472 --- [io-8081-exec-21] c.c.m.s.dao.ManufactorMapper.selectByVo  : <==      Total: 49

-- 获取产品型谱
select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = '0' order by name; 
--  Parameters: 0(String)

-- 获取车辆类别
select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = '0' order by name; 
-- Parameters: 0(String)

-- 获得车型系列
select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = '0'; 
-- Parameters: 0(String)


-- http://127.0.0.1:8081/report/repayMoneySubDetail?pageNum=1&pageSize=10&agencyCode=20190724162907561293&truckTypeId=28&vin=LZGJLGW49MB020796&serialNumber=MB020796&manufactorId=0&status=7&startTime=2020-01-01&endTime=&tailStartTime=2021-01-01&tailEndTime=
SELECT count(0) FROM (SELECT ot.truck_type_name truckTypeName, ot.truck_type_id truckTypeId, ot.product_type_name productTypeName, ot.product_type_id productTypeId, ot.id truckId, ii.vin, ii.serial_number serialNumber, ot.`status` truckStatus, CASE ss.submission_type WHEN 0 THEN pli.order_id ELSE pli.bh_order_no END manufactorOrderNo, sum(brd.invoice_money) manufactorPrice, sa.agency_name agencyName, sa.agency_code_ours agencyCode, CASE ss.submission_type WHEN 0 THEN 'base' ELSE mf.company_name END manufactor FROM order_truck ot LEFT JOIN incoming_info ii ON ii.truck_id = ot.id LEFT JOIN planning_info pli ON pli.truck_id = ot.id LEFT JOIN invoice_apply_detail brd ON brd.serial_number = ii.serial_number LEFT JOIN manufactor mf ON mf.id = ot.manufactor_id LEFT JOIN order_info oi ON oi.id = ot.order_id LEFT JOIN submission ss ON ss.submission_no = oi.submission_no LEFT JOIN sys_agency sa ON sa.agency_code_ours = oi.agency_code LEFT JOIN write_off wo ON wo.truck_id = ot.id LEFT JOIN write_off_detail wod ON wod.truck_id = ot.id LEFT JOIN capital_inflow ci ON ci.id = wod.inflow_id
where 1=1 -- oi.submission_type = '0'
-- and ot.status = '7'
-- and oi.agency_code = '20190724162907561293'
and ii.serial_number like CONCAT('%', 'N8000162', '%')
-- and ii.vin like CONCAT('%', 'LZGJLGW49MB020796', '%')
-- and ss.submission_type = '0'

-- and str_to_date(ci.payment_date,
-- '%Y%m%d%H%i%s') >= str_to_date(concat('2020-01-0', ' 00:00:00'),
-- '%Y-%m-%d %H:%i:%s')
-- and wo.write_off_type = "定金"

-- and str_to_date(ci.payment_date,
-- '%Y%m%d%H%i%s') >= str_to_date(concat('2021-01-01', ' 00:00:00'),
-- '%Y-%m-%d %H:%i:%s')
-- and wo.write_off_type <> "定金"
-- and ci.belong <> "base"
group by
ot.id) table_count 
-- Parameters: 7(String), 20190724162907561293(String), MB020796(String), LZGJLGW49MB020796(String), 0(String), 2020-01-01(String), 2021-01-01(String)

-- http://127.0.0.1:8081/report/repayMoneySubDetail?pageNum=1&pageSize=10&agencyCode=20190724162907561293&truckTypeId=28&vin=LZGJLGW49MB020796&serialNumber=MB020796&manufactorId=0&status=7&startTime=&endTime=&tailStartTime=2021-01-01&tailEndTime=

select
	ot.truck_type_name truckTypeName,
	ot.truck_type_id truckTypeId,
	ot.product_type_name productTypeName,
	ot.product_type_id productTypeId,
	ot.id truckId,
	ii.vin,
	ii.serial_number serialNumber,
	ot.`status` truckStatus,
	case
		ss.submission_type when 0 then pli.order_id
		else pli.bh_order_no
	end manufactorOrderNo,
	sum(brd.invoice_money) manufactorPrice,
	sa.agency_name agencyName,
	sa.agency_code_ours agencyCode,
	case
		ss.submission_type when 0 then 'base'
		else mf.company_name
	end manufactor
from
	order_truck ot -- 订单车辆信息
left join incoming_info ii on -- 入库信息
	ii.truck_id = ot.id
left join planning_info pli on -- 排产信息
	pli.truck_id = ot.id
left join invoice_apply_detail brd on -- 开票申请详细信息
	brd.serial_number = ii.serial_number
left join manufactor mf on	-- 主机厂
	mf.id = ot.manufactor_id
left join order_info oi on -- 订单表
	oi.id = ot.order_id
left join submission ss on -- 提报订单消息
	ss.submission_no = oi.submission_no
left join sys_agency sa on -- 经销商
	sa.agency_code_ours = oi.agency_code
left join write_off wo on -- 核销[报销]
	wo.truck_id = ot.id
left join write_off_detail wod on -- 核销详情
	wod.truck_id = ot.id
left join capital_inflow ci on -- [资金流入]
	ci.id = wod.inflow_id
where 1=1
 and ii.serial_number like CONCAT('%', 'N8000162', '%')   

-- where oi.submission_type = '0'
-- and ot.status = '7'
-- and oi.agency_code = '20190724162907561293'
-- and ii.serial_number like CONCAT('%', 'MB020796', '%')
-- and ii.vin like CONCAT('%', 'LZGJLGW49MB020796', '%')
-- and ss.submission_type ='0'
-- and str_to_date(ci.payment_date,
-- '%Y%m%d%H%i%s') >= str_to_date(concat('2021-01-01', ' 00:00:00'),
-- '%Y-%m-%d %H:%i:%s')
-- and wo.write_off_type <> "定金"
-- and ci.belong <> "base"
group by
ot.id
order by
oi.create_time desc
limit 0, 10;
-- Parameters: 7(String), 20190724162907561293(String), MB020796(String), LZGJLGW49MB020796(String), 0(String), 2021-01-01(String), 0(Integer), 10(Integer)


-- truckAddSubWriteOffInfo
-- truckTypeName	truckTypeId	productTypeName	productTypeId	truckId	vin	serialNumber	truckStatus	manufactorOrderNo	manufactorPrice	agencyName	agencyCode	manufactor
-- 64QY	59	挂车	33	11034	LJRD13389N8000162	N8000162	7	D20220216001	106,200	上海远行供应链管理（集团）有限公司	base	base
-- 11034  N8000162 7 base 

-- // 主数据已完成车辆信息数据查询 
-- 采购方 manufactor base->上海远行供应链管理（集团）有限公司
-- 车辆状态 truckStatus 61->渠道库存-退 id->

-- // 1\ 销售给子公司财务数据查询，包括开票金额、已付定金、已付尾款及时间
-- // 本部销售票信息

-- serialNumber不为空 
--  本部销售核销信息
select
	wo.truck_id truckId,
	wo.write_off_type writeOffType,
	SUM(wod.used_amount) writeOffMoney,
	STR_TO_DATE(ci.payment_date,
	'%Y%m%d') writeOffDate,
	ci.payment_client paymentClient
from
	write_off wo -- 核销[报销]
left join write_off_detail wod on -- 核销详情 
	wod.write_off_id = wo.id
left join capital_inflow ci on -- [资金流入]
	ci.id = wod.inflow_id
where
	ci.belong = 'base'
	and wo.truck_id = 11034
group by
	wo.write_off_type ;
-- Parameters: base(String), 11034(Long)

-- 车辆定金 manufactorDownPrice 定金付款日期 manufactorDownPriceDate
-- 车辆尾款 manufactorTailPrice 尾款付款日期 manufactorTailPriceDate

-- // 3\ 销售给客户财务数据查询，包括开票金额、已付定金、已付尾款及时间
--             // 车辆终端销售信息
--             //先通过车辆流水号获取invoice_no
select
	id,
	apply_no,
	invoice_date,
	invoice_no,
	invoice_money,
	capitalization,
	create_user,
	create_time,
	update_user,
	update_time,
	status,
	invoice_type
from
	sales_ticket_register_detail -- 商用车开票申请详细信息
where
	serial_number = 'N8000162'
	and status = '0'
order by
	invoice_date desc
limit 1; 
--  Parameters: N8000162(String)

select
	sum(tmp.invoice_money) as salesInvoiceMoney,
	tmp.invoice_date as salesInvoiceDate,
	tmp.invoice_for_company salesInvoiceCompay
from
	(
	select
		tem.invoice_money ,
		tem.invoice_date,
		stci.serial_number,
		tem.invoice_for_company
	from
		(
		select
			strd.* ,
			strc.truck_id,
			str.invoice_for_company
		from
			sales_ticket_register_detail strd -- 商用车开票申请详细信息
		left join sales_ticket_register_content strc on -- 商用车开票申请内容
			strc.apply_no = strd.apply_no
		left join sales_ticket_register str on -- 商用车开票申请
			str.apply_no = strd.apply_no
		where
			strc.truck_id = 11034
			and strd.invoice_no = null )tem
	left join incoming_info ii on -- 入库信息
		ii.truck_id = tem.truck_id
	left join sales_ticket_content_invoice stci on -- 子公司销售 发票与车辆流水号对应关系表
		ii.serial_number = stci.serial_number
		and tem.invoice_no = stci.invoice_no
	where
		stci.serial_number = 'N8000162'
	group by
		stci.serial_number,
		stci.invoice_no ) tmp
group by
	tmp.serial_number ;
-- Parameters: 11034(Long), null, N8000162(String)
-- 销售方 salesInvoiceCompay
-- 销售价格 salesInvoiceMoney

-- // 子公司销售核销信息 
select
	wo.truck_id truckId,
	wo.write_off_type writeOffType,
	SUM(wod.used_amount) writeOffMoney,
	STR_TO_DATE(ci.payment_date,
	'%Y%m%d') writeOffDate,
	ci.payment_client paymentClient
from
	write_off wo -- 核销[报销]
left join write_off_detail wod on -- 核销详情
	wod.write_off_id = wo.id
left join capital_inflow ci on -- -- [资金流入]
	ci.id = wod.inflow_id
where
	ci.belong = 'base'
	and wo.truck_id = 11034
group by
	wo.write_off_type; 
-- Parameters: base(String), 11034(Long)
-- truckId	writeOffType	writeOffMoney	writeOffDate	paymentClient
-- 11,034	挂账	5,000	2022-02-17	包头市海泰汽车贸易有限公司

-- 客户已付定金  subcompanyDownPrice 定金支付日期 subcompanyDownPriceDate
-- 客户尾款 subcompanyTailPrice 回款日期 subcompanyTailPriceDate

```
### 调账申请
#### 待审核
- http://127.0.0.1:8081/adjustment/index?status=0
```
URI_S_20220531202250145: /adjustment/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["0"]}, body: null
==>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type FROM sys_menu where parent_id = ? and system_type <> 2 order by order_num asc 
==> Parameters: 0(Long)
<==      Total: 12
URI_E_20220531202250145: /adjustment/index, time: 44, 
	|--reponse: "adjustment/index" 
```
- http://127.0.0.1:8081/adjustment/getApplyData?pageSize=10&pageNo=0&status=0
```
URI_S_20220531202250711: /adjustment/getApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"status":["0"]}, body: [{"pageNo":0,"pageSize":10,"status":"0"},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999770703,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM data_adjustment WHERE status = ? 
==> Parameters: 0(String)
<==      Total: 1
URI_E_20220531202250711: /adjustment/getApplyData, time: 25, 
	|--reponse: {"endRow":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,"list":[],"navigatePages":8,"navigatepageNums":[],"nextPage":0,"pageNum":0,"pageSize":10,"pages":0,"prePage":0,"size":0,"startRow":0,"total":0} 

```
#### 已完成
- http://127.0.0.1:8081/adjustment/index?status=2
```
URI_S_20220531202443722: /adjustment/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["2"]}, body: null
==>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type FROM sys_menu where parent_id = ? and system_type <> 2 order by order_num asc 
==> Parameters: 0(Long)
<==      Total: 12
URI_E_20220531202443722: /adjustment/index, time: 28, 
	|--reponse: "adjustment/index" 

```
- http://127.0.0.1:8081/adjustment/getApplyData?pageSize=10&pageNo=0&status=2
```
URI_S_20220531202444152: /adjustment/getApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"status":["2"]}, body: [{"pageNo":0,"pageSize":10,"status":"2"},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999884104,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM data_adjustment WHERE status = ? 
==> Parameters: 2(String)
<==      Total: 1
==>  Preparing: select id, apply_no, status, current_check_status, current_check_user, case operation_status when 2 then "已调账" when 1 then "不予调账" else "未调账" end operation_status, remark, agency_code, create_user, create_time, update_user, update_time, content,account from data_adjustment WHERE status = ? limit ?,? 
==> Parameters: 2(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531202444152: /adjustment/getApplyData, time: 102, 
	|--reponse: {"endRow":10,"firstPage":1,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"lastPage":4,"list":[{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210419001","content":"[付款金额]","createTime":1618823099000,"createUser":110,"currentCheckStatus":"已完成","currentCheckUser":"-","id":1,"operationStatus":"已调账","status":"2","updateTime":1618823144000,"updateUser":152},{"account":"钱千水","agencyCode":"20190724162907561293","applyNo":"TZ20210423001","content":"[新疆奥联运输有限公司, 新疆九鼎大漠星汽车贸易有限公司, 石河子开发区光顺物流有限公司]","createTime":1619148615000,"createUser":104,"currentCheckStatus":"已完成","currentCheckUser":"-","id":3,"operationStatus":"已调账","status":"2","updateTime":1619157527000,"updateUser":152},{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210426001","content":"[定金]","createTime":1619428607000,"createUser":110,"currentCheckStatus":"已完成","currentCheckUser":"-","id":4,"operationStatus":"已调账","status":"2","updateTime":1619428734000,"updateUser":152},{"account":"李轶琨","agencyCode":"20190730184136956746","applyNo":"TZ20210427001","content":"[销售单价]","createTime":1619507469000,"createUser":94,"currentCheckStatus":"已完成","currentCheckUser":"-","id":5,"operationStatus":"已调账","status":"2","updateTime":1619508708000,"updateUser":152},{"account":"王彬","agencyCode":"20190730184852711095","applyNo":"TZ20210601001","content":"[已售车辆调成渠道库存]","createTime":1622519558000,"createUser":106,"currentCheckStatus":"已完成","currentCheckUser":"-","id":9,"operationStatus":"已调账","status":"2","updateTime":1622526935000,"updateUser":152},{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210602001","content":"[退库操间]","createTime":1622614392000,"createUser":110,"currentCheckStatus":"已完成","currentCheckUser":"-","id":10,"operationStatus":"已调账","status":"2","updateTime":1623116277000,"updateUser":152},{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210603001","content":"[退库时间]","createTime":1622705781000,"createUser":110,"currentCheckStatus":"已完成","currentCheckUser":"-","id":11,"operationStatus":"已调账","status":"2","updateTime":1623116286000,"updateUser":152},{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210608001","content":"[流水号]","createTime":1623132723000,"createUser":110,"currentCheckStatus":"已完成","currentCheckUser":"-","id":12,"operationStatus":"已调账","status":"2","updateTime":1623133233000,"updateUser":152},{"account":"刘 莉","agencyCode":"20190724162907561293","applyNo":"TZ20210608002","content":"[车架号/流水号]","createTime":1623136607000,"createUser":101,"currentCheckStatus":"已完成","currentCheckUser":"-","id":13,"operationStatus":"已调账","status":"2","updateTime":1623137501000,"updateUser":152},{"account":"马媛","agencyCode":"20190730184852711095","applyNo":"TZ20210609001","content":"[银行流水号]","createTime":1623218960000,"createUser":107,"currentCheckStatus":"已完成","currentCheckUser":"-","id":14,"operationStatus":"未调账","status":"2","updateTime":1623376242000,"updateUser":152}],"navigatePages":8,"navigatepageNums":[1,2,3,4],"nextPage":2,"pageNum":1,"pageSize":10,"pages":4,"prePage":0,"size":10,"startRow":1,"total":33} 

```
#### 已驳回
- http://127.0.0.1:8081/adjustment/index?status=1
```
URI_S_20220531202617405: /adjustment/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"status":["1"]}, body: null
==>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type FROM sys_menu where parent_id = ? and system_type <> 2 order by order_num asc 
==> Parameters: 0(Long)
<==      Total: 12
URI_E_20220531202617405: /adjustment/index, time: 21, 
	|--reponse: "adjustment/index" 
```
- http://127.0.0.1:8081/adjustment/getApplyData?pageSize=10&pageNo=0&status=1
```
URI_S_20220531202617870: /adjustment/getApplyData,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"pageSize":["10"],"pageNo":["0"],"status":["1"]}, body: [{"pageNo":0,"pageSize":10,"status":"1"},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1653999977869,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT count(0) FROM data_adjustment WHERE status = ? 
==> Parameters: 1(String)
<==      Total: 1
==>  Preparing: select id, apply_no, status, current_check_status, current_check_user, case operation_status when 2 then "已调账" when 1 then "不予调账" else "未调账" end operation_status, remark, agency_code, create_user, create_time, update_user, update_time, content,account from data_adjustment WHERE status = ? limit ?,? 
==> Parameters: 1(String), 0(Integer), 10(Integer)
<==      Total: 7
URI_E_20220531202617870: /adjustment/getApplyData, time: 85, 
	|--reponse: {"endRow":7,"firstPage":1,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"lastPage":1,"list":[{"account":"李志华","agencyCode":"20190730184345661796","applyNo":"TZ20210420001","content":"[付款金额]","createTime":1618881934000,"createUser":110,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":2,"operationStatus":"未调账","status":"1","updateTime":1618883941000,"updateUser":152},{"account":"马媛","agencyCode":"20190730184852711095","applyNo":"TZ20210616001","content":"[银行流水号]","createTime":1623822491000,"createUser":107,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":17,"operationStatus":"未调账","status":"1","updateTime":1623834210000,"updateUser":106},{"account":"张美","agencyCode":"20190730184702579901","applyNo":"TZ20210628003","content":"[收款核销凭证]","createTime":1624877613000,"createUser":99,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":75,"operationStatus":"未调账","status":"1","updateTime":1624930922000,"updateUser":152},{"account":"张美","agencyCode":"20190730184702579901","applyNo":"TZ20210628004","content":"[收款核销凭证]","createTime":1624877734000,"createUser":99,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":76,"operationStatus":"未调账","status":"1","updateTime":1624935276000,"updateUser":152},{"account":"樊子轩","agencyCode":"20190730184702579901","applyNo":"TZ20210629001","content":"[/]","createTime":1624929550000,"createUser":97,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":77,"operationStatus":"未调账","status":"1","updateTime":1624929573000,"updateUser":97},{"account":"樊子轩","agencyCode":"20190730184702579901","applyNo":"TZ20210629002","content":"[应收车款挂账申请]","createTime":1624929633000,"createUser":97,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":78,"operationStatus":"未调账","status":"1","updateTime":1624935258000,"updateUser":152},{"account":"张美","agencyCode":"20190730184702579901","applyNo":"TZ20210630001","content":"[BJDY2021062902]","createTime":1625039646000,"createUser":99,"currentCheckStatus":"已驳回","currentCheckUser":"-","id":81,"operationStatus":"未调账","status":"1","updateTime":1625125829000,"updateUser":152}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":7,"startRow":1,"total":7} 

```
### 25 逾期报表
#### 逾期日报表
- http://127.0.0.1:8081/report/overdueList
```
URI_S_20220531202829556: /report/overdueList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
查看逾期报表，实时数据----
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = ? and status = "0" 
==> Parameters: 0(String)
<==      Total: 22
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
==>  Preparing: SELECT count(0) FROM (SELECT say.agency_name, oaa.agency_code, oi.contact_no, CONCAT(ot.truck_type_name, ot.platet_type_name) truck_type_name, ot.truck_type_id, oaad.truck_id, ii.serial_number, oaad.on_account_money on_account_price, str_to_date(REPLACE(REPLACE(REPLACE(oaa.on_account_date, '年', '-'), '月', '-'), '日', ''), '%Y-%m-%d') on_account_date, otsi.on_account_leave, otsi.on_account_cancel, otsi.down_price, otsi.down_price_cancel FROM on_account_apply oaa INNER JOIN on_account_apply_detail oaad ON oaad.apply_no = oaa.apply_no INNER JOIN order_truck_sell_info otsi ON otsi.truck_id = oaad.truck_id INNER JOIN incoming_info ii ON otsi.truck_id = ii.truck_id INNER JOIN order_info oi ON oi.id = otsi.order_id INNER JOIN order_truck ot ON ot.id = oaad.truck_id INNER JOIN sys_agency say ON say.agency_code_ours = otsi.agency_code WHERE oaad.is_reject = 0 AND oaa.apply_to = 0 AND otsi.on_account_leave > 0 AND str_to_date(REPLACE(REPLACE(REPLACE(oaa.on_account_date, '年', '-'), '月', '-'), '日', ''), '%Y-%m-%d') < now() AND oaa.agency_code = otsi.agency_code GROUP BY oaad.truck_id) table_count 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT say.agency_name,oaa.agency_code,oi.contact_no,CONCAT(ot.truck_type_name,ot.platet_type_name) truck_type_name,ot.truck_type_id,oaad.truck_id,ii.serial_number,oaad.on_account_money on_account_price,str_to_date(REPLACE(REPLACE(REPLACE(oaa.on_account_date,'年','-'),'月','-'),'日',''),'%Y-%m-%d') on_account_date,otsi.on_account_leave,otsi.on_account_cancel,otsi.down_price,otsi.down_price_cancel from on_account_apply oaa INNER JOIN on_account_apply_detail oaad on oaad.apply_no= oaa.apply_no INNER JOIN order_truck_sell_info otsi on otsi.truck_id = oaad.truck_id INNER JOIN incoming_info ii on otsi.truck_id = ii.truck_id INNER JOIN order_info oi on oi.id = otsi.order_id INNER JOIN order_truck ot on ot.id = oaad.truck_id INNER JOIN sys_agency say on say.agency_code_ours = otsi.agency_code where oaad.is_reject = 0 and oaa.apply_to = 0 and otsi.on_account_leave > 0 and str_to_date(REPLACE(REPLACE(REPLACE(oaa.on_account_date,'年','-'),'月','-'),'日',''),'%Y-%m-%d') < now() and oaa.agency_code = otsi.agency_code GROUP BY oaad.truck_id ORDER BY str_to_date(REPLACE(REPLACE(REPLACE(oaa.on_account_date,'年','-'),'月','-'),'日',''),'%Y-%m-%d') desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000167(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11039(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000144(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11016(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000153(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11025(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000162(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11034(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000171(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11043(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000139(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11011(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000148(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11020(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000157(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11029(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000166(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11038(Long), 挂账(String)
<==      Total: 1
==>  Preparing: select d.id, d.apply_no, d.invoice_date, CONCAT(d.invoice_no) invoice_no, sum(d.invoice_money) invoice_money,sum(d.invoice_notax_money) invoice_notax_money, d.capitalization, d.create_user, d.create_time, d.update_user, d.update_time,d.invoice_type from invoice_apply_detail d where d.serial_number = ? group by d.serial_number 
==> Parameters: N8000175(String)
<==      Total: 1
==>  Preparing: SELECT wof.write_off_time, sum(wof.used_amount) used_amount, wof.write_off_type FROM write_off wof LEFT JOIN write_off_detail wod on wod.write_off_id = wof.id LEFT JOIN capital_inflow cif on cif.id = wod.inflow_id where wof.truck_id= ? and wof.write_off_type=? and cif.belong ="base" group by wof.truck_id 
==> Parameters: 11047(Long), 挂账(String)
<==      Total: 1
URI_E_20220531202829556: /report/overdueList, time: 273, 
	|--reponse: "report/report_overdue_day" 

```
#### 逾期月报表 异常
- http://127.0.0.1:8081/report/overdueMonthList
```

```


## 客户管理
### 客户信息维护
- http://127.0.0.1:8081/agency/client/index
```
URI_S_20220531203141186: /agency/client/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = "0" 
==> Parameters: 
<==      Total: 22
==>  Preparing: SELECT count(0) FROM sys_agency_client 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, agency_code, client_no, modify_status, client_name, client_type, client_phone, client_driver, client_driver_phone, vin_short, factory_no, vin, truck_type, product_line, truck_no, sell_time, sell_year, sell_month, truck_company, truck_code, engine, engine_no, horsepower, fuel_type, emission_standard, contract_no, yx_contract_no, sell_company, sell_way, business_leader, business_leader_phone, legal_person_name, legal_person_id_no, legal_person_id_img, license_img, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_user, create_time, update_user, udpate_time,client_address from sys_agency_client order by create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: insert into sys_log_operation (id, modul, type, `describe`, user_id, user_name, method, uri, ip, create_time, version, request_param, response_param ) values (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) 
==> Parameters: 23ae6b3d-482b-4cc5-bed5-4004073ba81d(String), 客户信息(String), 查询(String), 进入客户信息列表进行查询(String), 1(String), 系统操作员-总部(String), com.clgg.modules.system.controller.AgencyClientController.index(String), /agency/client/index(String), 127.0.0.1(String), 2022-05-31 20:31:41.283(Timestamp), ${version}(String), {}(String), "agency/client_index"(String)
<==    Updates: 1
==>  Preparing: SELECT LAST_INSERT_ID() 
==> Parameters: 
<==      Total: 1
URI_E_20220531203141186: /agency/client/index, time: 117, 
	|--reponse: "agency/client_index" 

```
### 报修信息提报 异常
- 
```

```
### 客户回访列表 异常
- 
```

```

## 车轮滚滚订单管理
### 整车意向单
- http://127.0.0.1:8081/intention/list
```
URI_S_20220531203431184: /intention/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = "0" 
==> Parameters: 
<==      Total: 22
URI_E_20220531203431184: /intention/list, time: 668, 
	|--reponse: "intention/list" 

```
### 后市场意向单
- http://127.0.0.1:8081/intention/productList
```
URI_S_20220531203530689: /intention/productList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = "0" 
==> Parameters: 
<==      Total: 22
URI_E_20220531203530689: /intention/productList, time: 202, 
	|--reponse: "intention/product_list" 

```

## 资源维护
### 车型配置维护
- http://127.0.0.1:8081/truck_type/list

```
URI_S_20220531203659662: /truck_type/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1654000531248,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 14
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type WHERE status = ? order by name 
==> Parameters: 0(String)
<==      Total: 10
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
URI_E_20220531203659662: /truck_type/list, time: 40, 
	|--reponse: "basic_config/truck_type" 
```
- http://127.0.0.1:8081/api/system/basic/pdList?order=asc
- http://127.0.0.1:8081/api/system/basic/ptList?order=asc
- http://127.0.0.1:8081/api/system/basic/ttList?order=asc
- http://127.0.0.1:8081/api/system/basic/bcList?productTypeId=&platetTypeId=&truckTypeId=&publicType=&truckCode=
```
URI_S_20220531203700122: /api/system/basic/ptList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"order":["asc"]}, body: []
URI_S_20220531203700171: /api/system/basic/pdList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"order":["asc"]}, body: []
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from plate_type order by name 
==> Parameters: 
URI_S_20220531203700189: /api/system/basic/ttList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"order":["asc"]}, body: []
<==      Total: 11
URI_E_20220531203700122: /api/system/basic/ptList, time: 68, 
	|--reponse: [{"createDate":1593591664000,"createUser":1,"id":7,"name":"LNG牵引车","status":"0"},{"id":10,"name":"LNG自卸车","status":"0","updateData":1606119306000,"updateUser":1},{"createDate":1640572365000,"createUser":152,"id":11,"name":"上汽红岩牵引","status":"0"},{"createDate":1574220092000,"createUser":1,"id":5,"name":"专用车","status":"0"},{"id":1,"name":"牵引车","status":"0"},{"id":4,"name":"牵引车-危化品","status":"0"},{"createDate":1598319845000,"createUser":126,"id":8,"name":"电动车","status":"0"},{"createDate":1598319866000,"createUser":126,"id":9,"name":"电动车-电加热","status":"0"},{"id":3,"name":"自卸车","status":"0"},{"id":6,"name":"载货","updateData":1603942717000,"updateUser":81},{"id":2,"name":"载货车","status":"0","updateData":1593828414000,"updateUser":106}] 
URI_S_20220531203700206: /api/system/basic/bcList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"productTypeId":[""],"platetTypeId":[""],"truckTypeId":[""],"publicType":[""],"truckCode":[""]}, body: [{"platetTypeId":"","productTypeId":"","publicType":"","truckCode":"","truckTypeId":""}]
==>  Preparing: select c.id, c.name, c.product_type_name, c.product_type_id, c.platet_type_name, c.platet_type_id, c.truck_code, c.version, c.market_type, c.truck_type_name, c.truck_type_id, c.public_type, c.engine_type, c.horsepower, c.wheel_base, c.cab_type, c.speed_changing_box, c.frame, c.front_axle, c.behand_axle, c.front_spring, c.behand_spring, c.fuel_tank, c.tyre_type, c.remark, c.status, c.create_user, c.create_date, c.update_user, c.update_data, c.saddle, c.choose_config, c.chassis_deadweight, c.total_weight, c.config_description, c.use_road, c.load_weight, c.load_speed, c.climb_angle, c.container_size, c.excel_remark, c.manufactor_id, bce.id electricId, bce.motor_type,bce.battery_type,bce.axle_type,bce.spring_type,bce.contanizer_size,bce.speed_type,bce.endurance,bce.scenarios,bce.remark ele_remark from basic_config c left join basic_config_electric bce on bce.basic_config_id = c.id order by c.id desc 
==> Parameters: 
<==      Total: 780
URI_E_20220531203700206: /api/system/basic/bcList, time: 273, 
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from truck_type where status = ? 
==> Parameters: 0(String)
<==      Total: 51
URI_E_20220531203700189: /api/system/basic/ttList, time: 1031, 
	|--reponse: [{"id":1,"name":"轩德3系64QY","status":"0","updateData":1594006444000,"updateUser":45},{"id":2,"name":"轩德6系42QY","status":"0"},{"id":3,"name":"轩德3系62WL","status":"0"},{"id":4,"name":"轩德3系42WL","status":"0"},{"id":5,"name":"轩德6系62WL","status":"0"},{"id":6,"name":"轩德6系42WL","status":"0"},{"id":7,"name":"轩德3系64ZX","status":"0"},{"id":8,"name":"轩德3系42QY","status":"0"},{"id":9,"name":"轩德3系84ZX","status":"0"},{"id":12,"name":"轩德3系84WL","status":"0"},{"id":13,"name":"轩德9系42WL","status":"0","updateData":1603942647000,"updateUser":81},{"id":14,"name":"轩德6系84ZY","status":"0"},{"id":15,"name":"轩德6系64ZY","status":"0"},{"id":16,"name":"轩德6系42ZY","status":"0"},{"id":17,"name":"轩德9系42ZY","status":"0"},{"createDate":1592272403000,"createUser":64,"id":18,"name":"轩德翼6/84ZY","status":"0"},{"id":19,"name":"轩德6系42ZX","status":"0"},{"id":20,"name":"轩德6系62ZX","status":"0"},{"id":21,"name":"轩德6系84WL","status":"0"},{"id":22,"name":"轩德6系84ZX","status":"0"},{"id":24,"name":"轩德9系42ZX","status":"0"},{"id":25,"name":"轩德3系64QY-X3L","status":"0"},{"id":26,"name":"轩德翼3/42WL","status":"0"},{"id":27,"name":"轩德翼3/62WL","status":"0"},{"id":28,"name":"轩德翼3/64QY","status":"0"},{"id":30,"name":"轩德翼3/64ZX","status":"0"},{"id":32,"name":"轩德翼3/84ZX","status":"0"},{"id":34,"name":"轩德翼3/42QY","status":"0"},{"id":35,"name":"轩德翼3/64ZY","status":"0"},{"id":37,"name":"轩德翼6/84ZX","status":"0","updateData":1615258668000,"updateUser":1},{"createDate":1596788146000,"createUser":81,"id":40,"name":"1801项目","status":"0"},{"id":42,"name":"轩德E9 42WL","status":"0","updateData":1622193609000,"updateUser":152},{"createDate":1597890499000,"createUser":20,"id":43,"name":"陕重汽X3000","status":"0"},{"id":44,"name":"轩德翼9/42WL","status":"0"},{"id":45,"name":"轩德翼3/84WL","status":"0"},{"id":46,"name":"轩德翼6/64ZY","status":"0","updateData":1603937000000,"updateUser":81},{"id":47,"name":"轩德翼6/42ZY","status":"0","updateData":1603938586000,"updateUser":81},{"createDate":1606117660000,"createUser":1,"id":49,"name":"轩德翼6/42WL","status":"0"},{"createDate":1606121740000,"createUser":1,"id":50,"name":"陕重汽M3000","status":"0"},{"createDate":1607655691000,"createUser":1,"id":51,"name":"轩德翼6/62WL","status":"0"},{"createDate":1608712570000,"createUser":1,"id":52,"name":"轩德翼6/42ZX","status":"0"},{"createDate":1620638032000,"createUser":152,"id":54,"name":"轩德翼6/62ZX","status":"0"},{"createDate":1623747666000,"createUser":152,"id":55,"name":"陕重汽L3000","status":"0"},{"createDate":1625820155000,"createUser":152,"id":56,"name":"陕重汽F3000","status":"0"},{"createDate":1629173167000,"createUser":152,"id":57,"name":"轩德6系64ZX","status":"0"},{"createDate":1629856674000,"createUser":152,"id":58,"name":"陕重汽M3000S","status":"0"},{"createDate":1640571749000,"createUser":152,"id":59,"name":"64QY","status":"0"},{"createDate":1644816911000,"createUser":152,"id":60,"name":"轩德翼3L","status":"0"},{"createDate":1644912778000,"createUser":152,"id":61,"name":"轩德翼3/84ZY","status":"0"},{"createDate":1645079675000,"createUser":152,"id":62,"name":"轩德翼6/62ZY","status":"0"},{"createDate":1645411305000,"createUser":152,"id":63,"name":"轩德9系62ZX","status":"0"}] 
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type order by name 
==> Parameters: 
<==      Total: 14
URI_E_20220531203700171: /api/system/basic/pdList, time: 2053, 
	|--reponse: [{"createDate":1604472008000,"createUser":20,"id":32,"name":"上装","status":"0"},{"createDate":1640570576000,"createUser":152,"id":58,"name":"其他品牌","status":"0","updateData":1640571591000,"updateUser":152},{"createDate":1648816614000,"createUser":152,"id":60,"name":"北奔","status":"0"},{"createDate":1622514891000,"createUser":152,"id":34,"name":"国5-常规","status":"0"},{"createDate":1622514911000,"createUser":152,"id":35,"name":"国5-康机","status":"0"},{"id":37,"name":"国5-电动车","status":"0"},{"id":36,"name":"国5-陕重汽","status":"0"},{"createDate":1589359340000,"createUser":106,"id":30,"name":"常规车","status":"0"},{"createDate":1556213370000,"id":1,"name":"康明斯产品","status":"0","updateData":1593847066000,"updateUser":79},{"createDate":1604472013000,"createUser":20,"id":33,"name":"挂车","status":"0"},{"createDate":1587020005000,"createUser":1,"id":29,"name":"电动车","status":"0"},{"createDate":1648816586000,"createUser":152,"id":59,"name":"红岩","status":"0","updateData":1648816833000,"updateUser":152},{"createDate":1597828713000,"createUser":81,"id":31,"name":"陕重汽","status":"0"},{"createDate":1626313536000,"id":56,"name":"陕重汽F3000","status":"0"}] 

```
### 价格维护
- http://127.0.0.1:8081/price/list
```
URI_S_20220531204232308: /price/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM product_prices 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, prices_name, product_type_name, product_type_id, platet_type_name, platet_type_id, truck_type_name, truck_type_id, truck_code, money, useful_time, unuseful_time, status, create_user, create_date, update_user, update_data, market_price, online_price,public_type, down_price,policy_name,fare from product_prices order by id desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531204232308: /price/list, time: 76, 
	|--reponse: "basic_config/price" 

```
### 公告型号维护
- http://127.0.0.1:8081/public/index
```
URI_S_20220531204345633: /public/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1654000952870,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
URI_E_20220531204345633: /public/index, time: 4, 
	|--reponse: "basic_config/public_type" 
```
- http://127.0.0.1:8081/public/ptList?publicType=&vmodel=
```
URI_S_20220531204345920: /public/ptList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"publicType":[""],"vmodel":[""]}, body: [{"publicType":"","vmodel":""}]
查询公告型号列表
==>  Preparing: select id, public_type, vin_code, certificate_no, engine_number, v_model, v_type, v_color, v_engine, v_size, v_container_size, v_wheel_base, v_tread_size, v_tyre_type, v_plate_spring, v_rated_weight, v_all_weight, v_weight_use_number, v_trailer_weight, v_other_weight, v_most_weight, v_people_number,remark from public_type order by create_time desc 
==> Parameters: 
<==      Total: 20
==>  Preparing: select id, public_type, chassis_type, chassis_model, chassis_vin, chassis_color, chassis_engine_model_no, chassis_engine_no, chassis_fuel_type, chassis_outline_size, chassis_container_size, chassis_spring_number, chassis_trye, chassis_tread_front, chassis_tread_back, chassis_wheelbase, chassis_curb_weight, chassis_load_weight, chassis_load_factor, chassis_load_people_numbers, chassis_saddle_load_weight, chassis_trailer_total_weight from public_type_chassis order by public_type 
==> Parameters: 
<==      Total: 9
URI_E_20220531204345920: /public/ptList, time: 52, 
	|--reponse: [{"id":1024,"publicType":"SX4250MPN384","remark":"","vAllWeight":"8850","vColor":"红色","vContainerSize":"/","vEngine":"6K1346N-60","vModel":"SX4250MPN384","vMostWeight":"/","vOtherWeight":"16020","vPeopleNumber":"2","vPlateSpring":"2/3","vRatedWeight":"/","vSize":"7410*2550*3640","vTrailerWeight":"40000","vTreadSize":"2067 1860/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"/","vWheelBase":"3775+1350"},{"id":1004,"publicType":"SX1040NP5331","remark":"","vAllWeight":"2565","vColor":"金属蓝","vContainerSize":"4150*2300*400","vEngine":"ISF2.8S518T","vModel":"SX1045E1K15B3310","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"3","vPlateSpring":"2/2+1","vRatedWeight":"1735","vSize":"5995*2400*2450","vTrailerWeight":"/","vTreadSize":"1680/1590","vType":"整车","vTyreType":"7.50R16LT/6PR加强/无内","vWeightUseNumber":"0.75","vWheelBase":"3300"},{"id":1002,"publicType":"SX4250MP5334","remark":"","vAllWeight":"8200","vColor":"黄色","vContainerSize":"/","vEngine":"ISM11E5 440","vModel":"SX4250MP5334","vMostWeight":"/","vOtherWeight":"16670","vPeopleNumber":"2","vPlateSpring":"2/3","vRatedWeight":"/","vSize":"6825*2550*3580","vTrailerWeight":"40000","vTreadSize":"2067/1860/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"/","vWheelBase":"3175+1350"},{"id":1017,"publicType":"SX3310MB246（5.8米）","remark":"","vAllWeight":"15500","vColor":"绿色","vContainerSize":"5800*2350*1500","vEngine":"8600*2550*3450","vModel":"SX3310MB246","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"14/14/12","vRatedWeight":"15370","vSize":"8600*2550*3450","vTrailerWeight":"/","vTreadSize":"2070/2070 1860/1860","vType":"整车","vTyreType":"12.00R20 18PR","vWeightUseNumber":"1.00","vWheelBase":"1800+2375+1400"},{"id":1009,"publicType":"SX4250X3L","remark":"","vAllWeight":"8600","vColor":"红色","vContainerSize":"/","vEngine":"ISM11E5 440","vModel":"SX4250X3L","vMostWeight":"/","vOtherWeight":"16270","vPeopleNumber":"2","vPlateSpring":"3/4","vRatedWeight":"/","vSize":"6875×2550×3900","vTrailerWeight":"40000","vTreadSize":"2060  1860/1860","vType":"整车","vTyreType":"12R22.5","vWeightUseNumber":"/","vWheelBase":"3275+1350"},{"id":1003,"publicType":"SX5250CCYMP5","remark":"","vAllWeight":"10900","vColor":"红色","vContainerSize":"9500*2450*600","vEngine":"ISD270 50","vModel":"SX5250CCYMP5","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"10/10/10+6","vRatedWeight":"13970","vSize":"12000*2550*3990","vTrailerWeight":"/","vTreadSize":"2023/2023/1860","vType":"整车","vTyreType":"12R22.5","vWeightUseNumber":"1.29","vWheelBase":"1800+5400"},{"id":1005,"publicType":"SX5250XXYMP5","remark":"","vAllWeight":"11500","vColor":"白色","vContainerSize":"9500*2450*2600","vEngine":"ISD270 50","vModel":"SX5250XXYMP5","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"10/10/10+6","vRatedWeight":"13370","vSize":"12000*2550*3990","vTrailerWeight":"/","vTreadSize":"2023/2023/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"1.17","vWheelBase":"1800+5400"},{"id":1006,"publicType":"SX3310MB326","remark":"","vAllWeight":"15500","vColor":"绿色","vContainerSize":"6500*2350*1500","vEngine":"ISM11E5 385","vModel":"SX3310MB326","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"14/14/12","vRatedWeight":"15370","vSize":" 9550×2550×3450","vTrailerWeight":"/","vTreadSize":"2070/2070 1860/1860","vType":"整车","vTyreType":"12.00R20/18PR","vWeightUseNumber":"1.00","vWheelBase":"1800+3175+1400"},{"id":1007,"publicType":"SX5182CCYGP51","remark":"","vAllWeight":"7815","vColor":"红色","vContainerSize":"6750*2450*600","vEngine":"ISD190 50","vModel":"SX5182CCYGP51","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"3","vPlateSpring":"9/10+8","vRatedWeight":"9990","vSize":"9000*2550*3050","vTrailerWeight":"/","vTreadSize":"前1940/后1810","vType":"整车","vTyreType":"10.00R20","vWeightUseNumber":"1.30","vWheelBase":"5000"},{"id":1008,"publicType":"SX1310MP5","remark":"","vAllWeight":"12600","vColor":"红色","vContainerSize":"9500*2450*600","vEngine":"ISM11E5 385","vModel":"SX1310MP5","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"9/9+10","vRatedWeight":"18270","vSize":"12000*2550*3650","vTrailerWeight":"/","vTreadSize":"2023/2023/1860/1860","vType":"整车","vTyreType":"11.00R20","vWeightUseNumber":"1.46","vWheelBase":"1800+4170+1350"},{"id":1010,"publicType":"SX4180MP536","remark":"","vAllWeight":"6400","vColor":"红色","vContainerSize":"/","vEngine":"ISL9.5-340E51A","vModel":"SX4180MP536","vMostWeight":"/","vOtherWeight":"11470","vPeopleNumber":"2","vPlateSpring":"3/4+3","vRatedWeight":"/","vSize":"6120×2500×3810","vTrailerWeight":"35405","vTreadSize":"2023/1860","vType":"整车","vTyreType":"12R22.5","vWeightUseNumber":"/","vWheelBase":"3600"},{"id":1011,"publicType":"SX1182GP5L","remark":"","vAllWeight":"7315 ","vColor":"红色","vContainerSize":"6750×2450×600","vEngine":"ISD180 50","vModel":"SX1182GP5L","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"9/10+8","vRatedWeight":"9990","vSize":"9000×2550×3050","vTrailerWeight":"/","vTreadSize":"前1940/后1810","vType":"整车","vTyreType":"10.00R20","vWeightUseNumber":"1.39","vWheelBase":"5000"},{"id":1012,"publicType":"SX3310MB246","remark":"","vAllWeight":"15500","vColor":"白色","vContainerSize":"5600*2350*1500","vEngine":"ISM11E5 385","vModel":"SX3310MB246","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"14/14/12","vRatedWeight":"15370","vSize":"8400*2550*3450","vTrailerWeight":"/","vTreadSize":"2070/2070 1860/1860","vType":"整车","vTyreType":"12.00R20/18PR","vWeightUseNumber":"1.00","vWheelBase":"1800+2375+1400"},{"id":1014,"publicType":"SX4259MD4TWQ1","remark":"该车适用于牵引危险品运输半挂车，装前排气，危险品标志灯。","vAllWeight":"8800","vColor":"珍珠白","vContainerSize":"-","vEngine":"WP13NG430E61","vModel":"SX4259GV384TW","vMostWeight":"-","vOtherWeight":"16070","vPeopleNumber":"2","vPlateSpring":"2/-/-","vRatedWeight":"-","vSize":"7460*2550*3720","vTrailerWeight":"40000","vTreadSize":"2070/1860/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"-","vWheelBase":"3775+1400"},{"id":1015,"publicType":"SX4259MD4TLWQ1","remark":"该车适用于牵引危险品运输半挂车，装前排气，危险品标志灯。","vAllWeight":"8800","vColor":"珠光钼红","vContainerSize":"-","vEngine":"WP13NG430E61","vModel":"SX4259GV384TLW","vMostWeight":"-","vOtherWeight":"16070","vPeopleNumber":"2","vPlateSpring":"2/-/-","vRatedWeight":"-","vSize":"7460*2550*3720","vTrailerWeight":"40000","vTreadSize":"2070/1860/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"-","vWheelBase":"3775+1400"},{"id":1016,"publicType":"SX5180XXYMP5","remark":"","vAllWeight":"8870","vColor":"红色","vContainerSize":"9500×2450×2650","vEngine":"ISD270 50","vModel":"SX5180XXYMP5","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"3/4+3","vRatedWeight":"9000","vSize":"12000×2550×3995","vTrailerWeight":"/","vTreadSize":"2023/1860","vType":"整车","vTyreType":"12R22.5 18PR","vWeightUseNumber":"1.02","vWheelBase":"7475"},{"id":1018,"publicType":"SX3310MB406","remark":"","vAllWeight":"15500","vColor":"黄色","vContainerSize":"7600*2350*1500","vEngine":"ISM11E5 385","vModel":"SX3310MB406","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"14/14/12","vRatedWeight":"15370","vSize":"9700*2550*3450","vTrailerWeight":"/","vTreadSize":"2070/2070 1860/1860","vType":"整车","vTyreType":"12.00R20 18PR","vWeightUseNumber":"1.00","vWheelBase":"1800+3975+1400"},{"id":1019,"publicType":"SX5040XLCNP5331","remark":"","vAllWeight":"3200","vColor":"白色","vContainerSize":"4060*2300*2300","vEngine":"ISF2.8S5148T","vModel":"SX1045E1K15B3310","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"2","vPlateSpring":"前2后2+1","vRatedWeight":"1165","vSize":"5995*2440*3410","vTrailerWeight":"/","vTreadSize":"1680/1590","vType":"整车","vTyreType":"7.00R16LT 8PR","vWeightUseNumber":"/","vWheelBase":"3300"},{"id":1021,"publicType":"SX5040CCYNP5331","remark":"","vAllWeight":"2720","vColor":"中国红","vContainerSize":"-","vEngine":"D25TCIE10","vModel":"SX1045E1N14H3310","vMostWeight":"-","vOtherWeight":"-","vPeopleNumber":"2","vPlateSpring":"75*9*8/75*11*8/75*9*6","vRatedWeight":"1580，1645","vSize":"5995*2100,2200,2300,2400,2500*2950*3050*3150*3250*3350","vTrailerWeight":"-","vTreadSize":"1760/1800","vType":"整车","vTyreType":"7.50R16LT/6PR加强型/无内/","vWeightUseNumber":"0.65","vWheelBase":"3300"},{"id":1023,"publicType":"SX5040XXYNP5331","remark":"","vAllWeight":"2805","vColor":"珍珠白（不套色）","vContainerSize":"4150×2300×2200","vEngine":"D30TCIE4","vModel":"SX1045E1N16F3311","vMostWeight":"/","vOtherWeight":"/","vPeopleNumber":"3","vPlateSpring":"8/8+6","vRatedWeight":"1495","vSize":"5995×2400×3250","vTrailerWeight":"/","vTreadSize":"1760/1800","vType":"整车","vTyreType":"7.50R16LT 6PR","vWeightUseNumber":"0.6","vWheelBase":"3300"},{"id":2,"publicType":"SX1040NP5331","vColor":"","vModel":"SX1040NP5331","vType":"底盘"},{"id":9,"publicType":"SX1040NP5331","vColor":"白色","vModel":"SX1045E1K15B3310","vType":"底盘"},{"id":7,"publicType":"SX1180MP5","vColor":"红色","vModel":"SX1180MP5","vType":"底盘"},{"id":5,"publicType":"SX1182GP5","vColor":"红色","vModel":"SX1182GP5","vType":"底盘"},{"id":1,"publicType":"SX1250MP5","vColor":"","vModel":"SX1250MP5","vType":"底盘"},{"id":4,"publicType":"SX1310MP5","vColor":"红色","vModel":"SX1310MP5","vType":"底盘"},{"id":3,"publicType":"SX3310MB6 (6.5米用底盘)","vColor":"绿色","vModel":"SX3310MB6 ","vType":"底盘"},{"id":6,"publicType":"SX3310MB6(5.6,5.8底盘)","vColor":"白色","vModel":"SX3310MB6 ","vType":"底盘"},{"id":8,"publicType":"SX3310MB6(7.6底盘)","vColor":"黄色","vModel":"SX3310MB6(","vType":"底盘"}] 

```
### 经销商体系维护
- http://127.0.0.1:8081/agency/list
```
URI_S_20220531204510759: /agency/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM sys_agency WHERE status = "0" 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, agency_name, agency_simple_name, father, agency_code, type, type_address, status, phone, address, postcode, remark, tax_number, bank_name, bank_account, bank_account_phone, bank_account_address, create_time, create_user,agency_code_ours,bank_code,bank_fullName from sys_agency WHERE status = "0" limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
==>  Preparing: insert into sys_log_operation (id, modul, type, `describe`, user_id, user_name, method, uri, ip, create_time, version, request_param, response_param ) values (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) 
==> Parameters: d0804ea6-86aa-4808-aceb-f4db0ccd9147(String), 经销商信息(String), 查询(String), 进入经销商信息查询页面(String), 1(String), 系统操作员-总部(String), com.clgg.modules.system.controller.AgencyPageController.list(String), /agency/list(String), 127.0.0.1(String), 2022-05-31 20:45:10.862(Timestamp), ${version}(String), {}(String), "agency/list"(String)
<==    Updates: 1
==>  Preparing: SELECT LAST_INSERT_ID() 
==> Parameters: 
<==      Total: 1
URI_E_20220531204510759: /agency/list, time: 125, 
	|--reponse: "agency/list" 

```
### 发运地管理
- http://127.0.0.1:8081/shipment/list
```
URI_S_20220531204555547: /shipment/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM send_info 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, send_name, create_user, create_time, update_user, update_time, agency_code from send_info limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 1(Long)
<====      Total: 8
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 2(Long)
<====      Total: 29
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 3(Long)
<====      Total: 11
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 4(Long)
<====      Total: 6
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 5(Long)
<====      Total: 10
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 6(Long)
<====      Total: 8
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 7(Long)
<====      Total: 12
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 8(Long)
<====      Total: 1
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 9(Long)
<====      Total: 7
====>  Preparing: select id, address, receive_name receiveName, receive_phone receivePhone, send_id sendId, create_user createUser, create_time createTime, update_user updateUser, update_time updateTime,receive_type receiveType,house_name houseName from receive_info where send_id = ? 
====> Parameters: 84(Long)
<====      Total: 1
<==      Total: 10
URI_E_20220531204555547: /shipment/list, time: 103, 
	|--reponse: "shipment/shipment_list" 

```
### 公告维护
- http://127.0.0.1:8081/sysNotice/index
```
URI_S_20220531204648995: /sysNotice/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM sys_notice 
==> Parameters: 
<==      Total: 1
==>  Preparing: SELECT id, notice_title noticeTitle, notice_detail noticeDetail, create_time createTime, create_user createUser, update_time updateTime, agency_code agencyCode,notice_author noticeAuthor,notice_type noticeType, is_to_top isToTop , to_top_time toTopTime FROM sys_notice order by is_to_top desc, to_top_time desc, update_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 5
URI_E_20220531204648995: /sysNotice/index, time: 50, 
	|--reponse: "sysNotice/sysNotice" 

```
### 车辆选配维护
- http://127.0.0.1:8081/selection/index
```
URI_S_20220531204734345: /selection/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: select id, name, status, create_user, create_date, update_user, update_data from product_type order by name 
==> Parameters: 
<==      Total: 14
==>  Preparing: SELECT count(0) FROM basic_config_selection 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, product_id, product_name, project_name from basic_config_selection order by product_id asc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531204734345: /selection/index, time: 85, 
	|--reponse: "selection/selection_list" 

```
### 需求管理
- http://127.0.0.1:8081/requirement/list
```
URI_S_20220531204826388: /requirement/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM requirement rm LEFT JOIN sys_user sus ON sus.id = rm.create_user 
==> Parameters: 
<==      Total: 1
URI_E_20220531204826388: /requirement/list, time: 55, 
	|--reponse: "data/requirement_list" 

```

## 供应商管理
### 基本信息维护
- http://127.0.0.1:8081/manufactor/index
```
URI_S_20220531204927633: /manufactor/index,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM manufactor 
==> Parameters: 
<==      Total: 1
==>  Preparing: select id, company_name, company_code, tax_number, address, tel_number, bank_name, bank_account, create_user, create_time, update_user, update_date,type,concat,email,postcode,url,fax,company_type from manufactor order by create_time desc limit ?,? 
==> Parameters: 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531204927633: /manufactor/index, time: 66, 
	|--reponse: "manufactor/manufactor_index" 

```
### 付款流水
- http://127.0.0.1:8081/manufactor/bankList
```
URI_S_20220531205018595: /manufactor/bankList,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: []
URI_E_20220531205018595: /manufactor/bankList, time: 0, 
	|--reponse: "manufactor/bankList" 
```
- http://127.0.0.1:8081/manufactor/inflow?id=
```
URI_S_20220531205019062: /manufactor/inflow,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {"id":[""]}, body: [{},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1654001419060,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT mi.id, mi.inflow_number inflowNumber, mi.account_amount accountAmount, mi.used_amount usedAmount, mi.unused_amount unusedAmount, mi.payment_date paymentDate, mi.payment_type paymentType, mi.payment_client paymentClient, mi.payment_account paymentAccount, mi.abstract_info abstractInfo, mi.remark, mi.agency_code agencyCode, mi.create_time createTime, mi.create_user createUser, mi.update_time updateTime, mi.update_user updateUser FROM manufactor_inflow mi 
==> Parameters: 
<==      Total: 0
URI_E_20220531205019062: /manufactor/inflow, time: 71, 
	|--reponse: [] 

```


## 系统管理
### 系统组织结构
- http://127.0.0.1:8081/systemOrg/list
```
URI_S_20220531205331902: /systemOrg/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{},{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1654001419139,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]}]
==>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = 0 and agency_code = ? 
==> Parameters: base(String)
====>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
====> Parameters: 1(Long), base(String)
======>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
======> Parameters: 49(Long), base(String)
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 55(Long), base(String)
<========      Total: 0
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 56(Long), base(String)
<========      Total: 0
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 57(Long), base(String)
<========      Total: 0
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 58(Long), base(String)
<========      Total: 0
<======      Total: 4
======>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
======> Parameters: 53(Long), base(String)
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 59(Long), base(String)
<========      Total: 0
<======      Total: 1
======>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
======> Parameters: 54(Long), base(String)
========>  Preparing: SELECT id, agency_name, parent_id, agency_code, order_number, status, phone, remark, create_time, create_user, update_time, update_user,agency_name AS text FROM sys_org_structure WHERE parent_id = ? and agency_code = ? order by order_number 
========> Parameters: 60(Long), base(String)
<========      Total: 0
<======      Total: 1
<====      Total: 3
<==      Total: 1
URI_E_20220531205331902: /systemOrg/list, time: 89, 
	|--reponse: "org/list" 

```
### 角色
- http://127.0.0.1:8081/role/list
```
URI_S_20220531205437749: /role/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: [{"attributeNames":["TRUCK_SELL_USER"],"creationTime":1653964373970,"id":"E89334BE6A888878FE0801341598273C","lastAccessedTime":1654001612344,"maxInactiveInterval":14400,"new":false,"servletContext":{"attributeNames":["javax.servlet.context.tempdir","org.apache.catalina.resources","org.springframework.web.context.WebApplicationContext.ROOT","org.springframework.web.context.support.ServletContextScope","org.apache.tomcat.InstanceManager","org.apache.catalina.jsp_classpath","javax.websocket.server.ServerContainer","org.apache.tomcat.JarScanner","org.springframework.web.servlet.FrameworkServlet.CONTEXT.dispatcherServlet"],"contextPath":"","defaultSessionTrackingModes":["COOKIE","URL"],"effectiveMajorVersion":3,"effectiveMinorVersion":0,"effectiveSessionTrackingModes":["COOKIE","URL"],"filterRegistrations":{"requestContextFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter","initParameters":{},"name":"requestContextFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"Tomcat WebSocket (JSR356) Filter":{"className":"org.apache.tomcat.websocket.server.WsFilter","initParameters":{},"name":"Tomcat WebSocket (JSR356) Filter","servletNameMappings":[],"urlPatternMappings":["/*"]},"hiddenHttpMethodFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter","initParameters":{},"name":"hiddenHttpMethodFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"characterEncodingFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter","initParameters":{},"name":"characterEncodingFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"formContentFilter":{"className":"org.springframework.boot.web.servlet.filter.OrderedFormContentFilter","initParameters":{},"name":"formContentFilter","servletNameMappings":[],"urlPatternMappings":["/*"]},"webStatFilter":{"className":"com.alibaba.druid.support.http.WebStatFilter","initParameters":{"sessionStatMaxCount":"10","exclusions":"/druid/*,*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico","sessionStatEnable":"true"},"name":"webStatFilter","servletNameMappings":[],"urlPatternMappings":["/*"]}},"initParameterNames":[],"majorVersion":4,"minorVersion":0,"serverInfo":"Apache Tomcat/9.0.17","servletContextName":"application","servletNames":[],"servletRegistrations":{"default":{"className":"org.apache.catalina.servlets.DefaultServlet","initParameters":{"listings":"false","debug":"0"},"mappings":[],"name":"default"},"dispatcherServlet":{"className":"org.springframework.web.servlet.DispatcherServlet","initParameters":{},"mappings":["/"],"name":"dispatcherServlet"},"statViewServlet":{"className":"com.alibaba.druid.support.http.StatViewServlet","initParameters":{"resetEnable":"true","loginUsername":"admin","loginPassword":"admin"},"mappings":["/druid/*"],"name":"statViewServlet"}},"servlets":[],"sessionCookieConfig":{"httpOnly":false,"maxAge":-1,"secure":false},"sessionTimeout":240,"virtualServerName":"Tomcat/localhost"},"sessionContext":{"ids":[]},"valueNames":["TRUCK_SELL_USER"]},{}]
==>  Preparing: select id, role_name, type, create_time, create_user, update_time, update_user,role_name AS text from sys_role where agency_code = ? and status = 0 
==> Parameters: base(String)
<==      Total: 19
==>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = 0 
==> Parameters: 
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 1(Long)
<====      Total: 0
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 5(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 20(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 21(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 22(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 40(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 42(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 43(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 55(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 93(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 94(Long)
<======      Total: 0
<====      Total: 9
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 8(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 9(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 25(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 26(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 41(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 71(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 80(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 90(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 101(Long)
<======      Total: 0
<====      Total: 8
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 11(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 27(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 28(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 29(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 30(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 31(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 32(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 33(Long)
<======      Total: 0
<====      Total: 7
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 48(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 102(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 103(Long)
<======      Total: 0
<====      Total: 2
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 49(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 12(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 13(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 14(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 15(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 16(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 17(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 23(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 39(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 85(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 86(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 87(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 91(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 95(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 96(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 97(Long)
<======      Total: 0
<====      Total: 15
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 50(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 7(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 18(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 19(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 24(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 34(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 35(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 36(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 37(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 38(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 54(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 69(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 70(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 72(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 88(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 89(Long)
<======      Total: 0
<====      Total: 15
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 51(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 56(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 57(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 58(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 59(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 92(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 98(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 99(Long)
<======      Total: 0
<====      Total: 7
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 52(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 45(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 46(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 60(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 61(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 62(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 63(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 64(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 65(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 74(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 75(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 76(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 77(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 78(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 79(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 84(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 100(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 104(Long)
<======      Total: 0
<====      Total: 17
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 53(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 66(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 67(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 68(Long)
<======      Total: 0
<====      Total: 3
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 81(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 82(Long)
<======      Total: 0
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 83(Long)
<======      Total: 0
<====      Total: 2
====>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
====> Parameters: 105(Long)
======>  Preparing: SELECT id, parent_id, menu_name, menu_url, perms, type, icon, order_num, system_type,menu_name AS text FROM sys_menu WHERE parent_id = ? 
======> Parameters: 106(Long)
<======      Total: 0
<====      Total: 1
<==      Total: 12
URI_E_20220531205437749: /role/list, time: 630, 
	|--reponse: "role/list" 

```
### 系统用户信息
- http://127.0.0.1:8081/user/list
```
URI_S_20220531205638579: /user/list,method: GET, IP: 127.0.0.1-127.0.0.1, 
	|-- params: {}, body: null
==>  Preparing: SELECT count(0) FROM sys_user su LEFT JOIN sys_role_user sru ON sru.user_id = su.id LEFT JOIN sys_role sr ON sr.id = sru.role_id LEFT JOIN sys_org_user sou ON sou.user_id = su.id LEFT JOIN sys_org_structure sos ON sos.id = sou.org_id WHERE su.agency_code = ? 
==> Parameters: base(String)
<==      Total: 1
==>  Preparing: SELECT su.id,su.account,su.user_name,sr.role_name,sos.agency_name,su.`status`,su.create_time, sr.id role_id,sos.id org_id,su.phone FROM sys_user su LEFT JOIN sys_role_user sru ON sru.user_id = su.id LEFT JOIN sys_role sr ON sr.id = sru.role_id LEFT JOIN sys_org_user sou ON sou.user_id = su.id LEFT JOIN sys_org_structure sos ON sos.id = sou.org_id WHERE su.agency_code = ? order by create_time desc limit ?,? 
==> Parameters: base(String), 0(Integer), 10(Integer)
<==      Total: 10
URI_E_20220531205638579: /user/list, time: 59, 
	|--reponse: "user/list" 

```
### 流程设置
#### 刷新
- http://127.0.0.1:8081/flow/doRefresh
    - com.clgg.modules.system.controller.FlowController#doRefresh
```
-- Parameters: base(String)
select id, approval_code, approval_type, approval_level, is_available, create_date, remark, agency_code from approval_name where agency_code = 'base' ;
```

- http://127.0.0.1:8081/flow/set?flowCount=18
    - com.clgg.modules.system.controller.FlowController#toFlowSet
```
-- Parameters: base(String) 
select id, approval_code, approval_type, approval_level, is_available, create_date, remark, agency_code from approval_name where agency_code = 'base' ;
```

- http://127.0.0.1:8081/flow/getSteps?id=1
    - com.clgg.modules.system.controller.FlowController#getStepsById
```
-- Parameters: 1(Long) 
select id, step_name, approval_name_id, order_code, checke_user_jod, checke_user, create_user, create_time, remark,step_type from approval_step where approval_name_id = 1 order by order_code asc; 

-- Parameters: 1(Long), base(String)
-- Parameters: 82(Long), base(String)
-- Parameters: 170(Long), base(String
-- Parameters: 79(Long), base(String)
SELECT su.id,su.account,su.user_name,su.phone,sr.role_name,sos.agency_name,su.`status`,su.create_time, sr.id role_id,sos.id org_id FROM sys_user su LEFT JOIN sys_role_user sru ON sru.user_id = su.id LEFT JOIN sys_role sr ON sr.id = sru.role_id LEFT JOIN sys_org_user sou ON sou.user_id = su.id LEFT JOIN sys_org_structure sos ON sos.id = sou.org_id where su.id = 1 and su.agency_code = 'base';
```
### 日志 异常
### 字典管理 异常
### 功能 异常
- 
```

```
