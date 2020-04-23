<template>
	<!-- 温馨提示：onInput 事件实时监听input值的变化 -->
	<div class="page" id="PageContainer">
		<div class="weui-form">
			<div class="weui-form__text-area">
				<!-- 头部区域 -->
			</div>
			<div class="weui-form__control-area">
				<!-- 控制区域 -->
				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">分组标题</div>
					<div class="weui-cells weui-cells_form">
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">昵称</label></div>
							<div class="weui-cell__bd">
								<input type="text" v-model.trim="name" class="weui-input" placeholder="请填写你的微信昵称" v-on:input="textFieldChangeAction" />
							</div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">手机号码</label></div>
							<div class="weui-cell__bd">
								<input type="number" name="phoneNumber" v-model="phoneNumber" v-on:input="textFieldChangeAction" maxlength="11"
								 class="weui-input" placeholder="请填写你的手机号码" />
							</div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">卡号</label></div>
							<div class="weui-cell__bd" style="display: flex;">
								<input v-model="cardId" class="weui-input" autofocus type="text" pattern="[0-9]*" placeholder="请输入16位数卡号"
								 maxlength="16" v-on:input="textFieldChangeAction" />
								<button v-on:click="clearCardNumberFieldText" class="weui-btn_reset weui-btn_icon weui-btn_input-clear">
									<i class="weui-icon-clear"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">只读置灰</div>
					<div class="weui-cells weui-cells_form">
						<div class="weui-cell weui-cell_readonly">
							<div class="weui-cell__hd"><label class="weui-label">账号id</label></div>
							<div class="weui-cell__bd">
								<input type="text" class="weui-input" value="idqiugaoying94" disabled />
							</div>
						</div>
					</div>
				</div>

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">多选店铺类型</div>
					<div class="weui-cells weui-cells_checkbox">
						<label class="weui-cell weui-check__label" for="s11">
							<div class="weui-cell__hd">
								<input type="checkbox" class="weui-check" value="11" v-model="shopTypes" id="s11" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								<p>木地板</p>
							</div>
						</label>
						<label class="weui-cell weui-check__label" for="s12">
							<div class="weui-cell__hd">
								<input type="checkbox" v-model="shopTypes" value="12" class="weui-check" id="s12" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								<p>橱柜</p>
							</div>
						</label>
						<label class="weui-cell weui-check__label" for="s13">
							<div class="weui-cell__hd">
								<input type="checkbox" v-model="shopTypes" value="13" class="weui-check" id="s13" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								<p>油漆</p>
							</div>
						</label>
					</div>
				</div>

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">单选角色类型</div>
					<div class="weui-cells weui-cells_radio">
						<label class="weui-cell weui-check__label" for="x11">
							<div class="weui-cell__bd">
								<p>设计师</p>
							</div>
							<div class="weui-cell__ft">
								<input type="radio" class="weui-check" v-model="roleStr" value="designer" name="radio1" id="x11" />
								<span class="weui-icon-checked"></span>
							</div>
						</label>
						<label class="weui-cell weui-check__label" for="x12">
							<div class="weui-cell__bd">
								<p>程序员</p>
							</div>
							<div class="weui-cell__ft">
								<input type="radio" name="radio1" v-model="roleStr" value="programer" class="weui-check" id="x12" />
								<span class="weui-icon-checked"></span>
							</div>
						</label>
					</div>
				</div>


				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">选择项</div>
					<div class="weui-cells">
						<div class="weui-cell weui-cell_access" id="showDatePicker" v-on:click="showDatePickerAction">
							<div class="weui-cell__hd"><label class="weui-label">入职日期</label></div>
							<div class="weui-cell__bd">{{selectedDateStr}}</div>
							<div class="weui-cell__ft"></div>
						</div>
						<div class="weui-cell weui-cell_access" v-on:click="showComonPickerAction">
							<div class="weui-cell__hd"><label class="weui-label">发票类型</label></div>
							<div class="weui-cell__bd">{{ticketItem? ticketItem.label:''}}</div>
							<div class="weui-cell__ft"></div>
						</div>
					</div>
				</div>

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">自我介绍</div>
					<div class="weui-cells weui-cells_form">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<textarea class="weui-textarea" v-on:input="textFieldAreaChangeAction" v-model="personalIntroduce" placeholder="请简单描述介绍一下你自己"
								 rows="3"></textarea>
								<div class="weui-textarea-counter"><span>{{personalIntroduce.length}}</span>/200</div>
							</div>
						</div>
					</div>
				</div>

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">商品图片</div>
					<div class="weui-cells weui-cells_form" id="uploader">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<div class="weui-uploader">
									<div class="weui-uploader__hd">
										<p class="weui-uploader__title">图片上传</p>
									</div>
									<div class="weui-uploader__bd">
										<ul class="weui-uploader__files" id="uploaderFiles"  v-on:click="prevImageAction"></ul>
										<div class="weui-uploader__input-box">
											<input id="uploaderInput"  class="weui-uploader__input" type="file" accept="image/*" multiple="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="weui-form__tips-area" style="margin-top: 20px;">
				<!-- <p class="weui-form__tips">提示区域文字</p> -->
			</div>
			<div class="weui-form__opr-area">
				<!-- 操作按钮 -->
				<a href="javascript:;" class="weui-btn" v-bind:class="allHasFillFlag?'weui-btn_primary':'weui-btn_disabled'"
				 v-on:click="tappedSaveBtn">保存</a>
			</div>
			<div class="weui-form__extra-area">

			</div>
		</div>
		<!-- 扩展区域 -->

		<!-- <div class="weui-footer">
			<p class="weui-footer__links">
				<a href="javascript:void(0);" class="weui-footer__link">云喵提供技术支持</a>
			</p>
			<p class="weui-footer__text">Copyright © 2008-2019 weui.io</p>
		</div> -->

	</div>
</template>

<script>
	import weui from 'weui.js' //weuiJs
	import $ from 'jquery'
	
	export default {
		name: 'prepareForm',
		components: {

		},
		data() {
			return {
				name: '',
				cardId: '0001111123',
				phoneNumber: '',
				shopTypes: [], //选择的店铺类型
				allHasFillFlag: false,
				roleStr: 'designer', //默认角色
				selectedDateStr: '', //显示日期
				selectedDateValue: '', //这个值是要提交的日期,
				ticketItem: null, //发票类型
				personalIntroduce: '', //自我介绍
				uploadCustomFileList: [], //图片文件
				uploadCount: 0
			}
		},
		watch: {
			roleStr: function(val) {
				console.log("选择角色:" + val);
			}
		},
		created:function(){
			
			// console.log(document.getElementById("uploader"));
		},
			
		mounted:function(){
			let t = this;
			weui.uploader('#uploader', {
			   url: 'http://localhost:8080',
			   auto: true,
			   type: 'file',
			   fileVal: 'fileVal',
			   compress: {
			       width: 1600,
			       height: 1600,
			       quality: .8
			   },
			   onBeforeQueued: function(files) {
			       // `this` 是轮询到的文件, `files` 是所有文件
					console.log(files);
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
			       if (t.uploadCount + 1 > 1) {
			           weui.topTips('最多只能上传1张图片');
			           return false;
			       }
			
			       t.uploadCount += 1;
			
			       // return true; // 阻止默认行为，不插入预览图的框架
			   },
			   onQueued: function(){
			       console.log(this);
			
			       // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
			       // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
			
			       // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
			       // this.stop(); // 中断上传
			
			       // return true; // 阻止默认行为，不显示预览图的图像
			   },
			   onBeforeSend: function(data, headers){
			       console.log(this, data, headers);
			       // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
			       // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
			
			       // return false; // 阻止文件上传
			   },
			   onProgress: function(procent){
			       console.log(this, procent);
			       // return true; // 阻止默认行为，不使用默认的进度显示
			   },
			   onSuccess: function (ret) {
			       console.log(this, ret);
			       // return true; // 阻止默认行为，不使用默认的成功态
			   },
			   onError: function(err){
			       console.log(this, err);
			       // return true; // 阻止默认行为，不使用默认的失败态
			   }
			});
		},
		methods: {

			//默认今天的时间
			defaultTodayDate: function() {
				var date = new Date();
				this.selectedDateValue = date.pattern("yyyy-MM-dd");
				this.selectedDateStr = date.pattern("yyyy年MM月dd日");
				//刚开始创建,vm.$data 还没有定义好。直接给this.数据属性赋值
			},
			clearCardNumberFieldText: function(e) {
				this.cardId = '';
				this.textFieldChangeAction(e);
			},
			tappedSaveBtn: function() {

				// weui.load
				if (this.phoneNumber.length != 11) {
					this.$weui.topTips('请填写正确的手机号');
					return;
				}
				if (this.cardId.length != 16) {
					this.$weui.topTips('请填写正确的卡号');
					return;
				}

				if (this.shopTypes.length == 0) {
					this.$weui.topTips('请选择店铺类型');
					return;
				}
				if (!this.ticketItem) {
					this.$weui.topTips('请选择发票类型');
					return;
				}

				this.$weui.toast('保存成功', 2000);
			},
			 
			uploaderInputChange:function(e){
				e.target.files.forEach(function(file) {
					console.log("选择了文件");
					console.log(file);
					
				});
			},
			
			processWhileFlag:function(target){
				let flag = false;
				let arr = target.classList;
				if (arr instanceof Array){
					arr.forEach(function(v){
						console.log("v:"+v);
						// if(v == 'weui-uploader__file'){
						// 	console.log("找到了");
						// 	return true;
						// } 
					});
				}
				return flag;
			},
		 
			prevImageAction: function(e) {
				//预览图片
			 
				var target = e.target;
				let t = this;
				 
				if(target.className.indexOf('weui-icon-warn') == 0){
					weui.actionSheet([
					    {
					        label: '删除',
					        onClick: function () {
					             target.parentNode.parentNode.remove();
								 t.uploadCount -= 1;
					        }
					    }, {
					        label: '重新上传',
					        onClick: function () {
					          
					        }
					    }
					]);
					return;
				}
				 
				if(!target){
					console.log("需要直接删除");
					return
				}
				
				var url = target.url;
				var id = target.data - id;
				// var imageArr = this.uploadCustomFileList;
				// console.log(imageArr.length);
				 
				var gallery = this.$weui.gallery(url, {
					onDelete: function() {
						weui.confirm('确定删除该图片？', function() {
							// var index;
							// for (var i = 0, len = imageArr.length; i < len; ++i) {
							// 	var file = imageArr[i];
							// 	if (file.id == id) {
							// 		index = i;
							// 		break;
							// 	}
							// }
							// if (index !== undefined) {
							// 	imageArr.splice(index, 1);
							// }

							// t.uploadCustomFileList = imageArr;
							target.remove();
							t.uploadCount -= 1;
							gallery.hide();
						});
					}
				});
			},
			textFieldChangeAction: function(e) {
				if (e.target.name == 'phoneNumber') {
					if (this.phoneNumber.length > 11) {
						this.phoneNumber = this.phoneNumber.slice(0, 11);
					}
				}

				this.allHasFillFlag = (this.name.length > 0 && this.cardId.length == 16 && this.phoneNumber.length == 11) ?
					true : false;
			},

			//控制输入字数
			textFieldAreaChangeAction: function() {
				if (this.personalIntroduce.length > 200) {
					this.personalIntroduce = this.personalIntroduce.slice(0, 200);
				}
			},
			showDatePickerAction: function() {
				//weUI 显示日期控件
			   let that = this;
			   this.$weui.datePicker({
					start: '2018-12-31',
					end: '2030-12-29',
					/**
					 * https://zh.wikipedia.org/wiki/Cron
					 * cron 表达式后三位
					 * 示例：
					 *  * * *                每天
					 *  5 * *                每个月的5日
					 *  1-10 * *             每个月的前10日
					 *  1,5,10 * *           每个月的1号、5号、10号
					 *  *\ /2 * *             每个月的 1、3、5、7...日，注意写的时候斜杠“/”前面没有反斜杠“\”，这是因为是注释所以需要转义
					 *  * 2 0                2月的每个周日
					 *  * * 0,6              每个周末
					 *  * * 3                每周三
					 */
					// cron: '* */2 0', //每个月的1，3，5，7
					cron: '* * *',
					defaultValue: [2019, 11, 11],
					onChange: function(result) {
						// console.log(result);
					},
					onConfirm: function(result) {

						//记录界面显示的2019年1月1日；记录2019-01-01数据；
						var chooseDateStr = '';
						var dateArr = Array();
						for (var i = 0; i < result.length; i++) {
							let item = result[i];
							chooseDateStr += item.label;
							dateArr.push(item.value);
						}
						this.selectedDateValue = dateArr.join("-");
						that.selectedDateStr = chooseDateStr;
					},
					id: 'datePicker',
					title: '选择入职日期'
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
				
				let that = this;
				this.$weui.picker(dataArr, {
					defaultValue: [2],
					className: 'custom-classname',
					onChange: function(result) {},
					onConfirm: function(result) {
						if (result.length) {
							that.ticketItem = result[0];
						}
					},
					id: 'picker',
					title: '单列选择器'
				});
			}
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

	.page {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
