"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: [],
      horizontal: "right",
      vertical: "bottom",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      content: [
        {
          iconPath: "/static/star.png",
          selectedIconPath: "/static/star-active.png",
          text: "收藏",
          active: false
        },
        {
          iconPath: "/static/icons/edit.png",
          selectedIconPath: "/static/icons/edit-active.png",
          text: "修改",
          active: true
        }
      ]
    };
  },
  onBackPress() {
    if (this.$refs.fab.isShow) {
      this.$refs.fab.close();
      return true;
    }
    return false;
  },
  onNavigationBarButtonTap(e) {
    e.index === 0 ? this.$refs.share.open() : this.$refs.inputDialog.open();
  },
  onLoad(option) {
    console.log("上一个页面传递过来的参数", JSON.stringify(JSON.parse(decodeURIComponent(option.data))));
    option = JSON.parse(decodeURIComponent(option.data));
    this.data = option;
    this.content[0].active = option.flag == 0 ? false : true;
  },
  methods: {
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    dialogInputConfirm(val) {
      let that = this;
      let token = common_vendor.index.getStorageSync("token");
      if (val.replaceAll(" ", "") == "") {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入内容"
        });
      } else if (val.length > 16) {
        common_vendor.index.showToast({
          icon: "error",
          title: "输入内容过长"
        });
      } else {
        this.data.name = val;
        common_vendor.index.request({
          url: "http://shenmegui1987.xyz:1987/user/updateCollection",
          method: "POST",
          header: {
            "Content-Type": "application/json",
            "token": token
          },
          data: JSON.stringify(that.data),
          success: (res) => {
            if (res.data.code == 200) {
              common_vendor.index.showToast({
                title: "修改成功"
              });
            } else {
              common_vendor.index.showToast({
                icon: "error",
                title: "修改失败"
              });
            }
          }
        });
      }
    },
    trigger(e) {
      console.log(e);
      let that = this;
      let token = common_vendor.index.getStorageSync("token");
      if (`${e.item.text}` == "修改") {
        this.inputDialogToggle();
      } else if (`${e.item.text}` == "收藏") {
        common_vendor.index.showModal({
          title: "提示",
          content: `您确定${!this.content[e.index].active ? "选择" : "取消"}${e.item.text}`,
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击确定");
              common_vendor.index.request({
                url: !that.content[e.index].active ? "http://shenmegui1987.xyz:1987/user/addCollection" : "http://shenmegui1987.xyz:1987/user/deleteCollection",
                method: "POST",
                header: {
                  "Content-Type": "application/json",
                  "token": token
                },
                data: JSON.stringify(that.data),
                success: (res2) => {
                  common_vendor.index.showToast({
                    title: !that.content[e.index].active ? "收藏成功" : "已取消收藏"
                  });
                  that.content[e.index].active = !e.item.active;
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_title2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_fab2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_title = () => "../../../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_fab = () => "../../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_fab + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "h1",
      align: "center",
      title: $data.data.name
    }),
    b: common_vendor.f($data.data.compounds, (item, index, i0) => {
      return {
        a: "36f1f94f-3-" + i0 + "," + ("36f1f94f-2-" + i0),
        b: common_vendor.p({
          title: "英文名：" + (item.enName == null ? "无" : item.enName)
        }),
        c: "36f1f94f-4-" + i0 + "," + ("36f1f94f-2-" + i0),
        d: common_vendor.p({
          title: "作用：" + (item.func == null ? "无" : item.func)
        }),
        e: "36f1f94f-5-" + i0 + "," + ("36f1f94f-2-" + i0),
        f: common_vendor.p({
          title: "简介：" + (item.introduction == null ? "无" : item.introduction)
        }),
        g: "36f1f94f-2-" + i0 + "," + ("36f1f94f-1-" + i0),
        h: item.id,
        i: "36f1f94f-1-" + i0,
        j: common_vendor.p({
          title: item.name,
          type: "line"
        })
      };
    }),
    c: common_vendor.sr("fab", "36f1f94f-6"),
    d: common_vendor.o($options.trigger),
    e: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: $data.horizontal,
      vertical: $data.vertical,
      direction: _ctx.direction
    }),
    f: common_vendor.sr("inputClose", "36f1f94f-8,36f1f94f-7"),
    g: common_vendor.o($options.dialogInputConfirm),
    h: common_vendor.p({
      mode: "input",
      title: "请输入新的记录名",
      value: "",
      placeholder: "请输入内容"
    }),
    i: common_vendor.sr("inputDialog", "36f1f94f-7"),
    j: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/user-info/record/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
