// 获取数据
import { get, post } from '../../../util/http';
import {
  addAccountGroupUrl,
  deleteAccountGroupUrl,
  updateAccountGroupUrl,
  getAccountGroupUrl
} from '../../../config/index';

export const addAccountGroup = params => {
  return post(addAccountGroupUrl, params);
};

export const deleteAccountGroup = params => {
  return get(deleteAccountGroupUrl, params);
};

export const updateAccountGroup = params => {
  return post(updateAccountGroupUrl, params);
};

export const getAccountGroup = params => {
  return get(getAccountGroupUrl, params);
};
