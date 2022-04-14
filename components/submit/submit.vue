<template>
	<view class="content">

		<view class="submit">

			<view class="submit-room">
				<!-- 切换语音输入 -->
				<uni-icons @click="showRecord" color="rgba(39,40,50,1)" class="btn submit-record" size="60rpx"
					:type="isrecord?'chat':'mic'" />
				<!-- app录音 -->
				<view @touchmove="touchmove" @touchend="touchend" @touchstart="touchstart" v-show="isrecord"
					class="apprecord">
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
				<!-- 输入框 -->
				<textarea ref="textarea" @blur="blur" @focus="focus" v-model="msg" @input="inputs" v-show="!isrecord" auto-height="true"
					class="submit-content"></textarea>
				<!-- emoji显示 -->
				<uni-icons @click="showEmoji" custom-prefix="iconfont" color="rgba(39,40,50,1)" class="btn submit-bqb"
					size="60rpx" type="icon-biaoqing" />
				<!-- 更多图标 -->
				<uni-icons @click="showMore" color="rgba(39,40,50,1)" class="btn submit-more" size="60rpx"
					type="plus" />
			</view>
			<!-- 表情列表 -->
			<view v-show="isemoji">

				<emoji @on-submit="fnOnSubmit" @on-select="fnOnEmojiSelect" @on-delete="fnOnEmojiDelete"></emoji>
			</view>
			<!-- 更多 -->
			<view v-show="ismore">
				<submit-more @submit="submit" @getPic="getPic"></submit-more>
			</view>


		</view>


		<!-- 录音遮罩 -->
		<view v-show="isrecording" class="app-voice-mock">
			<view class="voice-mock-len">
				<view :style="{width:vtime/0.6+'%'}" class="voice-mock-time">
					{{vtime}}''
				</view>
			</view>
			<view class="voice-mock-cancle apprecord">
				上划取消录音
			</view>
			<view @click="cancleRecord" class="voice-mock-cancle h5button">
				点我取消录音
			</view>
		</view>

	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	import emoji from '../emoji/emoji.vue'
		import global_ from '@/common/js/Global.js'//引用全局模块
	import more from '@/components/submit-more/submit-more.vue'
	export default {
		name: "submit",
		components: {
			emoji,
			more
		},
		data() {
			return {
				isrecord: false, //展示录音按钮
				isrecording: false, //是否录音状态
				isemoji: false, //是否表情包
				ismore: false, //是否更多
				iscancle: false,
				msg: "", //发送信息
				timer: '', //计时
				vtime: 0, //录音秒
				pageY: '' //触摸y轴
			};
		},
		methods: {
			startTimeLoad(type) { //开始计时
				this.vtime = 0
				this.timer = setInterval(() => {
					this.vtime++
					console.log(this.vtime);
					if (this.vtime >= 60) {
						clearInterval(this.timer)
						if (type == "h5") {
							this.togglerec()
						} else {
							this.touchend()
						}
					}
				}, 1000)
			},
			/**
			 * 结束计时
			 * false代表录音失败
			 */
			endTimeLoad() {
				clearInterval(this.timer)
				if (this.vtime < 1) {
					uni.showToast({
						title: '语音时间太短',
						duration: 500,
						icon: 'error'
					});
					return false
				}
				return true
			},
			//h5录音
			togglerec() { //开始或结束录音
				if (this.isrecording) {
					this.endTimeLoad()
					this.$refs.rec.endrec();
					this.iscancle = false
				} else {
					this.$refs.rec.startrec();
					this.startTimeLoad("h5")
				}
				this.isrecording = !this.isrecording
			},
			onrecend(e) { //结束录音回调
				if (this.iscancle == true)
					return
				if (e.time < 500 || this.vtime < 1) {
					uni.showToast({
						title: '语音时间太短',
						duration: 500,
						icon: 'error'
					});
					return
				}
				let data = {
					time: this.vtime,
					voice: e.url
				}
				this.submit(data, 6, false);
			},
			cancleRecord() { //h5取消录音
				this.isrecording = false
				clearInterval(this.timer)
				this.$refs.rec.endrec();
				this.iscancle = true
			},
			//录音
			touchmove(e) { //触摸移动
				if (this.pageY - e.changedTouches[0].pageY > 100) {
					this.isrecording = false
					clearInterval(this.timer)
					this.iscancle = true
					recorderManager.stop();
				}
			},
			touchstart(e) { // 触摸开始
				// console.log("开始");
				this.isrecording = true
				this.iscancle = false
				// console.log(e.changedTouches[0].pageY);
				this.pageY = e.changedTouches[0].pageY
				this.startTimeLoad()
				recorderManager.start();

			},
			touchend() { //触摸结束
				this.isrecording = false
				// console.log("结束");
				if (!this.endTimeLoad())
					return
				//非网页端录音提取
				recorderManager.stop();
				recorderManager.onStop((res) => {
					// console.log('recorder stop' + JSON.stringify(res));
					let data = {
						time: this.vtime,
						voice: res.tempFilePath
					}
					// console.log(this.iscancle);
					if (this.iscancle == true)
						return
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
				global_.isSubmit=true
				this.getSubmitHeight()
			},
			blur(){//失去焦点
				global_.isSubmit=false
			},
			returnToOriginal(){//回归原始样式
				global_.isSubmit=false
				this.isemoji = false
				this.ismore = false
				this.getSubmitHeight(false)
				// console.log(this.$refs.textarea);
				uni.hideKeyboard()//隐藏键盘
				// .blur()/
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
				global_.isSubmit=false
				this.getSubmitHeight()

			},
			showMore() {
				this.ismore = !this.ismore
				this.isemoji = false
				global_.isSubmit=this.isemoji||this.ismore
				this.getSubmitHeight()

			},
			showEmoji() { //展示emoji组件
				this.isemoji = !this.isemoji
				this.ismore = false
				this.isrecord = false
				global_.isSubmit=this.isemoji||this.ismore
				this.getSubmitHeight()

			},
			getSubmitHeight(flag) { //获取emoji组件高度
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.submit').boundingClientRect(data => {
						this.$emit("getSubmitHeight", data.height,flag)
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
	.app-voice-mock {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;

		.voice-mock-len {
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 42rpx;
			text-align: center;

			.voice-mock-time {
				display: inline-block;
				min-width: 120rpx;
				line-height: 84rpx;
				background-color: $uni-color-primary;
				border-radius: 42rpx;
				color: #fff;
			}
		}

		.voice-mock-cancle {
			position: absolute;
			bottom: 148rpx;
			margin-bottom: env(safe-area-inset-bottom);
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: $uni-font-size-base;
		}
	}

	.h5button {
		// #ifndef H5
		display: none;
		// #endif
	}

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
		z-index: 1002;
		padding-bottom: env(safe-area-inset-bottom);

		.submit-room {
			// z-index: 1002;
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
