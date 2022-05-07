/**
 * DataTables
 */
var datatable = null,idList=[];
//页面自动加载
$(function() {
	//使用ajax请求controller,返回SysMenu集合
	datatable = $('.table-sort').DataTable({
		//请求排序字段，来源于json中的columns对应的第几个的data值
		order: [
			[8, 'asc']
		],
		ajax: {
			url: contextPath + "/sysMenu/getPageList",
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
			data: "urlkey"
		}, {
			data: "parentName",
			defaultContent: ""
		}, {
			data: "type",
			defaultContent: ""
		}, {
			data: "url",
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
		//如果要对上面的data做特殊处理在下面实现
		columnDefs: [{
			targets: [0],
			orderable:false,
			render: function(data, type, row, meta) {
				return '<input id="input-' + data + '" type="checkbox" name="single"><label for="input-' + data + '"></label>';
			}  
		}, {
			targets: [6],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [10],
			orderable:false,
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				var btns = new Array('edit','del');//要调用的js方法
				//row.id对应data中的id值
				return getDTOperateBtn(btns, row.id, 'system-menu-add.jsp', null, '/sysMenu/del/', reloadTable);
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