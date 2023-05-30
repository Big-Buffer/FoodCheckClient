"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      btnStyle: {
        color: "#fff",
        backgroundColor: "#333333"
      },
      logo: "/static/logo.png"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.reLaunch({
        url: "/pages/tabBar/user-info"
      });
    },
    async login() {
      common_vendor.index.showLoading({
        mask: true,
        title: "正在登陆"
      });
      var that = this;
      let userinfo = await this.getUserProfile();
      console.log(JSON.stringify(userinfo));
      let code = await this.getLoginCode();
      common_vendor.index.request({
        url: "http://shenmegui1987.xyz:1987/user/wxLogin",
        method: "POST",
        data: {
          code,
          username: userinfo.nickName,
          avatar: userinfo.avatarUrl
        },
        success: (res) => {
          res = res.data;
          if (res.code === 200) {
            common_vendor.index.setStorageSync("hasLogin", true);
            console.log(common_vendor.index.getStorageSync("hasLogin"));
            common_vendor.index.setStorageSync("token", res.token);
            that.getUserInfo();
            common_vendor.index.navigateBack();
          }
          common_vendor.index.hideLoading();
        }
      });
    },
    getUserInfo() {
      console.log("getinfo");
      common_vendor.index.request({
        url: "http://shenmegui1987.xyz:1987/user/userInfo",
        method: "GET",
        header: {
          "token": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          common_vendor.index.setStorageSync("userInfo", res.data.userinfo);
          common_vendor.index.getStorageSync("userInfo");
        }
      });
    },
    getLoginCode() {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success: function(loginRes) {
            resolve(loginRes.code);
          }
        });
      });
    },
    getUserProfile() {
      return new Promise((resolve, reject) => {
        common_vendor.wx$1.getUserProfile({
          lang: "zh_CN",
          desc: "用于完善用户资料",
          success: (res) => {
            resolve(res.userInfo);
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.logo,
    b: common_vendor.o((...args) => $options.login && $options.login(...args)),
    c: $data.btnStyle,
    d: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/login/weixin.vue"]]);
wx.createPage(MiniProgramPage);
