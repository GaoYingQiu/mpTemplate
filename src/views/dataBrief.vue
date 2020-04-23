<template>
	<div class="page">
		<div class="containerItem" v-for="(infor, i) in inforCardDataList" :key="`infor-${i}`">
			<div class="cardItem">
				<label class="count-style">{{ infor.indicator }}</label>
				<label class="descLab">{{ infor.desc }}</label>
			</div>
	    </div> 
		<div class="footer" style="width: 80%;flex-wrap: wrap;display: flex;margin-top: 10px;">
			<!-- <label>{{'1.0.1: '+locationUrl}}</label> -->
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'dataBrief',
		data() {
			return {
				inforCardDataList:[],
				locationUrl:''
			}
		},
		created: function(e) {
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
			this.loadInfoCardList();
			this.locationUrl = window.location.href;
		},
		
		beforeCreate: function() {
			document.title = "数据简报";
		},
		methods: {
			
		    loadInfoCardList:function(){
				var loading = this.$weui.loading('加载中');
				let t = this;
				this.$http.post(this.$ymAPI.dashboardIndicator, this.$netManager.getRequestParams({
				})).then(function(response) {
					if (loading) {
						loading.hide();
					}
					let dataDic = response.data;
					if (dataDic.status == 1) {
						t.inforCardDataList = dataDic.data.items;
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style>
	.count-style {
	  font-size: 30px;
	}
	.descLab{
	  font-size: 0.9375rem;
	  color: #666666;
	}
	
	.page{
		width: 100%;
		height: 100%;
		background: #F0F1F5;
		padding-top: 0.625rem;
		display: flex;
		flex-wrap: wrap;
		align-content:flex-start;
		padding-bottom: 0.9375rem;
		box-sizing: border-box;
	}
	
	.containerItem{
		width: 50%;
		height: 6.25rem;
		margin-top: 0.625rem;
		box-sizing: border-box;
	}
	
	.containerItem:nth-child(odd){
		padding-left: 0.625rem;
		padding-right: 0.3125rem;
	}
	
	.containerItem:nth-child(even){
		padding-left: 0.3125rem;
		padding-right: 0.625rem;
	}
	
	.cardItem{
		background-color: white;
		height: 100%;
		width: 100%;
		overflow: hidden;
		box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
		border-radius: 4px;
		transition: all .2s ease-in-out;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.footer{
		height: 4.625rem;
		width: 100%;
	}
	
</style>
