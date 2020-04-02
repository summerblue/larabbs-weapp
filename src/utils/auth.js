export function getUser() {
  return wx.getStorageSync('user')
}

export function setUser(user, perms) {
  return wx.setStorageSync('user', user)
}

export function getPerms() {
  return wx.getStorageSync('perms')
}

export function setPerms(perms) {
  return wx.setStorageSync('perms', perms)
}

export function getToken() {
  return wx.getStorageSync('access_token')
}

export function getTokenExpiredAt() {
  return wx.getStorageSync('access_token_expired_at')
}

export function setToken(tokenPayload) {
  const accessToken = tokenPayload.access_token
  const accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000

  wx.setStorageSync('access_token', accessToken)
  wx.setStorageSync('access_token_expired_at', accessTokenExpiredAt)
}

export function logout() {
  return wx.clearStorage()
}
