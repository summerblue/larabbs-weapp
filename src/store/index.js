import Vuex from '@wepy/x';
import users from './modules/user'
import notification from './modules/notification'

export default new Vuex.Store({
  modules: {
    users,
    notification
  }
})
