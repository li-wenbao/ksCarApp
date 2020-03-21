<template>
	<!-- 新闻 -->
	<view class="scroll-wrapper">
		<view class="top-warp">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view class="scroll-view-item_H" v-for="(list,index) in columnList" :key="index" :class="{active:tabType==index}"
				 @click="changeTab(index)">{{list.name}}
				</view>
			</scroll-view>
		</view>
		<mescroll-uni top="100" bottom="50" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(list,index) in listArr" :key="index">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" @tap="findtopArtDetail(list)">
						<view class="uni-media-list-logo" v-if="!list.customContentView||list.customContentView == 0">
							<image v-if="list.image !=='' && list.image !== null" :src="baseDemainSrc+list.image"></image>
							<image v-else src="../../static/img/shipin.png"></image>
						</view>
						<view v-else class="uni-media-list-logo" >
							<image src="/static/img/shipin.png"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis-title" v-html="list.title"></view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{list.category.name}}</view>
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
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var _self;
	export default {
		components: {
			MescrollUni
		},
		computed: mapState(['hasLogin', 'uerInfo']),
		data() {
			return {
				mescroll: null, //mescroll实例对象
				listArr: [],
				//循环图标按钮
				columnList: [],
				baseDemainSrc: "",
				categoryId: "",
				tabType: "", // 菜单
				scrollLeft: 0,
			}
		},
		onLoad: function() {
			this.baseDemainSrc = this.$store.getters.baseDemain;
			this.column();
			_self = this;
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
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
			scroll: function(e) {
				//console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
				this.scrollLeft = e.detail.scrollLeft
			},
			//切换资料
			column() {
				this.$dapi.getmainNavApi({
				}).then(res => {
					let data = res.data;
					////console.log("循环图标按钮:" + JSON.stringify(data));
					let content = data.content;
					this.columnList = content;
					this.categoryId = this.columnList[0].id;
					this.mescroll && this.mescroll.resetUpScroll()
				})
				.catch(error => {
					this.$RequestErorr(error);
				});
			},
			// 切换菜单
			changeTab(type) {
				//console.log(type);
				if (this.tabType !== type) {
					this.tabType = type
					this.listArr = [] // 在这里手动置空列表,可显示加载中的请求进度
					// this.isStamp = type;
					this.categoryId = this.columnList[type].id;
					this.mescroll.resetUpScroll() // 刷新列表数据
					// _self.scroll() // 刷新列表数据
				}
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 下拉刷新的回调
			downCallback(mescroll) {
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				// var selfData = this;
				if (_self.columnList.length > 0) {					
					this.$dapi.getZiXunApi({
						"pageNo": mescroll.num,
						"pageSize": mescroll.size,
						"category.id": _self.categoryId
					}).then(res => {
						let data = res.data;
						console.log("新闻:" + JSON.stringify(data));
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
				}
			},
			//详情
			findtopArtDetail(e) {
				uni.navigateTo({
					url: './../Article/ArticleDetail?id=' + e.id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
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
