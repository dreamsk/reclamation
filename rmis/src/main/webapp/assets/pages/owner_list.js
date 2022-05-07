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
			url: contextPath + "/owner/getPageList",
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
			data: "sexval",
			defaultContent: ""
		}, {
			data: "tel",
			defaultContent: ""
		}, {
			data: "housingEstate",
			defaultContent: ""
		}, {
			data: "address",
			defaultContent: ""
		}, {
			data: "score",
			defaultContent: ""
		}, {
			data: "openid",
			defaultContent: ""
		}, {
			data: "createTime",
			defaultContent: ""
		}],
		columnDefs: [{
			targets: [8],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
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