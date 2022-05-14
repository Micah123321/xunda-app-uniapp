<template>
	<view>
		<!-- 顶部导航 -->
		<uni-nav-bar title="创建群聊" statusBar class="bar" fixed border="false">
			<block slot="left">
				<view class="bar-left">
					<view class="back">
						<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />
					</view>
				</view>
			</block>
		</uni-nav-bar>

		<view class="main">
			<view class="title">
				<view class="title-pic">
					<image @tap="upload" :src="cropFilePath" class="title-pic-img" mode="widthFix"></image>
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					<image @tap="upload" class="pan" src="../../static/icon/pan_icon.png" mode="aspectFit"></image>
				</view>
				<view class="title-name">
					<input v-model="groupname" placeholder="群名称" type="text" class="title-name-input" />
				</view>
				<view class="h2">
					用户
				</view>

			</view>

			<!-- 用户选择器 -->
			<view class="user-list">
				<user-selector @getCount="getCount" ref="userselector">

				</user-selector>
			</view>
			<!-- 底部按钮 -->
			<view class="footer">
				<view class="add">
					<button :disabled="!((count>0)&&(groupname.length>0)&&(grouppic.length>0))" @click="bulidGroup"
						class="btn-add" type="primary">创建
						<span v-if="count>0">
							({{count}})
						</span>
					</button>
				</view>
			</view>
			<!-- 顶出布局 -->
			<view class="footer-over"></view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from '@/components/ling-imgcropper/ling-imgcropper.vue'
	import UserSelector from '@/components/userselector/userselector.vue'
	export default {
		components: {
			ImageCropper,
			UserSelector
		},
		data() {
			return {
				tempFilePath: '/static/icon/group_icon_3.png',
				cropFilePath: '/static/icon/group_icon_3.png',
				count: 0,
				groupname: '',
				grouppic: '',
				slist:[]
			}
		},
		methods: {
			bulidGroup(){
				console.log(this.slist)
			},
			getCount(e,list) {
				this.count = e
				this.slist=list
			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						this.tempFilePath = res.tempFilePaths.shift()
						this.grouppic = res.tempFilePaths.shift()
					},
				})
			},
			back() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			confirm(e) {
				this.tempFilePath = ''
				this.cropFilePath = e.detail.tempFilePath
				// #ifdef APP-PLUS||MP
				uni.uploadFile({
					url: '后端地址上传图片接口地址',
					filePath: this.cropFilePath,
					name: 'file',
					fileType: 'image',
					//formData:{},传递参数
					success: uploadFileRes => {
						var backstr = uploadFileRes.data
						//自定义操作
					},

					fail(e) {
						console.log('this is errormes ' + e.message)
					},
				})

				// #endif
			},
			cancel() {
				console.log('canceled')
				this.tempFilePath = ''
			},
		}
	}
</script>

<style lang="scss">
	.footer-over {
		width: 100%;
		height: 100rpx;
	}

	.footer {
		// margin-top: 400rpx;

		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding-top: 20rpx;
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #fff;
		border: 0;

		.add {
			.btn-add {
				font-size: $uni-font-size-base;
				line-height: 5vh;
				height: 5vh;
				width: 90vw;
				border-radius: $uni-border-radius-sm;
				background: $uni-color-primary;
			}

			.btn-add[disabled] {
				background: #9db5d4 !important;

			}
		}
	}

	.user-list {
		margin-top: 500rpx;

		padding: 0rpx $uni-spacing-col-base 20rpx $uni-spacing-col-base;
	}

	.title {
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		background-color: #fff;

		.h2 {
			padding: 0rpx $uni-spacing-col-base 20rpx $uni-spacing-col-base;
			// padding: 62rpx $uni-spacing-col-base;
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}

	}

	.title-name {
		padding: 62rpx $uni-spacing-col-base;

		.title-name-input {
			text-align: center;
			height: 92rpx;
			background-color: $uni-bg-color-grey;
			border-radius: $uni-border-radius-lg;
			font-size: 32rpx;
			color: $uni-text-color;
		}
	}


	.title-pic {
		margin: 0 auto;
		width: 196rpx;
		height: 196rpx;
		background-color: #0078d4;
		box-shadow: 0 36rpx $uni-border-radius-lg 0 rgba(39, 40, 50, 0.1);
		border-radius: $uni-border-radius-lg;
		margin-top: 50rpx;

		.pan {
			height: 50rpx;
			position: relative;
			top: -120rpx;
			left: -140rpx;
		}

		.title-pic-img {
			border-radius: $uni-border-radius-lg;
			width: 200rpx;
			left: -2rpx;
			height: 200rpx;
			filter: sepia(50%);
			// text-align: center;
			// vertical-align: middle;
		}
	}
</style>
