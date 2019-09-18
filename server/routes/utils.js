/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-18 09:41:27 
 * @Email: 991034150@qq.com 
 * @Description: 工具类
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 09:47:21
 */

 
/**
 * @description 生成uid
 * @returns uid
 */
module.exports =  function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

