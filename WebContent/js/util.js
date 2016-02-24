function utcToDate(n_utc) {
	if (!n_utc || n_utc == null || n_utc == "null" || n_utc == "无")
		return "";
	var date = new Date();
	date.setTime((parseInt(n_utc) + (8 * 3600 * 1000)));
	var s = date.getUTCFullYear() + "-";
	if ((date.getUTCMonth() + 1) < 10) {
		s += "0" + (date.getUTCMonth() + 1) + "-";
	} else {
		s += (date.getUTCMonth() + 1) + "-";
	}
	if (date.getUTCDate() < 10) {
		s += "0" + date.getUTCDate();
	} else {
		s += date.getUTCDate();
	}
	if (date.getUTCHours() < 10) {
		s += " 0" + date.getUTCHours() + ":";
	} else {
		s += " " + date.getUTCHours() + ":";
	}
	if (date.getMinutes() < 10) {
		s += "0" + date.getUTCMinutes() + ":";
	} else {
		s += date.getUTCMinutes() + ":";
	}
	if (date.getUTCSeconds() < 10) {
		s += "0" + date.getUTCSeconds();
	} else {
		s += date.getUTCSeconds();
	}

	return s;
}

function getWhisperList() {
	$("#whisperNewL").find("tr:gt(0)").remove();
	$.ajax({
		url : "index/getWhisperList?t=" + new Date().getTime(),
		success : function(data) {
			var html = [];
			for (var i = 0, len = data.length; i < len; i++) {
				html.push("<tr style=\"font-size: 14px; color: #c22;\"><td>" + data[i].content + "</td><td>" + data[i].user_name + "</td><td>" + utcToDate(data[i].create_time) + "</td><td>" + data[i].ip + "</td></tr>");
			}
			$("#whisperNewL").append(html.join(""));
		},
		async : false
	});
}
function getMyWhisperList() {
	$("#whisperL").find("tr:gt(0)").remove();
	$.ajax({
		url : "whisper/getMyWhisperList?t=" + new Date().getTime(),
		success : function(data) {
			var html = [];
			for (var i = 0, len = data.length; i < len; i++) {
				html.push("<tr style=\"font-size: 14px; color: #c22;\"><td>"
							+ data[i].content
							+ "</td><td>"
							+ data[i].user_name
							+ "</td><td>"
							+ utcToDate(data[i].create_time)
							+ "</td><td>"
							+ data[i].ip
							+ "</td><td><input type=\"radio\" name=\"isHidden" + data[i].id +"\" value=\"0\" " + (data[i].is_hidden == '0' ? 'checked' : '') + "/>公开<input type=\"radio\" name=\"isHidden" + data[i].id +"\" value=\"1\" " + (data[i].is_hidden == '1' ? 'checked' : '') + "/>不公开&nbsp;</td></tr>");
			}
			$("#whisperL").append(html.join(""));
		},
		async : false
	});
}