"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        mobile: "",
        code: ""
      },
      tips: "验证码"
    };
  },
  methods: {
    phoneLogin() {
      common_vendor.index.showLoading({
        mask: true,
        title: "登录中"
      });
      this.$H.post("user/smsLogin", this.form).then((res) => {
        if (res.code == 0) {
          common_vendor.index.setStorageSync("hasLogin", true);
          common_vendor.index.setStorageSync("token", res.token);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
        common_vendor.index.hideLoading();
      });
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      let phoneCodeVerification = /^[1][3-9][0-9]{9}$/;
      if (this.form.mobile == "") {
        this.$u.toast("请输入手机号");
      } else if (!phoneCodeVerification.test(this.form.mobile)) {
        this.$u.toast("请输入规范的手机号");
      } else {
        if (this.$refs.uCode.canGetCode) {
          common_vendor.index.showLoading({
            title: "正在获取验证码"
          });
          this.$H.post("user/sendSmsCode", {
            mobile: this.form.mobile
          }).then((res) => {
            if (res.code == 0) {
              this.$refs.uCode.start();
            }
            this.$u.toast(res.msg);
            common_vendor.index.hideLoading();
          });
        } else {
          this.$u.toast("倒计时结束后再发送");
        }
      }
    },
    end() {
    },
    start() {
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.mobile,
    b: common_vendor.o(($event) => $data.form.mobile = $event.detail.value),
    c: common_vendor.sr("uForm", "e4e4508d-0"),
    d: common_vendor.p({
      model: $data.form
    }),
    e: $data.form.mobile && $data.form.code,
    f: common_vendor.o((...args) => $options.phoneLogin && $options.phoneLogin(...args)),
    g: !$data.form.mobile || !$data.form.code
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/chen2/Documents/HBuilderProjects/FoodCheck/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
