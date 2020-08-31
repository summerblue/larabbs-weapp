export default {
  async onShow() {
    this.updateUnreadCount()
  },
  watch: {
    unreadCount: function() {
      this.updateUnreadCount()
    }
  },
  methods: {
    updateUnreadCount() {
      if (this.unreadCount) {
        wx.setTabBarBadge({
          index: 1,
          text: this.unreadCount.toString()
        })
      } else {
        wx.removeTabBarBadge({
          index: 1
        })
      }
    }
  }
}
