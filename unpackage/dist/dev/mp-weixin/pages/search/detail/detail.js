"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: []
    };
  },
  onNavigationBarButtonTap(e) {
    e.index === 0 ? this.$refs.share.open() : this.$refs.inputDialog.open();
  },
  onLoad(option) {
    console.log("上一个页面传递过来的参数", option);
    console.log(decodeURIComponent(option.data));
    option = JSON.parse(decodeURIComponent(option.data));
    this.data = option;
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_title2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_title = () => "../../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.data.length == 0
  }, $data.data.length == 0 ? {
    b: common_vendor.p({
      type: "h3",
      align: "center",
      title: "未找到相关信息"
    })
  } : {
    c: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: "525d3017-3-" + i0 + "," + ("525d3017-2-" + i0),
        b: common_vendor.p({
          title: "英文名：" + (item.enName == null ? "无" : item.enName)
        }),
        c: "525d3017-4-" + i0 + "," + ("525d3017-2-" + i0),
        d: common_vendor.p({
          title: "作用：" + (item.func == null ? "无" : item.func)
        }),
        e: "525d3017-5-" + i0 + "," + ("525d3017-2-" + i0),
        f: common_vendor.p({
          title: "简介：" + (item.introduction == null ? "无" : item.introduction)
        }),
        g: "525d3017-2-" + i0 + "," + ("525d3017-1-" + i0),
        h: item.id,
        i: "525d3017-1-" + i0,
        j: common_vendor.p({
          title: item.name,
          type: "line"
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/search/detail/detail.nvue"]]);
wx.createPage(MiniProgramPage);
