import React from 'react';
import './index.less';

// 404错误
export const renderClientError = (
  <div className="error-container">
    <img className="error-img" src="../../static/404.png" />
    <div>
      <div className="error-title">哎呦 页面不见了～</div>
      <div className="error-tip">莫急 换个姿势刷新试一试</div>
    </div>
  </div>
);

// 500错误
export const renderServeError = (
  <div className="error-container">
    <img className="error-img" src="../../static/500.png" />
    <div className="">
      <div className="error-title">我勒个去 服务器出错啦～</div>
      <div className="error-tip">再给我一次机会 稍后再试</div>
    </div>
  </div>
);

// 首页没有清单
export const renderNoList = (
  <div className="error-container">
    <img className="error-img" src="../../static/no-list.png" />
    <div className="">
      <div className="error-title">您还暂无清单哦～</div>
      <div className="error-tip">点击屏幕右上角立刻新建清单</div>
    </div>
  </div>
);

// 暂无数据
export const renderNoGoods = (
  <div className="error-container">
    <img className="error-img--min" src="../../static/no-list.png" />
    <div className="">
      <div className="error-tip">没有查询到你想要的数据</div>
    </div>
  </div>
);
