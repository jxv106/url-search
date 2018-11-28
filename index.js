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
      }
      watcher(this.data)
    }
  }

  URLSearch.parse = function(url) {
    if (
      url &&
      typeof url === 'string'
    ) {
      return parseURL(url)
    }
  }

  URLSearch.prototype.push = function(key, val) {
    var $key, $val;
    if (arguments.length === 1) {
      if (typeof key === 'string') {
        $key = key;
        $val = ''
      }
    } else if (arguments.length >= 2) {
      if (
        key &&
        typeof key === 'string' &&
        (typeof val === 'string' || typeof val === 'number')
      ) {
        $key = key;
        $val = val || ''
      }
    } else {
      val = ''
    }
    if ($key) {
      this.data[$key] = $val;
      this.update()
    }
  }

  URLSearch.prototype.remove = function(key) {
    var that = this,
      otherKey = {};
    if (
      !key &&
      typeof url !== 'string'
    ) return;
    Object.keys(this.data).forEach(function($key) {
      if ($key !== key) {
        otherKey[$key] = that.data[$key]
      }
    });
    this.data = otherKey;
    this.update()
  }

  URLSearch.prototype.update = function() {
    var that = this,
      map = {};
    if (
      this.data !== null &&
      typeof this.data === 'object'
    ) {
      Object.keys(this.data).forEach(function(key) {
        if (
          typeof that.data[key] === 'string' ||
          typeof that.data[key] === 'number'
        ) {
          if (
            Object.getPrototypeOf(that.data).hasOwnProperty(key) ||
            key === '__proto__'
          ) {
            that.remove(key);
            console.warn(
              'Cannot set built-in properties =>> '
              + key
              + '\n deleted =>> '
              + key)
          } else {
            map[key] = that.data[key]
          }
        } else {
          typeError(key, that.data[key])
        }
      });
      if (!isEmptyObject(map)) {
        this.data = map;
        update(this.data);
        watcher(this.data)
      } else {
        this.data = map;
        update({})
      }
    } else {
      console.warn(
        'Data can only be an object type =>> '
        + '{ data = '
        + typeof this.data +
        '}')
    }
  }

  URLSearch.prototype.toString = function() {
    var that = this,
      result = [];
    Object.keys(this.data).forEach(function(key) {
      result.push(key + '=' + that.data[key])
    });
    if (result.length) {
      return '?' + result.join('&')
    }
    return ''
  }

  function typeError (key, value) {
    console.warn(
      'Only values ​​of type String|Number can be added =>> '
      + '\n data = { '
      + key
      + ': '
      + typeof value +
      ' }')
  }

  function isEmptyObject(v) {
    for (var item in v) {
      return false
    }
    return true
  }

  function parseURL(url) {
    var search = (url || window.location.search).split('?'),
      map = [];
    if (search.length >= 2 && search[1]) {
      var array = search[1].replace(/^\?+/g, '').split('&');
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
  }

  function watcher(obj) {
    Object.keys(obj).forEach(function(key) {
      var value = obj[key];
      Object.defineProperty(obj, key, {
        get: function getter() {
          return value
        },
        set: function setter(newVal) {
          console.log(newVal)
          if (
            typeof newVal === 'string' ||
            typeof newVal === 'number'
          ) {
            if (newVal !== value) {
              value = newVal;
              update(obj)
            }
          } else {
            typeError(key, newVal)
          }
        }
      })
    });
    return obj
  }

  function update(data) {
    var result = '';
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
      location.replace(location.href.split('?')[0] + (result || null))
    }
  }
  return URLSearch
});
