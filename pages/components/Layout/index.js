import React from 'react';
import className from './index.less';

export default class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="layout">{children}</div>;
  }
}
