/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:22:20
 * @Email: 991034150@qq.com
 * @Description: 所有Api 出口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 15:20:15
 */
 
import * as logoApi  from './logo' // 登录、退出接口
import * as adminApi  from './adminList' // 管理员管理
import * as studentsApi  from './students' // 学员管理
export default { 
  ...logoApi,
  ...adminApi,
  ...studentsApi,
}
