/**
 * DataTables
 */
var datatable = null,
	idList = [];

$(function($) {
	datatable = $('.table-sort').DataTable({
		order: [
			[0, 'desc']
		],
		ajax: {
			url: contextPath + "/article/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('#search').val();
			}
		},
		columns: [{
			data: "id"
		}, {
			data: "title"
		}, {
			data: "folderName",
			defaultContent: ""
		}, {
			data: "sort",
			defaultContent: ""
		}, {
			data: "createTime",
			defaultContent: ""
		}, {
			data: "createName",
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
			targets: [4],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [6],
			render: function(data, type, row, meta) {
				var clazz = new Array('primary', 'danger', 'success', 'defaunt');
				var text = new Array('待审核', '未通过', '已发布', '已撤回');
				return '<span class="label label-' + clazz[data] + ' radius">' + text[data] + '</span>';
			}
		}, {
			targets: [7],
			orderable: false,
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				var btns = new Array('review', 'newTabEdit', 'del');
				return getDTOperateBtn(btns, row.id, 'article-add.jsp', row.status, '/article/del/', reloadTable);
			}
		}],
		drawCallback:function(settings){
			var _$this = this;
			drawCallbackDefault(settings,_$this);
			console.log("用户二次定义!")
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

/*资讯-审核*/
function review(id, status) {
	switch(status) {
		case 0:
			layer.confirm('审核文章?', {
					btn: ['通过并发布', '不通过', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/article/update/', id, 2, reloadTable);
				},
				function() {
					changeStatus('/article/update/', id, 1, reloadTable);
				});
			break;
		case 1:
			layer.confirm('重审文章?', {
					btn: ['通过并发布', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/article/update/', id, 2, reloadTable);
				});
			break;
		case 2:
			layer.confirm('撤回文章?', {
					btn: ['撤回', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/article/update/', id, 3, reloadTable);
				});
			break;
		case 3:
			layer.confirm('发布文章?', {
					btn: ['发布', '取消'],
					shade: false,
					closeBtn: 0
				},
				function() {
					changeStatus('/article/update/', id, 2, reloadTable);
				});
			break;
	};
}