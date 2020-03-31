import { request, authRequest } from '@/utils/request'

export function getCurrentUser(data) {
  return authRequest('user')
}
