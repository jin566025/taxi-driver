// var url_path = "http://192.168.16.100:8080/Taxi/rest";
//var url_path = "http://taxiweb.nbzhidun.com/Taxi/rest";
var url_path = "http://zyy71897.yicp.io:50353/Taxi/rest";
$(".footer-nav").click(function(){
	var index = $(this).index()
	if(index == 0){
		window.location.href="index2.html"
	}else if(index==1){
		window.location.href="my-order-list.html"
	}else if(index==2){
		window.location.href="personal.html"
	}
})

$(function(){
	(function(){
		var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //重写alert方法，alert()方法重写，不能传多余参数
            window.alert = function(name){
                var iframe = document.createElement("IFRAME");
                iframe.style.display="none";
                iframe.setAttribute("src", 'data:text/plain');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(name);
                iframe.parentNode.removeChild(iframe);
            }
        }

	})();
})
