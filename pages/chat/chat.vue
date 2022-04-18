<template>
	<view class="body">

		<!-- 顶部 -->
		<uni-nav-bar backgroundColor="rgba(244, 244, 244, 0.96)" leftWidth="100%" statusBar class="bar" fixed>
			<block slot="left">
				<view class="bar-left">
					<view class="back">
						<uni-icons @click="back" class="bar-back" size="60rpx" type="back" />

					</view>
					<view class="badge">
						<uni-badge class="uni-badge-left-margin" text="2" type="info" :customStyle="customStyle" />
					</view>
					<view class="name">东东</view>

				</view>
			</block>
			<block slot="right">
				<view class="bar-more">
					<uni-icons class="bar-phone" size="60rpx" type="phone"></uni-icons>
					<uni-icons class="bar-more" size="60rpx" type="list"></uni-icons>
				</view>
			</block>
		</uni-nav-bar>

		<!-- 消息列表 -->
		<view class="box">
			<scroll-view @scrolltoupper="toNextPage" :scroll-top="scrollTop" class="msg"
				:scroll-with-animation="swanimation" scroll-y="true" :scroll-into-view="scrollToView">
				<view @touchstart="msgroomclick" @touchmove="msgroomtouchmove"
					:style="'paddingBottom:'+bottomHeight+'px'" class="msg-room">
					<uni-load-more :status="loading"></uni-load-more>
					<view :key="index" v-for="(list,index) in msgList" class="msg-item" :id="'msg'+list.id">
						<view v-if="!list.hidetime" class="msg-item-time">
							{{ formatDate1(list.createdate, 'HH:mm') }}
						</view>
						<view class="msg-bottom" :class="list.userId==10000?'msg-right':'msg-left' ">
							<view class="msg-item-img">
								<image class="user_pic" :src="list.userPic"></image>
							</view>
							<view class="msg-item-msg">
								<!-- 普通文本信息 -->
								<view v-if="list.type===1" v-text="list.content" class="msg-text"></view>
								<!-- 图片信息 -->
								<view v-if="list.type===2">
									<image @click="previewImg(list.content)" class="msg-pic" :src="list.content"
										mode="widthFix" lazy-load></image>
								</view>
								<!-- 文件 -->
								<!-- 视频 -->
								<!-- 转发 -->
								<!-- 录音 -->
								<view class="voice-room" v-if="list.type===6">

									<view @click="playVoice(list.content.voice)"
										:style="{width:list.content.time*2+40+'px'}" class="msg-text msg-voice">
										<span v-show="list.userId==10000">
											{{list.content.time+"''"}}
										</span>
										<uni-icons class="sound-icon" :color="list.userId==10000?'white':'black' "
											type="sound-filled" size="36rpx"></uni-icons>
										<span v-show="list.userId!=10000">
											{{list.content.time+"''"}}
										</span>
									</view>
								</view>

								<!-- 地图 -->
								<view @click="showMap(list.content)" v-if="list.type===7" class="map-room">
									<view class="map-name">
										{{list.content.name}}
									</view>
									<view class="map-address">
										{{list.content.address}}
									</view>
									<view class="map-pic">
										<image class="appbutton app-map-pic" mode="aspectFit"
											src="/static/image/map.png"></image>
										<map class="h5button" :markers="covers(list.content)"
											:longitude="list.content.longitude" :latitude="list.content.latitude">
										</map>
									</view>
								</view>


							</view>
						</view>

					</view>

					<view class="padbt"></view>
				</view>

			</scroll-view>
		</view>

		<!-- 提交框 -->
		<submit ref="submit" @getSubmitHeight='getSubmitHeight' @sendmsg='sendmsg'></submit>
	</view>
</template>

<script>
	import global_ from '@/common/js/Global.js' //引用全局模块
	const innerAudioContext = uni.createInnerAudioContext();
	import submit from '@/components/submit/submit.vue';
	export default {
		components: {
			submit
		},
		data() {
			return {
				scrollToView: '',
				scrollTop: 0,
				pageY: '', //触摸y轴
				swanimation: true, //滑动动画
				customStyle: { //导航栏标题样式
					backgroundColor: 'rgba(244, 244, 244, 0.96)',
					color: '#272832',
					fontSize: '40rpx',
					lineHeight: '60rpx',
					width: '60rpx',
					height: '60rpx',
					border: '2rpx solid black'
				},
				imgList: [
					"http://119.91.141.30/oos/2021-12-29/5b39f130-1c5c-4d78-8644-7398ca3eac45",
					"http://119.91.141.30/oos/2021-12-19/a1fc2c6f-fe54-4ba7-87d3-1e1ab4f61164"
				],
				msgList: [],
				totalMsgList: [],
				/**
				 * 加载状态
				 * more	加载前
				 * loading	加载中
				 * no-more	没有更多数据
				 */
				loading: 'more',
				pageNum: 1, //页码
				bottomHeight: 55
			}
		},
		onLoad() {
			this.getMsgData()
		},
		methods: {
			showMap(e) { //查看地图详情
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});

			},
			covers(map) { //设置图标
				let markers = [{
					latitude: map.latitude,
					longitude: map.longitude,
					iconPath: '/static/icon/location_icon.png',
					width: 20,
					height: 20
				}]
				return (markers);
			},
			msgroomclick(e) { //设置初始触碰y轴
				this.pageY = e.changedTouches[0].pageY
				// console.log(e);
			},
			msgroomtouchmove(e) { //滑动聊天页面取消下顶框
				if (global_.isSubmit) {
					// console.log(this.pageY,e.changedTouches[0].pageY);
					if (e.changedTouches[0].pageY - this.pageY > 100 ||
						e.changedTouches[0].pageY - this.pageY < -100) {
						this.$refs.submit.returnToOriginal()
					}

				}
			},
			playVoice(url) { //播放声音
				innerAudioContext.src = url;
				innerAudioContext.play();
			},
			/**
			 * 格式日期为 yyyy-MM-dd
			 * @param {Object} date 日期
			 */
			formatDateTime(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1; //注意这个“+1”
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			toButtom() { // 到达数据底层
				if (this.msgList.length > 0) {
					this.scrollToView = ''
					setTimeout(() => {
						this.$nextTick(() => {
							this.scrollToView = "msg" + this.msgList[this.msgList.length - 1].id
							//定位到底部
							// const query = uni.createSelectorQuery().in(this);
							// query.select('.msg-room').boundingClientRect(data => {
							// 	console.log(data.height);
							// 	this.$nextTick(() => {
							// 		this.scrollTop = data.height+100
							// 	})
							// }).exec()
						})
					}, 10)
				}
			},
			/**
			 * height 高度 flag 是否置于底部
			 */
			getSubmitHeight(height, flag = true) { //获取输入框高度
				// console.log(height);
				this.bottomHeight = height
				if (flag)
					this.toButtom()
			},
			sendmsg(msg, type) { //接收到发送方法
				let data = {
					"id": this.msgList[this.msgList.length - 1].id + 1,
					"userId": 10000,
					"content": msg,
					"createdate": this.formatDateTime(new Date()),
					"ip": "未知ip",
					"type": type,
					"nickname": "micah",
					"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/45d695d1-ab4c-4bef-8a0d-e74e3f188a8b_defaultpic.png",
					"reback": 0,
					"extra": null,
					"userReceiveId": null
				}
				this.msgList.push(data)
				if (type == 2) {
					this.imgList.push(msg)
				}
				this.toButtom()
				this.calcTime()

			},
			back() { //返回
				uni.navigateBack({
					delta: 1,
					animationDuration: 200
				});
			},
			sleep(numberMillis) { //休眠
				var now = new Date();
				var exitTime = now.getTime() + numberMillis;
				while (true) {
					now = new Date();
					if (now.getTime() > exitTime)
						return true;
				}
			},
			async toNextPage() { //前往下一页
				if (this.loading != 'no-more') //判断是否还要加载动画
					this.loading = 'loading'
				//初始化分页数据
				let pageSize = 6;
				let totalCount = this.totalMsgList.length
				let totalPage = Math.ceil(totalCount / pageSize);
				let index = (this.pageNum - 1) * pageSize

				setTimeout(() => {
					if (this.pageNum <= totalPage) { //是否超过最大页码
						this.pageNum++
					} else {
						this.loading = 'no-more'
						return
					}

					var data = this.totalMsgList

					if (this.msgList.length > 0) { //原地定位
						this.scrollToView = ''
						var id = "msg" + this.msgList[0].id
						this.swanimation = false
						setTimeout(() => {
							this.scrollToView = id
							setTimeout(() => {
								this.swanimation = true
							}, 10)
						}, 10)
					} else {//初次加载则置底
						var flag=true
					}

					data.slice(index, index + pageSize).forEach(e => { //翻页添加数据
						this.msgList.push(e)
					})
					if (flag) {//置底
						this.toButtom()
					}
					this.calcTime()

					this.loading = 'more'
				}, 1000)

			},
			async getMsgData() { //获得消息数据

				this.totalMsgList = [{
						"id": 597,
						"userId": 10001,
						"content": "asdasdawdsadawdsadaw",
						"createdate": "2022-02-21 18:18:47",
						"ip": "未知ip",
						"type": 1,
						"nickname": "管理员sama",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/139acf27-4ae4-4aff-885d-a7def5b2babe_preview1.gif",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 598,
						"userId": 10000,
						"content": "http://119.91.141.30/oos/2021-12-29/5b39f130-1c5c-4d78-8644-7398ca3eac45",
						"createdate": "2022-02-21 18:57:10",
						"ip": "未知ip",
						"type": 2,
						"nickname": "micah",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/45d695d1-ab4c-4bef-8a0d-e74e3f188a8b_defaultpic.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 599,
						"userId": 10000,
						"content": "asdasdawdsadawdsadawasdasdawdsadawdsadawasdasdawdsadawdsadawasdasdawdsadawdsadaw",
						"createdate": "2022-02-23 20:02:13",
						"ip": "未知ip",
						"type": 1,
						"nickname": "micah",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/45d695d1-ab4c-4bef-8a0d-e74e3f188a8b_defaultpic.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 608,
						"userId": 10002,
						"content": "http://119.91.141.30/oos/2021-12-19/a1fc2c6f-fe54-4ba7-87d3-1e1ab4f61164",
						"createdate": "2022-03-14 11:18:48",
						"ip": "未知ip",
						"type": 2,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 609,
						"userId": 10002,
						"content": "asdasdawdsadawdsadaw",
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 1,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 610,
						"userId": 10000,
						"content": "asdasdasdasd",
						"createdate": "2022-04-9 11:42:32",
						"ip": "未知ip",
						"type": 1,
						"nickname": "micah",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/45d695d1-ab4c-4bef-8a0d-e74e3f188a8b_defaultpic.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 611,
						"userId": 10002,
						"content": "asdasdawdsadawdsadaasdasdawdsadawdsadawasdasdawdsadawdsadawasdasdawdsadawdsadaww",
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 1,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 612,
						"userId": 10000,
						"content": {
							time: 20,
							voice: ''
						},
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 6,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 613,
						"userId": 10002,
						"content": {
							time: 6,
							voice: ''
						},
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 6,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 614,
						"userId": 10002,
						"content": {
							"name": "东华门街道锡拉胡同北京利生体育商厦",
							"latitude": 39.916404,
							"longitude": 116.410244,
							"address": "北京市东城区东华门街道锡拉胡同北京利生体育商厦"
						},
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 7,
						"nickname": "张三",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					},
					{
						"id": 615,
						"userId": 10000,
						"content": {
							"name": "东华门街道锡拉胡同北京利生体育商厦",
							"latitude": 39.916404,
							"longitude": 116.410244,
							"address": "北京市东城区东华门街道锡拉胡同北京利生体育商厦"
						},
						"createdate": "2022-04-9 11:41:53",
						"ip": "未知ip",
						"type": 7,
						"nickname": "micah",
						"userPic": "https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/oos/2022-02-14/59782027-0abd-4fee-887b-89d8628fb462_littledog.png",
						"reback": 0,
						"extra": null,
						"userReceiveId": null
					}
				];
				this.totalMsgList = this.totalMsgList.reverse()
				await this.toNextPage()

			},
			/**
			 * 格式化处理日期信息
			 * @param date 传入时间
			 * @param fmt 指定格式
			 * @returns {string} 处理好的时间
			 */
			formatDate1(date, fmt) {
				let timeChar = ""
				if (this.compareDate(date)) {
					timeChar = "今天"
				} else if (this.compareDate(date, 1)) {
					timeChar = "昨天"
				} else if (this.compareDate(date, 2)) {
					timeChar = "前天"
				} else {
					timeChar = ""
					fmt = "yyyy-MM-dd HH:mm:ss";
				}
				date = new Date(date);

				if (typeof(fmt) === "undefined") {
					fmt = "yyyy-MM-dd HH:mm:ss";
				}
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
				}
				let o = {
					'Y': date.getFullYear(),
					'M+': date.getMonth() + 1,
					'd+': date.getDate(),
					'H+': date.getHours(),
					'm+': date.getMinutes(),
					's+': date.getSeconds()
				}
				for (let k in o) {
					if (new RegExp(`(${k})`).test(fmt)) {
						let str = o[k] + ''
						fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
					}
				}
				return timeChar + fmt
			},
			/**
			 * @author   :micah
			 * @param     :timestamp 待处理时间 day 如果不传默认为0 传了则判断是否为该天数时间内
			 * @return    :是或否
			 * @Description: 判断时间是否在指定范围的方法
			 * @Date       :2021/8/28
			 */
			compareDate(timestamp, day = 0) {
				// timestamp 为要传入的时间戳
				// day 为要减去的日子 因为比较*当天*的话，是不需要减的，所以默认定义成0,

				// 根据上面分析，有些需要参数`time`，有些不需要，所以使用一个函数来区分一下
				let newDate = (time = null) => {
					return time === null ? new Date() : new Date(time)
				}
				// 这里返回 比较后的值，比较成功，则返回`true`，失败则返回`false`
				return (newDate(timestamp).getDate() == newDate().getDate() - day) && (newDate(timestamp).getMonth() ==
					newDate().getMonth()) && (newDate(timestamp).getYear() == newDate().getYear())
			},
			/**
			 * 处理时间显示
			 */
			async calcTime() {
				//格式化图片列表
				if (this.msgList) {
					for (let i = 0; i < this.msgList.length; i++) {

						if (i > 1) {
							if (this.getTime(this.msgList[i - 1].createdate, this.msgList[i].createdate)) {
								//如果相差不超过五分钟则省略时间显示
								this.msgList[i].hidetime = true
							}
						}
					}
				}
				this.msgList.sort(function(a, b) {//根据id排序
					return a.id > b.id ? 1 : -1
				})
			},
			/**
			 * 判断两个时间是否相差[五(变量)]分钟
			 */
			getTime(beginTime, endTime) {
				//2021-06-30 01:25:33
				if (endTime.substring(0, endTime.indexOf(":") - 1) != beginTime.substring(0, beginTime.indexOf(":") - 1))
					return false;
				endTime = endTime.substring(endTime.indexOf(":") + 1, endTime.indexOf(":") + 3)
				beginTime = beginTime.substring(beginTime.indexOf(":") + 1, beginTime.indexOf(":") + 3)
				return 5 > (endTime - beginTime)
			},
			previewImg(msg) { //查看放大图片
				let index = 0;
				for (let i = 0; i < this.imgList.length; i++) {
					if (this.imgList[i] == msg) {
						index = i;
					}
				}
				uni.previewImage({
					current: index,
					urls: this.imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100vh;
	}

	.h5button {
		// #ifndef H5
		display: none;
		// #endif
	}

	.appbutton {
		// #ifdef H5
		display: none;
		// #endif
	}

	//底部可能预存空间
	.padbt {
		// #ifndef H5
		height: 50rpx;
		// #endif
		width: 100%;
	}

	// 列表样式
	.msg {
		//
		height: 100%;

		.msg-room {
			margin: 50rpx $uni-spacing-col-base 120rpx $uni-spacing-col-base;
			display: flex;
			flex-direction: column;
			// padding-bottom: 100rpx;


			.msg-item {

				.msg-item-time {
					//display: flex;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;

					line-height: 34rpx;
					text-align: center;
					padding: 20rpx 0;
				}

				.msg-bottom {
					// flex: auto;
					display: flex;
					padding: 20rpx 0;

					.msg-item-img {

						.user_pic {
							flex: none;
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
							border-radius: $uni-border-radius-base;
						}

					}

					.msg-item-msg {
						max-width: 480rpx;
						flex: none;



						.msg-text {
							word-wrap: break-word;
							font-size: $uni-font-size-lg;
							color: $uni-text-color;
							line-height: 54rpx;
							padding: 18rpx 24rpx;
						}

						.msg-pic {
							max-width: 400rpx;
							border-radius: $uni-border-radius-base;
						}

						.map-room {
							background-color: #fff;
							width: 464rpx;
							height: 284rpx;
							overflow: hidden;

							.map-name {
								font-size: $uni-font-size-lg;
								color: $uni-text-color;
								line-height: 54rpx;
								padding: 18rpx 24rpx 0 24rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap
							}

							.map-address {
								font-size: $uni-font-size-sm;
								color: $uni-text-color-disable;
								// line-height: 54rpx;
								padding: 0 24rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap
							}

							.map-pic {
								width: 464rpx;
								height: 180rpx;
								margin-top: 8rpx;
								overflow: hidden;

								.app-map-pic {
									width: 464rpx;
									height: 180rpx;
								}
							}
						}
					}
				}

			}

			.msg-left {
				flex-direction: row;

				.map-room {
					margin-left: 16rpx;
					border-radius: 0 20rpx 20rpx 20rpx;
				}

				.voice-room {
					.msg-voice {
						.sound-icon {
							// float: left;
						}

						span {
							float: right;
						}
					}

				}

				.msg-text {
					margin-left: 20rpx;
					background-color: #fff;
					border-radius: 0 20rpx 20rpx 20rpx;
				}

				.msg-pic {
					margin-left: 20rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.map-room {
					margin-right: 16rpx;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.sound-icon {
					float: right;
					transform: rotate(180deg);
					display: inline-block;
				}

				.msg-text {
					margin-right: 20rpx;
					background-color: $uni-color-primary;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
					color: white !important;
				}

				.msg-pic {
					margin-right: 20rpx;
				}
			}


		}
	}

	.body {
		background-color: $uni-bg-color-grey;
		width: 100%;
		height: 100%;
	}

	// 状态栏样式
	/deep/ .uni-navbar__header-btns {
		overflow: initial !important;
	}

	/deep/ .uni-navbar__header {
		background: rgba(255, 255, 255, .7);
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}

	.bar {
		.bar-phone {
			margin-right: 8px;
		}

		.bar-left {
			display: flex;

			.name {
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 60rpx;
				text-align: center;
				vertical-align: middle;
				height: 60rpx;
				justify-content: center;
				margin-left: $uni-spacing-col-lg;

			}
		}
	}
</style>
