<template>
	<!-- 文章 -->
	<view class="page">
		<view class="text-title" v-html='content.name'></view>
		<view class="article-meta">
			<!-- <text class="article-author" style="color: #131313;">{{content.name}}</text> -->
			<text class="article-text">发表于</text>
			<text class="article-time">{{content.createDate}}</text>
		</view>
		<view v-for="(item, index) in videoArr" :key="index">
			<video id="myVideo" v-if="item !=''" :src="baseDemainSrc + item" x5-video-player-type="h5" x5-video-orientation="landscape|portrait" controls></video>
		</view>
		<view class="article-content">
			<text class="rich-text" v-html='content.introduce'></text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: mapState(['hasLogin', 'uerInfo']),
		data() {
			return {
				content: {},
				baseDemainSrc: '',
				videoUrl: "",
				videoArr: []
			}
		},
		onLoad: function(options) {
			this.Id = options.id;
			console.log("Id: " + JSON.stringify(this.Id));
			// this.getWodekehuDetail();
			this.baseDemainSrc = this.$store.getters.baseDemain;
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			...mapMutations(['logout']),
			// 页面详情
			getWodekehuDetail: function() {
				this.$dapi.getCourseWareDetailsApi({
					"id": this.Id
				}).then(res => {
					let data = res.data;
					// console.log("data: " + JSON.stringify(data));
					let files = res.data.content.files.split("|");
					// console.log("files: " + JSON.stringify(files));
					for (var i = 0; i < files.length; i++) {
						// this.videoArr = files[i]
						this.videoArr.push(files[i])
					}
					// console.log("filesArr: " + JSON.stringify(files));
					// console.log("this.videoArr: " + JSON.stringify(this.videoArr));
					// let content = data.content;
					// data.content.introduce = data.content.introduce.replace(new RegExp(/src=\"\//g), "src=\"/" +
					// 	this.serverImgDomain + "/");
					this.content = data.content;
				})
			}
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
