import request from '@/utils/request'
 
export function getRoles() {
  return request({
    url: '/cms/admin/group',
    method: 'get',
  })
} 

export function getRolesAllPermission() {
  return request({
    url: '/cms/admin/permission',
    method: 'get',
  })
} 

export function getRolesPermission(id) {
  return request({
    url: `/cms/admin/group/${id}`,
    method: 'get',
  })
} 
 
export function postRole(data) {
  return request({
    url: '/cms/admin/group',
    method: 'post',
    data
  })
} 

export function deletetRole(id) {
  return request({
    url: `/cms/admin/group/${id}`,
    method: 'delete',
  })
} 

export function putRole(id,data) {
  return request({
    url: `/cms/admin/group/${id}`,
    method: 'put',
    data
  })
} 