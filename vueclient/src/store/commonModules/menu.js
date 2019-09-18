/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 21:06:45
 * @Email: 991034150@qq.com
 * @Description: 顶部导航数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-16 15:31:14
 */

import { fetch } from '@/util/request'
 
let activeId = ""
/**
 * 获取菜单地址
 * @param {*} data 
 * @param {*} pathname 
 */
function getMenuActiveId(data, pathname) {
  if(_.isEmpty(data)) {
    return
  }
  data.map(item => {
    if(item.functionUrl == pathname) {
      return activeId = item.id
    }
    if(!_.isEmpty(item.childList)) {
        getMenuActiveId(item.childList, pathname)
    }
  })
  return activeId
}
 
const state = {
  rootMenu: [],
  defaultActive: activeId,
  isOpenSideMenu: false,
}

// getters
const getters = {
  rootMenu: state => state.rootMenu,
  defaultActive: state => state.defaultActive,
  isOpenSideMenu:  state => state.isOpenSideMenu,
}

/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 获取地区列表数据
   * @param {function} {commit}
   */
  rootMenuRequest ({commit}) {
    fetch('fetchMenus', (data) => {
      commit('rootMenuSuccess', data)
      /* 默认进来判断是否有设置id，判断第一个是否有childList，没有就取一级id，
        有childList取childList第一个id
      */
     if(_.isEmpty(data)) {
       return
     }   
      let pathname = location.pathname.slice(10)
      let activeId = getMenuActiveId(data, pathname)
      if(!activeId) {
        activeId = sessionStorage.getItem('defaultActive')
      }
      commit('setSideMenuDefActive', activeId)
    })
  },
}


// 顶部导航mutations
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 设置顶层菜单成功
   * @param {object} state
   * @param {array} id
   */

  rootMenuSuccess(state, menu) {
    state.rootMenu = menu
  },

  /**
   * 设备左边菜单的默认展开项
   * @param {Object} state 
   * @param {*} id 
   */ 
  setSideMenuDefActive(state, id) {
    sessionStorage.setItem('defaultActive', id)
    state.defaultActive = id
  },

  setOpenSideMenu(state, flag) {
    state.isOpenSideMenu = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
