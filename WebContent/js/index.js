var tmpLayer;
$(function () {
	init();
	bindEvent();
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
				getLazyImg();
				getWhisperList();
				$("#content").show();
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
    	$.ajax({
    		url : "user/logout?t=" + new Date().getTime(),
    		success : function(data) {
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
				$("#loginNameKey").html(d.data.login_name);
				getLazyImg();
				getWhisperList();
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