<template>
	<view class="body">
		<!-- 遮罩 -->
		<view :animation="animationData2" class="mask">
			<!-- 顶部 -->
			<uni-nav-bar backgroundColor="transparent" statusBar class="bar" fixed border="false">
				<block slot="left">
					<view class="bar-left">
						<div class="back">
							<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />
						</div>
					</view>
				</block>
				<block slot="right">
					<view class="bar-right">
						<div class="more">
							<uni-icons @click="touserinfo" class="bar-more" size="60rpx" type="more-filled" />
						</div>

					</view>
				</block>
			</uni-nav-bar>

			<div class="home">
				<div class="header">
					<view class="img">
						<view :animation="animationData3">
							<uni-tag class="sex" type="error" :circle="true" text="♀" size="default" />
						</view>

						<image :animation="animationData1" :style="isAdd?'border-radius:50%':''"
							src="http://cdn.u2.huluxia.com/g3/M03/32/D1/wKgBOVwOEcOANCOcAAHU4KyUJKw015.jpg" alt=""
							class="user-pic">
					</view>
				</div>

				<div class="section">
					<div class="nickname">xx表妹</div>
					<div class="username">uid:12306</div>
					<div class="note">喝多了，乱说的，我们只是好朋友。你干嘛，对不起。我也不知错那里。</div>
				</div>

				<div class="footer">
					<div class="add">
						<button @click="showAddArea" class="btn-add" type="primary">加为好友</button>
					</div>
				</div>

			</div>
			<view :animation="animationData" class="add-room">
				<div class="header"></div>
				<div class="section">
					<div class="name">xx表妹</div>
					<div class="area">
						<textarea class="area-form" value="micah 请求加你好友~" maxlength="120">

						</textarea>
					</div>
				</div>
				<div class="footer">
					<uni-row :gutter="30">
						<uni-col :span="6">
							<div class="cancle">
								<button class="btn-add" @click="showAddArea">取消</button>
							</div>
						</uni-col>
						<uni-col :span="18">
							<div class="submit">
								<button class="btn-add" type="primary">发送</button>
							</div>
						</uni-col>

					</uni-row>


				</div>
			</view>


		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData: {},
				animationData1: {},
				animationData2: {},
				animationData3: {},
				isAdd: false
			}
		},
		methods: {
			tologin() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			touserinfo() {
				uni.navigateTo({
					url: '../userinfo/userinfo'
				});
			},
			back() {
				uni.navigateBack({
					delta: 1,
					animationType:"slide-out-left",
					animationDuration: 200
				});
			},
			showAddArea() {
				this.isAdd = !this.isAdd
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				})
				var animation1 = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				})

				var animation3 = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease',
				})
				if (this.isAdd) {
					animation.bottom(0).step()
					animation3.right(256 + "rpx").width(200 + "rpx").height(200 + "rpx").opacity(0).step()
					animation2.backgroundColor("rgba(0, 120, 212, 0.8)").step()
					animation1.top(-256 + "rpx").width(200 + "rpx").height(200 + "rpx").step()
				} else {
					animation.bottom(-90 + "%").step()
					animation3.width(24.6).height(20.8).top(360 + "rpx").right(156 + "rpx").opacity(1).step()
					animation2.backgroundColor("rgba(255, 255, 255, .7)").step()
					animation1.top(0 + "rpx").bottom(0).width(360 + "rpx").height(360 + "rpx").step()
				}

				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()

			}
		}
	}
</script>

<style lang="scss">
	.add-room {
		position: fixed;
		bottom: -90%;
		width: 100%;
		height: 80vh;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: $uni-border-radius-lg $uni-border-radius-lg 0 0;

		padding: $uni-spacing-row-base;
		z-index: 9;

		.section {
			.name {
				// padding-top: 168rpx;
				padding-bottom: $uni-spacing-row-base;

				font-size: 52rpx;
				color: $uni-text-color;
			}

			.area-form {
				padding: $uni-spacing-col-sm $uni-spacing-col-base;
				width: 100%;
				height: 25vh;
				box-sizing: border-box;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
			}
		}

		.footer {
			position: relative;
			bottom: -10%;
			width: 100%;

			.cancle {
				button {
					line-height: 5vh;
					height: 5vh;
					font-size: $uni-font-size-base;
					background-color: $uni-bg-color-grey;
				}
			}

			.submit {
				button {
					font-size: $uni-font-size-base;
					line-height: 5vh;
					height: 5vh;
					background: $uni-color-primary;
				}
			}

			// padding: $uni-spacing-row-base;
		}
	}

	.home {

		padding: $uni-spacing-row-base;
		// height: 85vh;


		.header {


			.img {
				padding-top: $uni-spacing-row-base;

				display: flex;
				flex-direction: column;
				align-items: center;
				z-index: 10;

				.sex {
					z-index: 11;
					position: relative;
					height: 10rpx;
					right: -156rpx;
					top: 360rpx;
					transition: .25s;
					-moz-transition: .25s;
					-webkit-transition: .25s;
					-o-transition: .25s;
				}

				.user-pic {
					box-shadow: 0px 18px 20px 0px rgba(39, 40, 50, 0.1);
					z-index: 10;
					border-radius: $uni-border-radius-base;
					height: 360rpx;
					width: 360rpx;
					border: 6rpx solid white;
				}
			}
		}

		.section {
			margin-top: $uni-spacing-row-base;
			text-align: center;

			.nickname {
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
			}

			.username {
				font-size: $uni-font-size-base;
			}

			.note {
				margin-top: $uni-spacing-row-base;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}

		.footer {
			// margin-top: 400rpx;

			position: absolute;
			bottom: 150rpx;

			.add {
				.btn-add {
					font-size: $uni-font-size-base;
					line-height: 5vh;
					height: 5vh;
					width: 90vw;
					border-radius: $uni-border-radius-sm;
					background: $uni-color-primary;
				}
			}

		}
	}



	.body {
		// padding: 4.5rem;
		// margin: 0;
		height: 100vh;
		background-size: cover;
		background: url("http://cdn.u2.huluxia.com/g3/M03/32/D1/wKgBOVwOEcOANCOcAAHU4KyUJKw015.jpg") no-repeat 5px 5px;
		background-position: center;
		// font-family: 'Inter', sans-serif;
	}

	.mask {
		// width: 400px;
		// height: auto;
		overflow: hidden;
		height: 100vh;
		// padding: 2rem;
		background: rgba(255, 255, 255, .7);
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		// border-radius: 1rem;
	}




	.bar {

		//指定尺寸
		.reg {
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
		}

	}

	.uni-navbar {
		.uni-navbar__content {
			border: 0 none !important;
		}
	}

	// 去除顶部边框
	/deep/.uni-navbar--border {
		border: 0;
	}

	// 添加顶部bar按键边距
	/deep/.uni-navbar__header-btns {
		padding: 0 $uni-spacing-col-base;
	}
</style>
