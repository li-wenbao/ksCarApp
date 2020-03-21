export function toast(title) {
	uni.showToast({
		icon: 'none',
		title: title
	})
}
/**
 * 手机验证
 */
export function checkPhone(value) {
	let reg = /^1\d{10}$/
	if (reg.test(value)) {
		return true;
	}
	toast('手机号格式错误');
	return false
}
/**
 * 密码验证
 */
export function checkPwd(value) {
	if (value.length >= 6) {
		return true;
	}
	toast('密码必须大于6位');
	return false
}
/**
 * 验证码验证
 */
export function checkCode(value) {
	if (value.length == 6) {
		return true;
	}
	toast('验证码必须是6位数字');
	return false
}
/**
 * 身份证验证
 */
export function checkIdCard(value) {
	let reg = /^\d{15}|\d{18}$/
	if (reg.test(value)) {
		return true;
	}
	toast('身份证必须是15或18位数字');
	return false
}
/**
 * 银行卡验证
 */
export function checkBankCard(value) {
	let reg = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{18})$/
	if (reg.test(value)) {
		return true;
	}
	toast('请输入正确的银行卡号');
	return false
}

/**
 * 
 *  判断是否在微信浏览器 true是
 */
export function isWeiXinBrowser() {
	// #ifdef H5
	// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	let ua = window.navigator.userAgent.toLowerCase()
	// 通过正则表达式匹配ua中是否含有MicroMessenger字符串
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		if (!opendid) {
			this.weixilogin()
		}
		return true
	} else {
		return false
	}
	// #endif

	// #ifdef MP
	return false;
	// #endif
}

// 微信登录 获取用户信息
// initProvider() {
export function weixilogin() {
	let _self = this;
	uni.login({
		provider: 'weixin',
		success: function(loginRes) {
			//console.log(loginRes.authResult);
			// 获取用户信息
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					//console.log('用户昵称为：' + infoRes.userInfo.nickName);
					_self.wxlogin(infoRes.userInfo);
				},
			});
		}
	});
}
 
// 微信登录  获取页面信息
// initProvider() {
export function weixiWlogin(wxAppId,wxInfoByBackUrl) {
	let redirect_uri = encodeURIComponent(wxInfoByBackUrl);
	let scope = "snsapi_userinfo";
	let state = "b";
	var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxAppId + "&redirect_uri=" + redirect_uri +
		"&response_type=code&scope=" + scope + "&state=" + state + "&connect_redirect=1#wechat_redirect"
	window.location.href = url;
}


/*除法函数，用来得到精确的除法结果
 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 调用：accDiv(arg1,arg2)
 返回值：arg1除以arg2的精确结果*/
export function accDiv(arg1, arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
		console.log(t1);
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
		console.log(t2);
	} catch (e) {}
	// with (Math) {
	r1 = Number(arg1.toString().replace(".", ""))
	r2 = Number(arg2.toString().replace(".", ""))
	return (r1 / r2) * Math.pow(10, t2 - t1);
	// }
}

//除   
// function floatDiv(arg1, arg2) {
// 	var t1 = 0,
// 		t2 = 0,
// 		r1, r2;
// 	try {
// 		t1 = arg1.toString().split(".")[1].length
// 	} catch (e) {}
// 	try {
// 		t2 = arg2.toString().split(".")[1].length
// 	} catch (e) {}
// 
// 	r1 = Number(arg1.toString().replace(".", ""));
// 
// 	r2 = Number(arg2.toString().replace(".", ""));
// 	return (r1 / r2) * Math.pow(10, t2 - t1);
// }
/*乘法函数，用来得到精确的乘法结果
 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 调用：accMul(arg1,arg2)
 返回值：arg1乘以arg2的精确结果*/
export function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
/*加法函数，用来得到精确的加法结果
 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 调用：accAdd(arg1,arg2)
 返回值：arg1加上arg2的精确结果*/
export function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}
/*减法函数，用来得到精确的减法结果
 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果
 调用：accSubtr(arg1,arg2)
 返回值：arg1减去arg2的精确结果*/
export function accSubtr(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	/*动态控制精度长度*/
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


//计算天数差的函数，通用  
export function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
	return iDays
}

//计算天数差的函数，通用   中文日期的 /
export function CDateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
	var aDate1, aDate2, oDate1, oDate2, iDays

	sDate1 = sDate1.replace(/[\u4e00-\u9fa5]|\//g, '/');
	sDate2 = sDate2.replace(/[\u4e00-\u9fa5]|\//g, '/');
	aDate1 = sDate1.substring(0, sDate1.length - 1)
	oDate1 = new Date(aDate1) //转换为12-18-2006格式  
	aDate2 = sDate2.substring(0, sDate1.length - 1)
	oDate2 = new Date(aDate2)
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
	return iDays
}

//返回两个日期相差的月数
export function MonthsBetw(date1, date2) {
	//用-分成数组
	var aDate, oDate1, oDate2, iDays

	date1 = oDate1.split("-");
	date2 = oDate2.split("-");
	//获取年,月数
	var year1 = parseInt(date1[0]),
		month1 = parseInt(date1[1]),
		year2 = parseInt(date2[0]),
		month2 = parseInt(date2[1]),
		//通过年,月差计算月份差
		months = (year2 - year1) * 12 + (month2 - month1);
	console.info(months);
	return 0;
}

export function CMonthsBetw(date1, date2) {
	//用-分成数组
	date1 = date1.replace(/[\u4e00-\u9fa5]|\//g, '-');
	date2 = date2.replace(/[\u4e00-\u9fa5]|\//g, '-');
	date1 = date1.split("-");
	date2 = date2.split("-");
	//获取年,月数
	var year1 = parseInt(date1[0]),
		month1 = parseInt(date1[1]),
		year2 = parseInt(date2[0]),
		month2 = parseInt(date2[1]),
		//通过年,月差计算月份差
		months = (year2 - year1) * 12 + (month2 - month1);
	// console.info(months);
	return months;
}
