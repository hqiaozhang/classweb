/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 15:56:16
 */

import Vue from 'vue'
import Router from 'vue-router'
// 注册Router
Vue.use(Router)
// 配置项
import config from '@/config/base.config'
import backIndex from '@/containers/backIndex'
import courseList from '@/containers/courseList'
import indexContent from '@/containers/indexContent'
import adminList from '@/containers/adminList'
import studentList from '@/containers/studentList'
import courseEdit from '@/containers/courseEdit'

// 登录
const Login = () => import('@/containers/login/index.vue')
  
const  routes =  [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/index', //首页框架
    name: 'index',
    component: backIndex,
    children:[
      {
        path: 'courseList', //课程列表
        name: '课程列表',
        component: courseList
      },{
        path: 'courseEdit/:sysId', //编辑课程
        component: courseEdit
      },{
        path: 'indexContent', //首页统计
        component: indexContent,
        name: '首页',
      },{
        path: 'adminList', //后台用户
        component: adminList,
        name: '后台用户'
      },{
        path: 'studentList', //学员用户
        component: studentList,
        name: '学员用户'
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: config.routerPath,
  routes
})
