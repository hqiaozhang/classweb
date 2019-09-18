// 列表查询
export const fetchAadminList = {
  url: '/users/page',
  config: {
    method: 'POST', 
  },
}

// 新增
export const fetchAadminAdd = {
  url: '/users/add',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

// 编辑
export const fetchAadminUpdate = {
  url: '/users/update',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

// 删除
export const fetchAadminDelete = {
  url: '/users/delete',
  config: {
    method: 'POST', 
    isMsg: true
  },
}

