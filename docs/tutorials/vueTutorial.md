# Vue教程
[[TOC]]
- [vue-tutorial](https://gitee.com/tosin/vue-tutorial)
# 在线参考

## Vue.js
- [Vue.js - The Progressive JavaScript Framework | Vue.js](https://vuejs.org/)
    - https://vuejs.org/v2/guide/


- [Vue.js中文官网](https://cn.vuejs.org/)
    - [Vue 指南](https://cn.vuejs.org/v2/guide/)
		- [安装](https://cn.vuejs.org/v2/guide/installation.html)
			- https://cn.vuejs.org/js/vue.js
        	- [命令行工具-CLI](https://cn.vuejs.org/v2/guide/installation.html#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7-CLI)
		- [Vue 实例](https://cn.vuejs.org/v2/guide/instance.html)
		- [按键修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)



- https://github.com/x-extends/vxe-table

### 内置组件
- [component](https://cn.vuejs.org/v2/api/#component)
	- [组件基础](https://cn.vuejs.org/v2/guide/components.html)
- [transition](https://cn.vuejs.org/v2/api/#transition)
- [transition-group](https://cn.vuejs.org/v2/api/#transition-group)
	- \<transition> can only be used on a single element. Use \<transition-group> for lists.
#### 组件
- [组件基础](https://cn.vuejs.org/v2/guide/components.html)
- [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

#### 动画
- [过渡 & 动画](https://cn.vuejs.org/v2/guide/transitions.html)
	- [CSS 过渡](https://cn.vuejs.org/v2/guide/transitions.html#CSS-过渡)
	- [JavaScript-钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)

- 样式
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/position

##### 第三方CSS动画样式库
- [Animate.css](https://animate.style/)
	- https://github.com/animate-css/animate.css/tree/v3.6.2
### 选项/数据
- [data](https://cn.vuejs.org/v2/api/#data)
- [methods](https://cn.vuejs.org/v2/api/#methods)
- [props](https://cn.vuejs.org/v2/api/#props)
- [computed](https://cn.vuejs.org/v2/api/#computed)

### 选项/DOM
- [el](https://cn.vuejs.org/v2/api/#el)
- [template](https://cn.vuejs.org/v2/api/#template)
- [render](https://cn.vuejs.org/v2/api/#render)
### 选项/资源
- [filters](https://cn.vuejs.org/v2/api/#filters)
	- [指南 过滤器](https://cn.vuejs.org/v2/guide/filters.html#ad)
- [directives](https://cn.vuejs.org/v2/api/#directives)
	- https://cn.vuejs.org/v2/guide/custom-directive.html
### 指令
- [v-text](https://cn.vuejs.org/v2/api/#v-text)
- [v-html](https://cn.vuejs.org/v2/api/#v-html)
- [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak)
- [v-bind](https://cn.vuejs.org/v2/api/#v-bind)
- [v-on](https://cn.vuejs.org/v2/api/#v-on)
- [v-model](https://cn.vuejs.org/v2/api/#v-model)
- [v-for](https://cn.vuejs.org/v2/api/#v-for)
- [v-show](https://cn.vuejs.org/v2/api/#v-show)
- [v-if](https://cn.vuejs.org/v2/api/#v-if)
### 特殊 attribute
- [ref](https://cn.vuejs.org/v2/api/#ref)
	- [访问子组件实例或子元素](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)
### 实例方法 / 生命周期
- [vm-mount](https://cn.vuejs.org/v2/api/#vm-mount)

### 全局API
- [Vue-filter](https://cn.vuejs.org/v2/api/#Vue-filter)
- [Vue-directive](https://cn.vuejs.org/v2/api/#Vue-directive)
- [Vue-extend](https://cn.vuejs.org/v2/api/#Vue-extend)

## Vue Router
> router.vuejs.org 最新版本地址；v3.router.vuejs.org V3.x

- [Vue Router官网](https://router.vuejs.org/zh/)
	 - [安装](https://router.vuejs.org/zh/installation.html)
		 -[npm](https://router.vuejs.org/zh/installation.html#npm)

- [指南](https://router.vuejs.org/zh/guide/)
	- [编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)
	- [路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html)
		- [布尔模式](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)

- [API 参考](https://v3.router.vuejs.org/zh/api/)
    - [`<router-view>` Props](https://router.vuejs.org/zh/api/#router-view-props)
        - [name](https://router.vuejs.org/zh/api/#name)
    - [`<router-link>` Props](https://v3.router.vuejs.org/zh/api/#router-link)
        - [tag](https://v3.router.vuejs.org/zh/api/#tag)
	- [Router 构建选项](https://v3.router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9)
        - [routes](https://v3.router.vuejs.org/zh/api/#routes)
        - [linkActiveClass](https://v3.router.vuejs.org/zh/api/#linkactiveclass)

## npm

### npm 介绍
- [npm 全面介绍](https://neveryu.github.io/2017/04/10/npm/)
    - [npm模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)

- [npm](https://www.npmjs.com/)
	- https://www.npmjs.com/package/van
	- https://www.npmjs.com/package/file-loader
		- Placeholders
	- https://www.npmjs.com/package/open-browser-webpack-plugin
	- https://www.npmjs.com/package/webpack-dev-server?activeTab=readme
	- https://www.npmjs.com/package/webpack
	- https://www.npmjs.com/package/webpack-cli
	- https://www.npmjs.com/package/html-webpack-plugin
	- https://www.npmjs.com/package/webpack-open-browser-plugin
	- https://www.npmjs.com/package/open-browser-webpack-plugin

	- https://www.npmjs.com/package/jquery
	- https://www.npmjs.com/package/node-nightly
	- 样式
		- https://www.npmjs.com/package/css-loader
		- https://www.npmjs.com/package/style-loader
		- https://www.npmjs.com/package/file-loader
		- https://www.npmjs.com/package/url-loader
		- https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
	- js
		- https://www.npmjs.com/package/babel-core
		- https://www.npmjs.com/package/babel-loader
		- https://www.npmjs.com/package/babel-plugin-transform-runtime
		- https://www.npmjs.com/package/babel-preset-env
		- https://www.npmjs.com/package/babel-preset-stage-0
	- https://www.npmjs.com/package/eslint
	- https://www.npmjs.com/package/vconsole 前端真机调试
	- https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
		- https://github.com/NMFR/optimize-css-assets-webpack-plugin
	- https://www.npmjs.com/package/moment
		- https://momentjs.com/
			- https://momentjs.com/docs/#/use-it/
	- https://www.npmjs.com/package/vuex

### vue-resource
- https://www.npmjs.com/package/vue-resource

### axios
- https://www.npmjs.com/package/axios
	- https://www.npmjs.com/package/axios#config-defaults
		- https://github.com/axios/axios

### Vuex
- https://www.npmjs.com/package/vuex
- https://vuex.vuejs.org/guide/
- https://vuex.vuejs.org/zh/
	- https://vuex.vuejs.org/zh/installation.html#npm
	- https://vuex.vuejs.org/zh/guide/state.html
	- https://vuex.vuejs.org/zh/guide/getters.html
	- https://vuex.vuejs.org/zh/guide/mutations.html
	- https://vuex.vuejs.org/zh/guide/actions.html
### vue-preview
- https://www.npmjs.com/package/vue-preview
	- https://www.npmjs.com/package/vue-preview/v/1.0.5

### eslint




# 教程
## 1 基础语法实践part1-1

### 前端框架学习介绍

#### 什么是Vue.js
- Vue.js 是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App， Vue语法也是可以用于进行手机App开发的，需要借助于Weex）
- Vue.js 是前端的主流框架之一，和Angular.js、React.js 一起，并成为前端三大主流框架！
- Vue.js 是一套构建用户界面的框架，只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）

#### 为什么要学习流行框架
- 企业为了提高开发效率：在企业中，时间就是效率，效率就是金钱；
	- 在没有前端框架之前，我们前端需要经常的操作DOM元素；
	- 在项目中，vue 能够简化DOM操作，让程序员根本不用操作任何DOM元素，就能渲染页面；
	- 企业中，使用框架，能够提高开发的效率；
- 提高开发效率的发展历程：原生JS -> Jquery之类的类库 -> 前端模板引擎 -> Angular.js / Vue.js（能够帮助我们减少不必要的DOM操作；提高渲染效率；双向数据绑定的概念【通过框架提供的指令，前端程序员只需要关心数据的业务逻辑，不再关心DOM是如何渲染的了】）
- 在Vue中，一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑；

### MVVM的介绍
- MVVM是前端视图层的概念，主要关注于视图层分离，也就是说：MVVM把前端的视图层，分为了 三部分 Model, View , VM ViewModel

- 通过代码理解Vue基本使用和MVVM的对应关系
	- 01.体验Vue并了解MVVM.html

### vue中指令的特点
- 在Vue中,所有的指令,都是属性,Vue的指令,都是以 v- 开头
- 01.体验Vue并了解MVVM-05.html

### 插值表达式和v-text指令的两个区别
- 01.体验Vue并了解MVVM-06.html
#### 区别
1. {{ }} 语法,叫做插值表达式, 在插值表达式中,可以写任何合法的JS表达式，{{  }}语法只能使用在元素标签内容区域，不能在属性中使用
2. v-text属性语法,叫做指令，在Vue中所有的指令，都是属性, Vue的指令，都是以v-开头的


#### Vue之-基本的代码结构和插值表达式、v-cloak
1. 使用插值表达式,存在内容闪烁的问题,但是,`v-text`没有闪烁问题;
	1. vue-2.6.14.js 不放在 head中
	1. Network slow 3G
1. 在插值表达式中,可以使用 `v-cloak` 解决闪烁问题;
1. 插值表达式只会插入内容,并不会清除其余的内容; `v-text` 会把元素中之前的内容都清空!

- 02.区分插值表达式和v-text的区别.html

### v-html渲染HTML字符串
- Vue指令之v-text和v-html
	- 02.区分插值表达式和v-text的区别.html

### v-bind指令的使用和注意点
- 03.在Vue中绑定属性值.html
#### Vue指令之v-bind的三种用法
1. v-bind: 可以为元素的属性,绑定一些数据
1. 直接使用指令v-bind 
1. 使用简化指令:
1. 在绑定的时候，拼接绑定内容：:title="btnTitle + ', 这是追加的内容'"
	- 如果想要实现表达式的拼接, 被拼接的字符串,一定要用 引号包裹起来, 否则,会被当作变量解析


### v-on指令为元素绑定事件
- Vue中提供了v-on: 来为元素绑定事件
- v-on:简写是@
- 绑定的事件处理函数,必须定义到 VM 实例的methods属性中

- 04.使用v-on指令绑定事件.html

### 案例：跑马灯案例的制作
- 05.跑马灯效果.html

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring
- https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval


### v-model指令实现数据的双向绑定
- 06.v-model指令的学习.html

- v-model 指令的作用是干什么的，双向绑定的具体与单项绑定的具体区别？
	- 双向数据绑定，能够让我们修改表单之后，不必自己操作DOM元素获取表单元素的值；
	- 单项数据绑定，让我们不必自己操作DOM，去渲染数据了！

#### 案例：使用v-model指令实现简易计算器
- 07.简易计算器案例.html

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval

### 事件修饰符

#### 事件修饰符-上
- 08.事件修饰符-阻止冒泡.html
- 09.事件修饰符-阻止默认行为.html

##### 事件修饰符
- .stop 阻止冒泡
- .prevent 阻止默认事件
- .capture 添加事件侦听器时使用事件捕获模式
- .self 只当事件在该元素本身（比如不是子元素）触发时触发回调
- .once 事件只触发一次

####  事件修饰符-下
- 10.事件修饰符-捕获模式.html
- 11.事件修饰符-self和stop的区别.html

##### 事件执行的3个阶段：从外到里，从里到外
	1. 捕获
	2. 事件原
	3. 冒泡

### 在Vue中使用样式
#### 在Vue中使用类样式的4种方式
- 12.vue中使用类样式.html

- 数组、**数组中使用三元表达式**、**数组中嵌套对象**、对象
	- 对象中类名作为对象的属性名（对象中属性名带连字符空格时需要带引号）
		- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects
```
        <p>在Vue中,使用 v-bind 为元素绑定数组的类样式:</p>
        <h1 v-bind:class="['red', 'small']">12.vue中使用类样式.html</h1>

        <hr>
        <p>在数组中使用三元表达式:</p>
        <input type="button" value="变化" @click="isThin=!isThin">
        <h1 v-bind:class="['red', isThin? 'thin':'']">12.vue中使用类样式.html</h1>
        
        <hr>
        <p>在数组中使用对象来简化三元表达式:</p>
        <!-- <h1 v-bind:class="['red', 'thin':isThin]">12.vue中使用类样式.html</h1> -->
        <h1 v-bind:class="['red', {thin:isThin}]">12.vue中使用类样式.html</h1>

        <hr>
        <p>传递对象作为类样式:</p>
        <h1 v-bind:class="{red:true, small:true, thin:isThin}">12.vue中使用类样式.html</h1>
```
#### 使用内联样式
- 在Vue中使用style行内样式
	- 13.vue中书写行内的样式.html

1. 直接在元素上通过 :style 的形式，书写样式对象
```
        <h1 v-bind:style="{color: 'red', 'font-size': 15px, 'font-style': 'italic'}">13.vue中书写行内的样式.html</h1>
                <h1 v-bind:style="[{color: 'red', 'font-size': '15px'}, { 'font-style': 'italic'}]">13.vue中书写行内的样式.html</h1>
```
2. 将样式对象，定义到 data 中，并直接引用到 :style 中

3. 在 :style 中通过数组，引用多个 data 上的样式对象
```
                <h1 v-bind:style="[{color: 'red', 'font-size': '15px'}, { 'font-style': 'italic'}]">13.vue中书写行内的样式.html</h1>
        <h1 v-bind:style="[styleObj1, styleObj2]">13.vue中书写行内的样式.html</h1>

        var vm = new Vue({
            el: '#app',
            data: {
                styleObj1: {color: 'red', 'font-size': '15px'},
                styleObj2: {'font-style': 'italic'}
            }
        });
```

### Vue指令之v-for

1. 迭代数组
```
# 数组
            <li v-for="item in list">{{item}}</li>
            <hr>
            <li v-for="(item, i) in list">{{ i }}--{{item}}</li>


            data: {
                list: ['item1', 'item2', 'item3', 'item4'],
            }
# 对象数组
            <li v-for="(item, i) in list">{{i}}--{{item.id}}--{{item.name}}</li>
            
            data: {
                list: [
                    {id:100, name:'item1'},
                    {id:200, name:'item2'},
                    {id:300, name:'item3'},
                    {id:400, name:'item4'},
                ]
            }
```
2. 迭代对象中的属性
```
            <!-- 循环遍历对象身上的属性 -->
            <li v-for="(val, key, i) in person">{{i}}--{{key}}--{{val}}</li>

            data: {
                person:{
                    id: 100,
                    name: 'name1',
                    age: 18,
                    gender: '男'
                }
            }
```
3. 迭代数字
```
<p v-for="i in 10">这是第 {{i}} 个P标签</p>
```

> 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。

- 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。

#### v-for循环数组
- 14.v-for循环数组.html
- 15.v-for循环对象数组.html

#### v-for中key属性的使用

- 16.v-for循环对象中的属性.html
- 17.演示key属性.html

> 今后,只要涉及到了v-for这种循环,推荐,给循环的每一项添加 :key 属性，
> 其中, :key 属性,只接受 number 或 string 类型的数据,不要直接为 :key 指定对象，
> :key 指定的值,必须具有唯一性

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

### Vue指令之v-if和v-show
- 18.v-if和v-show的使用.html

> 一般来说，v-if有更高的切换消耗而 v-show有更高的初始渲染消耗。因此，如果需要频繁切换v-show较好，如果在运行时条件不大可能改变v-if较好。

- v-if和v-show只有一个作用,就是根据指定的标识符,切换元素的显示和隐藏状态
	1. v-if 是实时的创建或移除元素,从而达到元素的显示和隐藏
		- 如果元素 被创建出来之后,可能不会进行状态的切换,此时,适合使用 v-if
	2. v-show 是通过为元素添加或移除display:none来实现隐藏和显示的
		- 如果 元素 需要经常的切换显示和隐藏的状态,此时,使用 v-show 更合适一些


### 案例：渲染品牌列表并实现添加功能
- 19.品牌列表案例.html

- 样式优化
```
PS > npm init -y
Wrote to \package.json:

{
  "name": "day1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "lib": "lib"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day1> npm i bootstrap
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN bootstrap@5.1.3 requires a peer of @popperjs/core@^2.10.2 but none is installed. You must install peer dependencies yourself.
npm WARN day1@1.0.0 No description
npm WARN day1@1.0.0 No repository field.

+ bootstrap@5.1.3
added 1 package from 2 contributors in 1.519s

1 package is looking for funding
  run `npm fund` for details

```
- html页面导入样式
```
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
```
#### 使用数组的findIndex方法查找对应项的索引值
- 19.品牌列表案例.html
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
		- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
		- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
		- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
- 20.自己模拟数组的findIndex方法.html
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality
#### 实现品牌检索功能
21.品牌列表-检索功能.html

#### 使用字符串的includes新方法来判断是否包含
- 21.品牌列表-检索功能.html
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes
#### 优化品牌列表检索的功能
- 22.品牌列表-优化检索实现过程.html
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

##### 1.x 版本中的filterBy指令，在2.x中已经被废除： filterBy - 指令
```
<tr v-for="item in list | filterBy searchName in 'name'">
<td>{{item.id}}</td>
<td>{{item.name}}</td>
<td>{{item.ctime}}</td>
<td>
 <a href="#" @click.prevent="del(item.id)">删除</a>
</td>
</tr>
```

##### 在2.x版本中[手动实现筛选的方式](https://cn.vuejs.org/v2/guide/list.html#%E6%98%BE%E7%A4%BA%E8%BF%87%E6%BB%A4-%E6%8E%92%E5%BA%8F%E5%90%8E%E7%9A%84%E7%BB%93%E6%9E%9C)：
- 筛选框绑定到 VM 实例中的 searchName 属性：
```
<hr> 输入筛选名称：
<input type="text" v-model="searchName">

```
- 在使用 v-for 指令循环每一行数据的时候，不再直接 item in list，而是 in 一个 过滤的methods 方法，同时，把过滤条件searchName传递进去：
```
<tbody>
    <tr v-for="item in search(searchName)">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.ctime}}</td>
      <td>
        <a href="#" @click.prevent="del(item.id)">删除</a>
      </td>
    </tr>
  </tbody>

```
- search 过滤方法中，使用 数组的 filter 方法进行过滤：
```
search(name) {
return this.list.filter(x => {
  return x.name.indexOf(name) != -1;
});
}
```

### 全局过滤器的介绍和总结
#### 过滤器
> 概念：Vue.js 允许你自定义过滤器，**可被用作一些常见的文本格式化**。过滤器可以用在两个地方：**mustache 插值和 v-bind 表达式**。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示；


- 过滤器的使用注意事项: 
	1. Vue.filter('过滤器的名称', 过滤器的处理函数) 
	2. 注意: 过滤器的处理函数中,第一个形参,功能已经被规定好了,永远都是管道符前面的 值 
	3. 调用过滤器
	```
	{{ item.ctime | formatDate }}
	```
	4. 在调用过滤器的时候,可以传递参数, 
	```
	{{ item.ctime | formatDate('传递参数') }}
	```
	5. 注意: 调用过滤器传递的参数, 只能从处理函数的第二个形参开始接收, 因为第一个形参已经被管道符前面的值给占用了 
	6. 注意: 过滤器的处理函数中, 必须返回一个值 
	7. 可以连续使用管道符 调用多个过滤器, 最终输出的结果,永远以 最后一个过滤器为准;  
	8. 注意: 过滤器只能使用在差值表达中, 或者v-bind中,不能使用在其它地方了,比如v-text就不支持调用过滤器 


- 23.全局过滤器.html
- 02.过滤器的基本使用.html
	- https://cn.vuejs.org/v2/guide/filters.html#ad
```
PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day1> npm i moment -S
npm WARN bootstrap@5.1.3 requires a peer of @popperjs/core@^2.10.2 but none is installed. You must install peer dependencies yourself.
npm WARN day1@1.0.0 No description      
npm WARN day1@1.0.0 No repository field.

+ moment@2.29.1
added 1 package from 6 contributors in 1.298s

1 package is looking for funding
  run `npm fund` for details

```
- js引入html
```
<script src="./node_modules/moment/min/moment.min.js"></script>
```
###### 私有过滤器
```
        <h5>{{msg | strFormat}}</h5>
        <h5>{{msg | strFormat | addStr}}</h5>

            filters: {  // 当前实例私有的过滤器
                addStr: function(data){
                    return data+'[addStr]';
                },
                // 如果全局过滤器和私有过滤器重名了，则会就近原则调用过滤器
                strFormat: function(data){  // vm2 的私有过滤器
                    return data+'[filters.strFormat]';
                }

            }
```

> 使用ES6中的字符串新方法 String.prototype.padStart(maxLength, fillString='') 或 String.prototype.padEnd(maxLength, fillString='')来填充字符串；

##### 全局过滤器
```
    <!-- 注意： 使用Vue中过滤器，并不会修改原数据，只是在展示数据的时候，做了一层包装而已； -->        
        <h5>{{msg | strFormat}}</h5>
        <h5>{{msg | strFormat('开心')}}</h5>

        // 创建全局的一个过滤器
        Vue.filter('strFormat', function(data, str="XE"){
            // return data.replace('纯洁', str);
            // 正则表达式 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
            return data.replace(/纯洁/g, str);  
        });
```
> 注意：当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用！


## 1 基础语法实践part1-2

### 案例：样式案例
- 使用Vue循环显示一个对象数组到页面上，并设置索引为0的那一项被默认选中； 
- 为默认选中项添加 .active 类样式（红色、加粗字体）； 
- 非选中项 的默认样式为（蓝色，非加粗字体）； 
- 并且点击不同的列表项， 可以切换选中状态；

- 01.样式案例.html

### 过滤器复习
- 注意： 
	- 使用Vue中过滤器，并不会修改原数据，只是在展示数据的时候，做了一层包装而已；
	- 如果全局过滤器和私有过滤器重名了，则会就近原则调用过滤器

- 02.过滤器的基本使用.html

### 自定义指令
- Vue自定义指令的名称中，不需要写 v- 前缀，但是，在调用自定义指令的时候，必须在 前面加上 v- 前缀

- 03.品牌列表-自定义指令.html
	- 参考
		- https://cn.vuejs.org/v2/guide/custom-directive.html
		- https://cn.vuejs.org/v2/api/#Vue-directive
		- https://www.w3schools.com/jsref/met_html_focus.asp
		- https://www.w3schools.com/jsref/prop_style_color.asp
		- https://cn.vuejs.org/v2/api/#directives
	- 自定义全局指令让文本框获得焦点
	- 自定义全局的v-color指令
	- 自定义私有指令和函数的简写形式


1. 自定义全局和局部的 自定义指令：
```
        // 全局自定义 获得焦点的 v-focus 指令
        // Vue.filter('过滤器的名称', 处理函数)
        // 注意： Vue 自定义指令的名称中，不需要写 v- 前缀，但是，在调用自定义指令的时候，必须在 前面加上 v- 前缀
        Vue.directive('focus', {
            // 参数列表中的 第一个参数，永远是  el 表示被绑定指令的那个元素
            //  如果要操作元素的样式， 写到 bind 就行了  
            bind(el, binding, vnode) {  // 当指令绑定到的元素，被Vue实例解析的时候，就会 立即执行 bind 函数
                console.log("Vue.directive focus bind ", el, binding, vnode);

                // 这是 JS DOM API 中原生的方法
                // el.focus();  // 如果想要让文本框获得焦点，那么，文本框必须先插入到文档中才能生效
                el.style.color='red';

            },
            // 今后在自定义指令的时候，如果 需要操作 元素的JS行为了，最好写到 inserted 中
            inserted(el, binding, vnode) {  // 调用时机： 当 指令绑定到的元素，被插入到文档的父节点时候，调用 inserted 函数
                console.info("Vue.directive focus inserted ", el, binding, vnode);
                el.focus();
            },
            update(el, binding, vnode, oldVnode) {
                console.info("Vue.directive focus update ", el, binding, vnode, oldVnode);
            },
            componentUpdated(el, binding, vnode) {
                console.info("Vue.directive focus componentUpdated ", el, binding, vnode);
            },
            unbind(el, binding, vnode) {
                console.info("Vue.directive unbind ", el, binding, vnode);
            },
        });


        Vue.directive('color', {
            bind(el, binding, vnode) {
                console.log("Vue.directive color bind" , el, binding, vnode);
                el.style.color = binding.value || 'red';
            },
        });

            directives: {   // 自定义指令区域
                bold: { // 让指定元素字体加粗的指令
                    bind: function(el, binding){
                        console.log("directives bold bind ", el, binding);
                        el.style.fontWeight = binding.value;
                    }
                },
                italic: function(el, binding){  // 让文字倾斜的指令
                    // 用到了指令的函数简写形式，如果指令给定的是 function，则 等同于 把 这个 function 中的代码，分别定义到了 bind 和 update 中去；
                    console.log("directives italic ", el, binding);
                    el.style.fontStyle = "italic";
                },
                italic1: {
                    bind: function(el, binding){
                        console.log("italic1 bind");
                        el.style.fontStyle = "italic"
                    },
                    update: function(el, binding){
                        console.log("italic1 update");
                        el.style.fontStyle = "italic"
                    }
                }
            }

```
2. 自定义指令的使用方式：
```
            <span v-color>按照品牌名称检索:</span>
            <input type="text" v-model="keywords" v-on:change="searchByName" v-focus>

                    <th v-italic1>name</th>
                    <th v-italic>ctime</th>
                    <th v-color="'blue'" v-bold="100">操作</th>
```


##### 函数简写
> 在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写：
```
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

##### 钩子函数
- [钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	- 操作元素的样式
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	- 操作元素的JS行为，最好写到 inserted 中

##### 钩子函数参数
- [钩子函数参数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

- el：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
	- name：指令名，不包括 v- 前缀。
	- value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
	- oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
	- expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
	- arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
	- modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。


### 按键修饰符的使用
- 03.品牌列表-自定义指令.html
	- https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6
	- https://www.w3schools.com/jsref/dom_obj_event.asp
	- https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent
	- https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event

```
            <!-- <input type="text" v-model="name" v-on:keyup.enter="add"> -->
            
            <!-- 自动匹配按键修饰符 2.5.0 新增 -->
            <!-- <input type="text" v-model="name" v-on:keyup.f2="add"> -->
            <!-- <input type="text" v-model="name" v-on:keyup.0="add"> -->
            <!-- <input type="text" v-model="name" v-on:keyup.end="add"> -->
```


### vue实例生命周期
- 04.生命周期函数.html

#### vue实例的生命周期
- 什么是生命周期：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期！
- 生命周期钩子函数：就是生命周期事件的别名而已；
- 生命周期钩子函数= 生命周期函数 = 生命周期事件
- 主要的生命周期函数分类：
	1. 创建期间的生命周期函数：
		1. beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
		1. created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始编译模板
		1. beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中
		1. mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示
	1. 运行期间的生命周期函数：
		1. beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点
		1. updated：实例更新完毕之后调用此函数，此时 data 中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！
	1. 销毁期间的生命周期函数：
		1. beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
		1. destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

![vue实例的生命周期](https://note.youdao.com/yws/api/personal/file/WEB83c542c867919c50d034ac7b0d09f806?method=download&shareKey=1db1e55fd0d76ee31387435a5720f040)

#### 实例生命周期-创建阶段
- 04.生命周期函数.html
#### 实例生命周期-运行和销毁阶段
- 04.生命周期函数.html

### 请求
#### vue-resource 实现 get, post, jsonp请求
- https://github.com/pagekit/vue-resource
	- HTTP Requests/Response https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
> 除了 vue-resource 之外，还可以使用 axios 的第三方包实现实现数据的请求

#####  05.使用vue-resource请求数据.html
1. 使用vue-resource发起get请求
```
PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2> npm install vue-resource
npm WARN saveError ENOENT: no such file or directory, open 'E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2\package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2\package.json'
npm WARN day2 No description
npm WARN day2 No repository field.
npm WARN day2 No README data      
npm WARN day2 No license field.

+ vue-resource@1.5.3
added 31 packages from 54 contributors in 2.897s

7 packages are looking for funding
  run `npm fund` for details
```
	- practices\day2\node_modules\vue-resource\dist\vue-resource.js

2. 使用async和await来修饰实现数据请求的异步方法
3. 使用vue-resource发起post和jsonp请求


##### 实现请求总结
1. 之前的学习中，如何发起数据请求？ 
	- 不推荐使用jQuery、Ajax，Vue不推荐操作Dom元素，jQuery主要操作Dom元素
1. 常见的数据请求类型？ get post jsonp
1. 测试的URL请求资源地址：
	1. get请求地址： http://www.liulongbin.top:3005/api/getlunbo
	1. post请求地址：http://www.liulongbin.top:3005/api/post
	1. jsonp请求地址：http://www.liulongbin.top:3005/api/jsonp
1. JSONP的实现原理
	1. 由于浏览器的安全性限制，不允许AJAX访问协议不同、域名不同、端口号不同的数据接口，浏览器认为这种访问不安全；
	1. 可以通过动态创建script标签的形式，把script标签的src属性，指向数据接口的地址，因为script标签不存在跨域限制，这种数据获取方式，称作JSONP（注意：根据JSONP的实现原理，知晓，JSONP只支持Get请求）；
	1. 具体实现过程：
		1. 先在客户端定义一个回调方法，预定义对数据的操作；
		1. 再把这个回调方法的名称，通过URL传参的形式，提交到服务器的数据接口；
		1. 服务器数据接口组织好要发送给客户端的数据，再拿着客户端传递过来的回调方法名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
		1. 客户端拿到服务器返回的字符串之后，当作Script脚本去解析执行，这样就能够拿到JSONP的数据了；



#### 使用axios发起数据请求
> axios 不支持jsonp

- 06.axios结合vue发起请求.html
	- https://www.npmjs.com/package/axios
	- https://www.axios-http.cn/docs/intro
	- https://axios-http.com/docs/intro

```
PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2> npm install axios
npm WARN saveError ENOENT: no such file or directory, open 'E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2\package.json'
npm WARN enoent ENOENT: no such file or directory, open 'E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2\package.json'
npm WARN day2 No description
npm WARN day2 No repository field.
npm WARN day2 No README data
npm WARN day2 No license field.

+ axios@0.24.0
added 2 packages from 4 contributors in 0.842s

8 packages are looking for funding
  run `npm fund` for details
```
#### 使用node服务器模拟JSONP实现过程
- 07.模拟JSONP.html
- 08.模拟动态创建的script标签.js
- 09.JSONP数据服务器.js
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
	- https://www.npmjs.com/package/nodemon
	- http://nodejs.cn/api/url.html
		- http://nodejs.cn/api/url.html#urlparseurlstring-parsequerystring-slashesdenotehost
```
C:\Users\User>node
Welcome to Node.js v14.17.6.
Type ".help" for more information.
> .exit

PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2> node .\09.JSONP数据服务器.js
http://127.0.0.1:3000

PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2> npm install -g nodemon
C:\Users\User\AppData\Roaming\npm\nodemon -> C:\Users\User\AppData\Roaming\npm\node_modules\nodemon\bin\nodemon.js

> nodemon@2.0.15 postinstall C:\Users\User\AppData\Roaming\npm\node_modules\nodemon
> node bin/postinstall || exit 0

Love nodemon? You can now support the project via the open collective:
 > https://opencollective.com/nodemon/donate

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\nodemon\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ nodemon@2.0.15
added 116 packages from 53 contributors in 7.701s
PS E:\iEnviroment\development\projects\ideaProjects\VueDemo\code_2020_4_2-master\practices\day2> nodemon .\09.JSONP数据服务器.js
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node .\09.JSONP数据服务器.js`
http://127.0.0.1:3000
```

#### 案例：品牌案例-获取品牌列表
- 10.数据库版-品牌管理案例.html
	- 参考
		- https://www.npmjs.com/package/axios
		- https://www.npmjs.com/package/axios#config-defaults
			- https://github.com/axios/axios
		- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality
		- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality

1. 品牌案例-获取品牌列表
2. 品牌案例-实现添加品牌功能
3. 配置axios请求的根路径并且抽离为单独的文件
```
//  注意：   axios.create() 方法，调用的返回值，是一个新的 axios 实例，在 调用 create 函数的时候，可以初始化一些默认配置项，比如，请求的 baseURL 地址
Vue.prototype.$http = axios.create({
    baseURL: "http://api.cms.liulongbin.top"
});
```
4. 品牌案例-实现删除功能


### Vue中的动画

- https://cn.vuejs.org/v2/guide/transitions.html
> 为什么要有动画：动画能够提高用户的体验，帮助用户更好的理解页面中的功能；

#### 动画-相关概念

![enter image description here](https://cn.vuejs.org/images/transition.png)

1. Vue 把一个完整的动画，拆分成了两部分   入场动画  和   出场动画 
2. 入场动画中，包含两个时间点，分别是 进入之前（v-enter）  和   进入之后（v-enter-to） 
3. v-enter 表示 动画入场之前的起始状态，比如： 透明度为0， 横向偏移量 为   50px 
4. v-enter-to 表示 动画 入场完成之后的终止状态，比如： 透明度为 1， 横向偏移量为    0px  
5. v-enter-active 表示 入场动画的时间段， 在这里，可以规定动画的时长、还有一些相关的动画效果 ease 


#### 动画-使用过渡类名
- 12.动画-使用过渡类名.html
	- https://cn.vuejs.org/v2/guide/transitions.html#CSS-过渡
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform
	- https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition

- 添加动画效果
1. 把要实现动画的元素，使用 transition 元素包裹起来
2. 要实现动画的元素，必须使用 v-if 或 v-show 来进行控制
3. 动画完成的状态，以正常显示的状态为准

#### 动画-使用第三方CSS动画样式库
- 13.动画-使用现成的动画类库.html
	- [Animate.css](https://animate.style/)
		- https://github.com/animate-css/animate.css/tree/v3.6.2


#### 动画-钩子函数实现小球半场动画
- 14.动画-使用JS动画生命周期函数.html
	- https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子
	- https://www.w3schools.com/jsref/prop_style_transition.asp
	- https://www.w3schools.com/jsref/prop_style_transform.asp
	- https://www.w3schools.com/jsref/prop_element_offsetwidth.asp

- 动画-小球动画执行过程的分析
- 动画-flag变化的过程分析

- 开发者工具 Console 调试
```
var ball = document.getElementById('ball')
ball.style.display='block'
```

#### 动画-列表动画
- 15.动画-列表过渡.html
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
	- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

##### v-for 的列表过渡
> [https://cn.vuejs.org/v2/guide/transitions.html#列表的进入和离开过渡](https://cn.vuejs.org/v2/guide/transitions.html#列表的进入和离开过渡)

1. 定义过渡样式

```
<style>
 .list-enter,
 .list-leave-to {
   opacity: 0;
   transform: translateY(10px);
 }

 .list-enter-active,
 .list-leave-active {
   transition: all 0.3s ease;
 }
</style>
```

2. 定义DOM结构，其中，需要使用 transition-group 组件把v-for循环的列表包裹起来：
```
<div id="app">
 <input type="text" v-model="txt" @keyup.enter="add">

 <transition-group tag="ul" name="list">
   <li v-for="(item, i) in list" :key="i">{{item}}</li>
 </transition-group>
</div>
```
3. 定义 VM中的结构：
```
 // 创建 Vue 实例，得到 ViewModel
 var vm = new Vue({
   el: '#app',
   data: {
     txt: '',
     list: [1, 2, 3, 4]
   },
   methods: {
     add() {
       this.list.push(this.txt);
       this.txt = '';
     }
   }
 });
```
###### 列表的排序过渡
- `<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 v-move 特性，它会在元素的改变定位的过程中应用。
- v-move 和 v-leave-active 结合使用，能够让列表的过渡更加平缓柔和：
```
.v-move{
transition: all 0.8s ease;
}
.v-leave-active{
position: absolute;
}
```

#### 动画元素的name属性
- 16.动画-演示name属性的必要性.html


## 1 基础语法实践part1-3

### Vue组件

#### 定义Vue组件
- 什么是模块化：模块化是从代码的角度出发，分析项目，把项目中一些功能类似的代码，单独的抽离为一个个的模块；那么为了保证大家以相同的方式去封装模块，于是我们就创造了模块化的规范（[CommonJS规](http://javascript.ruanyifeng.com/nodejs/module.html)）；
	- 模块化的好处：方便项目的开发；和后期的维护与扩展；今后如果需要某些固定功能的模块，则直接拿来引用就行，提高了项目开发效率！
- 什么是组件化：从UI的角度出发考虑问题，把页面上有重用性的UI解构和样式，单独的抽离出来，封装为单独的组件；
	- 组件化的好处：随着项目规模的发展，我们手里的组件，会越来越多，这样，我们今后一个页面中的UI，几乎都可以从手中拿现成的组件拼接出来；方便项目的开发和维护；

#### 全局组件定义的三种方式
> 注意：从更抽象的角度来说，每个组件，就相当于一个自定义的元素；
> 注意：组件中的DOM结构，有且只能有唯一的根元素（Root Element）来进行包裹；


##### 第一种方式：
- 01.组件-创建全局组件方式1.html

1. 先调用 `Vue.extend()` 得到组件的构造函数：
```
        // ① 创建全局组件的第一种方式：   component
        const com1 = Vue.extend({
            template: '<h5>这是创建的第一个全局组件</h5>',   // template 属性，表示这个组件的 UI 代码解构
        });
```
2. 通过 `Vue.component('组件的名称', 组件的构造函数)` 来注册全局组件：
```
        // ② 使用 Vue.component 向全局注册一个组件
        // Vue.component('组件的名称', 组件的构造函数)
        Vue.component('mycom1', com1);
```
3. 把注册好的全局组件名称，以标签形式引入到页面中即可：
```
        <!-- 如何引入一个全局的Vue组件呢？ ③ 直接把 组件的名称，以标签的形式，放到页面上就好了！ -->
        <mycom1></mycom1>
```


##### 第二种方式：
- 02.组件-创建全局组件方式2.html

1. 直接使用 Vue.component('组件名称', { 组件模板对象 })
```
        const com2Obj = {
            // 1. template 属性中，不能单独放一段文本，必须用标签包裹起来；
            // 2. 如果在 template 属性中，想要放多个元素了，那么，在这些元素外，必须有唯一的一个根元素进行包裹；

            // Component template requires a root element, rather than just text.
            // template: '02.组件-创建全局组件方式2.html',
            // Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.
            // template: '<h5>02.组件-创建全局组件方式2.html</h5><h5>02.组件-创建全局组件方式2.html</h5>',
            template: '<div><h5>02.组件-创建全局组件方式2.html</h5><h5>02.组件-创建全局组件方式2.html</h5></div>',
        };

        // 定义全局的组件
        // Vue.component 的第二个参数，既接收 一个 组件的构造函数， 同时，也接受 一个对象
        Vue.component('mycom2', com2Obj);
```

##### 第三种方式：
- 03.组件-创建全局组件方式3.html

1. 先使用 template 标签定义一个模板的代码解构：
```
    <!-- 定义一个 template 标签元素  -->
    <!-- 使用 Vue 提供的 template 标签，可以定义组件的UI模板解构 -->
    <template id="tmpl">
        <div>
            <h5>03.组件-创建全局组件方式3.html</h5>
            <h5>03.组件-创建全局组件方式3.html----2</h5>
        </div>
    </template>
```
2. 使用 Vue.component 注册组件：
```
        // 这是定义的全局组件
        // tmpl template 必须在本行代码之前，不能放到 选项el 对应元素内 
        Vue.component('mycom3', {
            template: '#tmpl'
        });
```
> 注意： 从更抽象的角度来说，每个组件，就相当于是一个自定义的元素； 注意： 组件中的DOM结构，有且只能有唯一的根元素（Root Element）来进行包裹！


#### 定义私有组件
- 03.组件-创建全局组件方式3.html
```
        var vm = new Vue({
            el: '#app',
            components: {   // 定义实例中私有组件的 组件的名称 和组件的 解构
                'mycom4': {
                    template: '<h6> 03.组件-创建全局组件方式3.html 这是定义的私有组件</h6>'
                }
            }
        });
```

#### 组件中展示数据和响应事件
- 04.组件-组件中是否有自己的data和methods.html
```
        Vue.component('mycom', {
            template: `<h5 v-on:click="show">这是自定义的全局组件 {{msg}}</h5>`,
            data: function(){   // 在 组件中，可以有自己的私有数据，但是，组件的 data 必须是一个 function，并且内部 return 一个 数据对象
                return {
                    msg: 'mycom data return msg'
                };
            },
            methods: {  // 尝试定义组件的私有方法
                show: function(){
                    console.log("mycom methods show");
                }
            }
        });
```

#### 组件的data必须是function并返回对象
- 05.组件-为什么组件的data必须是function并返回对象.html

- 为什么要把 组件中的 data 定义为一个function呢？ 
	- 因为这样做的话，每当我们在页面上引用一次组件，必然会先调用 这个 data function，从而得到一个当前组件私有的 数据对象；
#### 使用flag标识符和v-if与v-else实现组件的切换
- 06.组件的切换1.html
	- https://cn.vuejs.org/v2/api/#v-if
	- https://cn.vuejs.org/v2/api/#v-else
#### 使用component标签结合is属性切换多个组件
- 07.组件的切换2.html
	- https://cn.vuejs.org/v2/api/#component
#### 为组件切换添加动画效果
- 07.组件的切换2.html

#### 父组件通过属性绑定为子组件传递数据
- 08.父组件向子组件传值.html

##### 父组件向子组件传递普通数据
1. 把要传递给子组件的数据，作为 自定义属性，通过 v-bind: 绑定到子组件身上：
```
        <!-- 父组件如果想要给子组件传递数据，则需要使用属性绑定的形式 -->
        <!-- 这样，子组件身上的 自定义属性，就是你要传递给子组件的数据 -->        
        <com1 v-bind:msg1="parentMsg"></com1>
```
2. 在子组件中，不能直接使用父组件传递过来的数据，需要先使用props 数组来接收一下：
```
            components: {   // 定义私有组件
                'com1': {   // 在Vue中，默认，子组件无法直接获取父组件中的数据
                    template: `<h5>{{msg1}}</h5>`,
                    props: ['msg1'],    // 在Vue中，只有 props 是数组，其它带 s 后缀的属性都是 对象
                }
            }
```
3. 注意：在接收父组件传递过来的 props的时候，接收的名称，一定要和父组件传递过来的自定义属性，名称保持一致！

#### 父组件向子组件传递对象
- 09.父组件向子组件传递对象.html

#### 父组件把方法传递给子组件
- 10.父组件向子组件传递function.html

1. 事件绑定
```
        <!-- 1. 如果要向子组件传递 data 中的数据，则 使用 属性绑定的形式  v-bind: -->
        <!-- 2. 如果要向子组件传递 methods 中的 方法，则 使用 事件绑定的形式 v-on: -->
        <com1 v-on:func1="show"></com1>
```
2. this.$emit 调用
```
            components: {   // 定义子组件
                'com1': {
                    template: `<div>
                        <!-- 当点击子组件的  按钮时候， 调用一下 父组件传递过来的 func 方法 -->
                        <input type="button" value="com1按钮" v-on:click="btnClick"/>
                        </div>`,
                    methods: {
                        btnClick: function(){
                            console.log("com1 methods btnClick");
                            // 调用一下 父组件传递过来的 func1 方法  emit 英文原意为 发射， 在 计算机中，引申为 触发
                            this.$emit('func1');
                        }
                    }
                }
            }
```
#### 子组件向父组件传递数据
- 11.子组件向父组件传递数据.html

#### 案例：评论列表案例练习父子组件传值
- 12.评论列表案例.html

#### 使用ref属性操作页面上的元素或组件
- 13.在vue中$refs的使用.html
	- https://cn.vuejs.org/v2/api/#ref
```
    <div id="app">
        <input type="button" value="获取元素内容" v-on:click="getInfo" ref="ref_btn">
        <!-- ref     reference -->
        <h3 id="id_h3" ref="ref_h3">{{msg}}</h3>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                msg: 'vm data msg'
            },
            methods: {
                getInfo(){  // 点击按钮，获取 h3 中的文本内容
                    console.log("id_h3", document.getElementById('id_h3').innerHTML);

                    // ref 属性
                    console.log(this.$refs);
                    console.log("ref_h3", this.$refs.ref_h3.innerHTML);
                }
            }
        });
    </script>
```
- 14.使用ref属性获取页面上的组件.html
```
    <div id="app">
        <input type="button" value="获取页面上的组件" v-on:click="getCom">
        <com1 ref="ref_com1"></com1>
    </div>
    <script>
        Vue.component('com1', {
            template: `<h5>com1 {{msg}}</h5>`,
            data: function(){
                return {
                    msg: 'com1_data_msg'
                }
            },
            methods: {  // 子组件的方法
                show: function(){
                    console.log("com1_methods_show");
                }
            }
        });

        const vm = new Vue({
            el: '#app',
            data: {},
            methods: {
                getCom: function(){
                    console.log(this.$refs);
                    // 修改 子组件上的数据
                    this.$refs.ref_com1.msg="this.$refs.ref_com1.msg"
                    // 调用子组件中的方法
                    this.$refs.ref_com1.show();
                }
            }
        });
    </script>
```

#### vue中data和props的区别
- 15.data和props的区别.html
	1. data 在组件中，要被定义成function并返回一个对象
	2. props 在组件中，要被定义成数组，其中，数组的值都是字符串名，表示父组件传递过来的数据；
	3. props 的数据，不要直接拿来修改，如果想要修改，必须在 data 上重新定义一个 属性，然后把属性的值 从 this.props 拿过来

> data 上的数据，都是组件自己私有的， data 上的数据，都是可读可写的 
> props 数据，都是外界传递过来的数据， props 中的数据只能读取，不能重新写入


### 路由
1. 对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；
1. 对于单页面应用程序来说，主要通过[URL中的hash(#号)](https://www.cnblogs.com/joyho/articles/4430148.html)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；
1. 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）；
1. 前端的路由：就是根据不同的Hash地址，在页面上展示不同的前端组件；


#### 使用hash模拟前端路由的实现过程
- 16.URL地址中的#.html
- 17.Vue中自己监听Hash的改变现实不同的组件.html
	- https://developer.mozilla.org/zh-CN/docs/Web/API/WindowEventHandlers/onhashchange
	- https://developer.mozilla.org/zh-CN/docs/Web/API/Location
	- [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)


#### 18.vue-router的基本使用.html

- 18.vue-router的基本使用.html
	- https://router.vuejs.org/zh/installation.html

    - vue-router最基本的使用方式
    - router的匹配过程介绍

##### 路由的使用步骤总结
1. 导入 vue-router
2. 创建要进行切换的组件
3. 创建一个路由的对象
4. 把路由对象，通过 vm 的 router 属性，挂载到vm上
5. router-view 默认不会被渲染为元素
6. router-link 路由链接， router-link 默认渲染为 a 标签

#### 19.登录注册路由切换和高亮.html
- 19.登录注册路由切换和高亮.html
	- https://router.vuejs.org/zh/api/#tag
	- https://router.vuejs.org/zh/api/#linkactiveclass

    - 设置被选中路由高亮的两种方式
    - 使用路由规则的redirect属性实现重定向



#### 为路由的切换添加动画效果
- 20.设置路由的切换动画效果.html
	- https://cn.vuejs.org/v2/api/#transition


#### 在路由规则中定义参数

##### 在路由中获取query形式传递的参数
- 21.路由传参.html
```
21.路由传参.html#/login?id=10

        const login = { // 组件也有自己的生命周期函数，这些函数，和 vm 实例的 生命周期函数一致
            template: `<h5>登录组件{{$route.query.id}}</h5>`,
            created: function(){    // 当 login 组件 中 data 和 methods 初始化完毕后，调用 created
                console.log(this, this.$route, this.$route.query.id);
            }
        };
```
- 在路由中，使用?传参，不需要修改对应的路由规则；
##### 在路由中获取params形式传递的参数
- 22.路由传参2.html

1. 在规则中定义参数：
```
        const router = new VueRouter({
            routes:[
                {path: '/', redirect: '/login'},
                {path: '/login/:id/:name', component: login},
                {path: '/reg', component: reg},
            ]
        });
```
2. 通过 this.$route.params来获取路由中的参数：
```
        const login = {
            template: '<h5>登录组件{{this.$route.params.id}}-{{$route.params.name}}</h5>',
            created: function() {
                console.log(this, this.$route, this.$route.params);
            }
        };

```
3. router-link
```
        <router-link to="/login/100/tosin">登录</router-link>
```
##### 路由中使用props获取参数
- 23.路由中使用props获取参数.html
	- https://router.vuejs.org/zh/guide/essentials/passing-props.html

```
        const login = {
            template: '<h5>登录组件 {{id}}--{{name}}</h5>',
            props: ['id', 'name'],  // vue-router 新版本中，才提供的功能，在之前稍微老点的版本中，只能使用 $route.params.参数名
            created: function(){
                console.log(this, this.$route, this.id, this.name);
            }
        };
        const router = new VueRouter({
            routes:[
                {path: '/', redirect: '/login'},
                {path: '/login/:id/:name', component: login, props: true},
            ]
        });
```


## 2 Vue项目
## 3 Vue-devtools调试工具
- [手抓手带你使用vue devtools](https://zhuanlan.zhihu.com/p/196757661)

- [Vue-Devtools](https://cn.vuejs.org/v2/guide/installation.html#Vue-Devtools)
	- https://devtools.vuejs.org/
		- https://github.com/vuejs/devtools#vue-devtools
			- [Vue Devtools Guide](https://devtools.vuejs.org/guide/installation.html#settings)

> 以 _ 或 \$ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。

- 相关代码
	- basicGrammar-part1-1\07.简易计算器案例.html
	- basicGrammar-part1-2\04.生命周期函数.html
	- basicGrammar-part1-2\02.过滤器的基本使用.html
	- basicGrammar-part1-2\03.品牌列表-自定义指令.html
	- basicGrammar-part1-3\03.组件-创建全局组件方式3.html
	- basicGrammar-part1-4\08.使用wath监听URL地址的改变.html
	- basicGrammar-part1-4\10.计算属性的get和set.html
	- basicGrammar-part1-3\14.使用ref属性获取页面上的组件.html
	- basicGrammar-part1-3\12.评论列表案例.html
	- basicGrammar-part1-3\10.父组件向子组件传递function2.html
	- basicGrammar-part1-3\23.路由中使用props获取参数.html
	- basicGrammar-part1-3\23.路由中使用props获取参数.html

### 安装
```
E:\iEnviroment\development\projects\ideaProjects\VueDemo>git clone git@github.com:TosinJia/devtools.git
Cloning into 'devtools'...
remote: Enumerating objects: 18627, done.
remote: Counting objects: 100% (1474/1474), done.
remote: Compressing objects: 100% (637/637), done.
remote: Total 18627 (delta 879), reused 1404 (delta 827), pack-reused 17153R
Receiving objects: 100% (18627/18627), 13.58 MiB | 4.03 MiB/s, done.
Resolving deltas: 100% (12363/12363), done.

E:\iEnviroment\development\projects\ideaProjects\VueDemo\devtools>yarn install
User@WIN10-0009 MINGW64 /e/iEnviroment/development/projects/ideaProjects/VueDemo/devtools (main)
$ yarn run build
```
- chrome 更多工具->扩展程序
	1. 开启开发者模式
	2. 加载已解压的扩展程序（packages\shell-chrome）

### 界面功能
#### Inspector
##### Componets

###### 左侧 app
- 顶部工具栏
	- Find apps..
```
# basicGrammar-part1-3\03.组件-创建全局组件方式3.html
```
###### 中部 component
- 顶部工具栏
	- Find components... 

> 每个组件实例都有一个变量，当前选中的组件是\$vm 或 \$vm0，~~其余组件从上到下升序赋值(\$vm1、\$vm2、\$vm3...)~~，其余组件按选中的先后顺序倒序赋值（\$vm1、\$vm2、\$vm3...），控制台直接打印$vm0可以直接看到这个实例。
```
$vm==$vm0
	true
# $vm0-9和查看的次序有关，0当前查看的对象，1 前1次查看的对象，2 前2次查看的对象...
console.log($vm0, $vm1, $vm2, $vm3, $vm4, $vm5, $vm6, $vm7, $vm8, $vm9);
```

1. new Vue
	- data

1. Transition transition
	- props [properties]
1. TransitionGroup transition-group

1. RouterLink router-link
```
$vm0.$props
	{…}
		activeClass: undefined
		append: false
		ariaCurrentValue: "page"
		custom: false
		event: "click"
		exact: false
		exactActiveClass: undefined
		exactPath: false
		replace: false
		tag: "span"
		to: "/login"
```
1.  router-view 
	- <组件名|Anonymous Component> router-view:path1
		- <组件名|Anonymous Component> router-view:path1/path11
```
$vm0.$route
	{name: undefined, meta: {…}, path: '/login', hash: '', query: {…}, …}
		fullPath: "/login"
		hash: ""
		matched: Array(1)
			0: {path: '/login', regex: /^\/login(?:\/(?=$))?$/i, components: {…}, alias: Array(0), instances: {…}, …}
		length: 1
		[[Prototype]]: Array(0)
		meta: {}
		name: undefined
		params: {}
		path: "/login"
		query: {}
```

###### 右侧 state
- 顶部工具栏
	- Filter state...
	- Scroll to component
	- Show render code
	- Inspect DOM
	- Open ... in editor

> 面板内可以看到我们定义的一系列组件，选中相应的组件后，右侧面板可以看到组件内的```data```、```props```、```computed```、attrs属性，```$refs```，```route```。

- data属性是可以编辑的，编辑后页面也会实时改变

###### Force Refresh 强制刷新
###### [S] Select componet in the page
- Click on a componet on the page to select it
###### ...
1. Component names:
	- Original 原始
	- PascalCase Pascal命名法 大驼峰式命名法
	- kebab-case 短横线分割

##### Routes
- 展示路由相关信息
##### Vuex
- 展示Vuex相关信息
#### Timeline

##### Mouse
##### Keyboard
##### Component events 组件事件
- 展示组件事件调用相关信息
##### Performance
##### Router Navigations


### 开发者工具
- Inspector -> Componets component窗口选中需要查看的组件
#### Console
1. el
```
# basicGrammar-part1-1\07.简易计算器案例.html

// 自带属性方法以$、_开头
$vm0
$vm0.$el.id
$vm0.$options.el
```
1. data
```
# basicGrammar-part1-1\07.简易计算器案例.html

$vm0.$data
$vm0._data
$vm0.$data===$vm0._data
	true

$vm0.data中数据名

$vm0.$data.data中数据名===$vm0.data中数据名
	true
```
1. methods
```
# basicGrammar-part1-1\07.简易计算器案例.html

# [[FunctionLocation]]:  点击跳转 DOM未渲染 源码位置
$vm0.$options.methods

$vm0.methods中方法名 点击跳转 DOM未渲染 源码位置
$vm0.$options.methods.methods中方法名 点击跳转 DOM未渲染 源码位置

# 执行方法
$vm0.methods中方法名()
$vm0.$options.methods.methods中方法名()
```
1. 生命周期函数
```
# basicGrammar-part1-2\04.生命周期函数.html

# 点击跳转 DOM未渲染 源码位置
$vm0.$options.beforeCreate[$vm0.$options.beforeCreate.length-1]
$vm0.$options.created[$vm0.$options.created.length-1]

$vm0.$options.beforeMount[$vm0.$options.beforeMount.length-1]
$vm0.$options.mounted[$vm0.$options.mounted.length-1]

$vm0.$options.beforeUpdate[$vm0.$options.beforeUpdate.length-1]
$vm0.$options.updated[$vm0.$options.updated.length-1]

$vm0.$options.beforeDestroyed[$vm0.$options.beforeDestroyed.length-1]
$vm0.$options.destroyed[$vm0.$options.destroyed.length-1]
```
- 过滤器
```
# basicGrammar-part1-2\02.过滤器的基本使用.html
$vm0.$options.filters
	{addStr: ƒ, strFormat: ƒ} 私有过滤器
		addStr: ƒ (data) 私有过滤器
		strFormat: ƒ (data)
		[[Prototype]]: Object
			strFormat: ƒ (data, str="XE") 全局过滤器

# 点击跳转 DOM未渲染 源码位置
$vm0.$options.filters.私有过滤器名字 
```

- 指令
```
# basicGrammar-part1-2\03.品牌列表-自定义指令.html

# 指令 指令名.[[FunctionLocation]] 源码位置
$vm0.$options.directives
	{bold: {…}, italic: {…}, italic1: {…}} 私有指令
		bold: {bind: ƒ}
		italic: {bind: ƒ, update: ƒ}
		italic1: {bind: ƒ, update: ƒ}
		[[Prototype]]: Object
			color: {bind: ƒ} 全局指令
			focus: {bind: ƒ, inserted: ƒ, update: ƒ, componentUpdated: ƒ, unbind: ƒ} 全局指令
			model: {inserted: ƒ, componentUpdated: ƒ}
			show: {bind: ƒ, update: ƒ, unbind: ƒ}
# 点击跳转 DOM未渲染 源码位置
$vm0.$options.directives.私有指令名字
```

- components 组件
```
# basicGrammar-part1-3\03.组件-创建全局组件方式3.html

$vm0.$options.components
	{mycom4: {…}}
		mycom4: {template: '<h6> 03.组件-创建全局组件方式3.html 这是定义的私有组件</h6>', _Ctor: {…}} 私有组件
		[[Prototype]]: Object
			KeepAlive: {name: 'keep-alive', abstract: true, props: {…}, methods: {…}, created: ƒ, …}
			Transition: {name: 'transition', props: {…}, abstract: true, render: ƒ}
			TransitionGroup: {props: {…}, methods: {…}, beforeMount: ƒ, render: ƒ, updated: ƒ}
			mycom3: ƒ VueComponent(options) 全局组件构造函数

# 查找源码 Search【Ctrl+Shif+F】
```
- watch
```
# basicGrammar-part1-4\08.使用wath监听URL地址的改变.html

$vm0.$options.watch
# 点击跳转 DOM未渲染 源码位置
$vm0.$options.watch.要监听的数据
$vm.$options.watch["要监听的数据"]
```
- computed 计算属性
```
# basicGrammar-part1-4\10.计算属性的get和set.html

$vm0.$options.computed
# 点击跳转 DOM未渲染 源码位置
$vm0.$options.computed['computed中数据名']
	.get
	.set
$vm0.computed中数据名

$vm0.$options.computed
	{fullname: {…}}
		fullname:
			get: ƒ ()
			set: ƒ (val)

$vm0._computedWatchers
	{fullname: Watcher}
		fullname: Watcher
			active: true
			before: undefined
			cb: ƒ noop(a, b, c)
			deep: false
			depIds: Set(2) {3, 4}
			deps: (2) [Dep, Dep]
			dirty: false
			expression: "function(){    // get 表示外界要引用 fullname 的值 //$vm0.$options.computed['fullname'].get\n                        console.log('computed fullname get');\n                        return this.firstname + '-' + this.lastname;\n                    }"
			getter: ƒ ()
				arguments: null
				caller: null
				length: 0
				name: "get"
				prototype: {constructor: ƒ}
				[[FunctionLocation]]: 10.计算属性的get和set.html:32
				[[Prototype]]: ƒ ()
				[[Scopes]]: Scopes[2]
			id: 1
			lazy: true
			newDepIds: Set(0) {size: 0}
			newDeps: []
			sync: false
			user: false
			value: "-"
			vm: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
```

- ref
```
# basicGrammar-part1-3\14.使用ref属性获取页面上的组件.html

$vm0.$refs
	{ref_btn: input, ref_com1: VueComponent, ref_h3: h3#id_h3}
		ref_btn: input
		ref_com1: VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
		ref_h3: h3#id_h3

$vm0.$refs.ref_com1===$vm1
	true
```

组件
- 基础数据
```
# basicGrammar-part1-3\12.评论列表案例.html

# 选中Root，选中cmt-box，选中Root
# 子对象实例
$vm0.$children[0]===$vm1
true

$vm1.$options._componentTag
	'cmt-box'
```
- template
```
$vm0.$options.template
```
- 事件绑定 属性绑定
```

# day3 basicGrammar-part1-3\10.父组件向子组件传递function2.html

//<com1 v-on:func="show" v-bind:func1="show" v-on:func3="show3"></com1>
$vm0._events
	{func: Array(1), func3: Array(1), hook:beforeDestroy: Array(1)}
		func: [ƒ]
		func3: [ƒ]

$vm0._props
	{}
		func1: ƒ ()
$vm0.$props
	{}
		func1: ƒ ()
```
- props
```
# basicGrammar-part1-3\23.路由中使用props获取参数.html

# 值内容
$vm.$props===$vm0._props
true

$vm.$props.props元素名

$vm.$props.props元素名===$vm0.$options.propsData.props元素名
	true

$vm0.$props
	{}
		id: "100"
		name: "tosin"
$vm0._props
	{}
		id: "100"
		name: "tosin"

# 配置
$vm0.$options.props
	{name: {…}, id: {…}}
		id: {type: null}
		name: {type: null}

$vm0.$options.propsData
	{name: 'tosin', id: '100'}
		id: "100"
		name: "tosin"


# transition basicGrammar-part1-2\14.动画-使用JS动画生命周期函数.html

$vm0
	VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
$vm0.$props
	{…}
		appear: (...)
		appearActiveClass: (...)
		appearClass: (...)
		appearToClass: (...)
		css: (...)
		duration: (...)
		enterActiveClass: (...)
		enterClass: (...)
		enterToClass: (...)
		leaveActiveClass: (...)
		leaveClass: (...)
		leaveToClass: (...)
		mode: (...)
		name: (...)
		type: (...)
# transition-group basicGrammar-part1-2\15.动画-列表过渡.html

$vm0
	VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
vm0.$props
	{…}
		...
		moveClass: (...)

```
##### 路由
``` 
# basicGrammar-part1-3\23.路由中使用props获取参数.html

# 选中挂载路由的vm实例
$vm0.$router===$vm0._router
	true
$vm0.$router===$vm0.$options.router
	true

$vm0.$router.options.routes
$vm0._router.options.routes
$vm0.$options.router.options.routes

$vm0._router.options
	{routes: Array(4)}
		routes: Array(4)
			0: {path: '/', redirect: '/login'}
			1: {path: '/login', component: {…}}
			2: {path: '/login/:id/:name', component: {…}, props: true}
			3: {path: '/reg', component: {…}}
			length: 4

# 选中 router-view 中
$vm0.$router===$vm1.$router
	true
$vm0.$router===$vm0._router
	false
$vm0._router
	undefined

// <router-link to="/login?id=10">登录1</router-link>
$vm0.$route.query
	{id: '10'}

//<router-link to="/login/100/tosin">登录2</router-link>
//{path: '/login/:id/:name', component: login2, props: true},
$vm0.$route.params
	{id: '100', name: 'tosin'}
```

##### vuex
```
$vm0.$store
$vm0.$store.state
$vm0.$store._modulesNamespaceMap
$vm0.$store._mutations
$vm0.$store._actions
```

#### Elements
- 渲染后
#### Sources
- 未渲染
- 执行过程中可打断点
