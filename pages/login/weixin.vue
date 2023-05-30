<template>
	<view class="login">
		<image class="logo" :src="logo"></image>
		<text class="txt1">申请获取以下权限</text>
		<text class="txt2">获取你的公开信息（昵称、头像等）</text>
		<button @click="login" :custom-style="btnStyle">授权登录</button>
		<text class="txt3" @click="goBack">暂不登录</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnStyle: {
					color: "#fff",
					backgroundColor: '#333333'
				},
				logo: "/static/logo.png",
			};
		},
		methods: {
			goBack() {
				uni.reLaunch({
					url: '/pages/tabBar/user-info'
				});
			},

			async login() {
				uni.showLoading({
					mask: true,
					title: '正在登陆'
				});
				var that = this;
				let userinfo = await this.getUserProfile();
				console.log(JSON.stringify(userinfo));
				/**
				 * userinfo
				 * {"nickName":"Cc.","gender":0,"language":"zh_CN","city":"","province":"","country":"",
				 * "avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/8OPzdpDraQMjSrv13GFFPXIWNIsKbSHFMc3uguMJkEoogJhX7r3aTkLgVkz2v4sH6IK57slsnWWcbmwQjXGnbA/132"}
				 */
				let code = await this.getLoginCode(); // 此code值配置appid和密钥用于生产用户的openid
				uni.request({
				    url: 'http://shenmegui1987.xyz:1987/user/wxLogin',
					method:'POST',
				    data: {
				        code: code,
						username: userinfo.nickName,
						avatar: userinfo.avatarUrl, 
				    },
				    success: (res) => {
						res = res.data;
				        if (res.code === 200) {
							uni.setStorageSync("hasLogin", true);
							console.log(uni.getStorageSync("hasLogin"));
							uni.setStorageSync("token", res.token);
							that.getUserInfo();
							uni.navigateBack();
						}
						uni.hideLoading();
				    }
				});
			},

			getUserInfo() {
				console.log('getinfo')
				uni.request({
				    url: 'http://shenmegui1987.xyz:1987/user/userInfo',
					method:'GET',
					header:{
						"token":uni.getStorageSync("token")
					},
				    success: (res) => {
						// console.log(res.data.userinfo)
						uni.setStorageSync("userInfo", res.data.userinfo)
						const user = uni.getStorageSync("userInfo");
						// console.log(user)
				    }
				});
			},
			getLoginCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							resolve(loginRes.code);
						}
					});
				});
			},
			getUserProfile() {
				return new Promise((resolve, reject) => {
					wx.getUserProfile({
						lang: "zh_CN",
						desc: "用于完善用户资料",
						success: res => {
							resolve(res.userInfo)
						}
					})
				})
			}


		}
	}
</script>

<style lang="scss">
	.login {
		display: flex;
		flex-direction: column;
		padding: 100rpx;
	}

	.login .logo {
		width: 230rpx;
		height: 230rpx;
		margin: 50rpx auto;
	}

	.login .txt1 {
		margin-bottom: 10rpx;
	}

	.login .txt2 {
		color: #999;
		margin-bottom: 50rpx;
	}

	.login .txt3 {
		color: #8c8c8c;
		margin-top: 30rpx;
		text-align: center;
	}
</style>