<template>
	<view>

		<!--    顶部-->
		<uni-nav-bar dark fixed color="rgba(39,40,50,1)" border backgroundColor="#ffffff" statusBar>
			<block slot="left">
				<view class="bar-left">
					<view class="head-img">
						<image @click="goHome"
							src="https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/defaultpic.png" alt=""
							class="user_pic"></image>
					</view>
					<view class="name">
						{{username}}
					</view>
				</view>
			</block>
			<block slot="right">
				<view class="bar-right">
					<uni-icons color="#dee2e6" @click="gosearch" class="bar-search" size="60rpx" type="search" />
					<uni-icons color="#dee2e6" @click="goBuildGroup" class="bar-plus" size="60rpx" type="plus" />
				</view>
			</block>
		</uni-nav-bar>

		<!--    消息列表-->
		<uni-swipe-action class="body">
			<uni-swipe-action-item @click="bindClick" :key="index" v-for="(list,index) in dataList"
				:right-options="options" @change="swipeChange($event, index)">
				<view @click="clickmsg(list,index)" class="msg-item">
					<view class="left">
						<view class="msg-item-img">
							<image :src="list.userPic" class="user_pic">
								<uni-badge :type="list.isRemind?'error':'info'" class="msg-item-img-tag" text="1" />
								<!-- <uni-tag class="msg-item-img-tag" text="1" type="error" :circle="true"></uni-tag> -->
						</view>
					</view>
					<view class="right">
						<view class="top">
							<view class="msg-item-time">{{ formatDate1(list.createdate, 'HH:mm') }}</view>
							<view class="msg-item-name">{{list.nickname}}</view>
						</view>

						<view class="msg-item-msg">{{list.content}}</view>

					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: { ...mapState(['username']) },
		data() {
			return {
				imageURL: '123',
				options: [{
					text: '取消',
					style: { backgroundColor: '#007aff' }
				}, {
					text: '确认',
					style: { backgroundColor: '#dd524d' }
				}],
				dataList: [ //type 0系统请求 1 用户消息 2群组消息
					{
						'id': 583,
						'content': '小妹添加你为好友,小妹请求添加',
						'createdate': '2022-02-21 07:32:04',
						'type': 0,
						'isRemind': true,
						'nickname': '好友申请',
						'userPic': '/static/icon/friend_add_icon.png'
					},
					{
						'id': 584,
						'userId': 48,
						'content': '你好,micah',
						'createdate': '2022-02-21 17:40:29',
						'type': 1,
						'isRemind': true,
						'nickname': '小明',
						'userPic': 'http://cdn.u2.huluxia.com/g3/M02/31/D5/wKgBOVwNc82AI515AABGI7WhK4w19.jpeg'
					},
					{
						'id': 586,
						'groupId': 1,
						'content': 'micah: 东北林业大学',
						'createdate': '2022-04-22 16:06:05',
						'type': 2,
						'isRemind': true,
						'nickname': 'xx1群',
						'userPic': 'https://ae01.alicdn.com/kf/HTB1UqNMbvWG3KVjSZFP760aiXXaz.png'
					},
					{
						'id': 586,
						'groupId': 2,
						'content': 'micah: 西安工业大学',
						'createdate': '2022-04-22 16:06:05',
						'type': 2,
						'isRemind': false,
						'nickname': 'xx2群',
						'userPic': 'https://ae01.alicdn.com/kf/HTB1UqNMbvWG3KVjSZFP760aiXXaz.png'
					}
				]
			}
		},
		methods: {
			goBuildGroup() {
				uni.navigateTo({ url: '../../buildgroup/buildgroup', })
			},
			goHome() {
				uni.navigateTo({
					url: '../../userhome/userhome',
					animationType: 'slide-in-left'
				})
			},
			gosearch() {
				uni.navigateTo({ url: '../../search/search' })
			},
			onClick(e) {
				console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
			swipeChange(e, index) {
				console.log('当前状态：' + e + '，下标：' + index)
			},
			clickmsg(e, index) {
				console.log(e, index)
				switch (e.type) {
					case 0:
						uni.navigateTo({ url: '../../friend-apply-info/friend-apply-info' })
						break
					case 1:
						uni.navigateTo({ url: '../../chat/chat?userId=' + e.userId })
						break
					case 2:
						uni.navigateTo({ url: '../../chat/chat?groupId=' + e.groupId })
						break
					default:
						break
				}
			},
			bindClick(e) {
				console.log(e)
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				})
			},
			/**
			 * 格式化处理日期信息
			 * @param date 传入时间
			 * @param fmt 指定格式
			 * @returns {string} 处理好的时间
			 */
			formatDate1(date, fmt) {


				let timeChar = ''
				if (this.compareDate(date)) {
					timeChar = '今天'
				} else
				if (this.compareDate(date, 1)) {
					timeChar = '昨天'
				} else
				if (this.compareDate(date, 2)) {
					timeChar = '前天'
				} else {
					timeChar = ''
					fmt = 'yyyy-MM-dd HH:mm:ss'
				}
				date = new Date(date)

				if (typeof(fmt) === 'undefined') {
					fmt = 'yyyy-MM-dd HH:mm:ss'
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
						fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
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
				return (newDate(timestamp).getDate() === newDate().getDate() - day) && (newDate(timestamp).getMonth() ===
					newDate().getMonth()) && (newDate(timestamp).getYear() === newDate().getYear())
			},
		}
	}
</script>

<style lang="scss">
	.bar-left {
		display: flex;
		flex-direction: row;

		.head-img {
			// padding: $uni-spacing-col-sm;

			.user_pic {
				border-radius: $uni-border-radius-sm;
				height: 72rpx;
				width: 72rpx;
			}
		}


		.name {
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 72rpx;
			height: 72rpx;
			margin-left: $uni-spacing-col-sm;
			font-weight: bold;
		}
	}


	/deep/.uni-badge.uni-badge--error.uni-badge--small {
		height: 40rpx !important;
		width: 40rpx !important;
		line-height: 40rpx;
		font-size: 30rpx !important;
	}


	/deep/.uni-navbar__header-btns {
		overflow: initial !important;
	}

	.bar-plus {
		color: $uni-text-color-grey !important;

	}

	.bar-search {
		color: $uni-text-color-grey !important;
		margin-right: $uni-spacing-col-sm;
	}






	.msg-item {
		// background-color: red;
		height: 100rpx;
		padding: $uni-spacing-row-sm $uni-spacing-col-sm;
		margin-bottom: $uni-spacing-row-sm;

		&:active {
			background-color: $uni-bg-color-grey;
		}

		.left {
			float: left;

			.user_pic {
				border-radius: $uni-border-radius-sm;
				height: 92rpx;
				width: 92rpx;
			}

			.msg-item-img-tag {
				position: relative;
				top: -74rpx;
				left: -28rpx;
				border-radius: $uni-border-radius-circle !important;
				line-height: 14rpx;
				font-size: $uni-font-size-sm;
				font-weight: 1;
				// padding: 2rpx 12rpx;
				color: #fff;
				//background-color: #8f939c;
				///* border-width: 0.5px; */
				///* border-style: solid; */
				//border-color: #8f939c;
			}
		}

		.right {
			.top {
				height: 50rpx;
			}

			padding-left: 128rpx;

			.msg-item-msg {
				//float: left;
				max-width: 176px;
				height: 20px;
				font-family: PingFangSC-Regular;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				letter-spacing: -0.48px;
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}

			.msg-item-time {
				float: right;
				//width: 21px;
				height: 17px;
				font-family: PingFangSC-Regular;
				font-size: $uni-font-size-sm;
				color: rgba(39, 40, 50, 0.40);
				letter-spacing: -0.41px;
				font-weight: 400;
			}

			.msg-item-name {
				//float: left;
				font-size: $uni-font-size-lg;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				height: 25px;
				font-family: PingFangSC-Regular;
				//font-size: 18px;
				color: $uni-text-color;
				letter-spacing: -0.62px;
				font-weight: 500;
			}
		}



	}

	/deep/.uni-navbar__content {
		border-bottom-color: #dee2e6;
	}

	.uni-navbar {
		.uni-navbar__content {
			border: 1rpx solid #dee2e6 !important;
			// border-bottom-color: #dee2e6;
		}
	}

	// 修改h5顶部
	/deep/.uni-navbar--border {
		border: 1rpx solid #dee2e6 !important;
	}

	.body {
		padding: $uni-spacing-col-sm;
	}

	// /deep/.uni-tabbar-border{
	// 	background-color: #dee2e6;
	// }
</style>
