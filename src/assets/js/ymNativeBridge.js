//原生调用app
export default {
	callApp:function(handlerMethod, parameters) {
 
		if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
			var handlerInterface = 'YunMiaoNative';
			var dic = {
				'handlerInterface': handlerInterface,
				'function': handlerMethod, //调用原生的指令
				'parameters': parameters //传递的参数；
			};
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				window.webkit.messageHandlers[handlerInterface].postMessage(dic);
			} else { //安卓  
				app.ymAppWebClick(); //dic
			}
		} else {
			//包含微信功能，比如可唤起小程序。
		}
	},
	//原生调用app 并传递参数给H5
	callbackH5: function(handlerMethod, parameters, callbackMethod) {
		if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
			var handlerInterface = 'YunMiaoH5';
			var dic = {
				'handlerInterface': handlerInterface,
				'function': handlerMethod, //调用原生的指令
				'parameters': parameters, //传递的参数；
				'callbackMethod': callbackMethod //回调的函数
			};
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				window.webkit.messageHandlers[handlerInterface].postMessage(dic);
			} else { //安卓  
				app.ymAppWebClick(JSON.stringify(dic));
			}
		} else {
			//包含微信功能，比如可唤起小程序。
		}
	}
}