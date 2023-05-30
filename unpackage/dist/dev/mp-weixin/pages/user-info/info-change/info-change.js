"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      time: new Date().getTime(),
      btnStyle: {
        color: "#fff",
        backgroundColor: "#333333"
      },
      nickname: "",
      form: {},
      userInfo: {},
      showGender: false,
      gender: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        },
        {
          value: 0,
          label: "保密"
        }
      ]
    };
  },
  onShow(options) {
    if (common_vendor.index.getStorageSync("userInfo") !== "") {
      console.log("有userinfo");
      this.hasLogin = true;
      this.userInfo = common_vendor.index.getStorageSync("userInfo");
    } else if (common_vendor.index.getStorageSync("hasLogin") && common_vendor.index.getStorageSync("token") !== "") {
      console.log("没有userinfo");
      this.getUserInfo();
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
  },
  methods: {
    toChangePW() {
      common_vendor.index.navigateTo({
        url: "/pages/user-info/changePW/changePW"
      });
    },
    // 输入失去焦点自动保存
    blur(res, type) {
      if (res.replaceAll(" ", "") != "") {
        common_vendor.index.request({
          url: "http://shenmegui1987.xyz:1987/user/updateUsername",
          method: "Get",
          data: {
            "token": common_vendor.index.getStorageSync("token"),
            "username": res
          },
          success: (res2) => {
            if (res2.data.code == 200) {
              this.userInfo.username = res2.data.username;
              common_vendor.index.setStorageSync("userInfo", this.userInfo);
              this.nickname = "";
              console.log(common_vendor.index.getStorageSync("userInfo"));
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
      } else if (res.length > 15) {
        common_vendor.index.showToast({
          icon: "error",
          title: "输入内容过长"
        });
        this.nickname = "";
      } else {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入内容"
        });
        this.nickname = "";
      }
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
    // 修改性别
    saveGender(index) {
      let gender = index[0].value;
      this.$H.post("user/userInfoEdit", {
        gender
      }).then((res) => {
        if (res.code == 0) {
          this.userInfo.gender = index[0].label;
        }
      });
    },
    outlogin() {
      common_vendor.index.removeStorageSync("hasLogin");
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.reLaunch({
        url: "/pages/tabBar/search"
      });
    },
    onAvatar() {
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          common_vendor.index.showLoading({
            mask: true,
            title: "上传头像中"
          });
          common_vendor.index.uploadFile({
            url: "http://shenmegui1987.xyz:1987/file/upload",
            filePath: res.tempFilePaths[0],
            name: "Image",
            header: {
              token: common_vendor.index.getStorageSync("token")
            },
            success: (uploadFileRes) => {
              that.updateAvatar();
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "修改成功"
              });
            },
            fail: (res2) => {
              console.log(res2.data);
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: res2.data.msg
              });
            },
            complete: (res2) => {
              if (res2.data.status == 500)
                console.log("complete:" + JSON.stringify(res2.data));
            }
            // complete: (res) => {
            // 	console.log("complete:" + res)
            // }
          });
        }
      });
    },
    updateAvatar() {
      common_vendor.index.request({
        url: "http://shenmegui1987.xyz:1987/user/userInfo",
        method: "POST",
        header: {
          "token": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          if (res.data.userinfo.avatar !== "") {
            this.time = new Date().getTime();
            this.userInfo.avatar = res.data.userinfo.avatar;
            common_vendor.index.setStorageSync("userInfo", this.userInfo);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar + "?key=" + $data.time,
    b: common_vendor.o((...args) => $options.onAvatar && $options.onAvatar(...args)),
    c: $data.userInfo.username,
    d: common_vendor.o(($event) => $options.blur($data.nickname, "nickname")),
    e: $data.nickname,
    f: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    g: common_vendor.p({
      showArrow: true,
      rightText: true
    }),
    h: common_vendor.o((...args) => $options.outlogin && $options.outlogin(...args)),
    i: $data.btnStyle
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62dbc99f"], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/user-info/info-change/info-change.nvue"]]);
wx.createPage(MiniProgramPage);
