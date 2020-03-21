const utils = {

	showToast: function(params) {
		if (params != undefined && params.title != undefined && params.title.length > 0) {
			if (params.icon == undefined) {
				params.icon = 'none';
			}
			if (params.mask === undefined) {
				params.mask = true;
			}
			uni.showToast({
				duration: 2000,
				...params
			});
		}
	},

	showLoading: function(params) {
		params = { ...params
		}
		if (params.title == undefined || params.title.length < 1) {
			params.title = '加载中...';
		}
		if (params.mask === undefined) {
			params.mask = true;
		}
		uni.showLoading({
			...params
		})
	},


	hideLoading: function() {
		uni.hideLoading();
	},


	showModal: function(params) {
		if (params != undefined && params.content != undefined &&
			params.content.length > 0) {
			if (!params.title || params.title.length == 0) {
				params.title = '提示';
			}
			uni.showModal({
				...params,
			})
		}
	},

	showActionSheet: function(params) {
		if (params != undefined && params.itemList != undefined && params.itemList.length > 0) {
			uni.showActionSheet({
				...params,
			})
		}

	},

	SHA1: function(msg) {

		function rotate_left(n, s) {
			var t4 = (n << s) | (n >>> (32 - s));
			return t4;
		};

		function lsb_hex(val) {
			var str = "";
			var i;
			var vh;
			var vl;

			for (i = 0; i <= 6; i += 2) {
				vh = (val >>> (i * 4 + 4)) & 0x0f;
				vl = (val >>> (i * 4)) & 0x0f;
				str += vh.toString(16) + vl.toString(16);
			}
			return str;
		};

		function cvt_hex(val) {
			var str = "";
			var i;
			var v;

			for (i = 7; i >= 0; i--) {
				v = (val >>> (i * 4)) & 0x0f;
				str += v.toString(16);
			}
			return str;
		};


		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		};

		var blockstart;
		var i, j;
		var W = new Array(80);
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		var A, B, C, D, E;
		var temp;

		msg = Utf8Encode(msg);

		var msg_len = msg.length;

		var word_array = new Array();
		for (i = 0; i < msg_len - 3; i += 4) {
			j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
				msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
			word_array.push(j);
		}

		switch (msg_len % 4) {
			case 0:
				i = 0x080000000;
				break;
			case 1:
				i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
				break;

			case 2:
				i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
				break;

			case 3:
				i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 |
					0x80;
				break;
		}

		word_array.push(i);

		while ((word_array.length % 16) != 14) word_array.push(0);

		word_array.push(msg_len >>> 29);
		word_array.push((msg_len << 3) & 0x0ffffffff);


		for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

			for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
			for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;

			for (i = 0; i <= 19; i++) {
				temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for (i = 20; i <= 39; i++) {
				temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for (i = 40; i <= 59; i++) {
				temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			for (i = 60; i <= 79; i++) {
				temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B, 30);
				B = A;
				A = temp;
			}

			H0 = (H0 + A) & 0x0ffffffff;
			H1 = (H1 + B) & 0x0ffffffff;
			H2 = (H2 + C) & 0x0ffffffff;
			H3 = (H3 + D) & 0x0ffffffff;
			H4 = (H4 + E) & 0x0ffffffff;

		}

		var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

		return temp.toLowerCase();

	},

	friendlyDate: function(timestamp) {
		var formats = {
			'year': '%n% 年前',
			'month': '%n% 月前',
			'day': '%n% 天前',
			'hour': '%n% 小时前',
			'minute': '%n% 分钟前',
			'second': '%n% 秒前',
		};

		var now = Date.now();
		var seconds = Math.floor((now - timestamp) / 1000);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var months = Math.floor(days / 30);
		var years = Math.floor(months / 12);

		var diffType = '';
		var diffValue = 0;
		if (years > 0) {
			diffType = 'year';
			diffValue = years;
		} else {
			if (months > 0) {
				diffType = 'month';
				diffValue = months;
			} else {
				if (days > 0) {
					diffType = 'day';
					diffValue = days;
				} else {
					if (hours > 0) {
						diffType = 'hour';
						diffValue = hours;
					} else {
						if (minutes > 0) {
							diffType = 'minute';
							diffValue = minutes;
						} else {
							diffType = 'second';
							diffValue = seconds === 0 ? (seconds = 1) : seconds;
						}
					}
				}
			}
		}
		return formats[diffType].replace('%n%', diffValue);
	},
	isWeiXinBrowser() {
		// #ifdef H5
		// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
		let ua = window.navigator.userAgent.toLowerCase()
		// 通过正则表达式匹配ua中是否含有MicroMessenger字符串
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true
		} else {
			return false
		}
		// #endif

		// #ifdef MP
		return false;
		// #endif
	},
	weixinWlogin(wxAppId, wxInfoByBackUrl) {
		let redirect_uri = encodeURIComponent(wxInfoByBackUrl);
		let scope = "snsapi_userinfo";
		let state = "b";
		var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxAppId + "&redirect_uri=" + redirect_uri +
			"&response_type=code&scope=" + scope + "&state=" + state + "&connect_redirect=1#wechat_redirect"
		window.location.href = url;
	},
	//获取地址栏参数，name:参数名称
	getUrlParms(name) {
		console.info(window.location.search);
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	},
	/**
	 * 微信登陆
	 */
	checkWxLogin(wxAppId, wxInfoByCode) {
		//检查是否登陆
		let backUrl = window.location.href;
		// utils.weixinWlogin(wxAppId,backUrl);
		if (utils.isWeiXinBrowser()) {
			//检查 wxUserInfo 是否 存在
			let wxInfo = uni.getStorageSync("wxUserInfo");
			if (wxInfo && wxInfo.openId) {
				
				
				
			} else {
				let code = utils.getUrlParms("code");
				if (!code) {
					utils.weixinWlogin(wxAppId, backUrl);
				} else {
					utils.getWxInfoByCode(code, wxAppId, wxInfoByCode);
				}
			}
		} else {}
	},
	getWxInfoByCode(code, wxAppId, wxInfoByCode) {
		uni.request({
			url: wxInfoByCode,
			data: {
				appId: wxAppId,
				code: code
			},
			success: (res) => {
				if (res.data.code == 100) {
					uni.setStorageSync('wxUserInfo', res.data.content);
				} else {

				}
			},
			fail: (res) => {}
		});
	},
	/*除法函数，用来得到精确的除法结果
		 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
		 调用：accDiv(arg1,arg2)
		 返回值：arg1除以arg2的精确结果*/
	accDiv(arg1, arg2) {
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
	},
	/*乘法函数，用来得到精确的乘法结果
		 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
		 调用：accMul(arg1,arg2)
		 返回值：arg1乘以arg2的精确结果*/

	accMul(arg1, arg2) {
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
	},
	/*加法函数，用来得到精确的加法结果
		 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
		 调用：accAdd(arg1,arg2)
		 返回值：arg1加上arg2的精确结果*/

	accAdd(arg1, arg2) {
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
	},
	/*减法函数，用来得到精确的减法结果
		 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果
		 调用：accSubtr(arg1,arg2)
		 返回值：arg1减去arg2的精确结果*/

	accSubtr(arg1, arg2) {
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
}

export default utils;
