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
    	var isHidden = $("#whisperCon").find("input[name='isHidden']:checked").val();
    	window.parent.layer.confirm("是否保存", function(yes) {
    		if (yes) {
    			$("#whisperCon").find("#whisperCfm").attr("disabled", "disabled");
    			$.ajax({
    	    		url : "whisper/addWhisper?t=" + new Date().getTime(),
    	    		data : {"content" : content, "isHidden" : isHidden},
    	    		type : "post",
    	    		success : function(data) {
    	    			$("#whisperCon").find("#whisperCfm").removeAttr("disabled");
    	    			window.parent.layer.alert(data.msg);
    	    			if (data.result == '1') {
    	    				window.parent.location.href = window.parent.location.href;
    	    				window.parent.layer.closeAll();
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