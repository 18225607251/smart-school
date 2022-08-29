import request from '@/utils/request'

export function getUsers() {
  return request({
    url: '/v1/user?pageNo=1&pageSize=10',
    method: 'get',
  })
} 

export function postUser(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    data
  })
} 

export function putUser(id,data) {
  return request({
    url: `/v1/user/${id}`,
    method: 'put',
    data
  })
} 

export function deletetUser(id) {
  return request({
    url: `/v1/user/${id}`,
    method: 'delete',
  })
} 