/**
 * DataTables
 */
var oTable = null;

$(function($) {
	oTable = $('.table-sort').DataTable({
		order: [
			[6, 'asc']
		],
		ajax: {
			url: contextPath + "/folder/getPageList",
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
			data: "parentName",
			defaultContent: ""
		}, {
			data: "path",
			defaultContent: ""
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
			targets: [4],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [8],
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				return '<a title="编辑" href="javascript:;" onclick="edit(\'菜单编辑\',\'system-menu-add.jsp\',' + row.id + ',\'700\',\'480\')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>\
						<a title="删除" href="javascript:;" onclick="del([' + row.id + '],\'/menu/del/\',reloadTable)" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>';
			}
		}]
   });
});

/**
 * 刷新DT
 */
function reloadTable() {
	oTable.ajax.reload(null, false);
}