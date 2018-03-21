import wepy from 'wepy'

const host = 'http://larabbs.test/api'

const request = async (options) => {
  wx.showLoading({title: '加载中'})
  if (options.withAuth === true) {
    options.header['Authorization'] = 'Bearer '+ wepy.getStorageSync('access_token')
  }

  options.url = host + '/' + options.url
  let response = await wepy.request(options)

  wx.hideLoading()

  if (response.statusCode === 500) {
    wepy.showModal({
      title: '提示',
      content: '服务器错误，请联系管理员或重试'
    })
  }
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

module.exports = {
  request,
  login
}
