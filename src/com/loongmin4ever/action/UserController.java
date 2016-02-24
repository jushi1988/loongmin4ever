package com.loongmin4ever.action;

import java.util.List;
import java.util.UUID;

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
	
	public void checkLoginName() {
		String loginName = getPara("loginName");
		String sql = "select * from tb_user where login_name = ?";
		List<User> list = User.dao.find(sql, loginName);
		this.renderJson(!list.isEmpty() ? getError("用户名已存在") : getSucc("ok"));
		return;
	}
	
	public void reg() {
		String loginName = getPara("loginName");
		String password = getPara("password");
		String userName = getPara("userName");
		String sex = getPara("sex");
		String profile = getPara("profile");
		String sql = "select * from tb_user where login_name = ?";
		List<User> list = User.dao.find(sql, loginName);
		if (!list.isEmpty()) {
			this.renderJson(getError("注册失败，用户名已存在"));
			return;
		}
		User user = new User();
		String id = UUID.randomUUID().toString().replace("-", "");
		user.set("id", id);
		user.set("login_name", loginName);
		user.set("password", password);
		user.set("user_name", userName);
		user.set("sex", sex);
		user.set("profile", profile);
		user.save();
		System.out.println("save loginName:" + loginName + ", name:" + userName + ", id:" + id + " ok");
		this.renderJson(getSucc("注册成功"));
	}
}