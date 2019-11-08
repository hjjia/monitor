import axios from 'axios';
import { resolve } from 'url';

// 请求列表
const requestList: any = [];

// 趣消列表
const { CancelToken } = axios;
let sources: any = {};

// 设置请求超时时间
// axios.defaults.headers.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://47.103.59.4:8031/';

axios.interceptors.request.use((config: any): any => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data);

    config.cancelToken = new CancelToken((cancel) => {
        sources[request] = cancel;
    });

    if (requestList.includes(request)) {
        sources[request]('取消重复请求');
    } else {
        requestList.push(request);
        // store.dispatch('changeGlobalState', {loading: true})
    }

    // const token = store.getters.userInfo.token
    // if (token) {
    //    config.headers.token = token
    // }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use((res: any): any => {
    const req = JSON.stringify(res.config.url) + JSON.stringify(res.config.data);
    requestList.splice(requestList.findIndex((item: any) => item === req), 1)
    if (requestList.length === 0) {
        // store.dispatch('changeGlobalState', {loading: false})
    }
    /*
    if (response.data.code === 900401) {
        window.ELEMENT.Message.error('认证失效，请重新登录！', 1000)
        router.push('/login')
    }
    */
   return res;
}, ((err: any) => {
    if (axios.isCancel(err)) {
        requestList.length = 0;
        // store.dispatch('changeGlobalState', {loading: false})
        throw new axios.Cancel('cancel request');
    } else {
     //   window.onerror('网络请求失败')
    }
    return Promise.reject(err);
}));

const request = function (url: string, params: {}, config: {}, method: string) {
   /*
    return new Promise((resolve, reject) => {
        axios[method](url, params, Object.assign({}, config)).then((res: any) => {
            resolve(res.data);
        }, (err: any) => {
            if (err.Cancel) {
                console.log(err);
            } else {
                reject(err);
            }
        }).catch((err: any) => {
            reject(err);
        })
    })
    */
}

const post = (url: string, params: any, config = {}) => {
    return request(url, params, config, 'post');
}

const get = (url: string, params: any, config = {}) => {
    return request(url, params, config, 'get');
}

export default { sources, post, get };