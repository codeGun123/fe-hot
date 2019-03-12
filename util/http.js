// https://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html
// 输出两个get post方法
import fetch from 'isomorphic-unfetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const header = {
  // 可跨域携带cookie
  credentials: 'include',
  mode: 'cors',
  method: 'get'
};

// 待测试
function request(url, options = {}) {
  return fetch(url, { ...header, ...options })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err);
}

export const get = (url, options) => request(url, options);
export const post = (url, options) =>
  request(url, { method: 'post', ...options });
