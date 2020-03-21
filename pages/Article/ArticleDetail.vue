<template>
	<!-- 文章 -->
	<view class="page">
		<view class="text-title" v-html='content.title'></view>
		<view class="article-meta">
			<text class="article-author" style="color: #131313;">{{content.name}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{content.createDate}}</text>
		</view>
		<view v-show="showM">
			<view class="banners" v-if="content.customContentView ==0&&content.customContentView !=1">
				<image :src="serverImgDomain + content.image" style="width: 100%;"></image>
			</view>
			<view v-else>
				<video id="myVideo" :src="videoUrl" x5-video-player-type="h5" x5-video-orientation="landscape|portrait" controls
				 :poster="serverImgDomain + content.image"></video>
			</view>
		</view>
		<view class="article-content">
			<text class="rich-text" v-html='content.articleData.content'></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: {},
				serverImgDomain: '',
				videoUrl: "",
				showNM: true,
				showM: false
			}
		},
		onLoad: function(option) {
			var id = option.id;
			this.serverImgDomain = this.serverDomain;
			this.getData(id);
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			getData(id) {
				this.$dapi.gettArticleApi({
					"articleId":id
				}).then(res => {
					let data = res.data;
					let titles = data.content.title;
					if (data.content.mediaFile) {
						this.showM = true;
						setTimeout(() => {
							this.videoUrl = this.serverImgDomain + data.content.mediaFile;
						}, 500);
					}
					if (data.content.image) {
						this.showM = true;
					}
					data.content.articleData.content = data.content.articleData.content.replace(new RegExp(/src=\"\//g), "src=\"/" +
						this.serverImgDomain + "/");
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
			
			videoErrorCallback: function(e) {
				console.log("e: " + JSON.stringify(e));
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		},
	}
</script>

<style>
	.page {
		background: #FFFFFF;
		padding: 26upx;
	}

	video {
		width: 696upx;
		margin: auto;
		height: 460upx;
	}

	.banners {
		height: 100%;
	}

	.text-title {
		font-size: 40upx;
		font-weight: 600;
		text-align: center;
		padding: 20upx;
		line-height: 62upx;
		word-break: break-all;
	}

	.banner-img {
		width: 100%;
		display: block;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		word-wrap: break-word;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
