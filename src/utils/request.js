import wepy from '@wepy/core'
import store from '@/store'

// 服务器接口地址
const host = 'http://larabbs.test/api/v1/'

// 普通请求
const request = async (url, options = {}, showLoading = true) => {
  // 显示加载中
  if (showLoading) {
    wx.showLoading({title: '加载中'})
  }
  // 拼接请求地址
  options.url = host + url

  const response = await wepy.wx.request(options)

  if (showLoading) {
    // 隐藏加载中
    wx.hideLoading()
  }

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  }

  if (response.statusCode === 429) {
    wx.showModal({
      title: '提示',
      content: '请求太频繁，请稍后再试'
    })
  }

  if (response.statusCode === 500) {
    wx.showModal({
      title: '提示',
      content: '服务器错误，请联系管理员或重试'
    })
  }

  const error = new Error(response.data.message)
  error.response = response
  return Promise.reject(error)
}

const checkToken = async () => {
  // 从缓存中取出 Token
  const accessToken = store.getters.accessToken
  const expiredAt = store.getters.accessTokenExpiredAt

  // 如果 token 过期了，则调用刷新方法
  if (accessToken && new Date().getTime() > expiredAt) {
    try {
      return store.dispatch('refresh')
    } catch (err) {
      return store.dispatch('login')
    }
  }
}

// 普通请求
const authRequest = async (url, options = {}, showLoading = true) => {
  await checkToken()

  options.header = {
    Authorization: 'Bearer ' + store.getters.accessToken
  }

  return await request(url, options, showLoading)
}


export {
 request,
 authRequest,
}
