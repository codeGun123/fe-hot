import React, { Fragment } from 'react';
import { LocaleProvider } from 'antd';
import App, { Container } from 'next/app';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import Header from '../components/Header';
import Layout from '../components/Layout';
import '../assets/style.less';

// 进度条设置  无效？
// Router.events.on('routeChangeStart', url => {
//   console.log(`Loading: ${url}`);
//   NProgress.start();
// });
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

class HotApp extends React.Component {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    Router.onRouteChangeStart = url => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();

    const {
      Component,
      pagesProps,
      router: { pathname }
    } = this.props;
    // 根据路由处理头部信息是否需要显示
    if (pathname === '/login') {
      return (
        <Container>
          <Component {...pagesProps} />
        </Container>
      );
    } else {
      return (
        <LocaleProvider locale={zh_CN}>
          <Container>
            {/* <Header /> */}
            <Layout>
              <Component {...pagesProps} />
            </Layout>
          </Container>
        </LocaleProvider>
      );
    }
  }
}

export default withRouter(HotApp);
