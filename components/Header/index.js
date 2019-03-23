import React from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import Router from 'next/router';
import MyHeader from '../MyHeader';
const { getUserInfoStorage } = require('../../util/storage');
import { removeTokenStorage, removeUserInfoStorage } from '../../util';
import './index.less';

export default class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showOut: false,
      nickName: ''
    };
  }

  componentDidMount() {
    const userInfo = getUserInfoStorage();

    if (userInfo) {
      this.setState({ nickName: userInfo.nickName });
    }
  }

  handleHome = () => {
    Router.push('/index');
  };

  handleMenu = () => {
    const { showOut } = this.state;
    this.setState({ showOut: !showOut });
  };

  handleOut = () => {
    // 清除登录信息， 跳转登录页面
    removeTokenStorage();
    removeUserInfoStorage();
    Router.push('/login');
  };

  render() {
    const { showOut, nickName } = this.state;
    let icontype = 'caret-down';
    let htmlOut = '';
    if (showOut) {
      icontype = 'caret-up';
      htmlOut = (
        <div className="head-menu-out" onClick={this.handleOut}>
          <span>退出</span>
          <Icon className="head-menu-icon" title="退出" type="poweroff" />
        </div>
      );
    }

    return (
      <div className="header-nav">
        <MyHeader />
        <div className="header-row">
          <img
            onClick={this.handleHome}
            className="head-img"
            src="../../static/page-head.png"
          />
          <div className="head-menu">
            <div className="head-menu-title" onClick={this.handleMenu}>
              {nickName}
              <Icon className="head-menu-icon" type={icontype} />
            </div>
            {htmlOut}
          </div>
        </div>
        <div className="mt15">
          <span onClick={this.handleHome} className="btn-red btn-head-list">
            <Icon className="btn-icon" type="bars" /> 清单列表
          </span>
        </div>
      </div>
    );
  }
}
