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
		<LINK rel="Bookmark" href="/favicon.ico">
		<LINK rel="Shortcut Icon" href="/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui/css/H-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/H-ui.admin.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/Hui-iconfont/1.0.7/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/icheck/skins/minimal/minimal.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/zTree/v3/css/metroStyle/metroStyle.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/skin/default/skin.css" id="skin" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/style.css" />

		<title>添加管理员 - 管理员管理</title>
	</head>

	<body>
		<article class="page-container">
			<form class="form form-horizontal" id="form-housing-estate-add">
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>小区编码：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="小区编码" id="code" name="code">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>小区名称：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="小区名称" id="name" name="name">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>住户数：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="住户数" id="quantity" name="quantity">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>省市：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input id="provinceCode" name="provinceCode" type="hidden">
						<input id="cityCode" name="cityCode" type="hidden">
						<input type="text" class="input-text" placeholder="省市" name="provinceName" id="provinceName" readonly="readonly">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3">详细地址：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="详细地址" id="address" name="address">
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3">
						<input class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
						<button onClick="removeIframe();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
					</div>
				</div>
				<input id="id" name="id" type="hidden">
			</form>
		</article>
		<div id="menuContent" class="menuContent">
			<ul id="tree" class="ztree"></ul>
		</div>

		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
		<script type="text/javascript" src="../assets/lib/icheck/icheck.min.js"></script>
		<script type="text/javascript" src="../assets/lib/zTree/v3/js/jquery.ztree.all-3.5.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/jquery.validate.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/messages_zh.min.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
		<script type="text/javascript">
			var contextPath = "${pageContext.request.contextPath}";
		</script>
		<script type="text/javascript" src="../assets/lib/formHandle.js"></script>
		<script type="text/javascript" src="../assets/pages/commandScript.js"></script>
		<script type="text/javascript" src="../assets/pages/housing_estate_add.js"></script>

	</body>

</html>