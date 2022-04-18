<template>
	<view class="emoji">
		<evan-emoji @on-submit="fnOnSubmit" @on-select="fnOnEmojiSelect" @on-delete="fnOnEmojiDelete">
		</evan-emoji>
	</view>
</template>

<script>
	export default {
		name: "emoji",
		data() {
			return {

			};
		},
		methods: {
			fnOnEmojiSelect(e) {//选择表情按钮事件
				console.log(e);
				if(e.data.html.length>=1){
					// console.log(e.data.html);
					this.$emit("on-select",e.data.html)
				}else{
					let html = uni.$evanEmoji.util.convert.toHtml(e.data.text, false, {
						classes: ['img-class-1'], // 自定义class
						width: 40, // 图片宽（rpx）
						height: 40, // 图片高（rpx）
						styles: {
							'vertical-align': 'text-bottom'
						} // 其他样式(必须是原生的style写法，不支持驼峰式)
					});
					// console.log(e.data.text,html);
					this.$emit("on-submit",2,html)
				}
			},
			fnOnEmojiDelete() {//删除按钮触发事件
				// console.log("删除");
				this.$emit("on-delete")
			},
			fnOnSubmit(){//点击了发送按钮
				// console.log("发送");
				this.$emit("on-submit",1,null)
			}
		}
	}
</script>

<style lang="scss">
	.emoji {
		width: 100%;
		height: 400rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, .1);
	}

</style>
