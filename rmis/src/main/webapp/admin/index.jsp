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
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui/css/H-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/H-ui.admin.css" />
		<link rel="stylesheet" type="text/css" href="../assets/lib/Hui-iconfont/1.0.7/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/skin/default/skin.css" id="skin" />
		<link rel="stylesheet" type="text/css" href="../assets/static/h-ui.admin/css/style.css" />
		<title>管理平台首页</title>
	</head>

	<body>
		<header class="navbar-wrapper">
			<div class="navbar navbar-fixed-top">
				<div class="container-fluid cl">
					<a class="logo navbar-logo f-l mr-10 hidden-xs">小区业主服务平台后台管理系统</a>
					<a class="logo navbar-logo-m f-l mr-10 visible-xs"></a> <span class="logo navbar-slogan f-l mr-10 hidden-xs">v1.0</span>
					<a aria-hidden="false" class="nav-toggle Hui-iconfont visible-xs" href="javascript:;">&#xe667;</a>
					
					<nav id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">
						<ul class="cl">
							<li>超级管理员</li>
							<li class="dropDown dropDown_hover">
								<a href="#" class="dropDown_A">admin <i class="Hui-iconfont">&#xe6d5;</i></a>
								<ul class="dropDown-menu menu radius box-shadow">
									<li>
										<a href="#">个人信息</a>
									</li>
									<li>
										<a href="#">切换账户</a>
									</li>
									<li>
										<a href="${pageContext.request.contextPath}/sysUser/logout">退出</a>
									</li>
								</ul>
							</li>
							<li id="Hui-msg">
								<a href="#" title="消息"><span class="badge badge-danger">1</span><i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i></a>
							</li>
							<li id="Hui-skin" class="dropDown right dropDown_hover">
								<a href="javascript:;" class="dropDown_A" title="换肤"><i class="Hui-iconfont" style="font-size:18px">&#xe62a;</i></a>
								<ul class="dropDown-menu menu radius box-shadow">
									<li>
										<a href="javascript:;" data-val="default" title="默认（黑色）">默认（黑色）</a>
									</li>
									<li>
										<a href="javascript:;" data-val="blue" title="蓝色">蓝色</a>
									</li>
									<li>
										<a href="javascript:;" data-val="green" title="绿色">绿色</a>
									</li>
									<li>
										<a href="javascript:;" data-val="red" title="红色">红色</a>
									</li>
									<li>
										<a href="javascript:;" data-val="yellow" title="黄色">黄色</a>
									</li>
									<li>
										<a href="javascript:;" data-val="orange" title="绿色">橙色</a>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
		<aside class="Hui-aside">
			<input runat="server" id="divScrollValue" type="hidden" value="" />
			<div class="menu_dropdown bk_2">
				<dl id="menu-admin">
					<dt><i class="Hui-iconfont">&#xe62d;</i> 权限管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="system-menu-list.jsp" data-title="菜单管理" href="javascript:void(0)">菜单管理</a>
							</li>
							<li>
								<a _href="system-role-list.jsp" data-title="角色管理" href="javascript:void(0)">角色管理</a>
							</li>
							<li>
								<a _href="system-admin-list.jsp" data-title="用户管理" href="javascript:void(0)">用户管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-scrap">
					<dt><i class="Hui-iconfont">&#xe616;</i> 废品管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="scrap-list.jsp" data-title="废品管理" href="javascript:void(0)">废品管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-scrap-collector">
					<dt><i class="Hui-iconfont">&#xe613;</i> 废品回收员管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="scrap-collector-list.jsp" data-title="废品回收员管理" href="javascript:void(0)">废品回收员管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-reclamation-order">
					<dt><i class="Hui-iconfont">&#xe622;</i> 废品回收订单管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="reclamation-order-list.jsp" data-title="废品回收订单管理" href="javascript:void(0);">废品回收订单管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-owner">
					<dt><i class="Hui-iconfont">&#xe622;</i> 业主管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="owner-list.jsp" data-title="业主管理" href="javascript:void(0);">业主管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-housing-estate">
					<dt><i class="Hui-iconfont">&#xe622;</i> 小区管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="housing-estate-list.jsp" data-title="小区管理" href="javascript:void(0);">小区管理</a>
							</li>
						</ul>
					</dd>
				</dl>
				<dl id="menu-system">
					<dt><i class="Hui-iconfont">&#xe62e;</i> 系统管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
					<dd>
						<ul>
							<li>
								<a _href="system-base.jsp" data-title="系统设置" href="javascript:void(0)">系统设置</a>
							</li>
							<li>
								<a _href="system-dict-list.jsp" data-title="数据字典" href="javascript:void(0)">数据字典</a>
							</li>
							<li>
								<a _href="system-shielding.jsp" data-title="屏蔽词" href="javascript:void(0)">屏蔽词</a>
							</li>
							<li>
								<a _href="system-log.jsp" data-title="系统日志" href="javascript:void(0)">系统日志</a>
							</li>
						</ul>
					</dd>
				</dl>
			</div>
		</aside>
		<div class="dislpayArrow hidden-xs">
			<a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a>
		</div>
		<section class="Hui-article-box">
			<div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
				<div class="Hui-tabNav-wp">
					<ul id="min_title_list" class="acrossTab cl">
						<li class="active"><span title="我的桌面" data-href="welcome.jsp">我的桌面</span><em></em></li>
					</ul>
				</div>
				<div class="Hui-tabNav-more btn-group">
					<a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a>
					<a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a>
				</div>
			</div>
			<div id="iframe_box" class="Hui-article">
				<div class="show_iframe">
					<div style="display:none" class="loading"></div>
					<iframe scrolling="yes" frameborder="0" src="welcome.jsp"></iframe>
				</div>
			</div>
		</section>
		<script type="text/javascript" src="../assets/lib/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="../assets/lib/layer/2.1/layer.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui/js/H-ui.js"></script>
		<script type="text/javascript" src="../assets/static/h-ui.admin/js/H-ui.admin.js"></script>
		<script type="text/javascript">
			
		</script>
	</body>

</html>