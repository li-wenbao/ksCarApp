<template>
	<view class="container">
		<view class="guess-section">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in bijiaoM" :key="index">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 列表数据
				bijiaoM:[]
			}
		},
		onLoad() {
			this.baseDemainSrc = this.$store.getters.baseDemain;
			this.remen();
		},
		methods: {
			remen: function() {
				this.$dapi.getCarProductListApi({
				}).then(res => {
					this.carArr = res.data.content;
					for (var i = 0; i < this.carArr.length; i++) {
						let bijiaoM = [];
						if (parseInt(this.carArr[i].money) > 30) {
							this.bijiaoM.push(this.carArr[i])
						}
					}
				})
			},
			// 车类车型
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
