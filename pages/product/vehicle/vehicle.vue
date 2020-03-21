<template>
	<view>
		<popup-layer ref="popupRef" :direction="'left'">
			<view class="carItem">
				<view class="itemCar" @tap="itemGetLimited">不限</view>
			</view>
			<view class="carItem" v-for="(item, index) in treeChildDataList" :key="index">
				<view class="itemCar" @tap="itemClick(item)">{{item.name}}</view>
			</view>
		</popup-layer>
		<scroll-view scroll-y="true" class="popup-layer">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-media-list" @tap="getLimited">
						<view class="uni-media-list-body">
							<text>不限</text>
						</view>
					</view>
				</view>
			</view>
			<view v-for="(item, index) in wordArr" :key="index">
				<view class="carName">{{item.name}}</view>
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(itemCar, indexCar) in item.vehicleArr" :key="indexCar">
						<view class="uni-media-list" @tap="getCarModel(itemCar)">
							<view class="uni-media-list-logo">
								<view class="img-box">
									<cover-image :src="itemCar.icon"></cover-image>
								</view>
							</view>
							<view class="uni-media-list-body">
								<text v-html="itemCar.name"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<style>
	.popup-layer {
		position: absolute;
		background: rgba(0, 0, 0, .3);
		height: calc(100%);
		width: 100%;
		left: 0px;
		overflow: hidden;
	}

	.carName {
		padding: 6upx 30upx;
	}

	.uni-media-list {
		padding: 2upx 8upx;
	}

	.uni-media-list-body {
		height: 84upx;
		line-height: 84upx;
	}

	.uni-media-list-logo {
		height: 84upx;
		width: 84upx;
		/* 行高等于高度 */
		margin-right: 10upx;
		text-align: center;
	}

	.img-box {
		height: 84upx;
		width: 84upx;
		height: fit-content;
	}

	.uni-media-list-logo,
	.img-box cover-image {
		vertical-align: middle;
		padding-top: 12upx;
	}

	.carItem {
		background: #FFFFFF;
		width: 475upx;
		line-height: 80upx;
		border-bottom: 1upx #e8e8e8 solid;
	}

	.itemCar {
		padding: 20upx 10upx;
	}
</style>
<script>
	import popupLayer from '@/components/sl-filter/popup-layer.vue';
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				carIcon: "/static/car/aodi.jpg",
				treeChildDataList: [],
				result:{},
				// boolShow: false,
				wordArr: [{
						name: "A",
						"vehicleArr": []
					},
					{
						name: "B",
						"vehicleArr": []
					},
					{
						name: "C",
						"vehicleArr": []
					},
					{
						name: "D",
						"vehicleArr": []
					},
					{
						name: "E",
						"vehicleArr": []
					},
					{
						name: "F",
						"vehicleArr": []
					},
					{
						name: "G",
						"vehicleArr": []
					},
					{
						name: "H",
						"vehicleArr": []
					},
					{
						name: "I",
						"vehicleArr": []
					},
					{
						name: "J",
						"vehicleArr": []
					},
					{
						name: "K",
						"vehicleArr": []
					},
					{
						name: "L",
						"vehicleArr": []
					},
					{
						name: "M",
						"vehicleArr": []
					},
					{
						name: "N",
						"vehicleArr": []
					},
					{
						name: "O",
						"vehicleArr": []
					},
					{
						name: "P",
						"vehicleArr": []
					},
					{
						name: "Q",
						"vehicleArr": []
					},
					{
						name: "R",
						"vehicleArr": []
					},
					{
						name: "S",
						"vehicleArr": []
					},
					{
						name: "T",
						"vehicleArr": []
					},
					{
						name: "U",
						"vehicleArr": []
					},
					{
						name: "V",
						"vehicleArr": []
					},
					{
						name: "W",
						"vehicleArr": []
					},
					{
						name: "X",
						"vehicleArr": []
					},
					{
						name: "Y",
						"vehicleArr": []
					},
					{
						name: "Z",
						"vehicleArr": []
					}
				],
			}
		},
		onLoad() {
			this.toGetVehicle()
		},
		methods: {
			toGetVehicle: function() {
				this.$dapi.getVehicleApi({}).then(res => {
					this.carVehicleList = res.data;
					for (let i = 0; i < this.wordArr.length; i++) {
						for (let j = 0; j < this.carVehicleList.length; j++) {
							if (this.wordArr[i].name == this.carVehicleList[j].initial) {
								this.carVehicleList[j].icon = this.$store.getters.baseDemain+this.carVehicleList[j].icon;
								this.wordArr[i].vehicleArr.push(this.carVehicleList[j]);
							}
						}
					}
				})
			},
			// 车类车型
			getCarModel(e) {
				this.result = e;
				this.$dapi.treeChildDataApi({
					"pId": e.id
				}).then(res => {
					this.treeChildDataList = res.data;
					if (this.treeChildDataList.length == 0) {
						this.itemClick(e);
					} else {
						this.show();
					}
				})
			},
			// 车类车型
			itemClick(e) {
				this.$eventHub.$emit('fire', e);
				uni.navigateBack({});
			},
			show() {
				this.$refs.popupRef.show(); // 或者 boolShow = rue
			},
			close() {
				this.$refs.popupRef.close(); // 或者 boolShow = false
			},
			// 不限 品牌
			getLimited(){
				this.result={"id":"","name":"不限"};
				this.itemClick(this.result)
			},
			// 不限 车系
			itemGetLimited(){
				this.itemClick(this.result)
			}
		}
	}
</script>
