<template>
	<view class="guess-section">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in liulanData" :key="index">
			<view class="uni-list-cell-navigate uni-media-list" @tap="carProInfGetById(item)">
				<view class="uni-media-list-logo">
					<cover-image v-if="item.images !='' && item.images != null" :src="baseDemainSrc +item.images" mode="aspectFill"></cover-image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top uni-ellipsis-title" v-html="item.name"></view>
					<view class="uni-media-list-text-bottom uni-ellipsis">
						<view class="car-info">
							<text class="address">昆明</text>
							<text class="sline">|</text>
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
</template>

<script>
	// 自定义的mescroll-meituan.vue
	export default {
		data() {
			return {
				liulanData: [],
				baseDemainSrc: '',
				showArrow: true,
				options: [{
					text: '取消收藏',
					value: 1,
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad: function() {
			this.baseDemainSrc = this.$store.getters.baseDemain;
			this.liuLanCar()
		},
		methods: {
			liuLanCar() {
				// uni.removeStorageSync('hptInfo');
				let getLiuLanData = uni.getStorageSync('hptInfo');
				this.liulanData = getLiuLanData;
			},
			// 车类车型 查看详情页面
			carProInfGetById(e) {
				uni.navigateTo({
					url: "../carList/carListDetails?productId=" + e.id
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.uni-list-cell {
		width: 100%;
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
</style>
