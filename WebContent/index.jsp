<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>风雨共济</title>
<link type="text/css" href="css/index.css" rel="stylesheet" />
<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">
<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">
</head>
<body>
<span style="color:rgb(178, 79, 245);">风雨共济，笑看人生</span><a href="javascript:void(0);" id="reg" style="color: green; font-size:14px; font-weight: bold; margin-left: 20px;">注册</a>
<a href="javascript:void(0);" id="login" style="float: right; color:red; font-size:14px; font-weight: bold;">登录</a>&nbsp;&nbsp;&nbsp;&nbsp;<div id="loginNameShow" style="float: right;margin-left: 10px; display: none;">您好，<span style="color:red;" id="loginNameKey"></span></div>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="logout" style="float: right; color: green; font-size:14px; font-weight: bold; display: none;">注销</a>
<hr />
<div id="content" style="display: none;">
Whisper <a href="javascript:void(0);" id="openWhisper" style="font-size: 14px;color: blue;">写whisper</a>
<br/>
<br/>
<table style="border: 1px solid #8dc;" cellpadding="0" border="1" bordercolor="#8dc;" id="whisperL">
	<tr><td style="width: 150px; font-weight:bold;">内容</td><td style="width: 150px;font-weight:bold;">发布者</td><td style="width: 150px;font-weight:bold;">时间</td><td style="width: 100px;font-weight:bold;">ip</td></tr>
</table>
<hr />
Image Lazy Load
<br/>
<br/>
<center>
<div class="container">
</div>
</center>
</div>
<table id="loginTab" border="1" style="border: 1px solid #cd1; display: none;width: 400px;">
	<tr><td style="width: 100px;">用户名：</td><td><input type="text" id="loginName" name="loginName" maxlength="30" size="20" /><span id="sp_name" style="color: red;"></span></td></tr>
	<tr><td>密码：</td><td><input type="password" id="password" name="password" maxlength="30" size="20" /><span id="sp_pwd" style="color: red;"></span></td></tr>
	<tr><td colspan="2" style="text-align: center;"><button id="loginCfm" style="border: 1px solid #c22;">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="loginCan" style="border: 1px solid #c22;">取消</button></td></tr>
</table>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/jquery.lazyload.js"></script>
<script src="js/layer/layer.js"></script>
<script src="js/sha1.js"></script>
<script src="js/util.js"></script>
<script src="js/index.js"></script>
</body>
</html>