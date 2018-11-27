# url-search
## 基于响应式的地址栏参数管理插件.
## 支持IE10
## npm i url-search
## ver 1.0.3
## use
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

// observe
url.data.type = 1; // '?type=1'
url.data.type = 2; // '?type=2'
// 
```
