<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>风雨共济</title>
<link type="text/css" href="css/index.css" rel="stylesheet" />
</head>
<body>
风雨共济，笑看人生
<hr />
图片延迟加载
<center>
<div class="container">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
	<img class="lazy" data-original="./images/eg/eg.jpg" width="770" height="570">
</div>
</center>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/jquery.lazyload.js"></script>
<script type="text/javascript">
$(function () {
    $("img.lazy").lazyload({
    	effect : "fadeIn",
    	event: "sporty"
    });
});
$(window).bind("load", function () {
    var timeout = setTimeout(function () {
        $("img.lazy").trigger("sporty");
    }, 2000);
});
</script>
</body>
</html>