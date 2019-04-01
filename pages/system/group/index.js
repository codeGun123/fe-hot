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
  Popconfirm,
  Switch
} from 'antd';
import classNames from 'classnames/bind';
import { ACCOUNT_TYPE } from '../../../global/index';
import {
  addAccountGroup,
  deleteAccountGroup,
  updateAccountGroup,
  getAccountGroup
} from './action';

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

const accountTypeString = value => {
  const current =
    Object.values(ACCOUNT_TYPE).find(item => item.value === value) || {};

  return current.label;
};

class HotGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        limit: 1000,
        pageNum: 0,
        groupKey: Object.values(ACCOUNT_TYPE)[0].value
      },
      dataSource: [],
      visible: false,
      parentMenu: {}, // 父级菜单
      current: {} // 当前选中菜单
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
    const { params } = this.state;
    const result = await getAccountGroup(params);
    this.setState({ dataSource: result.data });
  }

  handleChange(value) {
    const { params } = this.state;

    this.setState({
      params: { ...params, pageNum: 0, groupKey: value.trim() }
    });
  }

  handleAdd(record, parentMenu) {
    this.setState({
      visible: true,
      current: record,
      parentMenu: parentMenu
    });
  }

  handleCancel() {
    const { form } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  }

  async handeDelete(record) {
    await deleteAccountGroup({ id: record.id });
    this.loadData();
  }

  handleSubmit(e) {
    const { form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const { current = {}, parentMenu = {}, groupKey } = this.state;

        if (current.id) {
          const params = {
            groupKey,
            ...current,
            ...values
          };

          updateAccountGroup(params).then(res => {
            form.resetFields();
            this.setState({ visible: false });
            this.loadData();
          });
        } else {
          const params = {
            groupKey,
            ...values,
            parentAccountGroupId: parentMenu.id ? parentMenu.id : ''
          };

          addAccountGroup(params).then(res => {
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
        title: '组织类型',
        dataIndex: 'groupKey',
        key: 'groupKey',
        render: text => accountTypeString(text)
      },
      {
        title: '组织名称',
        dataIndex: 'groupName',
        key: 'groupName'
      },
      {
        title: '有效时间',
        dataIndex: 'expiryDate',
        key: 'expiryDate',
        render: text => (text <= 0 ? '长期' : text + '天')
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
              添加子组织
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
      params,
      dataSource,
      visible,
      parentMenu = {},
      current = {}
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
            <Form.Item label="父级组织名称">
              {getFieldDecorator('parentMenuName', {
                initialValue: parentMenu.groupName
              })(<Input placeholder="组织名称" disabled />)}
            </Form.Item>
            <Form.Item label="组织类型">
              {getFieldDecorator('groupKey', {
                initialValue: current.groupKey || params.groupKey
              })(
                <Select placeholder="选择组织类型" disabled>
                  {optionHtml}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="组织名称">
              {getFieldDecorator('groupName', {
                initialValue: current.groupName,
                rules: [{ required: true, message: '输入组织名称!' }]
              })(<Input placeholder="输入组织名称" />)}
            </Form.Item>
            <Form.Item label="有效时间">
              {getFieldDecorator('expiryDate', {
                initialValue: current.expiryDate,
                rules: [{ required: true, message: '输入有效时间!' }]
              })(
                <Input
                  style={{ width: '100%' }}
                  placeholder="输入有效时间, 小于0表示长期有效"
                  addonAfter="天"
                />
              )}
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

const WrappedForm = Form.create()(HotGroup);
export default WrappedForm;
