/*
 * @Author: zhanghongqiao 
 * @Date: 2019-04-23 15:25:48 
 * @Email: 991034150@qq.com 
 * @Description: 产品
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-25 10:36:26
 */

 
import { fetch } from '@/util/request'
 
const state = {
  allProductsList: [], // 所有产品
  eqPoolProductsList: [] // 设备池产品
}

// getters
const getters = {
  eqPoolProductsList: state => state.eqPoolProductsList,
  allProductsList: state => state.allProductsList,
}

/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 查询设备池产品
   * @param {function} {commit}
   */
  eqPoolProductsListRequest ({commit}) {
    fetch('fetchFindEqPoolProducts', (data) => {
      commit('eqPoolProductsListSuccess', data)
    })
  },

  /**
   * @description 查询设备池产品
   * @param {function} {commit}
   */
   allProductsListRequest ({commit}) {
    fetch('fetchFindByType',  {type: 2}, (data) => {
      commit('allProductsListSuccess', data)
    })
  },
}
 
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 设备池产品查询成功
   * @param {object} state
   * @param {array} id
   */

  eqPoolProductsListSuccess(state, data) {
    state.eqPoolProductsList = data
  }, 

   /**
   * @description 所有产品查询成功
   * @param {object} state
   * @param {array} id
   */

  allProductsListSuccess(state, data) {
    state.allProductsList = data
  }, 
}

export default {
  state,
  getters,
  actions,
  mutations
}
