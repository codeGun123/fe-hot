import React from 'react';
import { Dropdown, Menu, Icon, Row, Col } from 'antd';
import Router from 'next/router';
import classNames from 'classnames/bind';
import MyHeader from '../MyHeader';
import { getUserInfoStorage, removeUserInfoStorage } from '../../util';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleHome = this.handleHome.bind(this);
  }

  componentDidMount() {
    // 设置用户名称
    const user = getUserInfoStorage();

    if (user) {
      this.setState({ user });
    }
  }

  handleHome() {
    Router.push('/index');
  }

  handleMenu({ key }) {
    if (key === 'logout') {
      removeUserInfoStorage();
      Router.push('/login');
    }
  }

  render() {
    const { user } = this.state;
    const menu = (
      <Menu onClick={this.handleMenu}>
        <Menu.Item key="Info">修改资料</Menu.Item>
        <Menu.Item key="pwd">修改密码</Menu.Item>
        <Menu.Item key="logout">注销登录</Menu.Item>
      </Menu>
    );

    return (
      <header className={cx('white')}>
        <Row type="flex" align="middle">
          <Col span={12}>
            <span className={cx('fz20')}>热拌系统ERP后台 </span>
          </Col>
          <Col span={12} className={cx('text-right')}>
            <Dropdown overlay={menu}>
              <span className={cx('fz16', 'pointer')}>
                <Icon type="user" /> {user && user.userName}{' '}
                <Icon type="caret-down" />
              </span>
            </Dropdown>
          </Col>
        </Row>
      </header>
    );
  }
}
