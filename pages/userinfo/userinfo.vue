<template>
	<view>
		<view class="info-room">

			<!-- 顶部导航 -->
			<uni-nav-bar title="个人信息" statusBar class="bar" fixed border="false">
				<block slot="left">
					<view class="bar-left">
						<view class="back">
							<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />
						</view>
					</view>
				</block>
			</uni-nav-bar>

			<uni-list class="info-list">
				<uni-list-item :showArrow="false">

					<template v-slot:header>
						<view class="title">头像</view>
					</template>
					<template v-slot:body>
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>

						<image @tap="upload" mode="widthFix" :src="cropFilePath" class="user-pic"></image>
						<!-- <image class="user-pic" src="/static/icon/logo.png" mode="widthFix"></image> -->
					</template>
					<template v-slot:footer>
						<view @tap="upload" class="forward">
							<uni-icons color="rgba(39,40,50,0.6)" type="forward"></uni-icons>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">签名</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							啊我打发十分发达奥委会的海湾好地方啊实打实的撒大都市
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="modify('签名','123','msg')" color="rgba(39,40,50,0.6)" type="forward">
							</uni-icons>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">注册</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							2020-01-01 23:23:23
						</view>
					</template>

				</uni-list-item>
				<uni-list-item>

					<template v-slot:header>
						<view class="title">昵称</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							micah
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="modify('昵称','123','msg')" color="rgba(39,40,50,0.6)" type="forward">
							</uni-icons>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">性别</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							<uni-data-checkbox mode="button" icon="right" v-model="sexvalue" :localdata="sexrange">
							</uni-data-checkbox>
						</view>
					</template>

				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">生日</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							<uni-datetime-picker ref="datepicker" type="date" :clearIcon="false" v-model="single"
								:border="false" />
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="showDatePicker" color="rgba(39,40,50,0.6)" type="forward"></uni-icons>
						</view>
					</template>

				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">电话</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							18812345432
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="modify('电话','123','msg')" color="rgba(39,40,50,0.6)" type="forward">
							</uni-icons>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :border="false">

					<template v-slot:header>
						<view class="title">邮箱</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							micah@qq.com
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="modify('邮箱','123','msg')" color="rgba(39,40,50,0.6)" type="forward">
							</uni-icons>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>

					<template v-slot:header>
						<view class="title">密码</view>
					</template>
					<template v-slot:body>
						<view class="msg">
							******
						</view>
					</template>
					<template v-slot:footer>
						<view class="forward">
							<uni-icons @click="modify('密码','123','pwd')" color="rgba(39,40,50,0.6)" type="forward">
							</uni-icons>
						</view>
					</template>
				</uni-list-item>

				<!-- <uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20"
					badge-positon="left" badge-text="dot"></uni-list-chat> -->


			</uni-list>

			<view class="exit">
				<button class="btn-exit" type="warn">退出登录</button>
			</view>
		</view>

		<view :animation="animationData" class="modify">
			<modify @cancle="cancle" @ok="ok" :type="modifyData.type" :title="modifyData.title"
				:value="modifyData.value">
			</modify>

		</view>

	</view>
</template>

<script>
	import Modify from "@/components/modify/modify.vue"
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		components: {
			ImageCropper,
			Modify
		},
		data() {
			return {
				isModify: false,
				modifyData: {
					value: "123",
					title: "321",
					type: "msg"
				},
				animationData: {},
				tempFilePath: "",
				cropFilePath: "",
				avatarList: [{
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				}],
				single: "2021-2-12",
				sexvalue: 0,
				sexrange: [{
					"value": 0,
					"text": "男"
				}, {
					"value": 1,
					"text": "女"
				}]
			}
		},
		methods: {
			modify(title, value, type) {
				this.isModify = !this.isModify
				this.modifyData = {
					value,
					title,
					type
				}
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				})
				if (this.isModify) {
					animation.bottom(0).step()
				} else {
					animation.bottom(-100 + "%").step()
				}
				this.animationData = animation.export()

			},
			ok(value) {
				console.log("点击成功:" + value);
				//TODO 更新数据库,刷新数据
				this.modify(null, null)
			},
			cancle() {
				console.log("取消");
				this.modify(null, null)
			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift();
					},
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.cropFilePath = e.detail.tempFilePath;

				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.cropFilePath,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
					},

					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});

				// #endif
			},
			cancel() {
				console.log("canceled");
				this.tempFilePath = "";
			},
			back() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			},
			showDatePicker() {
				// console.log();
				this.$refs.datepicker.show()
				return false;
			}
		}
	}
</script>

<style lang="scss">
	.modify {
		position: fixed;
		bottom: -100%;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		z-index: 1001;

	}

	.info-room {
		height: 100vh;
		width: 100vw;
		overflow: hidden;

		.exit {
			padding: 0 $uni-spacing-row-base;
			margin-top: $uni-spacing-row-base;
			position: fixed;
			bottom: 0;
			width:90%;
			height: 100rpx;
			padding-top: 10rpx;
			padding-bottom: env(safe-area-inset-bottom);
		}

		.info-list {
			padding-top: $uni-spacing-row-base;

			.forward {
				position: absolute;
				right: 0;
				font-size: $uni-font-size-base;
				line-height: 60rpx;
				margin-right: $uni-spacing-col-lg;
			}

			.title {
				font-size: $uni-font-size-base;
				line-height: 60rpx;
				margin-right: $uni-spacing-col-lg;
			}

			.msg {
				//float: left;
				width: 400rpx;
				// height: 20px;
				font-family: PingFangSC-Regular;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 60rpx;
				letter-spacing: -0.48px;
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}

			.user-pic {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */

				width: 70rpx;
				height: 70rpx;
			}

		}
	}

	.meslist_canvas {
		position: fixed;
		top: 0;
		width: 200px;
		height: 200px;
		visibility: hidden;
	}
</style>
