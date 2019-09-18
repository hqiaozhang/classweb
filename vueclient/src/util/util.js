/*
 * @Author: zhanghongqiao@hiynn.com
 * @Date: 2018-04-18 11:05:26
 * @Description: 共用方法
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 14:24:54
 */
import config from '@/config/base.config'
/**
 *  获取某个范围的随机数
 *  @param    {number}  min 最大值
 *  @param    {number}  max 最小值
 *  @return   {object}  null
 */
export const randomNumber = (min, max) => {
  let range = max - min
  let rand = Math.random()
  let num = min + Math.round(rand * range)
  return num
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  const { length } = list
  let index = 0
  let value
  while (++index < length) {
    value = list[index]
    if (f(value, index, list)) {
      return value
    }
  }
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

/**
 * 重置字体大小
 */
export function resetSize() {
  let docEl = document.documentElement
  let uiw = 1920

  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (clientWidth <= 768) {
      uiw = 750
    }
    if (!clientWidth) return;
    // if (clientWidth >= 768) {
    //   docEl.style.fontSize = 100 * (768 / uiw) + 'px';
    // } else {
    //   docEl.style.fontSize = 100 * (clientWidth / uiw) + 'px';
    // }
    docEl.style.fontSize = 100 * (clientWidth / uiw) + 'px';
  }
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  recalc()
  window.addEventListener('resize', function () {
    recalc()
  })
}

/**
 * 设置Cookie
 * @param {string} key
 * @param {*} val
 * @param {*} path
 */
export function setCookie(key, val, path) {
  if (!path) path = "/";
  document.cookie = key + "=" + val + "; expires=Session; path=" + path;  //设置cookie
}

/**
 * 获取Cookie
 * @param {string} key 获取 Cookie
 */
export function getCookie(key) {
  /*获取cookie参数*/
  let getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
  let arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  let tips;  //声明变量tips
  for (let i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
    let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1];   //将cookie的值赋给变量tips
      break;   //终止for循环遍历
    }
  }
  return tips;
}

/**
 *
 * 清空cookie
 * @export
 * @param {string} name
 */
export function clearCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 20);
  var cval = getCookie(name);
  if (cval != null) {
    console.log("=0" + cval + ";expires=" + exp.toGMTString())
    document.cookie = name + "=0" + cval + ";expires=" + exp.toGMTString();
  }
}

/**
 * 获取地址栏参数
 * @param {string} name
 */
export function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}



// 回到顶部
export function scrollTop(iTarget, time) {
  let timer = null
  // 起点
  let start = document.documentElement.scrollTop || document.body.scrollTop;
  // 距离
  let dis = iTarget - start;
  // 次数
  let count = Math.round(time / 30);
  let num = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    num += 1;
    // 匀减速
    let a = 1 - num / count;
    let cur = start + dis * (1 - Math.pow(a, 3));
    document.documentElement.scrollTop = cur;
    document.body.scrollTop = cur;
    if (num == count) {
      clearInterval(timer);
    }
  }, 30)
}

/**
 * 消息提示框
 * @param {Object} vm
 * @param {String} text 提示信息
 */
import { Message } from 'element-ui';
export function messagePopup(text, type, dur) {
  let duration = dur || 2000 // 默认2秒
  let tlen = text.length
  // 没有设置延迟关闭时间，并且文字长度大于5
  if(!dur && tlen > 5) {
     if(tlen > 5 && tlen <= 10) {
      duration = 3000
     }else if(tlen > 10) {
      duration = 5000
     }
  }
   
  Message({
    message: text,
    duration: duration, // 0 不关闭弹窗
    center: true,
    type: type || "info",
    // showClose: true 
  });
}

export function initLoaderMsg(vm, text) {
  
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

// 重置序号
export function indexMethod(index) {
  if (this.paging.currentPage > 1) {
    return index + 1 + (this.paging.currentPage - 1) * this.paging.pageSize;
  }
  return index + 1;
}

/**
  * 判断一个数组是否包含另一个数组
  * @param {Object} a 全部数据
  * @param {String} b 包涵的数据
  */
export function isContained(a, b) {
  if (
    !(a instanceof Array) ||
    !(b instanceof Array) ||
    a.length < b.length
  ) {
    return false;
  }
  for (let i = 0; i < b.length; i++) {

    if (!a.includes(b[i])) return false;
  }
  return true;
}


export function tableIndexMethod(currentPage, index) {
  if (currentPage > 1) {
    return index + 1 + (currentPage - 1) * 10;
  }
  return index + 1;
}

/**
 * 保存当前页条件
 * @param {Object} vm 当前实例
 * @param {Object} pars 查询参数
 * @param {Object} paging  分页参数
 */
export function saveListPagePars(vm, pars, paging) {
  vm.$store.dispatch('saveListPagePars', { path: vm.$route.path, pars: pars, paging: paging || vm.paging });
}


/**
 * 获取当前页保存的条件
 * @param {Object} vm 当前实例
 * @param {Object} pars 查询参数
 * @param {Object} page  分页参数
 */
export function getListPagePars(vm, pramas, page) {
  const { path, pars, paging } = vm.listPagePars

  return new Promise((resolve, reject) => {
    if (path.includes(vm.$route.path)) {
      vm[pramas] = pars
      vm[page || 'paging'] = paging
    }
    resolve()
  })
}

/**
 * 判断两个对象的属性是否完全相面
 * @param {Object} aObj 对象a
 * @param {Object} bObj 对象b
 */
export function isObjectValueEqual(aObj, bObj) {

  let aProps = Object.getOwnPropertyNames(aObj);
  let bProps = Object.getOwnPropertyNames(bObj);
  // console.log(aProps, bProps)
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if ( String(aObj[propName]) !== String( bObj[propName])) {
      return false;
    }
  }
  return true;
}

/**
 * 返回列表页
 * @param {Object} vm 
 * @param {String} path 返回路由
 * @param {String} name 页面名称
 */
export function backListPage(vm, path, name) {
  vm.$router.push({
    path: path,
    name: name,
    params: {
      back: 1
    }
  })
}

/**
 * 获取url所有参数
 * @param {String} url url 
 */
function parseUrl(url){
  var result = {};
  var query = url.split("?")[1];
  var queryArr = query.split("&");
  queryArr.forEach(function(item){
    var obj = {};
    var value = item.split("=")[0];
    var key = item.split("=")[1];
    result[value] = key;
  });
  return result;
}

/**
 * 返回列表页
 * @param {Object} vm 
 * @param {String} path 返回路由
 * @param {String} name 页面名称
 */
export function backListPagePar(path, name) {
  let query = {}
  // 判断是否是有参数
  if(path.includes('?')) {
    query = parseUrl(path)
  }
  return {
    path: path,
    name: name,
    query: query,
    // 返回的时候必须加一个back参数，在列表页保留条件
    params: {
      back: 1
    }
  }
}

/**
 * 新增路由跳转
 * @param {Object} vm 
 * @param {String} path 路由
 */
export function gotoDetailsPage(vm, path) {
  vm.$router.push({
    path: path,
    query: {
      isDetail: 1
    }
  })
}

export const clickoutside = {

  // 初始化指令
  bind(el, binding, vnode) {

    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        console.log('binding', binding)
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

const KEY_MAP = {
  'PM25': `PM<sub>2.5</sub>`,
  'CO2': `CO<sub>2</sub>`,
  'PM10': `PM<sub>10</sub>`,
  'SO2': `SO<sub>2</sub>`,
  'NO2': `NO<sub>2</sub>`,
  'O3': `O<sub>3</sub>`
}

/**
 * 转换污染源下角标
 * @param name 污染源name
 * @returns {*}
 */
export function formatterSub(name) {
  let key = name.toUpperCase()
  let html = KEY_MAP[key]
  if (html) {
    return html
  }
  return name
}


export function requestErrorTips(error) {
  let data = JSON.parse(error.request.response)
  // switch(data.code) {
  //   case 8000:
  //   case 5000:
  //     data.msg = '服务器错误'
  //     break;
  //   default: 
  //     data.msg = '服务器错误'

  // }
  return data
}