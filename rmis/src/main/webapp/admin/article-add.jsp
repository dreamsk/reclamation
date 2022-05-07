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

		<title>新增文章 - 资讯管理</title>
	</head>

	<body style="padding-bottom: 10px;">
		<article class="page-container">
			<form class="form form-horizontal" id="form-add">
				<input type="hidden" name="id"/>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>文章标题：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="文章标题" id="title" name="title">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>所属栏目：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="hidden" id="folderId" name="folderId">
						<input type="text" class="input-text" placeholder="所属栏目" id="folderName" name="folderName" readonly="readonly">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">排序值：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" value="0" placeholder="排序" id="sort" name="sort">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">关键词：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" name="keywords" placeholder="添加关键词利于SEO,用,分隔">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">文章来源：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" class="input-text" placeholder="文章来源链接" id="jumpUrl" name="jumpUrl">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">允许评论：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="checkbox" id="checkbox-pinglun" value="1" name="isRecommend">
						<label for="checkbox-pinglun">&nbsp;</label>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">评论开始日期：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()});$('#datemax').val('');" id="datemin" name="startTime" class="input-text Wdate">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">评论结束日期：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date(((new Date($('#datemin').val()))/1000+86400)*1000)})" id="datemax" name="endTime" class="input-text Wdate">
					</div>
				</div>
				<!--<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">使用独立模版：</label>
					<div class="formControls col-xs-8 col-sm-9 skin-minimal">
						<div class="check-box">
							<input type="checkbox" id="checkbox-moban">
							<label for="checkbox-moban">&nbsp;</label>
						</div>
						<button onClick="mobanxuanze()" class="btn btn-default radius ml-10">选择模版</button>
					</div>
				</div>-->
				<div class="row cl">
					<label class="form-label col-xs-4 col-sm-2">文章内容：</label>
					<div class="formControls col-xs-8 col-sm-9">
						<textarea id="editor" type="text/plain" style="width:100%;height:400px;"></textarea>
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
						<input id="submit" class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
						<button onClick="removeIframe();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
					</div>
				</div>
			</form>
		</article>

		<div class="menuContent" id="menuContent">
			<ul id="tree" class="ztree"></ul>
		</div>

		<!--_footer 作为公共模版分离出去-->
		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
		<script type="text/javascript" src="../assets/lib/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
		<script type="text/javascript" src="../assets/lib/icheck/icheck.min.js"></script>
		<script type="text/javascript" src="../assets/lib/zTree/v3/js/jquery.ztree.all-3.5.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/jquery.validate.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/additional-methods.min.js"></script>
		<script type="text/javascript" src="../assets/lib/jquery.validation/1.14.0/messages_zh.min.js"></script>
		<script type="text/javascript">
			var contextPath = "${pageContext.request.contextPath}";
		</script>
		<script type="text/javascript" src="../assets/lib/ueditor/1.4.3/ueditor.config.js"></script>
		<script type="text/javascript" src="../assets/lib/ueditor/1.4.3/ueditor.all.js"></script>
		<script type="text/javascript" src="../assets/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"></script>
		<script type="text/javascript" src="../assets/lib/formHandle.js"></script>
		<script type="text/javascript" src="../assets/pages/commandScript.js"></script>
		<script type="text/javascript" src="../assets/pages/article_add.js"></script>
		<!--/请在上方写此页面业务相关的脚本-->
	</body>

</html>