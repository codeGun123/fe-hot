// 获取数据
import { loginUrl, getUserInfoUrl } from '../../config';
import {
  get,
  post,
  removeTokenStorage,
  removeUserInfoStorage
} from '../../util/index';

export const login = params => {
  removeTokenStorage();
  removeUserInfoStorage();
  return post(loginUrl, params);
};

// 获取用户信息
export const getUserInfo = () => {
  return get(getUserInfoUrl);
};
