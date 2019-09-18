/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 15:54:54 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-05-28 15:08:50
 */

import {getCookie} from '@/util/util'

// let logged = sessionStorage.getItem('logged')
let logged = !getCookie('admin_token') ? true :  false
let userName = getCookie('adminFullName')
const state = {
  logged: logged,
  userId: getCookie('adminUserId'),
  userName: userName,
}


// getters
const getters = {
  logged: state => state.logged,
  userId: state => state.userId,
  userName: state => decodeURI(state.userName)
}

// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState(state, logged) {
    state.logged = logged
    sessionStorage.setItem('logged', logged)
    mutations.setUserName(state, getCookie('adminFullName'))
    mutations.setUserId(state, getCookie('adminUserId'))
  },

  /**
   * 设置用户id
   * @param state
   * @param userId
   */
  setUserId(state, userId) {
    state.userId = userId
  },

  /**
   * 设置用户名
   * @param state
   * @param userId
   */
  setUserName(state, userName) {
    state.userName = userName
  },
  /**
   * 设置城市类型
   * @param state
   * @param userId
   */
  setCityType(state, cityType) {
    state.cityType = cityType
  },
  
}

export default {
  state,
  getters,
  mutations
}
