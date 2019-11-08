console.log(window.performance, '--------------------------');

;(function (win) {
    // var ENTRRIES_TYPE = {
    //     script: ''
    // }
    function AS(opt) {
        this.opt = opt;
        this.url = opt.url;

        window.onload = function () {
            // console.log(getPageLoadedTimes());
            var pageData = getPageLoadedTimes();
            console.log(pageData, 'kkkk', opt.url)
            var entriesData = getEntriesLoadedTimes();
            console.log(entriesData, 'entriesData', opt.url)


            ajax(opt.url, {
                pageData,
                entriesData,
            });
        }
    }

    /**
     * 获取页面加载时间
     */
    function getPageLoadedTimes() {
        var timing = window.performance.timing;
        if (!timing) return;
    
        // Redirection Time 重定向耗时
        var rrt = timing.fetchStart - timing.navigationStart;
    
        // Domain Lookup Time 域名解析耗时
        var dnst = timing.domainLookupEnd - timing.domainLookupStart;
    
        // Server Connection Time tcp 建立连接耗时
        var tcpt = timing.connectEnd - timing.connectStart;
    
        // Server Response Time (srt) 服务器响应耗时
        var srt = timing.responseStart - timing.requestStart;
    
        // Page Download Time (pdt) 页面HTML下载耗时
        var pdt = timing.responseEnd - timing.responseStart;
    
        // Document Interactive Time (dit) DOM 就绪耗时
        var dit = timing.domInteractive - timing.navigationStart;
    
        // Document Content Loaded Time (dclt) DOM/CSSDOM/JS完成耗时
        var dclt = timing.domContentLoadedEventEnd - timing.navigationStart;
    
        // Page Load Time (plt) 网页加载总耗时
        var plt = timing.loadEventStart - timing.navigationStart;
    
        return {
            rrt,
            dnst,
            tcpt,
            srt,
            pdt,
            dit,
            dclt,
            plt,
        }
    }

    function getEntriesLoadedTimes() {
        console.log(getEntriesByType(), 'entries()')
        var entries = getEntriesByType();
        var res = [];
        for (var i = 0, len = entries.length; i < len; i++) {
            if (entries[i].initiatorType !== 'navigation') {
                res[i] = calcEntryLoadedTime(entries[i]);
            }
        }
        return res;
    }

    function calcEntryLoadedTime(entry) {
        // Server Connection Time tcp 建立连接耗时
        var tcpt = entry.connectEnd - entry.connectStart;

        // Server Response Time (srt) 服务器响应耗时
        var srt = entry.responseStart - entry.requestStart;

        // Server Response Time (srt) 服务器响应耗时
        var srt = entry.responseStart - entry.requestStart;

        // Page Download Time (pdt) 资源HTML下载耗时
        var pdt = entry.responseEnd - entry.responseStart;

        // Domain Lookup Time 域名解析耗时
        var dnst = timing.domainLookupEnd - timing.domainLookupStart;

        return res = {
            tcpt,
            srt,
            pdt,
            dnst,
            duration: entry.duration,
            name: entry.name,
            initiatorType: entry.initiatorType,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize,
            transferSize: entry.transferSize,
            startTime: entry.startTime,
        }
        
    }

    /**
     * 
     * @param {*} url 
     */
    function getQueryParams(url) {
        var index = url.indexOf(url);
        if (index === -1) return; 
        var res = {};
        var search = url.substr(index + 1);
        var arr = search.split('&');
        for (let i = 0, len = arr.length; i < len; i++) {
            var index = arr[i].indexOf('=')
            var key = arr[i].substr(0, index);
            res[key] = arr[i].substr(index + 1);
        }
        return res;
    }
      

    function ajax(url, data) {
        var xhr = new XMLHttpRequest();
        data.date = +new Date();
        data.url = window.location.href;

        // 
        var search = window.location.search;
        var paramsObj = getQueryParams(search);

        xhr.open('post', url); // 异步操作
        // xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');
        var formData = new FormData();
        formData.append('loadInfo', JSON.stringify(data));
        formData.append('url', window.location.href);
        formData.append('appId', paramsObj.appId);
        formData.append('token', paramsObj.token);
        xhr.send(formData);
    }

    win.JAS = AS;
})(window)