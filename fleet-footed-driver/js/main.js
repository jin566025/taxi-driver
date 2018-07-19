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
$(function(){
	setTimeout(function(){
		$(".amap-toolbar,.amap-copyright,.amap-zoomcontrol,.amap-touch-toolbar,amap-controls").css("visibility","hidden");
		$(".amap-logo,.amap-geolocation-con,.amap-controls").hide();
	},1000)



	$("#dialog-cancle").click(function(){
		$(".shadow,.confirm").fadeOut();
	})
	$("#take").click(function(){
		$("#dialog,#shadow").fadeIn()
	})
	$("#dialog-sure").click(function(){
		var taskId = window.location.href.split("taskId=")[1];
		takeTask(url_path,taskId,driverId);
	})
	
	function takeTask(url_path,taskId,driverId){
		$.ajax({
			type:"post",
			url:url_path+"/mission/take.json",
			data:{
				"id":taskId,
				"driverId":driverId
			},
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				if(data.msg == "成功"){
					window.location.href='../../my-order-list.html'
				}
			},
			error:function(){}
		});
	}
	
	function preview(file) {
    var prevDiv = document.getElementById('preview');
    if (file.files && file.files[0]) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
      }
      reader.readAsDataURL(file.files[0]);
    } else {
      prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
  }
	
	
	var mySwiper = new Swiper('.list-main,.customer',{
		 onTouchMove: function(e){
	            var dist=e.touches.currentY-e.touches.startY;
	            if(dist<20){
					ContentUp();
	            }else if(dist>20){
					ContentDown()
	            }
	
		 }
    })
})