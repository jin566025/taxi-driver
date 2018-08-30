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

$(".customer-go").click(function(){
	var startLng,startLat,endLng,endLat;
	var startLat = sessionStorage.getItem("driverLat");
	var startLng = sessionStorage.getItem("driverLng");
	var endLng = sessionStorage.getItem("customerLng");
	var endLat = sessionStorage.getItem("customerLat");
	window.location.href="http://m.amap.com/navi/?start="+startLng+","+startLat+"&dest="+endLng+","+endLat+"&destName=%E8%B7%AF%E7%BA%BF&naviBy=car&key=92f74f742ad7c49509ed2f32b516743d"

})
