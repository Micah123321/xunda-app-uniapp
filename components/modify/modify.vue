<template>
	<view>
		<!-- 顶部导航 -->
		<uni-nav-bar statusBar class="bar">
			<block slot="left">
				<view class="bar-left">
					<div @click="cancle" class="cancle">
						取消
					</div>
				</view>
			</block>
			<block slot="default">
				<view class="bar-default">
					{{title}}
				</view>
			</block>
			<block slot="right">
				<view class="bar-right">
					<div @click="ok" class="ok">
						确定
					</div>
				</view>
			</block>
		</uni-nav-bar>

		<!-- 修改内容区 -->
		<view class="modify-room">
			<textarea v-if="type=='msg'" class="area-form" :value="value" maxlength="120">

			</textarea>

			<view v-if="type=='pwd'" class="form">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item class="opwd" name="opwd">
						<uni-easyinput type="password" v-model="customFormData.opwd" placeholder="原密码" />
					</uni-forms-item>
					<uni-forms-item class="pwd" name="pwd">
						<uni-easyinput type="password" v-model="customFormData.pwd" placeholder="新密码" />
					</uni-forms-item>
					<uni-forms-item class="repwd" name="repwd">
						<uni-easyinput type="password" v-model="customFormData.repwd" placeholder="确认密码" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		name: "modify",
		props: {
			title: {
				type: String,
				default: "标题"
			},
			value: {
				type: String,
				default: "内容"
			},
			type: {
				type: String,
				default: "msg"
			},
		},
		data() {
			return {
				customFormData: {
					opwd: '',
					pwd: '',
					repwd: ''
				},
				customRules: {
					pwd: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}, {
							minLength: 8,
							maxLength: 18,
							errorMessage: '请输入6~18位密码'
						}]

					},

					repwd: {
						rules: [{
							required: true,
							errorMessage: '确认密码不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								console.log(data);
								if (value != data.pwd) {
									callback('请与上面密码一致')
								}
								return true
							}
						}]
					}
				},
			};
		},
		methods: {
			cancle() {
				this.$emit("cancle", this.value)
			},
			ok() {
				this.$emit("ok", this.value)
			}
		}
	}
</script>

<style lang="scss">
	.bar {

		//指定尺寸
		.cancle,
		.ok {
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}

		.ok {
			color: $uni-color-primary;

		}

		.bar-default {
			font-size: $uni-font-size-lg;
			text-align: center;
			align-items: center;
			justify-content: center;
			display: flex;

			flex: 1;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			overflow: hidden;
		}

	}

	.modify-room {
		width: 100%;
		height: 80vh;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: $uni-border-radius-lg $uni-border-radius-lg 0 0;
		padding: $uni-spacing-row-base;
		z-index: 9;

		.area-form {
			padding: $uni-spacing-col-sm $uni-spacing-col-base;
			width: 100%;
			height: 40vh;
			box-sizing: border-box;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
		}
	}

	/deep/.is-input-border {
		border: 0;
		border-bottom: 2rpx solid $uni-bg-color-grey;
	}

	.uni-forms-item {
		.is-input-border {
			border: 0 none !important;
			border-bottom: 2rpx solid $uni-bg-color-grey !important;
		}
	}
</style>
