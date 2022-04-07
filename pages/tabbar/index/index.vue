<template>
	<view>

		<!--    顶部-->
		<uni-nav-bar dark fixed color="rgba(39,40,50,1)" border backgroundColor="#ffffff" statusBar title="xunda">
			<block slot="left">
				<view class="bar-left">
					<div class="head-img">
						<img @click="goHome" src="https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/defaultpic.png" alt=""
							class="user_pic">
					</div>
				</view>
			</block>
			<block slot="right">
				<view class="bar-right">
					<uni-icons color="#dee2e6" @click="gosearch" class="bar-search" size="25" type="search" />
					<uni-icons color="#dee2e6" class="bar-plus" size="25" type="plus" />

				</view>
			</block>
		</uni-nav-bar>

		<!--    消息列表-->
		<uni-swipe-action class="body">
			<uni-swipe-action-item @click="bindClick" :key="index" v-for="(list,index) in dataList"
				:right-options="options" @change="swipeChange($event, index)">
				<view @click="clickmsg(list,index)" class="msg-item">
					<div class="left">
						<div class="msg-item-img">

							<img :src="list.userPic" alt="" class="user_pic">
							<uni-badge class="msg-item-img-tag" text="1" />
							<!-- <uni-tag class="msg-item-img-tag" text="1" type="error" :circle="true"></uni-tag> -->
						</div>
					</div>
					<div class="right">
						<div class="top">
							<div class="msg-item-time">{{ formatDate1(list.createdate, 'HH:mm') }}</div>
							<div class="msg-item-name">{{list.nickname}}</div>
						</div>

						<div class="msg-item-msg">{{list.content}}</div>

					</div>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL: "123",
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				dataList: [

					{
						"id": 583,
						"userId": 47,
						"content": "小妹添加你为好友,小妹请求添加",
						"createdate": "2022-02-21 07:32:04",
						"ip": "未知ip",
						"type": 1,
						"nickname": "好友申请",
						"userPic": "https://oss.xiaomao6.com/mkoss/2022/04/04/b7daf28b.png",
						"reback": 0
					},
					{
						"id": 584,
						"userId": 48,
						"content": "你好,micah",
						"createdate": "2022-02-21 17:40:29",
						"ip": "未知ip",
						"type": 2,
						"nickname": "小明",
						"userPic": "http://cdn.u2.huluxia.com/g3/M02/31/D5/wKgBOVwNc82AI515AABGI7WhK4w19.jpeg",
						"reback": 0
					},
					{
						"id": 585,
						"userId": 48,
						"content": "dddd",
						"createdate": "2022-03-01 07:52:02",
						"ip": "未知ip",
						"type": 1,
						"nickname": "小张",
						"userPic": "http://cdn.u2.huluxia.com/g3/M00/27/CD/wKgBOVwJgW-ASQo9AACvmQ_XQ_k733.jpg",
						"reback": 0
					},
					{
						"id": 586,
						"userId": 48,
						"content": "ccccccawdsadawd",
						"createdate": "2022-03-22 16:06:05",
						"ip": "未知ip",
						"type": 3,
						"nickname": "哥哥",
						"userPic": "https://ae01.alicdn.com/kf/HTB1UqNMbvWG3KVjSZFP760aiXXaz.png",
						"reback": 0
					},
					{
						"id": 587,
						"userId": 47,
						"content": "你好碰撞带涉及到受到环境",
						"createdate": "2022-04-02 18:04:17",
						"ip": "未知ip",
						"type": 1,
						"nickname": "小庄",
						"userPic": "http://cdn.u2.huluxia.com/g3/M03/2A/66/wKgBOVwKh7iAPMeaAAG0aafdrcs181.jpg",
						"reback": 0
					},
					{
						"id": 588,
						"userId": 50,
						"content": "你好碰撞带涉及到受到环境",
						"createdate": "2022-04-03 08:45:09",
						"ip": "未知ip",
						"type": 1,
						"nickname": "小强",
						"userPic": "http://cdn.u2.huluxia.com/g3/M00/26/B0/wKgBOVwJEcmAMQRdAACdQX9Ku44971.jpg",
						"reback": 0
					},
					{
						"id": 586,
						"userId": 48,
						"content": "你好碰撞带涉及到受到环境",
						"createdate": "2022-03-22 16:06:05",
						"ip": "未知ip",
						"type": 3,
						"nickname": "哥哥",
						"userPic": "https://ae01.alicdn.com/kf/HTB1UqNMbvWG3KVjSZFP760aiXXaz.png",
						"reback": 0
					}
				]
			}
		},
		methods: {
			goHome(){
				uni.navigateTo({
					url: '../../userhome/userhome',
					animationType:"slide-in-left"
				});
			},
			gosearch() {
				uni.navigateTo({
					url: '../../search/search'
				});
			},
			onClick(e) {
				console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
			swipeChange(e, index) {
				console.log('当前状态：' + e + '，下标：' + index)
			},
			clickmsg(e, index) {
				console.log(e, index)
				if(index==0){
					uni.navigateTo({
						url: '../../friend-apply-info/friend-apply-info'
					});
				}
			},
			bindClick(e) {
				console.log(e);
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
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
				} else
				if (this.compareDate(date, 1)) {
					timeChar = "昨天"
				} else
				if (this.compareDate(date, 2)) {
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
		}
	}
</script>

<style lang="scss">
	.bar-plus {
		color: $uni-text-color-grey !important;

	}

	.bar-search {
		color: $uni-text-color-grey !important;
		margin-right: $uni-spacing-col-sm;
	}

	.user_pic {
		border-radius: $uni-border-radius-sm;
		height: 72rpx;
		width: 72rpx;
	}

	.head-img {
		padding: $uni-spacing-col-sm;
	}


	.msg-item {
		// background-color: red;
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
				line-height: 14px;
				font-size: $uni-font-size-sm;
				font-weight: 1;
				padding: 2rpx 12rpx;
				color: #fff;
				//background-color: #8f939c;
				///* border-width: 0.5px; */
				///* border-style: solid; */
				//border-color: #8f939c;
			}
		}

		.right {
			.top {
				height: 50 rpx;
			}

			padding-left: 128rpx;

			.msg-item-msg {
				//float: left;
				width: 176px;
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
				font-weight: 400;
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
