package com.loongmin4ever.action;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.core.Controller;

public class BaseController extends Controller {

	private static final String SUCC = "1";
	
	private static final String ERROR = "0";
	
	protected Map<String, String> getError(String msg) {
		Map<String, String> result = new HashMap<String, String>();
		result.put("result", ERROR);
		result.put("msg", msg);
		return result;
	}
	
	protected Map<String, String> getSucc(String msg) {
		Map<String, String> result = new HashMap<String, String>();
		result.put("result", SUCC);
		result.put("msg", msg);
		return result;
	}
	
	protected Map<String, Object> getSucc(String msg, Object data) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("result", SUCC);
		result.put("msg", msg);
		result.put("data", data);
		return result;
	}
}
