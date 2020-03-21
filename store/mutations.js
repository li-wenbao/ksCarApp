export default {
	login(state, provider) {
		state.hasLogin = true
		state.token = provider.token
		state.userInfo = provider
		uni.setStorage({
			key: 'userInfo',
			data: provider
		})
		console.info("setStorage");
	},
	logout(state) {
		state.hasLogin = false;
		state.userInfo = {}
		uni.removeStorage({
			key: 'userInfo'
		});
		uni.removeStorageSync("wxUserInfo");
	},
	checkLogin(state) {
		uni.getStorage({
			key: 'userInfo',
			success: (res) => {
				state.hasLogin = true
				state.token = res.data.token
				state.userInfo = res.data
			} 
		});
	}
}
