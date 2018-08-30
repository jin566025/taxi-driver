
$(function(){
	
	$(".list").on("click",".list-main",function(){
		var taskId = $(this).data("taskid");
		var typeId = $(this).data("typeid");
		setTimeout(function(){
			
			if(typeId==1){
				window.location.href = "pages/my-order-list/order-ing1.html?taskId="+taskId;
			}else if(typeId==2){
				window.location.href = "pages/my-order-list/order-ing2.html?taskId="+taskId;
			}else if(typeId==3){
				window.location.href = "pages/my-order-list/order-ing3.html?taskId="+taskId;
			}else if(typeId==4){
				window.location.href = "pages/my-order-list/order-ing4.html?taskId="+taskId;
			}else if(typeId==5){
				window.location.href = "pages/my-order-list/order-ing5.html?taskId="+taskId;
			}
			
		},100)
		
	})
	
	
	var pageNo = 1;
	var pageSize = 9999;
	loadDriverList(driverId,0,pageNo,pageSize);
	
	setInterval(function(){
		loadDriverList(driverId,0,pageNo,pageSize)
	},10000)
	$(".header-nav-div").click(function(){
		if($(this).hasClass("header-nav-div-active")){
			
		}else{
			$(".list").html("")
			var header_index = $(this).index(".header-nav-div");
			$(".header-nav-div").removeClass("header-nav-div-active");
			$(this).addClass("header-nav-div-active");
			loadDriverList(driverId,header_index,pageNo,pageSize);
		}
	})
	function getDistance(lat1, lng1, lat2, lng2) {
	    var radLat1 = lat1 * Math.PI / 180.0;
	    var radLat2 = lat2 * Math.PI / 180.0;
	    var a = radLat1 - radLat2;
	    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	    s = s * 6378.137;
	    s = Math.round(s * 10000) / 10000;
	    return s
	};
	function timeFormatter(value) {
	    var da = new Date(parseInt(value));
	    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
	}
	function loadDriverList(driverId,appstate,pageNo,pageSize){
		
	
		$.ajax({
			type:"post",
			url:url_path+"/mission/byDriverList.json",
			async:true,
			data:{
				"driverId":driverId,
				"appstate":appstate,
				"pageNo":pageNo,
				"pageSize":pageSize
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					$("#shadow").fadeOut(500);
					$("#getAddress").fadeOut(500)
					var list = data.listDTO;
					for(var i=0;i<list.length;i++){
						var startTime = timeFormatter(list[i].statrTime);
						var state,stateStr;
						if(list[i].state==2){
							state = "进行中";
							stateStr = "已为您开启了最佳配送路线";
						}else if(list[i].state==1){
							state = "未接单";
							stateStr = "未接单";
						}else if(list[i].state==3){
							state = "已完成";
							stateStr = "当前还未对租客进行评价";
							if(list[i].commentstate==2){
								stateStr = "司机已评价";
							}else if(list[i].commentstate==1 || list[i].commentstate==3){
								stateStr = "用户已评价";
							}
						}else if(list[i].state==4){
							state = "投诉中";
							stateStr = "当前租客对您投诉";
						}else if(list[i].state==5){
							state = "结算中";
							stateStr = "任务正在结算中";
						}
						var lists_right_cls,lists_right_str,lists_right_str2,lists_right_price,type,hide_cls,goodsType,finish;
						
						var deliveryAddressLatitude  = list[i].deliveryAddressLatitude;
						var deliveryAddressLongitude  = list[i].deliveryAddressLongitude;
						var taskAddressLatitude  = list[i].taskAddressLatitude;
						var taskAddressLongitude  = list[i].taskAddressLongitude;			
						var driverAddressLatitude = sessionStorage.getItem("driverLat");
						var driverAddressLongitude = sessionStorage.getItem("driverLng");
	
						var distance1 =(getDistance(driverAddressLatitude,driverAddressLongitude,deliveryAddressLatitude,deliveryAddressLongitude)+1).toFixed(2);
						var distance2 = (getDistance(deliveryAddressLatitude,deliveryAddressLongitude,taskAddressLatitude,taskAddressLongitude)+1).toFixed(2);
						distance2 = distance2+'公里';
						
						var deliveryAddress = list[i].deliveryAddress
						var taskAddress = list[i].taskAddress
						if(!deliveryAddress){
							deliveryAddress="未填写由司机决定"
							distance2 = "自定义公里";
							distance1 = "自定义"
						}
						finish = list[i].award+list[i].reward;
						if(list[i].typeId==1){
							lists_right_cls = "lists-right3";
							lists_right_str = "送取件";
							lists_right_str2 = "红包";
							lists_right_price = list[i].award;
							type = "type1";
							hide_cls="";
							goodsType = list[i].goodsType;
						}else if(list[i].typeId==2){
							lists_right_cls = "lists-right2";
							lists_right_str = "代购";
							lists_right_str2 = "垫资资金";
							lists_right_price = list[i].matmoney;
							if(!lists_right_price){
								lists_right_price="未填"
								
							}
							type = "type2";
							hide_cls="";
							goodsType = list[i].message;
							
						}else if(list[i].typeId==3){
							lists_right_cls = "lists-right4";
							hide_cls = "hide_cls";
							lists_right_str = "打车";
							lists_right_price = "";
							lists_right_str2 = "";
							type = "type3";
							goodsType = "";
							finish="0"
						}else if(list[i].typeId==4 ){
							lists_right_cls = "lists-right3";
							hide_cls = "hide_cls";
							lists_right_str = "日常代驾";
							lists_right_price = list[i].award;
							lists_right_str2 = "红包";
							type = "type4";
							goodsType = "";
						}else if(list[i].typeId==5){
							lists_right_cls = "lists-right4";
							hide_cls = "hide_cls";
							lists_right_str = "包时代驾";
							lists_right_price = "";
							lists_right_str2 = "";
							type = "type4";
							goodsType = "";
							finish="0";
							deliveryAddress = list[i].taskAddress;
							distance1 =(getDistance(driverAddressLatitude,driverAddressLongitude,taskAddressLatitude,taskAddressLongitude)+1).toFixed(2);
							distance2 = "当前位置："+list[i].deliveryAddress;
							taskAddress = timeFormatter(list[i].statrTime);
						}
						
	
						
	
						
						var html = '<div class="list-main"  data-typeId='+list[i].typeId+' data-taskId='+list[i].id+'>'+
										'<div class="order-list-time">接单时间：'+startTime+'</div>'+
										'<div class="list-main-container">'+
											'<div class="status clearfix">'+
												'<div class="status-left fl">'+state+'</div>'+
												'<div class="status-right fr">'+stateStr+'</div>'+
											'</div>'+
											'<div class="lists-content flex-box">'+
												'<div class="lists-left flex-box">'+
													'<div class="lists-left-price">'+
														'<a class="fuhao">￥</a>'+
														'<a class="price">'+finish+'</a>'+
													'</div>'+
													'<div class="lists-left-detail">'+
														'<div class="lists-left-detail-top '+hide_cls+'">'+goodsType+'</div>'+
														'<br'+hide_cls+' />'+
														'<div class="type '+type+'">'+lists_right_str+'</div>'+
													'</div>'+
												'</div>'+
												'<div class="lists-right '+lists_right_cls+'">'+
													'<p>'+
														'<a>￥</a>'+
														'<a class="lists-right2-price">'+lists_right_price+'</a>'+
													'</p>'+
													'<p>'+lists_right_str2+'</p>'+
												'</div>'+
											'</div>'+
											'<div class="start-end flex-box">'+
												'<div class="start-end-left flex-box">'+
													'<a class="circles strat-circle"></a>'+
													'<div class="start-end-detail">'+deliveryAddress+'</div>'+
												'</div>'+
												'<div class="start-end-right">'+distance1+'公里</div>'+
											'</div>'+
											'<div class="start-end flex-box">'+
												'<div class="start-end-left flex-box">'+
													'<a class="circles end-circle"></a>'+
													'<div class="start-end-detail">'+taskAddress+'</div>'+
												'</div>'+
												'<div class="start-end-right">'+distance2+'</div>'+
											'</div>'+
										'</div>	'+
									'</div>';
						$(".list").append(html)
					}
				}
			},
			error:function(){}
		});
	}
				
				
			})