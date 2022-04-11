<template>
	<view class="body">
		<!-- 顶部 -->
		<uni-nav-bar height="100rpx" rightWidth="80rpx" leftWidth="0" statusBar class="bar" fixed border="false">
			<uni-search-bar class="search" @confirm="search" :focus="true" v-model="searchValue" @input="input"
				cancelButton="none">
			</uni-search-bar>

			<block slot="right">
				<view class="bar-right">
					<view @click="toindex" class="cancle">
						取消
					</view>

				</view>
			</block>
		</uni-nav-bar>


		<!-- 搜索部分 -->

		<!-- 联系人 -->
		<uni-group class="group-friend">
			<view>
				<view class="gorup-title">
					<view class="span">联系人</view>
					<view class="more">查看更多
						<uni-icons size="12" type="forward"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>

			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">micah1(备注)</view>
						<view class="msg">来自分组:我的好友</view>
					</view>
				</view>
				<view class="right">
					<view class="icon">
						<uni-icons color="#dee2e6" size="24" type="plus-filled"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">micah2(备注)</view>
						<view class="msg">来自分组:我的好友</view>
					</view>
				</view>
				<view class="right">
					<view class="icon">
						<uni-icons color="#dee2e6" size="24" type="plus-filled"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">micah3(小明)</view>
						<view class="msg">来自分组:家人</view>
					</view>
				</view>

				<view class="clear"></view>
			</view>


		</uni-group>
		<!-- 群聊 -->
		<uni-group class="group-group">
			<view>
				<view class="gorup-title">
					<view class="span">群聊</view>
					<view class="more">查看更多
						<uni-icons size="12" type="forward"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>

			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx1群</view>
						<view class="msg-group">(123456)</view>
					</view>
				</view>
				<view class="right">
					<view class="icon">
						<uni-icons color="#dee2e6" size="24" type="plus-filled"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx2群</view>
						<view class="msg-group">(223456)</view>
					</view>
				</view>
				<view class="right">
					<view class="icon">
						<uni-icons color="#dee2e6" size="24" type="plus-filled"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx3群</view>
						<view class="msg-group">(323456)</view>
					</view>
				</view>
				<view class="right">
					<view class="icon">
						<uni-icons color="#dee2e6" size="24" type="plus-filled"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>
		</uni-group>


		<!-- 聊天记录 -->

		<uni-group class="group-history">
			<view>
				<view class="gorup-title">
					<view class="span">聊天记录</view>
					<view class="more">查看更多
						<uni-icons size="12" type="forward"></uni-icons>
					</view>
				</view>
				<view class="clear"></view>
			</view>

			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx好友</view>
						<view class="msg">你的平a</view>
					</view>
				</view>

				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx群聊1</view>
						<view class="msg">11条与"a"相关记录</view>
					</view>
				</view>

				<view class="clear"></view>
			</view>
			<view class="search-item">
				<view class="left">
					<view class="left-img">
						<image src="http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg" alt=""
							class="user_pic"/>
					</view>
					<view class="left-group">
						<view class="name">xx群聊2</view>
						<view class="msg">11条与"a"相关记录</view>
					</view>
				</view>

				<view class="clear"></view>
			</view>
		</uni-group>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: ""

			}
		},
		methods: {
			toindex() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},

		}
	}
</script>

<style lang="scss">
	.search {
		width: 100%;
		margin-top: 10rpx;
		text-align: center;
	}

	.body {
		background-color: rgb(248, 248, 248);
	}

	.group-friend {
		margin-top: 0 !important;
	}

	.search {
		// margin: $uni-spacing-row-sm;
		// font-size: $uni-font-size-lg;
	}

	.cancle {
		font-size: $uni-font-size-lg;
		color: $uni-color-primary;
		height: 30rpx;
	}

	/deep/.uni-navbar__header-container {
		display: block;
		height: 60px;
	}

	.uni-navbar {
		.uni-navbar__content {
			border: 0 none !important;
		}

		.uni-searchbar__box {
			height: 70rpx;
		}
	}

	// 去除顶部边框
	/deep/.uni-navbar--border {
		border: 0;
	}

	/deep/.is-input-border {
		border: 0;
		border-bottom: 2rpx solid $uni-bg-color-grey;
	}

	.gorup-title {
		width: 100%;
		height: $uni-spacing-row-lg;

		.span {
			float: left;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}

		.more {
			float: right;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}

	}

	.clear {
		clear: both;
	}

	.search-item {
		margin-bottom: $uni-spacing-row-sm;

		.user_pic {
			border-radius: $uni-border-radius-sm;
			height: 72rpx;
			width: 72rpx;
		}

		.left {
			float: left;
			display: flex;

			.left-group {
				margin-left: $uni-spacing-col-base;

				.name {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
				}



				.msg {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}

			}
		}

		.right {
			float: right;

			.icon {
				margin-top: $uni-spacing-row-sm;
			}
		}


	}

	.group-group {

		.left-group {
			margin-top: $uni-spacing-row-sm;
			display: flex;

			.msg-group {
				color: $uni-text-color-grey;
				font-size: $uni-font-size-base;
			}
		}

	}
</style>
