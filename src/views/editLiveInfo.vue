<template>
	<!-- 温馨提示：onInput 事件实时监听input值的变化 -->
	<div class="page" id="PageContainer">
		<div class="weui-form">
			<div class="weui-form__control-area">
				<!-- 控制区域 -->
				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">直播间信息</div>
					<div class="weui-cells weui-cells_form">
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">名称</label></div>
							<div class="weui-cell__bd">
								<input type="text" v-model.trim="name" class="weui-input" placeholder="请填写直播间名称" />
							</div>
						</div>
					 
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">直播间ID</label></div>
							<div class="weui-cell__bd" style="display: flex;">
								<input v-model="miniAppRoomId" class="weui-input" type="text"  pattern="[0-9]*" placeholder="请填写小程序直播房间ID"
								 maxlength="20" />
								<!-- <button :click.sync="clearCardNumberFieldText" class="weui-btn_reset weui-btn_icon weui-btn_input-clear">
									<i class="weui-icon-clear"></i>
								</button> -->
							</div>
						</div>
						
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">开播时间</label></div>
							<div class="weui-cell__bd">
								<datetime input-class ="weui-input"   placeholder="选择开播时间"  format="yyyy-MM-dd HH:mm" type="datetime" v-model="beginDatetime"  :minute-step="15"
  :max-datetime="endDatetime">
  </datetime>
							</div>
						</div>
						
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
							<div class="weui-cell__bd">
								 <datetime input-class ="weui-input" :min-datetime="beginDatetime"  :minute-step="15"  placeholder="选择结束时间" format="yyyy-MM-dd HH:mm" type="datetime" v-model="endDatetime"></datetime>
							</div>
						</div>
					</div>
				</div>
			 
				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">直播封面</div>
					<div class="weui-cells weui-cells_form" id="uploader">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<div class="weui-uploader">
									<div class="weui-uploader__bd">
										<ul class="weui-uploader__files1" id="uploaderFiles"  v-on:click="prevImageAction" >
											<li class="weui-uploader__file weui-uploader__file_status" v-for="(item,index) in imageSources"
 				 v-bind:key="index" :data-id="index+1" v-bind:style="{backgroundImage:'url(' + item.url + ')'}">
				     <!-- <div class="weui-uploader__file-content">
							<i class="weui-icon-warn"></i>
					  </div> -->
				   </li>
										</ul>
										<div class="weui-uploader__input-box" >
											<input id="uploaderInput"  class="weui-uploader__input" type="file" accept="image/*" multiple="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			 
			<div class="weui-form__opr-area">
				<!-- 操作按钮 -->
				<a href="javascript:;" class="weui-btn" v-bind:class="allHasFillFlag?'weui-btn_primary':'weui-btn_disabled'"
				 v-on:click="tappedSaveBtn">{{bAddLiveFlag?'添加':'保存'}}</a>
				<a href="javascript:;" class="weui-btn weui-btn_warn" v-if="!bAddLiveFlag"  v-on:click="tappedDeleteBtn">删除</a> 
			</div>
		 
		</div>
	</div>
</template>

<script>
	import weui from 'weui.js' //weuiJs
	import $ from 'jquery'
	import { Datetime } from 'vue-datetime'
	import moment from "moment";
	
	export default {
		name: 'EditLiveInfo',
		components: {
			Datetime	
		},
		data() {
			return {
				name: '',
				miniAppRoomId: '',
				allHasFillFlag: true,
				roomId:'', 
				beginDatetime:null,
			    endDatetime:null, 
				liveRoom:null,
				imageSources:[], //图片url
				
				liveCoverUrl:'',
				bAddLiveFlag:true
			}
		},
		watch: {
			 
		},
		created:function(ops){
			document.title = "直播间详情";
			this.roomId = this.$netManager.getUrlKey("roomId");
			if(this.roomId && this.roomId != null && this.roomId.length >0){
				this.bAddLiveFlag = false;
			}
			this.requestLiveRoomInfo();
		},
		 
		beforeCreate() {
			let  hasRoomId = this.$netManager.getUrlKey("roomId");
			if(hasRoomId && hasRoomId != null && hasRoomId.length >0){
				document.title = "编辑直播";
			}else{
				document.title = "添加直播";
			}
		},
			
		mounted:function(){
			let t = this;
			var weuiLoading = null;
			weui.uploader('#uploader', {
			   url: this.$http.defaults.baseURL +'/upload/image/',
			   auto: true,
			   type: 'file', //file类型，base64类型
			   fileVal: 'file', //文件上传域的name
			   compress: {
			       width: 1600,
			       height: 1600,
			       quality: 0.65
			   },
			   onBeforeQueued: function(files) {
			       // `this` 是轮询到的文件, `files` 是所有文件
					 
			       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
			           weui.topTips('请上传图片');
			           return false; // 阻止文件添加
			       }
			       if(this.size > 10 * 1024 * 1024){
			           weui.topTips('请上传不超过10M的图片');
			           return false;
			       }
			       if (files.length > 1) { // 防止一下子选择过多文件
			           weui.topTips('只能上传1张图片，请重新选择');
			           return false;
			       }
			
			       // return true; // 阻止默认行为，不插入预览图的框架
			   },
			   onQueued: function(){
				    // console.log("上传onQueued");
					 t.imageSources = [this];
					 weuiLoading = t.$weui.loading('上传中');
			       // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
			       // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
			
			       // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
			       // this.stop(); // 中断上传
			
			       // return true; // 阻止默认行为，不显示预览图的图像
			   },
			   onBeforeSend: function(data, headers){
				     console.log("上传onBeforeSend");
			       console.log(this, data);
				   t.imageSources = [this];
				   
				 //    $.extend(headers, {'Content-Type':'multipart/form-data'});
					// $.extend(headers, {'name':'file'});
					// console.log(headers);

			       // $.extend(data, { name: "file"}); // 可以扩展此对象来控制上传参数
			       // $.extend(headers, {'Content-Disposition': 'form-data; name=file;filename='+this.name,'Content-Type':this.type}); // 可以扩展此对象来控制上传头部
					// $.extend(headers, {'file':this});
			       // return false; // 阻止文件上传
			   },
			   onProgress: function(procent){
				   t.imageSources = [this];
				   console.log("上传onProgress");
				   console.log(this.status);
			       console.log(this, procent);
			       // return true; // 阻止默认行为，不使用默认的进度显示
			   },
			   onSuccess: function (ret) {
				   weuiLoading.hide();
				   console.log("上传成功");
				   t.imageSources = [this];
				   console.log(this.status);
			       console.log(this, ret);
				   if(ret.status == 1){
					    t.liveCoverUrl = ret.data.url;
				   }
			       // return true; // 阻止默认行为，不使用默认的成功态
			   },
			   onError: function(err){
				   weuiLoading.hide();
				   console.log("上传失败");
				   t.imageSources = [this];
				   console.log(this.status);
			    //    console.log(this, err);
			       // return true; // 阻止默认行为，不使用默认的失败态
			   }
			});
		},
		methods: {

			blurTextFieldProcess:function(e){
				console.log(e);
			},
			clearCardNumberFieldText:function() {
				 
				this.miniAppRoomId = '';
			},
			tappedDeleteBtn: function() {
			
				let t = this;
				this.$weui.confirm('', function() {
			
					var loading = t.$weui.loading('加载中');
					t.$http.post(t.$ymAPI.deleteLiveRoom, t.$netManager.getRequestParams({
						room_id: t.roomId
					})).then(function(response) {
						if (loading) {
							loading.hide();
						}
							
						let dataDic = response.data;
						if (dataDic.status == 1) {
							t.$weui.toast('已删除', 1500);
							t.$router.back();
						}
					}).catch(function(error) {
						loading.hide();
						console.log(error);
					});
			
				}, function() {
					console.log('no')
				}, {
					title: '确定要删除这个直播？'
				});
			},
			tappedSaveBtn: function() {

				 if (this.name.length == 0) {
				 	this.$weui.topTips('请填写直播间名称');
				 	return;
				 }
				 
				if (this.miniAppRoomId.length == 0) {
					this.$weui.topTips('请填写直播间ID');
					return;
				}
				
				if (this.beginDatetime == null || this.beginDatetime =='') {
					this.$weui.topTips('请选择开播时间');
					return;
				}

				if (this.endDatetime == null || this.endDatetime =='') {
					this.$weui.topTips('请选择结束时间');
					return;
				}
				
				if(this.imageSources.length == 0){
					this.$weui.topTips('请上传直播封面');
					return;
				}
				
				if(this.liveCoverUrl.length == 0){
					this.$weui.topTips('请上传直播封面');
					return;
				}
				
				let begninTime = moment(this.beginDatetime).valueOf();
				let endTime = moment(this.endDatetime).valueOf();
				
				var loading = this.$weui.loading('加载中');
				let t = this;
				
				let liveCover = t.liveCoverUrl;
				
				var apiUrl = this.$ymAPI.updateLiveRoomInfo;
				if(t.bAddLiveFlag){
					apiUrl = this.$ymAPI.createLiveRoom;
				}
				
				const formData = Object.assign({},{
				  begin: begninTime,
				  end: endTime,
				  name: t.name,
				  room_mode:2,
				  mini_app_room_id:t.miniAppRoomId,
				  cover: liveCover	
				},!t.bAddLiveFlag?{room_id: this.roomId}:{});
				
				this.$http.post(apiUrl, this.$netManager.getRequestParams(formData)).then(function(response) {
					if (loading) {
						loading.hide();
					}
							
					let dataDic = response.data;
					if (dataDic.status == 1) {
						// if(t.bAddLiveFlag){
						// 	t.$weui.toast('保存成功', 1500);
						// }else{
						// 	t.$weui.toast('保存成功', 1500);
						// }
						
						//返回之前的页面；
						t.$router.back();
					}
				}).catch(function(error) {
					loading.hide();
					console.log(error);
				});	
			},
			 
			//加载用户基本信息
			requestLiveRoomInfo: function() {
				var loading = this.$weui.loading('加载中');
				let pageVue = this;
					 
				this.$http.post(this.$ymAPI.liveRoomDetail, this.$netManager.getRequestParams({
					room_id: this.roomId
			
				})).then(function(response) {
					if (loading) {
						loading.hide();
					}
			
					let dataDic = response.data;
					if (dataDic.status == 1) {
			
						var resultData = dataDic.data;
						let liveRoom = resultData.room;
						
						pageVue.name = liveRoom.name;
						pageVue.miniAppRoomId = liveRoom.miniAppRoomId;
						
						if(liveRoom.begin > 0){
							pageVue.beginDatetime = moment(liveRoom.begin).format();
						}
						if(liveRoom.end > 0){
							pageVue.endDatetime = moment(liveRoom.end).format();
						}
						if(liveRoom.cover && liveRoom.cover.length > 0){
							pageVue.liveCoverUrl = liveRoom.cover;
							pageVue.imageSources = [{url:liveRoom.cover}];
						}
						
						pageVue.allHasFillFlag = (pageVue.name.length > 0 && pageVue.miniAppRoomId.length > 0) ?
							true : false;
					}
				}).catch(function(error) {
					loading.hide();
					console.log(error);
				});
			},
			prevImageAction: function(e) {
				//预览图片
			 
				var target = e.target;
				let t = this;
				if(target.className.indexOf('weui-icon-warn') >= 0){
					weui.actionSheet([
					    {
					        label: '删除',
					        onClick: function () {
								t.imageSources = [];
					        }
					    }
					]);
					return;
				}
			 
				let imgObj = t.imageSources[0];
				var gallery = this.$weui.gallery(imgObj.url, {
					onDelete: function() {
						weui.confirm('确定删除该图片？', function() {
							 t.imageSources = [];
							 gallery.hide();
						});
					}
				});
			},
			// textFieldChangeAction: function(e) {

			// 	this.allHasFillFlag = (this.name.length > 0 && this.miniAppRoomId.length > 0) ?
			// 		true : false;
			// },
		}
	}
</script>

<style>
	.page,
	body {
		background-color: white;
	}

	.weui-form__tips-area {
		text-align: center;
	}

	.weui-footer {
		margin-top: 3.125rem;
		margin-bottom: 1.25rem;
		width: 100%;
	}

	/* 主题色 */
	.weui-btn_primary {
		background-color: #44A6FF;
	}

	.weui-btn_primary:not(.weui-btn_disabled):active {
		background-color: #227BFF;
	}

	/* 禁用的颜色 */
	.weui-cell_readonly input.weui-input {
		color: rgb(102, 102, 102);
	}

	.weui-uploader__file_status:before {
		background-color: rgba(0,0,0,0);
	}
	
	.page {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.weui-form {
		padding-top: 0;
		min-height: auto;
		padding-bottom: 0;
	}
	
	.weui-form__opr-area {
		margin-top: 0
	}
	.weui-form__control-area {
		margin-top: 1.25rem;
		flex: 0;
	}
</style>
