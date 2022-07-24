// 权限区域
import request from '@/utils/request'

/**
 *获取角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}

/**
 *获取权限列表
 * @returns
 */
export const getRightsList = (list) => {
  return request({
    method: 'GET',
    url: `rights/${list}`
  })
}

//  删除角色指定权限
export const delRoleRights = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/**
 *获取权限列表
 * @returns
 */
export const getRightsTree = (tree) => {
  return request({
    method: 'GET',
    url: `rights/${tree}`
  })
}
