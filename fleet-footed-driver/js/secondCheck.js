var driverId = localStorage.getItem("driverId");
function testLogin(){
	var driverId = localStorage.getItem("driverId");
	if(driverId){
		
	}else{
		window.location.href="../../index.html"
	}
}
setTimeout(function(){
	testLogin();			
},500)