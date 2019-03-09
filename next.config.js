// next配置
const withless = require('@zeit/next-less');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withless({
  /** less start */
  lessLoaderOptions: {
    javascriptEnabled: true
  }
  /** less end */

  /** css模块化 start 和上面的配置不兼容，暂不处理*/
  // cssModules: true,
  // cssLoaderOptions: {
  //   // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
  //   importLoaders: 1,
  //   // 指定编译类名方式： 模块名-类名__随机编码
  //   localIdentName: '[name]-[local]__[hash:base64:6]'
  // }
  /** css模块化 end */
});
