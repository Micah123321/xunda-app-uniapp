<template>
	<view class="more">

		<view class="more-room">
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item>
					<o-grid class="swiper" col="4" gutter square radius size="sm">
						<o-grid-item @click="submitPic('album')" text="相册" icon="image"></o-grid-item>
						<o-grid-item @click="submitPic('camera')" text="拍摄" icon="camera"></o-grid-item>
						<o-grid-item text="文件" icon="folder-add"></o-grid-item>
						<o-grid-item text="视频" icon="videocam"></o-grid-item>
						<o-grid-item text="视频通话" icon="phone"></o-grid-item>
						<o-grid-item text="语音输入" icon="mic"></o-grid-item>
						<o-grid-item @click="switchLocation" text="位置" icon="location"></o-grid-item>
						<o-grid-item text="音乐" icon="headphones"></o-grid-item>
					</o-grid>
				</swiper-item>
				<swiper-item>
					<o-grid class="swiper" col="4" gutter square radius size="sm">
						<o-grid-item text="收藏" icon="star"></o-grid-item>
					</o-grid>
				</swiper-item>
			</swiper>



		</view>
	</view>
</template>

<script>
	export default {
		name: "submit-more",
		methods: {
			switchLocation() { //选择位置
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});

			},
			submitPic(type) { //提交图片
				let count;
				if (type == 'album') {
					count = 9;
				} else {
					count = 1;
				}
				let thiz = this
				uni.chooseImage({
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [type], //从相册选择
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							thiz.$emit("getPic", res.tempFilePaths[i])
						}
					}
				});
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.more {
		width: 100%;
		height: 400rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, .1);
	}

	.more-room {
		height: 400rpx;
		width: 100%;
	}

	// /deep/.uni-grid-item {
	// 	height: 100rpx !important;
	// 	width: 100rpx !important;
	// }

	/deep/.grid-item .sub {
		// background-color: red;
		height: 140rpx;
		width: 140rpx;
		border-radius: $uni-border-radius-base !important;
		background-color: rgba(255, 255, 255, 0.96) !important;
	}

	.swiper {
		height: 400rpx;
	}
</style>
