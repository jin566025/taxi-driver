var taskId = window.location.href.split("=")[1];
$(".customer").on("click","#toAccess",function(){
	
	window.location.href = "to-access.html?id="+taskId
})
var data = [
    {'id': '10001', 'value': '车辆故障'},
    {'id': '10002', 'value': '联系不到订单用户'},
    {'id': '10003', 'value': '系统出错'},
];
//我要申诉

$(".complain").click(function(){
	window.location.href="complain.html?id="+taskId
})
$(".cancle").click(function(){
	$(".shadow,.confirm").fadeOut(500);
})
$(".submit").click(function(){
	$.ajax({
		type:"post",
		url:url_path+"/mission/driver/ok.json",
		async:true,
		data:{
			"id":taskId,
			"driverId":driverId
		},
		dataType:"json",
		success:function(data){
			console.log(taskId)
			console.log(data)
			if(data.msg=="成功"){
				window.location.href="../../my-order-list.html"
			}
		},
		error:function(){}
	});
})

var showBankDom = document.querySelector('#showBank');
var bankIdDom = document.querySelector('#bankId');
showBankDom.addEventListener('click', function () {
    var bankId = showBankDom.dataset['id'];
    var bankName = showBankDom.dataset['value'];

    var bankSelect = new IosSelect(1, 
        [data],
        {
            container: '.container',
            title: '请选择取消订单理由',
            itemHeight: 50,
            itemShowCount: 3,
            oneLevelId: bankId,
            callback: function (selectOneObj) {
                bankIdDom.value = selectOneObj.id;
                showBankDom.innerHTML = "取消订单";
                showBankDom.dataset['id'] = selectOneObj.id;
                showBankDom.dataset['value'] = selectOneObj.value;
                $("#selectHide").html(selectOneObj.value)
            }
    });
});
   
function cancleOrder(){
	var id = window.location.href.split("=")[1];
	var driverId = localStorage.getItem("driverId");
	var content = $("#selectHide").text();
	$.ajax({
		type:"post",
		url:url_path+"/mission/drivercancel.json",
		async:true,
		data:{
			"id":id,
			"driverId":driverId,
			"content":content
		},
		dataType:"json",
		success:function(data){
			if(data.msg=="成功"){
				window.location.href='../../my-order-list.html'
			}
		},
		error:function(){
			
		}
	});
}
    
//amap-markers起始标记点
var map, geolocation;

//加载地图，调用浏览器定位服务
map = new AMap.Map('container', {
    resizeEnable: true
});

//构造路线导航类
var driving = new AMap.Driving({
    map: map,
    panel: "panel"
}); 
var driving2 = new AMap.Driving({
    map: map,
    panel: "panel"
}); 