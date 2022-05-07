/**
 * Created by yangtao on 2016-9-25 11:35:30.
 */

/**
 * 动态赋值form
 * 
 * @param data
 * @returns {*}
 * @constructor
 */
$.fn.JsonToForm = function(data) {
	return this.each(function() {
		var input, name;
		if(data == null) {
			this.reset();
			return;
		}
		for(var i = 0; i < this.length; i++) {
			input = this.elements[i];
			// checkbox的name可能是name[]数组形式
			name = (input.type == "checkbox") ? input.name.replace(/(.+)\[\]$/, "$1") : input.name;
			if(data[name] == undefined)
				continue;
			switch(input.type) {
				case "password":
					input.value = data[name];
					$("#password").val(data[name]);
					break;
				case "text":
					if($(input).attr("format")) {
						if(data[name] != "") {
							// alert(data[name]);
							var date = new Date();
							date.setTime(data[name]);
							var s = date.format($(input).attr("format"));
							// alert(data[name]);
							input.value = s;
						}
					} else {
						input.value = data[name];
					}
					break;
				case "checkbox":
					if(data[name] == "") {
						input.checked = false;
					} else {
						// 数组查找元素
						if((data[name]+"").indexOf(input.value) > -1) {
							input.checked = true;
						} else {
							input.checked = false;
						}
					}
					break;
				case "radio":
					if(data[name] == "") {
						input.checked = false;
					} else if(input.value == data[name]) {
						input.checked = true;
					}
					break;
				case "button":
					break;
				case "textarea":
					break;
				default:
					input.value = data[name];
			}
		}
		$('#checkbox-pinglun').iCheck('update');
	});
};




