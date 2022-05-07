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
		<link rel="stylesheet" type="text/css" href="../assets/lib/icheck/icheck.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/skin/default/skin.css" id="skin" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/style.css" />
		<title>管理平台菜单管理</title>
	</head>

	<body>
		<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 菜单管理
			<a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
		</nav>
		<div class="page-container">
			<div class="text-c">
				<input type="text" id="search" placeholder="菜单名称、id" style="width:250px" class="input-text">
				<button id="doSearch" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i> 搜索</button>
			</div>
			<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"><a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a> <a class="btn btn-primary radius" onclick="system_category_add('添加资讯','system-category-add.jsp')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加菜单</a></span> <span class="r">共有数据：<strong>54</strong> 条</span> </div>
			<div class="mt-20">
				<table class="table table-border table-bordered table-hover table-bg table-sort">
					<thead>
						<tr class="text-c">
							<th width="25"><input type="checkbox" name="" value=""></th>
							<th width="80">ID</th>
							<th width="80">排序</th>
							<th>菜单名称</th>
							<th width="100">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr class="text-c">
							<td><input type="checkbox" name="" value=""></td>
							<td>1</td>
							<td>1</td>
							<td class="text-l">一级菜单</td>
							<td class="f-14">
								<a title="编辑" href="javascript:;" onclick="system_category_edit('菜单编辑','system-category-add.jsp','1','700','480')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a title="删除" href="javascript:;" onclick="article_category_del(this,'1')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
							</td>
						</tr>
						<tr class="text-c">
							<td><input type="checkbox" name="" value=""></td>
							<td>2</td>
							<td>2</td>
							<td class="text-l">&nbsp;&nbsp;├&nbsp;二级菜单</td>
							<td class="f-14">
								<a title="编辑" href="javascript:;" onclick="system_category_edit('菜单编辑','system-category-add.jsp','2','700','480')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a title="删除" href="javascript:;" onclick="article_category_del(this,'2')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
							</td>
						</tr>
						<tr class="text-c">
							<td><input type="checkbox" name="" value=""></td>
							<td>3</td>
							<td>3</td>
							<td class="text-l">&nbsp;&nbsp;├&nbsp;二级菜单</td>
							<td class="f-14">
								<a title="编辑" href="javascript:;" onclick="system_category_edit('菜单编辑','system-category-add.jsp','3','700','480')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a title="删除" href="javascript:;" onclick="system-category_del(this,'3')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
		<script type="text/javascript" src="../assets/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="../assets/lib/datatables/datatables.optimize.js" ></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
		<script type="text/javascript">
			$('.table').DataTable({dom: 'lfrtip'});
		</script>
	</body>

</html>