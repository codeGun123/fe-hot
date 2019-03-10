import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import Layout from '../components/Layout';

// 进度条设置  无效？
// Router.events.on('routeChangeStart', url => {
//   console.log(`Loading: ${url}`);
//   NProgress.start();
// });
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

export default class HotApp extends React.Component {
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

    const { Component, pagesProps } = this.props;

    return (
      <Container>
        <Head>
          <title>next</title>
        </Head>
        <Layout>
          <Component {...pagesProps} />
        </Layout>
      </Container>
    );
  }
}
