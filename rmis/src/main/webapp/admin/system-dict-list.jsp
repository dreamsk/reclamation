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
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="../assets/static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="../assets/lib/Hui-iconfont/1.0.7/iconfont.css" />
<link rel="stylesheet" type="text/css" href="../assets/lib/icheck/skins/minimal/minimal.css" />
<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>数据字典</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 数据字典 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
  <div class="cl pd-5 bg-1 bk-gray mt-20">
				<div class="l">
					<a href="javascript:;" onclick="del(getDTSelect(), '/sysDict/del/', reloadTable)" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
					<a class="btn btn-primary radius" onclick="add('添加字典','system-dict-add.jsp')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加字典</a>
				</div>
				<div class="r">
					<input type="text" id="search" placeholder="表名" style="width:250px" class="input-text">
					<button id="doSearch" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i> 搜索</button>
				</div>
			</div>
  <div class="mt-20">
    <table class="table table-border table-bordered table-bg table-hover table-sort">
    <thead>
      <tr class="text-c">
        <th width="25"><input type="checkbox" name="" value=""></th>
        <th width="80">名称</th>
        <th width="105">表名</th>
        <th width="105">字段名</th>
        <th width="105">option</th>
        <th width="105">文本值</th>
        <th width="20">排序</th>
        <th width="100">操作</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
</div>
</div>
<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="../assets/lib/icheck/icheck.min.js"></script>
<script type="text/javascript" src="../assets/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript"> var contextPath = "${pageContext.request.contextPath}";</script>
<script type="text/javascript" src="../assets/lib/datatables/datatables.optimize.js"></script>
<script type="text/javascript" src="../assets/pages/commandScript.js"></script>
<script type="text/javascript" src="../assets/pages/dict_list.js"></script>
</body>
</html>