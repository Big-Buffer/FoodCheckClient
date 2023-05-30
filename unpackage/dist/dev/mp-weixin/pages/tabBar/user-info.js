"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      time: new Date().getTime(),
      userInfo: "",
      hasLogin: false,
      lists: [
        {
          name: "搜索记录",
          url: "record"
        },
        {
          name: "收藏",
          url: "collection"
        },
        {
          name: "关于",
          url: "about"
        }
      ]
    };
  },
  onLoad() {
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  onShow() {
    this.time = new Date().getTime();
    if (common_vendor.index.getStorageSync("userInfo") !== "") {
      this.hasLogin = true;
      this.userInfo = common_vendor.index.getStorageSync("userInfo");
    } else if (common_vendor.index.getStorageSync("hasLogin") && common_vendor.index.getStorageSync("token") !== "") {
      this.getUserInfo();
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
  },
  onShareAppMessage(res) {
    let imgURL = "http://pic.linfeng.tech/logo.png";
    return {
      title: this.$c.miniappName,
      path: "/pages/index/index",
      imageUrl: imgURL
    };
  },
  methods: {
    phoneLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    wxLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/weixin"
      });
    },
    getUserInfo() {
      common_vendor.index.request({
        url: "http://shenmegui1987.xyz:1987/user/userInfo",
        method: "GET",
        header: {
          "token": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          this.userInfo = res.data.userinfo;
        }
      });
    },
    goUser() {
      common_vendor.index.navigateTo({
        url: "/pages/user-info/info-change/info-change"
      });
    },
    toNav(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    goDetailPage(path) {
      const url = "/pages/user-info/" + path + "/" + path;
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasLogin
  }, $data.hasLogin ? {
    b: common_vendor.o($options.goUser),
    c: common_vendor.p({
      showArrow: true,
      title: $data.userInfo.username,
      thumb: $data.userInfo.avatar + "?key=" + $data.time,
      ["thumb-size"]: "lg",
      clickable: true
    }),
    d: common_vendor.f($data.lists, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.goDetailPage(item.url), item.url),
        b: "f24973ab-3-" + i0 + "," + ("f24973ab-2-" + i0),
        c: common_vendor.p({
          showArrow: true,
          title: item.name,
          clickable: true
        }),
        d: item.url,
        e: "f24973ab-2-" + i0
      };
    })
  } : {
    e: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f24973ab"], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/tabBar/user-info.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
