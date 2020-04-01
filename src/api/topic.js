import { request } from '@/utils/request'

export function getTopics(data) {
  return request('topics', {
    data: data
  })
}

export function getCategories(data) {
  return request('categories')
}
