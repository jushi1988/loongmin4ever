package com.loongmin4ever.action;

import java.util.List;

import com.loongmin4ever.entity.User;

public class UserController extends BaseController {

	public void login() {
		String loginName = getPara("loginName");
		String password = getPara("password");
		String sql = "select * from tb_user where login_name = ?";
		List<User> list = User.dao.find(sql, loginName);
		if (list.isEmpty()) {
			this.renderJson(getError("登录失败，无该用户"));
			return;
		}
		User user = list.get(0);
		if (!password.equals(user.get("password"))) {
			this.renderJson(getError("登录失败，密码错误"));
			return;
		}
		user.set("password", null);
		setSessionAttr("user", user);
		this.renderJson(getSucc("登录成功", user));
	}
	
	public void logout() {
		User user = getSessionAttr("user");
		if (user != null) {
			removeSessionAttr("user");
		}
		this.renderJson(getSucc("注销成功"));
	}
}
