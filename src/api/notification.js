import { authRequest } from '@/utils/request'

export function getNotificationStats(...params) {
  return authRequest('notifications/stats', ...params)
}

export function getNotifications() {
  return authRequest('notifications')
}

export function readNotifications() {
  return authRequest('user/read/notifications', {
    method: 'PUT'
  })
}
