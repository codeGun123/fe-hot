import React from 'react';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    console.log(`状态码：${statusCode || ' '} 错误信息: ${err || ' '}`);
    return { statusCode };
  }

  render() {
    return (
      <div>
        {this.props.statusCode
          ? `服务端错误 ${this.props.statusCode}`
          : '客户端错误'}
      </div>
    );
  }
}
