function timeFormatter(o){var t=new Date(parseInt(o)),a=t.getMonth()+1;a<10&&(a="0"+a);var n=t.getDate();n<10&&(n="0"+n);var e=t.getHours();e<10&&(e="0"+e);var i=t.getMinutes();i<10&&(i="0"+i);var r=t.getSeconds();return r<10&&(r="0"+r),t.getFullYear()+"-"+a+"-"+n+" "+e+":"+i+":"+r}$(function(){setTimeout(function(){$(".amap-toolbar,.amap-copyright,.amap-zoomcontrol,.amap-touch-toolbar,amap-controls").css("visibility","hidden"),$(".amap-logo,.amap-geolocation-con,.amap-controls").hide()},1e3),$("#dialog-cancle").click(function(){$(".shadow,.confirm").fadeOut()}),$("#take").click(function(){$("#dialog,#shadow").fadeIn()}),$("#dialog-sure").click(function(){var o,t,a,n=window.location.href.split("taskId=")[1];o=url_path,t=n,a=driverId,$.ajax({type:"post",url:o+"/mission/take.json",data:{id:t,driverId:a},async:!0,dataType:"json",success:function(o){console.log(o),"成功"==o.msg&&(window.location.href="../../my-order-list.html")},error:function(){}})});new Swiper(".list-main,.customer",{onTouchMove:function(o){var t=o.touches.currentY-o.touches.startY;t<20?ContentUp():20<t&&ContentDown()}})});