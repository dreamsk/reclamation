/**
 * DataTables
 */
var datatable = null,idList=[];

$(function() {
	datatable = $('.table-sort').DataTable({
		order: [
			[4, 'asc']
		],
		ajax: {
			url: contextPath + "/sysRole/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('#search').val();
			}
		},
		columns: [{
			data: "id"
		}, {
			data: "name"
		}, {
			data: "createTime",
			defaultContent: ""
		}, {
			data: "createName",
			defaultContent: ""
		}, {
			data: "sort",
			defaultContent: ""
		}, {
			data: "status",
			defaultContent: ""
		}, {
			data: null
		}],
		columnDefs: [{
			targets: [0],
			orderable:false,
			render: function(data, type, row, meta) {
				return '<input id="input-' + data + '" type="checkbox" name="single"><label for="input-' + data + '"></label>';
			}  
		}, {
			targets: [2],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [5],
			render: function(data, type, row, meta) {
				var clazz = new Array('', 'success', 'danger');
				var text = new Array('', '显示', '隐藏');
				return '<span class="label label-' + clazz[data] + ' radius">' + text[data] + '</span>';
			}
		}, {
			targets: [6],
			orderable:false,
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				var btns = new Array('edit','del');
				return getDTOperateBtn(btns, row.id, 'system-role-add.jsp', null, '/sysRole/del/', reloadTable);
			}
		}]
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