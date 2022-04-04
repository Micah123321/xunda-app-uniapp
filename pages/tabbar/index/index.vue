<template>
	<view>
		<uni-nav-bar statusBar title="xunda">

			<block slot="left">
				<view class="bar-right">
					<icon type="search"></icon>
				</view>
			</block>
			<block slot="right">
				<view class="bar-left">
					<uni-icons class="bar-search" size="25" type="search" />
					<uni-icons class="bar-plus" size="25" type="plus" />

				</view>
			</block>
		</uni-nav-bar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL: "123"
			}
		},
		methods: {

		}
	}
</script>dred

<style lang="scss">
	.bar-plus {
		color: $uni-text-color-grey !important;
		margin-left: 15rpx;
	}
	.bar-search{
				color: $uni-text-color-grey !important;
	}
</style>
