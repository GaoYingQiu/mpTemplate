import MD5 from './md5.js'
export default {
	getRequestParams: function(params) {
		let userId = localStorage.getItem("userId");
		let token = localStorage.getItem("token");
		
		// var userInfo = JSON.parse(userInfoStr);
		var obj = Object.assign(params, {
			api_version: 1, //接口版本
			platform: 2, //平台类型
			terminal: 1, //终端类型
			sub_platform: 2, //子平台类型
			nonce: (Math.random().toFixed(8) + '').replace('0.', ''), //随机数;
			timestamp: new Date().getTime(), //当前时间戳 毫秒
			user_id: 15244165, //userId
			token: "4a9e2e29d155be99dec4db81e51eb4df",//token
			version_code: 273 //当前版本号
		});
		let sign = MD5(this.strKeySort(obj)).toUpperCase(); //md5加密
		obj["Sign"] = sign;
		return obj;
	},

	strKeySort: function(obj) {
		var newkey = Object.keys(obj).sort();
		var newArr = [];
		for (let i = 0; i < newkey.length; i++) {
			if (obj[newkey[i]] === 'undefined' || obj[newkey[i]] === 'null') {
				obj[newkey[i]] = '';
			}
			newArr.push(`${newkey[i]}=${obj[newkey[i]]}`)
		}
		var newStr = newArr.join('&') + '&secret_key=fdjjkMMdAjdk1';
		return newStr;
	},
	//获取url 后面带的参数;
	getUrlKey: function (name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
	}
}