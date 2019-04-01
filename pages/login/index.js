// 登录页面
import React, { Fragment } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import Router from 'next/router';
import {
  getUserInfoStorage,
  setUserInfoStorage,
  removeUserInfoStorage
} from '../../util/index';
import { login, getUserInfo } from './action';
import { ACCOUNT_TYPE } from '../../global/index';
import * as styles from './index.less';
const FormItem = Form.Item;
const { Option } = Select;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.doLogin = this.doLogin.bind(this);
  }

  // 默认尝试登录一次
  componentDidMount() {
    const userInfo = getUserInfoStorage();
    if (userInfo) {
      const { accountType, phoneNum, password } = userInfo;
      this.doLogin({ accountType, phoneNum, password });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doLogin(values);
      }
    });
  };

  async doLogin(values) {
    const { data } = await login(values);

    if (data) {
      const { password } = values;
      setUserInfoStorage({ ...data, password });
      // 跳转首页
      Router.push('/system');
    } else {
      removeUserInfoStorage();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const optionHtml = Object.values(ACCOUNT_TYPE).map(item => {
      return (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      );
    });

    return (
      <div className={styles['login-box']}>
        <div className={styles['login-content']}>
          <img
            className={styles['login-bg-img']}
            src="../../static/login-bg.png"
          />
          <div className={styles['login-right']}>
            <div className="text-center">
              <img
                className={styles['login-head-img']}
                src="../../static/login-head.png"
              />
            </div>
            <div className="mt30">
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem>
                  {getFieldDecorator('accountType', {
                    initialValue: Object.values(ACCOUNT_TYPE)[0].value,
                    rules: [
                      {
                        required: true,
                        message: '请选择!',
                        whitespace: true
                      }
                    ]
                  })(<Select placeholder="请选择">{optionHtml}</Select>)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('phoneNum', {
                    initialValue: 110,
                    rules: [
                      {
                        required: true,
                        message: '请输入账号!',
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: '#666' }} />}
                      placeholder="请输入账号"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    initialValue: 'test',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码!',
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: '#666' }} />}
                      type="password"
                      placeholder="请输入密码"
                      autoComplete="password"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    className={styles['btn-login']}
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedForm = Form.create()(Login);
export default WrappedForm;
