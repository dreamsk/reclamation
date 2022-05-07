var entityGuid = '';
var isAdd = true;
var showImagePreviews = new Array();

/**
 * 文件上传控件初始化
 * 
 * @param {Object} container 上传容器ID
 * @param {Object} upModel 上传模块
 * @param {Object} upEntity 上传实体类名
 * @param {Object} upEntityId 实体ID
 * @param {Object} mimeType 文件类型
 * @param {Object} fileNumLimit 文件数量
 */
function initWebUploader(container, upModel, upEntity, upEntityId, mimeType, fileNumLimit) {
	if(container == '#uploader') {
		return initMultiFileWebUploader(container, upModel, upEntity, upEntityId, mimeType, fileNumLimit);
	} else {
		return initSingleImgWebUploader(container, upModel, upEntity, upEntityId);
	}
}

/**
 * 多文件上传（附件上传）
 * 
 * @param {Object} container 上传容器ID
 * @param {Object} upModel 上传模块
 * @param {Object} upEntity 上传实体类名
 * @param {Object} upEntityId 实体ID
 * @param {Object} mimeType 文件类型
 * @param {Object} fileNumLimit 文件数量
 */
function initMultiFileWebUploader(container, upModel, upEntity, upEntityId, mimeType, fileNumLimit) {
	var containerContentTemp = $(container).html();
	// WebUploader实例
	var uploaderTemp = null;

	jQuery(function() {
		var $ = jQuery, // just in case. Make sure it's not an other libaray.

			$wrap = $(container),

			// 图片容器
			$queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList')),

			// 状态栏，包括进度和控制按钮
			$statusBar = $wrap.find('.statusBar'),

			// 文件总体选择信息。
			$info = $statusBar.find('.info'),

			// 上传按钮
			$upload = $wrap.find('.uploadBtn'),

			// 没选择文件之前的内容。
			$placeHolder = $wrap.find('.placeholder'),

			// 总体进度条
			$progress = $statusBar.find('.progress').hide(),

			// 添加的文件数量
			fileCount = 0,

			// 添加的文件总大小
			fileSize = 0,

			// 优化retina, 在retina下这个值是2
			ratio = window.devicePixelRatio || 1,

			// 缩略图大小
			thumbnailWidth = 110 * ratio,
			thumbnailHeight = 110 * ratio,

			// 可能有pedding, ready, uploading, confirm, done.
			state = 'pedding',

			// 所有文件的进度信息，key为file id
			percentages = {},

			//已经上传了的chunk
			chunkArray = new Array(),

			//新上传成功的文件GUID
			attachmentList = new Array(),

			MD5 = null;

		WebUploader.Uploader.register({
			'before-send-file': 'beforeSendFile',
			'before-send': 'beforeSend',
			'destroy': 'destroy'
		}, {
			beforeSendFile: function(file, data) {
				//秒传验证
				var task = new $.Deferred();
				var start = new Date().getTime();

				(new WebUploader.Uploader()).md5File(file, 0, 2 * 1024 * 1024).then(function(msg) {
					$.ajax({
						type: "POST",
						url: contextPath + '/file/check?upModel=' + upModel + '&upEntity=' + upEntity + '&upEntityId=' + upEntityId,
						data: {
							status: "md5Check",
							file_md5: msg,
							size: 0
						},
						cache: false,
						timeout: 1000, //todo 超时的话，只能认为该文件不曾上传过
						dataType: "json"
					}).then(function(data, textStatus, jqXHR) {
						if(data.ifExist) { //若存在，这返回失败给WebUploader，表明该文件不需要上传
							task.reject();

							uploaderTemp.skipFile(file);
							file.path = data.path;

							updateStatus();
						} else {
							task.resolve();
							//拿到上传文件的唯一名称，用于断点续传
							MD5 = msg;
						}
					}, function(jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
						task.resolve();
						//拿到上传文件的唯一名称，用于断点续传
						MD5 = msg;
					});
				});
				return $.when(task);
			},
			beforeSend: function(block) {
				//分片验证是否已传过，用于断点续传
				var task = new $.Deferred();

				for(var i = 0; i < chunkArray.length; i++) {
					if((block.chunk + MD5) == chunkArray[i]) {
						task.reject();
					}
				}

				chunkArray.push(block.chunk + MD5);

				$.ajax({
					type: "POST",
					url: contextPath + '/file/check?upModel=' + upModel + '&upEntity=' + upEntity + '&upEntityId=' + upEntityId,
					data: {
						status: "chunkCheck",
						file_md5: MD5,
						chunkIndex: block.chunk,
						size: block.end - block.start
					},
					cache: false,
					timeout: 1000, //todo 超时的话，只能认为该分片未上传过
					dataType: "json"
				}).then(function(data, textStatus, jqXHR) {
					if(data.ifExist) { //若存在，返回失败给WebUploader，表明该分块不需要上传
						task.reject();
					} else {
						task.resolve();
					}
				}, function(jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
					task.resolve();
				});

				return $.when(task);
			},
			destroy: function() {
				if(uploaderTemp) {
					delete window;
					$(container).html('').html(containerContentTemp);
				}
			}
		});

		// 实例化
		uploaderTemp = WebUploader.create({
			pick: {
				id: container + ' #filePicker',
				label: '点击选择文件'
			},
			dnd: container + ' .queueList',
			paste: document.body,
			accept: {
				title: '选择需要上传的文件',
				mimeTypes: mimeType
			},

			// swf文件路径
			swf: contextPath + '/assets/lib/webuploader/0.1.5/Uploader.swf',
			disableGlobalDnd: true,
			chunked: true,
			threads: 5,
			fileNumLimit: fileNumLimit,
			chunkSize: 10 * 1024 * 1024,
			server: contextPath + '/file/fileUploadChunk?upModel=' + upModel + '&upEntity=' + upEntity + '&upEntityId=' + upEntityId,
			fileSizeLimit: 50 * 1024 * 1024 * 1024, // 50GB
			fileSingleSizeLimit: 10 * 1024 * 1024 * 1024 // 10GB:单文件大小
		});

		// 添加“添加文件”的按钮，
		uploaderTemp.addButton({
			id: container + ' #filePicker2',
			label: '继续添加'
		});

		uploaderTemp.on('uploadBeforeSend', function(block, data) {
			// 修改data可以控制发送哪些携带数据。
			data.file_md5 = MD5;
		});

		uploaderTemp.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');

			$percent.css('width', percentage * 100 + '%');
			percentages[file.id][1] = percentage;
			updateTotalProgress();
		});

		uploaderTemp.on('ready', function() {
			if(!isAdd) {
				var _mimeType = new Array('image/*', 'application/zip', 'application/msword', 'application/vnd.ms-excel', 'application/pdf', 'text/plain', 'video/mp4');
				//获取服务器上已有的数据 
				$.post(contextPath + '/file/getFileListByEntity?entity=' + upEntity + '&entityId=' + upEntityId, function(json) {
					var jsonLen = json.data.length;
					if(jsonLen > 0) {
						fileCount = jsonLen;
						$placeHolder.addClass('element-invisible');
						$statusBar.show();
						//显示在页面上  
						$.each(json.data, function(i, n) {
							fileSize += parseInt(n.fSize);
							var obj = {},
								statusMap = {},
								file_id = 'WU_FILE_' + i;
							obj.id = file_id;
							obj.guid = n.guid;
							obj.name = n.fNameOld;
							obj.filename = n.fName;
							obj.Status = 'complete';
							obj.getStatus = function() {
								return '';
							};
							obj.statusText = '';
							obj.size = n.fSize;
							obj.version = WebUploader.Base.version;
							obj.type = _mimeType[n.fType];
							obj.filetype = _mimeType[n.fType];
							obj.source = this;
							obj.setStatus = function(status, text) {
								var prevStatus = statusMap[this.id];
								typeof text !== 'undefined' && (this.statusText = text);
								if(status !== prevStatus) {
									statusMap[this.id] = status;
									//文件状态改为已完成 
									uploaderTemp.trigger('statuschange', status, prevStatus);
								}
							};
							editFile(obj);
						});

						setState('ready');
						$upload.addClass('disabled');
						updateTotalProgress();
						uploaderTemp.reset();
					}
				}, 'json');
			}
		});

		uploaderTemp.on('beforeFileQueued', function(file) {
			if(fileCount >= fileNumLimit) {
				alert('当前实体只允许选择' + fileNumLimit + '个附件,\n请将已有附件删除后再选择新的附件！');
				return false;
			}
			file.id = 'WU_FILE_' + fileCount++;
		});

		uploaderTemp.on('fileQueued', function(file) {
			if(file.name.length > 30) {
				alert("所选文件文件名过长,请修改后重新选择！");
				return false;
			}
			fileSize += file.size;

			if(fileCount === 1) {
				$placeHolder.addClass('element-invisible');
				$statusBar.show();
			}

			addFile(file);
			setState('ready');
			updateTotalProgress();
		});

		uploaderTemp.on('fileDequeued', function(file) {
			fileCount--;
			fileSize -= file.size;

			if(!fileCount) {
				setState('pedding');
			}

			if(!uploaderTemp.getFiles('queued').length) {
				$upload.addClass('disabled');
			}

			removeFile(file);
			updateTotalProgress();
		});

		uploaderTemp.on('startUpload', function() {
			var files = uploaderTemp.getFiles();
			for(var i = 0; i < files.length; i++) {
				uploaderTemp.upload(files[i]);
			}
		});

		uploaderTemp.on('all', function(type) {
			switch(type) {
				case 'uploadFinished':
					setState('confirm');
					break;
				case 'startUpload':
					setState('uploading');
					break;
				case 'stopUpload':
					setState('paused');
					break;
			}
		});

		uploaderTemp.on('uploadSuccess', function(file, response) {
			file.guid = response.guid;
			attachmentList.push(response.guid);
			$('#attachmentList').val(attachmentList.join(','));
		});

		// 当服务器有文件需要预览时
		function editFile(file) {
			var $li = $('<li id="' + file.id + '">' +
					'<p class="title">' + file.name + '</p>' +
					'<p class="imgWrap"></p>' +
					'</li>'),

				$btns = $('<div class="file-panel"><span class="cancel">删除</span><span class="rotateRight">下载</span></div>').appendTo($li),
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>');

			if(file.getStatus() === 'invalid') {
				showError(file.statusText);
			} else {
				// @todo lazyload  
				$wrap.empty();
				$wrap.text('不能预览');

				//判断是否是图片  
				if(file.filetype == 'image/*') {
					$wrap.empty().append('<img onclick="showImagePreview()" src="' + contextPath + '/file/getFile/' + file.guid + '" style="height:100%;">');
					imgLoad(contextPath + '/file/getFile/' + file.guid);
				}

				//判断是否是Mp4
				if(file.filetype == 'video/mp4') {
					$wrap.empty().append('<a onclick="showVideoPreview(\'' + file.guid + '\')">点我预览</a>');
				}
			}

			$li.append('<span class="success"></span>');

			$li.on('mouseenter', function() {
				$btns.stop().animate({
					height: 30
				});
			});

			$li.on('mouseleave', function() {
				$btns.stop().animate({
					height: 0
				});
			});

			$btns.on('click', 'span.cancel', function() {
				delRemoteFile(file);
			});
			$btns.on('click', 'span.rotateRight', function() {
				fileDownload(file);
			});

			$li.appendTo($queue);
			attachmentList.push(file.guid);
			$('#attachmentList').val(attachmentList.join(','));
		}

		// 当有文件添加进来时执行，负责view的创建
		function addFile(file) {
			var $li = $('<li id="' + file.id + '"><p class="title">' + file.name + '</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),

				$btns = $('<div class="file-panel"><span class="cancel">删除</span><span class="rotateRight">下载</span></div>').appendTo($li),
				$prgress = $li.find('p.progress span'),
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>'),
				showError = function(code) {
					if(!code) {
						code = "complete";
					}
					switch(code) {
						case 'exceed_size':
							text = '文件大小超出';
							break;

						case 'interrupt':
							text = '上传暂停';
							break;

						case 'complete':
							$info.css({
								"background": "#59c339"
							});
							text = '上传成功!';
							break;

						default:
							text = '上传失败，请重试';
							break;
					}

					$info.text(text).appendTo($li);
				};

			if(file.getStatus() === 'invalid') {
				showError(file.statusText);
			} else {
				// @todo lazyload
				$wrap.text('预览中');
				uploaderTemp.makeThumb(file, function(error, src) {
					if(error) {
						$wrap.text('不能预览');
						return;
					}

					var img = $('<img src="' + src + '">');
					$wrap.empty().append(img);
				}, thumbnailWidth, thumbnailHeight);

				percentages[file.id] = [file.size, 0];
				file.rotation = 0;
			}

			file.on('statuschange', function(cur, prev) {
				if(prev === 'progress') {
					$prgress.hide().width(0);
				}

				// 成功
				if(cur === 'error' || cur === 'invalid') {
					showError(file.statusText);
					percentages[file.id][1] = 1;
				} else if(cur === 'interrupt') {
					showError('interrupt');
				} else if(cur === 'queued') {
					percentages[file.id][1] = 0;
				} else if(cur === 'progress') {
					$info.remove();
					$prgress.css('display', 'block');
				} else if(cur === 'complete') {
					showError(file.statusText);
					$li.append('<span class="success"></span>');
				}

				$li.removeClass('state-' + prev).addClass('state-' + cur);
			});

			$li.on('mouseenter', function() {
				$btns.stop().animate({
					height: 30
				});
			});

			$li.on('mouseleave', function() {
				$btns.stop().animate({
					height: 0
				});
			});

			$btns.on('click', 'span', function() {
				uploaderTemp.removeFile(file);
			});
			$btns.on('click', 'span.rotateRight', function() {
				fileDownload(file);
			});

			$upload.removeClass('disabled');
			$li.appendTo($queue);
		}

		//更新UI状态
		function updateStatus() {
			var text = '',
				stats;

			if(state === 'ready') {
				text = '选中' + fileCount + '个文件，共' + WebUploader.formatSize(fileSize) + '。';
			} else if(state === 'confirm') {
				stats = uploaderTemp.getStats();
				if(stats.uploadFailNum) {
					text = '已成功上传' + stats.successNum + '个文件，' + stats.uploadFailNum + '个文件上传失败，<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>'
				}

			} else {
				stats = uploaderTemp.getStats();
				text = '共' + fileCount + '个（' + WebUploader.formatSize(fileSize) + '），已上传' + stats.successNum + '个';

				if(stats.uploadFailNum) {
					text += '，失败' + stats.uploadFailNum + '个';
				}
			}

			$info.html(text);
		}

		// 负责view的销毁
		function removeFile(file) {
			var $li = $('#' + file.id);
			delete percentages[file.id];
			updateTotalProgress();
			$li.off().find('.file-panel').off().end().remove();
		}

		/**
		 * 整体上传进度条
		 */
		function updateTotalProgress() {
			var loaded = 0,
				total = 0,
				spans = $progress.children(),
				percent;

			$.each(percentages, function(k, v) {
				total += v[0];
				loaded += v[0] * v[1];
			});

			percent = total ? loaded / total : 0;

			spans.eq(0).text(Math.round(percent * 100) + '%');
			spans.eq(1).css('width', Math.round(percent * 100) + '%');
			updateStatus();
		}

		function setState(val) {

			if(val === state) {
				return;
			}

			$upload.removeClass('state-' + state);
			$upload.addClass('state-' + val);
			state = val;

			switch(state) {
				case 'pedding':
					$placeHolder.removeClass('element-invisible');
					$queue.parent().removeClass('filled');
					$queue.hide();
					$statusBar.addClass('element-invisible');
					uploaderTemp.refresh();
					break;

				case 'ready':
					$placeHolder.addClass('element-invisible');
					$('#filePicker2').removeClass('element-invisible');
					$queue.parent().addClass('filled');
					$queue.show();
					$statusBar.removeClass('element-invisible');
					uploaderTemp.refresh();
					break;

				case 'uploading':
					$('#filePicker2').addClass('element-invisible');
					$progress.show();
					$upload.text('暂停上传');
					break;

				case 'paused':
					$progress.show();
					$upload.text('继续上传');
					break;

				case 'confirm':
					$progress.hide();
					$upload.text('开始上传').addClass('disabled');

					stats = uploaderTemp.getStats();
					if(stats.successNum && !stats.uploadFailNum) {
						setState('uploadFinished');
						return;
					}
					break;
				case 'uploadFinished':
					stats = uploaderTemp.getStats();
					if(stats.successNum) {} else {
						// 没有成功的文件，重设
						state = 'done';
						location.reload();
					}
					break;
			}

			updateStatus();
		}

		$upload.on('click', function() {
			if($(this).hasClass('disabled')) {
				return false;
			}
			if(state === 'ready') {
				uploaderTemp.upload();
			} else if(state === 'paused') {
				uploaderTemp.upload();
			} else if(state === 'uploading') {
				uploaderTemp.stop(true);
			}
		});

		$info.on('click', '.retry', function() {
			uploaderTemp.retry();
		});

		$info.on('click', '.ignore', function() {});

		$upload.addClass('state-' + state);
		updateTotalProgress();
	});

	function delRemoteFile(file) {
		initnotice();
		notice.get().on('pnotify.confirm', function() {
			$.ajax({
				type: "post",
				url: contextPath + "/file/delFile/" + file.guid,
				async: false,
				success: function(result) {
					if(result == 1) {
						$.jGrowl('删除成功!', {
							header: '提示信息!',
							theme: 'bg-success'
						});
						uploaderTemp.removeFile(file);
						if(attachmentList.length > 0) {
							arrayrRemove(file.guid, attachmentList);
							$('#attachmentList').val(attachmentList.join(','));
						}
					} else {
						$.jGrowl('删除失败!', {
							header: '提示信息!',
							 theme: 'bg-danger'
						});
					}
				}
			});
		});
	}

	function fileDownload(file) {
		if(!file.Status == 'complete') {
			alert('上传动作未完成,不能提供下载!');
			return;
		}
		location.href = "/file/download?fileGuid=" + file.guid;
	}

	return uploaderTemp;
}

function initnotice() {
	initnoticeWithTips('<p>你确定要删除吗?</p>')
}

function initnoticeWithTips(tips) {
	notice = new PNotify({
		title: '提示信息',
		text: tips,
		hide: false,
		type: 'warning',
		confirm: {
			confirm: true,
			buttons: [{
				text: '确定',
				addClass: 'btn-sm'
			}, { 
				text: '取消',
				addClass: 'btn-sm'   
			}]
		},
		buttons: {
			closer: false,
			sticker: false
		},
		history: {
			history: false
		}    
	})
}


function showVideoPreview(guid) {
	var $video = $("<video id=\"previewVideo\" src=\"" + contextPath + "/file/getFile/" + guid + "\" autoplay=\"autoplay\" width=\"640\" height=\"480\"></video>");
	var $showVedioPreview = $('<div id="showVedioPreview" class="modal fade in" tabindex="-1" aria-hidden="false">\
								<div class="modal-dialog">\
									<div class="modal-content" style="width: 640px;height: 480px;"></div>\
								</div>\
							</div>');

	$showVedioPreview.find('div.modal-content').html($video)
	$showVedioPreview.modal('show');
	$showVedioPreview.on('hidden.bs.modal', function() {
		$video.get(0).pause();
		$showVedioPreview.remove();
	});

	$('body').append($showVedioPreview);
}

function showSingleImagePreview(guid) {
	var $img = $("<img id=\"previewSingleImage\" src=\"" + contextPath + "/file/getFile/" + guid + "\"/>");
	var $showSingleImagePreview = $('<div id="showSingleImagePreview" class="modal fade in" tabindex="-1" aria-hidden="false">\
								<div class="modal-dialog">\
									<div class="modal-content"></div>\
								</div>\
							</div>');

	$showSingleImagePreview.find('div.modal-content').html($img)
	$showSingleImagePreview.modal('show');
	$showSingleImagePreview.on('hidden.bs.modal', function() {
		$showSingleImagePreview.remove();
	});

	$('body').append($showSingleImagePreview);
}

function showImagePreview() {
	var $pswp = $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
						<div class="pswp__bg"></div>\
						<div class="pswp__scroll-wrap">\
							<div class="pswp__container">\
								<div class="pswp__item"></div>\
								<div class="pswp__item"></div>\
								<div class="pswp__item"></div>\
							</div>\
							<div class="pswp__ui pswp__ui--hidden">\
								<div class="pswp__top-bar">\
									<div class="pswp__counter"></div>\
									<button class="pswp__button pswp__button--close" title="关闭"></button>\
									<button class="pswp__button pswp__button--share" title="分享"></button>\
									<button class="pswp__button pswp__button--fs" title="全屏"></button>\
									<button class="pswp__button pswp__button--zoom" title="退出"></button>\
									<div class="pswp__preloader">\
										<div class="pswp__preloader__icn">\
											<div class="pswp__preloader__cut">\
												<div class="pswp__preloader__donut"></div>\
											</div>\
										</div>\
									</div>\
								</div>\
								<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
									<div class="pswp__share-tooltip"></div>\
								</div>\
								<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
								<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
								<div class="pswp__caption">\
									<div class="pswp__caption__center"></div>\
								</div>\
							</div>\
						</div>\
					</div>');

	$('body').append($pswp);

	var pswpElement = document.querySelectorAll('.pswp')[0];

	var options = {
		index: 0
	};

	var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, showImagePreviews, options);
	gallery.init();
	gallery.listen('close', function() {
		pswpElement.remove();
	});
}

var imgLoad = function(url) {
	var img = new Image();
	img.src = url;
	if(img.complete) {
		addImageSourceToPreview(url, img.width, img.height);
	} else {
		img.onload = function() {
			addImageSourceToPreview(url, img.width, img.height);
			img.onload = null;
		};
	};
};

function addImageSourceToPreview(url, w, h) {
	var img = {};
	img.src = url;
	img.w = w;
	img.h = h;
	showImagePreviews.push(img);
}

/**
 * 单文件上传（LOGO上传）
 * 
 * @param {Object} container 上传容器ID
 * @param {Object} upModel 上传模块
 * @param {Object} upEntity 上传实体类名
 * @param {Object} upEntityId 实体ID
 * @param {Object} isAdd 是否为新增
 */
function initSingleImgWebUploader(container, upModel, upEntity, upEntityId) {
	var containerContentTemp = $(container).html();
	var uploaderSingle = null;
	jQuery(function() {
		var $ = jQuery,
			$wrap = $(container),
			$queue = $('<ul class="filelist"></ul>').prependTo($wrap.find('.queueList')),
			$placeHolder = $wrap.find('.placeholder'),
			ratio = window.devicePixelRatio || 1,
			thumbnailWidth = 100 * ratio,
			thumbnailHeight = 100 * ratio;

		WebUploader.Uploader.register({
			'destroy': 'destroy'
		}, {
			destroy: function() {
				if(uploaderSingle) {
					delete window;
					$(container).html('').html(containerContentTemp);
				}
			}
		});

		// 初始化Web Uploader
		uploaderSingle = WebUploader.create({
			auto: true,
			pick: {
				id: container + ' #filePicker',
				label: '点击选择图片'
			},
			dnd: container,
			disableGlobalDnd: true,
			fileNumLimit: 1,
			swf: contextPath + '/assets/lib/webuploader/0.1.5/Uploader.swf',
			server: contextPath + '/file/fileUploadChunk?upModel=' + upModel + '&upEntity=' + upEntity + '&upEntityId=' + upEntityId,
			accept: {
				title: '选择图片',
				mimeTypes: 'image/*'
			}
		});

		uploaderSingle.on('ready', function() {
			if(!isAdd) {
				//获取服务器上已有的数据 
				$.post(contextPath + '/file/getSingleFileByEntityId?entity=' + upEntity + '&entityId=' + upEntityId, function(json) {
					if(json != null) {
						var obj = {},
							statusMap = {},
							file_id = 'WU_LOGO_FILE_0'
						obj.id = file_id;
						obj.guid = json.guid;
						obj.name = json.fNameOld;
						obj.filename = json.fName;
						obj.getStatus = function() {
							return '';
						};
						obj.statusText = '';
						obj.size = json.fSize;
						obj.version = WebUploader.Base.version;
						obj.type = 'image/*';
						obj.filetype = 'image/*';
						obj.source = this;
						obj.setStatus = function(status, text) {
							var prevStatus = statusMap[this.id];
							typeof text !== 'undefined' && (this.statusText = text);
							if(status !== prevStatus) {
								statusMap[this.id] = status;
								//文件状态改为已完成 
								uploaderSingle.trigger('statuschange', status, prevStatus);
							}
						};
						editFile(obj);
					}
				}, 'json');
			}
		});

		uploaderSingle.on('beforeFileQueued', function(file) {
			var files = uploaderSingle.getFiles();
			for(var i = 0; i < files.length; i++) {
				uploaderSingle.removeFile(files[i], true);
			}
			file.id = 'WU_LOGO_FILE_0';
			$queue.empty();
			uploaderSingle.reset();
		});

		// 当有文件添加进来的时候
		uploaderSingle.on('fileQueued', function(file) {
			toChangeStatus()
			var $li = $(
					'<li id="' + file.id + '" class="file-item thumbnail">' +
					'<img>' +
					'<div class="info">' + file.name + '</div>' +
					'</li>'
				),
				$img = $li.find('img');

			$queue.append($li);

			// 创建缩略图
			uploaderSingle.makeThumb(file, function(error, src) {
				if(error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);

			uploaderSingle.upload(uploaderSingle.getFiles()[0]);

		});

		uploaderSingle.on('uploadBeforeSend', function(block, data) {
			// 修改data可以控制发送哪些携带数据。
			data.file_md5 = guid();
		});

		// 文件上传过程中创建进度条实时显示。
		uploaderSingle.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');

			// 避免重复创建
			if(!$percent.length) {
				$percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
			}

			$percent.css('width', percentage * 100 + '%');
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploaderSingle.on('uploadSuccess', function(file, response) {
			$('#' + file.id).addClass('upload-state-done').append('<span class="success"></span>');
			$('#logoGuid').val(response.guid);
		});

		// 文件上传失败，现实上传出错。
		uploaderSingle.on('uploadError', function(file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if(!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		uploaderSingle.on('uploadComplete', function(file) {
			$('#' + file.id).find('.progress').remove();
		});

		// 当服务器有文件需要预览时
		function editFile(file) {
			toChangeStatus()
			var $li = $(
					'<li id="' + file.id + '" class="file-item thumbnail upload-state-done">' +
					'<img onclick="showSingleImagePreview(\'' + file.guid + '\')" src="'+ contextPath + '/file/getFile/' + file.guid + '" style="height:100%;">' +
					'<div class="info">' + file.name + '</div>' +
					'<span class="success"></span>' +
					'</li>'
				),
				$img = $li.find('img');

			$queue.append($li);
			uploaderSingle.reset();
		}

		function toChangeStatus() {
			$placeHolder.css({
				'min-height': '50px',
				'background': 'none'
			});
			$placeHolder.find('#filePicker').css({
				'margin-top': '0'
			});
			$placeHolder.find('#filePicker').find('.webuploader-pick').css({
				'margin': '10px 0 0 0'
			});
		}

		function guid() {
			function S4() {
				return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return(S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
		}
	});
	return uploaderSingle;
}