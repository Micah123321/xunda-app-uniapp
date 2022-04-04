<template>
	<view>
		<!-- 顶部 -->
		<uni-nav-bar statusBar class="bar" fixed border="false">
			<block slot="left">
				<view class="bar-left">
					<div class="back">
						<uni-icons @click="tologin" class="bar-back" size="30" type="back" />
					</div>
				</view>
			</block>
			<block slot="right">
				<view class="bar-right">

					<div class="exit">
						<uni-icons class="bar-close" size="30" type="closeempty" />
					</div>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 注册页面 -->
		<div class="login">
			<div class="login-logo">
				<img class="login-logo-img"
					src="https://xunda-ui.oss-cn-shenzhen.aliyuncs.com/2021-11-09/defaultpic.png" alt="">
			</div>
			<div class="title">

				<div class="h1">
					<uni-title type="h1" title="注册 "></uni-title>
				</div>
			</div>
			<div class="form">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item class="username" name="username">
						<uni-easyinput v-model="customFormData.username" placeholder="用户名" />
					</uni-forms-item>
					<uni-forms-item class="nickname" name="nickname">
						<uni-easyinput v-model="customFormData.nickname" placeholder="昵称" />
					</uni-forms-item>
					<uni-forms-item class="phone" name="phone">
						<uni-easyinput v-model="customFormData.phone" placeholder="手机号" />
					</uni-forms-item>
					<uni-forms-item class="pwd" name="pwd">
						<uni-easyinput type="password" v-model="customFormData.pwd" placeholder="密码" />
					</uni-forms-item>
					<uni-forms-item class="repwd" name="repwd">
						<uni-easyinput type="password" v-model="customFormData.repwd" placeholder="确认密码" />
					</uni-forms-item>
				</uni-forms>
			</div>
			<div class="btn">
				<button class="btn-submit" type="primary" @click="submit('customForm')">注册</button>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 自定义表单校验规则
				customRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								console.log(data);
								if (value == "1234") {
									//TODO 网络验证用户名是否重复
									callback('用户名重复')
								}
								return true
							}
						}, {
							minLength: 4,
							maxLength: 18,
							errorMessage: '请输入4~18位用户名'
						}]
					},
					nickname: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								console.log(data);
								if (value == "1234") {
									//TODO 网络验证用户名是否重复
									callback('昵称重复')
								}
								return true
							}
						}, {
							minLength: 4,
							maxLength: 18,
							errorMessage: '请输入4~18位字符'
						}]
					},
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
					phone: {
						rules: [{
								required: true,
								errorMessage: '手机号不能为空'
							}, {
								minLength: 11,
								maxLength: 11,
								errorMessage: '请输入11位手机号码'
							},
							{
								pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
								errorMessage: '请输入正确的手机号码'
							}
						]
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
				customFormData: {
					username: '',
					nickname: '',
					pwd: '',
					phone: '',
					repwd: ''
				},
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `进入注册环节`
					})
					//TODO 注册 网络验证
				}).catch(err => {
					console.log('err', err);
				})
			},

			tologin() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-navbar {
		.uni-navbar__content {
			border: 0 none !important;
		}
	}

	// 去除顶部边框
	/deep/.uni-navbar--border {
		border: 0;
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

	// 添加顶部bar按键边距
	/deep/.uni-navbar__header-btns {
		padding: 0 $uni-spacing-col-base;
	}

	.bar {

		//指定尺寸
		.reg {
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
		}

		// .exit{
		// 	font-size: $uni-font-size-lg;
		// 	color: $uni-text-color;
		// }
	}


	.login {
		// margin-left: $uni-spacing-col-lg;

		.login-logo {

			// margin: $uni-spacing-col-lg;
			display: flex;
			flex-direction: column;
			align-items: center;

			.login-logo-img {
				height: 100rpx;
				width: 100rpx;

			}
		}

		.title {


			.h2 {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
		}

		.form {
			padding: $uni-spacing-row-base 0;

		}

		.btn {
			.btn-submit {
				border-radius: $uni-border-radius-lg;
				background: $uni-color-primary;
			}
		}

		padding: $uni-spacing-col-lg;
	}
</style>
