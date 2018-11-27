# url-search
## 基于响应式的地址栏参数管理插件
## npm i url-search
## version 1.0.7
## Usage
```
const URLSearch = require('url-search');
const url = new URLSearch();

url.push('type', 1); // '?type=1'
url.push('keyword', 'hello'); // '?type=1&keyword=hello'

url.remove('type'); // '?keyword=hello'
url.remove('keyword'); // ''

url.data.type = 1;
url.data.keyword = 'hello';
url.update();
// '?type=1&keyword=hello'
```
## Methods
```
const URLSearch = require('url-search');
URLSearch.prototype.push || function
URLSearch.prototype.remove || function
URLSearch.prototype.update || function
URLSearch.parse || function
```
