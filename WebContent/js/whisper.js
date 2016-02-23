var tmpLayer;
$(function () {
	initWhisperEvent();
});
function initWhisperEvent() {
    $("#whisperCon").find("#whisperCfm").click(function() {
    	var content = $("#whisperMsg").val();
    	if (content == null || content.length == 0) {
    		window.parent.layer.alert("请填写内容！");
    		return;
    	}
    	window.parent.layer.confirm("是否保存", function(yes) {
    		if (yes) {
    			$("#whisperCon").find("#whisperCfm").attr("disabled", "disabled");
    			$.ajax({
    	    		url : "whisper/addWhisper?t=" + new Date().getTime(),
    	    		data : {"content" : content},
    	    		type : "post",
    	    		success : function(data) {
    	    			$("#whisperCon").find("#whisperCfm").removeAttr("disabled");
    	    			window.parent.layer.alert(data.msg);
    	    			if (data.result == '1') {
    	    				var whisperLst = $('#whisperL', window.parent.document);
    	    				whisperLst.find("tr:gt(0)").remove();
    	    				$.ajax({
    	        	    		url : "index/getWhisperList?t=" + new Date().getTime(),
    	        	    		data : {"content" : content},
    	        	    		type : "post",
    	        	    		success : function(data) {
    	        	    			var html = [];
    	    						for (var i = 0, len = data.length; i < len; i++) {
    	    							html.push("<tr style=\"font-size: 14px; color: #c22;\"><td>" + data[i].content + "</td><td>" + data[i].user_name + "</td><td>" + utcToDate(data[i].create_time) + "</td><td>" + data[i].ip + "</td></tr>");
    	    						}
    	    						whisperLst.append(html.join(""));
    	    						window.parent.layer.closeAll();
    	        	    		},
    	        	    		async : false
    	    				});
    	    			}
    	    		},
    	    		async : false
    	    	});
    		} else {
    			window.parent.layer.closeAll();
    		}
    	});
    }).end().find("#whisperClr").click(function() {
    	$("#whisperMsg").val("");
    });
}