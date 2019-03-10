const compression = require('compression');
const { port, app, handle, dev, server } = require('./routes/app');

console.log(`>等待  http://location:${port}`);

app
  .prepare()
  .then(() => {
    // 生产环境开启压缩
    if (!dev) {
      server.use(compression); //gzip
    }

    // 页面路由
    require('./routes/index');

    // 开发环境：设置此路由会导致无法自动刷新页面 ，待解决
    // server.get('/', (req, res) => {
    //   return app.render(req, res, '/index', req.query);
    // });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;

      console.log(`>开启  http://location:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
