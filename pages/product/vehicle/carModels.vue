<template>
	<view>
		<view class="carItem" v-for="(item, index) in treeChildDataList" :key="index">
			<view class="itemCar" @tap="getName(item)">{{item.name}}</view>
		</view>
	</view>
</template>
<style>
	.carItem {
		background: #FFFFFF;
		line-height: 80upx;
		border-bottom: 1upx #e8e8e8 solid;
	}
	.itemCar {
		padding: 20upx 10upx;
	}
</style>
<script>
	export default {
		data() {
			return {
				mypId: '',
				treeChildDataList: []
			}
		},
		onLoad(option) {
			// console.log("option: " + JSON.stringify(option));
			this.mypId = option.pId;
			// console.log("this.mypId: " + JSON.stringify(this.mypId));
			this.toGetCarModels()
		},

		methods: {
			toGetCarModels: function() {
				let _self;
				_self = this;
				this.$dapi.treeChildDataApi({
					"pId": _self.mypId
				}).then(res => {
					this.carVehicleList = res.data;
					this.treeChildDataList = res.data;
				})
			},
			// 车类车型
			getName(e) {
				this.$eventHub.$emit('fire', e);
				uni.navigateBack({
				});
			}
		}
	}
</script>

<style>

</style>
