/********** 菜单管理 *********/

import React, { Component } from 'react';
import {
  Button,
  Table,
  Pagination,
  Row,
  Col,
  Select,
  Divider,
  Modal,
  Form,
  Input,
  Icon,
  Popconfirm
} from 'antd';
import classNames from 'classnames/bind';
import { ACCOUNT_TYPE } from '../../../global/index';
import { addMenu, deleteMenu, updateMenu, getMenuList } from './action';

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

class HotMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      menuCode: Object.values(ACCOUNT_TYPE)[0].value,
      visible: false,
      parentMenu: {}, // 父级菜单
      currentMenu: {} // 当前选中菜单
    };
    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handeDelete = this.handeDelete.bind(this);

    this.loadData();
  }

  async loadData() {
    const { menuCode } = this.state;
    const result = await getMenuList({ menuCode });
    this.setState({ dataSource: result.data });
  }

  handleChange(value) {
    this.setState({ menuCode: value });
  }

  handleAdd(record, parentMenu) {
    this.setState({
      visible: true,
      currentMenu: record,
      parentMenu: parentMenu
    });
  }

  handleCancel() {
    const { form } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  }

  async handeDelete(record) {
    await deleteMenu({ menuId: record.id });
    this.loadData();
  }

  handleSubmit(e) {
    const { form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const { currentMenu = {}, parentMenu = {}, menuCode } = this.state;

        if (currentMenu.id) {
          const params = {
            menuCode,
            ...currentMenu,
            ...values
          };

          updateMenu(params).then(res => {
            form.resetFields();
            this.setState({ visible: false });
            this.loadData();
          });
        } else {
          const params = {
            menuCode,
            ...values,
            parentMenuId: parentMenu.id ? parentMenu.id : ''
          };

          addMenu(params).then(res => {
            form.resetFields();
            this.setState({ visible: false });
            this.loadData();
          });
        }
      }
    });
  }

  renderColumns() {
    return [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName'
      },
      {
        title: '路径',
        dataIndex: 'href',
        key: 'href',
        width: 500
      },
      {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        render: value => value && <Icon type={value} />
      },
      {
        title: '排序',
        dataIndex: 'sortOrder',
        key: 'sortOrder'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              href="javascript:;"
              onClick={() => {
                this.handleAdd({}, record);
              }}
            >
              添加子菜单
            </a>
            <Divider type="vertical" />
            <a
              href="javascript:;"
              onClick={() => {
                this.handleAdd(record, {});
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />

            <Popconfirm
              placement="topLeft"
              title={'确定删除？'}
              onConfirm={() => this.handeDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  render() {
    const {
      dataSource,
      visible,
      parentMenu = {},
      currentMenu = {}
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = this.renderColumns();

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
              type="primary"
              style={{ marginRight: 10 }}
              onClick={this.loadData}
            >
              查询
            </Button>
            <Button icon="plus" type="primary" onClick={this.handleAdd}>
              添加
            </Button>
          </Col>
        </Row>
        <div className={cx('hot-layout-content')}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        {/* <footer className={cx('hot-layout-footer')}>
          <Pagination className={cx('text-right')} total={1} />
        </footer> */}
        <Modal
          title="菜单"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="父级菜单名称">
              {getFieldDecorator('parentMenuName', {
                initialValue: parentMenu.menuName
              })(<Input placeholder="菜单名称" disabled />)}
            </Form.Item>
            <Form.Item label="菜单名称">
              {getFieldDecorator('menuName', {
                initialValue: currentMenu.menuName,
                rules: [{ required: true, message: '输入菜单名称!' }]
              })(<Input placeholder="输入菜单名称" />)}
            </Form.Item>
            <Form.Item label="href">
              {getFieldDecorator('href', {
                initialValue: currentMenu.href,
                rules: [{ required: true, message: '输入href!' }]
              })(<Input placeholder="输入href" />)}
            </Form.Item>
            <Form.Item label="图标">
              {getFieldDecorator('icon', {
                initialValue: currentMenu.icon
              })(<Input placeholder="输入href" />)}
            </Form.Item>
            <Form.Item label="排序">
              {getFieldDecorator('sortOrder', {
                initialValue: currentMenu.sortOrder
              })(<Input placeholder="输入数字，默认0!" />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 8, offset: 10 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedForm = Form.create()(HotMenu);
export default WrappedForm;
