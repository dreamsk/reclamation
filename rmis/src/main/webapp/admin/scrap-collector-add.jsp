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
			<form class="form form-horizontal" id="form-scrap-collector-add">
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>回收员姓名：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="回收员姓名" id="name" name="name">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>性别：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<div class="radio-box" onclick="sexCheck('sex_0');">
							<input name="sex" type="radio" id="sex-0" value="sex_0" checked="checked">
							<label for="sex-0">男</label>
						</div>
						<div class="radio-box" onclick="sexCheck('sex_1');">
							<input type="radio" id="sex-1" name="sex" value="sex_1">
							<label for="sex-1">女</label>
						</div>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3">手机：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="手机号码" id="tel" name="tel">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3">身份证号码：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="身份证号码" name="idCard" id="idCard">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>所属省市：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input id="provinceCode" name="provinceCode" type="hidden">
						<input id="cityCode" name="cityCode" type="hidden">
						<input type="text" class="input-text" placeholder="所属省市" name="provinceName" id="provinceName" readonly="readonly">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-3">负责小区：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input id="housingEstateCode" name="housingEstateCode" type="hidden">
						<input type="text" class="input-text" placeholder="负责小区" name="housingEstate" id="housingEstate" readonly="readonly">
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
		<div id="he" class="menuContent">
			<ul id="he_tree" class="ztree"></ul>
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
		<script type="text/javascript" src="../assets/pages/scrap_collector_add.js"></script>

	</body>

</html>