const { app, server } = require('./config');

module.exports = server.get('/login', (req, res) => {
  return app.render(req, res, '/login', req.query);
});
