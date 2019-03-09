import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Layout from './components/Layout';

export default class HotApp extends React.Component {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }


  render() {
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
