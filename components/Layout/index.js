import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import classNames from 'classnames/bind';
import HotHeader from '../Header/index';
import styles from './index.less';
const cx = classNames.bind(styles);

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class HotLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <Layout className={cx('layout')}>
        <Header>
          <HotHeader onToggle={this.handleToggle} />
        </Header>
        <Layout>
          <Sider className={cx('white')}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    用户管理
                  </span>
                }
              >
                <Menu.Item key="1">平台供应商</Menu.Item>
                <Menu.Item key="2">运输公司</Menu.Item>
                <Menu.Item key="3">客户信息</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="setting" />
                    系统管理
                  </span>
                }
              >
                <Menu.Item key="5">菜单管理</Menu.Item>
                <Menu.Item key="6">权限管理</Menu.Item>
                <Menu.Item key="7">组织管理</Menu.Item>
                <Menu.Item key="8">员工管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="shopping" />
                    商品管理
                  </span>
                }
              >
                <Menu.Item key="9">商品列表</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="ordered-list" />
                    订单管理
                  </span>
                }
              >
                <Menu.Item key="10">订单列表</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
