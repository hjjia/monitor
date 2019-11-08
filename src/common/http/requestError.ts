import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class RequestError implements AxiosError {
  name = 'RequestError';
  message: string;
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<Http.APIErrorResponse>;
  status: number;
  data: Http.APIErrorResponse;
  isAxiosError: boolean;
  
  constructor(error: AxiosError) {
    this.config = error.config;
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.status = this.response ? this.response.status : 0;
    this.data = this.response ? this.response.data : { code: '', message: '' };
    this.message = `response status is ${this.status}, error code is ${
      this.data.code
    }, error message is ${this.data.message}`;
    this.isAxiosError = true;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}
