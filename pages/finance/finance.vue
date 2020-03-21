<template>
	<!-- 新闻 -->
	<view class="scroll-wrapper">
		<mescroll-uni bottom="50" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(list,index) in listArr" :key="index">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" @tap="getproductD(list)">
						<!-- <image v-if="list.photo !=='' && list.photo !== null" :src="baseDemainSrc+list.photo"></image> -->
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis-title" v-html="list.name"></view>
							<view class="uni-media-list-text-bottom uni-ellipsis" v-if="list.beginPrice==0"><text class="price">最高{{list.endPrice}}万元</text></view>
							<view class="uni-media-list-text-bottom uni-ellipsis" v-else><text class="price">{{list.beginPrice}}-{{list.endPrice}}万元</text></view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{list.beginRate}}-{{list.endRate}}‰</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	// 自定义的mescroll-meituan.vue
	import MescrollUni from "@/components/mescroll-diy/mescroll-meituan.vue";
	var _self;
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				listArr: [],
				//循环图标按钮
				baseDemainSrc: "",
			}
		},
		onLoad: function() { 
			this.baseDemainSrc = this.$store.getters.baseDemain;
			_self = this;
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
				this.$dapi.getProductListApi({
					"pageNo": mescroll.num,
					"pageSize": mescroll.size
				}).then(res => {
					let data = res.data;
					console.log("产品列表:" + JSON.stringify(data));
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
			},
		
			// 查看详情页面
			getproductD: function(e) {
				// console.log("e: " + JSON.stringify(e));
				uni.navigateTo({
					url: 'financeDetail?id=' + e.id
				});
			}
		}
	}
</script>

<style>
	/* 顶部导航蓝 */
	.top-warp {
		z-index: 9990;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		/* height: 100upx; */
		background-color: white;
	}

	video {
		width: 120upx;
		height: 120upx;
	}

	.scroll-view_H {
		text-align: center;
		/* height: 100upx; */
		border-bottom: 1upx solid #ddd;
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 243upx;
		margin: 0upx 10upx;
	}

	.top-warp .scroll-view_H view {
		/* display: inline-block; */
		min-width: 180upx;
		line-height: 100upx;
		font-size: 34upx;
	}

	.top-warp .scroll-view_H .active {
		border-bottom: 6upx solid #0e6eb8;
		color: #0e6eb8;
	}

	.scroll-view-item_H {
		display: inline-block;
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
