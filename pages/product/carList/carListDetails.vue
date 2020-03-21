<template>
	<!-- 详情页面 -->
	<view class="container">
		<!-- 弹出层 -->
		<popup-layer ref="popupRef">
			<view class="row_magin textstyle">
				<a :href="paths" style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{paths}}</a>
				<input ref="paths" @tap="copys" value="复制链接地址分享">
			</view>
		</popup-layer>
		<!-- 询价弹出层 -->
		<popup-layer ref="phoneRef" :direction="'top'">
			<view class="row_magin textstyle">
				<view class="item_text_center">商家报价<text class="bjPrice">{{carDetArr.money}}万</text></view>
				<view class="row box-bottom-line">
					<view class="col-25">手机号</view>
					<view class="col-75">
						<input ref="custphone" type="number" class="input" maxlength="11" focus="true" v-model="custphone" />
					</view>
				</view>
				<button @tap="xjPhone" class="xjPhone">询底价</button>
			</view>
		</popup-layer>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="swiper" @change="swiperChange">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<cover-image  v-if="item.photo" :src="baseDemainSrc + item.photo" mode="aspectFill"></cover-image>
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
				<block v-if="carDetArr.belongsAddr !=null&&carDetArr.belongsAddr !=''">
					<text class="address">{{carDetArr.belongsAddr}}</text>
					<text class="sline">|</text>
				</block>
				<text class="address">{{carDetArr.runMile}}公里</text>
				<block v-if="carDetArr.status !=null&&carDetArr.status !=''">
					<text class="sline">|</text>
					<text v-if="carDetArr.status ==0">
						在售
					</text>
					<text v-else>
						已售
					</text>
				</block>
			</view>
			<view class="price-box">
				<text class="price">{{carDetArr.money}}万</text>
			</view>
		</view>
		<view class="c-list">
			<view class="c-row b-b">
				<view class="con">
					<text class="selected-text">
						{{carDetArr.locAddr}}
					</text>
				</view>
				<text class="icon">&#xe640;</text>
			</view>
			<view class="c-row b-b" v-if="agent.name !=null">
				<text class="tit">{{agent.name}}</text>
				<view class="con">
					<text class="selected-text">
						{{agent.mobile}}
					</text>
				</view>
				<text class="icon">&#xe738;</text>
			</view>
		</view>
		<view class="c-list">
			<view class="c-row b-b yl-bg" @tap="calculator">
				<text style="text-align: center;">金融方案</text>
			</view>
		</view>
		<!-- 详细信息选项卡 -->
		<view class="top-warp" style="margin-top: 80upx;">
			<view class="nav">
				<view :class="{'active':tabType==0}" @click="changeTab(0)">基本信息</view>
				<view :class="{'active':tabType==1}" @click="changeTab(1)">详情配置</view>
				<view :class="{'active':tabType==2}" @click="changeTab(2)">车辆实拍</view>
			</view>
		</view>
		<view v-show="tabType==0">
			<view class="min-title">
				<text>基本信息</text>
			</view>
			<view class="row_magin swline">
				<view class="col-2">上牌日期</view>
				<view class="col-3">
					<text class="item_text_left smtext" style="font-size: 20upx;">
						{{carDetArr.cardDate}}
					</text>
				</view>
				<view class="col-2">行驶里程</view>
				<view class="col-3">
					<text class="item_text_left smtext">
						{{carDetArr.runMile}}公里
					</text>
				</view>
			</view>
			<view class="row_magin swline">
				<view class="col-2">颜色</view>
				<view class="col-3">
					<text class="item_text_left smtext">
						{{carInfoList.color}}
					</text>
				</view>
				<view class="col-2">排放标准</view>
				<view class="col-3">
					<text class="item_text_left smtext">
						{{carInfoList.emiStandards}}
					</text>
				</view>
			</view>
			<view class="row_magin swline">
				<view class="col-2">变速箱</view>
				<view class="col-3">
					<text class="item_text_left smtext">
						{{carInfoList.gearbox}}
					</text>
				</view>
				<view class="col-2">排量</view>
				<view class="col-3">
					<text class="item_text_left smtext">
						{{carInfoList.displacement}}<text> L</text>
					</text>
				</view>
			</view>
			<view class="min-title">
				<text>购置亮点</text>
			</view>
			<view class="uni-grid-9 uni-common-mt" style="background: none;border: none;margin: 0 20upx;">
				<view class="uni-grid-9-item" show-border="false" v-for="(item,index) in carAssoLightList" :key="index">
					<cover-image class="car-img" :src="baseDemainSrc + item.light.icon"></cover-image>
					<text class="uni-grid-9-text icon-text-head-top">{{item.light.name}}</text>
				</view>
			</view>
		</view>
		<view v-show="tabType==1">
			<view class="min-title">
				<text>详情配置</text>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse" v-for="(item, index) in cargetDictList" :key="index">
					<view class="uni-list-cell-navigate uni-navigate-bottom" @tap="carBody(item.value)">
						{{item.label}}
					</view>
					<view class="bg-bg" v-show="item.value == carBodyShow">
						<view class="row swline" v-for="(itemDet,indexDet) in carAssoDetailsList" :key="indexDet" v-if="itemDet.type==item.value">
							<view class="col-6 smtext">{{itemDet.name}}</view>
							<view class="col-4 smtext">
								{{itemDet.value}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="tabType==2">
			<view class="min-title">
				<text>车辆实拍</text>
			</view>
			<view class="img-box" v-for="(item,index) in imgList" :key="index">
				<view>
					<text>{{item.name}}</text>
					<cover-image :src="baseDemainSrc + item.photo" mode="aspectFill"></cover-image>
				</view>
			</view>
		</view>
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="icon" style="font-size: 42upx;">&#xe647;</text>
				<text class="tMaginTop">首页</text>
			</navigator>
			<view class="p-b-btn" v-show="!shouCshow" @tap="TjshouC">
				<view class="icon" style="font-size: 42upx;">&#xe631;</view>
				<text class="tMaginTop">收藏</text>
			</view>
			<view class="p-b-btn" v-show="shouCshow" @tap="QxshouC">
				<view class="icon" style="font-size: 42upx;">&#xe60d;</view>
				<text class="tMaginTop">收藏</text>
			</view>
			<view class="p-b-btn" @tap="myshareInfo">
				<view class="icon" style="font-size: 42upx;">&#xe630;</view>
				<text class="tMaginTop" v-clipboard:copy="paths" v-clipboard:success="(type) => onCopyResult('success')"
				 v-clipboard:error="(type) => onCopyResult('error')">分享
				</text>
			</view>
			<view class="p-b-btn">
				<a v-if="agent.mobile==undefined" :href="'tel:' +'0871-64102371'" style="text-decoration:none;color: #666666;display: block;">
					<view class="icon" style="text-align: center;margin-bottom: -14upx;font-size: 42upx;">&#xe738;</view>
					<text class="tMaginTop">电话</text>
				</a>
				<a v-else :href="'tel:' +agent.mobile" style="text-decoration:none;color: #666666;display: block;">
					<view class="icon" style="text-align: center;margin-bottom: -14upx;font-size: 42upx;">&#xe738;</view>
					<text class="tMaginTop">电话</text>
				</a>
			</view>
			<view class="action-btn-group" @tap="xunjia">
				<!-- <a :href="'tel:' + mobile" style="text-decoration:none;color: #666666;"> -->
				<button type="primary" class="action-btn no-border add-cart-btn">询最低阶</button>
				<!-- </a> -->
			</view>
		</view>
	</view>
</template>

<script>
	import popupLayer from '@/components/sl-filter/popup-layer.vue';
	import utils from '@/common/utils.js';
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			popupLayer
		},
		// computed: mapState(['hasLogin', 'uerInfo']),
		data() {
			return {
				tabType: 0, //菜单类型
				carDetArr: {},
				carId: '',
				agent: {},
				paths: '',
				carBodyShow: 1,
				baseDemainSrc: '',
				swiperCurrent: 0,
				carAssoDetailsList: [],
				carAssoLightList: [],
				cargetDictList: [],
				current: 0,
				shareObj: '',
				imgList: [],
				custphone: '',
				shouCshow: false,
				carInfoList: [],
			};
		},
		async onLoad(options) {
			this.custphone = this.$store.getters.userInfo.phone;
			
			
			this.carId = options.productId;
			this.agentId = options.agentId;
			console.log("代理人: " + JSON.stringify(options));
			this.baseDemainSrc = this.$store.getters.baseDemain;
			
		
			// #ifdef H5 
				utils.checkWxLogin(this.$store.state.wxAppId, this.$store.state.wxInfoByCode);
			// #endif
			this.getDictList();
			this.getCarProDet();
			this.getcheckCollect();
	
			if (this.agentId != '' && this.agentId != null) {
				let agent = uni.getStorageSync("agentInfo");	
				if (agent && agent.id) {
					this.paths = this.$store.getters.vehicleShareUrl + "?productId="+this.carId+"&agentId="+agent.id
				} else {
					this.getAgentInfo()
				}
			}else{
				this.paths = this.$store.getters.vehicleShareUrl + "?productId="+this.carId
			}
			console.log(this.paths);

		},
		methods: {
			// 车身配置
			carBody(e) {
				this.carBodyShow = e;
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},

			// 切换菜单
			changeTab(type) {
				// if (this.tabType !== type) {
				// 	// var curTab = this.getTabData(this.tabType); //当前tab
				// 	// var newTab = this.getTabData(type); //准备切换过去的tab
				// 	this.tabType = type; //切换菜单
				// }
				this.tabType = type; //切换菜单
			},
			// 获取菜单对应的数据
			getTabData(tabType) {
				if (tabType == 0) {
					// asgfasjk
				} else if (tabType == 1) {
					// this.getshoucang();
				} else if (tabType == 2) {
					// this.getshoucang();
				}
			},
			// 车辆详情数据请求
			getCarProDet: function() {
				this.$dapi.getCarProListDetApi({
					"id": this.carId
				}).then(res => {
					// uni.removeStorageSync('hptInfo');
					let d = uni.getStorageSync('hptInfo');
					// 获取的数据gg
					let gg = res.data.content;
					// console.log("获取的gg: " + JSON.stringify(gg));
					// console.log("存储了数据d了没: " + JSON.stringify(d));
					// let gId = 1;
					if (!d) {
						d = [];
						// console.log("没存储返回数据: " + JSON.stringify(d));
					} else {
						//存储了就返回
						let insertFlag = true;
						for (let i = 0; i < d.length; i++) {
							if (gg.id == d[i].id) {
								insertFlag = false;
							}
						}
						if (insertFlag) {
							// console.log("没存储返回数据: " + JSON.stringify(gg));
							// 获取时间顺便格式化
							let date = new Date;
							gg.viewTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() +
								':' + date.getMinutes() + ':' + date.getSeconds();
							d.push(gg);
						}
					}
					uni.setStorageSync("hptInfo", d);
					// let dd = uni.getStorageSync('hptInfo');
					// console.log("cunchu+++++++++++: " + dd.length);
					this.carDetArr = res.data.content;
					// this.mobile = res.data.content.agent.mobile;
					this.getCarInfoList();
					this.imgList = res.data.content.carAssoPhotoList;
				})
			},

			// 车辆详情数据请求
			getCarInfoList: function() {
				// console.log("this.carDetArr: " + JSON.stringify(this.carDetArr));
				this.$dapi.getCarInfoListApi({
					"id": this.carDetArr.carBaseInfo.id
				}).then(res => {
					this.carInfoList = res.data.content;
					this.carAssoDetailsList = res.data.content.carAssoDetailsList;
					this.carAssoLightList = res.data.content.carAssoLightList;
				})
			},

			// 车辆详情数据请求
			getDictList: function() {
				this.$dapi.getDictListApi({
					"type": "car_configuration"
				}).then(res => {
					this.cargetDictList = res.data.content;
				})
			},
			// 询价验证登录 
			xunjia() {
				this.phoneshow();
			},
			// 询价获取或输入用户电话号码
			xjPhone() {
				if (!this.$store.getters.hasLogin) {
					let wxInfo = uni.getStorageSync("wxUserInfo");
					if (wxInfo && wxInfo.openId) {
						this.wxlogin(wxInfo.openId);
					} else {
						uni.navigateTo({
							url: "../../public/login"
						});
					}
				} else {
					let cphone = this.$store.getters.userInfo.phone;
					// console.log("++++++++++++++++++++++++cphone:" + JSON.stringify(cphone));
					this.$dapi.getsaveSyncApi({
						"car.id": this.carId,
						"agent.id": 1,
						"phone": this.$refs.custphone.value
					}).then(res => {
						if (res.data.code == 100) {
							// console.log("res: " + JSON.stringify(res));
							uni.showModal({
								title: '提示',
								content: '您的电话已提交！请等待工作人员联系。',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					})
				}
			},
			// 分享
			myshareInfo() {
				// this.show();
				// uni.showModal({
				// 	title: '请复制链接去分享',
				// 	content: this.paths,
				// 	confirmText: '复制',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 			uni.setClipboardData({
				// 				data: this.paths
				// 			});
				// 		} else if (res.cancel) {
				// 			// console.log('用户点击取消');
				// 		}
				// 	}
				// });
			},

			onCopyResult(type) {
				if (type === 'success') {
					// this.$msg('复制成功')
					console.log("type: " + JSON.stringify(type));
				} else {
					// this.$msg('复制失败')
					console.log("type: " + JSON.stringify(type));
				}
			},
			// 收藏
			// 检查是否收藏
			getcheckCollect() {
				if (!this.$store.getters.hasLogin) {
					this.shouCshow = false;
				} else {
					this.$dapi.getcheckCollectApi({
						"car.id": this.carId
					}).then(res => {
						if (res.data.code == 100) {
							this.shouCshow = true;
						}
					})
				}
			},
			// 判断参数
			getAgentInfo() {
				this.$dapi.getAgentInfoApi({
					"agentId": this.agentId
				}).then(res => {
					// console.log("res: " + JSON.stringify(res));
					this.agent = res.data.content;
					uni.setStorageSync("agentInfo", this.agent);
					this.paths = this.$store.getters.vehicleShareUrl + "?productId="+this.carId+"&agentId="+this.agent.id;
					// console.log("没有的话我可以现在获取呀:" + this.agent);
				})
			},
			// 添加收藏
			TjshouC() {
				if (!this.$store.getters.hasLogin) {
					uni.navigateTo({
						url: "../../public/login"
					});
				} else {
					this.$dapi.getTjshoucangApi({
						"customer.id": this.$store.getters.userInfo.id,
						"car.id": this.carId
					}).then(res => {
						// console.log("添加收藏动作: " + JSON.stringify(res));
						this.shouCshow = true
					})
				}
			},

			// 取消收藏
			QxshouC() {
				if (!this.$store.getters.hasLogin) {
					// console.log("this.$store.getters.hasLogin: " + JSON.stringify(this.$store.getters.hasLogin));
					uni.navigateTo({
						url: "../../public/login"
					});
				} else {
					this.$dapi.getQxshoucangApi({
						"car.id": this.carId
					}).then(res => {
						// console.log("res: " + JSON.stringify(res));
						this.shouCshow = false
					})
				}
			},
			shareInfo() {
				// 执行复制命令
				let aaa = document.execCommand("copy");
				// console.log("aaa: " + JSON.stringify(aaa));
			},
			// show() {
			// 	this.$refs.popupRef.show(); // 或者 boolShow = rue
			// },
			// close() {
			// 	this.$refs.popupRef.close(); // 或者 boolShow = false
			// },
			// 电话
			phoneshow() {
				this.$refs.phoneRef.show(); // 或者 boolShow = rue
			},
			phoneclose() {
				this.$refs.phoneRef.close(); // 或者 boolShow = rue
			},

			//计算器
			calculator() {
				uni.navigateTo({
					url: 'calculator?id=' + this.carId,
				});
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.textstyle {
		/* width:750upx; */
		padding: 10upx;
		word-break: keep-all;
		word-wrap: break-word; // 只对英文起作用，以单词作为换行依据。
		white-space: pre-wrap; //只对中文起作用，强制换行。
		text-decoration: none;
	}

	.tMaginTop {
		margin-top: -14upx;
	}

	.popup-layer {
		position: fixed;
		background: rgba(0, 0, 0, .3);
		height: calc(100%);
		width: 100%;
		left: 0px;
		bottom: 140upx;
		overflow: hidden;
	}

	.bg-bg {
		background: #e8e8e8;
		width: 100%
	}

	.yl-bg {
		background: #ffac30;
		text-align: center;
		color: #fff;
		width: 100%
	}

	.xjPhone {
		background: #007AFF;
		width: 710upx;
		margin: 20upx;
		color: #FFFFFF;
	}

	.bjPrice {
		color: #FF0000;
		margin-left: 23upx
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

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
			border-bottom: 1upx #e8e8e8 solid
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}
	}

	.min-title {
		text-align: center;
		font-size: 34upx;
	}

	.img-box {
		width: 750upx
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 130upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			/* background: linear-gradient(to right, #0aa9fc, #194aff, #37dcff); */
			background: linear-gradient(to right, #37dcff, #194aff, #194aff, #0aa9fc);
			/* background: linear-gradient(to right, #194aff,#0aa9fc ,#37dcff); */
			margin-left: 20upx;
			margin-right: 20upx;
			position: relative;

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 240upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
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
		height: 90upx;
		margin-bottom: 20upx;
		background-color: white;
	}

	.top-warp .tip {
		font-size: 28upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
	}

	.top-warp .nav {
		text-align: center;
		height: 90upx;
		border-bottom: 1upx solid #ddd;
	}

	.top-warp .nav view {
		display: inline-block;
		width: 33.33%;
		line-height: 90upx;
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
</style>
