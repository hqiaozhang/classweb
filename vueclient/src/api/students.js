/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-18 15:18:04 
 * @Email: 991034150@qq.com 
 * @Description: 学员管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 15:19:39
 */

// 列表查询
export const fetchStudentList = {
  url: '/students/page',
  config: {
    method: 'POST', 
  },
}

// 新增
export const fetchStudentAdd = {
  url: '/students/add',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

// 编辑
export const fetchStudentUpdate = {
  url: '/students/update',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

// 删除
export const fetchStudentDelete = {
  url: '/students/delete',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

