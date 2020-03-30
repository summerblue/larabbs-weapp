import { request } from '@/utils/request'

export function login(data) {
  return request('weapp/authorizations', {
    method: 'post',
    data: data
  })
}

