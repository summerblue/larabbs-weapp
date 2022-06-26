import { request, authRequest } from '@/utils/request'

export function getReplies(topicId, data) {
  return request('topics/' + topicId + '/replies', {
    data: data
  })
}
