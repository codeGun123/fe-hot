/********** 数据请求 *********/
// https://www.jianshu.com/p/a9d688bbb50b
// https://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html
// 输出两个get post方法

import { message } from 'antd';
import { stringify } from 'querystring';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import NProgress from 'nprogress';

// import fetch from 'node-fetch';
import { METHOD } from './constants';
const { getUserInfoStorage } = require('./storage');

const codeMsg = {
  110101: '用户名不存在',
  110102: '用户名或密码错误',
  110103: '用户登录已过期',
  110104: '用户操作已被禁止',
  110105: '参数错误',
  110106: '数据签名校验失败',
  110201: '数据不存在或无法访问',
  110202: '数据验证错误',
  110203: '数据操作错误',
  999999: '服务器繁忙"',

  // 二期错误码
  100301: '参数强验证失败',
  100302: '依赖信息检查失败',
  100303: '目标对象不存在或者已经被删除',
  100304: '目标状态错误',
  100305: '错误的返回结果',
  100306: '数据已存在',
  100401: '用户名或者密码错误',
  100402: '获取用户会话数据失败',
  100501: '缺少操作所需的权限',
  100502: '被禁止的访问',
  100601: '用户操作失败',
  100111: '链接超时'
};

function formatUrl(params) {
  const { url, body, method } = params;

  if (body && method === METHOD.get) {
    // const query = stringify(body);
    // return url + '?' + query;

    const query = Object.values(body).join('/');
    return url + '/' + query;
  }

  return url;
}

function formatBody(params) {
  const { url, body, method } = params;

  if (body && method === METHOD.post) {
    return JSON.stringify(body);
  }

  return '';
}

function formatOptions(params) {
  const body = formatBody(params);

  return {
    method: params.method,
    headers: {
      'Content-Type': 'application/json',
      platform: 'STORE_SYSTEM'
    },
    // 允许跨域
    mode: 'cors',
    // 可跨域携带cookie
    credentials: 'include',
    ...(body ? { body } : {})
  };
}

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

function checkResultCode(response) {
  NProgress.done();
  const { resultCode, resultMsg } = response;

  if (parseInt(resultCode, 10) === 200) {
    return response;
  } else if (resultCode === 110103 || resultCode === 100402) {
    message.error(resultMsg);
    Router.push('/login');
  } else {
    message.error(resultMsg);
    return response;
  }
}

function request(params) {
  const token = getUserInfoStorage() || '';

  // 临时处理
  if (!params.url.includes('/login') && !token) {
    Router.push('/login');
    return Promise.resolve({});
  }

  const path = formatUrl(params);
  const options = formatOptions(params, token);

  console.log(`数据请求: ${path}`);
  NProgress.start();

  return fetch(path, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkResultCode)
    .catch(err => err);
}

export const get = (url, params) =>
  request({ url, method: METHOD.get, body: params });
export const post = (url, params) =>
  request({ url, method: METHOD.post, body: params });
