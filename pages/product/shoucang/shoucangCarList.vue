<template>
	<view class="scroll-wrapper">
		<mescroll-uni @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="guess-section">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in listArr" :key="index">
					<uni-swipe-action @click="bindClick(item, index)" :options="options" v-show="showArrow">
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
									{{item.cunshijian}}
								</view>
							</view>
						</view>
					</uni-swipe-action>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	// 自定义的mescroll-meituan.vue
	import MescrollUni from "@/components/mescroll-diy/mescroll-meituan.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	var _self;
	export default {
		components: {
			MescrollUni,
			uniSwipeAction
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				listArr: [],
				baseDemainSrc: '',
				showArrow:true,
				options: [{
					text: '取消收藏',
					value:1,
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad: function() {
			// this.$checkHasLogin();
			_self = this;
			this.baseDemainSrc = this.$store.getters.baseDemain;
		},
		// 必须注册滚动到底部的事件,使上拉加载生效
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		// 必须注册列表滚动事件,使下拉刷新生效
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 下拉刷新的回调
			downCallback(mescroll) {
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				if (this.$store.getters.hasLogin) {
					this.$dapi.getshoucangApi({
						"pageNo": mescroll.num,
						"pageSize": mescroll.size
					}).then(res => {
						let data = res.data;
						// console.log("收藏:" + JSON.stringify(data));
						if (data.count == 0) {
							mescroll.endBySize(0, 0);
						} else {
							let totalSize = data.count;
							let curPageData = data.content;
							////console.info(curPageData.length)
							//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
							mescroll.endBySize(curPageData.length, totalSize);
							//必传参数(当前页的数据个数, 总数据量)
							//设置列表数据
							if (mescroll.num == 1) _self.listArr = []; //如果是第一页需手动制空列表
							_self.listArr = _self.listArr.concat(curPageData); //追加新数据
						}
					})
				} else {
					uni.redirectTo({
						url: '../../../pages/public/login'
					})
				}
			},
			bindClick(e,i){
				// console.log("e: " + JSON.stringify(e));
				this.$dapi.getQxshoucangApi({
					"car.id": e.id
				}).then(res => {
					// console.log("res: " + JSON.stringify(res));
					this.listArr.splice(i,1); 
					// this.mescroll.resetUpScroll();				
				})
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
