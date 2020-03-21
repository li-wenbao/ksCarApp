<template>
	<view class="scroll-wrapper">
		<mescroll-uni @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(list,index) in listArr" :key="index">
					<view class="uni-media-list" style="width: 100%;">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis-title" v-html="list.name"></view>
							<view class="uni-ellipsis">流水号{{list.sort}}</view>
							<view v-if="list.status==0">
								交易中
							</view>
							<view v-else-if="list.status==1">
								交易完成
							</view>
							<view v-else-if="list.status==2">
								交易取消
							</view>
							<view class="uni-ellipsis">审核状态{{list.auditStatus}}</view>
							<view class="uni-ellipsis">客户状态{{list.customerStatus}}</view>
							<view class="example" style="width: 100%;">
								<uni-steps :options="list1" :active="actives" />
							</view>
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
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	var _self;
	export default {
		components: {
			MescrollUni,
			uniSteps
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				listArr: [],
				baseDemainSrc: '',
				actives: [],
				list1: [{
					value: 0,
					title: '新客户'
				}, {
					value: 1,
					title: '已回访'
				}, {
					value: 2,
					title: '已进件'
				}, {
					value: 3,
					title: '已面签'
				}, {
					value: 4,
					title: '可放款'
				}, {
					value: 5,
					title: '已放款'
				}],
				list2: []
			}
		},
		onLoad: function() {
			this.getjinduList();
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
					this.$dapi.getloanApplicApi({
						"pageNo": mescroll.num,
						"pageSize": mescroll.size
					}).then(res => {
						let data = res.data;
						// console.log("交易记录:" + JSON.stringify(data));
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
			// 进度申请
			getjinduList: function() {
				this.$dapi.getappliProgressApi({}).then(res => {
					// console.log("res: " + JSON.stringify(res));
					this.list2 = res.data.content;
					// console.log("list2: " + JSON.stringify(this.list2));
					for (let i = 0; i < this.list1.length; i++) {
						for (let j = 0; j < this.list2.length; j++) {
							if (this.list2[j].customerStatus == this.list1[i].value) {
								this.actives = this.list2[j].customerStatus
							}
						}
					}
				})
			},
		}
	}
</script>

<style>
	.uni-media-list-body {
		height: auto;
	}

	.uni-steps {
		padding: 10px 0px;
		-webkit-box-flex: 1;
		-webkit-flex-grow: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	.uni-media-list-text-top {
		font-size: 34upx;
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

	/* .uni-media-list-text-bottom {
		color: #999999;
		font-size: 26upx;
		margin-top: 10upx
	} */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}
</style>
