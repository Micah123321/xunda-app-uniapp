<template>
	<view>
		<!-- 顶部 -->
		<uni-nav-bar statusBar class="bar" fixed border="false">
			<block slot="left">
				<view class="bar-left">
					<div class="exit">
						<uni-icons @click="back" class="bar-close" size="60rpx" type="closeempty" />
					</div>
				</view>
			</block>
			<block slot="right">
				<view class="bar-right">
					<div @click="toreg" class="reg">
						注册
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
					<uni-title type="h1" title="登录 "></uni-title>
				</div>
				<div class="h2">你好,欢迎来到xunda</div>

			</div>
			<div class="form">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item class="username" name="username">
						<uni-easyinput v-model="customFormData.username" placeholder="用户名/手机号" />
					</uni-forms-item>
					<uni-forms-item class="pwd" name="pwd">
						<uni-easyinput type="password" v-model="customFormData.pwd" placeholder="密码" />
					</uni-forms-item>
				</uni-forms>
			</div>
			<div class="btn">
				<button class="btn-submit" type="primary" @click="submit('customForm')">登录</button>
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
							errorMessage: '账号不能为空'
						}]
					},
					pwd: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				},
				customFormData: {
					username: '',
					pwd: ''
				},
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `进入登录环节`
					})
					//TODO 登录
				}).catch(err => {
					console.log('err', err);
				})
			},
			toreg() {
				uni.navigateTo({
					url: '../reg/reg',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			back() {
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

	// 添加顶部bar按键边距
	/deep/.uni-navbar__header-btns {
		padding: 0 $uni-spacing-col-base;
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
