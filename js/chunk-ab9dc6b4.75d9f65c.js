(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ab9dc6b4"],{2743:function(e,t,i){},"2da8":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page",attrs:{id:"PageContainer"}},[i("div",{staticClass:"weui-form"},[i("div",{staticClass:"weui-form__control-area"},[i("div",{staticClass:"weui-cells__group weui-cells__group_form"},[i("div",{staticClass:"weui-cells__title"},[e._v("直播间信息")]),i("div",{staticClass:"weui-cells weui-cells_form"},[i("div",{staticClass:"weui-cell"},[e._m(0),i("div",{staticClass:"weui-cell__bd"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],staticClass:"weui-input",attrs:{type:"text",placeholder:"请填写直播间名称"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),i("div",{staticClass:"weui-cell"},[e._m(1),i("div",{staticClass:"weui-cell__bd",staticStyle:{display:"flex"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.miniAppRoomId,expression:"miniAppRoomId"}],staticClass:"weui-input",attrs:{type:"text",pattern:"[0-9]*",placeholder:"请填写小程序直播房间ID",maxlength:"20"},domProps:{value:e.miniAppRoomId},on:{input:function(t){t.target.composing||(e.miniAppRoomId=t.target.value)}}})])]),i("div",{staticClass:"weui-cell"},[e._m(2),i("div",{staticClass:"weui-cell__bd"},[i("datetime",{attrs:{"input-class":"weui-input",placeholder:"选择开播时间",format:"yyyy-MM-dd HH:mm",type:"datetime","minute-step":15,"max-datetime":e.endDatetime},model:{value:e.beginDatetime,callback:function(t){e.beginDatetime=t},expression:"beginDatetime"}})],1)]),i("div",{staticClass:"weui-cell"},[e._m(3),i("div",{staticClass:"weui-cell__bd"},[i("datetime",{attrs:{"input-class":"weui-input","min-datetime":e.beginDatetime,"minute-step":15,placeholder:"选择结束时间",format:"yyyy-MM-dd HH:mm",type:"datetime"},model:{value:e.endDatetime,callback:function(t){e.endDatetime=t},expression:"endDatetime"}})],1)])])]),i("div",{staticClass:"weui-cells__group weui-cells__group_form"},[i("div",{staticClass:"weui-cells__title"},[e._v("直播封面")]),i("div",{staticClass:"weui-cells weui-cells_form",attrs:{id:"uploader"}},[i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__bd"},[i("div",{staticClass:"weui-uploader"},[i("div",{staticClass:"weui-uploader__bd"},[i("ul",{staticClass:"weui-uploader__files1",attrs:{id:"uploaderFiles"},on:{click:e.prevImageAction}},e._l(e.imageSources,(function(e,t){return i("li",{key:t,staticClass:"weui-uploader__file weui-uploader__file_status",style:{backgroundImage:"url("+e.url+")"},attrs:{"data-id":t+1}})})),0),e._m(4)])])])])])])]),i("div",{staticClass:"weui-form__opr-area"},[i("a",{staticClass:"weui-btn",class:e.allHasFillFlag?"weui-btn_primary":"weui-btn_disabled",attrs:{href:"javascript:;"},on:{click:e.tappedSaveBtn}},[e._v(e._s(e.bAddLiveFlag?"添加":"保存"))]),e.bAddLiveFlag?e._e():i("a",{staticClass:"weui-btn weui-btn_warn",attrs:{href:"javascript:;"},on:{click:e.tappedDeleteBtn}},[e._v("删除")])])])])},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("名称")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("直播间ID")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("开播时间")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("结束时间")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"weui-uploader__input-box"},[i("input",{staticClass:"weui-uploader__input",attrs:{id:"uploaderInput",type:"file",accept:"image/*",multiple:""}})])}],l=(i("c975"),i("b0c0"),i("57c4")),o=i.n(l),n=(i("1157"),i("859b")),u=i("c1df"),r=i.n(u),c={name:"EditLiveInfo",components:{Datetime:n["Datetime"]},data:function(){return{name:"",miniAppRoomId:"",allHasFillFlag:!0,roomId:"",beginDatetime:null,endDatetime:null,liveRoom:null,imageSources:[],liveCoverUrl:"",bAddLiveFlag:!0}},watch:{},created:function(e){document.title="直播间详情",this.roomId=this.$netManager.getUrlKey("roomId"),this.roomId&&null!=this.roomId&&this.roomId.length>0&&(this.bAddLiveFlag=!1),this.requestLiveRoomInfo()},beforeCreate:function(){var e=this.$netManager.getUrlKey("roomId");e&&null!=e&&e.length>0?document.title="编辑直播":document.title="添加直播"},mounted:function(){var e=this,t=null;o.a.uploader("#uploader",{url:this.$http.defaults.baseURL+"/upload/image/",auto:!0,type:"file",fileVal:"file",compress:{width:1600,height:1600,quality:.65},onBeforeQueued:function(e){return["image/jpg","image/jpeg","image/png","image/gif"].indexOf(this.type)<0?(o.a.topTips("请上传图片"),!1):this.size>10485760?(o.a.topTips("请上传不超过10M的图片"),!1):e.length>1?(o.a.topTips("只能上传1张图片，请重新选择"),!1):void 0},onQueued:function(){e.imageSources=[this],t=e.$weui.loading("上传中")},onBeforeSend:function(t,i){console.log("上传onBeforeSend"),console.log(this,t),e.imageSources=[this]},onProgress:function(t){e.imageSources=[this],console.log("上传onProgress"),console.log(this.status),console.log(this,t)},onSuccess:function(i){t.hide(),console.log("上传成功"),e.imageSources=[this],console.log(this.status),console.log(this,i),1==i.status&&(e.liveCoverUrl=i.data.url)},onError:function(i){t.hide(),console.log("上传失败"),e.imageSources=[this],console.log(this.status)}})},methods:{blurTextFieldProcess:function(e){console.log(e)},clearCardNumberFieldText:function(){this.miniAppRoomId=""},tappedDeleteBtn:function(){var e=this;this.$weui.confirm("",(function(){var t=e.$weui.loading("加载中");e.$http.post(e.$ymAPI.deleteLiveRoom,e.$netManager.getRequestParams({room_id:e.roomId})).then((function(i){t&&t.hide();var a=i.data;1==a.status&&(e.$weui.toast("已删除",1500),e.$router.back())})).catch((function(e){t.hide(),console.log(e)}))}),(function(){console.log("no")}),{title:"确定要删除这个直播？"})},tappedSaveBtn:function(){if(0!=this.name.length)if(0!=this.miniAppRoomId.length)if(null!=this.beginDatetime&&""!=this.beginDatetime)if(null!=this.endDatetime&&""!=this.endDatetime)if(0!=this.imageSources.length)if(0!=this.liveCoverUrl.length){var e=r()(this.beginDatetime).valueOf(),t=r()(this.endDatetime).valueOf(),i=this.$weui.loading("加载中"),a=this,s=a.liveCoverUrl,l=this.$ymAPI.updateLiveRoomInfo;a.bAddLiveFlag&&(l=this.$ymAPI.createLiveRoom);var o=Object.assign({},{begin:e,end:t,name:a.name,room_mode:2,mini_app_room_id:a.miniAppRoomId,cover:s},a.bAddLiveFlag?{}:{room_id:this.roomId});this.$http.post(l,this.$netManager.getRequestParams(o)).then((function(e){i&&i.hide();var t=e.data;1==t.status&&a.$router.back()})).catch((function(e){i.hide(),console.log(e)}))}else this.$weui.topTips("请上传直播封面");else this.$weui.topTips("请上传直播封面");else this.$weui.topTips("请选择结束时间");else this.$weui.topTips("请选择开播时间");else this.$weui.topTips("请填写直播间ID");else this.$weui.topTips("请填写直播间名称")},requestLiveRoomInfo:function(){var e=this.$weui.loading("加载中"),t=this;this.$http.post(this.$ymAPI.liveRoomDetail,this.$netManager.getRequestParams({room_id:this.roomId})).then((function(i){e&&e.hide();var a=i.data;if(1==a.status){var s=a.data,l=s.room;t.name=l.name,t.miniAppRoomId=l.miniAppRoomId,l.begin>0&&(t.beginDatetime=r()(l.begin).format()),l.end>0&&(t.endDatetime=r()(l.end).format()),l.cover&&l.cover.length>0&&(t.liveCoverUrl=l.cover,t.imageSources=[{url:l.cover}]),t.allHasFillFlag=t.name.length>0&&t.miniAppRoomId.length>0}})).catch((function(t){e.hide(),console.log(t)}))},prevImageAction:function(e){var t=e.target,i=this;if(t.className.indexOf("weui-icon-warn")>=0)o.a.actionSheet([{label:"删除",onClick:function(){i.imageSources=[]}}]);else var a=i.imageSources[0],s=this.$weui.gallery(a.url,{onDelete:function(){o.a.confirm("确定删除该图片？",(function(){i.imageSources=[],s.hide()}))}})}}},d=c,m=(i("9fd5"),i("2877")),p=Object(m["a"])(d,a,s,!1,null,null,null);t["default"]=p.exports},"9fd5":function(e,t,i){"use strict";var a=i("2743"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-ab9dc6b4.75d9f65c.js.map