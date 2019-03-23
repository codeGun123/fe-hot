import React, { Component } from 'react';
import { Button } from 'antd';
import { post, get } from '../util';
import {
  addAccountUrl,
  updateAccountUrl,
  getAccountUrl,
  addAccountGroupUrl,
  getAccountGroupUrl
} from '../config/serverPath';

export default class Test extends Component {
  constructor(context, props) {
    super(context, props);
    this.state = {};
  }

  handleGroupAdd = () => {
    const params = {
      expiryDate: -1,
      groupKey: '111',
      groupName: '大炮1'
    };

    post(addAccountGroupUrl, params).then(res => {
      //已经成功
      // addTime: null
      // expiryDate: -1
      // groupKey: "111"
      // groupName: "大炮1"
      // id: "2c90bf89698696cd016989fa10b30000"
      // permission: null
    });
  };

  handleGetGroup = () => {
    get(getAccountGroupUrl + '?groupKey=111').then(res => {
      debugger;
    });
  };

  handleAdd = () => {
    const params = {
      accountType: 'platform',
      password: '123456',
      phoneNum: '13060002921'
    };

    post(addAccountUrl, params).then(res => {
      debugger;
    });
  };

  handleGetUser = () => {
    get(getAccountUrl + '?phoneNum=13060002922').then(res => {
      debugger;
    });
  };

  handleUpdateUser = () => {
    const params = {
      accountType: 'platform',
      password: '111111',
      phoneNum: '13060002921'
    };

    post(updateAccountUrl, params).then(res => {
      debugger;
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleGroupAdd}>添加用户组</Button>
        <Button onClick={this.handleGetGroup}>获取用户组</Button>

        <hr />
        <Button onClick={this.handleAdd}>添加账户</Button>
        <Button onClick={this.handleGetUser}>获取账户</Button>
        <Button onClick={this.handleUpdateUser}>更新账户</Button>
      </div>
    );
  }
}
