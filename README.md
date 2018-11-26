# url-search
An address bar parameter managerment plugin.
## npm i url-search
## ver 1.0.0
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
```
