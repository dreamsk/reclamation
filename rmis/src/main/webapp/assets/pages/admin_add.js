/**
 * 菜单添加
 */
$(function($) {
	var entityID = getQueryString('id');
	if(entityID) {
		$.post(contextPath + "/sysUser/getUserById", {
			"id": entityID
		}, function(result) {
			$("#form-admin-add").JsonToForm(result);
			$("#remark").val(result.remark)
		});
	}

	$('input[type=radio]').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

	$("#form-admin-add").validate({
		rules: {
			username: {
				required: true,
				minlength: 2,
				maxlength: 10
			},
			password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
			roleId: "required",
			email: {
				required: true,
				email: true
			}
		},
		submitHandler: function(form) {
			$.ajax({
				type: "post",
				url: contextPath + "/sysUser/" + (entityID ? "update" : "add"),
				data: $(form).serialize(),
				dataType: "json",
				success: function(data) {
					if(data.status == '200') {
						var message = entityID ? '更新成功!' : '添加成功!';
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引,隐藏layer层和shade
						parent.$('#layui-layer' + index).css({'display': 'none'});
						parent.$('#layui-layer-shade' + index).css({'display': 'none'});
						parent.reloadTable(); //再刷新DT
						parent.showSuccessMessage(message, null, function() {
							parent.layer.close(index); //然后执行关闭     
						});
					} else {
						var message = entityID ? '添加成功!' : '添加失败!';
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

	var setting = {
		async: {
			autoParam: ["parentid=parentid"],
			contentType: "application/x-www-form-urlencoded",
			enable: true,
			type: "post",
			url: contextPath + "/sysRole/selectAll"
		},
		view: {
			selectedMulti: false
		},
		check: {
			enable: false
		},
		edit: {
			drag: {
				isCopy: false,
				isMove: false
			},
			enable: false
		},
		data: {
			key: {
				name: "name",
				title: "name",
				url: "undefined"
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentid",
				rootPId: null
			}
		},
		callback: {
			onClick: zTreeOnClick
		}
	};

	$.fn.zTree.init($("#tree"), setting);

	$('#roleName').on('focus', function() {
		var cityObj = $("#roleName");
		var cityOffset = $("#roleName").offset();
		$("#menuContent").css({
			left: cityOffset.left + "px",
			top: (cityOffset.top + cityObj.outerHeight() - 15) + "px",
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
	$('#roleName').val(treeNode.name);
	$('#roleId').val(treeNode.id);
	$("#menuContent").css({
		left: 0,
		top: 0,
		display: "none",
		width: 0
	}).fadeOut("fast");
	return false;
};