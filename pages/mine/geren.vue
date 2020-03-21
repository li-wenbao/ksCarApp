<template>
	<view class="center">
		<view class="uni-grid-9" style="border: none;">
			<view class="uni-grid-9-item" style="border: none;" show-border="false">
				<view class="tag-img" style="border: none;">
					<image v-if="Info.avatarUrl ==null || Info.avatarUrl ==''" class="tag-img" :src="photo"></image>
					<image v-else class="tag-img"  :src="Info.avatarUrl"></image>
				</view>
				<text class="uni-grid-9-text icon-text-head">
					<text class="uer-name">{{Info.name}}</text>
				</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="icon list-icon" style="color: #448dda;">&#xe615;</text>
				<text class="list-text">姓名</text>
				<text class="list-text-r">{{Info.name}}</text>
			</view>
			<view class="center-list-item">
				<text class="icon list-icon" style="color: #448dda;">&#xe697;</text>
				<text class="list-text">性别</text>
				<text class="list-text-r">{{sex}}</text>
			</view>
			<view class="center-list-item" hover-class="uni-list-cell-hover">
				<text class="icon list-icon" style="color: #448dda;">&#xe60e;</text>
				<text class="list-text">年龄</text>
				<text class="list-text-r">{{age}}岁</text>
			</view>
			<view class="center-list-item" hover-class="uni-list-cell-hover">
				<text class="icon list-icon" style="color: #df6452;">&#xe668;</text>
				<text class="list-text">电话</text>
				<text @tap="changePhoneState" class="list-text-r">{{showPhone}}<text class="icon">&#xe7b5;</text></text>
			</view>
			<view class="center-list-item" hover-class="uni-list-cell-hover">
				<text class="icon list-icon" style="color: #448dda;">&#xe61b;</text>
				<text class="list-text">身份证号</text>
				<text @tap="changeIdCardState" class="list-text-r">{{showIdCard}}<text class="icon">&#xe7b5;</text></text>
			</view>
			<view class="center-list-item">
				<text class="icon list-icon" style="color: #448dda;">&#xe629;</text>
				<text class="list-text">地址</text>
				<text class="list-text-r">{{Info.address}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// let phone;
	// let idCard;
	let _self;
	export default {
		data() {
			return {
				Info: {},
				brandPFold: true,
				brandIFold: true,
				sex: "未知",
				age: '',
				showPhone: "",
				showIdCard: "",
				photo: '/static/img/missing-face.png'
			}
		},
		onLoad: function() {
			_self = this;
			if (this.$store.getters.hasLogin) {
				try {
					// this.Info = uni.getStorageSync('uerInfo');
					_self.Info = this.$store.getters.userInfo;
					// console.log("this.Info: " + JSON.stringify(this.Info));
				} catch (e) {
					error
				}
				this.onl();
			} else {
				uni.redirectTo({
					url: '../../pages/public/login'
				})
			};
			this.changePhoneState();
			this.changeIdCardState();
		},
		methods: {
			onl() {
				let idCard = this.Info.idCard;
				//获取性别 
				if (parseInt(idCard.substr(16, 1)) % 2 == 0) {
					this.sex = "女";
					//是男则执行代码 ... 
				} else {
					this.sex = "男";
					//是女则执行代码 ... 
				};
				// console.log("idCard.substring(16, 1): " + JSON.stringify(idCard.substr(16, 1)));
				//获取年龄 
				var myDate = new Date();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
				if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <=
					day) {
					age++;
				}
				this.age = age;
				//alert(age);
				//年龄 age 
			},
			changePhoneState() {
				if (_self.brandPFold) {
					let phone = _self.Info.phone;
					_self.showPhone = phone.substring(0, 3) + "****" + phone.substring(7, 11);
					_self.brandPFold = false;
				} else {
					_self.showPhone = _self.Info.phone;
					_self.brandPFold = true;
				}
			},
			changeIdCardState() {
				if (_self.brandIFold) {
					let idCard = _self.Info.idCard;
					_self.showIdCard = idCard.substring(0, 6) + "********" + idCard.substring(14, 18);
					_self.brandIFold = false;
				} else {
					_self.showIdCard = _self.Info.idCard;
					_self.brandIFold = true;
				}
			},
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	.uni-grid-9 {
		/* background-size: cover; */
		background: url('../../static/img/320641.jpg') no-repeat 50% 50%;
		background-size: 100%;
		width: 100%;
		height: 60%;
	}

	.uni-grid-9-item {
		width: 350upx;
		height: 300upx;
		display: flex;
		margin: 0 auto;
	}

	.icon-text-head {
		margin: 20upx;
		color: #222222;
	}

	.qiandao {
		border: 1upx solid #DDDDDD;
		padding: 26upx 20upx;
		border-radius: 32upx;
	}

	page {
		background-color: #f8f8f8;
	}

	.list-text-r {
		text-align: right;
		color: #666666;
		padding-right: 20upx;
		line-height: 90upx;
	}

	.center {
		flex-direction: column;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.logo {
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #0e6eb8;
	}

	.tag-img {
		width: 130upx;
		height: 130upx;
		border-radius: 70upx;
		background: #DDDDDD;
		text-align: center;
	}

	.logo-img {
		width: 130upx;
		height: 130upx;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-title {
		width: 250upx;
		line-height: 4upx;
		height: 40upx;
		text-align: center;
		margin-top: 26upx;
		/* margin-left: -5upx; */
		font-size: 30upx;
		color: #FFFFFF;
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

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
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
