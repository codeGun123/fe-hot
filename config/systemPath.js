/********** 系统数据请求 *********/

// const ROOT = 'http://47.99.169.177';
import { ROOT } from './constant';

module.exports = {
  // 登录
  loginUrl: `${ROOT}/account/login/byPass`,

  // 添加菜单
  addMenuUrl: `${ROOT}/platform/menu/add`,
  // 删除菜单
  deleteMenuUrl: `${ROOT}/platform/menu/delete`,
  // 更新菜单
  updateMenuUrl: `${ROOT}/platform/menu/update`,
  // 获取菜单列表
  getMenuListUrl: `${ROOT}/platform/menu/all`,

  // 添加账户
  addAccountUrl: `${ROOT}/platform/account/add`,
  // 删除账户
  deleteAccountUrl: `${ROOT}/platform/account/delete`,
  // 更新账户
  updateAccountUrl: `${ROOT}/platform/account/update`,
  // 获取账户列表
  getAccountListUrl: `${ROOT}/platform/account/list`,

  // 添加用户组
  addAccountGroupUrl: `${ROOT}/platform/accountGroup/add`,
  // 删除用户组
  deleteAccountGroupUrl: `${ROOT}/platform/accountGroup/delete`,
  // 修改用户组
  updateAccountGroupUrl: `${ROOT}/platform/accountGroup/update`,
  // 获取用户组列表
  getAccountGroupUrl: `${ROOT}/platform/accountGroup/all`
};
