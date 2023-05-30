"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: [],
      title: "nav-button",
      keyword: "",
      pic: "",
      compounds: []
    };
  },
  methods: {
    // 长按删除
    onLongPress(index) {
      let token = common_vendor.index.getStorageSync("token");
      let da = this.data[index];
      let that = this;
      common_vendor.index.showModal({
        // 弹框询问是否进行下一步事件
        title: "提示",
        content: "是否删除该收藏",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            common_vendor.index.request({
              url: "http://shenmegui1987.xyz:1987/user/deleteCollection",
              method: "POST",
              header: {
                "Content-Type": "application/json",
                "token": token
              },
              data: JSON.stringify(da),
              success: (res2) => {
                that.data.splice(index, 1);
                that.compounds.splice(index, 1);
                common_vendor.index.showToast({
                  title: "删除成功"
                });
              }
            });
          } else if (res.cancel) {
            common_vendor.index.showToast({
              title: "已取消"
            });
          }
        }
      });
    },
    tab(index) {
      common_vendor.index.navigateTo({
        url: "/pages/user-info/record/detail/detail?data=" + encodeURIComponent(JSON.stringify(this.data[index]))
      });
    }
  },
  onNavigationBarButtonTap(e) {
    e.index === 0 ? this.$refs.share.open() : this.$refs.inputDialog.open();
  },
  onShow(option) {
    let token = common_vendor.index.getStorageSync("token");
    common_vendor.index.request({
      url: "http://shenmegui1987.xyz:1987/user/getCollections",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": token
      },
      success: (res) => {
        this.data = res.data.data;
        for (let i = 0; i < this.data.length; i++) {
          let str = "";
          for (let j = 0; j < this.data[i].compounds.length; j++) {
            str += this.data[i].compounds[j].name;
            str += "，";
          }
          str = str.slice(0, -1);
          this.compounds.push(str);
        }
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_title2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_title = () => "../../../uni_modules/uni-title/components/uni-title/uni-title.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_title)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.data.length != 0
  }, $data.data.length != 0 ? {
    b: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onLongPress(index), index),
        b: common_vendor.o(($event) => $options.tab(index), index),
        c: "0820795d-2-" + i0 + "," + ("0820795d-1-" + i0),
        d: common_vendor.p({
          title: $data.compounds[index]
        }),
        e: "0820795d-1-" + i0 + "," + ("0820795d-0-" + i0),
        f: index,
        g: "0820795d-0-" + i0,
        h: common_vendor.p({
          title: item.name,
          type: "line"
        })
      };
    })
  } : {
    c: common_vendor.p({
      type: "h1",
      align: "center",
      title: "暂时没有记录"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/user-info/collection/collection.nvue"]]);
wx.createPage(MiniProgramPage);
