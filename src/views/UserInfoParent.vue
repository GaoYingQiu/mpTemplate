<template>
	<transition :name="transitionName">
		<router-view></router-view>
	</transition>
</template>

<script>
	export default {
	  name: 'userInfoContainer',
	  created:function(){
	  	
	  },
	  data(){
			return{
				transitionName: 'slide-right',
				
				//transitionName 如果是同级的，过渡效果也可以根据别名路径的长度。
			}
	  },
	  beforeRouteUpdate:function(to, from, next) {
	    const toDepth = to.path.split('/').length
	    const fromDepth = from.path.split('/').length
	    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		next()
	  },
	  beforeRouteEnter: function(to, from, next) {
		  // next(vm => vm.setData(err, post)) 可在导航完成前获取数据，this对象还没创建完成；
		  next()
	  },
	  fetchData:function (){
		  //请求数据 
	  },
	  /*
	  watch:{
		'$route'(to, from) {
			//检测路由的变化。
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		}
		
		'$route':'fetchData' //路由变化的时候，请求数据；
	  }*/
	}
</script>

<style>
</style>
