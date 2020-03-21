<template>
	<view class="center">
		<view class="center_top">
			<view v-if="Info.avatar !=''" class="mask">
				<image :src="Info.avatar" style="width: 100%;"></image>
			</view>
			<view v-else class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<image v-if="Info.avatarUrl ==null || Info.avatarUrl ==''" class="tag-img" :src="photo"></image>
					<image v-else class="tag-img"  :src="Info.avatarUrl"></image>
					<!-- <image class="tag-img" :src="photo"></image> -->
					<text v-show="!mingcheng" @tap="chackLogin1">请您登录</text>
					<text v-show="mingcheng">{{myname}}</text>
				</view>
			</view>
		</view>
		<view class="center-list" style="margin-top: 150upx;">
			<view class="center-list-item" hover-class="uni-list-cell-hover" @tap="gerenxinxi" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #b60005;font-size: 26upx;">&#xe63d;</text>
				<text class="list-text" style="color: #707070;">我的信息</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
			<!-- <view class="center-list-item" hover-class="uni-list-cell-hover" @tap="Myorders" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #0b5693;">&#xe613;</text>
				<text class="list-text" style="color: #707070;">我的产品</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view> -->
			<view class="center-list-item" hover-class="uni-list-cell-hover" @tap="shoucang" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #0e6eb8;">&#xe631;</text>
				<text class="list-text" style="color: #707070;">我的收藏</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
			<view class="center-list-item" hover-class="uni-list-cell-hover" @tap="shenqing" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #0e6eb8;">&#xe63d;</text>
				<text class="list-text" style="color: #707070;">贷款申请</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
			<view class="center-list-item" hover-class="uni-list-cell-hover" @tap="liulan" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #0e6eb8;">&#xe667;</text>
				<text class="list-text" style="color: #707070;">浏览记录</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
		</view>
		<view class="center-list">
			<!-- <view class="center-list-item" hover-class="uni-list-cell-hover" @tap="Payments" style="border-bottom: 1upx solid #e8e8e8;">
				<text class="icon list-icon" style="color: #e60012;">&#xe7a5;</text>
				<text class="list-text" style="color: #707070;">兑付利息提醒</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
		</view>
		<view class="center-list" hover-class="uni-list-cell-hover" @click="bindLogout" open-type="exit" style="margin-bottom: 40upx;">
			<view class="center-list-item">
				<text class="icon list-icon" style="color: #e69c43;">&#xe686;</text>
				<text class="list-text">注销</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="center-list" hover-class="uni-list-cell-hover" @click="bindLogout" open-type="exit" style="margin-bottom: 40upx;">
			<view class="center-list-item">
				<text class="icon list-icon" style="color: #e69c43;">&#xe686;</text>
				<text class="list-text">注销</text>
				<text class="icon list-icon-right">&#xe7b5;</text>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let _self;
	export default {
		data() {
			return {
				// login: false,
				Info: {},
				mingcheng:false,
				myname:'',
				Qiandao: "签到",
				photo: '/static/img/missing-face.png'
			}
		},
		onShow(){
			if (this.$store.getters.hasLogin) {
				this.mingcheng = true;
				this.Info = this.$store.getters.userInfo;
				this.myname = this.$store.getters.userInfo.name
			}
			_self = this;
		},
		methods: {
			...mapMutations(['logout']),
			checkSign() {
				this.$request.post("/sys/user/checkSignScore", {
						data: {
							//id: id
						}
					})
					.then(res => {
						////console.log("签到信息:" + JSON.stringify(res));
						let data = res.data;
						_self.Qiandao = data.message;
					})
					.catch(error => {
						//console.log('error:', error);
						this.$RequestErorr(error);
					});
			},
			qiandao() {
				this.$request.post("/sys/user/getSignScore", {
						data: {
							//id: id
						}
					})
					.then(res => {
						////console.log("签到信息:" + JSON.stringify(res));
						let data = res.data;
						if (data.code == "100") {
							_self.Qiandao = data.message;
						}
					})
					.catch(error => {
						//console.log('error:', error);
						this.$RequestErorr(error);
					});
			},
			
			//收藏
			shoucang(){
				uni.navigateTo({
					url: "../product/shoucang/shoucangCarList"
				})
			},
			//已签订单
			Myorders() {
				uni.navigateTo({
					url: '../myorders/myorderslist',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			// 个人中心
			gerenxinxi() {
				uni.navigateTo({
					url: '/pages/mine/geren'
				});
			},
			// shenqing贷款记录
			shenqing(){
				uni.navigateTo({
					url: "../product/loanApplic/loanApplicList"
				})
			},
			// 浏览记录
			liulan(){
				uni.navigateTo({
					url: "../product/liulan/liuLanCarList"
				})
			},
			// 申请进度
			shenqingjindu(){
				uni.navigateTo({
					url: '/pages/product/appliProgress/appliProgress'
				});
			},
			// 按时发你风格
			chackLogin1(){
				uni.navigateTo({
					url: "../public/login"
				});
			},
			bindLogout() {
				this.logout();
				this.mingcheng = false;
				// this.mingchengN = true
				// this.$store.getters.hasLogin;
				// l
				// plus.runtime.quit();
			},
		}
	}
</script>
<style lang="scss">
	page {
		height: 100%;
	}

	a {
		color: #666666;
		text-decoration: none;
		/*超链接无下划线*/
		font-size: 30upx
	}

	.profily,
	.profily_header {
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	.center {
		height: 100%;
		&_top {
			height: 26%;
			background: url(../../static/img/320641.jpg) no-repeat 0% 50%;
			background-size: cover;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
			.maskImg {
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;
			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -60upx;
				left: 5%;
				background: #FEFEFE;
				padding: 25upx;
				box-sizing: border-box;
				// box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		// border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 100upx;
			width: 100upx;
			background-image: url(../../static/img/320641.jpg);
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}
	}
</style>

<style>
	page,
	view {
		display: flex;
	}

	.qiandao {
		background: #FFFFFF;
		border: 1upx solid #DDDDDD;
		padding: 6upx 26upx;
		border-radius: 32upx;
	}

	page {
		background-color: #f8f8f8;
	}

	.list-text-r {
		text-align: right;
		color: #131313;
		line-height: 90upx;
	}

	.center {
		flex-direction: column;
	}

	.tag-img {
		width: 130upx;
		height: 130upx;
		border-radius: 65upx;
		/* background: #DDDDDD; */
		text-align: center;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2F85FC;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}
	
	.list-icon-right {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		text-align: right;
		font-family: texticons;
		/* margin-right: 20upx; */
	}
	

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		width: 120upx;
		font-size: 32upx;
		color: #444444;
		text-align: right;
		font-family: texticons;
	}
</style>
