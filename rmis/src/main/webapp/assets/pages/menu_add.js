/**
 * 菜单添加
 */
$(function($) {
	//新增页面不传id参数,所以entityId是null
	var entityID = getQueryString('id');
	//if(entityID)是判断entityId参数不是null
	if(entityID) {
		//根据id进行查询
		//JsonToForm可以把实体类转化的json对象按照标签中的name属性进行填充
		//sort:1     name="sort"   填充值为1
		$.post(contextPath + "/sysMenu/getMenuById", {"id": entityID}, function(result) {
			$("#form-add").JsonToForm(result);
		});
	}
//jq美化单选按钮
	$('input[type=radio]').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});
//表格校验
	$("#form-add").validate({
		//校验规则
		//给标签指定nama属性的值  根据值定义规则
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 10
			},
			type: "required",
			status: "required",
			url: {
				maxlength: 1000
			},
			sort: {
				digits: true
			}
		},
		//submitHandler 点击提交按钮之后的代码逻辑
		//参数form就是要提交表单的jquery对象
		submitHandler: function(form) {
			$.ajax({
				type: "post",
				url: contextPath + "/sysMenu/"+(entityID?"update":"add"),
				data: $(form).serialize(),
				dataType: "json",
				success: function(data) {
					if(data.status == 200) {
						var message = entityID?'更新成功!':'添加成功!';
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引,隐藏layer层和shade
						parent.$('#layui-layer'+index).css({'display':'none'});
	                    parent.$('#layui-layer-shade'+index).css({'display':'none'});
	                    parent.reloadTable(); //再刷新DT
						parent.showSuccessMessage(message, null, function() {
							parent.layer.close(index); //然后执行关闭     
						});
					} else {
						var message = entityID?'添加成功!':'添加失败!';
						parent.showFailMessage(message);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
					return false;
				}
			});
			return false;
		}
	});

	$.Huitab("#tab-category .tabBar span", "#tab-category .tabCon", "current", "click", "0");
//组装ztree树形结构
	var setting = {
		async: {
			autoParam: ["parentId=parentId"],
			contentType: "application/x-www-form-urlencoded",
			enable: true,
			type: "post",
			url: contextPath + "/sysMenu/selectAll"
		},
		view: {
			selectedMulti: false//设置是否允许同时选中多个节点
		},
		check: {
			enable: false//设置 zTree 的节点上是否显示 checkbox / radio
		},
		edit: {
			drag: {
				isCopy: false,
				isMove: false
			},
			enable: false//设置 zTree 是否处于编辑状态
		},
		data: {
			key: {
				name: "name",//树形结构节点展示名称，sysMenu的name属性值
				title: "name",//鼠标悬停的显示节点名称
				url: "undefined"
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentId",
				rootPId: null
			}
		},
		callback: {
			onClick: zTreeOnClick
		}
	};

	$.fn.zTree.init($("#tree"), setting);//请求数据，组装树形结构，放到页面
//点击上级菜单输入框获得焦点的事件
	$('#parentName').on('focus', function() {
		var cityObj = $("#parentName");
		var cityOffset = $("#parentName").offset();
		$("#menuContent").css({
			left: cityOffset.left + "px",
			top: (cityOffset.top + cityObj.outerHeight()) + "px",
			display: "block",
			width: (cityObj.outerWidth() - 3) + "px"
		}).slideDown("fast");

		$("body").bind("mousedown", function() {
			if(!(event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
				$("#menuContent").css({
					left: 0,
					top: 0,
					display: "none",
					width: 0
				}).fadeOut("fast");
			}
		});
	});

	$('#iconSelect').on('focus', function() {
		var cityObj = $("#iconSelect");
		var cityOffset = $("#iconSelect").offset();
		$("#iconContent").css({
			left: cityOffset.left + "px",
			top: (cityOffset.top + cityObj.outerHeight()) + "px",
			display: "block",
			width: (cityObj.outerWidth() - 3) + "px"
		}).slideDown("fast");

		$("body").bind("mousedown", function() {
			if(!(event.target.id == "iconContent" || $(event.target).parents("#iconContent").length > 0)) {
				$("#iconContent").css({
					left: 0,
					top: 0,
					display: "none",
					width: 0
				}).fadeOut("fast");
			}
		});
	});
	
	$("#iconContent").on('click', 'i', function() {
		$("#iconSelect").val($(this).attr('title'));
		$("#iconContent").css({
			left: 0,
			top: 0,
			display: "none",
			width: 0
		}).fadeOut("fast");
	});
});

/**
 * 节点点击回调
 * 
 * @param event
 * @param treeId
 * @param treeNode
 * @returns
 */
function zTreeOnClick(event, treeId, treeNode) {
	$('#parentName').val(treeNode.name);//把当前点击的节点name值给#parentName
	$('#parentId').val(treeNode.id);//同上
	$("#menuContent").css({
		left: 0,
		top: 0,
		display: "none",
		width: 0
	}).fadeOut("fast");
	return false;
};