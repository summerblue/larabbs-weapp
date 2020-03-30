import Vuex from '@wepy/x'
import user from './modules/user'

// 导出 store 对象
export default new Vuex.Store({
  modules: {
    user
  }
})

