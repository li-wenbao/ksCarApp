<template>
	<view class="content">
		<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" right-text="搜索" @click-left="showCity"
		  @click-right="search">
			<block slot="left">
				<view class="city">
					<view>{{city}}</view>
					<uni-icon type="arrowdown" color="#333333" size="22" />
				</view>
			</block>
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666" />
				<input confirm-type="search" class="input" type="text" style="padding-top: 4upx;" placeholder="输入搜索关键词" v-model="Myvalue"
				 @confirm="confirm" />
			</view>
		</uni-nav-bar>
		<sl-filter :ref="'slFilter'" :topFixed="true" :isTransNav="true" :navHeight="0" :color="titleColor" :themeColor="themeColor"
		 :menuList="menuList" @result="result"></sl-filter>
		<view class="scroll-wrapper">
			<mescroll-uni @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in listArr" :key="index">
						<view class="uni-list-cell-navigate uni-media-list" @tap="carProInfGetById(item)">
							<view class="uni-media-list-logo">
								<cover-image v-if="item.images !='' && item.images != null" :src="baseDemainSrc +item.images" mode="aspectFill"></cover-image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top uni-ellipsis-title" v-html="item.name"></view>
								<view class="uni-media-list-text-bottom uni-ellipsis">
									<view class="car-info">
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
			</mescroll-uni>
		</view>
	</view>
</template>
<script>
	// 自定义的mescroll-meituan.vue
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import MescrollUni from "@/components/mescroll-diy/mescroll-meituan.vue";
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	var _self;
	export default {
		components: {
			slFilter,
			MescrollUni,
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				listArr: [],
				Myvalue: '',
				city:'',
				baseDemainSrc: '',
				showPopupTop: false,
				themeColor: '#000000',
				titleColor: '#666666',
				searchResult: {},
				filterResult: {},
				menuList: [{
						'title': '热门车源',
						'key': 'orderBy',
						'isSort': true,
						'type': "popup",
						'direction': 'bottom',
						'reflexTitle': true,
						'defaultSelectedIndex': 0,
						'detailList': [{
								'title': '热门车源',
								'value': 'a.hot_flag DESC',
							},
							{
								'title': '最新上架',
								'value': 'a.create_date DESC',
							},
							{
								'title': '价格最低',
								'value': 'a.money ASC',
							},
							{
								'title': '价格最高',
								'value': 'a.money DESC',
							},
							{
								'title': '里程最短',
								'value': 'a.run_mile ASC',
							}
						]
					},
					{
						'title': '品牌',
						'key': 'carBaseInfo.brand.id',
						'type': "page",
						'url': "/pages/product/vehicle/vehicle",
						'isMutiple': false,
						'reflexTitle': true,
						'detailList': []
					},
					{
						'title': '车价',
						'key': 'salary',
						'type': "popup",
						'direction': 'bottom',
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '3万以下',
								'value': '0-3'
							},
							{
								'title': '3-5万',
								'value': '3-5'
							},
							{
								'title': '5-8万',
								'value': '5-8'
							},
							{
								'title': '8-10万',
								'value': '8-10'
							},
							{
								'title': '10-15万',
								'value': '10-15'
							},
							{
								'title': '15-20万',
								'value': '15-20'
							},
							{
								'title': '20-30万',
								'value': '20-30'
							},
							{
								'title': '30-40万',
								'value': '30-40'
							},
							{
								'title': '40万以上',
								'value': '41-100000'
							}
						]
					}
				]
			}
		},
		//前一页的onShow方法，把setData的数据赋值到当前页面绑定的变量上
		onLoad() {
			_self = this;
			this.$eventHub.$on('fire', function(e) {
				console.log('fire - ' + JSON.stringify(e));
				let tempDetailList = {
					'title': e.name,
					'value': e.id
				};
				_self.pageTapBack(tempDetailList);
			});
			// this.getCarProduct();
			// this.mescroll = mescroll;
			// mescroll.resetUpScroll()
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
			search() {
				// console.log('filter_result:' + JSON.stringify(this.Myvalue));
				// this.searchResult = this.Myvalue;
				// console.log('this.searchResult:' + JSON.stringify(this.searchResult));
				// this.getCarProduct();
				// this.mescroll = mescroll;
				this.mescroll.resetUpScroll()
			},
			result(val) {
				let salarys = val.salary
				let arr = salarys.split('-');
				// console.log('salarys:' + JSON.stringify(arr[0]));
				if (arr.length == 2) {
					val.beginMoney = arr[0];
					val.endMoney = arr[1];
				} else {
					val.beginMoney = "";
					val.endMoney = "";
				}
				// console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = val;
				// console.log('this.filterResult:' + JSON.stringify(this.filterResult));
				// this.getCarProduct();
				// this.mescroll = mescroll;
				this.mescroll.resetUpScroll()
			},
			// 重置所有选项，包括默认选项，并更新result
			resetAllSelect() {
				this.$refs.slFilter.resetAllSelect(function(result) {
					// console.log('重置之后回调的result:' + JSON.stringify(result))
				})
			},
			//更新选中的值
			pageTapBack(obj) {
				let selectedIndex = this.$refs.slFilter.getSelectedIndex();
				if (selectedIndex != "" || selectedIndex == "0") {
					this.$refs.slFilter.pageTap(obj, this.menuList[selectedIndex].key);
				}
			},
			// 重置选项为设置的默认值，并更新result
			resetSelectToDefault() {
				this.$refs.slFilter.resetSelectToDefault(function(result) {
					// console.log('重置为默认值之后回调的result:' + JSON.stringify(result))
				})
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
				// console.log("this.filterResult: " + JSON.stringify(this.filterResult));
				let pageNo = mescroll.num;
				this.filterResult.pageNo = pageNo;
				let pageSize = mescroll.size;
				this.filterResult.pageSize = pageSize;
				if (this.Myvalue) {
					this.filterResult.name= this.Myvalue; 
				}
				// console.log("this.filterResult: " + JSON.stringify(this.filterResult));
				this.$dapi.getCarProductListApi(this.filterResult).then(res => {
					let data = res.data;
					// console.log("我的车辆+++++:" + JSON.stringify(data));
					if (data.count == 0) {
						if (mescroll.num == 1) _self.listArr = []; //如果是第一页需手动制空列表
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
						// console.log("我的车辆:" + JSON.stringify(_self.listArr));
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
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
		white-space: nowrap;
	}

	.input-view {
		width: 98%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}

	page,
	.content {
		background: $page-color-base;
	}

	.uni-list-cell {
		width: 100%;
	}

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
