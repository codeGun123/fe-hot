// 登录页面
import React, { Fragment } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import Router from 'next/router';
import { setTokenStorage, setUserInfoStorage } from '../../util/index';
import { login, getUserInfo } from './action';
import { ACCOUNT_TYPE } from '../../global/index';
import * as styles from './index.less';
const FormItem = Form.Item;
const { Option } = Select;
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          const { data } = res;

          if (data && data.token) {
            setTokenStorage(data.token || data);

            // getUserInfo().then(res => {
            //   setUserInfoStorage(res.data);
            //   Router.push('/index');
            // });
          }
        });
      }
    });
  };

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
                    rules: [
                      {
                        required: true,
                        message: '请选择平台!',
                        whitespace: true
                      }
                    ]
                  })(<Select placeholder="请选择平台">{optionHtml}</Select>)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('phoneNum', {
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
                    className="btn-login"
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
