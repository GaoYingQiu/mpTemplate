<template>
 <div class="page" id="PageContainer1" v-bind:style="{display:pageLoadOk?'inline':'none'}">
 	<div class="customerHeaderInfo"  v-if="customerInfo != null" >
 		<div class="avatarIconContainer">
 			<img v-bind:src="customerInfo.user.avatar" class="avatarICon" />
 		</div>
 		<label class="weui-media-box__title header_Nick">{{customerInfo.user.nick}}</label>
 		<label class="weui-media-box__title header_phoneNumber">{{customerInfo.phone}}</label>
 	</div>
 	<div class="page__bd" >
 		<div class="weui-panel weui-panel_access">
 			<div class="weui-panel__hd weui-flex menuContainer" v-bind:style="menuItenPositionStyle">
 				<span v-for="(text,index) in menuTitleArr" class="weui-flex__item menuItem" v-bind:class="index == currentSelectMenuIndex? selectedMenuClass:''"
 				 v-on:click="chooseMenuFilterAction(index)">
 					<label v-bind:class="index == currentSelectMenuIndex? 'menuItemLabelBototmLine':''">{{text}}</label>
 				</span>
 			</div>
 			<div class="weui-panel__bd" v-bind:class="pannel_bd_padding_set" v-if="currentSelectMenuIndex == 0">
 				<a href="javascript:void(0);" class="weui-media-box-zeroPadding weui-media-box_appmsg" v-for="(item,index) in customerBaseInfoArr"
 				 v-bind:key="index">
 					<!-- 访问日志 -->
 
 					<div class="weui-media-box__bd baseInfoCell" v-if="item.text != '客户标签'">
 						<label class="weui-media-box__title logTitle">{{item.text}}: {{item.value}}</label>
 					</div>
 					<div class="weui-media-box__bd baseInfoTagCell" v-else>
 						<label class="weui-media-box__title">客户标签:</label>
 						<div class="tagContainer">
 							<label v-for="tagItem in item.value" class="weui-media-box__title tagLabel">{{tagItem}}</label>
 						</div>
 					</div>
 				</a>
 			</div>
 			<div class="weui-panel__bd" v-bind:class="pannel_bd_padding_set" v-else>
 				<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in dataSource"
 				 v-bind:key="index">
 
 					<!-- 优惠券 -->
 					<div class="weui-media-box__bd couponCell" v-if="currentSelectMenuIndex == 2">
 
 						<div class="couponDesc weui-flex__item">
 							<div class="weui-flex leftCouponDesc weui-flex__item">
 								<label class="weui-media-box__title">{{item.coupon.name}}</label>
 								<label class="couponMoney" v-bind:style="item.draw.status==3?expireColor:''">￥{{item.draw.amount}} </label>
 							</div>
 							<div>
 								<span class="couponStatu" v-bind:style="item.draw.status==3?expireBackColor:''">{{item.draw.statusText}}</span>
 							</div>
 						</div>
 						<div class="couponFooter">
 							<label class="expireTime">有效期至:{{item.coupon.expireTimeText}}</label>
 						</div>
 					</div>
 
 					<!-- 访问日志 -->
 					<div class="weui-media-box__bd weui-flex logCell" v-else-if="currentSelectMenuIndex == 1">
 						<label class="weui-media-box__title logTitle">{{item.info}}</label>
 						<label class="expireTime">{{item.time}}</label>
 					</div>
 
 					<!-- 商品记录 -->
 					<div class="weui-media-box__bd  productCell" v-else-if="currentSelectMenuIndex == 3" v-on:click="goProductDetailAction(item)">
 						<div class="shopInfo weui-flex">
 							<span class="weui-flex__item weui-flex shopNameContainer"><img src="../assets/image/order_from.png" class="shopICon" /><label
 								 class="shopNameLabel">{{item.shop.name}}</label></span>
 							<label class="orderStatus">{{item.productPurchase.statusText}}</label>
 						</div>
 						<div class="productContainer" v-for="productItem in item.productPurchase.items">
 							<div class="productIConContainer"><img v-bind:src="productItem.product.cover" class="productICon" /></div>
 							<div class="productDescContainer">
 								<label class="productTitle">{{productItem.product.name}}</label>
 								<label class="productSkuDesc weui-flex__item">{{productItem.skuDesc}}</label>
 								<label class="totalMoneyDesc">¥<label class="productItemTotalMoney">{{productItem.totalFee}}</label></label>
 							</div>
 						</div>
 						<div class="productFooter weui-flex">
 							<label class="expireTime weui-flex__item">{{item.order.createTime}}</label>
 							<label class="totalMoneyDesc">共{{item.productPurchase.items.length}}件，合计 ¥ <label class="totalMoney">{{item.order.actualFee}}</label></label>
 						</div>
 					</div>
 				</a>
 
 			</div>
 		</div>
 	</div>
 	<div class="weui-loadmore" v-if="hasMoreDataFlag">
 		<i class="weui-loading"></i>
 		<span class="weui-loadmore__tips">正在加载</span>
 	</div>
 	<div class="weui-loadmore" v-else-if="currentSelectMenuIndex > 0">
 		<span class="weui-loadmore__tips" style="background: rgb(240,241,245);color:#999999;">没有更多了~</span>
 	</div>
 </div>
</template>

<script>
	
	export default {
	  name: 'about',
	  components: {
	  },
	  data(){
		  return{
			 ticketItem:null ,
			 //分页数据
			 pageNumber: 1,
			 pageSize: 10,
			 ymPageListStart: 0,
			 hasMoreDataFlag: false,
			 dataSource: [],
			 requestLoadingFinished: true,
			 customerId: 0,
			 currentSelectMenuIndex: 0,
			 pannel_bd_padding_set: 'pannel_bd_padding',
			 pageLoadOk: false, //页面加载完成控制
			 customerBaseInfoArr: null,
			 customerInfo: null,
			 selectedMenuClass: 'selectMenuItemLight',
			 menuTitleArr: ["客户信息", "行为记录", "优惠券", "客户订单"],
			 menuItenPositionStyle: '',
			 expireColor: 'color:#999999',
			 expireBackColor: 'background-color:#999999'
		  }
	  },
	  beforeCreate:function (){
		  document.title = "客户详情";
	  },
	  created:function(){
		 
		 //userId && tokenId
		 
		 let userId = this.$netManager.getUrlKey("user_id");
		 if (userId &&  userId.length > 0){
		 }else{
		 	userId = this.$netManager.getUrlKey("userId");
		 }
		 
		 let token = this.$netManager.getUrlKey("token");
		 if (userId && token && userId.length > 0 && token.length > 0) {
		 	localStorage.setItem("token", token);
		 	localStorage.setItem("userId", userId);
		 }
		 
		 this.customerId = this.$netManager.getUrlKey("customerId");
		 if (this.currentSelectMenuIndex <= 1) {
		 	this.pannel_bd_padding_set = 'pannel_bd_paddingLog'
		 }
		 
		 this.loadCustomerDataRequest();
		 this.pageLoadOk = true;
	  },
	  mounted: function() {
	  	// 添加滚动事件，检测滚动到页面底部
	  	window.addEventListener('scroll', this.scrollBottom);
	  },
	  methods:{
		  
		  scrollBottom(event) {
			
			let scrollTop = document.body.scrollTop;
		  	if (scrollTop >= 159) {
		  		this.menuItenPositionStyle = 'position:fixed;top:0;z-index:1000;'
		  	} else {
		  		this.menuItenPositionStyle = '';
		  	}
		  
		  	// 滚动到页面底部时 && 请求加载已完成 && 还有下一页的数据；
		  	if ((((window.screen.height + scrollTop) >= (document.body.scrollHeight)) && this.requestLoadingFinished &&
		  			this.hasMoreDataFlag)) {
		  		this.requestLoadingFinished = false;
		  		this.pageNumber++;
		  
		  		this.loadCustomerDataRequest();
		  	}
		  },
		 goProductDetailAction:function(item){
			const orderId = item.order.orderId; 
			this.$router.push({ path: '/module/developing', params: { orderId }})
		 },
		 chooseMenuFilterAction: function(index) {
		 	this.currentSelectMenuIndex = index;
		 	this.pageNumber = 1;
		 	this.hasMoreDataFlag = false;
		 	this.dataSource = Array();
		 
		 	if (this.currentSelectMenuIndex <= 1) {
		 		this.pannel_bd_padding_set = 'pannel_bd_paddingLog';
		 	} else {
		 		this.pannel_bd_padding_set = 'pannel_bd_padding';
		 	}
		 	this.loadCustomerDataRequest();
		 },
		 
		 //加载数据请求
		 loadCustomerDataRequest: function() {
		 	if (this.currentSelectMenuIndex == 0) {
		 		this.requestCustomerBaseInfo();
		 	} else if (this.currentSelectMenuIndex == 1) {
		 		this.execBaseCustomerRequest(this.$ymAPI.customerLogs, "logs");
		 	} else if (this.currentSelectMenuIndex == 2) {
		 		this.execBaseCustomerRequest(this.$ymAPI.customerCoupons, "draws");
		 	} else if (this.currentSelectMenuIndex == 3) {
		 		this.execBaseCustomerRequest(this.$ymAPI.customerOrders, "orders");
		 	}
		 },
		 
		 //加载用户基本信息
		 requestCustomerBaseInfo: function() {
		 	var loading = this.$weui.loading('加载中');
			let pageVue = this;
			console.log(this);
		 	this.$http.post(this.$ymAPI.customerDetail, this.$netManager.getRequestParams({
		 		customer_id: this.customerId
		 
		 	})).then(function(response) {
		 		if (loading) {
		 			loading.hide();
		 		}
		 
		 		let dataDic = response.data;
		 		if (dataDic.status == 1) {
		 
		 			var customerInfo = dataDic.data;
		 			pageVue.customerInfo = customerInfo;
		 			let customerBaseInfoArr = [{
		 					text: "会员卡编号",
		 					value: customerInfo.card.num
		 				},
		 				{
		 					text: "姓名",
		 					value: customerInfo.card.name
		 				},
		 				{
		 					text: "性别",
		 					value: customerInfo.card.gender
		 				},
		 				{
		 					text: "电话号码",
		 					value: customerInfo.card.phone
		 				},
		 				{
		 					text: "客户标签",
		 					value: customerInfo.tags
		 				}
		 			];
		 
		 			pageVue.customerBaseInfoArr = customerBaseInfoArr;
		 		}
		 	}).catch(function(error) {
		 		console.log(error);
		 	});
		 },
		 execBaseCustomerRequest: function(url, listKey) {
		 
		 	var loading = null;
		 	if (this.pageNumber == 1) {
		 		loading = this.$weui.loading('加载中');
				this.ymPageListStart = 0;
		 	}
		 	let pageVue = this; //this在不同的作用域中指向的对象不同；临时存储vue对象
		 	 
		 	this.$http.post(url, this.$netManager.getRequestParams({
		 		customer_id: this.customerId,
		 		start: this.ymPageListStart,
		 		size: 10,
		 	})).then(function(response) {
		 		if (loading) {
		 			loading.hide();
		 		}
		 
		 		let dataDic = response.data;		 
		 		if (dataDic.status == 1) {
		 
		 			var arr = pageVue.dataSource;
		 			if (pageVue.pageNumber == 1) {
		 				arr = [];
		 			}
		 
		 			var dataArr = dataDic.data[listKey];
		 			arr = arr.concat(dataArr);
		 
		 			pageVue.ymPageListStart = dataDic.data.start;
		 			pageVue.hasMoreDataFlag = (dataDic.data.more == 1);
		 			pageVue.dataSource = arr;
		 		}else{
					pageVue.$weui.topTips(dataDic.errorMsg);
				}
		 		setTimeout(function() {
		 			pageVue.requestLoadingFinished = true;
		 		}, 800);
		 		//重置加载完成的状态；
		 
		 	}).catch(function(error) {
		 		console.log(error);
		 	});
		 },
		  
		 showComonPickerAction: function() {
		 	var typesArr = ['交通发票', '餐饮发票', '住宿发票'];
		 	var dataArr = Array();
		 	typesArr.forEach(function(value, index) {
		 		dataArr.push({
		 			label: value,
		 			value: index
		 		});
		 	});
		 
			var pageVue = this;
		 	this.$weui.picker(dataArr, {
		 		defaultValue: [2],
		 		className: 'custom-classname',
		 		onChange: function(result) {},
		 		onConfirm: function(result) {
		 			if (result.length) {
						pageVue.ticketItem =  result[0];
		 			}
		 		},
		 		id: 'picker',
		 		title: '单列选择器'
		 	});
		 }
	  }
	}
</script>

<style scoped>
	.couponMoney{
			font-size:1.5625rem;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:250;
			color:rgb(248,63,47);
		}
		
		.couponCell{
			height: 116px;
			background: url(../assets/image/couponBack.png) no-repeat; 
			background-size: cover;
			box-sizing: border-box; /*有padding border-box */
			background-position: 0 0;
			padding: 0.9375rem  0.9375rem 0;  /* 中间代表左右 */
			display: flex;
			flex-direction: column;
		}
		.couponDesc{
			display: flex;
		}
		
		.leftCouponDesc{
			flex-direction: column;
		}
		.weui-media-box__title{
			font-size: 0.875rem;
			color:rgb(51,51,51);
		}
		
		.expireCouponMoney{
			color:#999999;
		}
		
		.couponStatu{
			margin-top: 0.625rem;
			background-color: #8B0000;
			border-radius: 0.9375rem;
			font-size: 0.875rem;
			color: white;
			width: 5.125rem;
			line-height: 1.875rem;
			height: 1.875rem;
			display: block;
			text-align: center;
		}
		
		.expireTime{
			font-size: 0.75rem;
			color: #999999; 
		}
		
		.couponFooter{
			 height: 1.96875rem;
			 text-align: right;
			 align-items: center;
			 display: flex;
			 justify-content: flex-end;
			 border-top: 0.03125rem dotted rgb(151, 151, 151);
		}
		
		/*公用*/
		.weui-media-box{
			padding: 0;
			margin-bottom: 0.625rem;
		}
		
		.weui-media-box-zeroPadding{
			padding: 0;
		}
		
		
		.weui-loadmore span{
			background-color: rgb(240,241,245);
			background: rgb(240,241,245);
		}
		
		.page,body, .weui-panel{
			background-color: rgb(240,241,245);
		}
		
		.weui-panel__bd{
			background-color: rgb(240,241,245);
			
		}
		.weui-panel__hd{
			background-color: white;
		}
		
		.pannel_bd_padding{
			padding:0.625rem 0.625rem 0;
		}
		
		.pannel_bd_paddingZero{
			padding:0;
		}
		
		.pannel_bd_paddingLog{
			padding:0.625rem 0 0;
		}
		
		/*日志*/
		.logCell {
			height: 3.375rem;
			background-color: white;
			padding: 0.9375rem;
			box-sizing: border-box;
		}
		
		.logTitle{
			flex: 1;
			width: 100%;
		}
		
		.baseInfoCell{
			height: 3.125rem;
			padding-left: 0.9375rem;
			background-color: white;
			border-bottom: 0.03125rem solid #EEEEEE;
		}
		
		.baseInfoCell label{
			line-height: 3.125rem;
			height: 100%;
		}
		
		.baseInfoTagCell{
			padding: 0.9375rem 1.0625rem;
			background-color: white;
		}
		
		/* 商品*/
		 .productCell{
			 background-color: white;
			 padding: 0.9375rem 0.9375rem 0 ;
		 }
		.productContainer{
			margin-top: 0.625rem;
			height: 5.625rem;
			background-color: #F9F9F9;
			padding: 0.625rem;
			display: flex;
			box-sizing: border-box;
		}
		.productDescContainer{
			display: flex;
			flex-direction: column;
			margin-left: 0.375rem;
			height: 4.375rem;
		}
		.productICon{
			width: 4.375rem;
			height: 4.375rem;
		}
		
		.productIConContainer{
			width: 4.375rem;
			height: 4.375rem;
		}
		
		.productTitle{
			color: rgb(51,51,51);
			font-size: 0.75rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
		    -webkit-box-orient: vertical;
			-webkit-line-clamp: 1;     
		}
		
		.productSkuDesc{
			color: rgb(153,153,153);
			font-size: 0.75rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
		    -webkit-box-orient: vertical;
			-webkit-line-clamp: 2;     
		}
	
		.shopInfo{
			height: 2.09375rem;
			border-bottom: 0.5px solid #EEEEEE;
			font-size: 0;
		}
		.productFooter{
			height: 2.84375rem;
			align-items: center;
		}
		
		.shopICon{
			height: 1.125rem;
			width: 1.125rem;	
		}
		
		.orderStatus{
			font-size: 0.875rem;
			color: rgb(16, 142, 233);
		}
		
		.shopNameLabel{
			font-size: 0.875rem;
			color: rgb(51, 51, 51);
			margin-left: 0.625rem;
		}
		.shopNameContainer{
			justify-content: flex-start;
		}
		.totalMoneyDesc{
			font-size: 0.75rem;
			color:rgb(51, 51, 51);
		}
		
		.totalMoney{
			font-size: 1rem;
			color:rgb(51, 51, 51);
		}
		
		.productItemTotalMoney{
			font-size:1rem;
			color:rgb(51, 51, 51);
			font-weight: bolder;
		}
			
			/* 基本信息 */	 
		.tagContainer{
			display: flex;
			flex-wrap: wrap;
		}
		
		.tagLabel{
			padding: 0 0.9375rem;  /* 左右空格间距，上下根据lineHeight设置居中 */
			height: 1.875rem;
			line-height: 1.875rem;
			color:white;
			background-color: rgb(72, 75, 85);
			margin-right: 0.9375rem;
			margin-top: 0.9375rem;
			border-radius: 0.9375rem;
			box-sizing: border-box;
		}
		
		.menuItem{
			color: rgb(153, 153, 153);
			font-size: 0.875rem;
			font-weight: bold;
			display: flex;
			justify-content: center;
		}
		
		.menuItem label{
			display: flex;
			align-items: center;
		}
		
		.menuItemLabelBototmLine{
			border-bottom: 3px solid #227BFF;
		}
		
		.selectMenuItemLight{
			color:rgb(51,51,51);
		}
		.menuContainer{
			height: 3.25rem;
			padding:0;
			box-sizing: border-box;
			/* position: fixed; */
			width: 100%;
		}
	 
	 .customerHeaderInfo{
		 height: 9.9375rem;
		 padding: 0 0.625rem;
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		 background: white; 
	}
	 .avatarIconContainer{
		 height: 5rem;
		 width: 5rem;
	 }
	 
	 .avatarICon{
		width: 100%;
		height: 100%;
		border-radius: 2.5rem;
	 }
	 .header_Nick{
		 font-size: 1rem;
		 margin-top: 0.625rem;
		 color: rgb(51,51,51);
		 font-weight: bold;
	 }
	 .header_phoneNumber{
	 	font-size: 0.875rem;
	 	margin-top: 0.625rem;
	 	color: rgb(51,51,51);
	 }
	 .page{
		  display: none;
	 }
	 .weui-panel:after{
		 border-bottom: 0;
	 }
</style>