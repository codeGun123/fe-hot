import React from 'react';
import styles from './index.less';

// 404错误
export const renderClientError = (
  <div className={styles['error-container']}>
    <img className={styles['error-img']} src="../../static/404.png" />
    <div>
      <div className={styles['error-title']}>哎呦 页面不见了～</div>
      <div className={styles['error-tip']}>莫急 换个姿势刷新试一试</div>
    </div>
  </div>
);

// 500错误
export const renderServeError = (
  <div className={styles['error-container']}>
    <img className={styles['error-img']} src="../../static/500.png" />
    <div>
      <div className={styles['error-title']}>我勒个去 服务器出错啦～</div>
      <div className={styles['error-tip']}>再给我一次机会 稍后再试</div>
    </div>
  </div>
);

// 暂无数据
export const renderNoGoods = (
  <div className={styles['error-container']}>
    <img className={styles['error-img--min']} src="../../static/no-list.png" />
    <div className="">
      <div className={styles['error-tip']}>没有查询到你想要的数据</div>
    </div>
  </div>
);
