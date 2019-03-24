import React, { Component } from 'react';
import styles from './index.less';

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return <div className={styles['layout']}>{children}</div>;
  }
}
