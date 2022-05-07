$(function(){
	$("#parentName").on("focus",function(){
		var curObj = $("#parentName");
		var curObjOffset = $("#parentName").offset();
//		var curObjOffset = $(curObj);
		$("#menuContent").css({
			left : curObjOffset.left + "px",
			top : (curObjOffset.top + curObjOffset.outerHeight()) + "px",
			display : "block",
			width : (curObjOffset.outerWidth() - 3) + "px"
		});
	});
	
	var setting = {
			async : {
				autoParam: ["parentId=parentId"],
				contentType: "application/x-www-form-urlencoded",
				enable: true,
				type: "post",
				url: contextPath + "/menu/selectAll"
			},
			
	};
	
	$.fn.zTree.init($("#tree"), setting);
	
	
});