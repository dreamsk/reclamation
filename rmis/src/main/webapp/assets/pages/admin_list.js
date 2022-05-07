/**
 * DataTables
 */
var datatable = null,idList=[];

$(function() {
	datatable = $('.table-sort').DataTable({
		order: [
			[0, 'desc']
		],
		ajax: {
			url: contextPath + "/sysUser/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('#search').val();
			}
		},
		columns: [{
			data: "id"
		}, {
			data: "username"
		}, {
			data: "tel",
			defaultContent: ""
		}, {
			data: "email",
			defaultContent: ""
		}, {
			data: "roleName",
			defaultContent: ""
		}, {
			data: "createTime",
			defaultContent: ""
		}, {
			data: "state",
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
			targets: [5],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [6],
			render: function(data, type, row, meta) {
				var clazz = new Array('primary', 'success', 'danger');
				var text = new Array('未启用', '已启用', '已禁用');
				return '<span class="label label-' + clazz[data] + ' radius">' + text[data] + '</span>';
			}
		}, {
			targets: [7],
			orderable:false,
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				var btns = new Array('edit','del');
				return getDTOperateBtn(btns, row.id, 'system-admin-add.jsp', null, '/sysUser/del/', reloadTable);
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