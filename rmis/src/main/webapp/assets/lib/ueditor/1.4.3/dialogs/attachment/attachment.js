/**
 * User: Jinqn
 * Date: 14-04-08
 * Time: 下午16:34
 * 上传图片对话框逻辑代码,包括tab: 远程图片/上传图片/在线图片/搜索图片
 */

var onlineFile;

(function() {
	window.onload = function() {
		initButtons();
		onlineFile = onlineFile || new OnlineFile('fileList');
	};

	/* 初始化onok事件 */
	function initButtons() {
		dialog.onok = function() {
			var list = onlineFile.getInsertList();
			editor.execCommand('insertfile', list);
		};
	}

	/* 在线附件 */
	function OnlineFile(target) {
		this.container = utils.isString(target) ? document.getElementById(target) : target;
		this.init();
	}
	OnlineFile.prototype = {
		init: function() {
			this.initContainer();
			this.initEvents();
			this.initData();
		},
		/* 初始化容器 */
		initContainer: function() {
			this.container.innerHTML = '';
			this.list = document.createElement('ul');
			this.clearFloat = document.createElement('li');

			domUtils.addClass(this.list, 'list');
			domUtils.addClass(this.clearFloat, 'clearFloat');

			this.list.appendChild(this.clearFloat);
			this.container.appendChild(this.list);
		},
		/* 初始化滚动事件,滚动到地步自动拉取数据 */
		initEvents: function() {
			var _this = this;

			/* 滚动拉取图片 */
			domUtils.on($G('fileList'), 'scroll', function(e) {
				var panel = this;
				if(panel.scrollHeight - (panel.offsetHeight + panel.scrollTop) < 10) {
					_this.getFileData();
				}
			});
			/* 选中图片 */
			domUtils.on(this.list, 'click', function(e) {
				var target = e.target || e.srcElement,
					li = target.parentNode;

				if(li.tagName.toLowerCase() == 'li') {
					if(domUtils.hasClass(li, 'selected')) {
						domUtils.removeClasses(li, 'selected');
					} else {
						domUtils.addClass(li, 'selected');
					}
				}
			});
		},
		/* 初始化第一次的数据 */
		initData: function() {

			/* 拉取数据需要使用的值 */
			this.state = 0;
			this.listIndex = 0;
			this.listSize = 50;
			this.listEnd = false;

			/* 第一次拉取数据 */
			this.getFileData();
		},
		/* 向后台拉取图片列表数据 */
		getFileData: function() {
			var _this = this;

			if(!_this.listEnd && !this.isLoadingData) {
				this.isLoadingData = true;
				ajax.request(editor.getActionUrl("fileList"), {
					timeout: 100000,
					data: utils.extend({
						start: this.listIndex,
						length: this.listSize,
						timeMin: $("#timeMin").val(),
						timeMax: $("#timeMax").val(),
						fType: $('#fType').val(),
						search: $("#search").val()
					}),
					method: 'get',
					onsuccess: function(r) {
						try {
							var json = eval('(' + r.responseText + ')');
							if(json.data && json.data.length > 0) {
								_this.pushData(json.data);
								_this.listIndex++;
								if(_this.listIndex >= json.recordsFiltered / json.length) {
									_this.listEnd = true;
								}
								_this.isLoadingData = false;
							}
						} catch(e) {
							if(r.responseText.indexOf('ue_separate_ue') != -1) {
								var list = r.responseText.split(r.responseText);
								_this.pushData(list);
								_this.listIndex = parseInt(list.length);
								_this.listEnd = true;
								_this.isLoadingData = false;
							}
						}
					},
					onerror: function() {
						_this.isLoadingData = false;
					}
				});
			}
		},
		/* 添加图片到列表界面上 */
		pushData: function(list) {
			var i, item, img, filetype, preview, icon, _this = this, urlPrefix = IMGDOMAIN;
			for(i = 0; i < list.length; i++) {
				if(list[i] && list[i].url) {
					item = document.createElement('li');
					icon = document.createElement('span');
					filetype = list[i].url.substr(list[i].url.lastIndexOf('.') + 1).toLowerCase();

					if("png|jpg|jpeg|gif|bmp".indexOf(filetype) != -1) {
						preview = document.createElement('img');
						domUtils.on(preview, 'load', (function(image) {
							return function() {
								_this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight);
							};
						})(preview));
						preview.width = 113;
						preview.setAttribute('src', urlPrefix + list[i].url + (list[i].url.indexOf('?') == -1 ? '?noCache=' : '&noCache=') + (+new Date()).toString(36));
					}else{
						var ic = document.createElement('i'), textSpan = document.createElement('span');
						textSpan.innerHTML = list[i].url.substr(list[i].url.lastIndexOf('/') + 1);
						preview = document.createElement('div');
						preview.appendChild(ic);
						preview.appendChild(textSpan);
						domUtils.addClass(preview, 'file-wrapper');
						domUtils.addClass(textSpan, 'file-title');
						domUtils.addClass(ic, 'file-type-' + filetype);
						domUtils.addClass(ic, 'file-preview');
					}
					domUtils.addClass(icon, 'icon');
					item.setAttribute('data-url', urlPrefix + list[i].url);
					if(list[i].fileName) {
						item.setAttribute('data-title', list[i].fileName);
					}

					item.appendChild(preview);
					item.appendChild(icon);
					this.list.insertBefore(item, this.clearFloat);
				}
			}
		},
		/* 改变图片大小 */
		scale: function(img, w, h, type) {
			var ow = img.width,
				oh = img.height;

			if(type == 'justify') {
				if(ow >= oh) {
					img.width = w;
					img.height = h * oh / ow;
					img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
				} else {
					img.width = w * ow / oh;
					img.height = h;
					img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
				}
			} else {
				if(ow >= oh) {
					img.width = w * ow / oh;
					img.height = h;
					img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
				} else {
					img.width = w;
					img.height = h * oh / ow;
					img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
				}
			}
		},
		getInsertList: function() {
			var i, lis = this.list.children,
				list = [];
			for(i = 0; i < lis.length; i++) {
				if(domUtils.hasClass(lis[i], 'selected')) {
					var url = lis[i].getAttribute('data-url');
					var title = lis[i].getAttribute('data-title') || url.substr(url.lastIndexOf('/') + 1);
					list.push({
						title: title,
						url: url
					});
				}
			}
			return list;
		},
		reload: function() {
			onlineFile = new OnlineFile('fileList'); //重新初始化
		}
	};

	$('#fType').on('change', function() {
		dchanged();
	});

	$('#doSearch').on('click', function() {
		dchanged();
	});

	$('#search').bind('keyup', function(e) {
		if(e.keyCode == 13 || (e.keyCode == 8 && (this.value.length == 0))) {
			dchanged();
		}
	});
})();

function dchanged() {
	$('#fileList').empty();
	setTimeout(function() {
		onlineFile.reload();
	}, 50);
}