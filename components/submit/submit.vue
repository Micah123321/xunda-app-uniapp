<template>
	<view class="submit">
		<view class="submit-room">
			<uni-icons @click="isrecord=!isrecord" color="rgba(39,40,50,1)" class="btn submit-record" size="60rpx" :type="isrecord?'chat':'mic'" />
			<view  v-show="isrecord" class="record">
				按住说话
			</view>
			<textarea v-show="!isrecord" auto-height="true" class="submit-content"></textarea>

			<uni-icons @click="isemoji=!isemoji" custom-prefix="iconfont" color="rgba(39,40,50,1)" class="btn submit-bqb" size="60rpx"
				type="icon-biaoqing" />
			<uni-icons color="rgba(39,40,50,1)" class="btn submit-more" size="60rpx" type="plus" />
		</view>
		
		<view v-show="isemoji" class="emoji">
			表情列表
		</view>
	</view>
</template>

<script>
	export default {
		name: "submit",
		data() {
			return {
				isrecord: false,
				isemoji:false
			};
		}
	}
</script>

<style lang="scss">
	.emoji{
		width: 100% ;
		height: 460rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, .1);
	}
	.submit {
		background: rgba(255, 255, 255, 0.96);
		border-top: 2rpx solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: var(--status-bar-height);

		.submit-room {
			// margin: $uni-spacing-col-sm $uni-spacing-col-sm;
			display: flex;
			width: 100%;
			align-items: flex-end;
			box-sizing: border-box;
			padding: 14rpx 10rpx;

			.submit-content {
				flex: auto;
				background-color: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				padding: 20rpx;
				max-height: 160rpx;
				margin: 0 10rpx;
				// width: 100%;
			}

			.record {
				flex: auto;
				background-color: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				padding: 20rpx;
				// max-height: 160rpx;
				margin: 0 10rpx;
				width: 100%;
				text-align: center;
				vertical-align: middle;

			}

			.btn {
				flex: auto;
				margin: 0rpx 10rpx 10rpx 10rpx;
			}

			.submit-bqb {
				transform: scale(0.8, 0.8);
			}

		}
	}

	/deep/.uni-textarea-wrapper {
		max-height: 160rpx;
	}
</style>
