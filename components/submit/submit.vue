<template>
	<view class="submit">
		<view class="submit-room">
			<uni-icons @click="isrecord=!isrecord" color="rgba(39,40,50,1)" class="btn submit-record" size="60rpx"
				:type="isrecord?'chat':'mic'" />
			<view v-show="isrecord" class="record">
				按住说话
			</view>
			<textarea @focus="focus" v-model="msg" @input="inputs" v-show="!isrecord" auto-height="true"
				class="submit-content"></textarea>

			<uni-icons @click="showEmoji" custom-prefix="iconfont" color="rgba(39,40,50,1)" class="btn submit-bqb"
				size="60rpx" type="icon-biaoqing" />
			<uni-icons color="rgba(39,40,50,1)" class="btn submit-more" size="60rpx" type="plus" />
		</view>

		<view v-show="isemoji">
			<!-- 表情列表 -->
			<emoji @on-submit="fnOnSubmit" @on-select="fnOnEmojiSelect" @on-delete="fnOnEmojiDelete"></emoji>
		</view>
	</view>
</template>

<script>
	import emoji from '../emoji/emoji.vue'
	export default {
		name: "submit",
		components: {
			emoji
		},
		data() {
			return {
				isrecord: false,
				isemoji: false,
				msg: ""
			};
		},
		methods: {
			focus() { //获得焦点
				this.isemoji = false
				setTimeout(() => {
					this.getEmojiHeight()
				}, 10)
			},
			fnOnEmojiSelect(e) { //选择表情按钮事件
				this.msg += e
			},
			fnOnEmojiDelete() { //删除按钮触发事件
				this.msg = this.msg.slice(0, this.msg.length - 1)
			},
			fnOnSubmit() { //点击了发送按钮
				if (this.msg.length > 1) {
					this.$emit("sendmsg", this.msg)
					setTimeout(() => {
						this.msg = ''
					}, 0)
				}
			},
			showEmoji() { //展示emoji组件
				this.isemoji = !this.isemoji
				setTimeout(() => {
					this.getEmojiHeight()
				}, 10)
			},
			getEmojiHeight() { //获取emoji组件高度
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit("getEmojiHeight", data.height)
				}).exec()
			},
			inputs(e) { //监听输入框
				// console.log();
				let msg = e.detail.value
				if (msg.length > 1 && msg.indexOf('\n') != -1) {
					// console.log(msg);
					this.$emit("sendmsg", this.msg)
					setTimeout(() => {
						this.msg = ''
					}, 0)

				}
			}
		}
	}
</script>

<style lang="scss">

	.submit {
		// // #ifndef H5
		// height: var(--status-bar-height);
		// // #endif
		background: rgba(255, 255, 255, 0.96);
		border-top: 2rpx solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);

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
				line-height: 50rpx;
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
				line-height: 60rpx;
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
