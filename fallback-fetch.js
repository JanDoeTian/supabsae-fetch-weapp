// fallback-fetch.ts
import Taro from '@tarojs/taro';

let fetchImpl;

// 如果环境支持 fetch，就使用它
if (typeof globalThis !== 'undefined' && typeof globalThis.fetch === 'function') {
  fetchImpl = globalThis.fetch.bind(globalThis);
} else {
  // fallback：适配 Taro.request
  fetchImpl = function (url, options = {}) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        method: options.method || 'GET',
        data: options.body || {},
        header: options.headers || {},
        success: res => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(res.data),
            text: () => Promise.resolve(JSON.stringify(res.data)),
          });
        },
        fail: err => reject(err),
      });
    });
  };
}

// shim for Headers/Request/Response when environment doesn't provide them
const HeadersShim = typeof globalThis.Headers !== 'undefined' ? globalThis.Headers : class {};
const RequestShim = typeof globalThis.Request !== 'undefined' ? globalThis.Request : class {};
const ResponseShim = typeof globalThis.Response !== 'undefined' ? globalThis.Response : class {};

export const fetch = fetchImpl;
export const Headers = HeadersShim;
export const Request = RequestShim;
export const Response = ResponseShim;