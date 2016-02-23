package com.loongmin4ever.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 读取配置文件信息
 */
public class PropertiesUtil {
	
	private PropertiesUtil() { }

	/**
	 * 获取配置文件中的值
	 * 
	 * @param path
	 *            配置文件路径
	 * @param key
	 *            配置文件中的key
	 * @return
	 */
	public static String read(String path, String key) {
		// 读取配置文件
		InputStream in = PropertiesUtil.class.getClassLoader().getResourceAsStream(path);
		Properties p = new Properties();
		try {
			p.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		// 取得配置文件中的值
		return p.getProperty(key);
	}

	public static void main(String[] args) throws InterruptedException {
		String value = PropertiesUtil.read("conf.properties", "db.url");
		System.out.println(value);
	}
}