# angular-cuf-nav
基于angular的导航菜单 http://get-set.cn/angular-cuf-nav

![ScreenShot](https://github.com/hjzheng/angular-cuf-nav/raw/master/img/angular-cuf-nav.png)

### Usage

- Step1: 引入依赖的文件
```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="build/css/angular-cuf-nav.min.css">
<script src="bower_components/jquery/jquery.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="build/js/angular-cuf-nav.min.js"></script>
```
 
- Step2: 配置依赖模块
```javascript
angular.module('test', ['cuf.nav']);
```
 
### API
  
| 指令    |    描述   | 
| -----  | --------- |  
| cufNav | 最上层标签 |
| cufNavItem | cufNav的直接子标签 |
| cufNavChildItem | 最后一层标签,可以自己相互嵌套，达到多级菜单效果 |

**cufNav**

|参数	| 值 |	作用 |
| --- | --- | ----| 
|triggered-event|	click 或者 mouseover 默认click |	决定导航菜单以什么事件触发展开|

**cufNavItem**

|  参数	 | 值 	|作用 |
| -----  | --------- | ----| 
| label	| 字符串	| 决定菜单显示, 它的值必须唯一|
|href	|字符串	|一般结合ngRoute或ui.router去使用|
|triggered-event|	click 或者 mouseover 默认会使用cufNav的triggered-event值	|决定导航子菜单以什么事件触发展开|
|has-children	|布尔值 |	如果cufNavItem下需要包含cufNavChildItem标签，就必须配置该属性，反之不要配|
|item-click     | 函数               |        |


**cufNavChildItem**

|参数|	值|	作用|
| -----  | --------- | ----| 
|label	|字符串	|决定菜单显示, 它的值必须唯一|
| href	|字符串	|一般结合ngRoute或ui.router去使用|
|has-children	|布尔值              |	如果cufNavChildItem下需要嵌套cufNavChildItem标签，就必须配置该属性，反之不要配|
|item-click     | 函数               |        |

### Example
- [Example1](http://get-set.cn/angular-cuf-nav/#/example1)
- [Example2](http://get-set.cn/angular-cuf-nav/#/example2)
- [Example3](http://get-set.cn/angular-cuf-nav/#/example3)
- [Example4](http://get-set.cn/angular-cuf-nav/#/example4)
- [Example5](http://get-set.cn/angular-cuf-nav/#/example5)

### More
 - git clone https://github.com/hjzheng/angular-cuf-nav
 - cd angular-cuf-nav
 - npm install
 - bower install
 - 启动一个喜欢的web server, 使用喜欢的浏览器访问即可
 - 或者直接访问 http://get-set.cn/angular-cuf-nav
