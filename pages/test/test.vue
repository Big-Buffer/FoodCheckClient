<template>
	<view class="wrap">
		<view class="wrap-header">
			<view class="wrap-header-item">请输入验证码</view>
		</view>
		<view>
			<view class="input-wrap" style="font-size: 42rpx;">
				<!-- 页面显示  如果想要加密形式 给此input加上 password="true" 属性-->
				<input class="input1" type="number" 
				 v-for="(item, index) in input_len" 
				 @tap="onInput" 
				 :key="index" disabled 
				 :value="input_val.length >= index + 1 ? input_val[index] : ''" 
				/>
			</view>
			<!-- 实际监听 -->
			 <input class="input2" v-if="isFocus" 
			  @blur="blurInput" 
			  @input="setInput" 
			  v-model="input_val" 
			  :maxlength="input_len"
			  :focus="true" 
			/>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				input_len: 6, // 验证码长度
				input_val: '', // 验证码的值
				isFocus: false
			};
		},
		methods: {

			onInput() {
				this.isFocus = true;
			},
			setInput(e) {
				this.input_val = e.detail.value;
				if (this.input_val.length == 6) {
					uni.showToast({
						title: "登陆成功"
					})
					uni.reLaunch({
						url: "../tabBar/search"
					})
				}
			},
			blurInput() {
				this.isFocus = false;
			}
		}
	};
</script>
<style lang="scss">
	.wrap {
		padding: 0 30rpx;
	}

	.wrap-header {
		padding: 90rpx 0;

		.wrap-header-item {
			font-size: 42rpx;
			margin-bottom: 17rpx;
		}
	}

	.input-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.input1 {
			width: 80rpx;
			height: 80rpx;
			border-bottom: 1px solid #9b9ba5;
			justify-content: center;
			text-align: center;
		}
	}

	.input2 {
		height: 0;
		width: 0;
	}
</style>

