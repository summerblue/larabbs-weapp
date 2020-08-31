import { request, authRequest, uploadFile } from '@/utils/request'

export function getCurrentUser(data) {
  return authRequest('user')
}

export function updateUser(data) {
  return authRequest('user', {
    method: 'put',
    data: data
  })
}

export function updateAvatar(avatar) {
  return uploadFile('images', {
    method: 'POST',
    name: 'image',
    formData: {
      type: 'avatar'
    },
    filePath: avatar
  })
}

export function getUser(id) {
  return request('users/' + id)
}

export function getPerms() {
  return authRequest('user/permissions')
}
