<template>
	<view>
		<view class="list">
			<view class="item" @tap="tapItem(e)" :key="e.userId" v-for="(e,index) in list">
				<checkbox color="#0078d4" :checked="e.selected"></checkbox>
				<view class="img">
					<image class="user-pic" :src="e.imgurl" mode="widthFix"></image>

				</view>
				<view class="name">
					{{e.name}}
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "userselector",
		data() {
			return {
				count: 0,
				slist: [],
				list: [{
						"selected": false,
						"name": "白烨磊",
						"userId": 2107,
						"imgurl": "http://dummyimage.com/200x200.png/514715/226f45"
					},
					{
						"selected": false,
						"name": "余弘文",
						"userId": 11105,
						"imgurl": "http://dummyimage.com/200x200.png/407c25/6e4d0e"
					},
					{
						"selected": false,
						"name": "吴智宸",
						"userId": 80090,
						"imgurl": "http://dummyimage.com/200x200.png/20674e/616061"
					},
					{
						"selected": false,
						"name": "任鹏煊",
						"userId": 6127,
						"imgurl": "http://dummyimage.com/200x200.png/13287f/007462"
					},
					{
						"selected": false,
						"name": "范晋鹏",
						"userId": 44376,
						"imgurl": "http://dummyimage.com/200x200.png/596c10/267037"
					},
					{
						"selected": false,
						"name": "龚思聪",
						"userId": 68115,
						"imgurl": "http://dummyimage.com/200x200.png/544173/4f0608"
					},
					{
						"selected": false,
						"name": "韩建辉",
						"userId": 36704,
						"imgurl": "http://dummyimage.com/200x200.png/3d2a6d/10514d"
					},
					{
						"selected": false,
						"name": "彭昊焱",
						"userId": 78977,
						"imgurl": "http://dummyimage.com/200x200.png/062d5c/42446a"
					},
					{
						"selected": false,
						"name": "卢擎苍",
						"userId": 72662,
						"imgurl": "http://dummyimage.com/200x200.png/4d526f/4e7d7c"
					},
					{
						"selected": false,
						"name": "陶立辉",
						"userId": 18936,
						"imgurl": "http://dummyimage.com/200x200.png/713131/653d7d"
					},
					{
						"selected": false,
						"name": "孔文博",
						"userId": 76455,
						"imgurl": "http://dummyimage.com/200x200.png/087c2d/4c4e2f"
					},
					{
						"selected": false,
						"name": "熊伟宸",
						"userId": 41581,
						"imgurl": "http://dummyimage.com/200x200.png/64087c/0c1f0e"
					},
					{
						"selected": false,
						"name": "贺瑾瑜",
						"userId": 42743,
						"imgurl": "http://dummyimage.com/200x200.png/76741f/597620"
					},
					{
						"selected": false,
						"name": "胡天宇",
						"userId": 84536,
						"imgurl": "http://dummyimage.com/200x200.png/275d2c/7e200c"
					},
					{
						"selected": false,
						"name": "陈振家",
						"userId": 33886,
						"imgurl": "http://dummyimage.com/200x200.png/5c0b0b/577a25"
					},
					{
						"selected": false,
						"name": "魏鹏",
						"userId": 32517,
						"imgurl": "http://dummyimage.com/200x200.png/0c655e/005a51"
					},
					{
						"selected": false,
						"name": "郑明轩",
						"userId": 85180,
						"imgurl": "http://dummyimage.com/200x200.png/54160d/531e13"
					},
					{
						"selected": false,
						"name": "沈彬",
						"userId": 29893,
						"imgurl": "http://dummyimage.com/200x200.png/652273/0b2f37"
					},
					{
						"selected": false,
						"name": "汪博超",
						"userId": 50684,
						"imgurl": "http://dummyimage.com/200x200.png/37531e/583d43"
					},
					{
						"selected": false,
						"name": "方伟祺",
						"userId": 90633,
						"imgurl": "http://dummyimage.com/200x200.png/053a6a/200347"
					},
					{
						"selected": false,
						"name": "赵文博",
						"userId": 71864,
						"imgurl": "http://dummyimage.com/200x200.png/7e0068/4e6a0a"
					},
					{
						"selected": false,
						"name": "秦鸿煊",
						"userId": 45703,
						"imgurl": "http://dummyimage.com/200x200.png/090a19/477502"
					},
					{
						"selected": false,
						"name": "阎立辉",
						"userId": 18623,
						"imgurl": "http://dummyimage.com/200x200.png/556217/22216c"
					},
					{
						"selected": false,
						"name": "彭博超",
						"userId": 31472,
						"imgurl": "http://dummyimage.com/200x200.png/586921/7f3048"
					},
					{
						"selected": false,
						"name": "周钰轩",
						"userId": 23303,
						"imgurl": "http://dummyimage.com/200x200.png/7e4d3c/455d54"
					},
					{
						"selected": false,
						"name": "钟鸿煊",
						"userId": 45700,
						"imgurl": "http://dummyimage.com/200x200.png/5e5421/2a0615"
					},
					{
						"selected": false,
						"name": "赵晓博",
						"userId": 78016,
						"imgurl": "http://dummyimage.com/200x200.png/6c690e/2d312c"
					},
					{
						"selected": false,
						"name": "罗志泽",
						"userId": 19978,
						"imgurl": "http://dummyimage.com/200x200.png/674c03/49633e"
					},
					{
						"selected": false,
						"name": "黄修洁",
						"userId": 18507,
						"imgurl": "http://dummyimage.com/200x200.png/4d1035/2b7c7f"
					},
					{
						"selected": false,
						"name": "许嘉熙",
						"userId": 767,
						"imgurl": "http://dummyimage.com/200x200.png/334029/584d77"
					},
					{
						"selected": false,
						"name": "杨博涛",
						"userId": 43905,
						"imgurl": "http://dummyimage.com/200x200.png/612a1e/565343"
					},
					{
						"selected": false,
						"name": "邹胤祥",
						"userId": 1227,
						"imgurl": "http://dummyimage.com/200x200.png/292a62/14656a"
					},
					{
						"selected": false,
						"name": "钱熠彤",
						"userId": 38848,
						"imgurl": "http://dummyimage.com/200x200.png/7a0851/341c08"
					},
					{
						"selected": false,
						"name": "余智宸",
						"userId": 2144,
						"imgurl": "http://dummyimage.com/200x200.png/244324/43090e"
					},
					{
						"selected": false,
						"name": "邓哲瀚",
						"userId": 30985,
						"imgurl": "http://dummyimage.com/200x200.png/1a4131/1c091d"
					},
					{
						"selected": false,
						"name": "薛雨泽",
						"userId": 32248,
						"imgurl": "http://dummyimage.com/200x200.png/645a6d/6a4046"
					},
					{
						"selected": false,
						"name": "李锦程",
						"userId": 75960,
						"imgurl": "http://dummyimage.com/200x200.png/6f5253/7c4068"
					},
					{
						"selected": false,
						"name": "冯文博",
						"userId": 28802,
						"imgurl": "http://dummyimage.com/200x200.png/716563/7c6d0b"
					},
					{
						"selected": false,
						"name": "严昊天",
						"userId": 96170,
						"imgurl": "http://dummyimage.com/200x200.png/572049/3b6775"
					},
					{
						"selected": false,
						"name": "侯子骞",
						"userId": 67081,
						"imgurl": "http://dummyimage.com/200x200.png/241a07/3e6969"
					}
				]
			};
		},
		watch: {
			count(count) {
				count = 0
				this.list.forEach(e => {
					if (e.selected) {
						count++
					}

				})
				this.count = count
			}
		},
		methods: {
			tapItem(e) {
				e.selected = !e.selected
				e.selected ? this.count++ : this.count--
				this.slist = []
				this.list.forEach(e => {
					if (e.selected) {
						this.slist.push(e)
					}
				})
				this.$emit("getCount", this.count, this.slist)
			}
		}
	}
</script>

<style lang="scss">
	/deep/.uni-checkbox-input {
		border-radius: $uni-border-radius-circle;
	}

	.list {
		display: flex;
		flex-direction: column;

		.item {
			margin: $uni-spacing-row-sm 0 5rpx 0;
			display: flex;
			line-height: 80rpx;

			.name {
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				margin-left: $uni-spacing-col-sm;
			}

			.img {
				margin-left: $uni-spacing-col-sm;

				// border-radius: $uni-border-radius-sm;
				.user-pic {
					border-radius: $uni-border-radius-base;
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}
</style>
