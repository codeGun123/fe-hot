/********** 用户管理 *********/

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
  addAccount,
  deleteAccount,
  updateAccount,
  getAccountList
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
  const current = Object.values(ACCOUNT_TYPE).find(
    item => item.value === value
  );

  return current.label;
};

class HotMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: { limit: 20, pageNum: 0, phoneNum: '' },
      dataSource: [],
      visible: false,
      confirmDirty: false,
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
    const result = await getAccountList(params);
    this.setState({ dataSource: result.data });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('密码输入不一致!');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleChange(value) {
    const { params } = this.state;
    this.setState({
      params: { ...params, pageNum: 0, phoneNum: value.trim() }
    });
  }

  handleAdd(record) {
    this.setState({
      visible: true,
      current: record
    });
  }

  handleCancel() {
    const { form } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  }

  async handeDelete(record) {
    await deleteAccount({ id: record.id });
    this.loadData();
  }

  handleSubmit(e) {
    const { form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const { current = {} } = this.state;

        if (current.id) {
          const params = {
            ...current,
            ...values,
            status: values.status ? 1 : 0
          };

          updateAccount(params).then(res => {
            form.resetFields();
            this.setState({ visible: false });
            this.loadData();
          });
        } else {
          const params = {
            ...values,
            status: values.status ? 1 : 0
          };
          debugger;
          addAccount(params).then(res => {
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
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '用户类型',
        dataIndex: 'accountType',
        key: 'accountType',
        render: text => {
          return accountTypeString(text);
        }
      },
      {
        title: '手机号',
        dataIndex: 'phoneNum',
        key: 'phoneNum'
      },
      {
        title: '所属组织',
        dataIndex: 'groupName',
        key: 'groupName',
        render: (text, record) => {
          if (record.accountGroup) {
            return accountGroup.groupName;
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, recond) => (text === 1 ? '开启' : '禁用')
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              href="javascript:;"
              onClick={() => {
                this.handleAdd();
              }}
            >
              添加
            </a>
            <Divider type="vertical" />
            <a
              href="javascript:;"
              onClick={() => {
                this.handleAdd(record);
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
    const { dataSource, visible, parentMenu = {}, current = {} } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = this.renderColumns();

    return (
      <div className={cx('hot-layout')}>
        <Row>
          <Col span={12}>
            <Input
              style={{ width: 300 }}
              onChange={this.handleChange}
              placeholder="请输入联系电话"
            />
          </Col>
          <Col span={12} className={cx('text-right')}>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={this.loadData}
            >
              查询
            </Button>
            <Button
              icon="plus"
              type="primary"
              onClick={() => {
                this.handleAdd();
              }}
            >
              添加
            </Button>
          </Col>
        </Row>
        <div className={cx('hot-layout-content')}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <footer className={cx('hot-layout-footer')}>
          <Pagination className={cx('text-right')} total={1} />
        </footer>
        <Modal
          title="用户"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="用户名">
              {getFieldDecorator('userName', {
                initialValue: current.userName,
                rules: [{ required: true, message: '输入用户名!' }]
              })(<Input placeholder="输入用户名" />)}
            </Form.Item>
            <Form.Item label="用户类型">
              {getFieldDecorator('accountType', {
                initialValue: current.accountType,
                rules: [{ required: true, message: '选择平台!' }]
              })(<Select placeholder="选择用户类型">{optionHtml}</Select>)}
            </Form.Item>
            <Form.Item label="手机号">
              {getFieldDecorator('phoneNum', {
                initialValue: current.phoneNum,
                rules: [{ required: true, message: '输入手机号!' }]
              })(<Input placeholder="输入手机号" />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                initialValue: current.password,
                rules: [
                  { required: true, message: '输入密码!' },
                  { min: 6, message: '最少6个字符' },
                  { max: 50, message: '最多50个字符' },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input placeholder="输入密码" />)}
            </Form.Item>
            <Form.Item label="确认密码">
              {getFieldDecorator('confirm', {
                initialValue: current.password,
                rules: [
                  { required: true, message: '再次输入密码!' },
                  { min: 6, message: '最少6个字符' },
                  { max: 50, message: '最多50个字符' },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  placeholder="再次输入密码"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            {/* <Form.Item label="所属组织">
              {getFieldDecorator('accountName', {
                rules: [{ required: true, message: '选择所属组织!' }]
              })(<Select placeholder="选择所属组织">{optionHtml}</Select>)}
            </Form.Item> */}
            <Form.Item label="用户状态">
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: current.id ? current.status === 1 : true
              })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />)}
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
