// next配置
const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
// const path = require('path');

// 解决antd less  模块化问题  https://blog.csdn.net/zhumengzj/article/details/87286586
const withLessExcludeAntd = require('./next-less.config.js');

// Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
// );

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withLessExcludeAntd({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]-[local]___[hash:base64:5]'
  },
  lessLoaderOptions: {
    javascriptEnabled: true
    // modifyVars: themeVariables // make your antd custom effective
  }
});
