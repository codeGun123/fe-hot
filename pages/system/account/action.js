// 获取数据
import { get, post } from '../../../util/http';
import {
  addAccountUrl,
  deleteAccountUrl,
  updateAccountUrl,
  getAccountListUrl
} from '../../../config/index';

export const addAccount = params => {
  return post(addAccountUrl, params);
};

export const deleteAccount = params => {
  return get(deleteAccountUrl, params);
};

export const updateAccount = params => {
  return post(updateAccountUrl, params);
};

export const getAccountList = params => {
  return get(getAccountListUrl, params);
};
