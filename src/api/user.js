import request from '@/utils/request'

// 登录接口
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

// 侧边栏列表
export const getSideBar = () => {
  return request({
    method: 'GET',
    url: 'menus'
  })
}

/**
 *获取用户列表数据
 * @returns
 */
export const getUserList = ({ pagenum, pagesize, query }) => {
  return request({
    method: 'GET',
    url: 'users',
    params: {
      pagenum,
      pagesize,
      query
    }
  })
}

// 修改用户状态 未完成
// export const userStateChange = (userinfo) => {
//   return request({
//     method: 'PUT',
//     url: `users/${userinfo.id}/state/${userinfo.mg_state}`
//   })
// }

// 根据id查询用户信息
export const getUserInfo = (id) => {
  return request({
    method: 'GET',
    url: `users/${id}`
  })
}

// 根据id删除角色
export const delUser = id => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

// 分配用户 角色  修改
export const reviseUserRole = (id, rid) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

// 添加新用户
export const getNewUser = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
