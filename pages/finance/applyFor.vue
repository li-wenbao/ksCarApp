<template>
	<!-- 添加订单 -->
	<view class="uni-padding-wrap uni-common-mt" style="padding-top: 23upx;">

		<form @submit="formSubmit" @reset="formReset">
			<!-- 			<input class="uni-input" name="productId" v-model="listArr.productId" type="text" style='display: none' />
			<input class="uni-input" name="productName" v-model="listArr.productName" type="text" style='display: none' /> -->
			<view id="mylist">
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">姓名</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.name" type="number" placeholder="请添加姓名" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">身份证号</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.idCard" type="number" placeholder="请添加身份证号" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">性别</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.sex" type="text" placeholder="请添加性别" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">年龄</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.age" type="number" placeholder="请添加年龄" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">电话</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.phone" type="number" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">公司</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.company" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">职务</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.duties" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">地址</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.address" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">开户行</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.bank" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">银行卡号</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.bankCard" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">真实姓名</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.nickName" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">积分</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.integral" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">用户位置</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.userPosition" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">座机号</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.tel" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">购买次数</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.buyNum" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">购买金额</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.buyMoney" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">证件签发机关</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.unions" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">行业</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.trade" type="text" placeholder="请添加电话" />
					</view>
				</view>
				<view class="uni-flex uni-row bankbg">
					<view class="flex-item title">职业</view>
					<view class="flex-item view-right">
						<input class="uni-input" name="money" v-model="listArr.profession" type="text" placeholder="请添加电话" />
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column uni-btn-v">
				<button formType="submit" class="button-sp-area">确定</button>
			</view>
			<!-- <button class="button-sp-area" @tap="sumentData()">确定</button> -->
		</form>
	</view>
</template>
<script>
	let _self;
	let data = {};
	let myDate;
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				listArr: {},
				date: currentDate,
			}
		},
		onLoad: function(option) {
			// id = option.id;
			// name = option.name;
			this.$checkHasLogin();
			this.listArr = option;
			this.listArr.phone = this.uerInfo.phone;
			this.listArr.reserveTime = this.date;
			_self = this;
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
				this.listArr.buyTime = this.date;
				// myDate = this.date;
			},

			formSubmit: function(e) {
				////console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				data = e.detail.value;
				////console.log("++++++++++++++++" + minMoney);
				if (!data.money || data.money == "") {
					uni.showToast({
						icon: 'none',
						title: '请填写预约金额'
					});
					return;
				} else if (data.money < Number(minMoney)) {
					uni.showToast({
						icon: 'none',
						title: '请填写大于起价金额的金额'
					});
					return;
				};
				if (!data.phone || data.phone == "") {
					uni.showToast({
						icon: 'none',
						title: '请填写预约电话'
					});
					return;
				}

				this.$request.post("/reserves/eaReserves/add", {
						data: data,
					})
					.then(res => {
						////console.log("信息：" + JSON.stringify(res));
						let data = res.data;
						if (data.code == 100) {
							uni.showModal({
								title: '提示',
								content: '预约成功！可去预约列表查看信息。',
								cancelText: '继续预约',
								success: function(res) {
									if (res.confirm) {
										//console.log('用户点击确定');
										uni.redirectTo({
											url: '/pages/index/Myappointment'
										})
									} else if (res.cancel) {
										uni.navigateBack();
										//console.log('用户点击取消');
									}
								}
							});
						} else {
							uni.showToast({
								title: data.message
							})
						}
					})
					.catch(error => {
						//console.log('error:', error);
						this.$RequestErorr(error);
					});
			},
			formReset: function(e) {
				//console.log('清空数据')
				this.chosen = ''
			},
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}

	.bankbg {
		background: #FFFFFF;
		border-bottom: 1upx solid #E8E8E8;
	}

	.uni-padding-wrap {
		width: 100%;
	}

	/* .bankbg :nth-child(2n-1){
		background: #ffcc00;
	} */
	.title {
		width: 300upx;
		float: left;
		font-size: 30upx;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
		background: #FFFFFF;
	}

	.view-right {
		width: 550upx;
		float: right;
		text-align: left;
		background: #0079FF;
	}

	.uni-input {
		font-size: 30upx;
		height: 88upx;
		line-height: 88upx;
	}

	.button-sp-area {
		/* margin-top: 120upx; */
		background: #0079FF;
		color: #FFFFFF;
	}
</style>
