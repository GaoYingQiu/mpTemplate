import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios' //请求网络
import VueAxios from 'vue-axios' 
import weui from 'weui.js' //weuiJs
import 'weui' //weui样式
import ymAPI from '@/assets/js/urlConfig.js' //Api
import netManager from '@/assets/js/netManager.js' //请求基础参数拼接
import ymNativeBridge from '@/assets/js/ymNativeBridge.js' //原生事件交互
import animate from 'animate.css'

//日期时间控件
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
 
const ymHttp = axios.create({
	
	baseURL: 'https://vendor-api-dev.linjiakankan.com', //window.location.host.indexOf("pro") >=0  ? 'https://vendor-api-prod.linjiakankan.com' : 'https://vendor-api-dev.linjiakankan.com',
	timeout: 100000,
	transformRequest: [function(data) {
		// Do whatever you want to transform the data
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}]
});

Vue.config.productionTip = false

Vue.prototype.$weui = weui
Vue.prototype.$ymAPI = ymAPI
Vue.prototype.$netManager = netManager
Vue.prototype.$ymNativeBridge = ymNativeBridge
Vue.use(VueAxios, ymHttp,animate,Datetime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
