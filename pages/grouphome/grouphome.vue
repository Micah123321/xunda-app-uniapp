<template>
	<view class="body">
		<!-- 底部导航 -->
		<uni-nav-bar backgroundColor="transparent" statusBar class="bar" title="群聊设置" fixed border="false">
			<block slot="left">
				<view class="bar-left">
					<view class="back">
						<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />
					</view>
				</view>
			</block>

			<block slot="right">
				<view class="bar-right">
					<view class="more">
						<uni-icons @click="touserinfo" class="bar-more" size="60rpx" type="more-filled" />
					</view>
				</view>
			</block>
		</uni-nav-bar>


		<!-- 群聊头像名称简介 -->
		<uni-list class="group-name-pic" :border="false">
			<uni-list-chat :avatar-circle="true" title="uni-app"
				avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				note="您收到一条新的消息">
				
				<view class="chat-custom-right">

					<uni-icons type="right" color="#999" size="18"></uni-icons>
				</view>
			</uni-list-chat>

		</uni-list>

		<!-- 群聊成员 -->

		<!-- 管理,群文件,相册 -->

		<!-- 群聊信息(名称,群号,公告,名称,备注,免打扰) -->

		<!-- 退出,举报 -->

	</view>
</template>

<script>
	export default {
		// 123
		name: 'groupHome',
		data() {
			return {}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
					animationDuration: 200
				})
			},
		}
	}
</script>

<style lang="scss">
	.group-name-pic{
		margin-bottom:$uni-spacing-col-base ;
		//群聊头像简介右角标
		.chat-custom-right{
			line-height: 67rpx;
		}
	}

	
	.body{
		background-color: rgb(248, 248, 248);
		height: 100vh;
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
