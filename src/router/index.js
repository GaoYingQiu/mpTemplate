import Vue from 'vue'
import VueRouter from 'vue-router'
import DevelopView from '../views/developing.vue'
import UserInfoContainer from '../views/UserInfoParent.vue'
import Hello from '@/components/Hello.vue'

Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
	  name: 'LiveList',
	  component:() => import('../views/liveList.vue'),
		meta: {
			title: "直播间列表"
		}
	},
  {
    path: '/page/developing.html',
    name: 'developName',
    component: DevelopView,
	meta: {
		title: "功能开发中",
		keepAlive: false 
	},
	
	
	// },
	// children:[
	//             { path: '/hello', component: Hello }
	// 		]
	// beforeEnter:(to, from, next) => {
 //        // ...
	// 	next(); //和全局前置的用法一样;
 //    }
  },
  {
    path: '/dataScreenOrder.html',
    name: 'orderScreen',
    component:() => import('../views/orderScreen.vue'),
  	meta: {
  		title: "数据看板"
  	}
  },
  {
    path: '/dataBrief.html',
    name: 'dataBrief',
    component:() => import('../views/dataBrief.vue'),
  	meta: {
  		title: "数据简报"
  	}
  },
  {
    path: '/form',
    name: 'SimpleForm',
    component:() => import('../views/prepareForm.vue'),
  	meta: {
  		title: "表单"
  	}
  },
  {
    path: '/liveList.html',
    name: 'LiveList',
    component:() => import('../views/liveList.vue'),
  	meta: {
  		title: "直播间列表"
  	}
  },
  {
    path: '/editLiveInfo',
    name: 'EditLiveInfo',
    component:() => import('../views/editLiveInfo.vue'),
  	meta: {
  		title: "编辑直播"
  	}
  },
  {
    path: '/page/customerMain.html',
    name: 'customerMain',
	//组件懒加载,动态加载. 和babel 相关.
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/customerMain.vue'),
	meta: {
		title: "客户详情",
		keepAlive: true 
	}
  }
  /*,
  {
	  path: '/UserInfoParent',
	  name: 'userInfoContainer',
	  component: UserInfoContainer,
	  children: [
	            { path: '', component: Default },
	            { path: 'baseinfo', component: Foo },
	            { path: 'moneyPay', component: Bar },
	  }  
  }
  */
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
	if (savedPosition) {
	    return savedPosition
	} else {
	    return { x: 0, y: 0 }
	}
	
	// 滚动到锚点的行为;
	 // if (to.hash) {
	 //    return {
	 //      selector: to.hash
	 //    }
	 //  }
  }
})

//全局

router.beforeEach((to, from, next) => {
  // 必须调用 `next` 根据元数据,判断需要登录的页面;
  next()
})
/*
router.beforeResolve((to, from, next) => {
  // 必须调用 `next`
})

router.afterEach((to, from) => {})
*/

export default router
