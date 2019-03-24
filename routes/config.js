const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

console.log('环境变量:' + process.env.NODE_ENV);

module.exports = {
  port,
  dev,
  app,
  handle,
  server
};
