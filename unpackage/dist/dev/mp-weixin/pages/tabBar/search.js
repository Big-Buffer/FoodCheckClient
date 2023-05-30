"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      searchResult: []
    };
  },
  methods: {
    search(res) {
      let that = this;
      let keyword = res.value;
      if (keyword.replaceAll(" ", "") == "") {
        this.searchValue = "";
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
      } else {
        common_vendor.index.hideKeyboard();
        common_vendor.index.showLoading({
          title: "加载中...",
          mask: false
        });
        let token = common_vendor.index.getStorageSync("token");
        if (token !== "") {
          common_vendor.index.request({
            url: "http://shenmegui1987.xyz:1987/search/keyword",
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "token": token
            },
            data: {
              "keyword": keyword
            },
            success: (res2) => {
              common_vendor.index.hideLoading();
              that.searchResult = res2.data.data;
              const url = "/pages/search/detail/detail?data=" + encodeURIComponent(JSON.stringify(that.searchResult));
              console.log(url);
              common_vendor.index.navigateTo({
                url
              });
            }
          });
        } else {
          common_vendor.index.request({
            url: "http://shenmegui1987.xyz:1987/search/keyword",
            method: "GET",
            data: {
              "keyword": keyword
            },
            success: (res2) => {
              common_vendor.index.hideLoading();
              this.searchResult = res2.data.data;
              const url = "/pages/search/detail/detail?data=" + encodeURIComponent(JSON.stringify(this.searchResult));
              common_vendor.index.navigateTo({
                url
              });
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      }
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 3e3);
    },
    photo() {
      let that = this;
      let token = common_vendor.index.getStorageSync("token");
      common_vendor.index.chooseImage({
        count: 9,
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        success: function(res) {
          common_vendor.index.showLoading({
            mask: true,
            title: "图片上传中"
          });
          if (token !== "") {
            common_vendor.index.uploadFile({
              url: "http://shenmegui1987.xyz:1987/search/img",
              timeout: 6e4,
              filePath: res.tempFilePaths[0],
              name: "Image",
              header: { "token": token },
              success: (res2) => {
                console.log("complete:" + JSON.stringify(JSON.parse(res2.data)));
                that.searchResult = JSON.parse(res2.data);
                const url = "/pages/search/detail/detail?data=" + encodeURIComponent(JSON.stringify(that.searchResult.data));
                common_vendor.index.navigateTo({
                  url
                });
              },
              fail: (res2) => {
                console.log(res2.data);
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  icon: "error",
                  title: res2.data.msg
                });
              },
              complete: (res2) => {
                common_vendor.index.hideLoading();
                if (res2.data.status !== 200) {
                  common_vendor.index.showToast({
                    icon: "error",
                    title: res2.data.msg
                  });
                }
              }
              // complete: (res) => {
              // 	console.log("complete:" + res)
              // }
            });
          } else {
            common_vendor.index.uploadFile({
              url: "http://shenmegui1987.xyz:1987/search/img",
              timeout: 6e4,
              filePath: res.tempFilePaths[0],
              name: "Image",
              success: (res2) => {
                console.log("complete:" + JSON.stringify(JSON.parse(res2.data)));
                that.searchResult = JSON.parse(res2.data);
                const url = "/pages/search/detail/detail?data=" + encodeURIComponent(JSON.stringify(that.searchResult.data));
                common_vendor.index.navigateTo({
                  url
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
                common_vendor.index.hideLoading();
                if (res2.data.status == 500) {
                  common_vendor.index.showToast({
                    title: res2.data.msg
                  });
                }
              }
              // complete: (res) => {
              // 	console.log("complete:" + res)
              // }
            });
          }
        }
      });
    }
  },
  onBackPress() {
  },
  onShow() {
    this.searchValue = "";
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_search_bar2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o(($event) => $data.searchValue = $event),
    c: common_vendor.p({
      placeholder: "请输入配料名",
      radius: "100",
      bgColor: "#e5e5e5",
      clearButton: "auto",
      cancelButton: "none",
      maxlength: "100",
      modelValue: $data.searchValue
    }),
    d: common_vendor.p({
      span: 18
    }),
    e: common_vendor.o($options.photo),
    f: common_vendor.p({
      type: "camera",
      size: "60"
    }),
    g: common_vendor.p({
      span: 6
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/tabBar/search.nvue"]]);
wx.createPage(MiniProgramPage);
