import uniFly from '../common/uniFly.js'
// var Fly=require("flyio/dist/npm/wx")
// var uniFly=new Fly

import utils from '../common/utils.js'
import store from '../store'
//基础路由
uniFly.baseUrl = store.getters.baseApiUrl
//APICloud签名校验
let now = Date.now()
let appId = store.getters.appId
let appKey = store.getters.appKey
// appKey = utils.SHA1(appId + 'UZ' + appKey + 'UZ' + now) + '.' + now
//设置请求头
// uniFly.headers['X-APICloud-AppId'] = appId
// uniFly.headers['X-APICloud-AppKey'] = appKey
//全局请求超时时间
uniFly.timeOut = 20000

//自定义请求拦截
uniFly.requestInterceptors.success = function(request) {
	// console.log('自定义请求拦截')
	//配置基本信息
	request.headers = uniFly.headers
	request.headers['client_token'] = store.getters.token;
	// console.log("store.getters.token: " + JSON.stringify(store.getters.token));
	uni.showLoading()
	// let hData = {}
	// uni.setStorageSync('hStorage', 'hData')
	// let d = uni.getStorageSync('')
	// console.log("hData: " + JSON.stringify(d));
	return request
}

uniFly.responseInterceptors.success = function(request) {
	// console.log('自定义响应拦截')
	// console.log("success: " + JSON.stringify(request));
	uni.hideLoading()
	return Promise.resolve(request)
}

uniFly.responseInterceptors.error = function(request) {
	// console.log('自定义响应拦截')
	// console.log("error: " + JSON.stringify(request));
	uni.hideLoading()
	return Promise.resolve(request)
}

//所有的接口请在此处统一定义
const $dapi = {

	init:function(){
		var info = uni.getStorageSync("userInfo");
		let token =  info.token;
		// console.info(token);
		 //自定义请求拦截
		 uniFly.requestInterceptors.success = function(request) {
		 	// console.log('自定义请求拦截')
		 	//配置基本信息
		 	request.headers = uniFly.headers
		 	request.headers['client_token'] =token;
		 	uni.showLoading()
		 	return request
		 }
	},
	
	//post方法测试
	postTest: function(data) {
		return uniFly.get({
			url: '/reserves/eaReserves/check',
			params: data
		})
	},
	//get方法测试
	getTest: function(data) {
		return uniFly.get({
			url: '/product/eaProducts/listJson',
			params: data
		})
	},
	//get登录
	login: function(data) {
		return uniFly.post({
			url: '/sys/user/login',
			params: data
		})
	},
	//get登录
	sendValidation: function(data) {
		return uniFly.post({
			url: '/sys/user/authenticationCode',
			params: data
		})
	},
	
	//微信登录
	weixinlogin: function(data) {
		return uniFly.post({
			url: '/sys/user/wxlogin',
			params: data
		})
	},
	//产品
	Product: function(data) {
		return uniFly.get({
			url: '/customer/listDataWithProduct',
			params: data
		})
	},
	// 汽车产品
	getCarProductListApi: function(data) {
		return uniFly.get({
			url: '/car/product/carProductInfo/listJson',
			params: data
		})
	},
	// 汽车产品详情
	getCarProListDetApi: function(data) {
		return uniFly.get({
			url: '/car/product/carProductInfo/getById',
			params: data
		})
	},
	// 车辆基本信息数据
	getCarInfoListApi: function(data) {
		return uniFly.get({
			url: '/car/info/carBaseInfo/getById',
			params: data
		})
	},

	//选择车品牌
	getVehicleApi: function(data) {
		return uniFly.get({
			url: '/car/conf/carMototype/treeRootData',
			params: data
		})
	},
	
	//询价
	getsaveSyncApi: function(data) {
		return uniFly.get({
			url: '/car/inquiry/carInquiry/saveSync',
			params: data
		})
	},
	
	//收藏列表
	getshoucangApi: function(data) {
		return uniFly.get({
			url: '/customer/dcCustomerCollect/listJsonByCollect',
			params: data
		})
	},
	//检查是否收藏
	getcheckCollectApi: function(data) {
		return uniFly.get({
			url: '/customer/dcCustomerCollect/checkCollect',
			params: data
		})
	},
	//添加收藏
	getTjshoucangApi: function(data) {
		return uniFly.get({
			url: '/customer/dcCustomerCollect/saveSync',
			params: data
		})
	},
	//取消收藏
	getQxshoucangApi: function(data) {
		return uniFly.get({
			url: '/customer/dcCustomerCollect/deleteJson',
			params: data
		})
	},
	
	//选择车系车型
	treeChildDataApi: function(data) {
		return uniFly.get({
			url: '/car/conf/carMototype/treeChildData',
			params: data
		})
	},

	//获取字典
	getDictListApi: function(data) {
		return uniFly.get({
			url: '/sys/dict/getDictList',
			params: data
		})
	},
	// 申请进度
	getappliProgressApi: function(data) {
		return uniFly.get({
			url: '/customer/findCustomerStatus',
			params: data
		})
	},
	// 贷款申请记录
	getloanApplicApi: function(data) {
		return uniFly.get({
			url: '/customer/findCustomerStatus',
			params: data
		})
	},
	// 检查
	getAgentInfoApi: function(data) {
		return uniFly.get({
			url: '/sys/user/getAgentInfo',
			params: data
		})
	},
	// 切换卡数据
	getmainNavApi: function(data) {
		return uniFly.post({
			url: '/cms/mainInternalList',
			params: data
		})
	},
	// 资讯
	getZiXunApi: function(data) {
		return uniFly.get({
			url: '/cms/getArticleList',
			params: data
		})
	},
	// 资讯详情
	gettArticleApi: function(data) {
		return uniFly.get({
			url: '/cms/getArticle',
			params: data
		})
	},
	// 公司简介
	geteaSetInfoApi: function(data) {
		return uniFly.get({
			url: '/settings/eaSettings/Info',
			params: data
		})
	},
	// 产品列表
	getProductListApi: function(data) {
		return uniFly.get({
			url: '/customer/product/listJson',
			params: data
		})
	},
	// 产品详情
	getproductDApi: function(data) {
		return uniFly.get({
			url: '/customer/product/getById',
			params: data
		})
	},
}

export default $dapi
