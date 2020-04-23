<template>
	<div class="page emptyDevelop">
		
		<!-- <HelloWorld first-name="qiu" last-name="gaoying"  @hello-introduced="helloIntrduce" @callbackHelloAction="callbackHello"></HelloWorld> -->
		 <div class="emptyIConContainer">
		 	<img src="../assets/image/developing.png" class="emptyICon" />
		 </div>
		 <label class="weui-media-box__title develop_desc">功能正在开发中…</label>
	</div>
</template>

<style>
	 
	.emptyDevelop{
		height: 100%;
		width: 100%;
		 padding: 3.75rem 0 0 0.625rem;
		 margin: 0;
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 background: white; 
	}
	.emptyICon{
		width: 100%;
		height: 100%;
	}
	.emptyIConContainer{
		width: 16.25rem;
		height: 16.25rem;
	}
	 
	.develop_desc{
		font-size: 0.875rem;
		color: #999999;
		margin-top: 0.5rem;
	}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Hello from '@/components/Hello.vue'
export default {
  name: 'developing',
  components: {
    // HelloWorld
  },
  beforeCreate:function (){
  	  document.title = "功能开发中";
  },
  
  /*
  beforeRouteEnter:function(to, from, next){
  	 // 在渲染该组件的对应路由被 confirm 前调用
  	    // 不！能！获取组件实例 `this`
  	    // 因为当守卫执行前，组件实例还没被创建
		next(vm => {
		    // 通过 `vm` 访问组件实例
		})
  },
  beforeRouteUpdate:function(to, from, next) {
	  // 在当前路由改变，但是该组件被复用时调用
	  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	  //可以访问组件实例 `this`
  },
  beforeRoutele: function (to, from, next) {
   
	// 导航离开该组件的对应路由时调用
	// 可以访问组件实例 `this`
	// 离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
	const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
	  if (answer) {
	    next()
	  } else {
	    next(false)
	  }
  },
  */
  created:function(){
	  // var vModel = this.$router.app;
	  // console.log(this.$router.currentRoute);
	// this.regxpMethodTest();
  },
  methods:{
		  
		callbackHello:function(){
			console.log("三级子组件回调值给一级父组件");
		},
	    helloIntrduce(intro){
	  		  console.log(intro);
	    },
		dateMethodTest : function(){
			  //现在时间，毫秒值
			 var dateNow = Date.now();
			 console.log(dateNow);
			 console.log(Date().toString());
		},
		numberMethodTest: function(){
		  
			let num =Number.parseFloat(121);
			let num1 =Number.parseInt(13.62323); //转化成整数
			let boolInteger = Number.isInteger(12); //判断是否为整数
			console.log(prece);
		},
		
		
		regxpMethodTest: function (){
		  // var result =  "abcd".match("cd");
		  // var newStr = "abcdcd".replace("c","gy");
		  // console.log(newStr);
		  // console.log("#哈哈a###这是一个#好####哈哈a##哈#啊圣诞节疯狂#奥斯卡级代付款##as的开发#".match("#([^#]{1,40})#"));
		  // // console.log(result);
		  
		  //去空格
		  var str = "    abcd    ".trim();
		  
		  //分割成数组
		  var componstr = "abcd efe wha weffec word";
		  var arr = componstr.split(" ");
		  
		  //增加sub 标签
		  // var subStr = componstr.sub(); 
		  
		  //截取字符窜
		  // var subStr = componstr.substr(0,4);
		  
		  //检查是否包含某字符窜
		  // var bool = "qiugaoying".includes("gao");
		  
		  //是否以...开头
		  var bool = "qiugaoying".startsWith("qiu");
		  console.log(bool);
		  
		  var str = "gao".repeat(3);
		  console.log(str);
		  
		  // console.log(componstr.big(15));
		   
		},
		objectMethodTest: function(){
				
			const person = {
				name : "gaogao",
				introduce:function(){
					console.log("hello,my name is "+this.name);
				}
			}
			person.name = "ying";
			person.introduce();
			
				
			// let 是局部变量，非常适合循环的时候； 
			//const 是只读变量， 初始化的时候就要赋值；只能赋值一次；
			//var 是全局变量，全局都可以用。
			
			const stuName = "gao"; //只读属性
			// stuName = "gaoyingqiu";
			console.log(stuName);
		
			
			let target = {a: 1};
			let object2 = {b: 2};
			let object3 = {c: 3};
			
			//将数据源对象追加到目标对象
			Object.assign(target,object2,object3); 
			target.b = 10;
			// console.log(target); 
			// console.log(object2); //深拷贝，不影响原数据源
		     
			//判断两个对象是否相等；
		   var bool =	Object.is(2,2);
		   let stu1 = {name:"aaa"};
		   let stu2 = {name1:"aaa2"};
		   var bool2 = Object.is(stu1,stu2);
		   console.log(bool);
			
		},
		jsonMethodTest: function(){
		
				var modelArr = [
					{ num: 1, val: 'ceshi', flag: 'aa' },
					{ num: 2, val: 'ceshi2', flag: 'aa2'}
				];
				
				//json字符窜
				let jsonStr = JSON.stringify(modelArr);
				console.log(jsonStr);
		},
		arrayMethodTest : function(){
		  
		  	//filter
		  	// var newarr = [
		  	// 	{ num: 1, val: 'ceshi', flag: 'aa' },
		  	// 	{ num: 2, val: 'ceshi2', flag: 'aa2'}
		  	// ];
		  	// var arr = newarr.filter(function(element, index) {
		  	//     return (element.num >= 2);
		  	// });
		  	
		  	
		  	// var numbersArr = [1,3,34,55,3,77,0];
		  	
		  	//判断是否为数组
		  	// var bool = Array.isArray(numbersArr)
		  	// console.log(bool);
		  	
		  	// var numbersArr2 = [1,3,34,55,3,77,0];
		  	//数组拼接
		  	// var totalArr = numbersArr.concat(numbersArr2);
		  	// console.log(totalArr);
		  	
		  	
		  	//foreach遍历
		  	// var myFish = ["angel", "clown", "mandarin", "surgeon"];
		  	//  myFish.forEach(function(e,index){
		  	// 	 console.log(e+"index:"+index);
		  	//  });
		  	
		  	//在下标第二个位置插入新的值，直接改变原数组
		  	 // myFish.splice(2, 0, "drum");
		  	 //在第2个位置删除之后两个
		  	// myFish.splice(2,2);
		  	
		  	
		  	//数组截取： 下标，长度
		  	// console.log(numbersArr.slice(0,3));
		  	
		  	//反转
		  	// numbersArr.reverse();
		  	
		  	//排序
		  //    var sortArr = numbersArr.sort();
		  	// console.log(sortArr);
		  	
		  	//indexOf
		  	// let index = numbersArr.indexOf(3);
		  	
		  	//join
		  	// var obj = numbersArr.join("-");
		  	// console.log(obj);
		  	
		  	//最后出现的下标
		  	// var lastIndex = numbersArr.lastIndexOf(3)
		  	// console.log(lastIndex);
	  }
  }
}
</script>
