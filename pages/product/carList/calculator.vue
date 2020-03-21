<template>
	<!-- 计算器 -->
	<view class="container">
		<view class="carousel-section">
			<swiper class="swiper" @change="swiperChange" circular=true duration="400">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<cover-image :src="baseDemainSrc + item.photo" mode="aspectFill"></cover-image>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{imgList.length}}</text>
			</view>
		</view>
		<view class="introduce-section">
			<text class="title" v-html="carDetArr.name"></text>
			<view class="car-info">
				<text class="address">{{carDetArr.belongsAddr}}</text>
				<text class="sline">|</text>
				<text class="address">{{carDetArr.runMile}}公里</text>
			</view>
			<view class="price-box">
				<text class="price">{{carDetArr.money}}万</text>
			</view>
		</view>
		<view class="witr-bg">
			<view class="fangan">
				<view class="daik-text">贷款方案</view>
				<view class="row wrt-bg">
					<view class="col-33 youdai_text_center">
						<text class="shoufu-text">首付</text>
						<text class="jine-text">{{payment}}万</text>
					</view>
					<view class="col-33 youdai_text_center">
						<text class="shoufu-text">贷款金额</text>
						<text class="jine-text">{{loan}}万</text>
					</view>
					<view class="col-33 youdai_text_center">
						<text class="shoufu-text">月供</text>
						<text class="jine-text">{{mcButions}}元</text>
					</view>
				</view>
			</view>
			<view class="fangan">
				<view class="sfbl-text">首付比例</view>
				<view class="lx-bl">
					<slider :value="paymentBl" block-color="#00b7ee" @change="sliderChange" step="10" min='30' max="70" block-size="24"
					 show-value />
				</view>
			</view>
			<view class="fangan">
				<view class="qi-style">还款期限</view>
				<view class="qi-style box-line" :class="{active:tabType==0}" @tap="shiEr(0)">12期</view>
				<view class="qi-style box-line" :class="{active:tabType==1}" @tap="shiEr(1)">24期</view>
				<view class="qi-style box-line" :class="{active:tabType==2}" @tap="shiEr(2)">36期</view>
				<view class="qi-style box-line" :class="{active:tabType==3}" @tap="shiEr(3)">48期</view>
				<view class="qi-style box-line" :class="{active:tabType==4}" @tap="shiEr(4)">60期</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		accMul,
		accAdd,
		accDiv,
		accSubtr
	} from "@/common/common.js";
	let _self;
	export default {
		data() {
			return {
				tabType: 0,
				carDetArr: {},
				imgList: [],
				weekList: [12, 24, 36, 48,60],
				carBodyShow: 1,
				baseDemainSrc: '',
				swiperCurrent: 0,
				money: '',
				// 首付
				payment: '',
				// 首付比例
				paymentBl: 30,
				// 贷款金额
				loan: '',
				// 月供
				mcButions: '',
				month: ''
			}
		},
		async onLoad(options) {
			this.carId = options.id;
			this.baseDemainSrc = this.$store.getters.baseDemain;
			this.getCarProDet();
			_self = this;
		},
		methods: {
			// 车辆详情数据请求
			getCarProDet: function() {
				this.$dapi.getCarProListDetApi({
					"id": this.carId
				}).then(res => {
					this.carDetArr = res.data.content;
					this.money = res.data.content.money;
					// console.log("++++++++++++++++: " + JSON.stringify(this.money));
					// 首付（按比例计算 30-70）
					// console.log("this.paymentBl++++++++++++++++: " + JSON.stringify(this.paymentBl));
					let payment = 0;
					payment = accMul(this.money, accDiv(this.paymentBl, 100));
					this.payment = payment;
					// 贷款金额
					let loan = 0;
					// accAdd加法函数   accSubtr减法函数   accMul乘法函数   accDiv除法函数  
					loan = accSubtr(this.money, payment);
					this.loan = loan;
					// 月供  每月还本付息金额 = [本金*月利率*(1+月利率)*还款月数]/[(1+月利率)*还款月数-1]
					this.shiEr(0);
					let carAssoPhotoList = res.data.content.carAssoPhotoList;
					for (let i = 0; i < carAssoPhotoList.length; i++) {
						if (carAssoPhotoList[i].photo) {
							this.imgList.push(carAssoPhotoList[i])
						}
					}
				})
			},
			shiEr(index) {
				// console.log("index: " + JSON.stringify(index));
				this.month = this.weekList[index];
				this.tabType = index; //切换菜单
				this.changeggg();
			},
			changeggg() {
				let wloan = accMul(this.loan, 10000)
				let mcButions = 0;
				let yuel = accDiv(0.1596, 12);
				// 计算公式
				// 每月还款额=[贷款本金×月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
				// 月利率
				let mcButionsFz = accMul(accMul(Math.pow(accAdd(1, yuel), this.month), yuel), wloan);
				let mcButionsFm = accSubtr(Math.pow(accAdd(1, yuel), this.month), 1);
				mcButions = accDiv(mcButionsFz, mcButionsFm);
				this.mcButions = mcButions.toFixed(2);
			},
			sliderChange(e) {
				// console.log('value 发生变化:' + e.detail.value);
				this.paymentBl = e.detail.value;
				let payment = 0;
				payment = accMul(this.money, accDiv(this.paymentBl, 100));
				this.payment = payment;
				// 贷款金额
				let loan = 0;
				loan = accSubtr(this.money, payment);
				this.loan = loan;
				this.changeggg();
			},

			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	uni-slider .uni-slider-handle {
		width: 10upx;
		height: 10upx;
		margin-top: -14upx;
		margin-left: -14upx;
		background-color: rgba(0, 0, 0, 0);
		z-index: 3;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;

		.swiper {
			height: 520upx;
		}

		.swiper-item {
			display: block;
			width: 100%;
			line-height: 520upx;
			text-align: center;
		}

		.swiper-dots {
			display: flex;
			position: absolute;
			left: 60upx;
			bottom: 15upx;
			width: 72upx;
			height: 36upx;
			background-size: 100% 100%;

			.num {
				width: 36upx;
				height: 36upx;
				border-radius: 50px;
				font-size: 24upx;
				color: #fff;
				text-align: center;
				line-height: 36upx;
			}

			.sign {
				position: absolute;
				top: 0;
				left: 50%;
				line-height: 36upx;
				font-size: 12upx;
				color: #fff;
				transform: translateX(-50%);
			}
		}
	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 36upx;
			font-weight: 600;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.car-info {
			color: #131313;

			.address {
				font-size: 26upx
			}

			.sline {
				margin: -10upx 10upx 0 10upx;
				font-size: 14upx;
			}

			.car-price {
				color: #FF0000;
				font-size: 34upx
			}
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: red
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 猜你喜欢 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		background: #fff;

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.uni-media-list-logo {
			width: 35%;
			height: 180upx;
		}

		.uni-media-list-text-top {
			font-size: 38upx;
			line-height: 48upx;
		}

		.uni-media-list-body {
			width: 65%;
			height: 200upx;
		}

		.car-info {
			color: #999999;
			font-size: 14upx;
			margin: 2px 0
		}

		.address {
			font-size: 20upx
		}

		.sline {
			margin: -10upx 10upx 0 10upx;
			font-size: 14upx;
		}

		.car-price {
			color: #FF0000;
			font-size: 34upx
		}
	}

	.active {
		border: 1upx solid #0088fe;
		text-align: center;
		padding: 8upx;
		border-radius: 6upx;
		color: #0088fe;
	}
</style>
