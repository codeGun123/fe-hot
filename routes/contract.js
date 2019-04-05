const { app, server } = require('./config');

module.exports = [
  server.get('/contract/list', (req, res) => {
    return app.render(req, res, '/contract/index', req.query);
  })
];
