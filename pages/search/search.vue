<template>
	<view class="body">
		<!-- 顶部 -->
		<uni-nav-bar height="100rpx" rightWidth="80rpx" leftWidth="0" statusBar class="bar" fixed border="false">
			<uni-search-bar class="search" @confirm="search" :focus="true" v-model="searchValue" @input="input"
				cancelButton="none">
			</uni-search-bar>

			<block slot="right">
				<view class="bar-right">
					<div @click="toindex" class="cancle">
						取消
					</div>

				</view>
			</block>
		</uni-nav-bar>


		<!-- 搜索部分 -->

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
	.body{
		padding: 0 $uni-spacing-row-base;
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
</style>
