// 获取数据
import { loginUrl, getUserInfoUrl } from '../../config';
import {
  get,
  post,
  removeTokenStorage,
  removeUserInfoStorage
} from '../../util/index';

export const login = params => {
  return post(loginUrl, params);
};
