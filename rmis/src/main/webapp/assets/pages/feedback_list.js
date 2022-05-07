/**
 * DataTables
 */
var datatable = null,
	idList = [];

$(function($) {
	var guidStatusMap = new HashMap();
	datatable = $('.table-sort').DataTable({
		order: [
			[0, 'desc']
		],
		ajax: {
			url: contextPath + "/feedback/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('#search').val();
			}
		},
		columns: [{
			data: "id"
		}, {
			data: "username",
			defaultContent: ""
		}, {
			data: "qq",
			defaultContent: ""
		}, {
			data: "email",
			defaultContent: ""
		}, {
			data: "telphone",
			defaultContent: ""
		}, {
			data: "content",
			defaultContent: ""
		}, {
			data: "replyContent",
			defaultContent: ""
		}, {
			data: "createTime",
			defaultContent: ""
		}, {
			data: "status",
			defaultContent: ""
		}, {
			data: null
		}],
		columnDefs: [{
			targets: [0],
			orderable: false,
			render: function(data, type, row, meta) {
				return '<input id="input-' + data + '" type="checkbox" name="single"><label for="input-' + data + '"></label>';
			}
		}, {
			targets: [7],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [8],
			render: function(data, type, row, meta) {
				return '<select class="select" guid="' + row.id + '"><option value="0">待审核</option><option value="1">未通过</option><option value="2">已通过</option><option value="3">已回复</option>';
			}
		}, {
			targets: [9],
			orderable: false,
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				var btns = new Array('reply', 'del');
				return getDTOperateBtn(btns, row.id, 'feedback-reply.jsp', row.status, '/feedback/del/', reloadTable);
			}
		}],
		drawCallback: function(settings) {
			var _$this = this;
			drawCallbackDefault(settings, _$this);
			$('.table select').select2({
				minimumResultsForSearch: "-1"
			});
			if(guidStatusMap.size() > 0) {
				$('.table .select').each(function() {
					$(this).select2({
						minimumResultsForSearch: "-1"
					});
					$(this).select2('val', guidStatusMap.get($(this).attr('guid')));
				}).change(function() {
					$.post(contextPath + "/feedback/update", {
						id: $(this).attr('guid'),
						status: $(this).val()
					}, function(result) {
						if(result.status == 200) {
							showSuccessMessage("操作成功!",reloadTable);
						} else {
							showFailMessage("操作失败!")
						}
					})
				});
			}
		}
	}).on('xhr.dt', function(e, settings, json, xhr) {
		for(var i = 0, ien = json.data.length; i < ien; i++) {
			var data = json.data[i];
			guidStatusMap.put(data.id, data.status+"");
		}
	});
});

/**
 * 刷新DT
 */
function reloadTable() {
	datatable.ajax.reload(null, false);
}

/**
 * 获取datatables选中行的ID
 */
function getDTSelect() {
	var lines = datatable.rows('.selected').data();
	for (var i = 0; i < lines.length; i++) {
		idList.push(lines[i].id);
	}
	return idList;
}

/*反馈-审核*/
function review(id, status) {
	switch(status) {
		case 0:
			layer.confirm('审核反馈?', {
					btn: ['通过并回复', '不通过', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/feedback/update/', id, 2, reloadTable);
				},
				function() {
					changeStatus('/feedback/update/', id, 1, reloadTable);
				});
			break;
		case 1:
			layer.confirm('回复反馈?', {
					btn: ['已回复', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/feedback/update/', id, 2, reloadTable);
				});
			break;
		case 2:
			layer.confirm('撤回反馈?', {
					btn: ['撤回', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/feedback/update/', id, 3, reloadTable);
				});
			break;
		case 3:
			layer.confirm('发布反馈?', {
					btn: ['发布', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/feedback/update/', id, 2, reloadTable);
				});
			break;
	};
}