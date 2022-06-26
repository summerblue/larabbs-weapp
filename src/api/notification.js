import { authRequest } from '@/utils/request'

export function getNotificationStats(...params) {
  return authRequest('notifications/stats', ...params)
}
