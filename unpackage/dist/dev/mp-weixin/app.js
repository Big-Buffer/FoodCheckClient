"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/tabBar/search.js";
  "./pages/tabBar/ranking-list.js";
  "./pages/tabBar/user-info.js";
  "./pages/user-info/info-change/info-change.js";
  "./pages/user-info/record/record.js";
  "./pages/user-info/collection/collection.js";
  "./pages/user-info/about/about.js";
  "./pages/search/detail/detail.js";
  "./pages/ranking-list/detail/detail.js";
  "./pages/login/login.js";
  "./pages/login/weixin.js";
  "./pages/user-info/record/detail/detail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  navTo(url, options = {}) {
    if (!url) {
      return;
    }
    if (options.login && !this.$store.getters.hasLogin) {
      url = "/pages/auth/login";
    }
    common_vendor.index.navigateTo({
      url
    });
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
