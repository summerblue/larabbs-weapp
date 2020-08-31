import { request, authRequest } from '@/utils/request'

export function getTopics(data) {
  return request('topics', {
    data: data
  })
}

export function getCategories(data) {
  return request('categories')
}

export function getTopic(id, data) {
  return request('topics/' + id, {
    data: data
  })
}

export function getUserTopics(userId, data) {
  return request('users/' + userId + '/topics', {
    data: data
  })
}

export function deleteTopic(id, data) {
  return authRequest('topics/' + id, {
    method: 'DELETE',
    data: data
  })
}
