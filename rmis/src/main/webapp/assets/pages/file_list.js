$(function() {
	var datatable = $('.table-sort').DataTable({
		order: [
			[0, 'desc']
		],
		ajax: {
			url: contextPath + "/file/getPageList",
			type: 'post',
			data: function(d) {     //添加额外的参数给服务器
				d.fType = $('#fType').val(),
				d.search = $("#search").val(),
				d.timeMin = $("#timeMin").val(),
				d.timeMax = $("#timeMax").val()
			}
		},
		columns: [{
			data: "id"
		}, { 
			data: "fName"
		}, {    
			data: "fPath"
		}, {    
			data: "fSize"
		}, {    
			data: "fName"
		}, {    
			data: "fNameOld"
		}, {    
			data: "fTime"
		}, {    
			data: "md5"
		}, {    
			data: null
		}],
		columnDefs: [{
			targets: [0],
			orderable:false
		}, {
			targets: [4],
			render: function(data, type, row, meta) {
				return data ? data.substring(data.lastIndexOf('.') + 1).toUpperCase() : '';
			}
		}, {
			targets: [6],
			render: function(data, type, row, meta) {
				return data ? new Date(data).pattern("yyyy-MM-dd hh:mm:ss") : '';
			}
		}, {
			targets: [8],
			responsivePriority: 1,
			render: function(data, type, row, meta) {
				return '<a title="预览" href="javascript:;" onclick="show(\'' + IMGDOMAIN + row.fName + '\')" style="text-decoration:none"><i class="Hui-iconfont">&#xe695;</i></a>';
			}
		}]
	});
	
	$('#fType').on('change',function(){
		datatable.ajax.reload();
	});
	
	$('#doSearch').on('click', function() {
		datatable.ajax.reload();
	});

	$('#search').bind('keyup', function(e) {
		if(e.keyCode == 13 || (e.keyCode == 8 && (this.value.length == 0))) {
			datatable.ajax.reload();
		}
	});
});

/*文件-查看*/
function show(name) {
	var previewHtml = function() {
		switch(name.substring(name.lastIndexOf('.') + 1)) {
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
				return '<img src="' + name + '" style="width:800px;height:600px;"/>';
			case 'mp4':
				return '<video src="' + name + '" controls="controls" width="800" height="580"></video>';
			default:
				return '<div>暂不支持该类型文件预览</div>';
		}
	}
	var index = layer.open({
		type: 1,
		title: 0,
		shade: false,
		area: ['800px', '600px'],
		content: previewHtml()
	});
}