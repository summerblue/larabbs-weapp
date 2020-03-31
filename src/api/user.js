import { request, authRequest } from '@/utils/request'

export function getCurrentUser(data) {
  return authRequest('user')
}

export function updateUser(data) {
  return authRequest('user', {
    method: 'put',
    data: data
  })
}
