import request from "@/utils/request"

export function getOrgans() {
  return request({
    url: '/scc/org',
    method: 'get',
  })
}
 
export function postOrgan(id, data) {
  return request({
    url: `/scc/org/${id}`,
    method: 'post',
    data
  })
}

export function postOrganFirst(data) {
  return request({
    url: `/scc/org`,
    method: 'post',
    data
  })
}

export function deleteOrgan(id) {
  return request({
    url: `/scc/org?organIds=${id}`,
    method: 'delete',
  })
}

export function putOrgan(id,data) {
  return request({
    url: `/scc/org/${id}`,
    method: 'put',
    data
  })
}