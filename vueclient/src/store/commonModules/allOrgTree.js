/*
 * @Author: wangjinnan
 * @Date: 2018-11-22 17:08:49 
 * @Email: 991034150@qq.com 
 * @Description: 当前登录用户下所有可读可写客户数
 * @Last Modified by: wangjinnan
 * @Last Modified time: 2018-11-22 17:10:58
 */


import {fetch} from '@/util/request'

const state = {
  allOrgTree: [] // 客户信息
}

// getters
const getters = {
  allOrgTree: state => state.allOrgTree,
}

/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 查询所有的客户以及子客户（所属客户）
   * @param {function} {commit}
   */
  orgTreeRequest({commit}) {
    fetch('fetchGetOrgTreeByLoginUser', (data) => {
      commit('orgTreeSuccess', data)
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

  orgTreeSuccess(state, data) {
    state.allOrgTree = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
