$(function(){
	
	function timeFormatter(value) {
	    var da = new Date(parseInt(value));
	    var month = da.getMonth()+1;
	    if(month<10){
	    	month = "0"+month
	    }
	    
	    var dates = da.getDate();
	    if(dates<10){
	    	dates = "0"+dates
	    }
	    
	    var hour = da.getHours();
	    if(hour<10){
	    	hour = "0"+hour
	    }
	    
	    var minute = da.getMinutes();
	    if(minute<10){
	    	minute = "0"+minute
	    }
	    
	    var second = da.getSeconds();
	    if(second<10){
	    	second = "0"+second
	    }
	    return da.getFullYear() + "-" + month + "-" + dates + " " + hour + ":" + minute + ":" + second;
	}
	
	$(".list").on("click",".list-main",function(){
		var taskId = $(this).data("taskid");
		var typeId = $(this).data("typeid");
		if(typeId==4){
			window.location.href = "pages/order-list/order-detail4.html?taskId="+taskId;
		}else if(typeId==1){
			window.location.href = "pages/order-list/order-detail1.html?taskId="+taskId;
		}else if(typeId==2){
			window.location.href = "pages/order-list/order-detail2.html?taskId="+taskId;
		}else if(typeId==3){
			window.location.href = "pages/order-list/order-detail3.html?taskId="+taskId;
		}else if(typeId==5){
			window.location.href = "pages/order-list/order-detail5.html?taskId="+taskId;
		}
		
	})
	var pageNo = 1;
	var pageSize = 30;
	var driverLat = sessionStorage.getItem("driverLat");
	var driverLng = sessionStorage.getItem("driverLng");
	if(driverLat && driverLng){
		$("#shadow").fadeOut(500);
		$("#getAddress").fadeOut(500)
	}
	loadMissionList(pageNo,pageSize,url_path);
	
	$(window).scroll(function(){
		if($(window).scrollTop() + $(window).height() >= $(document).height() ){
			if($(".nomore").hasClass("hasmore")){
				pageNo = pageNo+1;
				loadMissionList(pageNo,pageSize,url_path);
			}
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


	function loadMissionList(pageNo,pageSize,url_path){
		$.ajax({
			type:"post",
			url:url_path+"/mission/missionList.json",
			async:false,
			data:{
				"pageNo":pageNo,
				"pageSize":pageSize
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				
				if(data.msg=="成功"){
					var list = data.listDTO;
					if(list.length!==30){
						$(".nomore").html("---加载完毕---").removeClass("hasmore")
					}
					var driverLng = sessionStorage.getItem("driverLng");
					var driverLat = sessionStorage.getItem("driverLat");
					var targetLat1,targetLng1;
	
					for(var i=0;i<list.length;i++){

						targetLat1 =  list[i].deliveryAddressLatitude;
						targetLng1 =  list[i].deliveryAddressLongitude;
						var dis = getDistance(driverLat,driverLng,targetLat1,targetLng1)+1;
						dis = dis.toFixed(2)

						var typeId = list[i].typeId;
						var lists_right_cls,typeStr,lists_right_str,type,hide_cls,award,goodsType,finish;
						var font_cls = "";
						finish = list[i].finish;
						
						
						var taskAddress = list[i].taskAddress;
						
						
						var distance = list[i].distance;
						if(distance){
							distance = list[i].distance+"公里";
						}else{
							targetLat2 =  list[i].taskAddressLatitude;
							targetLng2 =  list[i].taskAddressLongitude;
							distance = getDistance(targetLat2,targetLng2,targetLat1,targetLng1)+1;
							distance = distance.toFixed(2)+"公里"
						}
						var deliveryAddress = list[i].deliveryAddress;
						if(deliveryAddress){
							deliveryAddress = list[i].deliveryAddress;
						}else{
							deliveryAddress = "如不填写，由司机决定";
							dis="自定义";
							distance = "自定义公里"
						}
						if(typeId==1){
							typeStr="送取件";
							lists_right_cls = "lists-right3";
							lists_right_str = "红包";
							type = "type1";
							hide_cls="";
							goodsType = list[i].goodsType;
							award = list[i].award;
						}else if(typeId==2){
							typeStr="代购";
							lists_right_cls = "lists-right2";
							lists_right_str = "垫资资金";
							type = "type2";
							hide_cls="";
							goodsType = list[i].message;
							award = list[i].matmoney;
							
						}else if(typeId==3){
							typeStr="打车";
							lists_right_cls = "lists-right4";
							lists_right_str = "";
							type = "type3";
							hide_cls = "hide_cls";
							goodsType = " ";
							award = " ";
							finish="打表";
							font_cls = "font2"
						}else if(typeId==4){
							typeStr="日常代驾";
							lists_right_cls = "lists-right3";
							lists_right_str = "红包";
							type = "type4";
							hide_cls = "hide_cls";
							goodsType = " ";
							award = list[i].award
						}else if(typeId==5){
							typeStr="包时代驾";
							lists_right_cls = "lists-right4";
							lists_right_str = "";
							type = "type4";
							hide_cls = "hide_cls";
							goodsType = " ";
							award = list[i].money;
							finish = list[i].money
							deliveryAddress = taskAddress;
							dis = getDistance(driverLat,driverLng,targetLat2,targetLng2)+1;
							dis = dis.toFixed(2);
							taskAddress = timeFormatter(list[i].startTime);
							distance ="当前位置："+ list[i].deliveryAddress
						}
		
						
						
						var html = '<div class="list-main" data-typeId='+list[i].typeId+' data-taskId='+list[i].id+'>'+
										'<div class="lists-content flex-box">'+
											'<div class="lists-left flex-box">'+
												'<div class="lists-left-price">'+
													'<a class="fuhao">￥</a>'+
													'<a class="price '+font_cls+'" >'+finish+'</a>'+
												'</div>'+
												'<div class="lists-left-detail">'+
													'<div class="lists-left-detail-top '+hide_cls+'">'+goodsType+'</div>'+
													'<br class="'+hide_cls+'" />'+
													'<div class="type '+type+'">'+typeStr+'</div>'+
												'</div>'+
											'</div>'+
											'<div class="lists-right '+lists_right_cls+'">'+
												'<p>'+
													'<a>￥</a>'+
													'<a class="lists-right2-price" >'+award+'</a>'+
												'</p>'+
												'<p>'+lists_right_str+'</p>'+
											'</div>'+
										'</div>'+
										'<div class="start-end flex-box">'+
											'<div class="start-end-left flex-box">'+
												'<a class="circles strat-circle"></a>'+
												'<div class="start-end-detail">'+deliveryAddress+'</div>'+
											'</div>'+
											'<div class="start-end-right">'+dis+'公里</div>'+
										'</div>'+
										'<div class="start-end flex-box">'+
											'<div class="start-end-left flex-box">'+
												'<a class="circles end-circle"></a>'+
												'<div class="start-end-detail">'+taskAddress+'</div>'+
											'</div>'+
											'<div class="start-end-right" >'+distance+'</div>'+
										'</div>'+
									'</div>';
						$(".list").append(html);
					}
				}
			},
			error:function(){}
		});
	}
	
	
})