<template>
	<view class="content" v-show="showForm">
		<view class="input-box">
			<view class="input-item">
				<view class="input-label">手机号</view>
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" placeholder="请输入手机号" class="input">
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="请输入验证码" type="number" style="margin-right: 160upx;" v-model="code" maxlength="6" class="input">
					<button :disabled="!isCanSendCode" class="btn-code" @tap="sendCode">{{sendMsg}}</button>
				</view>
			</view>
		</view>
		<button class="submit" type="primary" style="background: #FFFFFF;color: #323232;" @tap="clogin">确定</button>
		<!-- <view class="uni-textarea">
				<view style="color: #333333;font-size: 30upx;text-align: center;">{{bindTextArea}}</view>
		</view> -->
		<!-- #ifdef APP-PLUS -->
		<view class="oauth-row" style="text-align: center;" @tap="weixilogin">
			<view class="oauth-image">
				<image src="../../static/img/weixin.png"></image>
				<view style="color: #333333;font-size: 30upx;text-align: center;">微信登录</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	import utils from '@/common/utils.js';
	import {
		checkPhone,
		checkPwd,
		checkCode
	} from "@/common/common.js"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let timer = '';
	export default {
		data() {
			// const isUni = typeof(uni) !== 'undefined'
			return {
				sendMsg: "获取验证码",
				// phone: '15687371830',
				phone: '',
				isCanSendCode: true,
				// code: '666666',
				code: '',
				// bindTextArea: '22222222222222222222',
				showForm: true,
				positionTop: 0
			}
		},
		onShow(e) {
			this.initPosition();
			// let testInfo = {
			// 	"openId": '13134466',
			// 	"nickName": 'abhh3424',
			// 	"avatarUrl": '979bhnm',
			// };
			// uni.setStorageSync("wxUserInfo", testInfo);
			// #ifdef H5 
				utils.checkWxLogin(this.$store.state.wxAppId, this.$store.state.wxInfoByCode);
			// #endif
			if (!this.$store.getters.hasLogin) {
				let wxInfo = uni.getStorageSync("wxUserInfo");
				if (wxInfo && wxInfo.openId) {
					this.wxlogin(wxInfo.openId);
				} else {

				}
			}
			let wxInfo = uni.getStorageSync("wxUserInfo");
			this.bindTextArea = JSON.stringify(wxInfo);
		},
		methods: {
			...mapMutations(['login']),
			clearCodeInterval() {
				clearInterval(timer);
				this.codemsg = "获取验证码";
			},
			wxlogin(openId) {
				this.$dapi.weixinlogin({
					openId: openId
				}).then(res => {
					if (res.data.code == 100) {
						let content = res.data.content;
						this.$store.commit("login", content)
						this.$dapi.init();
						uni.showToast({
							icon: 'none',
							title: '登录成功',
						});

						// var pages = getCurrentPages(),
						// 	prevPage = null;
						// if (pages.length > 1) {
						// 	prevPage = pages[pages.length - 2];
						// }
						// if (prevPage) {
						// 	// #ifdef H5
						// 	prevPage.customerSource = this.source[this.curIndex];
						// 	// #endif
						// 	// #ifdef APP-PLUS || MP-WEIXIN
						// 	prevPage.setData({
						// 		customerSource: this.source[this.curIndex]
						// 	})
						// 	// #endif
						// }
						uni.navigateBack();
						// uni.navigateBack();
					} else {
						// 新用户 提示或者直接不提示去绑定手机号 不绑定也可继续浏览信息 需要登录时在绑定上手机号
						//不强制 绑定手机号 ，可以取消界面，在需要登陆的界面进行检查 登陆  并跳转到手机号登陆绑定界面
					}
				})
			},
			sendCode() {
				//发送验证码 手机号码是否正确
				if (!checkPhone(this.phone)) {
					////console.log('wwwwwwwwwwwwwwwwwww');
					return;
				}
				// 手机号正确 执行
				this.setCodeInterval();
				/*
				 * 发送验证码逻辑
				 */
			},
			// 手机号登陆
			setCodeInterval() {
				let phone = this.phone;
				this.$dapi.sendValidation({
					phone: this.phone
				}).then(res => {
					if (res.data.code == 100) {
						uni.showToast({
							//获得保存在本地的用户信息  		
							icon: 'none',
							title: "验证码已发送！",
						});
						setTimeout(function() {}, 2000)
						//设置验证码重新发送定时器
						let time = 60;
						clearInterval(timer);
						timer = setInterval(() => {
							time--;
							this.isCanSendCode = false;
							this.sendMsg = time + "s"
							if (time <= 0) {
								this.isCanSendCode = true;
								this.sendMsg = "重新获取";
								clearInterval(timer);
							}
						}, 1000)
						// return;
					} else {
						uni.showToast({
							icon: 'none',
							title: '登录失败！',
							//获得保存在本地的用户信息  					
						});
					}
				})
			},
			// 是底部设置不会被键盘顶上去
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},

			clogin() {
				if (this.phone.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 11 个字符'
					});
					return;
				}
				if (this.code.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				let phone = this.phone;
				let code = this.code;
				//console.log("phone: " + JSON.stringify(phone));
				let _self = this;
				let wxInfo = uni.getStorageSync("wxUserInfo");
				this.$dapi.login({
					phone: phone,
					code: code,
					openId: wxInfo.openId,
					nickName: wxInfo.nickname,
					avatarUrl: wxInfo.headImgUrl,
				}).then(res => {
					if (res.data.code == 100) {
						var content = res.data.content;
						//console.log("登录信息:" + JSON.stringify(content));								
						this.$store.commit("login", content)
						this.$dapi.init();
						uni.showToast({
							icon: 'none',
							title: '登录成功',
							//获得保存在本地的用户信息  					     
						});
						this.toMain();
					} else {
						uni.showToast({
							icon: 'none',
							title: '登录失败！',
							//获得保存在本地的用户信息  					
						});
					}
				})
			},

			toMain() {
				uni.reLaunch({
					url: '../index/index',
				});
			},
			setreg() {
				uni.reLaunch({
					url: '../reg/reg',
				});
			},
			bind() {
				uni.reLaunch({
					url: '../bind/bind',
				});
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background-color: #ffffff;
	}

	.content {
		background: #ffffff
	}

	button::after {
		border: none;
	}

	.input-box {
		padding: 50upx;
		font-size: 30upx;

		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;

			.input-label {
				width: 150upx;
				line-height: 100upx
			}

			.input-body {
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);

				.input {
					line-height: 100upx;
					// height: 100upx;
					margin-top: 26upx;
					position: relative;
					font-size: 28upx;
					// border: 1upx #205592 solid
				}

				.btn-code {
					position: absolute;
					right: 0upx;
					top: 50%;
					border: #dddddd solid 1upx;
					transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					height: 60upx;
					line-height: 60upx;
				}
			}
		}
	}

	.submit {
		margin: 0 auto;
		width: 375upx;
		border: #dddddd solid 0.5upx;
		border-radius: 50upx;
		line-height: 80upx;
		height: 80upx;
		color: #205592;
		font-size: 32upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		// margin-top: 250upx;
		top: 880upx;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 120upx;
		height: 120upx;
		// border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 80upx;
		height: 80upx;
		margin: 20upx;
	}
</style>
