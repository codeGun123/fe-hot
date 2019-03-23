/********** 系统数据请求 *********/
import { ROOT } from './constant';

module.exports = {
  // 登录
  loginUrl: `${ROOT}/account/login/byPass`,
  // 添加账户
  addAccountUrl: `${ROOT}/platform/account/add`,
  // 更新账户
  updateAccountUrl: `${ROOT}/platform/account/update`,
  // 获取账户列表
  getAccountUrl: `${ROOT}/platform/account/getByPhoneNum`,
  // 添加用户组
  addAccountGroupUrl: `${ROOT}/platform/accountGroup/add`,
  // 获取用户组列表
  getAccountGroupUrl: `${ROOT}/platform/accountGroup/getByGroupKey`

  // // 获取权限列表
  // getRoleListUrl :`${HOST}`,

  //  获取权限列表
  // getAccoutListUrl : `${HOST}`,
};
/********** hot-end *********/
