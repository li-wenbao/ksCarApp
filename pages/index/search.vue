<template>
	<view class="head">
		<view class="header-wrap">
			<view class="index-header">
				<text class="myReturn icon" type="chevron-left" style="font-size:36upx;margin-top: 6upx;" color="#fff" @click="onreturn()">&#xe684;</text>
				<view class="input-wrap" v-if="input">
					<input type="text" confirm-type="search" @confirm="rightClick" placeholder="请输入想买的车" v-model="searchVal" focus="true" />
					<text class="icon" style="font-size: 36upx;">&#xe691;</text>
				</view>
				<view class="map-wrap" @click="rightClick">
					<text style="font-size: 30upx;color: #FFFFFF;text-align: right;">搜索</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "IndexHeader",
		props: [
			'leftWords',
			'rightIcon',
			'rightWords'
		],
		data() {
			return {
				"input": true,
				searchVal: ''
			
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.onreturn();
			return true;
		},
		// computed: mapState(['hasLogin', 'uerInfo']),
		onLoad: function() {
		},
		methods: {
			// 返回上一页
			onreturn() {
				uni.navigateBack()
			},
			inputChange(e) {
		
			},
			// 请求并刷新页面
			rightClick(e) {
				console.log("你输入了信息" + this.value);
				this.loadFalg = true;
			},

			getData() {
				
				uni.navigateTo({
					url: '../product/ProductDetail?id=' + e.id,
				});
				// this.$dapi.getCarProductListApi(this.filterResult).then(res => {
				// 	let data = res.data;
				// 	// console.log("我的车辆+++++:" + JSON.stringify(data));
				// 	if (data.count == 0) {
				// 		if (mescroll.num == 1) _self.listArr = []; //如果是第一页需手动制空列表
				// 		mescroll.endBySize(0, 0);
				// 	} else {
				// 		let totalSize = data.count;
				// 		let curPageData = data.content;
				// 		////console.info(curPageData.length)
				// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 		mescroll.endBySize(curPageData.length, totalSize);
				// 		//必传参数(当前页的数据个数, 总数据量)
				// 		//设置列表数据
				// 		if (mescroll.num == 1) _self.contentList = []; //如果是第一页需手动制空列表
				// 		_self.contentList = _self.contentList.concat(curPageData); //追加新数据
				// 		// console.log("我的车辆:" + JSON.stringify(_self.listArr));
				// 	}
				// });
				
				
				// console.log("this.Myvalue: " + JSON.stringify(this.Myvalue));
				// this.$request.get("/cms/fullText/select?text=" + this.Myvalue, {
				// 		// data: {
				// 		// 	text: this.Myvalue
				// 		// },
				// 	})
				// 	.then(res => {
				// 		// console.log("res+++++++++++++++++++: " + JSON.stringify(res));
				// 		let data = res.data;
				// 		let content = data.content
				// 		this.contentList = content;
				// 	})
				// 	.catch(error => {
				// 		this.$RequestErorr(error);
				// 	});
			},
			ProductDetail(e) {
				// console.log("e: " + JSON.stringify(e));
				uni.navigateTo({
					url: '../product/ProductDetail?id=' + e.id,
				});
			},
		},
	}
</script>

<style lang="scss">
	$color-base: #00c16f;
	$words-color-base: #333333;
	$words-color-light: #999999;

	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;

		/* #ifdef APP-PLUS */
		.index-header {
			height: 88upx;
			line-height: 88upx;
			padding: 0 30upx;
			padding-top: 60upx;
			background-color: #0088fe;
			font-size: 28upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.address {
				font-size: 26upx;
			}

			.input-wrap {
				width: 540upx;
				height: 70upx;
				padding: 10upx 30upx 10upx 80upx;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 50upx;
				color: $words-color-base;
				position: relative;

				text {
					position: absolute;
					left: 20upx;
					top: 6upx;
					color: $words-color-light;
					font-size: 30upx;
				}
			}

			.map-wrap {
				.iconfont {
					font-size: 32upx;
					margin-right: 5upx;
				}

				text {
					font-size: 26upx;
				}
			}
		}

		/* #endif */

		/* #ifdef H5 */
		.index-header {
			height: 88upx;
			line-height: 88upx;
			padding: 0 30upx;
			padding-top: 10upx;
			background-color: #0088fe;
			font-size: 28upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.address {
				font-size: 26upx;
			}

			.input-wrap {
				width: 540upx;
				height: 70upx;
				padding: 10upx 30upx 10upx 80upx;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 50upx;
				color: $words-color-base;
				position: relative;

				text {
					position: absolute;
					left: 20upx;
					top: 6upx;
					color: $words-color-light;
					font-size: 30upx;
				}
			}

			.map-wrap {
				.iconfont {
					font-size: 32upx;
					margin-right: 5upx;
				}

				text {
					font-size: 26upx;
				}
			}
		}

		/* #endif */

		/* #ifdef MP-WEIXIN */
		.index-header {
			height: 88upx;
			line-height: 88upx;
			padding: 0 30upx;
			padding-top: 10upx;
			background-color: #e60012;
			font-size: 28upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.address {
				font-size: 26upx;
			}

			.input-wrap {
				width: 540upx;
				height: 70upx;
				padding: 10upx 30upx 10upx 80upx;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 50upx;
				color: $words-color-base;
				position: relative;

				text {
					position: absolute;
					left: 20upx;
					top: 6upx;
					color: $words-color-light;
					font-size: 30upx;
				}
			}

			.map-wrap {
				.iconfont {
					font-size: 32upx;
					margin-right: 5upx;
				}

				text {
					font-size: 26upx;
				}
			}
		}

		/* #endif */

	}

	.leftWords {
		width: 66upx;
		height: 66upx;
	}

	.tags {
		font-size: 16upx;
		text-align: center;
		color: #FFFFFF;
		background: #0e6eb8;
		border-radius: 50%;
		position: absolute;
		top: 50upx;
		right: 12upx;
		width: 26upx;
		height: 26upx;
	}

	/* #ifdef H5 */
	.blank {
		height: 76upx;
	}

	/* #endif */

	/* #ifdef APP-PLUS */
	.blank {
		height: 126upx;
	}

	/* #endif */
</style>

<style>
	.uni-card {
		background: #fff;
		border-radius: 0px;
		margin: 0;
		position: relative;
		border-bottom: 1px #E8E8E8 solid;
	}

	.uni-media-list-logo {
		width: 120upx;
		height: 120upx;
	}

	.uni-media-list-logo img {
		display: initial;
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list {
		padding: 10upx 66upx 10upx 20upx;
	}

	.uni-media-list-text-top {
		font-size: 32upx;
		margin-top: 5upx;
		line-height: 40upx;
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
		margin-top: 10upx
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

	.uni-list-cell-navigate.uni-navigate-right:after {
		font-size: 52upx;
	}
</style>
