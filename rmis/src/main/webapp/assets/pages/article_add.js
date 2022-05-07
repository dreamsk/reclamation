$(function() {
	$('#checkbox-pinglun').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

	var entityID = getQueryString('id');
	var editor = UE.getEditor('editor', window.UEDITOR_CONFIG);
	editor.addListener('contentChange', function() {
		editor.sync();
	});
	editor.addListener('ready', function() {
		editor.execCommand( 'focus' ); //编辑器加载完成后，让编辑器拿到焦点
		if(entityID) {
			$.post(contextPath + "/article/getArticle", {
				"id": entityID
			}, function(result) {
				$("#form-add").JsonToForm(result);
				editor.setContent(result.content);
			});
		}
	});


	$("#form-add").validate({
		rules: {
			title: {
				required: true,
				minlength: 2,
				maxlength: 50
			},
			folderName: "required",
			content: "required"
		},
		submitHandler: function(form) {
			$.ajax({
				type: "post",
				url: contextPath + "/article/" + (entityID ? "update" : "add"),
				data: $(form).serialize(),
				dataType: "json",
				async: false,
				success: function(data) {
					if(data.status == 200) {
						var message = entityID ? '更新成功!' : '添加成功!';
						showSuccessMessage(message);
						$(window.parent.document).find('span[data-href="article-list.jsp"]').click();
						$(window.parent.document).find("iframe").each(function() {
							if($(this).attr('src') == 'article-list.jsp') {
								$(this)[0].contentWindow.reloadTable();
							};
						});
						$(window.parent.document).find('span[data-href="article-add.jsp?id='+entityID+'"]').next().click();
					} else {
						var message = entityID ? '更新失败!' : '添加失败!';
						showFailMessage(message);
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

	var setting = {
		async: {
			autoParam: ["id=id"],
			contentType: "application/x-www-form-urlencoded",
			enable: true,
			type: "post",
			url: contextPath + "/folder/selectAll"
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
			enable: false,
			removeTitle: "删除",
			renameTitle: "编辑"
		},
		data: {
			key: {
				name: "name",
				url: undefined
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

	/**
	 * 节点点击回调
	 * 
	 * @param event
	 * @param treeId
	 * @param treeNode
	 * @returns
	 */
	function zTreeOnClick(event, treeId, treeNode) {
		$('#folderName').val(treeNode.name);
		$('#folderId').val(treeNode.id);
		$("#menuContent").css({
			left: 0,
			top: 0,
			display: "none",
			width: 0
		}).fadeOut("fast");
	};

	$.fn.zTree.init($("#tree"), setting);

	$('#folderName').on('focus', function() {
		var cityObj = $("#folderName");
		var cityOffset = $("#folderName").offset();
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