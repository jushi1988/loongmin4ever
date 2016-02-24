package com.loongmin4ever.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.loongmin4ever.entity.User;

public class UserInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		Controller controller = inv.getController();
		User user = controller.getSessionAttr("user");
		if (user == null) {
			inv.invoke();
		} else {
			System.out.println("user:" + user.get("login_name") + " login ok, time:" + System.currentTimeMillis());
			inv.invoke();
		}
	}

}
