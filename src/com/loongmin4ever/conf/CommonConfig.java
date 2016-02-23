package com.loongmin4ever.conf;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.loongmin4ever.entity.User;
import com.loongmin4ever.entity.Whisper;
import com.loongmin4ever.interceptor.UserInterceptor;
import com.loongmin4ever.util.PropertiesUtil;

public class CommonConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants constants) {
        // 设定为开发者模式
        constants.setDevMode(false);
        constants.setViewType(ViewType.JSP);
	}

	@Override
	public void configHandler(Handlers handlers) {
	}

	@Override
	public void configInterceptor(Interceptors interceptors) {
		interceptors.add(new UserInterceptor());
	}

	@Override
	public void configPlugin(Plugins plugins) {
		 //从配置文件中获取数据库配置项
        String jdbcUrl = PropertiesUtil.read("conf.properties", "db.url");
        String username = PropertiesUtil.read("conf.properties", "db.user");
        String password = PropertiesUtil.read("conf.properties", "db.password");
        int initPoolSize = Integer.valueOf(PropertiesUtil.read("conf.properties", "db.initPoolSize"));
        int maxPoolSize = Integer.valueOf(PropertiesUtil.read("conf.properties", "db.maxPoolSize"));
        C3p0Plugin cp = new C3p0Plugin(jdbcUrl, username, password);
        // 设置连接池大小
        cp.setInitialPoolSize(initPoolSize);
        cp.setMaxPoolSize(maxPoolSize);
        plugins.add(cp);
        ActiveRecordPlugin arp = new ActiveRecordPlugin(cp);
        plugins.add(arp);
        arp.setDialect(new MysqlDialect());
        arp.addMapping("tb_user", "id", User.class);
        arp.addMapping("tb_whisper", "id", Whisper.class);
	}

	@Override
	public void configRoute(Routes routes) {
		routes.add(new CommonRoute());
	}

}