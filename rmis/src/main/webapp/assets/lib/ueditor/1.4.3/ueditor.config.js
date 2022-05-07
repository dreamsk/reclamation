(function () {

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: window.UEDITOR_HOME_URL || getUEBasePath() //为编辑器实例添加一个路径，这个不能被注释
        , serverUrl: contextPath + "/ueditor" // 服务器统一请求接口路径
        , toolbars: [[ //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'pasteplain', 
            'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'emotion', 'attachment', 'simpleupload', 'insertimage', 'insertvideo', 'map', '|',
            'horizontal', 'date', 'time', 'spechars', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 
            'deleterow', 'insertcol', 'deletecol', 'mergecells', 'splittocells', 'splittorows', 'splittocols', '|',
            'preview', 'searchreplace', 'drafts'
        ]]
        ,textarea:'content' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值
        ,enableAutoSave: true //启用自动保存
        ,saveInterval: 500 //自动保存间隔时间， 单位ms
        ,imagePopup:true //图片操作的浮层开关，默认打开
        ,autoSyncData:true //自动同步编辑器要提交的数据
        ,allHtmlEnabled:false //提交到后台的数据是否包含整个html字符串
       	,iframeUrlMap:{ //dialog内容的路径 ～会被替换成URL,垓属性一旦打开，将覆盖所有的dialog的默认路径
          	'anchor':'~/dialogs/anchor/anchor.html',
          	'attachment':'~/dialogs/attachment/attachment.jsp'
        }
    };

    function getUEBasePath(docUrl, confUrl) {
        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());
    }

    function getConfigFilePath() {
        var configPath = document.getElementsByTagName('script');
        return configPath[ configPath.length - 1 ].src;
    }

    function getBasePath(docUrl, confUrl) {
        var basePath = confUrl;
        if (/^(\/|\\\\)/.test(confUrl)) {
            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');
        } else if (!/^[a-z]+:/i.test(confUrl)) {
            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
            basePath = docUrl + "" + confUrl;
        }
        return optimizationPath(basePath);
    }

    function optimizationPath(path) {
        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];
        path = path.replace(protocol, "").split("?")[0].split("#")[0];
        path = path.replace(/\\/g, '/').split(/\//);
        path[ path.length - 1 ] = "";
        while (path.length) {
            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }
        }
        return protocol + res.join("/");
    }

    window.UE = { getUEBasePath: getUEBasePath };
})();
