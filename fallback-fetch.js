let fetchImpl;

if (typeof globalThis !== 'undefined' && typeof globalThis.fetch === 'function') {
  fetchImpl = globalThis.fetch.bind(globalThis);
} else {
  // fallback for Taro environment
  fetchImpl = function (url, options = {}) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        method: options.method || 'GET',
        data: options.body || {},
        header: options.headers || {},
        success: res => {
          resolve({
            ok: true,
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

export const fetch = fetchImpl;