<template>
	<view class="more">

		<view class="more-room">
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item>
					<o-grid class="swiper" col="4" gutter square radius size="sm">
						<o-grid-item @tap="submitPic('album')" text="相册" icon="image"></o-grid-item>
						<o-grid-item @tap="submitPic('camera')" text="拍摄" icon="camera"></o-grid-item>
						<o-grid-item @tap="uploadFile" text="文件" icon="folder-add">
						</o-grid-item>
						<o-grid-item text="视频" icon="videocam"></o-grid-item>
						<o-grid-item text="视频通话" icon="phone"></o-grid-item>
						<o-grid-item text="语音输入" icon="mic"></o-grid-item>
						<o-grid-item @tap="switchLocation" text="位置" icon="location"></o-grid-item>
						<o-grid-item text="音乐" icon="headphones"></o-grid-item>
					</o-grid>
				</swiper-item>
				<swiper-item>
					<o-grid class="swiper" col="4" gutter square radius size="sm">
						<o-grid-item text="收藏" icon="star"></o-grid-item>
					</o-grid>
				</swiper-item>

			</swiper>
			<l-file ref="lFile" @up-success="upSuccess"></l-file>


		</view>
	</view>
</template>

<script>
	// import {getUUID} from '@/common/js/Global.js'
	export default {
		name: "submit-more",
		methods: {
			getUUID() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
					return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
				})
			},
			async uploadFile() {
				var thiz = this
				let _self = this
				await uni.request({
					url: '/a/third/party/oss/sign', //仅为示例，并非真实接口地址。
					method: "GET",
					success: (res) => {
						// console.log(res.data);
						// this.text = 'request success';
						_self.dataObj.policy = res.data.data.policy
						_self.dataObj.signature = res.data.data.signature
						_self.dataObj.ossaccessKeyId = res.data.data.accessid
						_self.dataObj.key = res.data.data.dir + _self.getUUID()
						_self.dataObj.dir = res.data.data.dir
						_self.dataObj.host = res.data.data.host
						var dataObj = _self.dataObj
						this.$refs.lFile.upload({

							// #ifdef APP-PLUS
							//（app端必传）nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
							currentWebview: this.$mp.page.$getAppWebview(),
							// #endif

							//替换为你的上传接口地址
							url: 'https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/',
							// 服务端接收附件的key
							name: 'file',
							//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
							header: {
								// "Access-Control-Allow-Origin": '*',
								// "Access-Control-Expose-Headers": 'Content-Disposition'
							},
							// 限制选择附件的大小上限，默认10M
							maxSize: 20,
							"policy": dataObj.policy,
							"signature": dataObj.signature,
							"key": dataObj.key,
							"ossaccessKeyId": dataObj.ossaccessKeyId,
							"dir": dataObj.dir,
							"host": dataObj.host
						})
					}
				});

			},
			upSuccess(e) { //成功上传回调
				console.log(e);
				// console.log();
				let url = this.dataObj.host + "/" + this.dataObj.key
				e.data = url
				this.$emit("submit", e, 3, false)
				this.$refs.lFile.download({
						url
					})
					.then(path => {
						// 打开文件
						// this.$refs.lFile.open(path);
					});
			},
			switchLocation() { //选择位置
				let thiz = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						thiz.$emit("submit", res, 7, false)
						console.log(res);
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
				dataObj: {
					policy: '',
					signature: '',
					key: '',
					ossaccessKeyId: '',
					dir: '',
					host: '',
					uuid: ''
				},
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
