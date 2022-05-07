<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>ueditor图片对话框</title>
		<link rel="stylesheet" type="text/css" href="../../../../../static/h-ui/css/H-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../static/h-ui.admin/css/H-ui.admin.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../lib/Hui-iconfont/1.0.7/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../../../../../static/h-ui.admin/skin/default/skin.css" id="skin" />
		<link rel="stylesheet" type="text/css" href="../../../../../static/h-ui.admin/css/style.css" />
		<link rel="stylesheet" href="attachment.css" type="text/css" />
		<style type="text/css">
			#doSearch {
				margin: 0;
				line-height: 14px !important;
				height: 28px;
			}
		</style>
	</head>

	<body>

		<div class="wrapper">
			<div>
				文件类型:
				<div class="select-box" style="width: 90px;">
					<select class="select" id="fType">
						<option selected="selected" value="">请选择</option>
						<option value="0">图片</option>
						<option value="1">压缩文件</option>
						<option value="2">Word文档</option>
						<option value="3">Excel文档</option>
						<option value="4">PDF文档</option>
						<option value="5">TXT文档</option>
						<option value="6">视频</option>
						<option value="7">其它</option>
					</select>
				</div>
				日期范围:
				<input type="text" onfocus="WdatePicker({maxDate:new Date()});$('#timeMax').val('');" id="timeMin" class="input-text Wdate" style="width:120px;"> -
				<input type="text" onfocus="WdatePicker({minDate:new Date(((new Date($('#timeMin').val()))/1000+86400)*1000),dchanged:dchanged})" id="timeMax" class="input-text Wdate" style="width:120px;">
				<input type="text" id="search" placeholder=" 文件名称" style="width:100px" class="input-text">
				<button id="doSearch" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i></button>
			</div>
			<!-- 在线图片 -->
			<div id="online" class="panel">
				<div id="fileList"><var id="lang_imgLoading"></var></div>
			</div>
		</div>

		<script type="text/javascript" src="../internal.js"></script>
		<script type="text/javascript" src="../../../../jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../../../../../lib/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="../../../../../static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../../../../../static/h-ui.admin/js/H-ui.admin.js"></script>
		<script>
			var contextPath = "${pageContext.request.contextPath}",
				IMGDOMAIN = "${sessionScope.IMGDOMAIN}";
		</script>
		<script type="text/javascript" src="attachment.js"></script>
	</body>

</html>