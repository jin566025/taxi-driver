//amap-markers起始标记点
var map, geolocation;

//加载地图，调用浏览器定位服务
map = new AMap.Map('container', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
    });
    map.addControl(geolocation);
	geolocation.getCurrentPosition();
	AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//	AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
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
//存储司机经纬度位置
function onComplete(data) {
    sessionStorage.setItem("driverLng",data.position.getLng());
    sessionStorage.setItem("driverLat",data.position.getLat());
//	panel1(data.position.getLng(),data.position.getLat())
}


function panel1(driverLng,driverLat){
	console.log(driverLat)
	var targetLat1 =  29.825699;
	var targetLng1 =  121.545456;
	
	var targetLat2 = 29.87863;
	var targetLng2 = 121.521148;
    driving.search(new AMap.LngLat(driverLng, driverLat), new AMap.LngLat(targetLng1, targetLat1));
    driving2.search(new AMap.LngLat(targetLng1, targetLat1), new AMap.LngLat(targetLng2, targetLat2));
    setTimeout(function(){
    	var time = $(".planTitle p").text();
    	var pattern =new RegExp("\\((.| )+?\\)","igm");
    	var times = time.match(pattern)

    	$("#position1").html(times[0])
    	$("#position2").html(times[1])
    	var makers = $(".amap-marker");
	    for(var i=0;i<makers.length;i++){
	    	$(makers[4]).css({"display":"none","visibility":"hidden"})
	    }
    },1000)
    
    
}
