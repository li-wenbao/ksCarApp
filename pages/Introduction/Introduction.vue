<template>
	<!-- 公司简介 -->
	<view class="page-body">
		<view class="content" style="margin-top: 4upx;">
			<view class="rich-text" v-html="content.introduction"></view>
		</view>
	</view>
</template>

<script>
	let Mheight;
	let hei = 0;
	let Mhei = 0;
	export default {
		data() {
			return {
				content: "",
			}
		},
		onLoad: function() {
			//this.$checkHasLogin();
			this.getData();
		},
		methods: {
			getData() {
				this.$dapi.geteaSetInfoApi({}).then(res => {
					let data = res.data;
					data.content.introduction = data.content.introduction.replace(new RegExp(/src=\"\//g), "src=\"/" + this.serverDomain +
						"/")
					this.content = data.content;
				})
			},
		}
	}
</script>

<style>
	image {
		width: 100%;
		margin: 0upx;

	}

	.content {
		background: #FFFFFF;
		margin: 0px;
		/* padding: 40upx 30upx 30upx; */
		margin-top: -20upx;
	}

	.mypage {
		background: #FFFFFF;
		margin: 0px;
	}

	.duoyanghua {
		text-align: left;
		padding: 0 30upx;
	}

	.Z-title {
		font-size: 38upx;
		color: #282828;
	}

	.S-title {
		font-size: 30upx;
		color: #666666;
	}

	.icon-style {
		color: #66b17c;
		font-size: 40upx;
		padding-right: 10upx;
	}
</style>
