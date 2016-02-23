package com.loongmin4ever.action;

import java.util.List;

import com.jfinal.aop.Before;
import com.loongmin4ever.entity.User;
import com.loongmin4ever.entity.Whisper;
import com.loongmin4ever.interceptor.UserInterceptor;

public class IndexController extends BaseController {

	@Before(UserInterceptor.class)
	public void index() {
		this.render("/");
	}
	
	public void getWhisperList() {
		List<Whisper> list = Whisper.dao.find("select w.*, u.user_name, u.login_name from tb_whisper w left join tb_user u on w.user_id = u.id order by w.create_time desc");
		this.renderJson(list);
	}
	
	public void getLazyImg() {
		StringBuilder imgs = new StringBuilder("");
		for (int i = 0; i < 7; i++) {
			imgs.append("<img class=\"lazy\" data-original=\"./images/eg/eg.jpg\" width=\"770\" height=\"570\">");
		}
		this.renderText(imgs.toString());
	}
	
	public void init() {
		User user = getSessionAttr("user");
		String loginName = "";
		if (user != null) {
			loginName = user.get("login_name");
		}
		this.renderText(loginName);
	}
}