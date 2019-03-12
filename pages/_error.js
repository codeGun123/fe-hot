import React from 'react';
import { renderClientError, renderServeError } from '../components/Error/index';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    console.log(`状态码：${statusCode || ' '} 错误信息: ${err || ' '}`);
    return { statusCode };
  }

  render() {
    return (
      <div className="server-container">
        {this.props.statusCode ? renderServeError : renderClientError}

        <style jsx>{`
          .server-container {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}
