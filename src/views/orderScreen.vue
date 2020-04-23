<template>
	<!-- 温馨提示：onInput 事件实时监听input值的变化 -->
	<div class="page" id="PageContainer">
		<div class="weui-form">

			<div class="weui-form__control-area">

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">时间范围</div>
					<div class="weui-cells">
						<div class="weui-cell weui-cell_access" v-on:click="showComonPickerAction">
							<div class="weui-cell__hd"><label class="weui-label">时间段</label></div>
							<div class="weui-cell__bd weui-cell__bd_right">{{ticketItem? ticketItem.label:''}}</div>
							<div class="weui-cell__ft"></div>
						</div>
						<div class="weui-cell weui-cell_access" v-on:click="showStartDatePickerAction">
							<div class="weui-cell__hd"><label class="weui-label">开始日期</label></div>
							<div class="weui-cell__bd weui-cell__bd_right">{{beginDateStr}}</div>
							<div class="weui-cell__ft"></div>
						</div>
						<div class="weui-cell weui-cell_access" v-on:click="showEndDatePickerAction">
							<div class="weui-cell__hd"><label class="weui-label">结束日期</label></div>
							<div class="weui-cell__bd weui-cell__bd_right">{{endDateStr}}</div>
							<div class="weui-cell__ft"></div>
						</div>
					</div>
				</div>

				<div class="weui-cells__group weui-cells__group_form">
					<div class="weui-cells__title">订单类型</div>
					<div class="weui-cells weui-cells_checkbox">
						<label class="radioItem weui-check__label" for="s11">
							<div class="weui-cell__hd">
								<input type="radio" class="weui-check" value="0" v-model="orderType" id="s11" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								全部
							</div>
						</label>
						<label class="weui-check__label radioItem" for="s12">
							<div class="weui-cell__hd">
								<input type="radio" v-model="orderType" value="1" class="weui-check" id="s12" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								<p>商品</p>
							</div>
						</label>
						<label class="radioItem weui-check__label" for="s13">
							<div class="weui-cell__hd">
								<input type="radio" v-model="orderType" value="6" class="weui-check" id="s13" />
								<i class="weui-icon-checked"></i>
							</div>
							<div class="weui-cell__bd">
								<p>代金券</p>
							</div>
						</label>
					</div>
				</div>

			</div>

			<!-- <div class="weui-form__tips-area" style="margin-top: 20px;">
				<p class="weui-form__tips">提示区域文字</p>
			</div> -->
			<div class="weui-form__opr-area">
				<!-- 操作按钮 -->
				<a href="javascript:;" class="weui-btn" v-bind:class="allHasFillFlag?'weui-btn_primary':'weui-btn_disabled'"
				 v-on:click="tappedActionBtn">查看数据</a>
			</div>
		   </div>
			<div class="weui-form__extra-area">
				<div class="weui-panel weui-panel_access" v-if="inforCardData">
					<div class="totalInfoCard">
						<div class="totalCardItem" v-bind:key="item.title"  v-for="item in inforCardData" >
							<label class="numberTotalCountLab">{{item.count}}</label>
							<label class="numberTotalDescLabl">{{item.title}}</label>
						</div>
					</div>
				</div>
				
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartBar ref="orderProductDescChartBar" style="height:300px" text="商品销售金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access"  >
					<div class="weui-panel__bd">
						<ChartBar ref="orderUnionChartBar" style="height:300px" text="服务商销售金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access"  >
					<div class="weui-panel__bd">
						<ChartBar ref="orderShopChartBar"  style="height:300px" text="店铺销售金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartBar ref="shareUnionChartBar" style="height:300px"  text="服务商贡献金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartBar ref="shareShopChartBar" style="height:300px"  text="店铺贡献金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartPie ref="orderStatusChartPie" style="height:300px"  text="订单状态对比" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartBar ref="shareUserChartBar" style="height:300px"  text="导购贡献金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartBar ref="orderUserChartBar" style="height:300px" text="用户购买金额 Top10" />
					</div>
				</div>
				<div class="weui-panel weui-panel_access" >
					<div class="weui-panel__bd">
						<ChartMap ref="orderChartMap" style="height:300px"  text="订单交易数据分布图" />
					</div>
				</div>
			</div>
		</div>
	</div>

	
</template>

<script>
	export const groupBy = (list, fn) => {
		const groups = {};
		list.forEach(function(o) {
			const group = JSON.stringify(fn(o));
			groups[group] = groups[group] || [];
			groups[group].push(o);
		});
		return groups;
	}

	import {
		ChartPie,
		ChartBar,
		ChartMap
	} from '@/components/charts';
	import moment from "moment";
	export default {
		name: 'orderScreen',
		components: {
			ChartPie,
			ChartBar,
			ChartMap
		},
		data() {
			return {
				orderType: "0",
				beginDate: null,
				endDate: null,
				beginDateStr: '',
				endDateStr: '',
				ticketItem: {
					label: "近一月",
					value: 1
				},
				inforCardData: [],
				dataList: [],
				allHasFillFlag: true,
				productDescMap:{},
				orderUnionMap:{},
				shareUnionMap:{},
				orderShopMap:{},
				shareShopMap:{},
				shareUserMap:{},
				orderUserMap:{},
				orderTypeList:[],
				areaList:[]
			}
		},
		watch: {

		},
		created: function(e) {
			//userId && tokenId
		 
			let userId = this.$netManager.getUrlKey("user_id");
			if (userId &&  userId.length > 0){
			}else{
				userId = this.$netManager.getUrlKey("userId");
			}
			
			let token = this.$netManager.getUrlKey("token");
			if (userId &&  userId.length > 0 && token  && token.length > 0){
				localStorage.setItem("token", token);
				localStorage.setItem("userId", userId);
			}
			
			this.lastMonthData();
			this.tappedActionBtn();
		},

		beforeCreate: function() {
			document.title = "订单数据看板";
		},
		methods: {

			//加载基本信息
			tappedActionBtn: function() {

				let t = this;
				let begninTime = moment(this.beginDateStr).valueOf();

				let endTime = moment(this.endDateStr).valueOf();

				var loading = this.$weui.loading('加载中');
				this.$http.post(this.$ymAPI.orderScreen, this.$netManager.getRequestParams({
					begin: begninTime,
					end: endTime,
					order_type: t.orderType,
					raw_data: 1
				})).then(function(response) {
					if (loading) {
						loading.hide();
					}

					let dataDic = response.data;
					if (dataDic.status == 1) {
						t.dataList = dataDic.data.items;
						// console.log(t.dataList);
						t.webSqlOrder();
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			
			processGroupByProperty:function(propertyName){
				let dataSource = this.dataList;
				let chartBarMap = {}; //图表chart需要用的map
				
				//先分组
				let groupDic = groupBy(dataSource, (itemObj) => {
					return itemObj[propertyName]
				});
				//统计总和,把对象装到数组，再对数组排序，再取前10装到map
				let groupSortArr = [];
				Object.keys(groupDic).forEach(function(key) {
					let itemArr = groupDic[key];
					let sumActualFee = itemArr.reduce(function(total, currentValue) {
						return total + currentValue.actualFee;
					}, 0);
					let keyStr = key.replace('"', '').replace('"', '');
					groupSortArr.push({
						"name": keyStr,
						"value": sumActualFee
					});
				});
				groupSortArr.sort(function(a, b) {
					return b.value - a.value
				});
		 
				let arrCount = groupSortArr.length > 10 ? 10 : groupSortArr.length;
				for (let i = arrCount-1; i >= 0; i--) {
					let item = groupSortArr[i];
					chartBarMap[item.name] = item.value;
				}
				return chartBarMap;
			},

			webSqlOrder: function() {
				let dataSource = this.dataList;

				//统计总金额。
				let totalActualFee = dataSource.reduce(function(total, currentValue) {
					return total + currentValue.actualFee;
				}, 0);
				
				let totalValueStr = totalActualFee.toFixed(2);
				if(totalValueStr.indexOf(".00") > 0){
				  totalValueStr = totalValueStr.replace(".00","");
				}
				
				let tongjiListItem = [{
						title: '订单数量',
						icon: 'md-person-add',
						count: dataSource.length,
						color: '#2d8cf0'
					},
					{
						title: '订单总金额',
						icon: 'md-locate',
						count: totalValueStr,
						color: '#19be6b'
					},
				];
				this.inforCardData = tongjiListItem;

				//商品名统计
				this.productDescMap = this.processGroupByProperty("productDesc");
				this.$refs.orderProductDescChartBar.initial(this.productDescMap);
	 
				//服务商top10
				this.orderUnionMap = this.processGroupByProperty("orderUnion");
				this.$refs.orderUnionChartBar.initial(this.orderUnionMap);
			 
				//服务商贡献top10
				this.shareUnionMap = this.processGroupByProperty("shareUnion");
				this.$refs.shareUnionChartBar.initial(this.shareUnionMap);
				 
				//店铺销售金额top10
				this.orderShopMap = this.processGroupByProperty("orderShop");
				this.$refs.orderShopChartBar.initial(this.orderShopMap);

				//店铺贡献金额top10
				this.shareShopMap =  this.processGroupByProperty("shareShop");
				this.$refs.shareShopChartBar.initial(this.shareShopMap);
				 
				//订单状态分类
				this.orderTypeList = [];
				let that = this;
				//分组
				let orderStatusTextDic = groupBy(dataSource, (itemObj) => {
					return itemObj.orderStatusText
				});
				//统计总和
				Object.keys(orderStatusTextDic).forEach(function(key) {
					let itemArr = orderStatusTextDic[key];
					let keyStr = key.replace('"', '').replace('"', '');
					that.orderTypeList.push({
						name: keyStr,
						value: itemArr.length
					});
				});
				this.$refs.orderStatusChartPie.initial(this.orderTypeList);
				
				//导购贡献
				this.shareUserMap = this.processGroupByProperty("shareName"); 
				this.$refs.shareUserChartBar.initial(this.shareUserMap)

				//用户购买
				this.orderUserMap = this.processGroupByProperty("userName"); 
				this.$refs.orderUserChartBar.initial(this.orderUserMap);
				 
				//地图分布图
				this.areaList = this.tongjiTypeListByProperty("userProvince");
				this.$refs.orderChartMap.initial(this.areaList);
			},
			
			tongjiTypeListByProperty:function(propertyName){
				let dataSource = this.dataList;
				let typeList = [];
				//分组
				let groupDic = groupBy(dataSource, (itemObj) => {
					return itemObj[propertyName]
				});
				
				//统计总和
				Object.keys(groupDic).forEach(function(key) {
					if (key !== undefined) {
						let itemArr = groupDic[key];
						let sumActualFee = itemArr.reduce(function(total, currentValue) {
							return total + currentValue.actualFee;
						}, 0);
				
						let keyStr = key.replace('"', '').replace('"', '');
						typeList.push({
							name: keyStr,
							value: sumActualFee
						});
					}
				});
				return typeList;
			},

			showStartDatePickerAction: function() {
				//weUI 显示日期控件
				let that = this;
				this.$weui.datePicker({
					end: that.endDateStr,
					cron: '* * *',
					defaultValue: that.beginDateStr.split("-"),
					onChange: function(result) {
						var dateArr = Array();
						for (var i = 0; i < result.length; i++) {
							let item = result[i];
							let valueStr = '' + item.value;
							if (i > 0 && valueStr.length == 1) {
								valueStr = '0' + valueStr;
							}
							dateArr.push(valueStr);
						}
						that.beginDateStr = dateArr.join("-");
					},
					onConfirm: function(result) {

						var dateArr = Array();
						for (var i = 0; i < result.length; i++) {
							let item = result[i];
							let valueStr = '' + item.value;
							if (i > 0 && valueStr.length == 1) {
								valueStr = '0' + valueStr;
							}
							dateArr.push(valueStr);
						}
						that.beginDateStr = dateArr.join("-");
					},
					id: 'startDatePicker',
					title: '选择开始日期'
				});
			},
			showEndDatePickerAction: function(e) {
				//weUI 显示日期控件
				let that = this;
				this.$weui.datePicker({
					start: that.beginDateStr,
					end: new Date(),
					cron: '* * *',
					defaultValue: that.endDateStr.split("-"),
					onChange: function(result) {
						var dateArr = Array();
						for (var i = 0; i < result.length; i++) {
							let item = result[i];
							let valueStr = '' + item.value;
							if (i > 0 && valueStr.length == 1) {
								valueStr = '0' + valueStr;
							}
							dateArr.push(valueStr);
						}
						that.endDateStr = dateArr.join("-");
					},
					onConfirm: function(result) {

						var dateArr = Array();
						for (var i = 0; i < result.length; i++) {
							let item = result[i];
							let valueStr = '' + item.value;
							if (i > 0 && valueStr.length == 1) {
								valueStr = '0' + valueStr;
							}
							dateArr.push(valueStr);
						}
						that.endDateStr = dateArr.join("-");
					},
					id: 'endDatePicker',
					title: '选择结束日期'
				});
			},

			lastMonthData: function() {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				this.beginDateStr = moment(start.getTime()).format('YYYY-MM-DD');
				this.endDateStr = moment(end.getTime()).format('YYYY-MM-DD');
			},
			showComonPickerAction: function() {
				var typesArr = ['近一周', '近一月', '近一年'];
				var dataArr = Array();
				typesArr.forEach(function(value, index) {
					dataArr.push({
						label: value,
						value: index
					});
				});

				let that = this;
				this.$weui.picker(dataArr, {
					defaultValue: [1],
					className: 'custom-picker-item',
					container: 'body',
					onChange: function(result) {},
					onConfirm: function(result) {
						if (result.length) {
							that.ticketItem = result[0];

							if (that.ticketItem.value == 0) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
								that.beginDateStr = moment(start.getTime()).format('YYYY-MM-DD');
								that.endDateStr = moment(end.getTime()).format('YYYY-MM-DD');
							} else if (that.ticketItem.value == 1) {
								that.lastMonthData();
							} else {
								const end = new Date()
								const start = new Date()
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
								that.beginDateStr = moment(start.getTime()).format('YYYY-MM-DD');
								that.endDateStr = moment(end.getTime()).format('YYYY-MM-DD');
							}
						}
					},
					id: 'picker',
					title: '时间段筛选'
				});
			}
		}
	}
</script>

<style>
	 
	.weui-half-screen-dialog__ft{
		box-sizing: border-box;
		padding-top: 0;
		padding-bottom: 5.25rem;
	}
	
	.custom-picker-item{
		
	}

	.weui-form__tips-area {
		text-align: center;
	}

	.weui-footer {
		margin-top: 3.125rem;
		margin-bottom: 1.25rem;
		width: 100%;
	}
	
	.numberTotalCountLab{
		font-size: 24;
	}
	
	.numberTotalDescLabl{
		margin-top: 0.3125rem;
		font-size: 14;
		color: #333333;
	}

	/* 主题色 */
	.weui-btn_primary {
		background-color: #44A6FF;
	}

	.weui-cells_checkbox .weui-check:checked+.weui-icon-checked {
		color: #44A6FF;
	}

	.weui-btn_primary:not(.weui-btn_disabled):active {
		background-color: #227BFF;
	}

	/* 禁用的颜色 */
	.weui-cell_readonly input.weui-input {
		color: rgb(102, 102, 102);
	}

	.weui-cell__bd_right {
		text-align: right;
	}

	.totalInfoCard{
		display: flex;
		flex-direction: row;
	}
	
	.totalCardItem{
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 4.6875rem;
		justify-content: center;
	}
	
	.page {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #F0F1F5;
	}
	
	.weui-panel__bd{
		padding-top: 0.9375rem;
		box-sizing: border-box;
	}

	.weui-form__extra-area {
		margin-top: 10;
		background: #F0F1F5;
		padding-bottom: 4rem;
		box-sizing: border-box;
	}
	
	 
	 
	.weui-panel {
		margin-top: 0.75rem;
	}

	.weui-cells_checkbox {
		display: flex;
		padding-left: 1.875rem;
	}

	.weui-cells_checkbox label {
		flex: 1;
	}

	.weui-form {
		padding-top: 0;
		min-height: auto;
		padding-bottom: 0;
	}
	
	.weui-form__opr-area:last-child {
		margin-bottom: 1.25rem;
	}
	.weui-form__opr-area {
		margin-top: 0;
		margin-bottom: 1.25rem;
	}

	.weui-cells__group_form .weui-cell {
		padding-left: 1.875rem;
	}

	.weui-form__control-area {
		margin-top: 1.25rem;
		flex: 0;
	}

	.radioItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 3.4375rem;
	}
</style>
