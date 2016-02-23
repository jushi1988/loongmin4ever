package com.loongmin4ever.conf;

import com.jfinal.config.Routes;
import com.loongmin4ever.action.IndexController;
import com.loongmin4ever.action.UserController;
import com.loongmin4ever.action.WhisperController;

public class CommonRoute extends Routes {

	@Override
	public void config() {
        add("/", IndexController.class);
		// 首页控制
        add("/index", IndexController.class);
        // 用户模块控制
        add("/user",UserController.class);
        // 悄悄话模块控制
        add("/whisper",WhisperController.class);
	}

}
