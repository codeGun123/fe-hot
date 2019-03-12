import React from 'react';
import './index.less';

export const renderClientError = (
  <div className="error-container">
    <img className="error-img" src="../../static/404.png" />
    <div>
      <div className="error-title">哎呦 页面不见了～</div>
      <div className="error-tip">莫急 换个姿势刷新试一试</div>
    </div>
  </div>
);

export const renderServeError = (
  <div className="error-container">
    <img className="error-img" src="../../static/500.png" />
    <div className="">
      <div className="error-title">我勒个去 服务器出错啦～</div>
      <div className="error-tip">再给我一次机会 稍后再试</div>
    </div>
  </div>
);
