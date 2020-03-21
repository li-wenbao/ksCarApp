<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.commit("checkLogin");
			// 检查是否有新版本和判断服务器在线
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// methods: {
		// 	...mapMutations(['checkLogin']),
		// },
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("./common/common.css");
	@import url("./common/cariconfont.css");
	page {
		background: #F1F1F3;
	}
</style>

<style lang='scss'>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
</style>
