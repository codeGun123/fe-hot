// 获取数据
import { get, post } from '../../../util/http';
import {
  addMenuUrl,
  deleteMenuUrl,
  updateMenuUrl,
  getMenuListUrl
} from '../../../config/index';

export const addMenu = params => {
  return post(addMenuUrl, params);
};

export const deleteMenu = params => {
  return get(deleteMenuUrl, params);
};

export const updateMenu = params => {
  return post(updateMenuUrl, params);
};

export const getMenuList = params => {
  return get(getMenuListUrl, params);
};
