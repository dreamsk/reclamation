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
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui/css/H-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/H-ui.admin.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/Hui-iconfont/1.0.7/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/icheck/skins/minimal/minimal.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/zTree/v3/css/metroStyle/metroStyle.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/skin/default/skin.css" id="skin" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/style.css" />

		<title>菜单信息</title>
	</head>

	<body>
		<div class="page-container">
			<form method="post" class="form form-horizontal" id="form-add">
				<input type="hidden" name="id"/>
				<div id="tab-category">
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3">菜单图标:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="icon" id="iconSelect" class="input-text" placeholder="菜单图标">
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>菜单名称:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="name" class="input-text" placeholder="菜单名称">
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>权限名称:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="urlkey" class="input-text" placeholder="权限名称">
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>菜单类型:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<span class="select-box">
								<select name="type" class="select">
									<option value="1" selected="selected">根目录</option>
									<option value="2">A标签</option>
									<option value="3">A标签_blank</option>
									<option value="4">外部URL</option>
								</select>
							</span>
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>状态:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input name="status" type="radio" id="status-1" value="1" checked>
							<label for="status-1">显示</label>
							<input name="status" type="radio" id="status-2" value="2">
							<label for="status-2">隐藏</label>
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3">上级菜单:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="parentName" id="parentName" class="input-text" placeholder="点击选取上级菜单">
							<input type="hidden" name="parentId" id="parentId">
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3">链接地址:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="url" class="input-text" placeholder="链接地址">
						</div>
						<div class="col-3"> </div>
					</div>
					<div class="row cl">
						<label class="form-label col-xs-4 col-sm-3">排序:</label>
						<div class="formControls col-xs-8 col-sm-9">
							<input type="text" name="sort" class="input-text" placeholder="排序">
						</div>
						<div class="col-3"> </div>
					</div>
				</div>
				<div class="row cl">
					<div class="col-9 col-offset-3">
						<input id="submit" class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
						<button onClick="removeIframe();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
					</div>
				</div>
			</form>
		</div>
		<div id="menuContent" class="menuContent">
			<ul id="tree" class="ztree"></ul>
		</div>
		<div id="iconContent" class="menuContent">
			<ul>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe616;">&#xe616;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe613;">&#xe613;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe620;">&#xe620;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe622;">&#xe622;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe60d;">&#xe60d;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe62d;">&#xe62d;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe61a;">&#xe61a;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe62e;">&#xe62e;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe67f;">&#xe67f;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe616;">&#xe616;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe613;">&#xe613;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe60f;">&#xe60f;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe633;">&#xe633;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe634;">&#xe634;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe681;">&#xe681;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe636;">&#xe636;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe687;">&#xe687;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe637;">&#xe637;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe691;">&#xe691;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe692;">&#xe692;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe639;">&#xe639;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe623;">&#xe623;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe627;">&#xe627;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe6a5;">&#xe6a5;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe612;">&#xe612;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe685;">&#xe685;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe62b;">&#xe62b;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe62d;">&#xe62d;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe643;">&#xe643;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe6cc;">&#xe6cc;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe621;">&#xe621;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe61e;">&#xe61e;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe618;">&#xe618;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe61c;">&#xe61c;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe6cf;">&#xe6cf;</i> </li>
				<li> <i class="icon Hui-iconfont" title="&amp;#xe654;">&#xe654;</i> </li>
			</ul>
		</div>

		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
		<script type="text/javascript" src="../assets/lib/icheck/icheck.min.js"></script>
		<script type="text/javascript" src="../assets/lib/zTree/v3/js/jquery.ztree.all-3.5.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/jquery.validate.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/messages_zh.min.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
		<script type="text/javascript"> var contextPath = "${pageContext.request.contextPath}"; </script>
		<script type="text/javascript" src="../assets/lib/formHandle.js"></script>
		<script type="text/javascript" src="../assets/pages/commandScript.js"></script>
		<script type="text/javascript" src="../assets/pages/menu_add.js"></script>
	</body>

</html>