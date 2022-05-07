<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="renderer" content="webkit|ie-comp|ie-stand">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta http-equiv="Cache-Control" content="no-siteapp" />
		<LINK rel="Bookmark" href="../assets/favicon.ico">
		<LINK rel="Shortcut Icon" href="../assets/favicon.ico" />
		<link href="../assets/static/h-ui/css/H-ui.min.css" rel="stylesheet" type="text/css" />
		<link href="../assets/static/h-ui.admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
		<link href="../assets/static/h-ui.admin/css/style.css" rel="stylesheet" type="text/css" />
		<link href="../assets/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
		<title>后台登录</title>
	</head>

	<body>
		<div class="header"></div>
		<div class="loginWraper">
			<div id="loginform" class="loginBox">
				<form class="form form-horizontal" method="post">
					<div class="row cl">
						<label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60d;</i></label>
						<div class="formControls col-xs-8">
							<input id="username" name="username" type="text" placeholder="用户名" value="admin" class="input-text size-L">
						</div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60e;</i></label>
						<div class="formControls col-xs-8">
							<input id="password" name="password" type="password" placeholder="密码" value="920903" class="input-text size-L">
						</div>
					</div>
					<div class="row cl">
						<div class="formControls col-xs-8 col-xs-offset-3">
							<input class="input-text size-L" type="text" placeholder="验证码" name="ValidateCode" value="1234" style="width:235px;">
							<img src="${pageContext.request.contextPath}/sysUser/getValidateCode">
						</div>
					</div>
					<div class="row cl">
						<div class="formControls col-xs-8 col-xs-offset-3">
							<input type="button" id="login_btn" class="btn btn-success radius size-L" value="&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;">
							<input type="reset" class="btn btn-default radius size-L" value="&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;">
						</div>
					</div>
                    <div class="row cl">
                        <div class="formControls col-xs-8 col-xs-offset-3">
                            <span class="social-login"></span>
                        </div>
                    </div>
				</form>
			</div>
		</div>
		<div class="footer">Copyright 2016 All Rights Reserved.</div>
		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/lib/md5/md5.js" ></script>
		<script>var contextPath = "${pageContext.request.contextPath}";</script>
		<script type="text/javascript" src="../assets/pages/login.js" ></script>

	</body>

</html>