/**
 * 公用函数
 */

/**
 * 从URL连接中获取key为name的value
 * @param {Object} name
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg);
	if(r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 添加
 * 
 * @param {Object} title 弹窗标题
 * @param {Object} url 打开的URL地址
 */
function add(title, url) {
	var index = layer.open({
		type: 2,
		title: title,
		shadeClose: false,
		shade: false,
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: url
	});
}

/**
 * 编辑
 * @param {Object} title 弹窗标题
 * @param {Object} url 打开的URL地址
 * @param {Object} id 实体ID
 */
function edit(title, url, id) {
	var index = layer.open({
		type: 2,
		title: title,
		shadeClose: false,
		shade: false,
		maxmin: true, //开启最大化最小化按钮
		area: ['893px', '600px'],
		content: url + '?id=' + id
	});
}

/**
 * 改变数据状态
 * @param {Object} url 请求的地址
 * @param {Object} id 实体ID
 * @param {Object} status 实体当前状态
 * @param {Object} successFn 成功回调函数
 */
function changeStatus(url, id, status, successFn) {
	$.ajax({
		type: "post",
		url: contextPath + url,
		data: {
			id: id,
			status: status
		},
		success: function(data) {
			if(data.status = 200) {
				showSuccessMessage('操作成功!', successFn);
			} else {
				showFailMessage('操作失败失败!');
			}
		}
	});
}

/**
 * 删除
 * @param {Object} idList 要删除的id数组
 * @param {Object} url 请求URL
 * @param {Object} successFn 成功回调函数
 */
function del(idList, url, successFn) {
	if(!idList.length) {
		showFailMessage('没有数据被选中!');
		return false;
	}
	showConfirmMessage('确认要删除吗?', function() {
		$.ajax({
			type: "post",
			url: contextPath + url,
			data: {
				idlist: idList
			},
			success: function(data) {
				if(data.status = '200') {
					showSuccessMessage('删除成功!', successFn);
				} else {
					showFailMessage('删除失败!');
				}
			}
		});
	});
}

/**
 * 判断指定函数是否存在
 * @param {Object} funcName函数名
 */
function isExitsFunction(funcName) {
	try {
		if(typeof(funcName) == "function") {
			return true;
		}
	} catch(e) {}
	return false;
}

/**
 * 是否存在指定变量
 * @param {Object} variableName 变量名
 */
function isExitsVariable(variableName) {
	try {
		if(typeof(variableName) == "undefined") {
			return false;
		} else {
			return true;
		}
	} catch(e) {}
	return false;
}

/**
 * 显示右上角成功提示消息
 * @param {Object} message 消息
 * @param {Object} successFn 打开时回调
 * @param {Object} endFn 销毁时回调
 */
function showSuccessMessage(message, successFn, endFn) {
	successFn = isExitsFunction(successFn) ? successFn : function() {};
	endFn = isExitsFunction(endFn) ? endFn : function() {};
	layer.alert(message, {
		icon: 6,
		title: '成功',
		time: 2000,
		shade: 0,
		btn: 0,
		succss:successFn,
		end: endFn,
		offset: ['40px', ($(window).width() - 300) + 'px']
	});
}

/**
 * 显示右上角失败提示消息
 * @param {Object} message 消息
 * @param {Object} successFn 打开时回调
 * @param {Object} endFn 销毁时回调
 */
function showFailMessage(message, successFn, endFn) {
	successFn = isExitsFunction(successFn) ? successFn : function() {};
	endFn = isExitsFunction(endFn) ? endFn : function() {};
	layer.alert(message, {
		icon: 5,
		title: '失败',
		time: 2000,
		shade: 0,
		btn: 0,
		succss:successFn,
		end: endFn,
		offset: ['40px', ($(window).width() - 300) + 'px']
	});
}

/**
 * 显示右上角询问提示消息
 * @param {Object} message 询问消息
 * @param {Object} sureFn 确定按钮回调
 * @param {Object} cancelFn 取消按钮回调
 */
function showConfirmMessage(message, sureFn, cancelFn) {
	sureFn = isExitsFunction(sureFn) ? sureFn : function() {};
	cancelFn = isExitsFunction(cancelFn) ? cancelFn : function() {};
	layer.confirm(message, {
		btn: ['确定', '取消'],
		icon: 3,
		title: '失败',
		shade: 0,
		shift: 6,
		offset: ['40px', ($(window).width() - 300) + 'px']
	}, sureFn, cancelFn);
}


function removeIframe(){
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引,隐藏layer层和shade
	parent.$('#layui-layer' + index).css({'display': 'none'});
	parent.$('#layui-layer-shade' + index).css({'display': 'none'});
	parent.layer.close(index); //然后执行关闭     
}
