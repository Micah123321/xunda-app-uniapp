<template>
	<view class="submit">
		<view class="submit-room">
			<uni-icons @click="showRecord" color="rgba(39,40,50,1)" class="btn submit-record" size="60rpx"
				:type="isrecord?'chat':'mic'" />
			<!-- app录音 -->
			<view @touchend="touchend" @touchstart="touchstart" v-show="isrecord" class="apprecord">
				按住说话
			</view>
			<!-- h5录音 -->
			<zzlb-recorder class="h5record" v-show="isrecord" ref="rec" :minms="-1" :maxms="-1" @end="onrecend">
				<template #default="{isrecing}">
					<view class="text-df  text-xxl  radius padding text-center" @click="togglerec"
						:class="{ 'bg-green': !isrecording, 'bg-red': isrecording }">
						<view :class="{ '': !isrecording, 'animation-fade animation-infinite': isrecording }">
							<text
								:class="{ 'cuIcon-voicefill': !isrecording, 'cuIcon-voice animation-fade animation-infinite': isrecording }"></text>
							<view class="text-sm">{{ isrecording ? '正在录音' : '点击录音' }}</view>
						</view>
					</view>
				</template>
			</zzlb-recorder>
			<textarea @focus="focus" v-model="msg" @input="inputs" v-show="!isrecord" auto-height="true"
				class="submit-content"></textarea>

			<uni-icons @click="showEmoji" custom-prefix="iconfont" color="rgba(39,40,50,1)" class="btn submit-bqb"
				size="60rpx" type="icon-biaoqing" />
			<uni-icons @click="showMore" color="rgba(39,40,50,1)" class="btn submit-more" size="60rpx" type="plus" />
		</view>
		<!-- 表情列表 -->
		<view v-show="isemoji">

			<emoji @on-submit="fnOnSubmit" @on-select="fnOnEmojiSelect" @on-delete="fnOnEmojiDelete"></emoji>
		</view>
		<!-- 更多 -->
		<view v-show="ismore">
			<submit-more @getPic="getPic">

			</submit-more>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	import emoji from '../emoji/emoji.vue'
	import more from '@/components/submit-more/submit-more.vue'
	export default {
		name: "submit",
		components: {
			emoji,
			more
		},
		data() {
			return {
				isrecord: false,
				isrecording: false,
				isemoji: false,
				ismore: false,
				msg: "",
				time: '',
				vtime: 0
			};
		},
		methods: {
			//h5录音
			togglerec() {
				if (this.isrecording) this.$refs.rec.endrec();
				else this.$refs.rec.startrec();
				this.isrecording = !this.isrecording

			},
			onrecend(e) {

				let data = {
					time: Math.ceil(e.time / 1000),
					voice: e.url
				}
				this.submit(data, 6, false);
			},
			//录音
			touchstart() { // 触摸开始
				console.log("开始");
				this.vtime = 0
				this.timer = setInterval(() => {
					this.vtime++
					console.log(this.vtime);
					if (this.vtime > 60) {
						clearInterval(this.timer)
					}
				}, 1000)
				recorderManager.start();
			},
			touchend() { //触摸结束
				console.log("结束");
				clearInterval(this.timer)
				recorderManager.stop();
				recorderManager.onStop((res) => {
					// console.log('recorder stop' + JSON.stringify(res));
					let data = {
						time: this.vtime,
						voice: res.tempFilePath
					}
					this.submit(data, 6, false);
				});
			},
			/**
			 * 获取more传来得图片路径 并且提交上去
			 * @param {Object} picurl 图片路径
			 */
			getPic(picurl) {
				this.submit(picurl, 2, false)
			},

			focus() { //获得焦点
				this.isemoji = false
				this.ismore = false
				this.getSubmitHeight()

			},
			fnOnEmojiSelect(e) { //选择表情按钮事件
				this.msg += e
			},
			fnOnEmojiDelete() { //删除按钮触发事件
				this.msg = this.msg.slice(0, this.msg.length - 1)
			},
			fnOnSubmit() { //点击了发送按钮
				if (this.msg.length > 1) {
					this.submit(this.msg, 1, true)
				}
			},
			/**
			 * 展示录音
			 */
			showRecord() {
				this.isrecord = !this.isrecord
				this.isemoji = false
				this.ismore = false
				this.getSubmitHeight()

			},
			showMore() {
				this.ismore = !this.ismore
				this.isemoji = false
				this.getSubmitHeight()

			},
			showEmoji() { //展示emoji组件
				this.isemoji = !this.isemoji
				this.ismore = false
				this.isrecord = false
				this.getSubmitHeight()

			},
			getSubmitHeight() { //获取emoji组件高度
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.submit').boundingClientRect(data => {
						this.$emit("getSubmitHeight", data.height)
					}).exec()
				})

			},
			inputs(e) { //监听输入框
				// console.log();
				let msg = e.detail.value
				if (msg.length > 1 && msg.indexOf('\n') != -1) {
					// console.log(msg);
					this.submit(this.msg, 1, true)
				}
			},
			/** 
			 * 提交事件
			 * @param {Object} msg 信息
			 * @param {Object} type 类型
			 * @param {Object} clearMsg 是否清空msg
			 */
			submit(msg, type, clearMsg) {
				this.$emit("sendmsg", msg, type)
				if (clearMsg) {
					setTimeout(() => {
						this.msg = ''
					}, 0)
				}
			}
		}
	}
</script>

<style lang="scss">
	.h5record {
		flex: auto;
		background-color: $uni-bg-color-grey;
		border-radius: $uni-border-radius-base;
		padding: 20rpx;
		// max-height: 160rpx;
		margin: 0 10rpx;
		width: 100%;
		line-height: 50rpx;
		text-align: center;
		vertical-align: middle;
		// #ifndef H5
		display: none;
		// #endif
	}

	.apprecord {
		// #ifdef H5
		display: none;
		// #endif
	}



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

			.apprecord {
				flex: auto;
				background-color: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				padding: 20rpx;
				// max-height: 160rpx;
				margin: 0 10rpx;
				width: 100%;
				line-height: 50rpx;
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
