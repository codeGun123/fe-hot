// 服务端自定义路由
// const { port, app, handle, server } = require('./app');

const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare().then(() => {
  // require('./login');
  // require('./system');

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;

    console.log(`>开启  http://location:${port}`);
  });
});
