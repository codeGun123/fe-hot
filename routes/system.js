const { app, server } = require('./config');

module.exports = [
  // server.get('/system', (req, res) => {
  //   return app.render(req, res, '/system/setting', req.query);
  // }),
  // server.get('/system/account', (req, res) => {
  //   return app.render(req, res, '/system/account', req.query);
  // }),
  // server.get('/system/authority', (req, res) => {
  //   return app.render(req, res, '/system/authority', req.query);
  // })

  // 清单详情
  server.get('/detail', (req, res) => {
    console.log(req.query);
    return app.render(req, res, '/detail', req.query);
  })
];
