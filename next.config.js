// // next配置
// const withless = require('@zeit/next-less');

// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = file => {};
// }

// module.exports = withless({
//   /** less start */
//   lessLoaderOptions: {
//     javascriptEnabled: true
//   }
//   /** less end */

//   /** css模块化 start 和上面的配置不兼容，暂不处理*/
//   // cssModules: true,
//   // cssLoaderOptions: {
//   //   // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
//   //   importLoaders: 1,
//   //   // 指定编译类名方式： 模块名-类名__随机编码
//   //   localIdentName: '[name]-[local]__[hash:base64:6]'
//   // }
//   /** css模块化 end */
// });

// 解决antd less  模块化问题  https://blog.csdn.net/zhumengzj/article/details/87286586
const withLessExcludeAntd = require('./next-less.config.js');

// choose your own modifyVars
// const modifyVars = require('./utils/modifyVars');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withLessExcludeAntd({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  lessLoaderOptions: {
    javascriptEnabled: true
    // modifyVars: modifyVars
  }
});
