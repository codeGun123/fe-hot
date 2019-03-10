const { app, server } = require('./app');

module.exports = server.get('/login', (req, res) => {
  return app.render(req, res, '/login', req.query);
});
