package com.loongmin4ever.action;

import java.util.List;
import java.util.UUID;

import com.loongmin4ever.entity.User;
import com.loongmin4ever.entity.Whisper;
import com.loongmin4ever.util.HttpUtil;
import com.loongmin4ever.util.SqlUtil;

public class WhisperController extends BaseController {

	public void addWhisper() {
		String content = getPara("content");
		String isHidden = getPara("isHidden");
		content = content.replace("<", "&lt;");
		content = content.replace(">", "&gt;");
		// 是否隐藏
		isHidden = (isHidden != null && isHidden.length() > 0 ? isHidden : "0");
		User user = getSessionAttr("user");
		if (user == null) {
			this.renderJson(getError("用户已注销"));
			return;
		}
		String userId = user.get("id");
		Whisper whisper = new Whisper();
		whisper.set("create_time", String.valueOf(System.currentTimeMillis()));
		whisper.set("id", UUID.randomUUID().toString());
		whisper.set("is_hidden", isHidden);
		whisper.set("user_id", userId);
		whisper.set("content", content);
		whisper.set("ip", HttpUtil.getIpAddr(getRequest()));
		whisper.save();
		this.renderJson(getSucc("保存成功"));
		System.out.println("save whisper[" + content + "] ok by " + userId);
	}
	
	public void setWhisperHidden() {
		String id = getPara("id");
		String isHidden = getPara("isHidden");
		if (isHidden != null && isHidden.length() > 0) {
			Whisper whisper = new Whisper();
			whisper.set("id", id);
			whisper.set("is_hidden", isHidden);
			whisper.update();
			System.out.println("modify whisper is_hidden to " + isHidden + " ok");
			this.renderJson(getSucc("更新成功"));
			return;
		}
		this.renderJson(getSucc("更新失败，参数为空！"));
		System.out.println("modify whisper is_hidden fail, is_hidden is empty");
	}
	
	public void getMyWhisperList() {
		User user = getSessionAttr("user");
		if (user != null) {
			String userId = user.get("id");
			List<Whisper> list = Whisper.dao.find(SqlUtil.GETMYWHISPERS, userId);
			this.renderJson(list);
			return;
		}
		this.renderNull();
	}
}