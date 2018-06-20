
function login(url){
	var username = $("#username").val();
	var validateCode = $("#ymz").val();
	console.log(isPhoneNo(username))
	if(!isPhoneNo(username)){
		$("#tips1").css("visibility","visible").html("请输入正确的手机号码")
	}else if(validateCode==""){
		$("#tips2").css("visibility","visible").html("请输入验证码")
	}else{
		$.ajax({
			type:"post",
			url:url+"/driver/login.json",
			data:{
				"username":username,
				"validateCode":validateCode
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="用户不存在"){
					$("#tips1").css("visibility","visible").html(data.msg)
					$("#tips2").css("visibility","hidden").html("")
				}else if(data.msg=="成功"){
					var nickname = data.nickname;
					var score = data.score;
					var userId = data.userId;
					var userImg = data.userImg;
					
					localStorage.setItem("nickname",nickname);
					localStorage.setItem("score",score);
					localStorage.setItem("driverId",userId);
					localStorage.setItem("userImg",userImg);
					window.location.href="index.html";
				}else{
					$("#tips1").css("visibility","visible").html(data.msg)
					$("#tips2").css("visibility","hidden").html("")
				}
			}
		});
	}
	
}
function getLoginSMS(url){
	var phoneNumber = $("#username").val();
	console.log(isPhoneNo(phoneNumber))
	if(isPhoneNo(phoneNumber)){
		$("#tips1").css("visibility","hidden");
		var time = 60;
		$("#send-yzm").addClass("disabled")
		var TimeInterVal = setInterval(function(){
			time = time-1;
			$("#send-yzm").html(time);
		},1000)
		setTimeout(function(){
			$("#send-yzm").html("点击发送验证码").removeClass("disabled");
			window.clearInterval(TimeInterVal);
		},60000)
		
		
		$.ajax({
			type:"post",
			url:url+"/driver/getLoginSMS.json",
			dataType:"json",
			data:{
				"username":phoneNumber
			},
			success:function(data){
				if(data.msg=="成功"){
					
				}
			},
			error:function(){}
		});
	}else{
		$("#tips1").css("visibility","visible").html("请输入正确的手机号码")
	}
}


function isPhoneNo(phone) {  
    var pattern = /^1[34578]\d{9}$/;  
    return pattern.test(phone);  
}

