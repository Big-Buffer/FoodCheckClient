"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: ""
    };
  },
  methods: {
    getTop10() {
    },
    goDetailPage(detail) {
      const url = "/pages/ranking-list/detail/detail?value=" + encodeURIComponent(JSON.stringify(detail));
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url
        });
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
    }
  },
  onShow() {
    common_vendor.index.request({
      url: "http://shenmegui1987.xyz:1987/rank/top10",
      method: "GET",
      success: (res) => {
        this.data = res.data.top10;
        console.log(JSON.stringify(res.data.top10));
      }
    });
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
  return {
    a: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.goDetailPage(item), index),
        d: "687b5a32-1-" + i0 + "," + ("687b5a32-0-" + i0),
        e: index,
        f: "687b5a32-0-" + i0
      };
    }),
    b: common_vendor.p({
      clickable: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/tabBar/ranking-list.nvue"]]);
wx.createPage(MiniProgramPage);
