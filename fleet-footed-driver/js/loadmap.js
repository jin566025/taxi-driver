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

//存储司机经纬度位置
function onComplete(data) {
    sessionStorage.setItem("driverLng",data.position.getLng());
    sessionStorage.setItem("driverLat",data.position.getLat());
	AMap.event.addListener(auto, "select", select);
	$("#tipinput").attr("disabled",false)
}

var auto = new AMap.Autocomplete({
    input: "tipinput"
});



function select(e) {
    if (e.poi && e.poi.location) {
        map.setZoom(15);
        map.setCenter(e.poi.location);
        //存储目标地址经纬度位置
        sessionStorage.setItem("targetLng",e.poi.location.lng)
        sessionStorage.setItem("targetLat",e.poi.location.lat)
    }
    targetLng = e.poi.location.lng;
    targetLat = e.poi.location.lat;
    
    var driverLng = sessionStorage.getItem("driverLng");
    var driverLat = sessionStorage.getItem("driverLat");
    
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(driverLng, driverLat), new AMap.LngLat(targetLng, targetLat));
    setTimeout(function(){
    	var time = $(".planTitle p").text();
    	var pattern =new RegExp("\\((.| )+?\\)","igm");

    	$("#position1").html(time.match(pattern))
    },1000)
}









