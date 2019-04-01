/********** 缓存方法 *********/
const { STORAGE } = require('./constants');

/** 通用方法 start */
function getStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function setStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function removeStorage(key) {
  sessionStorage.removeItem(key);
}
/** 通用方法 end */
/* token信息-start */
export const getTokentorage = () => {
  return getStorage(STORAGE.token);
};

export const setTokenStorage = data => {
  setStorage(STORAGE.token, data);
};

export const removeTokenStorage = data => {
  removeStorage(STORAGE.token, data);
};
/* token信息-end */

/* 用户信息-start */
export const getUserInfoStorage = () => {
  return getStorage(STORAGE.userInfo);
};

export const setUserInfoStorage = data => {
  setStorage(STORAGE.userInfo, data);
};

export const removeUserInfoStorage = data => {
  removeStorage(STORAGE.userInfo, data);
};
/* 用户信息-end */
