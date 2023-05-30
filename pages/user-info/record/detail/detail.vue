<template>
	<view class="container">
		<view class="uni-box-head">
			<uni-title type="h1" align="center" :title="data.name"></uni-title>
		</view>

		<uni-section :title="item.name" type="line" v-for="(item, index) in data.compounds" :key="item.id">
			<uni-list>
				<uni-list-item :title="'英文名：' + (item.enName == null ? '无' : item.enName)"></uni-list-item>
				<uni-list-item :title="'作用：' + (item.func == null ? '无' : item.func)"></uni-list-item>
				<uni-list-item :title="'简介：' + (item.introduction == null ? '无' : item.introduction)"></uni-list-item>
			</uni-list>
		</uni-section>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" />
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose"  mode="input" title="请输入新的记录名" value=""
					placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data: [],
				horizontal: 'right',
				vertical: 'bottom',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '收藏',
						active: false
					},
					{
						iconPath: '/static/icons/edit.png',
						selectedIconPath: '/static/icons/edit-active.png',
						text: '修改',
						active: true
					},
				]
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		onNavigationBarButtonTap(e) {
			e.index === 0 ? this.$refs.share.open() : this.$refs.inputDialog.open()
		},
		onLoad(option){
			console.log('上一个页面传递过来的参数', JSON.stringify(JSON.parse(decodeURIComponent(option.data))))
			option = JSON.parse(decodeURIComponent(option.data))
			this.data = option
			// console.log(JSON.stringify(this.data))
			this.content[0].active = option.flag == 0 ? false : true
		},
		methods: {
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				let that = this;
				let token = uni.getStorageSync("token");
				if (val.replaceAll(' ', '') == "") {
					uni.showToast({
						icon:'error',
						title:"请输入内容"
					})
				} else if (val.length > 16) {
					uni.showToast({
						icon:'error',
						title:"输入内容过长"
					})
				} else {
					this.data.name = val
					uni.request({
						url: 'http://shenmegui1987.xyz:1987/user/updateCollection',
						method: 'POST',
						header: {
							'Content-Type': 'application/json',
							"token": token
						},
						data: JSON.stringify(that.data),
						success: (res) => {
							if (res.data.code == 200) {
								uni.showToast({
									title:"修改成功"
								})
								// console.log("requset:" + JSON.stringify(this.data))
							} else {
								uni.showToast({
									icon:'error',
									title:"修改失败"
								})
							}
						}
					});
				}
			},
			trigger(e) {
				console.log(e)
				let that = this;
				let token = uni.getStorageSync("token");
				if (`${e.item.text}`=='修改') {
					this.inputDialogToggle()
				} else if(`${e.item.text}`=='收藏') {
					uni.showModal({
						title: '提示',
						content: `您确定${!this.content[e.index].active ? '选择' : '取消'}${e.item.text}`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								uni.request({
									url: !that.content[e.index].active ?'http://shenmegui1987.xyz:1987/user/addCollection':'http://shenmegui1987.xyz:1987/user/deleteCollection',
									method: 'POST',
									header: {
										'Content-Type': 'application/json',
										"token": token
									},
									data: JSON.stringify(that.data),
									success: (res) => {
										uni.showToast({
											title: !that.content[e.index].active ? "收藏成功" : "已取消收藏"
										})
										that.content[e.index].active = !e.item.active
										// console.log("requset:" + JSON.stringify(this.data))
									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
				
			},
		}
	}
</script>

<style>
	
</style>
