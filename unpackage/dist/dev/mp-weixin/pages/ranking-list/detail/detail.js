"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: {
        name: "",
        en_name: "",
        function: "",
        introduction: ""
      },
      title: "nav-button",
      keyword: "",
      pic: ""
    };
  },
  onNavigationBarButtonTap(e) {
    e.index === 0 ? this.$refs.share.open() : this.$refs.inputDialog.open();
  },
  onLoad(option) {
    console.log("上一个页面传递过来的参数", JSON.parse(decodeURIComponent(option.value)));
    option = JSON.parse(decodeURIComponent(option.value));
    this.data.name = option.name;
    this.data.en_name = option.enName;
    this.data.function = option.func;
    this.data.introduction = option.introduction;
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_title2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_title = () => "../../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "h1",
      align: "center",
      title: $data.data.name
    }),
    b: common_vendor.p({
      title: "英文名：" + ($data.data.en_name == null ? "无" : $data.data.en_name)
    }),
    c: common_vendor.p({
      title: "作用：" + ($data.data.function == null ? "无" : $data.data.function)
    }),
    d: common_vendor.p({
      title: "简介：" + ($data.data.introduction == null ? "无" : $data.data.introduction)
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/ranking-list/detail/detail.nvue"]]);
wx.createPage(MiniProgramPage);
