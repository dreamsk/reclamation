/* ------------------------------------------------------------------------------
 *
 *  # Task list view
 *
 *  Specific JS code additions for task_manager_list.html page
 *
 *  Version: 1.0
 *  Latest update: Aug 1, 2015
 *
 * ---------------------------------------------------------------------------- */

var datatable = null,
	setting = null;

$(function() {
	placeholder = '房间信息关键字';

	var guidStatusMap = new HashMap();

	$('.select').select2({
		minimumResultsForSearch: "-1"
	});

	$('.daterange-single').datetimeHandle(); //时间插件

	datatable = $('#datatable').DataTable({
		order: [
			[11, 'desc']
		],
		ajax: {
			url: "/deposit/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('.dataTables_filter input[type=search]').val();
			}
		},
		columns: [{
			data: "roomFullName"
		}, {
			data: "depositType"
		}, {
			data: "premiumReceived"
		}, {
			data: "premiumTime"
		}, {
			data: "premiumer"
		}, {
			data: "premiumerCertificateType"
		}, {
			data: "refunder"
		}, {
			data: "refunderCertificateType"
		}, {
			data: "refundTime"
		}, {
			data: "status"
		}, {
			data: null,
			responsivePriority: 1
		}, {
			data: "modifyTime",
			visible: false
		}],
		columnDefs: [{
			targets: [1],
			render: function(a, b, c, d) {
				return a == 1 ? '装修保证金' : '垃圾处置费';
			}
		}, {
			targets: [3, 8],
			render: function(a, b, c, d) {
				return a ? formatDate(a) : '';
			}
		}, {
			targets: [5],
			render: function(a, b, c, d) {
				return a ? ((a == 1 ? '身份证' : '驾驶证') + '(' + c.premiumerCertificateCode + ')') : '';
			}
		}, {
			targets: [7],
			render: function(a, b, c, d) {
				return a ? ((a == 1 ? '身份证' : '驾驶证') + '(' + c.reunderCertificateCode + ')') : '';
			}
		}, {
			targets: [9],
			responsivePriority: 1,
			render: function(a, b, c, d) {
				return '<select class="select" guid="' + c.guid + '"><option value="0">未缴费</option><option value="1">已缴纳</option><option value="2">已退款</option>';
			}
		}, {
			targets: [10],
			orderable: false,
			render: function(a, b, c, d) {
				var btns = new Array('update', 'refund', 'del');
				return getDataTablesOperateBtn(c.guid, btns, c.status);
			}
		}],
		drawCallback: function() {
			$('.dataTables_length select').select2({
				minimumResultsForSearch: "-1"
			});
			if(guidStatusMap.size() > 0) {
				$('.table .select').each(function() {
					$(this).select2({
						minimumResultsForSearch: "-1"
					});
					$(this).select2('val', guidStatusMap.get($(this).attr('guid')));
				}).change(function() {
					$.post("/deposit/save", {
						guid: $(this).attr('guid'),
						status: $(this).val()
					}, function(result) {
						if(result.status == 0) {
							$.jGrowl('操作成功!', {
								header: '提示信息!',
								theme: 'bg-success'
							});
						} else {
							$.jGrowl('操作失败!', {
								header: '提示信息!',
								theme: 'bg-danger'
							});
						}
					})
				});
			}
		}
	}).on('xhr.dt', function(e, settings, json, xhr) {
		for(var i = 0, ien = json.data.length; i < ien; i++) {
			var data = json.data[i];
			guidStatusMap.put(data.guid, data.status);
		}
	});

	/**
	 * 添加表单验证
	 */
	$("#addForm").bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
		},
		fields: {
			roomGuid: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '房间信息未选择!'
					}
				}
			},
			premiumReceived: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金金额未填写!'
					},
					regexp: {
						regexp: /^([0-9]+|[0-9]+\.{0,1}[0-9]{1,2})$/,
						message: '金额精确到小数点后两位!'
					}
				}
			},
			premiumer: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金缴纳人未填写!'
					}
				}
			},
			premiumerCertificateCode: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金缴纳人证件号未填写!'
					}
				}
			},
			premiumTime: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金缴纳时间未选择!'
					}
				}
			},
			remarks: {
				group: '.col-sm-8',
				validators: {
					stringLength: {
						max: 500,
						message: '不能超过500个字'
					}
				}
			},
		}
	});

	/**
	 * 退费表单验证
	 */
	$("#refundForm").bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
		},
		fields: {
			refunder: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金退费人未填写!'
					}
				}
			},
			reunderCertificateCode: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金退费人证件号未填写!'
					}
				}
			},
			refundTime: {
				group: '.col-sm-4',
				validators: {
					notEmpty: {
						message: '押金退返时间未选择!'
					}
				}
			},
			remarks: {
				group: '.col-sm-8',
				validators: {
					stringLength: {
						max: 500,
						message: '不能超过500个字'
					}
				}
			},
		}
	});

	/**
	 *
	 * 树结构设置
	 */
	setting = {
		async: {
			enable: true,
			autoParam: ["nodeType=nodeType", "nodeId=nodeId"],
			type: "post",
			dataType: "json",
			url: "/floorManager/getPropertyTreeNode"
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
				name: "nodeName"
			},
			simpleData: {
				enable: true,
				idKey: "nodeId",
				pIdKey: "nodeParentId",
				rootPId: null
			}
		},
		callback: {
			onClick: zTreeOnClick
		}
	};

	treeFloor = $.fn.zTree.init($("#tree"), setting);

	/**
	 * Ztree节点点击回调
	 * 
	 * @param event
	 * @param treeId
	 * @param treeNode
	 * @returns
	 */
	function zTreeOnClick(event, treeId, treeNode) {
		if(treeNode.level == 3){
			var roomFullName = "", tempTreeNode = treeNode;
			while(true){
				var parent = tempTreeNode.getParentNode();
				roomFullName = tempTreeNode.nodeName + "-" + roomFullName;
				if(parent){
					tempTreeNode = parent;
				}else{
					break;
				}
			}
			$('#roomFullName').val(roomFullName.substring(0,roomFullName.length-1));
	    	$('#roomGuid').val(treeNode.nodeId);
	    	$("#treeContent").css({left:0,top:0,display:"none",width:0}).fadeOut("fast");
	    }
	};

	$('#roomFullName').on('focus', function() {
		var cityObj = $("#roomFullName");
		var cityOffset = $("#roomFullName").offset();
		$("#treeContent").css({
			left: cityOffset.left + "px",
			top: (cityOffset.top + cityObj.outerHeight() - 50 + 3) + "px",
			display: "block",
			width: cityObj.outerWidth() + "px"
		}).slideDown("fast");

		$("body").bind("mousedown", function() {
			if(!(event.target.id == "treeContent" || $(event.target).parents("#treeContent").length > 0)) {
				$("#treeContent").css({
					left: 0,
					top: 0,
					display: "none",
					width: 0
				}).fadeOut("fast");
			}
		});
	});

	//保存表单
	$("#submit").click(function() {
		$('#addForm').bootstrapValidator('validate');
		if(!$('#addForm').data('bootstrapValidator').isValid()) {
			return false;
		}
		$.post("/deposit/save", $("#addForm").serialize(), function(result) {
			if(result.status == 0) {
				$.jGrowl('保存成功!', {
					header: '提示信息!',
					theme: 'bg-success'
				});
				datatable.ajax.reload();
			} else {
				$.jGrowl('保存失败!', {
					header: '提示信息!',
					theme: 'bg-danger'
				});
			}
			$("#addForm").find("input[type='text']").val('');
			$("#addForm").find("textarea").val('');
			$('#addModal').modal('hide');
		}, "json");
	});

	//押金退返表单
	$("#submit2").click(function() {
		$('#refundForm').bootstrapValidator('validate');
		if(!$('#refundForm').data('bootstrapValidator').isValid()) {
			return false;
		}
		$.post("/deposit/save", $("#refundForm").serialize(), function(result) {
			if(result.status == 0) {
				$.jGrowl('操作成功!', {
					header: '提示信息!',
					theme: 'bg-success'
				});
				datatable.ajax.reload();
			} else {
				$.jGrowl('操作失败!', {
					header: '提示信息!',
					theme: 'bg-danger'
				});
			}
			$("#refundForm").find("input[type='text']").val('');
			$("#refundForm").find("textarea").val('');
			$('#refundModal').modal('hide');
		}, "json");
	});
});

function update(id) {
	setTimeout(function() { //取消验证
		$('#addForm').data('bootstrapValidator').resetForm(false);
	}, 200);

	$.post("/deposit/findDeposit/" + id, function(result) {
		$('#addModal').modal('show');
		$("#addForm").JsonToForm(result);
	});
}

function refund(id, status) {
	if(status != 1) {
		$.jGrowl('当前数据状态不允许进行退款操作!', {
			header: '提示信息!',
			theme: 'bg-danger'
		});
		return false;
	}
	setTimeout(function() { //取消验证
		$('#refundForm').data('bootstrapValidator').resetForm(true);
		$('#refundModal .select').select2('val', '1');
	}, 200);
	$.post("/deposit/findDeposit/" + id, function(result) {
		$('#refundModal').modal('show');
		var premiumMessage = "<p>押金缴纳人:" + result.premiumer + "</p>";
		premiumMessage += "<p>缴纳人证件:" + ((result.premiumerCertificateType == 1 ? '身份证' : '驾驶证') + '(' + result.premiumerCertificateCode + ')') + "</p>";
		premiumMessage += "<p>缴纳金额:" + result.premiumReceived + "元</p>";
		premiumMessage += "<p>缴纳时间:" + formatDate(result.premiumTime) + "</p>";
		$('#showPremiumMessage').html(premiumMessage);
		$("#refundForm").JsonToForm(result);
	});
}

function del(id) {
	QD.notify({
		type: "delete",
		confirmCallback: function() {
			$.post("/deposit/del/" + id, function(result) {
				if(result.status == 0) {
					QD.alert('删除成功!', true);
				} else {
					QD.alert('删除失败!', false);
				}
				datatable.ajax.reload();
			}, "json");
		}
	});
}

function add() {
	setTimeout(function() { //取消验证
		$('#addForm').data('bootstrapValidator').resetForm(true);
		$('#addModal .select').select2('val', '1');
	}, 200);

	$("#addForm").ClearForm();
	$('#addModal').modal('show');
}