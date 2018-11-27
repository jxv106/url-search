;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : (global.URLSearch = factory())
})(window, function() {
  function URLSearch() {
    if (!(this instanceof URLSearch)) {
      console.error('Illegal call requires new keyword')
    } else {
      initialCall.call(this)
    }
  }

  function initialCall() {
    this.data = {};
    var queryList = parseURL();
    if (queryList && queryList.length) {
      for (var i = 0; i < queryList.length; i++) {
        var current = Object.keys(queryList[i]);
        this.data[current[0]] = queryList[i][current[0]]
      };
      watcher(this.data)
    }
  }

  URLSearch.parse = function(url) {
    return parseURL(url)
  }

  URLSearch.prototype.push = function(key, val) {
    if (typeof key !== 'object' && typeof key !== 'function') {
      this.data[key] = val || '';
      watcher(this.data);
      this.update()
    }
  }

  URLSearch.prototype.remove = function(key) {
    var that = this;
    var otherKey = {};
    Object.keys(this.data).forEach(function($key) {
      if (typeof key !== 'object' && typeof key !== 'function') {
        if ($key !== key) {
          otherKey[$key] = that.data[$key]
        }
      }
    });
    this.data = otherKey;
    watcher(this.data);
    this.update()
  }

  URLSearch.prototype.update = function() {
    update(this.data)
  }

  URLSearch.prototype.toString = function() {
    var that = this;
    var result = [];
    Object.keys(this.data).forEach(function(key) {
      result.push(key + '=' + that.data[key])
    });
    if (result.length) {
      return '?' + result.join('&')
    } return ''
  }

  function parseURL() {
    var search = window.location.search;
    var map = [];
    var array = search.replace(/^\?+/g, '').split('&');
    if (array.length) {
      for (var i = 0; i < array.length; i++) {
        var obj = {}
        var current = array[i].split('=');
        if (current.length && current.length > 1) {
          obj[current[0]] = decodeURI(current[1]);
          map.push(obj)
        }
      }
    }
    return map
  }

  function watcher(obj) {
    if (Object.defineProperty) {
      Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        Object.defineProperty(obj, key, {
          get: function getter() {
            return value
          },
          set: function setter(newVal) {
            if (newVal !== value && typeof newVal !== 'object' && typeof newVal !== 'function') {
              value = newVal;
              update(obj)
            }
          }
        })
      });
      return obj
    }
  }

  function update(data) {
    var result;
    Object.keys(data).forEach(function(key, index) {
      if (index === 0) {
        result = '?' + key + '=' + data[key]
      } else {
        result = result + '&' + key + '=' + data[key]
      }
    });
    if (history && history.replaceState) {
      history.replaceState(null, null, result || location.href.split('?')[0])
    } else {
      location.replace(location.href.split('?')[0] + (result || ''))
    }
  }
  return URLSearch
});
