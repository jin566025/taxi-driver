function getCodeReturn(){
	$.ajax({
		type:"post",
		url:url_path+"/wx/queryAppId.json",
		dataType:"json",
		success:function(data){
			
			if(data.msg=="成功"){
				var appId = data.appId;
				var appSecret = data.appSecret;
				var code = sessionStorage.getItem("code");
				console.log(code)
				if(!code){
					window.location.href ="http://taxicustomer.nbzhidun.com/get-weixin-code.html?appid="+appId+"&scope=snsapi_base&state=hello-world&redirect_uri=http%3a%2f%2ftaxidriver.nbzhidun.com%2findex.html"
				}
			}
		},
		error:function(){}
	})
}
function getCode(){
	var codeStr = window.location.href.split("=")[1];
	if(codeStr){
		var code = codeStr.split("&")[0];
		sessionStorage.setItem("code",code);
		if(code){
			$.ajax({
				type:"post",
				url:url_path+"/getAccessToken.json",
				data:{
					"code":code
				},
				dataType:"json",
				async:false,
				success:function(data){
					var openid = data.openid;
					sessionStorage.setItem("openid",openid);
					localStorage.setItem("openid",openid);
				}
			});
		}
	}
	
	
	
}
var driverId = localStorage.getItem("driverId");
if(!driverId){
	getCodeReturn();
	getCode();
}
var driverHasLogin = localStorage.getItem("driverHasLogin");
if(driverHasLogin && openid){
	window.location.href="index2.html"
}


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
				if(data.msg=="用户不存在"){
					$("#tips1").css("visibility","visible").html(data.msg)
					$("#tips2").css("visibility","hidden").html("")
				}else if(data.msg=="成功"){
					var nickname = data.nickname;
					var score = data.score;
					var userId = data.userId;
					var userImg = data.userImg;
					
					localStorage.setItem("drivernickname",nickname);
					localStorage.setItem("driverscore",score);
					localStorage.setItem("driverId",userId);
					localStorage.setItem("driverImg",userImg);
					localStorage.setItem("driverHasLogin",true);
					var openid = localStorage.getItem("openid");
					
					$.ajax({
						type:"post",
						url:url_path+"/driver/loginOauth.json",
						async:false,
						data:{
							"userOpenid":openid,
							"username":username
						},
						dataType:"json",
						success:function(data){
							console.log(data)
							if(data.msg=="成功"){
								var nickname = data.nickname;
								var score = data.score;
								var userId = data.userId;
								var userImg = data.userImg;
								
								localStorage.setItem("usernickname",nickname);
								localStorage.setItem("userscore",score);
								localStorage.setItem("userId",userId);
								localStorage.setItem("userImg",userImg);
								
								window.location.href="index2.html"
								
							}
						}
					});
					
					
					
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
	console.log(phoneNumber)
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
			type:"get",
			url:url+"/driver/getLoginSMS.json",
			dataType:"json",
			data:{
				"username":phoneNumber
			},
			success:function(data){
				console.log(data)
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

$("#send-yzm").click(function(){
	getLoginSMS(url_path);
})
$(".login-btn").click(function(){
	login(url_path)
})