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
  }

  componentDidMount() {}

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
    return (
      <div className="header-nav">
        <MyHeader />
      </div>
    );
  }
}
