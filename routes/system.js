const { app, server } = require('./config');

module.exports = [
  server.get('/system', (req, res) => {
    return app.render(req, res, '/system/menu', req.query);
  }),
  server.get('/system/account', (req, res) => {
    return app.render(req, res, '/system/account', req.query);
  }),
  server.get('/system/group', (req, res) => {
    return app.render(req, res, '/system/group', req.query);
  })
];
