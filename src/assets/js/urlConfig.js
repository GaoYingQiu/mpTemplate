// 接口地址
const ymAPI = {
    
	//客户信息 
	customerList: "/customer/list/",
	customerLogs: "/customer/logs/",
	customerCoupons: "/customer/coupons/",
	customerOrders: "/customer/orders/",
	customerDetail: "/customer/detail/",
	
	//数据看板
	orderScreen: "/export/order_list/",
  	dashboardIndicator: "/report/chain/dashboard/indicator/",
	//直播间管理
	managerLiveList: "/live/room/list/",
	operationLiveRoomOffline: "/live/room/offline/",
	liveRoomDetail:"/live/room/info/",
	updateLiveRoomInfo: "/live/room/info/update/",
	createLiveRoom: "/live/room/create/",
	deleteLiveRoom:"/live/room/delete/"
	
}
module.exports = ymAPI