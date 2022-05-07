/**
 * 菜单添加
 */
$(function($) {
	var entityID = getQueryString('id');
	if(entityID) {
		$.post(contextPath + "/sysDict/getDictById", {
			"id": entityID
		}, function(result) {
			$("#form-dict-add").JsonToForm(result);
		});
	}


	$("#form-dict-add").validate({
		rules: {
			
		},
		submitHandler: function(form) {
			$.ajax({
				type: "post",
				url: contextPath + "/sysDict/" + (entityID ? "update" : "add"),
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

});
