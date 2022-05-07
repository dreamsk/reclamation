$(function() {
	var Uploader = Q.Uploader,
		E = Q.event,
		formatSize = Q.formatSize,
		guidList = new Array(),
		boxDropArea = document.getElementById("upload-preview");

	var uploader = new Uploader({
		url: contextPath + "/file/fileUpload",
		target: document.getElementById("upload-target"),
		view: document.getElementById("upload-preview"),
		auto: false,
		isSlice: true, //是否启用分片上传，若为true，则isQueryState和isMd5默认为true
		//图片缩放
		scale: {
			types: ".jpg,.png,.gif", //要缩放的图片格式
			maxWidth: 1024 //最大图片大小(width|height)
		},
		on: {
			//添加之前触发
			add: function(task) {
				//不会添加exe文件
				//if (task.ext == ".exe") return false;
				if(task.disabled) return alert("允许上传的文件格式为：" + this.ops.allows);
				console.log(task.name + ": 已添加!");
			},

			//任务移除后触发
			remove: function(task) {
				console.log(task.name + ": 已移除!");
			},

			//上传之前触发
			upload: function(task) {
				if(task.ext == ".exe") return false; //exe文件可以添加，但不会上传
				//task.data = {
					// name: task.name + "_" + Date.now()
					//index: task.sliceIndex,
					//count: task.sliceCount
				//}; //可针对单独的任务配置参数(POST方式)
			},

			//文件hash进度
			hashProgress: function(task, pvg) {
				document.title = "hash: " + (pvg * 100).toFixed(2) + "%";
			},

			//图片预览后触发
			preview: function(data) {
				console.log(data.task.name + " : " + data.src);
			},

			//图片压缩后触发,如果图片或浏览器不支持压缩,则不触发
			scale: function(data) {
				console.log(data.task.name + " : 已压缩！");
			},

			//秒传查询事件
			sliceQuery: function(task) {
				//自定义查询路径
				console.log(task.name + ": " + task.queryUrl);
			},

			//分片上传之前触发（for 秒传或续传）
			sliceUploadAsync: function(task, callback) {
				console.log(task.name + ": 上传分片 " + task.sliceIndex + " / " + task.sliceCount);
				callback();
			},

			//上传完成后触发
			complete: function(task) {
				if(task.state != Uploader.COMPLETE) return console.log(task.name + ": " + Uploader.getStatusText(task.state) + "！");

				if(task.queryOK) return console.log(task.name + ": 秒传成功！<br />");

				var json = task.json;
				if(!json) {
					return console.log(task.name + ": 服务器未返回正确的数据！<br />");
				} else {
					guidList.push(json.id);
				}

				if(this.index >= this.list.length - 1) {
					//所有任务上传完成
					console.log("所有任务上传完成：" + new Date() + "<br />");
				}
			}
		}
	});

	document.getElementById("upload-submit").onclick = function() {
		uploader.start();
	};

	function set_drag_drop() {
		//若浏览器不支持html5上传，则禁止拖拽上传
		if(!Uploader.support.html5) {
			boxDropArea.innerHTML = "您的浏览器不支持拖拽文件上传！";
			return;
		}

		//配置中关闭了html5上传
		if(!uploader.html5) {
			boxDropArea.innerHTML = "您在配置中关闭了拖拽文件上传！";
			return;
		}

		//阻止浏览器默认拖放行为
		E.add(boxDropArea, "dragleave", E.stop);
		E.add(boxDropArea, "dragenter", E.stop);
		E.add(boxDropArea, "dragover", E.stop);

		E.add(boxDropArea, "drop", function(e) {
			E.stop(e);
			//获取文件对象
			var files = e.dataTransfer.files;
			uploader.addList(files);
		});
	}
	set_drag_drop();
});