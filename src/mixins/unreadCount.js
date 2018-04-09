import wepy from 'wepy';
import api from '@/utils/api'

export default class unreadCount extends wepy.mixin {
  data = {
    interval: null,
    unreadCount: 0
  }
  onShow() {
    this.updateUnreadCount()
    this.interval = setInterval(() => {
      this.updateUnreadCount()
    }, 30000)
  }
  onHide() {
    clearInterval(this.interval)
  }
  updateUnreadCount() {
    this.unreadCount = this.$parent.globalData.unreadCount
    this.$apply()

    if (this.unreadCount) {
      wepy.setTabBarBadge({
        index: 1,
        text: this.unreadCount.toString()
      })
    } else {
      // 移除 badge
      wepy.removeTabBarBadge({
        index: 1
      })
    }
  }
}