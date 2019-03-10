// 登录页面
import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import './index.less';
import fetch from 'isomorphic-unfetch';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-box">
        <div className="login-content">
          <img className="login-bg-img" src="../../static/login-bg.png" />
          <div className="login-right">
            <div className="text-center">
              <img
                className="login-head-img"
                src="../../static/login-head.png"
              />
            </div>
            <div className="mt30">
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <FormItem>
                  {getFieldDecorator('nickname', {
                    rules: [
                      {
                        required: true,
                        message: '请输入账号!',
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      name="phoneNum"
                      prefix={<Icon type="user" style={{ color: '#666' }} />}
                      placeholder="请输入账号"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Input
                    name="password"
                    prefix={<Icon type="lock" style={{ color: '#666' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
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
