<template>
	<view>

		<uni-nav-bar backgroundColor="transparent" statusBar class="bar" fixed border="false">
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
	</view>
</template>

<script>
	export default {
		name: 'groupHome',
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss">
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
