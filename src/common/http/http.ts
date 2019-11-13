import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, Method } from 'axios';
import * as Qs from 'qs';

// import { formatDatetime, DEFAULT_FORMAT_STR } from '@/utils/datetime';
import { RequestError } from './requestError';
import { METHODS } from 'http';

/*
function transformDatetimeKV(config: AxiosRequestConfig) {
  const keys = [
    'created_at_start',
    'created_at_end',
    'updated_at_start',
    'updated_at_end',
  ];

  const { params } = config;

  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return config;
  }

  const transformedParams = JSON.parse(JSON.stringify(params));

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let v = transformedParams[key];
    if (!v) {
      continue;
    }
    const formatStr = DEFAULT_FORMAT_STR;

    transformedParams[key] = formatDatetime({
      datetime: v,
      format: formatStr,
    });
  }

  config.params = transformedParams;

  return config;
}

axios.interceptors.request.use(transformDatetimeKV);
*/
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
if (process.env.NODE_ENV === 'production') {
 
} else {
  axios.defaults.baseURL = 'http://192.168.80.180:8002/'; // zx
}
axios.defaults.baseURL = 'https://www.yuzhix.com'

export function toParams(query: any) {
  if (!query) {
    return '';
  }
  return (
    Object.keys(query)
      .map(k => {
        let value = query[k];
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(value)}`;
      })
      .join('&') || ''
  );
}

function coversetFormData(data: any) {
    const formData = new FormData();
    const keys = Object.keys(data);
    for (let i = 0, len = keys.length; i < len; i++) {
        formData.append(`${keys[i]}`, data[keys[i]]);
    }
    return formData;
}

export function newHttp(prefix?: string) {
  if (!prefix) {
    prefix = '';
  }

  const http = {
    prefix,
    _handleErrorResponse(error: AxiosError) {
     // const formattedError = new RequestError(error);
      const formattedError = new RequestError(error);


      if (formattedError.status === 401 && !formattedError.data.code) {
        window.location.href = '/login';
      }

      return formattedError;
    },
    _request<T>(request: AxiosRequestConfig) {
      // use axios
      const axiosRequest = request;
      
      axiosRequest.paramsSerializer = this.serializeParams;

      const np = new Promise<AxiosResponse<T>>((resolve, reject) => {
        const op = axios.request<T>(axiosRequest);
        op.then((resp: any) => {
          resolve(resp.data);
        }).catch((error:any) => {
          reject(this._handleErrorResponse(error));
        });
      });
      return np;
    },
    serializeParams(params?: any) {
      return Qs.stringify(params, {
        arrayFormat: 'repeat',
        filter(prefix: string, value: any) {
          if (value === null || value === '' || value === undefined) {
            return;
          }
          return value;
        },
      });
    },
    get<T = any>(url: string, params = {}, options = {}) {
      const payload = Object.assign({ method: 'GET', url, params }, options);
      return this._request<T>(Object.assign(payload));
    },
    post<T = any>(url: string, data = {}, options = {}) {
      const formData = coversetFormData(data);
      // console.log(formData, 'formData')
      const payload = Object.assign({ method: 'POST', url, data }, options);
      payload.data = formData;
      return this._request<T>(Object.assign(payload));
    },
    /*
    post<T = any>(url: string, data = {}, options = {}) {
      const payload = Object.assign({ method: 'POST', url, data }, options);
      return this._request<T>(payload);
    },
    */
  };
  return http;
}

export class Stream {
  eventStream: EventSource;
  eventMap: { [key: string]: Function };
  constructor(url: string) {
    this.eventStream = new EventSource(url);
    this.eventMap = {};
  }
  public on(type: string, callback: Function): Stream {
    this.eventMap[type] = callback;
    switch (type) {
      case 'message':
        this.eventStream.onmessage = (e: MessageEvent) =>
          callback && callback(e);
        break;
      case 'error':
        this.eventStream.onerror = (e: Event) => callback && callback(e);
        break;
      default:
        this.eventStream.addEventListener(
          type,
          (e: Event) => callback && callback(e)
        );
    }
    return this;
  }
  public close(): void {
    this.eventStream.close();
  }
}

export const http = newHttp();
