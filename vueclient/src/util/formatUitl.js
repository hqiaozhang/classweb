/*
 * @Author: zhanghongqiao 
 * @Date: 2018-12-28 18:19:11 
 * @Email: 991034150@qq.com 
 * @Description: 所有格式化方法
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-24 16:30:51
 */


 /**
  * 格式化登录状态
  * @param {String} type 状态类型 
  * @param {Number} flag 标识（1是反向） 
  */
export function formatLoginStatus(type, flag) {
  // 0:未激活、1:登录中、2:退出、3:未使用、4:锁定 ,
  if(flag != 1) {
    switch(Number(type)) {
      case 0: 
       return '未激活'
      case 1:
       return '登录中' 
      case 2: 
       return '退出'
      case 3: 
       return '锁定'
      case 4: 
       return '禁用'   
      default:
       return type
    }
  }else {
    switch(type) {
      case '未激活': 
        return 0
      case '登录中':
        return 1
      case '退出': 
        return 2
      case '锁定': 
        return 3
      case '禁用': 
        return 4
      default:
       return type
    }
  }
}

 /**
  * 格式化性别
  * @param {String} type 状态类型 
  * @param {Number} flag 标识（1是反向） 
  */
export function foramtGender(type, flag) {
  // 0 未知，1男，2女
  if(flag != 1) {
    switch(Number(type)) {
      case 0:
        return '未知'
      case 1:
        return '男'
      case 2:
        return '女'    
      default:
        return type  
    }
  }else {
    switch(type) {
      case '未知':
        return 0
      case '男':
        return 1
      case '女':
        return 2
      default:
        return type  
    }
  }
}

 /**
  * 格式化公司类型
  * @param {Number} type 类型1：政府；2：企业;3:机构;4:其他
  */
 export function formatCompanyType(type, flag) {
  if(flag != 1) {
    switch(type) {
      case 1:
        return '政府'
      case 2:
        return '企业'
      case 3:
        return '机构'
      case 4:
        return '其他'
      default:
        return type
    }
  }else {
    switch(type) {
      case '政府':
        return 1
      case '企业':
        return 2
      case '机构':
        return 3
      case '其他':
        return 4
      default:
        return type
    }
  }
}


/**
 * 服务类型(1:设备和服务，2：设备，3：服务) ,
 * @param {Number or String} type
 * @param {Boolean} flag 标识
 */
export function formatServiceType(type, flag) {
  if(flag != 1) {
    switch(type) {
      case 1:
       return '设备和服务'
      case 2:
       return '设备'
      case 3:
       return '服务'
      default:
       return type
    }
  }else {
    switch(type) {
      case '设备和服务':
       return  1
      case '设备':
       return 2
      case '服务':
       return 3
      default:
       return type
    }
  }
}
// 订单类型（1:销售合同，2：样机，3：测试项目） ,
export function formatOrderType(type, flag) {
  if(flag != 1) {
    switch(type) {
      case 1:
       return '销售合同'
      case 2:
       return '样机'
      case 3:
       return '测试项目'
      default:
       return type
    }
  }else {
    switch(type) {
      case '销售合同':
       return 1
      case '样机':
       return 2
      case '测试项目':
       return 3
      default:
       return type
    }
  }
}


/**
 * 格式化可用功能
 * @param {string} type
 */
export function farmatValidfunc(type) {
  switch(type) {
    case config.VALIDFUNC[0]: // 网格化
      return 1
    case config.VALIDFUNC[1]: // 健康空气
      return 2
    default:
      return type
  }
}

export function farmtEquipmentStatus(type) {
  switch(type) {
    case 1:
      return '离线'
    case 2:
      return '正常'
    default:
      return type
  }
}


/**
 * 格式化业务类型
 * @param {Number or String} type
 */
export function formatBusinessType(type, flag) {
  if(flag != 1) {
    switch(Number(type)) {
      case 1:
        return '网格化'
      case 2:
        return '健康空气'
      default:
        return type
    }
  }else {
    switch(type) {
      case '网格化':
        return 1
      case '健康空气':
        return 2
      default:
        return Number(type)
    }
  }
}