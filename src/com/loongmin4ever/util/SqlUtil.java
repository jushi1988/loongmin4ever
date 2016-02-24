package com.loongmin4ever.util;

public class SqlUtil {

	// 查询最新发布的whisper
	public static final String GETLATESTWHISPERS = PropertiesUtil.read("sql.properties", "getLatestWhispers");
	
	// 查询我发布的whisper
	public static final String GETMYWHISPERS = PropertiesUtil.read("sql.properties", "getMyWhispers");
}