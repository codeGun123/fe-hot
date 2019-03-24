/********** 菜单管理 *********/

import React, { Component } from 'react';
import { Button, Table, Pagination, Row, Col, Select, Divider } from 'antd';
import classNames from 'classnames/bind';
import { ACCOUNT_TYPE } from '../../../global/index';
import styles from './index.less';
const cx = classNames.bind(styles);

const { Option } = Select;
const optionHtml = Object.values(ACCOUNT_TYPE).map(item => {
  return (
    <Option value={item.value} key={item.value}>
      {item.label}
    </Option>
  );
});

const dataSource = [
  {
    icon: null,
    id: '120164335703388160',
    menuType: 1,
    name: '用户管理',
    parent: '0',
    path: '/user',
    priority: null,
    sort: 1,
    statusFlag: 1,
    updateTime: '2019-01-30 15:18:01'
  },
  {
    icon: null,
    id: '120164335703388162',
    menuType: 2,
    name: '系统管理',
    parent: '0',
    path: '/system',
    priority: null,
    sort: 2,
    statusFlag: 1,
    updateTime: '2019-01-30 15:18:01'
  },
  {
    icon: null,
    id: '120164335703388163',
    menuType: 3,
    name: '商品管理',
    parent: '0',
    path: '/goods',
    priority: null,
    sort: 3,
    statusFlag: 1,
    updateTime: '2019-01-30 15:18:01'
  },
  {
    icon: null,
    id: '120164335703388164',
    menuType: 3,
    name: '订单管理',
    parent: '0',
    path: '/order',
    priority: null,
    sort: 4,
    statusFlag: 1,
    updateTime: '2019-01-30 15:18:01'
  }
];

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '所属系统',
    dataIndex: 'menuType',
    key: 'menuType'
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    width: 500
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">添加子菜单</a>
        <Divider type="vertical" />
        <a href="javascript:;">编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    )
  }
];

export default class HotAuthority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      params: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(value);
  }

  render() {
    // const { dataSource } = this.state;

    return (
      <div className={cx('hot-layout')}>
        <Row>
          <Col span={12}>
            <Select
              onChange={this.handleChange}
              defaultValue="platform"
              style={{ width: 200 }}
            >
              {optionHtml}
            </Select>
          </Col>
          <Col span={12} className={cx('text-right')}>
            <Button
              icon="plus"
              type="primary"
              onClick={() => this.onEdit(0, 0, '添加菜单')}
            >
              添加菜单
            </Button>
          </Col>
        </Row>
        <div className={cx('hot-layout-content')}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <footer className={cx('hot-layout-footer')}>
          <Pagination className={cx('text-right')} total={1} />
        </footer>
      </div>
    );
  }
}
