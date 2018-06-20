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

