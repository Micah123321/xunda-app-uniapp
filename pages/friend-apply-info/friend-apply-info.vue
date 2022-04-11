<template>
	<view>
		<!-- 顶部 -->
		<uni-nav-bar statusBar class="bar" fixed>
			<block slot="left">
				<view class="bar-left">
					<view class="back">
						<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />
					</view>
				</view>
			</block>
			<block slot="right">
				<view class="bar-m">
					好友请求
				</view>
			</block>
		</uni-nav-bar>

		<!-- 请求列表 -->
		<view class="info-list">

			<uni-card shadow="4px 6px 14px 7px rgba(0,0,0,0.07) ">
				<view class="info-item">
					<view class="avator">
						<image class="user_pic"
							src="http://cdn.u2.huluxia.com/g3/M01/29/B6/wKgBOVwKZHSAIMNvAAEqKUvkchA977.jpg" mode="">
						</image>
					</view>
					<view class="name">小妹a</view>
					<view class="time">2022-02-22</view>
					<view class="msg">留言:你好,想请求加为好友,谢谢你的通过</view>
				</view>
				<template v-slot:actions>
					<view class="card-actions">
						<view class="card-actions-item">
							<view class="btn-cancle">
								<button plain class="cancle" type="warn">拒绝</button>
							</view>
						</view>
						<view class="card-actions-item">
							<view class="btn-add">
								<button  class="accept" type="primary">同意</button>
							</view>
						</view>

					</view>
				</template>
			</uni-card>
			<uni-card shadow="4px 6px 14px 7px rgba(0,0,0,0.07) ">
				<view class="info-item">
					<view class="avator">
						<image class="user_pic" src="https://ae01.alicdn.com/kf/HTB1U20NbCSD3KVjSZFK76210VXab.png"
							mode="">
						</image>
					</view>
					<view class="name">小妹a</view>
					<view class="time">2022-02-22</view>
					<view class="msg">留言:你好,想请求加为好友,谢谢你的通过</view>
				</view>
				<template v-slot:actions>
					<view class="card-actions">
						<view class="card-actions-item">
							<view class="btn-cancle">
								<button plain class="cancle" type="warn">拒绝</button>
							</view>
						</view>
						<view class="card-actions-item">
							<view class="btn-add">
								<button class="accept" type="primary">同意</button>
							</view>
						</view>

					</view>
				</template>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
					animationDuration: 200
				});
			},
		}
	}
</script>

<style lang="scss">

.bar-m{
  font-size: $uni-font-size-base;
}
	//卡片列表
	.info-list {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-radius: $uni-border-radius-lg $uni-border-radius-lg 0 0;
		padding: $uni-spacing-row-base;
		z-index: 9;

		//卡片内具体安排
		.info-item {
			.avator {
				text-align: center;
				vertical-align: middle;

				.user_pic {
					box-shadow: 0px 26rpx 40rpx 0px rgba(39, 40, 50, 0.1);
					z-index: 10;
					border-radius: $uni-border-radius-circle;
					height: 120rpx;
					width: 120rpx;
					border: 6rpx solid white;
				}
			}

			.name {
				text-align: center;
				vertical-align: middle;

				font-size: $uni-font-size-lg;
				color: $uni-text-color;

			}

			.time {
				text-align: center;
				vertical-align: middle;
				// margin-top: $uni-spacing-row-base;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}

			.msg {
				text-align: center;
				vertical-align: middle;
				padding: $uni-spacing-col-sm $uni-spacing-col-base;
				width: 100%;
				// height: 10vh;
				box-sizing: border-box;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
			}

		}

		// 按钮布局
		.btn-cancle {
			padding-bottom: $uni-spacing-row-sm;

			.cancle {
				border-radius: $uni-border-radius-lg;
				// padding: 10px;
				line-height: 70rpx;
				padding: 0px 50rpx;
			}
		}

		.btn-add {
			padding-bottom: $uni-spacing-row-sm;

			.accept {
				border-radius: $uni-border-radius-lg;
				line-height: 70rpx;
				padding: 0px 50rpx;
				background-color: $uni-color-primary;
			}
		}


		.uni-card {
			border-radius: $uni-border-radius-lg;
		}

		.card-actions {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}

		.uni-card .uni-card__content {
			padding: 20rpx;
			font-size: 28rpx;
			color: #6a6a6a;
			line-height: 44rpx;
		}

		.card-actions-item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}

	// 顶部导航居中项样式
	.bar-default {
		font-size: $uni-font-size-lg;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;

		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		overflow: hidden;
	}
</style>
