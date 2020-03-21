<template>
	<view class="container">

		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		<!-- <view class="myuni-top"></view> -->
		<!-- 头部轮播 -->
	
		<view class="carousel-section">
			<swiper class="carousel" circular @change="swiperChange" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @tap="carProInfGetById(item)">
					<cover-image v-if="item.images !='' && item.images != null" :src="baseDemainSrc +item.images" mode="aspectFill"></cover-image>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 淘二手车 -->
		<view class="uni-grid-12 uni-common-mt" >
			<view class="uni-grid-12-item" show-border="false" @tap="chelingd">
				<view class="tag-img" style="background: #fec049;"><text class="icon" style="font-size: 64upx;color:#FFFFFF;">&#xe600;</text></view>
				<text class="uni-grid-12-text icon-text-head">准新车</text>
			</view>
			<view class="uni-grid-12-item" show-border="false" @tap="gaojia">
				<view class="tag-img" style="background: #4479f9;padding-top: -24upx;"><text class="icon" style="font-size: 80upx;color: #FFFFFF;">&#xe731;</text></view>
				<text class="uni-grid-12-text icon-text-head">豪华车</text>
			</view>
			<view class="uni-grid-12-item" show-border="false" @tap="dijia">
				<view class="tag-img" style="background: #ff4d49;padding-top: 12upx;"><text class="icon" style="font-size: 50upx;color:#FFFFFF;">&#xe63f;</text></view>
				<text class="uni-grid-12-text icon-text-head">练手车</text>
			</view>
			<view class="uni-grid-12-item" show-border="false" @tap="rexiao">
				<view class="tag-img" style="background: #5ed2a3;padding-top: 10upx;"><text class="icon" style="font-size: 54upx;color:#FFFFFF;">&#xe648;</text></view>
				<text class="uni-grid-12-text icon-text-head">热销车</text>
			</view>
		</view>

		<!-- 浏览记录 -->
		<view v-if="liulanDataLength !=0 ||shoucangArrLenght !=0">
			<view class="top-warp">
				<view class="nav">
					<view :class="{'active':tabType==0}" @tap="changeTab(0)">浏览记录</view>
					<view :class="{'active':tabType==1}" @tap="changeTab(1)">我收藏的</view>
				</view>
			</view>
			<view v-show="tabType==0">

				<view class="uni-card" v-for="(item, index) in liulanData" :key="index">
					<view class="uni-card-content" @tap="carProInfGetById(item)">
						<view class="uni-card-content-inner">
							<view class="uni-media-list-text-top uni-ellipsis-title" v-html="item.name"></view>
							<view class="car-info">
								<!-- <text class="address">昆明</text>
									<text class="sline">|</text> -->
								<text class="address">{{item.cardDate}}</text>
								<text class="sline">|</text>
								<text class="address">{{item.runMile}}万公里</text>
								<text class="address" style="margin-left: 36upx;">{{item.money}}万</text>
							</view>
							<view class="car-info" style="color: #999999;font-size: 22upx;">
								浏览时间<text style="margin-left: 20upx;">{{item.viewTime}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-card" @tap="chakanqita">
					<view class="uni-card-content">
						<view class="uni-card-content-inner" style="text-align: center;">
							<view class="uni-media-list-text-top uni-ellipsis-title" style="font-size: 30upx;">查看{{liulanDataLength}}款看过的车
								<text class="icon" style="font-size: 32upx;">&#xe7b5;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="tabType==1">

				<view class="uni-card" v-for="(item, index) in shoucangArr" :key="index">
					<view class="uni-card-content" @tap="carProInfGetById(item)">
						<view class="uni-card-content-inner">
							<view class="uni-media-list-text-top uni-ellipsis-title" v-html="item.name"></view>
							<view class="car-info">
								<!-- <text class="address">昆明</text>
									<text class="sline">|</text> -->
								<text class="address">{{item.cardDate}}</text>
								<text class="sline">|</text>
								<text class="address">{{item.runMile}}万公里</text>
								<text class="address" style="margin-left: 36upx;">{{item.money}}万</text>
							</view>
						</view>
					</view>
				</view>

				<view class="uni-card" @tap="chakanshoucang">
					<view class="uni-card-content">
						<view class="uni-card-content-inner" style="text-align: center;">
							<view class="uni-media-list-text-top uni-ellipsis-title" style="font-size: 30upx;">查看{{shoucangArrLenght}}款收藏的车
								<text class="icon" style="font-size: 32upx;">&#xe7b5;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">最新上架</text>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in carArr" :key="index">
				<view class="uni-list-cell-navigate uni-media-list" @tap="carProInfGetById(item)">
					<view class="uni-media-list-logo">
						<cover-image v-if="item.images !='' && item.images != null" :src="baseDemainSrc +item.images" mode="aspectFill"></cover-image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top uni-ellipsis-title" v-html="item.name"></view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<view class="car-info">
								<!-- <text class="address">昆明</text>
								<text class="sline">|</text> -->
								<text class="address">{{item.cardDate}}</text>
								<text class="sline">|</text>
								<text class="address">{{item.runMile}}万公里</text>
							</view>
							<view class="car-price">
								<text>{{item.money}}万</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	export default {
		data() {
			return {
				tabType: 0, //菜单类型
				liulanData: [],
				liulanDataLength: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				shoucangArr: '',
				shoucangArrLenght: '',
				baseDemainSrc: '',
				// 列表数据
				carArr: [],
				//轮播图
				autoplay: true,
				interval: 8000,
				duration: 500,
			};
		},
		onLoad() {
			this.baseDemainSrc = this.$store.getters.baseDemain;
			// #ifdef H5 
			utils.checkWxLogin(this.$store.state.wxAppId, this.$store.state.wxInfoByCode);
			// #endif

			this.lunbotu();
			this.getCarProduct();
			this.getTabData(0)
		},
		methods: {
			// 最新车型 轮播图
			lunbotu: function() {
				this.$dapi.getCarProductListApi({
					pageNo: 1,
					pageSize: 6
				}).then(res => {
					let carouselList = res.data.content;
					this.swiperLength = carouselList.length;
					this.carouselList = carouselList;
				})
			},
			// 切换菜单
			changeTab(type) {
				var newTab = this.getTabData(type); //准备切换过去的tab
				this.tabType = type; //切换菜单
			},
			// 获取菜单对应的数据
			getTabData(tabType) {
				if (tabType == 0) {
					let getLiuLanData = uni.getStorageSync('hptInfo');
					this.liulanDataLength = getLiuLanData.length;
					let liulanDatas = []
					for (var i = 0; i < 3 && i < getLiuLanData.length; i++) {
						liulanDatas.push(getLiuLanData[i]);
					}
					this.liulanData = liulanDatas;
				} else if (tabType == 1) {
					if (!this.$store.getters.hasLogin) {
						uni.navigateTo({
							url: "../public/login"
						});
					} else {
						this.$dapi.getshoucangApi({
							"pageNo": 1,
							"pageSize": 4
						}).then(res => {
							this.shoucangArr = res.data.content;
							if (res.data.count > 4) {
								this.$dapi.getshoucangApi({}).then(res => {
									this.shoucangArrLenght = res.data.count;
								})
								// console.log("this.shoucangArrLenght: " + JSON.stringify(this.shoucangArrLenght));
							} else {
								this.shoucangArrLenght = res.data.count;
							}

							// console.log('数据:' + JSON.stringify(carArr));
						})
					}
				}
			},

			// 浏览记录
			chakanqita() {
				uni.navigateTo({
					url: "../product/liulan/liuLanCarList"
				})
			},
			// 查看收藏
			chakanshoucang() {
				uni.navigateTo({
					url: "../product/shoucang/shoucangCarList"
				})
			},
			// 最新车型 列表数据
			getCarProduct: function() {
				this.$dapi.getCarProductListApi({
					"pageNo": 1,
					"pageSize": 5
				}).then(res => {
					this.carArr = res.data.content;
					// console.log('数据:' + JSON.stringify(carArr));
				})
			},
			// 搜索框
			inputChange() {
				uni.navigateTo({
					url: '../index/search'
				});
			},
			// 
			chelingd() {
				uni.navigateTo({
					url: "../product/chelingd/chelingdCarList"
				})
			},
			// 低价车
			dijia() {
				uni.navigateTo({
					url: "../product/dijia/dijiaCarList"
				})
			},
			// 高价车
			gaojia() {
				uni.navigateTo({
					url: "../product/gaojia/gaojiaCarList"
				})
			},
			//热销车
			rexiao() {
				uni.navigateTo({
					url: "../product/rexiao/rexiaoList"
				})
			},
			// 车类车型 点击查看详情
			carProInfGetById(e) {
				uni.navigateTo({
					url: "../product/carList/carListDetails?productId=" + e.id
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},

			//轮播图
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			// this.$api.msg('点击了搜索框');
			uni.navigateTo({
				url: '../index/search'
			});
		},
		// #endif
	}
</script>

<style>
	.uni-list:before {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 0px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-media-list-logo {
		width: 250upx;
		height: 180upx;
		overflow: inherit
	}

	.uni-media-list-logo image {
		align-items: center;
		display: block;
		// position: inherit
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		font-size: 36upx;
		margin-top: 5upx;
		line-height: 42upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; //行数
		-webkit-box-orient: vertical;

		// 针对英文
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: break-all;
	}

	.uni-media-list-text-bottom {
		color: #999999;
		font-size: 26upx;
		margin-top: 20upx
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 0px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.address {
		font-size: 26upx;
		color: #666666;
	}

	.sline {
		margin: -10upx 10upx 0 10upx;
		font-size: 14upx;
	}

	.car-price {
		color: #FF0000;
		font-size: 40upx;
		margin-top: -10upx;
	}

	.uni-view .uni-list-cell-navigate {
		width: 690upx;
	}

	.uni-list-cell-navigate.uni-navigate-right:after {
		font-size: 52upx;
	}
</style>
<style lang="scss">
	.myuni-top {
		background: url('../../static/img/toubu.png') no-repeat 0% 50%;
		background-size: 100%;
		width: 100%;
		height: 100%;
		height: 200upx;
	}

	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		background: #ffffff;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	.tag-img {
		border-radius: none;
		background: none;
		text-align: center;
		width: 140upx;
		height: 200upx;
		border-radius: 50%;
	}

	.uni-common-mt {
		margin-top: -15px;
		position: relative;
		top: -100upx;
		z-index: 9999;
	}

	/* #endif */
	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		// top: -100upx;
		// z-index: 9999;
		width: 694upx;
		height: 350upx;
		background: #f3f3f3;
		margin: 0 28upx;
		border-radius: 16upx;
		-webkit-box-shadow: 0 .8px 4px rgba(0, 0, 0, .2);
		box-shadow: 0 .8px 4px rgba(0, 0, 0, .2);
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			// padding: 0 28upx;
			overflow: hidden;
			border-radius: 16upx;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 16upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
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

	.f-header {
		display: flex;
		align-items: center;
		height: 70upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1;
		}
	}

	.icon-text-head {
		margin-top: 26upx;
	}
</style>


<style>
	.top-warp {
		z-index: 9990;
		position: initial;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		height: 60upx;
		background-color: white;
	}

	.top-warp .tip {
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}

	.top-warp .nav {
		text-align: center;
		height: 60upx;
		border-bottom: 1upx solid #ddd;
	}

	.top-warp .nav view {
		float: left;
		display: inline-block;
		width: 22%;
		line-height: 60upx;
		font-size: 28upx;
	}

	.top-warp .nav .active {
		border-bottom: 2upx solid #1296db;
		color: #1296db;
		font-size: 34upx;
		font-weight: 600;
	}

	.uni-card-content-inner {
		position: relative;
		padding: 14upx 20upx;
	}

	.uni-card {
		background: #fff;
		border-radius: 4px;
		margin: 16upx 20upx;
		position: relative;
		-webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
		box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
	}
</style>
