var tmpLayer;
var regFlag = false;
$(function () {
	init();
	bindEvent();
	getLazyImg();
	getWhisperList();
});
function init() {
	$.ajax({
		url : "index/init?t=" + new Date().getTime(),
		success : function(data) {
			if (data && data.length > 0) {
				$("#loginNameKey").html(data);
				$("#loginNameShow").show();
				$("#logout").show();
				$("#login").hide();
				$("#content").show();
				getMyWhisperList();
			} else {
				$("#loginNameKey").html("");
				$("#loginNameShow").hide();
				$("#logout").hide();
				$("#login").show();
			}
		},
		async : false
	});
}
function bindEvent() {
	$("#login").click(function() {
    	$("#loginTab").show();
    });
    $("#loginCfm").click(function() {
    	login();
    });
    $("#logout").click(function() {
    	logout();
    });
    $("#loginCan").click(function() {
    	$("#sp_name").html("");
    	$("#sp_pwd").html("");
    	$("#loginName").val("");
		$("#password").val("");
    	$("#loginTab").hide();
    });
    $("#password").bind("keypress", function(event) {
		if (event.keyCode == "13") {
			login();
		}
	});
    $("#openWhisper").click(function() {
    	$("#whisperMsg").val("");
    	openWhisperLayer();
    });
    $("input[name^='isHidden']:radio").click(function() {
    	var isHidden = $(this).val();
    	var name = $(this).attr("name");
    	var id = name.substring(8, name.length);
    	$.ajax({
    		url : "whisper/setWhisperHidden?t=" + new Date().getTime(),
    		data : {"isHidden" : isHidden, "id" : id},
    		success : function(d) {
    			if (d.result == '1') {
    				window.parent.location.href = window.parent.location.href;
    			} else {
    				layer.alert(d.msg);
    			}
    		},
    		async : false
    	});
    });
    
    // 注册
    $("#loginNameR").blur(function() {
    	regFlag = checkLoginName($(this).val());
    	if (!regFlag) {
    		$("#sp_name_reg").html("用户名已存在");
    	} else {
    		$("#sp_name_reg").html("");
    	}
    });
    $("#reg").click(function() {
    	$("#regTab").show();
    });
    $("#regCfm").click(function() {
    	reg();
    });
    $("#regCan").click(function() {
    	$("#sp_name_reg").html("");
    	$("#sp_uname_reg").html("");
    	$("#sp_pwd_reg").html("");
    	$("#loginNameR").val("");
		$("#passwordR").val("");
		$("#passwordR2").val("");
    	$("#regTab").hide();
    });
    $("#passwordR2").bind("keypress", function(event) {
		if (event.keyCode == "13") {
			reg();
		}
	});
}
function checkLoginName(loginName) {
	$.ajax({
		url : "user/checkLoginName?t=" + new Date().getTime(),
		type : "post",
		data : {"loginName" : loginName},
		success : function(data) {
			if (data.result == '1') {
				regFlag = true;
				$("#sp_name_reg").html("");
			} else {
				regFlag = false;
			}
			return regFlag;
		},
		async : false
	});
	return regFlag;
}
function logout() {
	$.ajax({
		url : "user/logout?t=" + new Date().getTime(),
		success : function(data) {
			getLazyImg();
			$("#login").show();
			$("#loginNameShow").hide();
			$("#logout").hide();
			$("#content").hide();
			$("#whisperL").html("");
			$(".container").html("");
			$("#loginName").val("");
			$("#password").val("");
		},
		async : false
	});
}
function login() {
	var loginName = $("#loginName").val();
	var password = $("#password").val();
	var nameNull = false, pwdNull = false;
	if (loginName == "" || loginName == null) {
		$("#sp_name").html("用户名不能为空");
		nameNull = true;
	} else {
		$("#sp_name").html("");
	}
	if (password == "" || password == null) {
		$("#sp_pwd").html("密码不能为空");
		pwdNull = true;
	} else {
		$("#sp_pwd").html("");
	}
	if (nameNull || pwdNull) {
		return;
	}
	$("#sp_name").html("");
	$("#sp_pwd").html("");
	password = hex_sha1(password).toLowerCase();
	var params = {"loginName":loginName, "password":password};
	$.ajax({
		url : "user/login?t=" + new Date().getTime(),
		data : params,
		success : function(d) {
			if (d.result == '1') {
				getMyWhisperList();
				$("#loginNameKey").html(d.data.login_name);
				$("#loginTab").hide();
				$("#content").show();
				$("#login").hide();
				$("#logout").show();
    			$("#loginNameShow").show();
			}
		},
		async : false
	});
}
function reg() {
	if (!regFlag) {
		return;
	}
	var loginName = $("#loginNameR").val();
	var password = $("#passwordR").val();
	var password2 = $("#passwordR2").val();
	var userName = $("#userNameR").val();
	var sex = $("#sex option:selected").val();
	var profile = $("#profile").val();
	
	var nameNull = false, pwdNull = false, pwdEqual = false, unameNull = false;
	if (loginName == "" || loginName == null) {
		$("#sp_name_reg").html("用户名不能为空");
		nameNull = true;
	} else {
		$("#sp_name_reg").html("");
	}
	if (password == "" || password == null) {
		$("#sp_pwd_reg").html("密码不能为空");
		pwdNull = true;
	} else {
		$("#sp_pwd_reg").html("");
	}
	if (password2 == "" || password2 == null) {
		$("#sp_pwd2_reg").html("确认密码不能为空");
		pwdNull = true;
	} else {
		if (password != password2) {
			$("#sp_pwd2_reg").html("两次输入的密码不一致");
			pwdEqual = true;
		} else {
			$("#sp_pwd2_reg").html("");
		}
	}
	if (userName == "" || userName == null) {
		$("#sp_uname_reg").html("姓名不能为空");
		unameNull = true;
	} else {
		$("#sp_uname_reg").html("");
	}
	if (nameNull || pwdNull || pwdEqual || unameNull) {
		return;
	}
	$("#sp_name_reg").html("");
	$("#sp_pwd_reg").html("");
	$("#sp_pwd2_reg").html("");
	$("#sp_uname_reg").html("");
	password = hex_sha1(password).toLowerCase();
	var params = {"loginName" : loginName, "password" : password, "userName" : userName, "sex" : sex, "profile" : profile};
	$.ajax({
		url : "user/reg?t=" + new Date().getTime(),
		data : params,
		type : "post",
		success : function(d) {
			layer.alert(d.msg);
			if (d.result == '1') {
				$("#sp_name_reg").html("");
		    	$("#sp_pwd_reg").html("");
		    	$("#sp_pwd2_reg").html("");
		    	$("#loginNameR").val("");
				$("#passwordR").val("");
				$("#passwordR2").val("");
				$("#userNameR").val("");
				$("#sex").val("1");
				$("#profile").val("");
			} else {
				$("#loginNameR").focus();
			}
		},
		async : false
	});
}
function getLazyImg() {
	$.ajax({
		url : "index/getLazyImg?t=" + new Date().getTime(),
		success : function(data) {
			$(".container").html(data);
			$("img.lazy").lazyload({
		    	effect : "fadeIn"
		    });
		},
		async : true
	});
}
function openWhisperLayer() {
    tmpLayer = layer.open({
        type: 2,
        title: '写下你的whisper',
        fix: false,
        shadeClose: true,
        opacity : 0.6,
        maxmin: true,
        area: ['500px', '350px'],
        content: 'whisper.html',
        end: function() { }
    });
}