/********** 用户管理 *********/

const { app, server } = require('./config');

module.exports = [
  server.get('/user/platform', (req, res) => {
    return app.render(req, res, '/user/platform/index', req.query);
  })
];
