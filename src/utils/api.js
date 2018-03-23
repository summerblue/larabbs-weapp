import wepy from 'wepy'

const host = 'http://larabbs.test/api'

const request = async (options) => {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }
  wepy.showLoading({title: '加载中'})

  options.url = host + '/' + options.url
  let response = await wepy.request(options)

  wepy.hideLoading()

  if (response.statusCode === 500) {
    wepy.showModal({
      title: '提示',
      content: '服务器错误，请联系管理员或重试'
    })
  }
  return response
}

const getToken = async (options) => {
  // 从缓存中取出 Token
  let accessToken = wepy.getStorageSync('access_token')
  let expiredAt = wepy.getStorageSync('access_token_expired_at')

  // 如果 token 过期了，则调用刷新方法
  if (accessToken && new Date().getTime() > expiredAt) {
    let refreshResponse = await refreshToken(accessToken)

    if (refreshResponse.statusCode === 200) {
      accessToken = refreshResponse.data.access_token
    } else {
      // 刷新失败了，重新调用登录方法，设置 Token
      let authResponse = await login()
      if (authResponse.statusCode === 201) {
        accessToken = authResponse.data.access_token
      }
    }
  }

  return accessToken
}

const authRequest = async (options) => {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  wepy.showLoading({title: '加载中'})

  let accessToken = await getToken()

  let header = options.header || {}
  header.Authorization = 'Bearer ' + accessToken
  options.header = header

  return request(options)
}

const refreshToken = async (accessToken) => {
  let refreshResponse = await wepy.request({
    url: host + '/' + 'authorizations/current',
    method: 'PUT',
    header: {
      'Authorization': 'Bearer ' + accessToken
    }
  })

  if (refreshResponse.statusCode === 200) {
    wepy.setStorageSync('access_token', refreshResponse.data.access_token)
    wepy.setStorageSync('access_token_expired_at', new Date().getTime() + refreshResponse.data.expires_in * 1000)
  }

  return refreshResponse
}

const updateFile = async (options = {}) => {
  wepy.showLoading({title: '上传中'})

  let accessToken = await getToken()

  options.url = host + '/' + options.url
  let header = options.header || {}
  header.Authorization = 'Bearer ' + accessToken
  options.header = header

  let response = await wepy.uploadFile(options)

  wepy.hideLoading()

  return response
}

const login = async (params = {}) => {
  // code 只能使用一次，所以每次单独
  let loginData = await wepy.login()

  // 参数中增加code
  params.code = loginData.code

  let authResponse = await request({
    url: 'weapp/authorizations',
    data: params,
    method: 'POST'
  })

  // 登录成功，记录token信息
  if (authResponse.statusCode === 201) {
    wepy.setStorageSync('access_token', authResponse.data.access_token)
    wepy.setStorageSync('access_token_expired_at', new Date().getTime() + authResponse.data.expires_in * 1000)
  }

  return authResponse
}

const logout = async (params = {}) => {
  let accessToken = wepy.getStorageSync('access_token')

  let logoutResponse = wepy.request({
    url: host + '/' + 'authorizations/current',
    method: 'DELETE',
    header: {
      'Authorization': 'Bearer ' + accessToken
    }
  })

  if (logoutResponse) {
    wepy.clearStorage()
  }

  return logoutResponse
}

module.exports = {
  request,
  authRequest,
  refreshToken,
  login,
  logout,
  updateFile
}
