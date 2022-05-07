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
			url: contextPath + "/reclamationOrder/getPageList",
			type: 'post',
			data: function(d) {
				d.search = $('#search').val();
			}
		},
		columns: [{
			data: "id"
		}, {
			data: "orderNo"
		}, {
			data: "scrapName",
			defaultContent: ""
		}, {
			data: "ownerName",
			defaultContent: ""
		}, {
			data: "scName",
			defaultContent: ""
		}, {
			data: "rdName",
			defaultContent: ""
		}, {
			data: "amount",
			defaultContent: ""
		}, {
			data: "unit",
			defaultContent: ""
		}, {
			data: "money",
			defaultContent: ""
		}, {
			data: "scStatusVal",
			defaultContent: ""
		}, {
			data: "rdStatusVal",
			defaultContent: ""
		}, {
			data: "createTime",
			defaultContent: ""
		}, {
			data: "updateTime",
			defaultContent: ""
		}],
		columnDefs: [{
			targets: [11],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		},{
			targets: [12],
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