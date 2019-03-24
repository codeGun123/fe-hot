/********** 权限设置(用户组) *********/

import React, { Component } from 'react';
import { Button, Table, Pagination } from 'antd';
export default class HotAuthority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      params: {}
    };
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div>
        <section>
          <Button type="primary">添加组织</Button>
        </section>
        <section>
          <Table dataSource={dataSource} />
          <Pagination />
        </section>
      </div>
    );
  }
}
