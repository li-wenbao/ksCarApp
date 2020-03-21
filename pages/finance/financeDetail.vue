<template>
	<!-- 文章 -->
	<view class="content" style="position: relative;">
		<view class="shenqin" @tap="shenqin">
			<text class="icon" style="font-size: 28upx;">申请</text>
		</view>
		<view class="at-title">{{content.name}}</view>
		<view class="pro-content">
			<view class="pro-list" style="height: 90upx; line-height: 90upx;">产品有效期<text style="margin-left: 26upx;">{{content.expirationDate}}</text></view>
			<view class="pro-list">产品利率<text style="margin-left: 26upx;margin-right: 10upx;color: #F0AD4E;font-size: 48upx;font-weight: 200;">{{content.beginRate}}-{{content.endRate}}</text>‰</view>
			<view class="pro-list">产品金额
				<text v-if="content.beginPrice==0" style="margin-left: 26upx;">最高<text style="color: red;font-size: 48upx;font-weight: 200;margin-left: 10upx;margin-right: 10upx;">{{content.endPrice}}</text>万元</text>
				<text v-else> <text style="margin-left: 26upx;margin-right: 20upx;color: red;font-size: 48upx;font-weight: 200;">{{content.beginPrice}}-{{content.endPrice}}</text>万元</text>
			</view>
			<view class="pro-list" style="height: 90upx; line-height: 90upx;">还款方式<text style="margin-left: 26upx;color: #0088FE;">{{content.repaymentMethod}}</text></view>
			<view class="pro-list">贷款期限<text style="margin-left: 26upx;margin-right: 20upx;color: #0E6EB8;font-size: 48upx;font-weight: 200;">{{content.beginPeriod}}-{{content.endPeriod}}</text>年</view>
			<view class="pro-list" style="height: 90upx; line-height: 90upx;" v-if="content.phone !=null">电话:{{content.phone}}</view>

			<!-- 详细信息选项卡 -->
			<view class="top-warp" style="margin-top: 80upx;">
				<view class="nav">
					<view :class="{'active':tabType==0}" @click="changeTab(0)">申请条件</view>
					<view :class="{'active':tabType==1}" @click="changeTab(1)">准备资料</view>
					<view :class="{'active':tabType==2}" @click="changeTab(2)">贷款说明</view>
					<view :class="{'active':tabType==3}" @click="changeTab(3)">答疑解惑</view>
					<view :class="{'active':tabType==4}" @click="changeTab(4)">备注</view>
				</view>
			</view>
			<view v-show="tabType==0">
				{{content.admissionRequirements}}
			</view>
			<view v-show="tabType==1">
				{{content.prepareMaterials}}
			</view>
			<view v-show="tabType==2">
				{{content.explains}}
			</view>
			<view v-show="tabType==3">
				{{content.qandA}}
			</view>
			<view v-show="tabType==4">
				{{content.remarks}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabType: 0, //菜单类型
				content: {},
				baseDemainSrc: '',
				videoUrl: "",
				photo: [],
				carBodyShow: 1,
				swiperCurrent: 0,
			}
		},
		onLoad: function(option) {
			var id = option.id;
			this.baseDemainSrc = this.$store.getters.baseDemain;
			this.getData(id);
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			// 切换菜单
			changeTab(type) {
				this.tabType = type; //切换菜单
			},
			getData(id) {
				this.$dapi.getproductDApi({
					"id": id
				}).then(res => {
					let data = res.data;
					console.log("data: " + JSON.stringify(data));
					this.content = data.content;
				})
			},
			//转义方法
			escape2Html(str) {
				var arrEntities = {
					'lt': '<',
					'gt': '>',
					'nbsp': ' ',
					'amp': '&',
					'quot': '"'
				};
				return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
					return arrEntities[t];
				}).replace('<section', '<div').replace('<img', '<img style="max-width:100%;height:auto" ');
			},
			// 申请
			shenqin(){
				uni.navigateTo({
					url: './applyFor',
				});
			}
		},
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.shenqin {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background: #0088FE;
		box-shadow: 1px 2px 4px 1px #888888;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
		position: fixed;
		bottom: 60upx;
		right: 60upx;
	}

	.at-title {
		text-align: center;
		margin-top: 26upx;
		font-size: 36upx;
	}

	.pro-content {
		width: 710upx;
		margin: 20upx;
	}

	.border-all {
		border: 1upx solid #EBEEF5;
		padding: 10upx 16upx;
	}

	.pro-list {
		border-bottom: 1upx #E8E8E8 solid;
	}

	.mag50 {
		margin-top: 50upx;
	}
	/* 选项卡设计 */
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
		width: 20%;
		line-height: 90upx;
		font-size: 28upx;
	}
	
	.top-warp .nav .active {
		border-bottom: 2upx solid #1296db;
		color: #1296db;
		font-size: 30upx;
		font-weight: 600;
	}
	
	.uni-card-content-inner {
		position: relative;
		padding: 14upx 20upx;
	}
</style>