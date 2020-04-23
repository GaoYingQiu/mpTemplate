<template>
	<div class="hello">
		<label>lastName:{{lastName}}</label>
		<p>
			<button @click="helloAction">传值给一级父组件A</button>
		</p>
	</div>
</template>

<script>
	
	export default {
	  name: 'Hello',
	  props:{
		lastName: ""
	  },
	  // inheritAttrs:false,
	  methods:{
		  helloAction:function(){
			  // console.log("回调值给一级父组件");
			  // this.$emit("callbackHelloAction");
		  }
	  },
	  created:function(){
	  	console.log("second child:"+this.lastName);
	  }
	}
</script>

<style>
</style>
