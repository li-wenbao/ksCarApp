<template>
	<view class="example">
		<!-- <view class="example-title">基本用法</view>
		<uni-steps :options="list1" :active="active" /> -->
		<!-- <view class="example-title">纵向排列</view> -->
		<uni-steps :options="list2" :active="active" direction="column" />
		<button type="primary" @click="change">改变状态</button>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				active: 1,
				list2: [],			
			}
		},
		onLoad() {
			this.getjinduList();
			this.getDictList()
		},
		methods: {
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			},
			// 进度申请
			getjinduList: function() {
				this.$dapi.getappliProgressApi({
				}).then(res => {
					// console.log("res: " + JSON.stringify(res));
					this.list2 = res.data.content;
				})
			},
			// 字典
			getDictList: function() {
				this.$dapi.getDictListApi({
					"type":"customerStatus"
				}).then(res => {
					// console.log("字典的数据: " + JSON.stringify(res.data));
					this.list2 = res.data.content;
					// this.list2 = res.data.content;
				})
			},
		}
	}
</script>

<style>
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

	button {
		margin: 30upx;
	}
</style>