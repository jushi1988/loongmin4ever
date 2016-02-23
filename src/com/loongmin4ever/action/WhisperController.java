package com.loongmin4ever.action;

import java.util.UUID;

import com.loongmin4ever.entity.User;
import com.loongmin4ever.entity.Whisper;
import com.loongmin4ever.util.HttpUtil;

public class WhisperController extends BaseController {

	public void addWhisper() {
		String content = getPara("content");
		content = content.replace("<", "&lt;");
		content = content.replace(">", "&gt;");
		User user = getSessionAttr("user");
		if (user == null) {
			this.renderJson(getError("用户已注销"));
			return;
		}
		String userId = user.get("id");
		Whisper whisper = new Whisper();
		whisper.set("create_time", String.valueOf(System.currentTimeMillis()));
		whisper.set("id", UUID.randomUUID().toString());
		whisper.set("is_hidden", "0");
		whisper.set("user_id", userId);
		whisper.set("content", content);
		whisper.set("ip", HttpUtil.getIpAddr(getRequest()));
		whisper.save();
		this.renderJson(getSucc("保存成功"));
		System.out.println("save whisper[" + content + "] ok by " + userId);
	}
}
