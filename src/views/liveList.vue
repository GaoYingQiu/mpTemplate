<template>
	<div class="page" id="PageContainer1" v-bind:style="{display:pageLoadOk?'inline':'none'}">
		 
		<div class="page__hd">
			<a href="javascript:;" class="weui-btn weui-btn_primary"
			 v-on:click="tappedAddBtn">添加</a>
		</div>
		<div class="page__bd">
			<div class="weui-panel weui-panel_access">

				<div class="weui-panel__bd" v-bind:class="pannel_bd_padding_set">
					<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in dataSource"
					 v-bind:key="index">
						<!-- 商品记录 -->
						<div class="weui-media-box__bd  productCell">
							<div class="shopInfo weui-flex">
								<!-- <img src="../assets/image/order_from.png" class="shopICon" /> -->
								<span class="weui-flex__item weui-flex shopNameContainer">
									<label class="shopNameLabel">{{item.name}}</label></span>
								<label class="orderStatus" v-bind:style="{color: item.offline ==1? 'rgb(153,153,153)':'rgb(16, 142, 233)'}">{{item.offline==1?"已下架":"已上架"}}</label>
							</div>
							<div class="productContainer" v-on:click="goProductDetailAction(item)">
								<div class="productIConContainer"><img v-bind:src="item.cover" class="productICon" /></div>
								<div class="productDescContainer">
									<label class="productTitle">房间号：{{item.miniAppRoomId}}</label>
									<label class="productSkuDesc weui-flex">类型：{{item.roomModeText}}</label>
									<label class="productSkuDesc">时间：{{item.time}} </label>
									<!-- <label class="productSkuDesc weui-flex">结束时间：2020.04.10 21:30 </label> -->
								</div>
							</div>
							<div class="productFooter weui-flex">
								<button class="weui-media-box__title tagLabel" style="background: #44A6FF;" v-on:click="tappedEditBtn(item)">编辑</button>
								<button class="weui-media-box__title tagLabel" v-on:click="tappedOperationBtn(item)" v-bind:style="{background: item.offline ==1? '#44A6FF':'#919191'}">{{item.offline ==1?'上架':'下架'}}</button>
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
		<div class="weui-loadmore" style="height: 4rem;">
			<span class="weui-loadmore__tips" style="background: rgb(240,241,245);color:#999999;"> </span>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'about',
		components: {},
		data() {
			return {

				//分页数据
				pageNumber: 1,
				pageSize: 10,
				ymPageListStart: 0,
				hasMoreDataFlag: false,
				dataSource: [],
				requestLoadingFinished: true,

				customerId: 0,
				pannel_bd_padding_set: 'pannel_bd_padding',
				pageLoadOk: false, //页面加载完成控制
				expireColor: 'color:#999999',
				expireBackColor: 'background-color:#999999'
			}
		},
		beforeCreate: function() {
			document.title = "直播间";
		},
		created: function() {

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
			this.loadCustomerDataRequest();
			this.pageLoadOk = true;
		},
		mounted: function() {
			// 添加滚动事件，检测滚动到页面底部
			window.addEventListener('scroll', this.scrollBottom);
		},
		methods: {

			scrollBottom(event) {

				let scrollTop = document.body.scrollTop;

				// 滚动到页面底部时 && 请求加载已完成 && 还有下一页的数据；
				if ((((window.screen.height + scrollTop) >= (document.body.scrollHeight)) && this.requestLoadingFinished &&
						this.hasMoreDataFlag)) {
					this.requestLoadingFinished = false;
					this.pageNumber++;

					this.loadCustomerDataRequest();
				}
			},
			goProductDetailAction: function(item) {
				const roomId = item.roomId;
				this.$router.push({
					path: '/editLiveInfo?roomId=' + roomId
				})
			},
			tappedAddBtn:function(){
				this.$router.push({
					path: '/editLiveInfo'
				})
			},
			tappedEditBtn:function(item){
				const roomId = item.roomId;
				this.$router.push({
					path: '/editLiveInfo?roomId=' + roomId
				})
			},
			tappedOperationBtn: function(item) {
				const roomId = item.roomId;
				var loading = this.$weui.loading('加载中');
				let t = this;
				this.$http.post(this.$ymAPI.operationLiveRoomOffline, this.$netManager.getRequestParams({
					room_id: roomId,
					offline: item.offline == 1 ? 0 : 1
				})).then(function(response) {
					if (loading) {
						loading.hide();
					}

					let dataDic = response.data;
					if (dataDic.status == 1) {
						t.loadCustomerDataRequest();
					}
				}).catch(function(error) {
					console.log(error);
				});
			},

			//加载数据请求
			loadCustomerDataRequest: function() {
				this.execBaseCustomerRequest(this.$ymAPI.managerLiveList, "rooms");
			},

			execBaseCustomerRequest: function(url, listKey) {

				var loading = null;
				if (this.pageNumber == 1) {
					loading = this.$weui.loading('加载中');
					this.ymPageListStart = 0;
				}
				let pageVue = this; //this在不同的作用域中指向的对象不同；临时存储vue对象

				this.$http.post(url, this.$netManager.getRequestParams({
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
						
					} else {
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
		}
	}
</script>

<style scoped>
	/*公用*/
	.weui-media-box__title {
		font-size: 0.875rem;
		color: rgb(51, 51, 51);
	}

	.weui-media-box {
		padding: 0;
		margin-bottom: 0.625rem;
	}

	.weui-media-box-zeroPadding {
		padding: 0;
	}

	.page__hd{
		padding-top: 0.625rem;
		padding-bottom: 0.625rem;
	}

	.weui-loadmore span {
		background-color: rgb(240, 241, 245);
		background: rgb(240, 241, 245);
	}

	.page,
	body,
	.weui-panel {
		background-color: rgb(240, 241, 245);
		/* padding-bottom: 4rem;
		box-sizing: border-box; */
	}
	
	/* .page{
		padding-bottom: 0;
		box-sizing: border-box;
	} */

	.weui-panel__bd {
		background-color: rgb(240, 241, 245);
		 
	}

	.weui-panel__hd {
		background-color: white;
	}

	.pannel_bd_padding {
		padding: 0.625rem 0.625rem 0;
	}

	.pannel_bd_paddingZero {
		padding: 0;
	}

	.pannel_bd_paddingLog {
		padding: 0.625rem 0 0;
	}

	/* 商品*/
	.productCell {
		background-color: white;
		padding: 0.6375rem 0.6375rem 0;
		border-radius: 0.25rem;
	}

	.productContainer {
		margin-top: 0.625rem;
		height: 5.25rem;
		display: flex;
		box-sizing: border-box;
		background-color: #F9F9F9;
		padding: 0.1875rem;
	}

	.productDescContainer {
		display: flex;
		flex-direction: column;
		margin-left: 0.575rem;
		height: 100%;
	}

	.productICon {
		width: 100%;
		height: 100%;
	}

	.productIConContainer {
		width: 7rem;
		height: 100%;
	}

	.productTitle {
		color: rgb(51, 51, 51);
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.productSkuDesc {
		color: rgb(153, 153, 153);
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.shopInfo {
		height: 1.79375rem;
		border-bottom: 0.5px solid #EEEEEE;
		font-size: 0;
	}

	.productFooter {
		padding: 0.625rem;
		box-sizing: border-box;
		justify-content: flex-end;
	}

	.shopICon {
		height: 1.125rem;
		width: 1.125rem;
	}

	.orderStatus {
		font-size: 0.875rem;
	}

	.shopNameLabel {
		font-size: 1rem;
		color: rgb(51, 51, 51);
		margin-left:0.1875rem;
	}

	.shopNameContainer {
		justify-content: flex-start;
	}

	.totalMoneyDesc {
		font-size: 0.875rem;
		color: rgb(51, 51, 51);
	}

	.totalMoney {
		font-size: 1rem;
		color: rgb(51, 51, 51);
	}
 
	.productItemTotalMoney {
		font-size: 1rem;
		color: rgb(51, 51, 51);
		font-weight: bolder;
	}

	.tagLabel {
		padding: 0 0.9375rem;
		height: 1.875rem;
		line-height: 1.875rem;
		color: white;
		margin-left: 0.9375rem;
		border-radius: 0.25rem;
		box-sizing: border-box;
		border-width: 0;
	}

	.page {
		display: none;
		width: 100%;
	}

	.weui-panel:after {
		border-bottom: 0;
	}
	
	/* .weui-form__opr-area1{
		position: fixed;
		bottom: 0;
		padding-top: 0.625rem;
		padding-bottom: 4.625rem;
		height: 7.75rem;
		box-sizing: border-box;
		background-color: white;
		left: 0;
		right: 0;
		height:3.125rem;
	} */
	.weui-btn_primary {
		background-color: #44A6FF;
	}
	.weui-btn_primary:not(.weui-btn_disabled):active {
		background-color: #227BFF;
	}
</style>
